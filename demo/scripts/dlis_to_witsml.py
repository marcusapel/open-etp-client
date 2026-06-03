#!/usr/bin/env python3
"""
Convert DLIS to WITSML 1.4.1.1 and 2.1 XML, then ingest to RDDMS.

Usage:
  python3 dlis_to_witsml.py [--dlis FILE] [--api URL] [--dataspace DS] [--no-ingest]

Defaults:
  --dlis       ./files/Chevron_KKS1_CMR-MainPass_Processed.dlis
  --api        http://localhost:8080/api/reservoir-ddms/v2
  --dataspace  maap/kks1
"""
import argparse
import json
import os
import sys
import uuid
import xml.etree.ElementTree as ET
from datetime import datetime
from xml.dom import minidom

import numpy as np
from dlisio import dlis

# ─── CLI ──────────────────────────────────────────────────────────────────── #

def parse_args():
    p = argparse.ArgumentParser(description="DLIS → WITSML 1.4 / 2.1 → RDDMS")
    p.add_argument("--dlis", default="./files/Chevron_KKS1_CMR-MainPass_Processed.dlis",
                   help="Path to DLIS file")
    p.add_argument("--api", default="http://localhost:8080/api/reservoir-ddms/v2",
                   help="RDDMS etp-client API base URL")
    p.add_argument("--dataspace", default="maap/kks1",
                   help="Target ETP dataspace")
    p.add_argument("--no-ingest", action="store_true",
                   help="Only generate XML files, don't ingest")
    p.add_argument("--max-rows", type=int, default=None,
                   help="Limit exported rows (for testing)")
    p.add_argument("--direct-arrays", action="store_true",
                   help="Store arrays directly via REST PUT (metadata-only XML + separate array calls)")
    p.add_argument("--chunk-size", type=int, default=10000,
                   help="Rows per subarray chunk for --direct-arrays (default 10000)")
    p.add_argument("--token", default=None,
                   help="Bearer token for RDDMS API (or set RDDMS_TOKEN env var)")
    p.add_argument("--partition", default="equinor-data",
                   help="Data partition ID header")
    return p.parse_args()


# ─── DLIS Reader ──────────────────────────────────────────────────────────── #

def load_dlis(path: str):
    """Load DLIS and return first logical file info."""
    f, *tail = dlis.load(path)
    logical_files = [f] + tail
    print(f"DLIS: {os.path.basename(path)}")
    print(f"  Logical files: {len(logical_files)}")
    lf = logical_files[0]
    frame = lf.frames[0]
    print(f"  Frame: {frame.name}, channels: {len(frame.channels)}")
    print(f"  Index: {frame.index}")
    origin = lf.origins[0] if lf.origins else None
    if origin:
        print(f"  Well: {origin.well_name}")
    return lf, frame, origin


# ─── WITSML 1.4.1.1 Export ────────────────────────────────────────────────── #

