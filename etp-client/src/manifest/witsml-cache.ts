/**
 * In-memory cache of WITSML object XML populated at ingestion time.
 * Used by the manifest builder to enrich records without calling getDataObjects.
 */

const xmlCache = new Map<string, string>();

export function cacheWitsmlXml(uri: string, xml: string): void {
  xmlCache.set(uri, xml);
}

export function getCachedWitsmlXml(uri: string): string | undefined {
  return xmlCache.get(uri);
}

export function getAllCachedXml(): Map<string, string> {
  return xmlCache;
}
