// ============================================================================
// Copyright 2019-2022 Emerson Paradigm Holding LLC. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// ============================================================================

import { Integer64 } from "../common/Etp12";

const typeOf = (schema: any) => {
  const s: string = typeof schema;
  if (s === "object") {
    if (schema) {
      return schema instanceof Array ? "union" : schema.type;
    } else {
      throw new Error(`Invalid schema type: ${s}`);
    }
  }
  switch (s) {
    case "object":
      return schema.type;
    case "string":
      return schema;
    case "array":
      return "union";
    default:
      throw new Error(`Invalid schema type: ${s}`);
  }
}; // typeOf

const keyName = (typeName: string): string => {
  return `_${typeName.split(".").pop()}`.replace("[]", "__array__");
};

/**
 * Read JS types from Avro buffer
 *
 * @export
 * @class BinaryReader
 */
export class BinaryReader {
  private buffer: Buffer;
  private idx: number;
  private readonly schemas: SchemaCache;

  /**
   * Creates an instance of BinaryReader.
   * @param {SchemaCache} schemas Avro schemas to use for serialization
   * @param {Buffer} buffer Avro buffer
   * @memberof BinaryReader
   */
  constructor(schemas: SchemaCache, buffer: Buffer) {
    this.idx = 0;
    this.schemas = schemas;
    this.buffer = buffer;
  }

  /**
   * From the buffer, read a datum corresponding to a schema
   *
   * @param {*} schema of the datum
   * @returns {*} value of the datum
   * @memberof BinaryReader
   */
  public readDatum(schema: any): any {
    return this.readDatumWithType(schema, typeOf(schema));
  }

  /**
   * From the buffer, read a datum corresponding to a schema
   *
   * @param {*} schema of the datum
   * @param {string} type of the datum schema
   * @returns {*} value of the datum
   * @memberof BinaryReader
   */
  public readDatumWithType(schema: any, type: string): any {
    switch (type) {
      case "double":
        return this.readDouble();
      case "null":
        return null;
      case "boolean":
        return this.readBoolean();
      case "int":
        return this.readInt();
      case "long":
        return this.readInt64();
      case "float":
        return this.readFloat();
      case "bytes":
        return this.readBytes();
      case "string":
        return this.readString();
      case "enum":
        return this.readEnum();
      case "fixed":
        return this.readFixed(16);
      case "array":
        return this.readArray(schema);
      case "record": {
        const recordResult: Record<string, any> = {};
        schema.fields.forEach(
          (e: any) => (recordResult[e.name] = this.readDatum(e.type))
        );
        return recordResult;
      }
      case "map": {
        const mapResult = new Map();
        let i = this.readMapStart();
        while (i !== 0) {
          while (i > 0) {
            mapResult.set(this.readString(), this.readDatum(schema.values));
            i--;
          }
          i = this.mapNext();
        }
        return mapResult;
      }
      case "union": {
        const idx = this.readInt();
        if (schema[idx] === "null") {
          return null;
        } else if (schema.length === 2 && schema[0] === "null" && idx === 1) {
          return this.readDatum(schema[1]);
        } else {
          const unionResult: Record<string, any> = {
            __keyName: keyName(schema[idx])
          };
          unionResult[keyName(schema[idx])] = this.readDatum(schema[idx]);
          return unionResult;
        }
      }
      default: {
        if (this.schemas.findSchema(type) === undefined) {
          throw new Error(`Unsupported schema type ${type}`);
        }
        return this.readDatum(this.schemas.findSchema(type));
      }
    }
  }

  private decode(schema: any, buffer: Buffer) {
    this.buffer = buffer;
    this.idx = 0;
    return this.readDatum(schema);
  }

  private readByte() {
    const buf = this.buffer[this.idx];
    this.idx++;
    return buf;
  }

  // Reads count for array and map
  private readCount() {
    let count = this.readInt();
    if (count < 0) {
      this.readInt();
      count = -count;
    }
    return count;
  }

  private readBoolean() {
    return this.readByte() === 1;
  }

