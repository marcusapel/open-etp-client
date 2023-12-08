/*
 *License notice
 *
 * Energistics copyright 2015-
 * Energistics Transfer Protocol
 *
 * All rights of any portion thereof, shall remain with Energistics or its suppliers
 * and shall remain subject to the terms of the Product License Agreement available at
 * http://www.energistics.org/product-license-agreement.
 *
 * Apache
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file
 * except in compliance with the License.
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
 * either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the
 * License.
 *
 * All rights reserved.
 *
 */

/*  generator.ts  - Typescript class from the ETP Avro schemas.
 *  requires node.js
 *  - assumes the existence of etp.json file, which has been sorted
 *  - into dependency order (see genProtocol.js, in the folder src).
 *
 *  Assumption is that there are no anonymous types except unions. In a pre-
 *  processing step, unions are decorated with unique types names and the
 *  fields containing the unions are converted to use this unique name. Unions
 *  still are of type array at base, and so are recognized as such and we
 *  generate a custom class and traits for them.
 *
 */

import fs from "fs";
import { program } from "commander";

program
  .version("0.0.1")
  .description("Generate typescript types from avro definition")
  .option(
    "-i, --inputFile <path>",
    "AVRO input file",
    "./src/lib/common/etp.json"
  )
  .option(
    "-o, --outputFile <path>",
    "Generated typescript file",
    "./src/lib/common/Etp12.ts"
  )
  .option("-h, --help", "Display help")
  .parse();

// Command-line arguments
const argv = program.opts();
if (argv.help) {
  program.help();
}

// ============================================================================
// Copyright 2019-2023 Emerson Paradigm Holding LLC. All rights reserved.
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
interface IModulePair {
  name: string;
  module: string;
}

const protocol = fs.readFileSync(argv.inputFile, "ascii");
interface ISchema {
  default?: string;
  name: string;
  type: any;
  fullName: string;
  symbols?: string[];
  fields?: ISchema[];
  items?: string | string[];
  values?: string;
  protocol?: number;
  messageType?: number;
  size?: number;
}
const schemas: ISchema[] = JSON.parse(protocol).types;

class ClassMaker {
  public definedTypes: Record<string, ISchema> = {};
  public definitions = "";
  public messages = {};
  // eslint-disable-next-line no-console
  private readonly log = console.log;
  private buffer = "";
  private indent = 0;
  public jsName(name: string | Record<string, unknown>): string {
    if (this.typeOf(name) === "object") {
      const obj = name as Record<string, unknown>;
      if ("type" in obj && "items" in obj) {
        const arr = name as {
          type: string;
          items: string;
        };
        return `${this.jsName(arr.items)}[]`;
      }
    }
    const stringName = name as string;
    switch (stringName) {
      case "null":
        return "null";
      case "int":
        return "Integer32";
      case "long":
        return "Integer64";
      case "float":
        return "Float";
      case "double":
        return "Double";
      case "string":
        return "AvroString";
      case "bytes":
        return "Bytes";
      case "boolean":
        return "boolean";
      default:
        return stringName;
    }
  }

  // The next batch of methods are just helpers to create a pretty-printed output.

  public write(token: string) {
    for (let i = 0; i < this.indent; i++) {
      this.buffer += "\t";
    }
    this.buffer += token;
  }

  public writeBlock(text: string) {
    const lines = text.split("\n");
    for (const line of lines) {
      this.write(line);
    }
  }

  public start(token: string) {
    this.write(token);
    this.write("\n");
    this.indent++;
  }

  public end(token: string) {
    this.indent--;
    this.write(token);
    this.write("\n");
  }

  public beginNamespace(name: string) {
    const parts: string[] = name.split(".");
    parts.pop();
    parts.forEach(p => this.start(`export namespace ${p} {`));
  }

  public endNamespace(name: string) {
    const parts = name.split(".");
    parts.pop();
    parts.forEach(() => this.end("}"));
  }

  public line(token: string) {
    this.write(`${token}\n`);
  }

  public typeOf(value: any) {
    let s: string = typeof value;
    if (s === "object") {
      if (value) {
        if (value instanceof Array) {
          s = "array";
        }
      } else {
        s = "null";
      }
    }
    return s;
  }

  public unqualifiedName(name: string) {
    return name.split(".").pop();
  }

