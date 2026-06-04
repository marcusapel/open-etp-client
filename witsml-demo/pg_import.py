"""
Direct PostgreSQL import for EPC files into the openETPServer database.
Bypasses the broken ETP transaction layer by writing directly to PostgreSQL.
"""
import sys
import zipfile
import re
import psycopg2
import xml.etree.ElementTree as ET

# Schema: Each dataspace has: hdr, uri, typ, res, obj, rel, xpa, ary, bin, del_res
# uri: id, ns, pp, ml, vs  (namespace mapping)
# typ: id, uri_id, xml  (qualified type: e.g. "BoundaryFeature")
# res: obj_id (serial), typ_id, guid, name, version, createdat, updatedat, ...
# obj: id (FK to res.obj_id), usize, zcomp, xml

URI_MAP = {
    "resqml20": {"ns": "http://www.energistics.org/energyml/data/resqmlv2", "pp": "rsq", "vs": "2.0"},
    "resqml22": {"ns": "http://www.energistics.org/energyml/data/resqmlv2", "pp": "rsq22", "vs": "2.2"},
    "eml20":    {"ns": "http://www.energistics.org/energyml/data/commonv2", "pp": "eml", "vs": "2.0"},
    "eml23":    {"ns": "http://www.energistics.org/energyml/data/commonv2", "pp": "eml23", "vs": "2.3"},
}


def get_schema_name(conn, dataspace_path):
    """Find the PostgreSQL schema name for a dataspace."""
    cur = conn.cursor()
    cur.execute("SELECT dbfile FROM admin.spaces WHERE path = %s", (dataspace_path,))
    row = cur.fetchone()
    return row[0].strip() if row else None


def ensure_uri_entry(cur, schema, ml_prefix):
    """Ensure uri table has entry for this qualified type prefix, return uri_id."""
    info = URI_MAP.get(ml_prefix)
    if not info:
        raise ValueError(f"Unknown ML prefix: {ml_prefix}")

    cur.execute(f'SELECT id FROM "{schema}".uri WHERE ml = %s', (ml_prefix,))
    row = cur.fetchone()
    if row:
        return row[0]

    # Insert new uri entry
    cur.execute(f'INSERT INTO "{schema}".uri (ns, pp, ml, vs) VALUES (%s, %s, %s, %s) RETURNING id',
                (info["ns"], info["pp"], ml_prefix, info["vs"]))
    return cur.fetchone()[0]


def ensure_typ_entry(cur, schema, uri_id, type_name):
    """Ensure typ table has entry for this type, return typ_id."""
    cur.execute(f'SELECT id FROM "{schema}".typ WHERE uri_id = %s AND xml = %s', (uri_id, type_name))
    row = cur.fetchone()
    if row:
        return row[0]

    cur.execute(f'INSERT INTO "{schema}".typ (uri_id, xml) VALUES (%s, %s) RETURNING id',
                (uri_id, type_name))
    return cur.fetchone()[0]


def extract_name_from_xml(xml_bytes):
    """Extract the Citation/Title from XML."""
    try:
        root = ET.fromstring(xml_bytes)
        # Try various namespace patterns
        for ns in ["http://www.energistics.org/energyml/data/resqmlv2",
                   "http://www.energistics.org/energyml/data/commonv2",
                   "{http://www.energistics.org/energyml/data/resqmlv2}",
                   "{http://www.energistics.org/energyml/data/commonv2}"]:
            title = root.find(f".//{{{ns}}}Title") if not ns.startswith("{") else root.find(f".//{ns}Title")
            if title is not None and title.text:
                return title.text
        # Try without namespace
        title = root.find(".//{*}Title")
        if title is not None and title.text:
            return title.text
    except Exception:
        pass
    return ""


