"""
Minimal ETP 1.2 client for importing EPC files via PutDataObjects.
Uses raw websockets with Avro binary encoding.
Runs inside Docker network to connect to ETP server locally.
"""
import struct
import io
import sys
import zipfile
import re
import uuid as uuid_mod

try:
    import websocket  # websocket-client
except ImportError:
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "websocket-client", "-q"])
    import websocket


def encode_avro_string(s: str) -> bytes:
    """Encode a string in Avro format (varint length + utf8 bytes)."""
    b = s.encode("utf-8")
    return encode_avro_long(len(b)) + b


def encode_avro_long(n: int) -> bytes:
    """Encode a long as Avro varint (zigzag)."""
    n = (n << 1) ^ (n >> 63)
    result = bytearray()
    while (n & ~0x7F) != 0:
        result.append((n & 0x7F) | 0x80)
        n >>= 7
    result.append(n & 0x7F)
    return bytes(result)


def encode_avro_bytes(b: bytes) -> bytes:
    """Encode bytes in Avro format (varint length + raw bytes)."""
    return encode_avro_long(len(b)) + b


def encode_avro_map_empty() -> bytes:
    """Encode an empty Avro map."""
    return encode_avro_long(0)


def encode_avro_array_empty() -> bytes:
    """Encode an empty Avro array."""
    return encode_avro_long(0)


def encode_uuid_bytes() -> bytes:
    """Encode a random UUID as 16 fixed bytes."""
    return uuid_mod.uuid4().bytes


def build_message_header(protocol: int, message_type: int, message_id: int,
                         correlation_id: int = 0, message_flags: int = 0x02) -> bytes:
    """
    Build ETP 1.2 MessageHeader (Avro record):
    - protocol: int
    - messageType: int
    - correlationId: long
    - messageId: long
    - messageFlags: int  (0x02 = FINALPART)
    """
    buf = io.BytesIO()
    buf.write(encode_avro_long(protocol))
    buf.write(encode_avro_long(message_type))
    buf.write(encode_avro_long(correlation_id))
    buf.write(encode_avro_long(message_id))
    buf.write(encode_avro_long(message_flags))
    return buf.getvalue()


def build_request_session() -> bytes:
    """
    Build Core.RequestSession message body.
    Protocol 0, MessageType 1.
    """
    buf = io.BytesIO()
    # applicationName: string
    buf.write(encode_avro_string("etp-import-py"))
    # applicationVersion: string
    buf.write(encode_avro_string("1.0.0"))
    # clientInstanceId: fixed[16] (UUID)
    buf.write(uuid_mod.uuid4().bytes)
    # requestedProtocols: array of SupportedProtocol
    # We need Store(4) protocol
    buf.write(encode_avro_long(1))  # array block count = 1
    # SupportedProtocol record:
    #   protocol: int, protocolVersion: Version{major,minor,revision,patch}, role: string,
    #   protocolCapabilities: map<DataValue>
    buf.write(encode_avro_long(4))  # protocol = 4 (Store)
    # protocolVersion: record {major: int, minor: int, revision: int, patch: int}
    buf.write(encode_avro_long(1))  # major
    buf.write(encode_avro_long(2))  # minor
    buf.write(encode_avro_long(0))  # revision
    buf.write(encode_avro_long(0))  # patch
    buf.write(encode_avro_string("store"))  # role
    buf.write(encode_avro_map_empty())  # protocolCapabilities
    buf.write(encode_avro_long(0))  # end of array

    # supportedDataObjects: array of SupportedDataObject
    buf.write(encode_avro_long(3))  # 3 items
    # SupportedDataObject: {qualifiedType: string, dataObjectCapabilities: map<DataValue>}
    for qt in ["resqml20.*", "resqml22.*", "eml23.*"]:
        buf.write(encode_avro_string(qt))
        # dataObjectCapabilities map with SupportsGet, SupportsPut, SupportsDelete
        buf.write(encode_avro_long(3))  # 3 entries
        buf.write(encode_avro_string("SupportsGet"))
        # DataValue union: index 1 = boolean, value = true
        buf.write(encode_avro_long(1))  # union index for boolean
        buf.write(bytes([1]))  # true
        buf.write(encode_avro_string("SupportsPut"))
        buf.write(encode_avro_long(1))
        buf.write(bytes([1]))
        buf.write(encode_avro_string("SupportsDelete"))
        buf.write(encode_avro_long(1))
        buf.write(bytes([1]))
        buf.write(encode_avro_long(0))  # end of map block
    buf.write(encode_avro_long(0))  # end of array

    # supportedCompression: array of string
    buf.write(encode_avro_array_empty())
    # supportedFormats: array of string
    buf.write(encode_avro_long(1))  # 1 item
    buf.write(encode_avro_string("xml"))
    buf.write(encode_avro_long(0))  # end of array
    # currentDateTime: long (microseconds)
    import time
    buf.write(encode_avro_long(int(time.time() * 1_000_000)))
    # earliestRetainedChangeTime: long
    buf.write(encode_avro_long(0))
    # serverAuthorizationRequired: boolean
    buf.write(bytes([0]))  # false
    # endpointCapabilities: map<DataValue>
    buf.write(encode_avro_map_empty())

    return buf.getvalue()


