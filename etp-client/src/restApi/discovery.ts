/**
 * Discovery & Notification — ETP Protocol 3 (Discovery) deep search, type-filtered
 * resource traversal, and ETP Protocol 5 (StoreNotification) subscription support.
 *
 * Endpoints:
 *   POST /discovery/search   — deep search with type filtering, regex matching
 *   GET  /discovery/tree     — hierarchical resource tree for a context URI
 *   GET  /discovery/types    — list distinct data object types in a dataspace
 *   POST /discovery/subscribe — subscribe to store notifications (SSE stream)
 */

import { Router, Request, Response } from "express";
import { EtpClient, Resource } from "../etp";

interface SearchRequest {
  uri: string; // context URI (dataspace or object)
  depth?: number; // default 1, use 0 for unlimited
  dataObjectTypes?: string[]; // filter by type, e.g. ["resqml20.obj_Grid2dRepresentation"]
  namePattern?: string; // regex filter on resource name
  limit?: number; // max results (default 1000)
}

interface TreeNode {
  uri: string;
  name: string;
  type: string;
  children?: TreeNode[];
}

export function createDiscoveryRoutes(etp: EtpClient): Router {
  const router = Router();

  // POST /discovery/search — deep search with filters
  router.post("/search", async (req: Request, res: Response) => {
    try {
      const { uri, depth, dataObjectTypes, namePattern, limit }: SearchRequest = req.body;
      if (!uri) {
        res.status(400).json({ error: "uri is required" });
        return;
      }

      const maxDepth = depth ?? 1;
      const maxResults = Math.min(limit ?? 1000, 10000);
      const nameRegex = namePattern ? new RegExp(namePattern, "i") : null;

      const results: Resource[] = [];
      const visited = new Set<string>();

      async function crawl(contextUri: string, currentDepth: number): Promise<void> {
        if (results.length >= maxResults) return;
        if (visited.has(contextUri)) return;
        visited.add(contextUri);

        const resources = await etp.getResources(contextUri);
        for (const resource of resources) {
          if (results.length >= maxResults) break;

          // Type filter
          if (dataObjectTypes && dataObjectTypes.length > 0) {
            const matchesType = dataObjectTypes.some(
              (t) => resource.dataObjectType.toLowerCase().includes(t.toLowerCase()),
            );
            if (!matchesType) continue;
          }

          // Name filter
          if (nameRegex && !nameRegex.test(resource.name)) continue;

          results.push(resource);

          // Recurse if deeper search requested
          if (maxDepth === 0 || currentDepth < maxDepth) {
            await crawl(resource.uri, currentDepth + 1);
          }
        }
      }

      await crawl(uri, 1);

      res.json({
        results,
        count: results.length,
        truncated: results.length >= maxResults,
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // GET /discovery/tree — hierarchical resource tree
  router.get("/tree", async (req: Request, res: Response) => {
    try {
      const uri = req.query.uri as string;
      const depth = parseInt(req.query.depth as string) || 2;
      if (!uri) {
        res.status(400).json({ error: "uri query param required" });
        return;
      }

      async function buildTree(contextUri: string, remainingDepth: number): Promise<TreeNode[]> {
        if (remainingDepth <= 0) return [];
        const resources = await etp.getResources(contextUri);
        const nodes: TreeNode[] = [];
        for (const r of resources) {
          const node: TreeNode = {
            uri: r.uri,
            name: r.name,
            type: r.dataObjectType,
          };
          if (remainingDepth > 1) {
            const children = await buildTree(r.uri, remainingDepth - 1);
            if (children.length > 0) {
              node.children = children;
            }
          }
          nodes.push(node);
        }
        return nodes;
      }

      const tree = await buildTree(uri, depth);
      res.json({ uri, depth, tree });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // GET /discovery/types — list all distinct object types in a dataspace
  router.get("/types", async (req: Request, res: Response) => {
    try {
      const uri = req.query.uri as string;
      if (!uri) {
        res.status(400).json({ error: "uri query param required (dataspace URI)" });
        return;
      }

      const resources = await etp.getResources(uri);
      const typeCounts = new Map<string, number>();
      for (const r of resources) {
        const t = r.dataObjectType;
        typeCounts.set(t, (typeCounts.get(t) || 0) + 1);
      }

      const types = Array.from(typeCounts.entries())
        .map(([type, count]) => ({ type, count }))
        .sort((a, b) => b.count - a.count);

      res.json({ uri, types, totalObjects: resources.length });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // POST /discovery/subscribe — Server-Sent Events stream for store notifications
  // ETP Protocol 5 (StoreNotification) — ObjectChanged, ObjectDeleted, ObjectAccessRevoked
  router.post("/subscribe", (req: Request, res: Response) => {
    const { uri, includeObjectData } = req.body;
    if (!uri) {
      res.status(400).json({ error: "uri (context) is required" });
      return;
    }

    // Set up SSE
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    });
    res.write(`data: ${JSON.stringify({ type: "subscribed", uri, includeObjectData: !!includeObjectData })}\n\n`);

    // Heartbeat every 30s to keep connection alive
    const heartbeat = setInterval(() => {
      res.write(`:heartbeat\n\n`);
    }, 30_000);

    // Poll for changes (basic impl — real impl uses ETP StoreNotification protocol)
    let lastCheck = new Date().toISOString();
    const pollInterval = setInterval(async () => {
      try {
        const resources = await etp.getResources(uri);
        const changed = resources.filter((r) => r.lastChanged && r.lastChanged > lastCheck);
        if (changed.length > 0) {
          for (const r of changed) {
            const event = {
              type: "ObjectChanged",
              resource: r,
              changeTime: r.lastChanged,
            };
            res.write(`event: ObjectChanged\ndata: ${JSON.stringify(event)}\n\n`);
          }
          lastCheck = new Date().toISOString();
        }
      } catch {
        // Silently skip poll errors
      }
    }, 5_000);

    // Cleanup on client disconnect
    req.on("close", () => {
      clearInterval(heartbeat);
      clearInterval(pollInterval);
    });
  });

  return router;
}