  private readInt() {
    let n = 0;
    let k = 0;
    const buf = this.buffer;
    let b = 0;
    let h = 0;

    do {
      b = buf[this.idx++];
      h = b & 0x80;
      n |= (b & 0x7f) << k;
      k += 7;
    } while (h && k < 28);

    if (h) {
      // Switch to float arithmetic, otherwise we might overflow.
      let f = n;
      let fk = 268435456; // 2 ** 28.
      do {
        b = buf[this.idx++];
        f += (b & 0x7f) * fk;
        fk *= 128;
      } while (b & 0x80);
      return (f % 2 ? -(f + 1) : f) / 2;
    }

    return (n >> 1) ^ -(n & 1);
  }

  private readInt64(): Integer64 {
    let n = BigInt(0);
    let k = BigInt(0);
    const buf = this.buffer;
    let b = BigInt(0);
    let h = BigInt(0);

    do {
      b = BigInt(buf[this.idx++]);
      h = b & BigInt(0x80);
      n |= (b & BigInt(0x7f)) << k;
      k += BigInt(7);
    } while (h && k < 28);

    if (h) {
      // Switch to float arithmetic, otherwise we might overflow.
      let f = n;
      let fk = BigInt(268435456); // 2 ** 28.
      do {
        b = BigInt(buf[this.idx++]);
        f += (b & BigInt(0x7f)) * fk;
        fk *= BigInt(128);
      } while (b & BigInt(0x80));
      return (f % BigInt(2) ? -(f + BigInt(1)) : f) / BigInt(2);
    }

    return (n >> BigInt(1)) ^ -(n & BigInt(1));
  }

  private readFloat() {
    const result = this.buffer.readFloatLE(this.idx);
    this.idx += 4;
    return result;
  }

  private readDouble() {
    const result = this.buffer.readDoubleLE(this.idx);
    this.idx += 8;
    return result;
  }
  private readFixed(len: number) {
    const retVal = new Uint8Array(this.buffer.buffer, this.idx, len);
    this.idx += len;
    return retVal;
  }

  private readBytes() {
    const length = this.readInt();
    return this.readFixed(length);
  }
  private readString() {
    const len = this.readInt();
    const pos = this.idx;
    this.idx += len;
    return this.buffer.slice(pos, pos + len).toString("utf-8");
  }
  private readEnum() {
    return this.readInt();
  }
  private readArrayStart() {
    return this.readCount();
  }
  private arrayNext() {
    return this.readCount();
  }
  private readMapStart() {
    return this.readCount();
  }
  private mapNext() {
    return this.readCount();
  }
  private readArray(schema: any): any[] {
    const itemsType = typeOf(schema.items);
    const result = [];
    const init = this.readArrayStart();
    if (init === undefined) {
      return [];
    }
    let i = init;
    while (i !== 0) {
      while (i-- > 0) {
        result.push(this.readDatumWithType(schema.items, itemsType));
      }
      i = this.arrayNext();
    }
    return result;
  }
}

/**
 * Write JS types to Avro
 * Created from https://github.com/apache/avro/blob/master/lang/js/lib/utils.js
 * @export
 * @class BinaryWriter
 */
export class BinaryWriter {
  private buffer: Buffer;
  private _index: number;
  private readonly schemas: any;
  // private dataView: DataView;

  /**
   * Creates an instance of BinaryWriter.
   * @param {SchemaCache} schemas Avro schemas to use for serialization
   * @param {Buffer} preallocated buffer
   * @memberof BinaryWriter
   */
  constructor(schemas: SchemaCache, buffer: Buffer | undefined) {
    this.buffer = buffer ? buffer : Buffer.alloc(2048);
    this._index = 0;
    this.schemas = {};
    if (schemas !== undefined) {
      this.schemas = schemas;
    }
  }

  /**
   * Get the buffer containing the AVRO encoded information
   * ready to be sent
   *
   * @returns {Buffer}
   * @memberof BinaryWriter
   */
  public getBuffer(): Buffer {
    return this.buffer.slice(0, this._index);
  }

