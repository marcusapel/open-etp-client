import { EtpUri, ResqmlClient, URI } from "../client/ResqmlClient";

import type { IResqmlDataObject } from "../client/ResqmlClient";

import { OSDUContext } from "./OsduContext";
import ResqmlOSDU, { EtpDataspaceManifest } from "./ResqmlOsdu";

import { Manifest } from "./Generated/manifest/Manifest.1.0.0";
import { etpServerPath, osduUrl } from "../common/config";

import serverSchema from "./server-schema.json";

export const dataspaceUriPattern =
  /^(?:eml:\/\/\/|^eml:\/\/\/dataspace\('[^'"]*?(?:''[^'"]*?)*'\))$/;

/**
 * Register DMS if not already registered
 *
 * @param {OSDUContext} context
 */
const registerDMS = async (context: OSDUContext) => {
  const dmsUrl = `${osduUrl}${etpServerPath}`;

  let index = 1;
  while (index > 0) {
    context.rddmsId = `reservoir-ddms${index}`;
    const dms = await context.fetchOSDU<{
      interfaces: { schema: { servers: { url: string }[] } }[];
    }>(`/api/register/v1/ddms/${context.rddmsId}`);
    if (dms === undefined) {
      break;
    }
    if (
      dms.interfaces.some(i => i.schema.servers.some(s => s.url === dmsUrl))
    ) {
      return;
    } else {
      index++;
    }
  }
  serverSchema.id = context.rddmsId;
  serverSchema.interfaces[0].schema.servers[0].url = dmsUrl;

  await context.pushOSDU("/api/register/v1/ddms", serverSchema);
};

/**
 * Create a manifest for a list of uris
 *
 * @param {ResqmlClient} client linked to ETP server
 * @param {URI[]} uris List of URIS to add as work product components
 * @param {OSDUContext} context OSDU related information
 * @return {Promise<Manifest>}
 */
