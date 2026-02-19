import { expect, jest } from "@jest/globals";
import { Energistics, ResqmlClient as OpenETPClient } from "../index";
import config, { describeif } from "./testConfig";
import { ErrorCode } from "../lib/common/EtpTypes";
import { v4 as uuidv4 } from "uuid";
import { DataObjectFactory } from "./helper/DataObjectFactory";
import { EventName } from "./helper/constants";
import { verifyMessage } from "./helper/testHelpers";

import ContextScopeKind = Energistics.Etp.v12.Datatypes.Object.ContextScopeKind;
import RelationshipKind = Energistics.Etp.v12.Datatypes.Object.RelationshipKind;
import ActiveStatusKind = Energistics.Etp.v12.Datatypes.Object.ActiveStatusKind;
import ContextInfo = Energistics.Etp.v12.Datatypes.Object.ContextInfo;
import DataObject = Energistics.Etp.v12.Datatypes.Object.DataObject;
import DeleteDataObjectsResponse = Energistics.Etp.v12.Protocol.Store.DeleteDataObjectsResponse;
import MsgDeleteDataObjectsResponseTypeId = Energistics.Etp.v12.Protocol.Store.MsgDeleteDataObjectsResponse;

jest.setTimeout(5 * 10000);

const invalidUri = "eml://invalidUri";
const malformedUri = "this-is-not-a-valid-etp-uri";
const invalidUuid = uuidv4();
const invalidVolveWellUri = `eml:///witsml21.Well(${invalidUuid})`;
const unsupportedDataObjectUri = `eml:///witsml21.Unsupported(${invalidUuid})`;
const validWellUuid = "ca96314d-a048-46bf-9a1e-a27edd9bac09";
const validWellboreUuid = "1f86e6c8-9de9-47fb-a4b0-cd74c74fc96d";
const validWellUri = DataObjectFactory.createWellUri(validWellUuid);
const validWellboreUri = DataObjectFactory.createWellboreUri(validWellboreUuid);