  /**
   * Serialize a datum according to its schema and write it to buffer
   *
   * @param {*} schema Avro schema of the datum
   * @param {*} datum Datum to encode
   * @param {boolean} validate if datum needs to be validated against schema
   * @returns
   * @memberof BinaryWriter
   */
  public writeDatum(schema: any, datum: any, validate: boolean) {
    if (validate) {
      this.schemas.validate(schema, datum);
    }
    const type = typeOf(schema);
    return this.writeDatumWithType(schema, type, datum, validate);
  }

  /**
   * Serialize a datum according to its schema and write it to buffer
   *
   * @param {*} schema Avro schema of the datum
   * @param {*} datum Datum to encode
   * @param {boolean} validate if datum needs to be validated against schema
   * @returns
   * @memberof BinaryWriter
   */
  public writeDatumWithType(
    schema: any,
    type: string,
    datum: any,
    validate: boolean
  ) {
    if (validate) {
      this.schemas.validate(schema, datum);
    }
    switch (type) {
      // Primitive types
      case "null": {
        break;
      }
      case "boolean": {
        this.writeBoolean(datum);
        break;
      }
      case "int": {
        this.writeInt(datum);
        break;
      }
      case "long": {
        this.writeInt64(datum);
        break;
      }
      case "float": {
        this.writeFloat(datum);
        break;
      }
      case "double": {
        this.writeDouble(datum);
        break;
      }
      case "bytes": {
        this.writeBytes(Buffer.from(datum));
        return;
      }
      case "string": {
        this.writeString(datum);
        return;
      } // Complex types
      case "record": {
        schema.fields.forEach((e: any) =>
          this.writeDatum(e.type, datum[e.name], false)
        );
        return;
      }
      case "enum": {
        for (let i = 0; i < schema.symbols.length; i++) {
          if (schema.symbols[i] === datum) {
            this.writeInt(i);
            return;
          }
        }
        if (
          parseInt(datum, 10) >= 0 &&
          parseInt(datum, 10) < schema.symbols.length
        ) {
          this.writeInt(datum);
          return;
        }
        throw new Error(
          `Invalid enum value: ${datum} expecting: ${schema.symbols}`
        );
      }
      case "fixed": {
        if (datum) {
          datum.forEach((e: any) => this.writeByte(e));
        }
        return;
      }
      case "array": {
        // Friendly for javascript null array === zero-length array
        if (datum && datum.length > 0) {
          this.writeInt(datum.length);
          const itemType = typeOf(schema.items);
          if (itemType === "boolean") {
            this.require(datum.length);
            for (const d of datum) {
              this.buffer[this._index] = d ? 1 : 0;
              this._index++;
            }
          } else if (itemType === "double") {
            this.require(datum.length * 8);
            for (const d of datum) {
              this.buffer.writeDoubleLE(d, this._index);
              this._index += 8;
            }
          } else if (itemType === "float") {
            this.require(datum.length * 4);
            for (const d of datum) {
              this.buffer.writeFloatLE(d, this._index);
              this._index += 4;
            }
          } else if (itemType === "long") {
            this.require(datum.length * 8);
            for (const d of datum) {
              this.writeInt64(d);
            }
          } else if (itemType === "int") {
            this.require(datum.length * 4);
            for (const d of datum) {
              this.writeInt(d);
            }
          } else {
            for (const d of datum) {
              this.writeDatumWithType(schema.items, itemType, d, false);
            }
          }
        }
        this.writeInt(0);
        return;
      }
      case "map": {
        const count = datum.size;
        if (count > 0) {
          this.writeInt(count);
          datum.forEach((value: any, key: string) => {
            this.writeString(key);
            this.writeDatum(schema.values, value, false);
          });
        }
        this.writeInt(0);
        break;
      }
      case "union": {
        /// Special handling for nullable unions in ETP
        if (schema[0] === "null") {
          if (datum == null) {
            this.writeInt(0);
            return;
          } else if (
            schema.length === 2 &&
            !Object.prototype.hasOwnProperty.call(datum, schema[1])
          ) {
            this.writeInt(1);
            this.writeDatum(schema[1], datum, false);
            return;
          }
        }
        for (let i = 0; i < schema.length; i++) {
          if (
            datum &&
            Object.prototype.hasOwnProperty.call(datum, keyName(schema[i]))
          ) {
            this.writeInt(i);
            this.writeDatum(schema[i], datum[keyName(schema[i])], false);
            return;
          }
        }
        throw new Error(`Invalid value ${datum} for union: ${schema}`);
      }
      default: {
        if (this.schemas.findSchema(type) === undefined) {
          throw new Error(`Unsupported schema type ${type}`);
        }
        this.writeDatum(this.schemas.findSchema(type), datum, false);
      }
    }
  }