def parse_epc(epc_path, dataspace):
    """Parse EPC and return list of objects."""
    objects = []
    with zipfile.ZipFile(epc_path) as z:
        ct_xml = z.read("[Content_Types].xml").decode("utf-8")
        part_ct = {}
        for m in re.finditer(
            r'ContentType="([^"]+)"\s+PartName="/?([^"]+)"|PartName="/?([^"]+)"\s+ContentType="([^"]+)"',
            ct_xml
        ):
            ct = m.group(1) or m.group(4)
            pn = m.group(2) or m.group(3)
            if ct and pn:
                part_ct[pn] = ct

        for name in z.namelist():
            if name.startswith("_rels/") or name.startswith("docProps/") or name == "[Content_Types].xml":
                continue
            if not name.endswith(".xml"):
                continue
            ct = part_ct.get(name)
            if not ct:
                continue
            match = re.search(r'([^/]+)_([0-9a-f-]{36})\.xml$', name, re.I)
            if not match:
                continue
            uid = match.group(2)
            tm = re.match(r'application/x-(\w+)\+xml;version=([^;]+);type=(\w+)', ct)
            if not tm:
                continue
            family, version, type_name = tm.group(1), tm.group(2), tm.group(3)
            if family == "resqml" and version == "2.2":
                ml_prefix = "resqml22"
            elif family == "resqml" and version.startswith("2.0"):
                ml_prefix = "resqml20"
            elif family == "eml" and version == "2.3":
                ml_prefix = "eml23"
            elif family == "eml" and version.startswith("2.0"):
                ml_prefix = "eml20"
            else:
                ml_prefix = f"{family}{version.replace('.', '')}"

            xml_data = z.read(name)
            obj_name = extract_name_from_xml(xml_data)
            objects.append({
                "uuid": uid,
                "type_name": type_name,
                "ml_prefix": ml_prefix,
                "xml": xml_data.decode("utf-8"),
                "name": obj_name,
            })
    return objects


def main():
    if len(sys.argv) < 3:
        print("Usage: python3 pg_import.py <epc_path> <dataspace_path>")
        sys.exit(1)

    epc_path = sys.argv[1]
    dataspace = sys.argv[2]
    pg_conn = sys.argv[3] if len(sys.argv) > 3 else "host=localhost port=5433 dbname=rddms user=foo password=bar"

    print(f"Parsing {epc_path}...")
    objects = parse_epc(epc_path, dataspace)
    print(f"  Found {len(objects)} objects")

    if not objects:
        print("No objects!")
        sys.exit(0)

    print(f"Connecting to PostgreSQL...")
    conn = psycopg2.connect(pg_conn)
    conn.autocommit = False

    schema = get_schema_name(conn, dataspace)
    if not schema:
        print(f"  ERROR: Schema not found for dataspace '{dataspace}'")
        sys.exit(1)
    print(f"  Schema: {schema}")

    cur = conn.cursor()
    imported = 0

    for obj in objects:
        try:
            # 1. Ensure uri entry
            uri_id = ensure_uri_entry(cur, schema, obj["ml_prefix"])

            # 2. Ensure typ entry
            typ_id = ensure_typ_entry(cur, schema, uri_id, obj["type_name"])

            # 3. Insert res entry
            cur.execute(f"""
                INSERT INTO "{schema}".res (typ_id, guid, name, createdat, updatedat)
                VALUES (%s, %s, %s, %s, %s)
                ON CONFLICT (typ_id, guid) DO UPDATE SET name = EXCLUDED.name, updatedat = EXCLUDED.updatedat
                RETURNING obj_id
            """, (typ_id, obj["uuid"], obj["name"], 0, 0))
            obj_id = cur.fetchone()[0]

            # 4. Insert/update obj entry
            xml_size = len(obj["xml"].encode("utf-8"))
            cur.execute(f"""
                INSERT INTO "{schema}".obj (id, usize, zcomp, xml)
                VALUES (%s, %s, 0, %s::xml)
                ON CONFLICT (id) DO UPDATE SET xml = EXCLUDED.xml, usize = EXCLUDED.usize
            """, (obj_id, xml_size, obj["xml"]))

            imported += 1
        except Exception as e:
            print(f"  ERROR on {obj['type_name']}({obj['uuid']}): {e}")
            conn.rollback()
            cur = conn.cursor()
            continue

    conn.commit()
    print(f"\n  Imported {imported}/{len(objects)} objects into {schema}")

    cur.close()
    conn.close()
    print("Done!")


if __name__ == "__main__":
    main()