def export_witsml_141(frame, origin, curves, output_path: str, max_rows=None):
    """Export DLIS frame to WITSML 1.4.1.1 log XML."""
    NS = "http://www.witsml.org/schemas/1series"
    ET.register_namespace('', NS)

    def ns(tag):
        return f"{{{NS}}}{tag}"

    root = ET.Element(ns("logs"), version="1.4.1.1")
    log = ET.SubElement(root, ns("log"))

    # Header
    well_name = str(origin.well_name) if origin and origin.well_name else "Unknown"
    ET.SubElement(log, ns("nameWell")).text = well_name
    ET.SubElement(log, ns("nameWellbore")).text = well_name
    ET.SubElement(log, ns("name")).text = frame.name or "Log"

    # Index
    index_ch = frame.index
    ET.SubElement(log, ns("indexType")).text = "measured depth"
    ET.SubElement(log, ns("startIndex"), uom="ft").text = str(float(curves[index_ch].min()))
    ET.SubElement(log, ns("endIndex"), uom="ft").text = str(float(curves[index_ch].max()))

    # LogCurveInfo
    all_channels = list(frame.channels)
    for ch in all_channels:
        lci = ET.SubElement(log, ns("logCurveInfo"))
        ET.SubElement(lci, ns("mnemonic")).text = ch.name
        if ch.units:
            ET.SubElement(lci, ns("unit")).text = str(ch.units)
        desc_parts = []
        if ch.long_name:
            desc_parts.append(str(ch.long_name))
        if ch.dimension and ch.dimension != [1]:
            desc_parts.append(f"dimension={ch.dimension}")
        if desc_parts:
            ET.SubElement(lci, ns("curveDescription")).text = " | ".join(desc_parts)
        if ch.name == index_ch:
            ET.SubElement(lci, ns("typeLogData")).text = "double"
            ET.SubElement(lci, ns("classIndex")).text = "1"
        elif ch.dimension == [1]:
            ET.SubElement(lci, ns("typeLogData")).text = "double"
        else:
            ET.SubElement(lci, ns("typeLogData")).text = "string"

    # LogData
    log_data = ET.SubElement(log, ns("logData"))
    ET.SubElement(log_data, ns("mnemonicList")).text = ",".join(ch.name for ch in all_channels)
    ET.SubElement(log_data, ns("unitList")).text = ",".join(str(ch.units or "") for ch in all_channels)

    n_rows = len(curves[index_ch])
    if max_rows:
        n_rows = min(n_rows, max_rows)

    for i in range(n_rows):
        values = []
        for ch in all_channels:
            val = curves[ch.name][i]
            if ch.dimension == [1]:
                if hasattr(val, '__len__') and not isinstance(val, (str, bytes)):
                    val = val[0]
                val = float(val)
                values.append("" if np.isnan(val) else f"{val:.6g}")
            else:
                arr = np.asarray(val).flatten()
                arr_str = " ".join("" if np.isnan(x) else f"{x:.6g}" for x in arr)
                values.append(f"[{arr_str}]")
        ET.SubElement(log_data, ns("data")).text = ",".join(values)

    # Write
    xml_str = ET.tostring(root, encoding='unicode', xml_declaration=False)
    xml_pretty = minidom.parseString(xml_str).toprettyxml(indent="  ", encoding="utf-8")
    with open(output_path, 'wb') as wf:
        wf.write(xml_pretty)

    print(f"  WITSML 1.4.1.1: {output_path} ({n_rows} rows, {len(all_channels)} channels)")
    return output_path


# ─── WITSML 2.1 Export ────────────────────────────────────────────────────── #