export const createManifest = async (
  client: ResqmlClient,
  uris: URI[],
  context: OSDUContext,
  typePatterns?: string[]
): Promise<Manifest> => {
  if (uris.length === 0) {
    return Promise.reject("No URI provided");
  }
  await registerDMS(context);
  try {
    const manifests: Manifest = {
      // $schema:
      //   "https://community.opengroup.org/osdu/data/data-definitions/-/raw/master/Generated/manifest/Manifest.1.0.0.json",
      kind: `osdu:wks:Manifest:1.0.0`,
      Data: {}
    };

    const objectUris = [];
    const currentDataspaces = new Set<string>();

    const allUris = new Set<string>();

    const matchPatterns: RegExp[] | undefined = typePatterns?.map(
      t => new RegExp(t.replaceAll("*", "\\w*").replaceAll("?", "\\w?"))
    );

    for (const uri of uris) {
      if (uri.match(dataspaceUriPattern)) {
        // Add entire dataspace content
        let dataspaceUris = await client.getDataspaceResources(uri);
        if (matchPatterns) {
          dataspaceUris = dataspaceUris.filter(f => {
            const u: EtpUri = new EtpUri(f.uri);
            for (const p of matchPatterns) {
              if (u.dataObjectType.match(p)) {
                return true;
              }
            }
            return false;
          });
        }
        dataspaceUris.forEach(r => allUris.add(r.uri));
      } else {
        allUris.add(uri);
      }
    }

    for (const uri of allUris) {
      const etpUri = new EtpUri(uri);

      const dataspaceId = `${
        context.partition
      }:dataset--ETPDataspace:${context.datasetId(etpUri)}`;

      // Create dataspace entry if not exists
      if (!currentDataspaces.has(dataspaceId)) {
        // Check if the object dataspace exists on server
        const dataspaceUri = EtpUri.createDataSpaceUri(etpUri.dataSpace).uri;
        const dataspaces = (await client.getDataspaces())?.filter(
          d => d.uri === dataspaceUri
        );
        if (
          manifests.Data === undefined ||
          dataspaces === undefined ||
          dataspaces.length !== 1
        ) {
          continue;
        }

        // Create WorkProduct
        // manifests.Data.WorkProduct = WorkProductManifest(
        //   dataspaces[0],
        //   context
        // );
        // manifests.Data.WorkProduct.version = 1;
        currentDataspaces.add(dataspaceId);

        manifests.Data.Datasets = manifests.Data.Datasets || [];
        manifests.Data.Datasets.push(
          EtpDataspaceManifest(dataspaces[0], context)
        );
      }

      // Check that it is an object
      if (etpUri.uuid !== "") {
        objectUris.push(uri);
      }
    }

    if (manifests.Data === undefined) {
      return Promise.reject("Manifest creation failed");
    }

    // Get objects infos
    const objects: Map<URI, IResqmlDataObject> = new Map<
      URI,
      IResqmlDataObject
    >();
    const tmpUris = [...objectUris];
    let resolvedObjects: (IResqmlDataObject | null)[] = [];

    // slice objectUris to avoid "too many arguments" error
    while (tmpUris.length > 0) {
      const arr = await client.getResolvedObjects(
        tmpUris.splice(0, 5),
        objects,
        false
      );
      resolvedObjects = resolvedObjects.concat(arr);
    }

    manifests.Data.WorkProductComponents = [];
    manifests.MasterData = [];
    const urisNotFound = [];
    for (let i = 0; i < resolvedObjects.length; i++) {
      if (resolvedObjects[i] === null) {
        urisNotFound.push(objectUris[i]);
        continue;
      }
      const etpUri = new EtpUri(objectUris[i]);
      const c = ResqmlOSDU.get(etpUri.dataObjectType);
      if (c === undefined) {
        continue;
      }
      let res = await c.convert(
        objectUris[i],
        resolvedObjects[i],
        context,
        client
      );
      if (res !== undefined && res.id) {
        // Check if it is an explicit osdu resource
        const al = resolvedObjects[i]?.Aliases?.find(
          a => a.Authority === "osdu"
        );
        if (al && al.Identifier) {
          //Check that a version exists
          const d = res.id.split(":");
          const version = await context.getOSDUResourceVersion(res.id);
          if (version) {
            const stored = await context.fetchOSDU<OSDUResourceType>(
              `/api/storage/v2/records/${d[0]}:${d[1]}:${d[2]}`
            );
            if (stored) {
              // If version exists, just update the DDMSDatasets field in the exiting record
              if (res && res.data?.DDMSDatasets?.length > 0) {
                if (!stored.data) {
                  stored.data = {};
                }
                if (!stored.data.DDMSDatasets) {
                  stored.data.DDMSDatasets = [];
                } else if (
                  // If the DDMSDatasets already contain the current grid, skip it
                  stored.data.DDMSDatasets.findIndex(
                    (e: string) =>
                      res?.data?.DDMSDatasets && e === res.data.DDMSDatasets[0]
                  ) !== -1
                ) {
                  continue;
                }
                stored.data.DDMSDatasets = [
                  ...stored.data.DDMSDatasets,
                  ...res.data.DDMSDatasets
                ];
              }
              res = stored;
            }
          }
        }
        if (res !== undefined && res.id) {
          context.created.set(res.id, res);
        }
      }
    }

    manifests.ReferenceData = [];

    const generatedSrn = new Map<string, OSDUResourceType>();

    for (const res of context.created) {
      const id: string = res[0];
      if (id.includes("master-data")) {
        manifests.MasterData.push(res[1] as GenericMasterData);
      } else if (id.includes("reference-data")) {
        manifests.ReferenceData.push(res[1] as GenericReferenceData);
      } else {
        if (
          context.spatialPoint !== undefined &&
          res[1].data.SpatialPoint === undefined
        ) {
          res[1].data.SpatialPoint = context.spatialPoint;
        }
        manifests.Data.WorkProductComponents.push(res[1]);
        manifests.Data.WorkProduct?.data?.Components?.push(`${res[0]}:`);
      }
      generatedSrn.set(res[0], res[1]);
    }

    if (urisNotFound.length > 0) {
      return Promise.reject(
        new Error(`Uris not found: ${urisNotFound.join(", ")}`)
      );
    }

    // Find referenced objects not currently part of the manifest and not already in OSDU
    let missingSrn: string[] = Array.from(context.srnToUri.keys()).filter(
      k => generatedSrn.get(k) === undefined
    );
    missingSrn = await context.filterOSDUResources(missingSrn);
    if (context.createMissingReferences) {
      while (missingSrn.length > 0) {
        const missingPromises: Promise<void>[] = [];
        for (const k of missingSrn) {
          missingPromises.push(
            new Promise<void>((resolve, reject) => {
              const objUri = context.srnToUri.get(k);
              if (objUri === undefined) {
                return reject(new Error(`Missing reference: ${k}`));
              }
              const etpUri = new EtpUri(objUri);
              const c = ResqmlOSDU.get(etpUri.dataObjectType);
              if (c === undefined) {
                reject(new Error(`Missing type for reference: ${k}`));
              }

              const obj1 = objects.get(objUri);
              (obj1 === undefined
                ? client
                    .getResolvedObjects([objUri], objects, false)
                    .then(o => (o[0] === null ? undefined : o[0]))
                : Promise.resolve(obj1)
              ).then(obj =>
                c === undefined
                  ? resolve()
                  : c.convert(objUri, obj, context, client).then(res => {
                      const srn = obj
                        ? context.uriToSrn(objUri, obj)
                        : undefined;
                      if (
                        srn === undefined ||
                        res === undefined ||
                        res.id === undefined
                      ) {
                        reject(
                          new Error(`cannot generate reference for: ${objUri}`)
                        );
                      } else {
                        if (res.id.includes("master-data")) {
                          manifests.MasterData?.push(res as GenericMasterData);
                        } else if (res.id.includes("reference-data")) {
                          manifests.ReferenceData?.push(
                            res as GenericReferenceData
                          );
                        } else {
                          manifests.Data?.WorkProductComponents?.push(
                            res as GenericWorkProductComponent
                          );
                        }
                        generatedSrn.set(`${srn}`, res);
                        resolve();
                      }
                    })
              );
            })
          );
        }
        await Promise.all(missingPromises);
        missingSrn = Array.from(context.srnToUri.keys()).filter(
          k => generatedSrn.get(k) === undefined
        );
        missingSrn = await context.filterOSDUResources(missingSrn);
      }
    }

    if (context.spatialPoint !== undefined) {
      if (
        manifests.Data?.WorkProduct?.data !== undefined &&
        manifests.Data.WorkProduct.data.SpatialPoint === undefined
      ) {
        manifests.Data.WorkProduct.data.SpatialPoint = context.spatialPoint;
      }
    }

    await Promise.all(
      Array.from(generatedSrn.entries()).map(async e =>
        context.getOSDUResourceVersion(e[0]).then(res => {
          if (res !== undefined) {
            e[1].version = res + 1;
          }
        })
      )
    );

    // Process missing reference data
    const missing = Array.from(context.srnToUri.keys()).filter(
      k => generatedSrn.get(k) === undefined
    );
    if (missing.length > 0 && context.createMissingReferences === false) {
      context.references.forEach(r => {
        missing.push(r);
      });
      if (missing.length > 0) {
        return Promise.reject(new Error(`Missing reference(s): ${missing}`));
      }
    } else {
      const references = await context.filterOSDUReferenceData(
        Array.from(context.references)
      );
      references.forEach(r => {
        const rd = ResqmlOSDU.buildReference(r, context);
        if (rd !== undefined) {
          manifests.ReferenceData?.push(rd);
          generatedSrn.set(r, rd);
        }
      });
    }

    if (manifests.MasterData.length === 0) {
      manifests.MasterData = undefined;
    }
    if (manifests.ReferenceData.length === 0) {
      manifests.ReferenceData = undefined;
    }

    return manifests;
  } catch {
    return Promise.reject(new Error("Manifest creation failed"));
  }
};