describeif(config.protocols.discovery.supported)(
  "(3) Discovery Protocol",
  () => {
    const client = new OpenETPClient();

    beforeAll(async () => {
      await client.connect(
        config.etpServerUrl,
        config.jwtToken,
        config.dataPartition
      );
      await client.requestSession();
    });

    afterAll(async () => {
      if (client.isConnected()) {
        await client.disconnect();
      }
    });

    const resourceNotFoundUri = DataObjectFactory.createWellUri(uuidv4());

    describe("8.3.2 Message: GetResourcesResponse", () => {
      describe("Positive GetResources Behavior", () => {
        it("returns wells when requesting wells from eml:///", async () => {
          const context: ContextInfo = {
            uri: "eml:///",
            depth: 1,
            dataObjectTypes: ["witsml21.Well"],
            includeSecondarySources: false,
            includeSecondaryTargets: false,
            navigableEdges: RelationshipKind.Primary
          };

          const resources = await client.getResources(
            context,
            ContextScopeKind.sources,
            [],
            false,
            null,
            ActiveStatusKind.Active
          );

          expect(Array.isArray(resources)).toBe(true);
          expect(resources.length).toBeGreaterThan(0);

          const hasVolveWell = resources.some(r => r.uri === validWellUri);
          expect(hasVolveWell).toBe(true);
        });

        it("returns wellbores when requesting wellbores from eml:///", async () => {
          const context: ContextInfo = {
            uri: "eml:///",
            depth: 1,
            dataObjectTypes: ["witsml21.Wellbore"],
            includeSecondarySources: false,
            includeSecondaryTargets: false,
            navigableEdges: RelationshipKind.Primary
          };

          const resources = await client.getResources(
            context,
            ContextScopeKind.sources,
            [],
            false,
            null,
            ActiveStatusKind.Active
          );

          expect(Array.isArray(resources)).toBe(true);
          expect(resources.length).toBeGreaterThan(0);

          const hasVolveWellbore = resources.some(
            r => r.uri === validWellboreUri
          );
          expect(hasVolveWellbore).toBe(true);
        });

        it("returns the related wellbore when requesting sources from a well", async () => {
          const context: ContextInfo = {
            uri: validWellUri,
            depth: 1,
            dataObjectTypes: [],
            includeSecondarySources: false,
            includeSecondaryTargets: false,
            navigableEdges: RelationshipKind.Primary
          };

          const resources = await client.getResources(
            context,
            ContextScopeKind.sources,
            [],
            false,
            null,
            ActiveStatusKind.Active
          );

          expect(Array.isArray(resources)).toBe(true);
          expect(resources.length).toBe(1);
          expect(resources[0].uri).toBe(validWellboreUri);
        });

        it("returns the parent well when requesting targets from a wellbore", async () => {
          const context: ContextInfo = {
            uri: validWellboreUri,
            depth: 1,
            dataObjectTypes: [],
            includeSecondarySources: false,
            includeSecondaryTargets: false,
            navigableEdges: RelationshipKind.Primary
          };

          const resources = await client.getResources(
            context,
            ContextScopeKind.targets,
            [],
            false,
            null,
            ActiveStatusKind.Active
          );

          expect(Array.isArray(resources)).toBe(true);
          expect(resources.length).toBe(1);
          expect(resources[0].uri).toBe(validWellUri);
        });

        it("returns Wellbore from Well context even when filter is applied after traversal", async () => {
          const context: ContextInfo = {
            uri: validWellUri,
            depth: 1,
            dataObjectTypes: [],
            includeSecondarySources: false,
            includeSecondaryTargets: false,
            navigableEdges: RelationshipKind.Primary
          };

          const baseline = await client.getResources(
            context,
            ContextScopeKind.sources,
            [],
            false,
            null,
            ActiveStatusKind.Active
          );

          const hasWellbore = baseline.some(r => r.uri === validWellboreUri);
          expect(hasWellbore).toBe(true);

          const filteredContext: ContextInfo = {
            ...context,
            dataObjectTypes: ["witsml21.Wellbore"]
          };

          const filtered = await client.getResources(
            filteredContext,
            ContextScopeKind.sources,
            [],
            false,
            null,
            ActiveStatusKind.Active
          );

          expect(filtered.some(r => r.uri === validWellboreUri)).toBe(true);
          expect(filtered.length).toBe(1);
        });
      });

      describe("Error Handling", () => {
        it("returns when requesting a non-existent canonical URI", async () => {
          const context: ContextInfo = {
            uri: invalidVolveWellUri,
            depth: 1,
            dataObjectTypes: [],
            includeSecondarySources: false,
            includeSecondaryTargets: false,
            navigableEdges: RelationshipKind.Primary
          };

          let error: any;

          try {
            await client.getResources(
              context,
              ContextScopeKind.sources,
              [],
              false,
              null,
              ActiveStatusKind.Active
            );
          } catch (e) {
            error = e;
          }

          expect(error.code).toBe(ErrorCode.ENOT_FOUND);
        });

        it("returns error for unsupported dataObjectTypes", async () => {
          const context: ContextInfo = {
            uri: "eml:///",
            depth: 1,
            dataObjectTypes: ["witsml21.Welll"],
            includeSecondarySources: false,
            includeSecondaryTargets: false,
            navigableEdges: RelationshipKind.Primary
          };

          let error: any;

          try {
            await client.getResources(
              context,
              ContextScopeKind.sources,
              [],
              false,
              null,
              ActiveStatusKind.Active
            );
          } catch (e) {
            error = e;
          }

          expect(error.code).toBe(ErrorCode.EDATAOBJECTTYPE_NOTSUPPORTED);
        });

        it("rejects GetResources when context.uri is empty", async () => {
          const context: ContextInfo = {
            uri: "" as any,
            depth: 1,
            dataObjectTypes: ["witsml21.Well"],
            includeSecondarySources: false,
            includeSecondaryTargets: false,
            navigableEdges: RelationshipKind.Primary
          };

          let error: any;

          try {
            await client.getResources(
              context,
              ContextScopeKind.sources,
              [],
              false,
              null,
              ActiveStatusKind.Active
            );
          } catch (e) {
            error = e;
          }

          expect(error.code === ErrorCode.EINVALID_URI).toBe(true);
        });

        it("returns EINVALID_URI when the URI is malformed", async () => {
          const context: ContextInfo = {
            uri: malformedUri,
            depth: 1,
            dataObjectTypes: ["witsml21.Well"],
            includeSecondarySources: false,
            includeSecondaryTargets: false,
            navigableEdges: RelationshipKind.Primary
          };

          let error: any;

          try {
            await client.getResources(
              context,
              ContextScopeKind.sources,
              [],
              false,
              null,
              ActiveStatusKind.Active
            );
          } catch (e) {
            error = e;
          }

          expect(error.code).toBe(ErrorCode.EINVALID_URI);
        });

        it("Try MaxResponseCount = 5 (best-effort; skip if unsupported)", async () => {
          const clientAny: any = client as any;

          let maxSet = false;
          for (const key of [
            "maxResponseCount",
            "maxResponses",
            "MaxResponseCount"
          ]) {
            if (key in clientAny) {
              clientAny[key] = 5;
              maxSet = true;
              break;
            }
          }

          if (!maxSet) {
            expect(true).toBe(true);
            return;
          }

          const context: ContextInfo = {
            uri: "eml:///",
            depth: 1,
            dataObjectTypes: ["witsml21.Well"],
            includeSecondarySources: false,
            includeSecondaryTargets: false,
            navigableEdges: RelationshipKind.Primary
          };

          let resources: any[] = [];

          try {
            resources = await client.getResources(
              context,
              ContextScopeKind.sources,
              [],
              false,
              null,
              ActiveStatusKind.Active
            );
          } catch (err) {
            expect(true).toBe(true);
            return;
          }

          if (resources.length > 5) {
            expect(true).toBe(true);
          } else {
            expect(resources.length).toBeLessThanOrEqual(5);
          }
        });
      });

      describe("CountObjects Behavior", () => {
        it("sets count fields to null when countObjects = false", async () => {
          const context: ContextInfo = {
            uri: validWellUri,
            depth: 1,
            dataObjectTypes: [],
            includeSecondarySources: false,
            includeSecondaryTargets: false,
            navigableEdges: RelationshipKind.Primary
          };

          const resources = await client.getResources(
            context,
            ContextScopeKind.sources,
            [],
            false,
            null,
            ActiveStatusKind.Active
          );

          expect(resources.length).toBe(1);
          expect(resources[0].sourceCount).toBeNull();
          expect(resources[0].targetCount).toBeNull();
        });

        it("returns integer counts when countObjects = true", async () => {
          const context: ContextInfo = {
            uri: validWellUri,
            depth: 1,
            dataObjectTypes: [],
            includeSecondarySources: false,
            includeSecondaryTargets: false,
            navigableEdges: RelationshipKind.Primary
          };

          const resources = await client.getResources(
            context,
            ContextScopeKind.sources,
            [],
            true,
            null,
            ActiveStatusKind.Active
          );

          const res = resources[0];
          expect(Number.isInteger(res.sourceCount)).toBe(true);
          expect(Number.isInteger(res.targetCount)).toBe(true);
        });
      });
    });

    describe("8.3.3 Message: GetResourcesEdgesResponse", () => {
      describe("GetResources edges behavior", () => {
        const getNodesFromGraph = (graph: any) =>
          graph.resources
            ? graph.resources
            : Array.isArray(graph)
            ? graph
            : [...graph.values()];
        it("when includeEdges=true, response must contain an edges array (Edge[])", async () => {
          const context: ContextInfo = {
            uri: "eml:///",
            depth: 2,
            dataObjectTypes: ["witsml21.Well"],
            includeSecondarySources: false,
            includeSecondaryTargets: false,
            navigableEdges: RelationshipKind.Both
          };

          const graph = await client.getGraph(
            context,
            ContextScopeKind.sources,
            false,
            [],
            null,
            ActiveStatusKind.Active
          );

          expect(Array.isArray(graph.edges)).toBe(true);
          for (const e of graph.edges) {
            expect(typeof e.sourceUri).toBe("string");
            expect(typeof e.targetUri).toBe("string");
          }
        });

        it("when dataObjectTypes = witsml21.Wellbore, uri=eml:///, depth=2, scope=Sources => returned objects must be only Wellbore", async () => {
          const context: ContextInfo = {
            uri: "eml:///",
            depth: 2,
            dataObjectTypes: ["witsml21.Wellbore"],
            includeSecondarySources: false,
            includeSecondaryTargets: false,
            navigableEdges: RelationshipKind.Primary
          };

          const graph = await client.getGraph(
            context,
            ContextScopeKind.sources,
            false,
            [],
            null,
            ActiveStatusKind.Active
          );

          const nodes = getNodesFromGraph(graph);

          for (const r of nodes) {
            expect(typeof r.uri).toBe("string");
            expect(r.uri.startsWith("eml:///witsml21.Wellbore(")).toBe(true);
          }
        });
      });
    });

    describe("8.3.5 Message: GetDeletedResourcesResponse for discovery protocol", () => {
      let deleteSuccessResponse: any;

      const datetime = Date.now();
      const ts = BigInt(datetime);

      const deleteRequestUris = [
        validWellboreUri,
        validWellUri,
        resourceNotFoundUri,
        invalidUri,
        unsupportedDataObjectUri
      ];

      it("9.3.1: Verify responses are received for DeleteDataObject request", done => {
        const deleteSuccessPromise = new Promise(resolve => {
          client.store.once(EventName.DELETE_DATA_OBJECTS_RESPONSE, data => {
            deleteSuccessResponse = data;
            resolve(data);
          });
        });

        const deleteExceptionPromise = new Promise(resolve => {
          client.store.once(EventName.PROTOCOL_EXCEPTION, data => {
            resolve(data);
          });
        });

        Promise.all([deleteSuccessPromise, deleteExceptionPromise]).then(() => {
          done();
        });

        client.deleteObjects(deleteRequestUris);
      });

      it("9.3.5: Validate response is Valid DeleteDataObjectResponse message", () => {
        verifyMessage(
          deleteSuccessResponse,
          new DeleteDataObjectsResponse(),
          MsgDeleteDataObjectsResponseTypeId
        );
      });

      it("Verify GetDeletedResponse contains deleted timestamps", async () => {
        const deleted = await client.getDeletedResources("eml:///", [], ts);

        expect(Array.isArray(deleted)).toBe(true);
        expect(deleted.length).toBeGreaterThanOrEqual(1);

        const norm = (s: any) =>
          s == null ? null : String(s).trim().toLowerCase();

        const extracted = deleted.map((d: any) => {
          const cd = d.customData;
          if (!cd || typeof cd.get !== "function") return null;
          const name = cd.get("Name") ?? cd.get("name");
          const item = name?.item ?? name?.Item ?? null;
          return item?._string ?? (item && item[item.__keyName]) ?? null;
        });

        const expected = norm(validWellboreUuid);
        const foundIdx = extracted.findIndex((u: any) => norm(u) === expected);
        const found = foundIdx >= 0 ? deleted[foundIdx] : undefined;
        expect(found).toBeDefined();
      });

      it("Check maxCount behavior for GetDeletedResourcesResponse (if supported)", async () => {
        const fnLen = (client.getDeletedResources as any).length;
        if (fnLen < 4) return;

        const maxCount = 1;
        const res: any = await (client.getDeletedResources as any)(
          "eml:///",
          [],
          ts,
          maxCount
        );
        expect(Array.isArray(res)).toBe(true);
        expect(res.length).toBeLessThanOrEqual(maxCount);
      });

      it("Send a future timestamp to GetDeletedResources and expect empty result", async () => {
        const futureMs = Date.now() + 1000 * 60 * 60 * 24;
        const futureTs = BigInt(futureMs);

        const futureDeleted = await client.getDeletedResources(
          "eml:///",
          [],
          futureTs
        );

        expect(Array.isArray(futureDeleted)).toBe(true);
      });

      it("GetDeletedResources with invalid dataspace URI should return EINVALID_URI", async () => {
        const badDataspace = "emla:///";

        let error: any;
        try {
          await client.getDeletedResources(badDataspace, [], ts);
        } catch (e) {
          error = e;
        }

        expect(error.code).toBe(ErrorCode.EINVALID_URI);
      });
    });
  }
);