def export_witsml_21(frame, origin, curves, output_path: str, max_rows=None):
    """Export DLIS frame to WITSML 2.1 Log XML."""
    NS_WITSML = "http://www.energistics.org/energyml/data/witsmlv2"
    NS_EML = "http://www.energistics.org/energyml/data/commonv2"
    ET.register_namespace('', NS_WITSML)
    ET.register_namespace('eml', NS_EML)

    def wns(tag):
        return f"{{{NS_WITSML}}}{tag}"

    def ens(tag):
        return f"{{{NS_EML}}}{tag}"

    obj_uuid = str(uuid.uuid4())
    root = ET.Element(wns("Log"), attrib={
        "schemaVersion": "2.1",
        f"{{{NS_EML}}}uuid": obj_uuid
    })

    # Citation
    citation = ET.SubElement(root, ens("Citation"))
    ET.SubElement(citation, ens("Title")).text = frame.name or "CMR Log"
    ET.SubElement(citation, ens("Creation")).text = datetime.now().isoformat()
    ET.SubElement(citation, ens("Format")).text = "dlis_to_witsml.py"

    # Well info
    well_name = str(origin.well_name) if origin and origin.well_name else "Unknown"
    ET.SubElement(root, wns("WellName")).text = well_name
    ET.SubElement(root, wns("WellboreName")).text = well_name

    # ChannelSet
    channel_set = ET.SubElement(root, wns("ChannelSet"))
    cs_citation = ET.SubElement(channel_set, ens("Citation"))
    ET.SubElement(cs_citation, ens("Title")).text = frame.name or "Main Frame"

    # Index definition
    index_ch = frame.index
    index_elem = ET.SubElement(channel_set, wns("Index"))
    ET.SubElement(index_elem, wns("Mnemonic")).text = index_ch
    index_channel_obj = next((ch for ch in frame.channels if ch.name == index_ch), None)
    ET.SubElement(index_elem, wns("Uom")).text = str(index_channel_obj.units) if index_channel_obj else "ft"
    ET.SubElement(index_elem, wns("IndexKind")).text = "measured depth"
    ET.SubElement(index_elem, wns("Direction")).text = "increasing"

    # Channel definitions
    all_channels = [ch for ch in frame.channels if ch.name != index_ch]
    for ch in all_channels:
        channel_elem = ET.SubElement(channel_set, wns("Channel"))
        ch_citation = ET.SubElement(channel_elem, ens("Citation"))
        ET.SubElement(ch_citation, ens("Title")).text = ch.name
        ET.SubElement(channel_elem, wns("Mnemonic")).text = ch.name
        if ch.units:
            ET.SubElement(channel_elem, wns("Uom")).text = str(ch.units)
        if ch.long_name:
            ET.SubElement(channel_elem, wns("Description")).text = str(ch.long_name)

        dim = ch.dimension
        if dim == [1]:
            ET.SubElement(channel_elem, wns("DataType")).text = "double"
        else:
            ET.SubElement(channel_elem, wns("DataType")).text = "double array"
            axis_def = ET.SubElement(channel_elem, wns("AxisDefinition"))
            ET.SubElement(axis_def, wns("Order")).text = "1"
            count = dim[0] if dim else 1
            ET.SubElement(axis_def, wns("Count")).text = str(count)
            if 'T2' in ch.name:
                axis_vals = np.logspace(np.log10(0.5), np.log10(5000), count)
                ET.SubElement(axis_def, wns("DoubleValues")).text = " ".join(f"{v:.4g}" for v in axis_vals)

    # Data section
    data_elem = ET.SubElement(channel_set, wns("Data"))
    ET.SubElement(data_elem, wns("MnemonicList")).text = index_ch + "," + ",".join(ch.name for ch in all_channels)

    n_rows = len(curves[index_ch])
    if max_rows:
        n_rows = min(n_rows, max_rows)

    for i in range(n_rows):
        row_values = [f"{float(curves[index_ch][i]):.4f}"]
        for ch in all_channels:
            val = curves[ch.name][i]
            if ch.dimension == [1]:
                v = float(val) if not hasattr(val, '__len__') else float(val[0])
                row_values.append("" if np.isnan(v) else f"{v:.6g}")
            else:
                arr = np.asarray(val).flatten()
                arr_str = " ".join("" if np.isnan(x) else f"{x:.6g}" for x in arr)
                row_values.append(f"[{arr_str}]")
        ET.SubElement(data_elem, wns("Data")).text = ",".join(row_values)

    # Write
    xml_str = ET.tostring(root, encoding='unicode', xml_declaration=False)
    xml_pretty = minidom.parseString(xml_str).toprettyxml(indent="  ", encoding="utf-8")
    with open(output_path, 'wb') as wf:
        wf.write(xml_pretty)

    print(f"  WITSML 2.1:     {output_path} ({n_rows} rows, {len(all_channels)} channels)")
    return output_path, obj_uuid


# ─── WITSML 2.1 Metadata-Only Export (no inline data) ────────────────────── #

