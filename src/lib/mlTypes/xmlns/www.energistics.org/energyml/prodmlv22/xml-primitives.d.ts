// Source files:
//

interface HandlerInstance {
  content?: any;
  _exists: boolean;
  _namespace: string;
  _parent?: HandlerInstance;
  _name?: string;
  _before?(): void;
  _after?(): void;
}
interface BaseType extends HandlerInstance {
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

export interface document {}
export const document: document;
