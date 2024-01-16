// Source files:
//

interface BaseType {
  _exists: boolean;
  _namespace: string;
  $type?: string;
}
export interface _any extends BaseType {
  _: any;
}

export interface _boolean extends BaseType {
  _: boolean;
}

export interface _Date extends BaseType {
  _: Date;
}

export interface _number extends BaseType {
  _: number;
}

export interface _string extends BaseType {
  _: string;
}

export interface document extends BaseType {}
export const document: document;