def export_witsml_21_metadata(frame, origin, curves, output_path: str, max_rows=None):
    """Export DLIS frame to WITSML 2.1 Log XML with channel definitions only (no data rows).
    Returns (path, uuid, channel_info) where channel_info is list of (mnemonic, dimension, n_rows)."""
    NS_WITSML = "http://www.energistics.org/energyml/data/witsmlv2"
    NS_EML = "http://www.energistics.org/energyml/data/commonv2"
    ET.register_namespace('', NS_WITSML)
    ET.register_namespace('eml', NS_EML)

    def wns(tag):
        return f"{{{NS_WITSML}}}{tag}"

    def ens(tag):
        return f"{{{NS_EML}}}{tag}"

    obj_uuid = str(uuid.uuid4())
    root = ET.Element(wns("Log"), attrib={
        "schemaVersion": "2.1",
        f"{{{NS_EML}}}uuid": obj_uuid
    })

    # Citation
    citation = ET.SubElement(root, ens("Citation"))
    ET.SubElement(citation, ens("Title")).text = frame.name or "CMR Log"
    ET.SubElement(citation, ens("Creation")).text = datetime.now().isoformat()
    ET.SubElement(citation, ens("Format")).text = "dlis_to_witsml.py (metadata-only)"

    # Well info
    well_name = str(origin.well_name) if origin and origin.well_name else "Unknown"
    ET.SubElement(root, wns("WellName")).text = well_name
    ET.SubElement(root, wns("WellboreName")).text = well_name

    # ChannelSet
    channel_set = ET.SubElement(root, wns("ChannelSet"))
    cs_citation = ET.SubElement(channel_set, ens("Citation"))
    ET.SubElement(cs_citation, ens("Title")).text = frame.name or "Main Frame"

    # Index definition
    index_ch = frame.index
    index_elem = ET.SubElement(channel_set, wns("Index"))
    ET.SubElement(index_elem, wns("Mnemonic")).text = index_ch
    index_channel_obj = next((ch for ch in frame.channels if ch.name == index_ch), None)
    ET.SubElement(index_elem, wns("Uom")).text = str(index_channel_obj.units) if index_channel_obj else "ft"
    ET.SubElement(index_elem, wns("IndexKind")).text = "measured depth"
    ET.SubElement(index_elem, wns("Direction")).text = "increasing"

    # Channel definitions (no data)
    all_channels = [ch for ch in frame.channels if ch.name != index_ch]
    channel_info = []
    n_rows = len(curves[index_ch])
    if max_rows:
        n_rows = min(n_rows, max_rows)

    # Index channel info
    index_dim = index_channel_obj.dimension if index_channel_obj else [1]
    channel_info.append((index_ch, index_dim[0] if index_dim == [1] else index_dim[0], n_rows))

    for ch in all_channels:
        channel_elem = ET.SubElement(channel_set, wns("Channel"))
        ch_citation = ET.SubElement(channel_elem, ens("Citation"))
        ET.SubElement(ch_citation, ens("Title")).text = ch.name
        ET.SubElement(channel_elem, wns("Mnemonic")).text = ch.name
        if ch.units:
            ET.SubElement(channel_elem, wns("Uom")).text = str(ch.units)
        if ch.long_name:
            ET.SubElement(channel_elem, wns("Description")).text = str(ch.long_name)

        dim = ch.dimension
        if dim == [1]:
            ET.SubElement(channel_elem, wns("DataType")).text = "double"
            channel_info.append((ch.name, 1, n_rows))
        else:
            ET.SubElement(channel_elem, wns("DataType")).text = "double array"
            axis_def = ET.SubElement(channel_elem, wns("AxisDefinition"))
            ET.SubElement(axis_def, wns("Order")).text = "1"
            count = dim[0] if dim else 1
            ET.SubElement(axis_def, wns("Count")).text = str(count)
            channel_info.append((ch.name, count, n_rows))

    # ExternalDataArrayPart references for each channel
    all_channel_names = [index_ch] + [ch.name for ch in all_channels]
    for ch_name in all_channel_names:
        ext_ref = ET.SubElement(root, ens("ExternalDataArrayPart"))
        ch_obj = next((c for c in frame.channels if c.name == ch_name), None)
        dim = ch_obj.dimension if ch_obj else [1]
        total = n_rows * (dim[0] if dim != [1] else 1)
        ET.SubElement(ext_ref, ens("Count")).text = str(total)
        ET.SubElement(ext_ref, ens("PathInExternalFile")).text = f"/WITSML/{obj_uuid}/{ch_name}"

    # Write
    xml_str = ET.tostring(root, encoding='unicode', xml_declaration=False)
    xml_pretty = minidom.parseString(xml_str).toprettyxml(indent="  ", encoding="utf-8")
    with open(output_path, 'wb') as wf:
        wf.write(xml_pretty)

    print(f"  WITSML 2.1 (metadata-only): {output_path}")
    print(f"    Channels: {len(all_channel_names)}, Rows: {n_rows}")
    return output_path, obj_uuid, channel_info


# ─── Direct Array Ingest via REST ─────────────────────────────────────────── #

