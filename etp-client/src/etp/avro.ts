/**
 * ETP 1.2 Avro Binary Codec.
 *
 * Minimal implementation of Apache Avro binary encoding/decoding
 * for the ETP 1.2 protocol messages. Based on the Avro 1.11 spec.
 *
 * Reference: https://avro.apache.org/docs/current/specification/
 * ETP schemas: Energistics.Etp.v12 (etp-schemas.json)
 */

// ─── Avro Binary Writer ──────────────────────────────────────────────────────

export class AvroWriter {
  private buf: number[] = [];

  getBuffer(): Buffer {
    return Buffer.from(this.buf);
  }

  reset(): void {
    this.buf = [];
  }

  writeNull(): void {
    // no bytes
  }

  writeBoolean(val: boolean): void {
    this.buf.push(val ? 1 : 0);
  }

  writeInt(n: number): void {
    // Zigzag encode then varint
    n = (n << 1) ^ (n >> 31);
    while ((n & ~0x7f) !== 0) {
      this.buf.push((n & 0x7f) | 0x80);
      n >>>= 7;
    }
    this.buf.push(n & 0x7f);
  }

  writeLong(n: number | bigint): void {
    let val = typeof n === "bigint" ? n : BigInt(n);
    // Zigzag
    val = (val << 1n) ^ (val >> 63n);
    while ((val & ~0x7fn) !== 0n) {
      this.buf.push(Number(val & 0x7fn) | 0x80);
      val >>= 7n;
    }
    this.buf.push(Number(val & 0x7fn));
  }

  writeFloat(n: number): void {
    const b = Buffer.alloc(4);
    b.writeFloatLE(n);
    for (let i = 0; i < 4; i++) this.buf.push(b[i]);
  }

  writeDouble(n: number): void {
    const b = Buffer.alloc(8);
    b.writeDoubleLE(n);
    for (let i = 0; i < 8; i++) this.buf.push(b[i]);
  }

  writeBytes(data: Buffer | Uint8Array): void {
    this.writeLong(data.length);
    for (let i = 0; i < data.length; i++) this.buf.push(data[i]);
  }

  writeString(s: string): void {
    const encoded = Buffer.from(s, "utf-8");
    this.writeLong(encoded.length);
    for (let i = 0; i < encoded.length; i++) this.buf.push(encoded[i]);
  }

  writeFixed(data: Buffer | Uint8Array): void {
    for (let i = 0; i < data.length; i++) this.buf.push(data[i]);
  }

  writeArrayStart(count: number): void {
    if (count > 0) this.writeLong(count);
  }

  writeArrayEnd(): void {
    this.writeLong(0);
  }

  writeMapStart(count: number): void {
    if (count > 0) this.writeLong(count);
  }

  writeMapEnd(): void {
    this.writeLong(0);
  }

  writeUnionIndex(idx: number): void {
    this.writeInt(idx);
  }
}

// ─── Avro Binary Reader ──────────────────────────────────────────────────────

export class AvroReader {
  private buf: Buffer;
  private idx = 0;

  constructor(buffer: Buffer) {
    this.buf = buffer;
  }

  get remaining(): number {
    return this.buf.length - this.idx;
  }

  readNull(): null {
    return null;
  }

  readBoolean(): boolean {
    return this.buf[this.idx++] === 1;
  }

  readInt(): number {
    let n = 0;
    let k = 0;
    let b: number;
    do {
      b = this.buf[this.idx++];
      n |= (b & 0x7f) << k;
      k += 7;
    } while (b & 0x80);
    return (n >>> 1) ^ -(n & 1);
  }

  readLong(): bigint {
    let n = 0n;
    let k = 0n;
    let b: number;
    do {
      b = this.buf[this.idx++];
      n |= BigInt(b & 0x7f) << k;
      k += 7n;
    } while (b & 0x80);
    return (n >> 1n) ^ -(n & 1n);
  }

  readLongAsNumber(): number {
    return Number(this.readLong());
  }

  readFloat(): number {
    const val = this.buf.readFloatLE(this.idx);
    this.idx += 4;
    return val;
  }

  readDouble(): number {
    const val = this.buf.readDoubleLE(this.idx);
    this.idx += 8;
    return val;
  }

  readBytes(): Buffer {
    const len = Number(this.readLong());
    const data = this.buf.subarray(this.idx, this.idx + len);
    this.idx += len;
    return Buffer.from(data);
  }

  readString(): string {
    const len = Number(this.readLong());
    const str = this.buf.toString("utf-8", this.idx, this.idx + len);
    this.idx += len;
    return str;
  }

  readFixed(size: number): Buffer {
    const data = this.buf.subarray(this.idx, this.idx + size);
    this.idx += size;
    return Buffer.from(data);
  }

  readArrayCount(): number {
    let count = Number(this.readLong());
    if (count < 0) {
      this.readLong(); // skip block size
      count = -count;
    }
    return count;
  }

  readMapCount(): number {
    let count = Number(this.readLong());
    if (count < 0) {
      this.readLong(); // skip block size
      count = -count;
    }
    return count;
  }

  readUnionIndex(): number {
    return this.readInt();
  }
}