def build_put_data_objects(objects: list) -> bytes:
    """
    Build Store.PutDataObjects message body.
    Protocol 4, MessageType 2.
    objects: list of (uri, xml_bytes)
    """
    buf = io.BytesIO()
    # dataObjects: map<string, DataObject>
    buf.write(encode_avro_long(len(objects)))  # map block count
    for uri, xml_data in objects:
        # map key
        buf.write(encode_avro_string(uri))
        # DataObject record:
        #   resource: Resource
        #   format: string
        #   blobId: union{null, Uuid}
        #   data: bytes

        # Resource record:
        #   uri: string
        buf.write(encode_avro_string(uri))
        #   alternateUris: array<string>
        buf.write(encode_avro_array_empty())
        #   name: string
        buf.write(encode_avro_string(""))
        #   sourceCount: union{null, int} -> null
        buf.write(encode_avro_long(0))  # union index 0 = null
        #   targetCount: union{null, int} -> null
        buf.write(encode_avro_long(0))  # union index 0 = null
        #   lastChanged: long
        buf.write(encode_avro_long(0))
        #   storeLastWrite: long
        buf.write(encode_avro_long(0))
        #   storeCreated: long
        buf.write(encode_avro_long(0))
        #   activeStatus: enum ActiveStatusKind (0=Active, 1=Inactive)
        buf.write(encode_avro_long(0))  # Active
        #   customData: map<DataValue>
        buf.write(encode_avro_map_empty())

        # format: string
        buf.write(encode_avro_string("xml"))
        # blobId: union{null, Uuid} -> null
        buf.write(encode_avro_long(0))  # union index 0 = null
        # data: bytes
        buf.write(encode_avro_bytes(xml_data))

    buf.write(encode_avro_long(0))  # end of map

    # pruneContainedObjects: boolean
    buf.write(bytes([0]))  # false

    return buf.getvalue()


def build_close_session() -> bytes:
    """Build Core.CloseSession message body. Protocol 0, MessageType 5."""
    buf = io.BytesIO()
    # reason: string
    buf.write(encode_avro_string("Normal"))
    return buf.getvalue()


def send_etp_message(ws, protocol: int, message_type: int, body: bytes, message_id: int) -> int:
    """Send an ETP message over websocket. Returns message_id used."""
    header = build_message_header(protocol, message_type, message_id)
    # ETP message format: header_bytes + body_bytes (no length prefix for websocket)
    msg = header + body
    ws.send(msg, opcode=websocket.ABNF.OPCODE_BINARY)
    return message_id


def parse_epc(epc_path: str, dataspace: str) -> list:
    """Parse EPC file and return list of (uri, xml_bytes) tuples."""
    objects = []
    with zipfile.ZipFile(epc_path) as z:
        # Parse [Content_Types].xml
        ct_xml = z.read("[Content_Types].xml").decode("utf-8")

        # Build map: partName -> contentType
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

            # Extract UUID from filename
            match = re.search(r'([^/]+)_([0-9a-f-]{36})\.xml$', name, re.I)
            if not match:
                continue

            uid = match.group(2)

            # Parse content type
            tm = re.match(r'application/x-(\w+)\+xml;version=([^;]+);type=(\w+)', ct)
            if not tm:
                continue

            family, version, type_name = tm.group(1), tm.group(2), tm.group(3)
            if family == "resqml" and version == "2.2":
                qualified = f"resqml22.{type_name}"
            elif family == "resqml" and version.startswith("2.0"):
                qualified = f"resqml20.obj_{type_name}"
            elif family == "eml" and version == "2.3":
                qualified = f"eml23.{type_name}"
            elif family == "eml" and version.startswith("2.0"):
                qualified = f"eml20.obj_{type_name}"
            else:
                qualified = f"{family}{version.replace('.', '')}.{type_name}"

            uri = f"eml:///dataspace('{dataspace}')/{qualified}({uid})"
            xml_data = z.read(name)
            objects.append((uri, xml_data))

    return objects


def main():
    if len(sys.argv) < 3:
        print("Usage: python3 etp_import.py <epc_path> <dataspace>")
        sys.exit(1)

    epc_path = sys.argv[1]
    dataspace = sys.argv[2]
    server_url = sys.argv[3] if len(sys.argv) > 3 else "ws://localhost:9002"

    print(f"Parsing {epc_path}...")
    objects = parse_epc(epc_path, dataspace)
    print(f"  Found {len(objects)} objects")

    if not objects:
        print("No objects to import!")
        sys.exit(0)

    print(f"Connecting to {server_url}...")
    ws = websocket.create_connection(server_url, subprotocols=["etp12.energistics.org"])
    print("  Connected!")

    msg_id = 2  # Start at 2 (convention)

    # Send RequestSession
    print("  Sending RequestSession...")
    body = build_request_session()
    send_etp_message(ws, 0, 1, body, msg_id)
    msg_id += 2

    # Wait for OpenSession response
    resp = ws.recv()
    print(f"  Got response ({len(resp)} bytes)")

    # Send PutDataObjects in batches
    BATCH = 10
    success = 0
    for i in range(0, len(objects), BATCH):
        batch = objects[i:i + BATCH]
        body = build_put_data_objects(batch)
        send_etp_message(ws, 4, 2, body, msg_id)
        msg_id += 2

        # Wait for response
        resp = ws.recv()
        # Check if it's an error (ProtocolException has messageType 1000)
        # Simple heuristic: if response is very short, likely an error
        if len(resp) < 20:
            print(f"  Batch {i // BATCH + 1}: Possible error ({len(resp)} bytes)")
        else:
            success += len(batch)
            print(f"  Batch {i // BATCH + 1}: PUT {len(batch)} objects OK ({len(resp)} bytes)")

    print(f"\n  Result: {success}/{len(objects)} objects imported")

    # Close session
    body = build_close_session()
    send_etp_message(ws, 0, 5, body, msg_id)
    ws.close()
    print("Done!")


if __name__ == "__main__":
    main()