def ingest_arrays_direct(api_base: str, dataspace: str, obj_uuid: str,
                         frame, curves, channel_info, token: str,
                         partition: str, chunk_size: int = 10000, max_rows=None):
    """
    Ingest channel arrays directly via REST PUT /dataspaces/:id/resources/arrays.
    Uses subarray chunking for large arrays to avoid memory issues.
    """
    import urllib.request
    import base64
    import struct

    ds_encoded = dataspace.replace("/", "%2F")
    url = f"{api_base}/dataspaces/{ds_encoded}/resources/arrays"

    headers = {
        'Content-Type': 'application/json',
        'data-partition-id': partition,
    }
    if token:
        headers['Authorization'] = f'Bearer {token}'

    n_rows_total = len(curves[frame.index])
    if max_rows:
        n_rows_total = min(n_rows_total, max_rows)

    total_stored = 0
    total_failed = 0

    for ch_name, dim, _ in channel_info:
        ch_obj = next((c for c in frame.channels if c.name == ch_name), None)
        if ch_obj is None:
            continue

        is_array = (ch_obj.dimension != [1])
        array_dim = ch_obj.dimension[0] if is_array else 1
        dimensions = [n_rows_total, array_dim] if is_array else [n_rows_total]
        path_in_resource = f"/WITSML/{obj_uuid}/{ch_name}"

        # Process in chunks to handle large arrays
        for chunk_start in range(0, n_rows_total, chunk_size):
            chunk_end = min(chunk_start + chunk_size, n_rows_total)
            chunk_rows = chunk_end - chunk_start

            # Extract chunk data
            raw = curves[ch_name][chunk_start:chunk_end]
            if is_array:
                # Multi-dim: flatten [rows, dim] into 1D
                flat = np.asarray(raw, dtype=np.float64).reshape(-1)
            else:
                flat = np.asarray(raw, dtype=np.float64).flatten()

            # Replace NaN with 0 for transfer (or keep as NaN — base64 preserves it)
            data_bytes = flat.tobytes()
            data_b64 = base64.b64encode(data_bytes).decode('ascii')

            if chunk_start == 0 and chunk_rows == n_rows_total:
                # Full array — single PUT
                payload = {
                    "ContainerType": "witsml21.Log",
                    "ContainerUuid": obj_uuid,
                    "PathInResource": path_in_resource,
                    "Dimensions": dimensions,
                    "Data": data_b64,
                    "ArrayType": "Float64Array"
                }
            else:
                # Subarray — PUT with Starts/Counts
                if is_array:
                    starts = [chunk_start, 0]
                    counts = [chunk_rows, array_dim]
                else:
                    starts = [chunk_start]
                    counts = [chunk_rows]
                payload = {
                    "ContainerType": "witsml21.Log",
                    "ContainerUuid": obj_uuid,
                    "PathInResource": path_in_resource,
                    "Dimensions": dimensions,
                    "Data": data_b64,
                    "ArrayType": "Float64Array",
                    "Starts": starts,
                    "Counts": counts
                }

            req = urllib.request.Request(
                url, data=json.dumps(payload).encode('utf-8'),
                method='PUT', headers=headers
            )
            try:
                with urllib.request.urlopen(req) as resp:
                    resp.read()
                total_stored += 1
            except Exception as e:
                total_failed += 1
                err_body = ""
                if hasattr(e, 'read'):
                    try:
                        err_body = e.read().decode()[:200]
                    except:
                        pass
                print(f"    WARN: Failed chunk [{chunk_start}:{chunk_end}] for {ch_name}: {e} {err_body}")

        print(f"    {ch_name}: {'['+str(n_rows_total)+'×'+str(array_dim)+']' if is_array else str(n_rows_total)+' samples'} → stored")

    print(f"  Arrays stored: {total_stored} chunks OK, {total_failed} failed")
    return total_stored, total_failed


# ─── RDDMS Ingestion ─────────────────────────────────────────────────────── #

def ingest_to_rddms(api_base: str, dataspace: str, xml_path: str, version: str):
    """Ingest WITSML XML to RDDMS via the etp-client REST API."""
    import urllib.request

    with open(xml_path, 'r', encoding='utf-8') as f:
        xml_content = f.read()

    url = f"{api_base}/witsml/store"
    payload = json.dumps({"dataspace": dataspace, "xml": xml_content}).encode('utf-8')

    req = urllib.request.Request(url, data=payload, method='PUT',
                                headers={'Content-Type': 'application/json'})
    try:
        with urllib.request.urlopen(req) as resp:
            result = json.loads(resp.read().decode())
            print(f"  Ingested {version}: {result.get('stored', 0)} objects → {dataspace}")
            return result
    except Exception as e:
        print(f"  ERROR ingesting {version}: {e}")
        if hasattr(e, 'read'):
            print(f"    {e.read().decode()}")
        return None


def build_manifest(api_base: str, dataspace: str):
    """Build OSDU manifest from the ingested dataspace."""
    import urllib.request

    url = f"{api_base}/manifests/build"
    payload = json.dumps({
        "uris": [f"eml:///dataspace('{dataspace}')"],
        "acl": {
            "owners": ["data.default.owners@equinor.com"],
            "viewers": ["data.default.viewers@equinor.com"]
        },
        "legal": {
            "legaltags": ["equinor-private-no-restrictions"],
            "otherRelevantDataCountries": ["NO"]
        }
    }).encode('utf-8')

    req = urllib.request.Request(url, data=payload, method='POST',
                                headers={'Content-Type': 'application/json'})
    try:
        with urllib.request.urlopen(req) as resp:
            manifest = json.loads(resp.read().decode())
            n = len(manifest.get('referenceData', [])) + len(manifest.get('masterData', [])) + len(manifest.get('data', []))
            print(f"  Manifest built: {n} records")

            # Save manifest
            out_path = os.path.join(os.path.dirname(__file__) or '.', 'files',
                                    f'manifest_{dataspace.replace("/", "_")}.json')
            with open(out_path, 'w') as f:
                json.dump(manifest, f, indent=2)
            print(f"  Saved: {out_path}")
            return manifest
    except Exception as e:
        print(f"  ERROR building manifest: {e}")
        return None