  private alloc(size: number) {
    this.buffer = Buffer.alloc(size);
  }

  private realloc(size: number) {
    const old = this.buffer;
    this.alloc(size * 1.6);
    this.buffer.set(old);
  }

  private require(bytes: number) {
    if (this.buffer.length < this._index + bytes) {
      this.realloc(this._index + bytes);
    }
  }

  private encode(schema: any, datum: any) {
    this._index = 0;
    this.writeDatum(schema, datum, true);
    return this.buffer.subarray(0, this._index);
  }

  private writeByte(b: number) {
    this.require(1);
    this.buffer[this._index] = b;
    this._index++;
  }

  private writeBoolean(value: boolean) {
    this.writeByte(value ? 1 : 0);
  }

  private writeInt(value: number) {
    {
      this.require(4);
      if (value >= -1073741824 && value < 1073741824) {
        // Won't overflow, we can use integer arithmetic.
        let m = value >= 0 ? value << 1 : (~value << 1) | 1;
        do {
          this.buffer[this._index] = m & 0x7f;
          m >>= 7;
        } while (m && (this.buffer[this._index++] |= 0x80));
      } else {
        // We have to use slower floating arithmetic.
        let f = value >= 0 ? value * 2 : -value * 2 - 1;
        do {
          this.buffer[this._index] = f & 0x7f;
          f /= 128;
        } while (f >= 1 && (this.buffer[this._index++] |= 0x80));
      }
      this._index++;
    }
  }

  private writeInt64(value: Integer64) {
    {
      this.require(8);
      if (value >= BigInt(-1073741824) && value < BigInt(1073741824)) {
        // Won't overflow, we can use integer arithmetic.
        let m =
          value >= BigInt(0)
            ? value << BigInt(1)
            : (~value << BigInt(1)) | BigInt(1);
        do {
          this.buffer[this._index] = Number(m & BigInt(0x7f));
          m >>= BigInt(7);
        } while (m && (this.buffer[this._index++] |= 0x80));
      } else {
        // We have to use slower floating arithmetic.
        let f = value >= 0 ? value * BigInt(2) : -value * BigInt(2) - BigInt(1);
        do {
          this.buffer[this._index] = Number(f & BigInt(0x7f));
          f /= BigInt(128);
        } while (f >= 1 && (this.buffer[this._index++] |= 0x80));
      }
      this._index++;
    }
  }

  private writeFloat(f: number) {
    this.require(4);
    this.buffer.writeFloatLE(f, this._index);
    this._index += 4;
  }

  private writeDouble(value: number) {
    this.require(8);
    this.buffer.writeDoubleLE(value, this._index);
    this._index += 8;
  }

  private writeBytes(bytes: Buffer) {
    this.writeInt(bytes.length);
    this.require(bytes.length);
    bytes.copy(this.buffer, this._index);
    this._index += bytes.length;
  }

  private writeString(str: string) {
    if (!str || str.length === 0) {
      this.writeInt(0);
      return;
    }
    // default encoding is utf-8
    this.writeBytes(Buffer.from(str));
  }

  private writeIndex(idx: number) {
    this.writeInt(idx);
  }

  private writeMapStart() {
    // To Be Implemented
  }
  private writeMapEnd() {
    // To Be Implemented
  }
}
export class SchemaCache {
  private protocolToSchemas = new Map<string, string>();
  private schemas = new Map<string, any>();
  /**
   * Creates an instance of SchemaCache.
   * @param {any[]} schemaArray schema to store the content from
   * @memberof SchemaCache
   */
  constructor(schemaArray: any[]) {
    schemaArray.forEach(e => this.store(e));
  }