  public defaultValue(schema: ISchema) {
    if (schema.default) {
      return schema.type === "string" ? `'${schema.default}'` : schema.default;
    }
    switch (schema.type) {
      case "bytes":
        return "Buffer.alloc(0)";
      case "fixed":
        return schema.size ? `[0${",0".repeat(schema.size - 1)}]` : "[]";
      case "string":
        return "''";
      case "array":
        return "[]";
      case "boolean":
        return "false";
      case "int":
      case "long":
      case "float":
      case "double":
        return "0";
      case "enum":
        return schema.symbols ? `${schema.fullName}.${schema.symbols[0]}` : "";
      case "record":
        return `new ${schema.fullName}()`;
      default:
        return "null";
    }
  }

  public computeType(anySchema: any) {
    const schema = anySchema as ISchema;
    const type = this.typeOf(anySchema);
    switch (type) {
      case "object":
        return schema.type;
      case "string":
        return anySchema as string;
      case "array":
        return "union";
      default:
        throw new Error(`R:Invalid schema type: ${type} in computeType()`);
    }
  }

  public processRecord(schema: ISchema, name: string) {
    if (this.definedTypes[name] === undefined) {
      this.definedTypes[name] = schema;
      this.beginNamespace(name);
      let className = name.split(".").pop();
      if (className === "Object") {
        // As Object is a reserved word...
        className = "Object_";
      }
      this.start(`export class ${className} {`);
      this.line(
        `public static _schema : any = JSON.parse(\`${JSON.stringify(
          schema,
          null,
          2
        )}\`);`
      );
      if (this.isMessage(schema)) {
        this.line(`public static _protocol = ${Number(schema.protocol)};`);
        this.line(
          `public static _messageTypeId = ${Number(schema.messageType)};`
        );
      }
      schema.fields &&
        schema.fields.map(f => {
          this.writeType(f, f.name);
        });
      this.end("}");
      if (this.isMessage(schema)) {
        this.line(
          `export const Msg${name.split(".").pop()} = ${Number(
            schema.messageType
          )};`
        );
      }
      this.endNamespace(name);
    } else {
      this.line(`public ${name} : ${name};`);
    }
  }

  /**
   * Provide a enum value for a given protocol, if not defined return default index
   * @param symbol
   * @param index
   * @returns
   */
  private protocolNumber(symbol: string, index: number): number {
    // Custom Protocols
    if (symbol === "DataspaceOSDU") {
      return 2424;
    }
    return index;
  }

  /**
   * Provide a custom value for a given enum value, if not defined return default index
   * @param name Name of the enum
   * @param value Symbol value
   * @param index Index of the symbol
   * @returns
   */
  private enumValue(name: string, value: string, index: number): number {
    if (name === "Energistics.Etp.v12.Datatypes.Protocol") {
      return this.protocolNumber(value, index);
    }
    return index;
  }

  public processEnum(schema: ISchema, name: string) {
    this.log(`Generating: ${name}`);
    this.definedTypes[name] = schema;
    this.beginNamespace(name);
    this.start(`export enum ${schema.name} {`);
    const symbolsLast = schema.symbols ? schema.symbols.length - 1 : 0;
    schema.symbols &&
      schema.symbols.forEach((value, index) =>
        this.line(
          `${value}=${this.enumValue(name, value, index)}${
            index === symbolsLast ? "" : ","
          }`
        )
      );
    this.end("}");
    this.endNamespace(name);
  }