# ─── Main ─────────────────────────────────────────────────────────────────── #

def main():
    args = parse_args()

    # Resolve paths relative to script directory
    script_dir = os.path.dirname(os.path.abspath(__file__))
    dlis_path = os.path.join(script_dir, args.dlis) if not os.path.isabs(args.dlis) else args.dlis

    if not os.path.exists(dlis_path):
        print(f"ERROR: DLIS file not found: {dlis_path}")
        sys.exit(1)

    token = args.token or os.environ.get("RDDMS_TOKEN", "")

    print(f"\n{'='*60}")
    print(f"DLIS → WITSML → RDDMS Pipeline")
    if args.direct_arrays:
        print(f"  Mode: DIRECT ARRAYS (metadata-only XML + REST array PUT)")
    else:
        print(f"  Mode: INLINE (full XML with embedded data)")
    print(f"{'='*60}\n")

    # 1. Load DLIS
    lf, frame, origin = load_dlis(dlis_path)
    curves = frame.curves()

    # 2. Output paths
    base = os.path.splitext(os.path.basename(dlis_path))[0]
    out_dir = os.path.join(script_dir, 'files')
    os.makedirs(out_dir, exist_ok=True)

    if args.direct_arrays:
        # ─── Direct Arrays Mode ──────────────────────────────────────
        path_meta = os.path.join(out_dir, f"{base}_metadata.xml")

        # 3. Export metadata-only WITSML 2.1
        print("\n[1] Exporting WITSML 2.1 (metadata-only)...")
        path_meta, obj_uuid, channel_info = export_witsml_21_metadata(
            frame, origin, curves, path_meta, max_rows=args.max_rows
        )

        if args.no_ingest:
            print("\n[--no-ingest] Skipping RDDMS ingestion.")
            return

        # 4. Ingest metadata XML to RDDMS (creates the Log object with ExternalDataArrayPart refs)
        print(f"\n[2] Ingesting metadata XML to RDDMS ({args.dataspace})...")
        ingest_to_rddms(args.api, args.dataspace, path_meta, "WITSML 2.1 metadata")

        # 5. PUT arrays directly via REST
        print(f"\n[3] Storing arrays directly via REST (chunk_size={args.chunk_size})...")
        ingest_arrays_direct(
            args.api, args.dataspace, obj_uuid,
            frame, curves, channel_info,
            token=token, partition=args.partition,
            chunk_size=args.chunk_size, max_rows=args.max_rows
        )

        # 6. Build manifest
        print(f"\n[4] Building OSDU manifest...")
        build_manifest(args.api, args.dataspace)

    else:
        # ─── Inline Mode (original) ──────────────────────────────────
        path_141 = os.path.join(out_dir, f"{base}.xml")
        path_21 = os.path.join(out_dir, f"{base}_v21.xml")

        # 3. Export WITSML 1.4.1.1
        print("\n[1] Exporting WITSML 1.4.1.1...")
        export_witsml_141(frame, origin, curves, path_141, max_rows=args.max_rows)

        # 4. Export WITSML 2.1
        print("\n[2] Exporting WITSML 2.1...")
        export_witsml_21(frame, origin, curves, path_21, max_rows=args.max_rows)

        if args.no_ingest:
            print("\n[--no-ingest] Skipping RDDMS ingestion.")
            return

        # 5. Ingest to RDDMS (the /witsml/store endpoint extracts arrays from inline data)
        print(f"\n[3] Ingesting to RDDMS ({args.dataspace})...")
        ingest_to_rddms(args.api, args.dataspace, path_141, "WITSML 1.4.1.1")
        ingest_to_rddms(args.api, args.dataspace, path_21, "WITSML 2.1")

        # 6. Build manifest (catalog)
        print(f"\n[4] Building OSDU manifest...")
        build_manifest(args.api, args.dataspace)

    print(f"\n{'='*60}")
    print("Done.")


if __name__ == "__main__":
    main()