  /**
   * Validate a datum against its schema
   *
   * @param {*} schema
   * @param {*} datum
   * @returns
   * @memberof SchemaCache
   */
  public validate(schema: any, datum: any) {
    const type = typeOf(schema);
    return this.validateWithType(schema, type, datum);
  }

  /**
   * Validate a datum against its schema
   *
   * @param {*} schema
   * @param {*} datum
   * @returns
   * @memberof SchemaCache
   */
  public validateWithType(schema: any, type: string, datum: any) {
    switch (type) {
      // Primitive types
      case "null": {
        if (datum !== null) {
          throw new Error(`Invalid null value: ${datum}`);
        }
        return true;
      }
      case "boolean": {
        if (typeof datum !== "boolean") {
          throw new Error(`Invalid boolean value: ${datum}`);
        }
        return true;
      }
      case "int": {
        if (typeof datum !== "number") {
          throw new Error(`Invalid integer value: ${datum}`);
        }
        break;
      }
      case "long": {
        if (typeof datum !== "bigint") {
          throw new Error(`Invalid bigint value: ${datum}`);
        }
        break;
      }
      case "float":
      case "double": {
        if (typeof datum !== "number" || isNaN(datum)) {
          // or isNan
          throw new Error(`Invalid floating value: ${datum}`);
        }
        break;
      }
      case "bytes":
      case "string": {
        if (typeof datum !== "string") {
          throw new Error(`Invalid string value: ${datum}`);
        }
        return true;
      }
      // Complex types
      case "record": {
        if (!schema) {
          throw new Error(`Invalid schema use for validating ${datum}`);
        }
        schema.fields.forEach((e: any) => this.validate(e.type, datum[e.name]));
        return true;
      }
      case "enum": {
        if (!schema) {
          throw new Error(`Invalid schema use for validating ${datum}`);
        }
        if (datum >= schema.symbols.length) {
          throw new Error(
            `Invalid enum value: ${datum} expecting an integer less than ${schema.symbols.length}`
          );
        }
        return true;
      }
      case "fixed": {
        return true;
      }
      case "array": {
        if (!schema) {
          throw new Error(`Invalid schema use for validating ${datum}`);
        }
        if (datum.length > 0) {
          datum.forEach((e: any) => this.validate(schema.items, e));
        }
        return true;
      }
      case "map": {
        let count = 0;
        for (const thisVar in datum) {
          if (Object.prototype.hasOwnProperty.call(datum, thisVar)) {
            ++count;
          }
        }
        if (count > 0) {
          for (const k in datum) {
            this.validate(schema.values, k);
          }
        }
        break;
      }
      case "union": {
        if (
          Object.values(schema).find(e => {
            // Go through each individual type to see if one validate
            const t = e as string;
            let ok = true;
            try {
              this.validateWithType(this.findSchema(t), t, datum);
            } catch {
              ok = false;
            }
            return ok;
          })
        ) {
          return true;
        }
        throw new Error(`Invalid value ${datum} for union: ${schema}`);
      }
      default: {
        if (this.findSchema(type) === undefined) {
          throw new Error(`Unsupported schema type ${type}`);
        }
        this.validate(this.findSchema(type), datum);
      }
    }
    return true;
  }

  public schemaName(protocol: number, messageType: number): string | undefined {
    return this.protocolToSchemas.get(`${protocol}.${messageType}`);
  }

  public findSchema(fullName: string): any | undefined {
    return this.schemas.get(fullName);
  }

  private importSchemas() {
    // TODO
  }

  private store(schema: any) {
    const fullName = schema.namespace
      ? `${schema.namespace}.${schema.name}`
      : schema.name;
    if (fullName !== undefined) {
      this.protocolToSchemas.set(
        `${schema.protocol}.${schema.messageType}`,
        fullName
      );
      this.schemas.set(fullName, schema);
      if (schema.fields !== undefined) {
        schema.fields.forEach((e: any) => this.store(e.type));
      }
    }
  }
}