  public writeType(anySchema: any, name: string) {
    const type = this.computeType(anySchema);

    const schema = anySchema as ISchema;
    const defaultValue = this.defaultValue(schema);

    switch (type) {
      // Primitive types
      case "null": {
        return;
      }

      case "boolean": {
        this.line(
          `public ${name}${defaultValue ? "" : ": boolean"} = ${defaultValue};`
        );
        return;
      }

      case "int": {
        this.line(`public ${name}: Integer32 = ${defaultValue};`);
        return;
      }
      case "long": {
        this.line(`public ${name}: Integer64 = BigInt(${defaultValue});`);
        return;
      }
      case "float": {
        this.line(`public ${name}: Float = ${defaultValue};`);
        return;
      }
      case "double": {
        this.line(`public ${name}: Double = ${defaultValue};`);
        return;
      }

      case "bytes": {
        this.line(`public ${name}: Bytes = ${defaultValue};`);
        return;
      }

      case "string": {
        this.line(`public ${name}: AvroString = ${defaultValue};`);
        return;
      }

      // Complex types
      case "record": {
        this.processRecord(schema, name);
        return;
      }

      case "enum": {
        this.processEnum(schema, name);
        return;
      }

      case "array": {
        if (schema.items) {
          if (Array.isArray(schema.items)) {
            if (schema.items.length === 1) {
              this.line(
                `/** @maxItems 100000 */
                public ${name}: ${this.jsName(schema.items[0])}[]=[];`
              );
            } else {
              this.line(
                `/** @maxItems 100000 */
                public ${name}: Array<${schema.items
                  .map(i => this.jsName(i))
                  .join("|")}> =[];`
              );
            }
          } else {
            this.line(
              `/** @maxItems 100000 */
            public ${name}: ${this.jsName(schema.items)}[]=[];`
            );
          }
        }
        return;
      }

      case "map": {
        schema.values &&
          this.line(
            `public ${name} = new Map<AvroString, ${this.jsName(
              schema.values
            )}>();`
          );
        return;
      }

      case "union": {
        const types = anySchema as string[];
        const nullIndex = types.indexOf("null");
        if (types.length > 2 || nullIndex < 0) {
          const typeNames = types
            .filter(t => t !== "null")
            .map(ty => `"${this.keyName(ty)}"`)
            .join("|");
          if (nullIndex >= 0) {
            this.start(`public ${name}: {`);
            types.splice(nullIndex, 1);
            types.forEach(t =>
              this.line(`${this.keyName(t)} ?: ${this.jsName(t)},`)
            );
            this.line(`__keyName: ${typeNames}`);
            this.end(`} | null = null`);
          } else {
            this.start(`public ${name}: {`);
            types.forEach(t =>
              this.line(`${this.keyName(t)} ?: ${this.jsName(t)},`)
            );
            this.line(`__keyName: ${typeNames}`);
            this.line(`} = {`);
            this.line(
              `${this.keyName(types[0])} : ${this.defaultValue(
                this.definedTypes[this.jsName(types[0])]
              )},`
            );
            this.line(`__keyName: "${this.keyName(this.jsName(types[0]))}"`);
            this.end(`};`);
          }
        } else {
          this.line(
            `public ${name}: ${types.map(t => this.jsName(t)).join(" | ")} = ${
              nullIndex >= 0
                ? "null"
                : this.defaultValue(this.definedTypes[this.jsName(types[0])])
            };`
          );
        }
        return;
      }

      case "fixed": {
        this.definedTypes[name] = schema;
        this.beginNamespace(name);
        const arrayString = schema.size
          ? `[number${",number".repeat(schema.size - 1)}]`
          : [];
        this.line(`export type ${schema.name} = ${arrayString}`);
        this.endNamespace(name);
        return;
      }

      default: {
        if (this.definedTypes[type] !== undefined) {
          this.line(
            `public ${name}: ${type} = ${this.defaultValue(
              this.definedTypes[type]
            )};`
          );
        } else {
          this.writeType(schema.type, name);
        }
      }
    }
  }

  public isMessage(schema: ISchema) {
    return (
      schema.messageType &&
      schema.protocol &&
      schema.messageType >= 0 &&
      schema.protocol >= 0
    );
  }

  public createClasses(schemas1: ISchema[]) {
    this.log("Processing schema list");
    schemas1.forEach(s => {
      this.log(`Generating: ${s.fullName}`);
      this.writeType(s, s.fullName);
    });
    this.definitions = this.buffer;
  }

  private keyName(typeName: string): string {
    return `_${typeName.split(".").pop()}`.replace("[]", "__array__");
  }
}

const classes = new ClassMaker();
classes.createClasses(schemas);

const fdw = fs.openSync(argv.outputFile, "w");

fs.writeSync(fdw, "/* eslint-disable @typescript-eslint/no-namespace */\n");

fs.writeSync(
  fdw,
  `
/**
 * @pattern ^.*$
 * @maxLength 2048
 */
export type AvroString = string;

/**
 * @example 1
 * @isInt
 * @format int32
 * @minimum 0
 * @maximum 10000
 */
export type Integer32 = number;

/**
 * @example 1
 * @isInt
 * @format int64
 * @minimum 0
 * @maximum 10000
 */
export type Integer64 = bigint;

/**
 * @example 1
 * @isInt
 * @format int32
 * @minimum 0
 * @maximum 10000
 */
export type Integer8 = number;

/**
 * @minimum -1e38
 * @maximum 1e38
 * @isFloat
 */
export type Float = number;
/**
 * @minimum -1e100
 * @maximum 1e100
 * @isFloat
 */
export type Double = number;

export type Bytes = Buffer;

/** @isBool*/
export type Boolean = boolean
`
);
fs.writeSync(fdw, "export function keyName(typeName: string): string {");
fs.writeSync(
  fdw,
  '  return `${typeName.split(".").pop()}`.replace("[]", "__array__")'
);
fs.writeSync(fdw, "}");

fs.writeSync(fdw, classes.definitions);
fs.close(fdw, () => undefined);

// eslint-disable-next-line no-console
console.dir(classes.messages);
