/* eslint-disable @typescript-eslint/no-namespace */

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
export type Boolean = boolean;
export function keyName(typeName: string): string {
  return `${typeName.split(".").pop()}`.replace("[]", "__array__");
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace ChannelDataFrame {
          export class GetFrameMetadata {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.ChannelDataFrame",
  "name": "GetFrameMetadata",
  "protocol": "2",
  "messageType": "1",
  "senderRole": "customer",
  "protocolRoles": "store,customer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "uri",
      "type": "string"
    },
    {
      "name": "includeAllChannelSecondaryIndexes",
      "type": "boolean",
      "default": false
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.ChannelDataFrame.GetFrameMetadata",
  "depends": []
}`);
            public static _protocol = 2;
            public static _messageTypeId = 1;
            public uri: AvroString = "";
            public includeAllChannelSecondaryIndexes = false;
          }
          export const MsgGetFrameMetadata = 1;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace ChannelDataLoad {
          export class ChannelsClosed {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.ChannelDataLoad",
  "name": "ChannelsClosed",
  "protocol": "22",
  "messageType": "7",
  "senderRole": "store",
  "protocolRoles": "store,customer",
  "multipartFlag": true,
  "fields": [
    {
      "name": "reason",
      "type": "string"
    },
    {
      "name": "id",
      "type": {
        "type": "map",
        "values": "long"
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.ChannelDataLoad.ChannelsClosed",
  "depends": []
}`);
            public static _protocol = 22;
            public static _messageTypeId = 7;
            public reason: AvroString = "";
            public id = new Map<AvroString, Integer64>();
          }
          export const MsgChannelsClosed = 7;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace ChannelDataLoad {
          export class CloseChannels {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.ChannelDataLoad",
  "name": "CloseChannels",
  "protocol": "22",
  "messageType": "3",
  "senderRole": "customer",
  "protocolRoles": "store,customer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "id",
      "type": {
        "type": "map",
        "values": "long"
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.ChannelDataLoad.CloseChannels",
  "depends": []
}`);
            public static _protocol = 22;
            public static _messageTypeId = 3;
            public id = new Map<AvroString, Integer64>();
          }
          export const MsgCloseChannels = 3;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace ChannelDataLoad {
          export class OpenChannels {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.ChannelDataLoad",
  "name": "OpenChannels",
  "protocol": "22",
  "messageType": "1",
  "senderRole": "customer",
  "protocolRoles": "store,customer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "uris",
      "type": {
        "type": "map",
        "values": "string"
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.ChannelDataLoad.OpenChannels",
  "depends": []
}`);
            public static _protocol = 22;
            public static _messageTypeId = 1;
            public uris = new Map<AvroString, AvroString>();
          }
          export const MsgOpenChannels = 1;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace ChannelDataLoad {
          export class ReplaceRangeResponse {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.ChannelDataLoad",
  "name": "ReplaceRangeResponse",
  "protocol": "22",
  "messageType": "8",
  "senderRole": "store",
  "protocolRoles": "store,customer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "channelChangeTime",
      "type": "long"
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.ChannelDataLoad.ReplaceRangeResponse",
  "depends": []
}`);
            public static _protocol = 22;
            public static _messageTypeId = 8;
            public channelChangeTime: Integer64 = BigInt(0);
          }
          export const MsgReplaceRangeResponse = 8;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace ChannelDataLoad {
          export class TruncateChannelsResponse {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.ChannelDataLoad",
  "name": "TruncateChannelsResponse",
  "protocol": "22",
  "messageType": "10",
  "senderRole": "store",
  "protocolRoles": "store,customer",
  "multipartFlag": true,
  "fields": [
    {
      "name": "channelsTruncatedTime",
      "type": {
        "type": "map",
        "values": "long"
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.ChannelDataLoad.TruncateChannelsResponse",
  "depends": []
}`);
            public static _protocol = 22;
            public static _messageTypeId = 10;
            public channelsTruncatedTime = new Map<AvroString, Integer64>();
          }
          export const MsgTruncateChannelsResponse = 10;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace ChannelStreaming {
          export class StartStreaming {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.ChannelStreaming",
  "name": "StartStreaming",
  "protocol": "1",
  "messageType": "3",
  "senderRole": "consumer",
  "protocolRoles": "producer,consumer",
  "multipartFlag": false,
  "fields": [],
  "fullName": "Energistics.Etp.v12.Protocol.ChannelStreaming.StartStreaming",
  "depends": []
}`);
            public static _protocol = 1;
            public static _messageTypeId = 3;
          }
          export const MsgStartStreaming = 3;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace ChannelStreaming {
          export class StopStreaming {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.ChannelStreaming",
  "name": "StopStreaming",
  "protocol": "1",
  "messageType": "4",
  "senderRole": "consumer",
  "protocolRoles": "producer,consumer",
  "multipartFlag": false,
  "fields": [],
  "fullName": "Energistics.Etp.v12.Protocol.ChannelStreaming.StopStreaming",
  "depends": []
}`);
            public static _protocol = 1;
            public static _messageTypeId = 4;
          }
          export const MsgStopStreaming = 4;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace ChannelSubscribe {
          export class GetChannelMetadata {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.ChannelSubscribe",
  "name": "GetChannelMetadata",
  "protocol": "21",
  "messageType": "1",
  "senderRole": "customer",
  "protocolRoles": "store,customer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "uris",
      "type": {
        "type": "map",
        "values": "string"
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.ChannelSubscribe.GetChannelMetadata",
  "depends": []
}`);
            public static _protocol = 21;
            public static _messageTypeId = 1;
            public uris = new Map<AvroString, AvroString>();
          }
          export const MsgGetChannelMetadata = 1;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace ChannelSubscribe {
          export class SubscribeChannelsResponse {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.ChannelSubscribe",
  "name": "SubscribeChannelsResponse",
  "protocol": "21",
  "messageType": "12",
  "senderRole": "store",
  "protocolRoles": "store,customer",
  "multipartFlag": true,
  "fields": [
    {
      "name": "success",
      "type": {
        "type": "map",
        "values": "string"
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.ChannelSubscribe.SubscribeChannelsResponse",
  "depends": []
}`);
            public static _protocol = 21;
            public static _messageTypeId = 12;
            public success = new Map<AvroString, AvroString>();
          }
          export const MsgSubscribeChannelsResponse = 12;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace ChannelSubscribe {
          export class SubscriptionsStopped {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.ChannelSubscribe",
  "name": "SubscriptionsStopped",
  "protocol": "21",
  "messageType": "8",
  "senderRole": "store",
  "protocolRoles": "store,customer",
  "multipartFlag": true,
  "fields": [
    {
      "name": "reason",
      "type": "string"
    },
    {
      "name": "channelIds",
      "type": {
        "type": "map",
        "values": "long"
      },
      "default": {}
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.ChannelSubscribe.SubscriptionsStopped",
  "depends": []
}`);
            public static _protocol = 21;
            public static _messageTypeId = 8;
            public reason: AvroString = "";
            public channelIds = new Map<AvroString, Integer64>();
          }
          export const MsgSubscriptionsStopped = 8;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace ChannelSubscribe {
          export class UnsubscribeChannels {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.ChannelSubscribe",
  "name": "UnsubscribeChannels",
  "protocol": "21",
  "messageType": "7",
  "senderRole": "customer",
  "protocolRoles": "store,customer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "channelIds",
      "type": {
        "type": "map",
        "values": "long"
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.ChannelSubscribe.UnsubscribeChannels",
  "depends": []
}`);
            public static _protocol = 21;
            public static _messageTypeId = 7;
            public channelIds = new Map<AvroString, Integer64>();
          }
          export const MsgUnsubscribeChannels = 7;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace Core {
          export class Acknowledge {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.Core",
  "name": "Acknowledge",
  "protocol": "0",
  "messageType": "1001",
  "senderRole": "*",
  "protocolRoles": "client, server",
  "multipartFlag": false,
  "fields": [],
  "fullName": "Energistics.Etp.v12.Protocol.Core.Acknowledge",
  "depends": []
}`);
            public static _protocol = 0;
            public static _messageTypeId = 1001;
          }
          export const MsgAcknowledge = 1001;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace Core {
          export class Authorize {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.Core",
  "name": "Authorize",
  "protocol": "0",
  "messageType": "6",
  "senderRole": "client,server",
  "protocolRoles": "client, server",
  "multipartFlag": false,
  "fields": [
    {
      "name": "authorization",
      "type": "string"
    },
    {
      "name": "supplementalAuthorization",
      "type": {
        "type": "map",
        "values": "string"
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.Core.Authorize",
  "depends": []
}`);
            public static _protocol = 0;
            public static _messageTypeId = 6;
            public authorization: AvroString = "";
            public supplementalAuthorization = new Map<
              AvroString,
              AvroString
            >();
          }
          export const MsgAuthorize = 6;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace Core {
          export class AuthorizeResponse {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.Core",
  "name": "AuthorizeResponse",
  "protocol": "0",
  "messageType": "7",
  "senderRole": "client,server",
  "protocolRoles": "client, server",
  "multipartFlag": false,
  "fields": [
    {
      "name": "success",
      "type": "boolean"
    },
    {
      "name": "challenges",
      "type": {
        "type": "array",
        "items": "string"
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.Core.AuthorizeResponse",
  "depends": []
}`);
            public static _protocol = 0;
            public static _messageTypeId = 7;
            public success = false;
            /** @maxItems 100000 */
            public challenges: AvroString[] = [];
          }
          export const MsgAuthorizeResponse = 7;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace Core {
          export class CloseSession {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.Core",
  "name": "CloseSession",
  "protocol": "0",
  "messageType": "5",
  "senderRole": "client,server",
  "protocolRoles": "client, server",
  "multipartFlag": false,
  "fields": [
    {
      "name": "reason",
      "type": "string",
      "default": ""
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.Core.CloseSession",
  "depends": []
}`);
            public static _protocol = 0;
            public static _messageTypeId = 5;
            public reason: AvroString = "";
          }
          export const MsgCloseSession = 5;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace Core {
          export class Pong {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.Core",
  "name": "Pong",
  "protocol": "0",
  "messageType": "9",
  "senderRole": "client,server",
  "protocolRoles": "client, server",
  "multipartFlag": false,
  "fields": [
    {
      "name": "currentDateTime",
      "type": "long"
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.Core.Pong",
  "depends": []
}`);
            public static _protocol = 0;
            public static _messageTypeId = 9;
            public currentDateTime: Integer64 = BigInt(0);
          }
          export const MsgPong = 9;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace Core {
          export class Ping {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.Core",
  "name": "Ping",
  "protocol": "0",
  "messageType": "8",
  "senderRole": "client,server",
  "protocolRoles": "client, server",
  "multipartFlag": false,
  "fields": [
    {
      "name": "currentDateTime",
      "type": "long"
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.Core.Ping",
  "depends": []
}`);
            public static _protocol = 0;
            public static _messageTypeId = 8;
            public currentDateTime: Integer64 = BigInt(0);
          }
          export const MsgPing = 8;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace DataArray {
          export class PutDataArraysResponse {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.DataArray",
  "name": "PutDataArraysResponse",
  "protocol": "9",
  "messageType": "10",
  "senderRole": "store",
  "protocolRoles": "store,customer",
  "multipartFlag": true,
  "fields": [
    {
      "name": "success",
      "type": {
        "type": "map",
        "values": "string"
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.DataArray.PutDataArraysResponse",
  "depends": []
}`);
            public static _protocol = 9;
            public static _messageTypeId = 10;
            public success = new Map<AvroString, AvroString>();
          }
          export const MsgPutDataArraysResponse = 10;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace DataArray {
          export class PutDataSubarraysResponse {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.DataArray",
  "name": "PutDataSubarraysResponse",
  "protocol": "9",
  "messageType": "11",
  "senderRole": "store",
  "protocolRoles": "store,customer",
  "multipartFlag": true,
  "fields": [
    {
      "name": "success",
      "type": {
        "type": "map",
        "values": "string"
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.DataArray.PutDataSubarraysResponse",
  "depends": []
}`);
            public static _protocol = 9;
            public static _messageTypeId = 11;
            public success = new Map<AvroString, AvroString>();
          }
          export const MsgPutDataSubarraysResponse = 11;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace DataArray {
          export class PutUninitializedDataArraysResponse {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.DataArray",
  "name": "PutUninitializedDataArraysResponse",
  "protocol": "9",
  "messageType": "12",
  "senderRole": "store",
  "protocolRoles": "store,customer",
  "multipartFlag": true,
  "fields": [
    {
      "name": "success",
      "type": {
        "type": "map",
        "values": "string"
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.DataArray.PutUninitializedDataArraysResponse",
  "depends": []
}`);
            public static _protocol = 9;
            public static _messageTypeId = 12;
            public success = new Map<AvroString, AvroString>();
          }
          export const MsgPutUninitializedDataArraysResponse = 12;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace Dataspace {
          export class DeleteDataspaces {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.Dataspace",
  "name": "DeleteDataspaces",
  "protocol": "24",
  "messageType": "4",
  "senderRole": "customer",
  "protocolRoles": "store,customer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "uris",
      "type": {
        "type": "map",
        "values": "string"
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.Dataspace.DeleteDataspaces",
  "depends": []
}`);
            public static _protocol = 24;
            public static _messageTypeId = 4;
            public uris = new Map<AvroString, AvroString>();
          }
          export const MsgDeleteDataspaces = 4;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace Dataspace {
          export class DeleteDataspacesResponse {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.Dataspace",
  "name": "DeleteDataspacesResponse",
  "protocol": "24",
  "messageType": "5",
  "senderRole": "store",
  "protocolRoles": "store,customer",
  "multipartFlag": true,
  "fields": [
    {
      "name": "success",
      "type": {
        "type": "map",
        "values": "string"
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.Dataspace.DeleteDataspacesResponse",
  "depends": []
}`);
            public static _protocol = 24;
            public static _messageTypeId = 5;
            public success = new Map<AvroString, AvroString>();
          }
          export const MsgDeleteDataspacesResponse = 5;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace Dataspace {
          export class GetDataspaces {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.Dataspace",
  "name": "GetDataspaces",
  "protocol": "24",
  "messageType": "1",
  "senderRole": "customer",
  "protocolRoles": "store,customer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "storeLastWriteFilter",
      "type": [
        "null",
        "long"
      ]
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.Dataspace.GetDataspaces",
  "depends": []
}`);
            public static _protocol = 24;
            public static _messageTypeId = 1;
            public storeLastWriteFilter: null | Integer64 = null;
          }
          export const MsgGetDataspaces = 1;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace Dataspace {
          export class PutDataspacesResponse {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.Dataspace",
  "name": "PutDataspacesResponse",
  "protocol": "24",
  "messageType": "6",
  "senderRole": "store",
  "protocolRoles": "store,customer",
  "multipartFlag": true,
  "fields": [
    {
      "name": "success",
      "type": {
        "type": "map",
        "values": "string"
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.Dataspace.PutDataspacesResponse",
  "depends": []
}`);
            public static _protocol = 24;
            public static _messageTypeId = 6;
            public success = new Map<AvroString, AvroString>();
          }
          export const MsgPutDataspacesResponse = 6;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace Discovery {
          export class GetDeletedResources {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.Discovery",
  "name": "GetDeletedResources",
  "protocol": "3",
  "messageType": "5",
  "senderRole": "customer",
  "protocolRoles": "store,customer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "dataspaceUri",
      "type": "string"
    },
    {
      "name": "deleteTimeFilter",
      "type": [
        "null",
        "long"
      ]
    },
    {
      "name": "dataObjectTypes",
      "type": {
        "type": "array",
        "items": "string"
      },
      "default": []
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.Discovery.GetDeletedResources",
  "depends": []
}`);
            public static _protocol = 3;
            public static _messageTypeId = 5;
            public dataspaceUri: AvroString = "";
            public deleteTimeFilter: null | Integer64 = null;
            /** @maxItems 100000 */
            public dataObjectTypes: AvroString[] = [];
          }
          export const MsgGetDeletedResources = 5;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace GrowingObject {
          export class DeleteParts {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.GrowingObject",
  "name": "DeleteParts",
  "protocol": "6",
  "messageType": "1",
  "senderRole": "customer",
  "protocolRoles": "store,customer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "uri",
      "type": "string"
    },
    {
      "name": "uids",
      "type": {
        "type": "map",
        "values": "string"
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.GrowingObject.DeleteParts",
  "depends": []
}`);
            public static _protocol = 6;
            public static _messageTypeId = 1;
            public uri: AvroString = "";
            public uids = new Map<AvroString, AvroString>();
          }
          export const MsgDeleteParts = 1;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace GrowingObject {
          export class DeletePartsResponse {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.GrowingObject",
  "name": "DeletePartsResponse",
  "protocol": "6",
  "messageType": "11",
  "senderRole": "store",
  "protocolRoles": "store,customer",
  "multipartFlag": true,
  "fields": [
    {
      "name": "success",
      "type": {
        "type": "map",
        "values": "string"
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.GrowingObject.DeletePartsResponse",
  "depends": []
}`);
            public static _protocol = 6;
            public static _messageTypeId = 11;
            public success = new Map<AvroString, AvroString>();
          }
          export const MsgDeletePartsResponse = 11;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace GrowingObject {
          export class GetChangeAnnotations {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.GrowingObject",
  "name": "GetChangeAnnotations",
  "protocol": "6",
  "messageType": "19",
  "senderRole": "customer",
  "protocolRoles": "store,customer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "sinceChangeTime",
      "type": "long"
    },
    {
      "name": "uris",
      "type": {
        "type": "map",
        "values": "string"
      }
    },
    {
      "name": "latestOnly",
      "type": "boolean",
      "default": false
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.GrowingObject.GetChangeAnnotations",
  "depends": []
}`);
            public static _protocol = 6;
            public static _messageTypeId = 19;
            public sinceChangeTime: Integer64 = BigInt(0);
            public uris = new Map<AvroString, AvroString>();
            public latestOnly = false;
          }
          export const MsgGetChangeAnnotations = 19;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace GrowingObject {
          export class GetGrowingDataObjectsHeader {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.GrowingObject",
  "name": "GetGrowingDataObjectsHeader",
  "protocol": "6",
  "messageType": "14",
  "senderRole": "customer",
  "protocolRoles": "store,customer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "uris",
      "type": {
        "type": "map",
        "values": "string"
      }
    },
    {
      "name": "format",
      "type": "string",
      "default": "xml"
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.GrowingObject.GetGrowingDataObjectsHeader",
  "depends": []
}`);
            public static _protocol = 6;
            public static _messageTypeId = 14;
            public uris = new Map<AvroString, AvroString>();
            public format: AvroString = "xml";
          }
          export const MsgGetGrowingDataObjectsHeader = 14;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace GrowingObject {
          export class GetParts {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.GrowingObject",
  "name": "GetParts",
  "protocol": "6",
  "messageType": "3",
  "senderRole": "customer",
  "protocolRoles": "store,customer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "uri",
      "type": "string"
    },
    {
      "name": "format",
      "type": "string",
      "default": "xml"
    },
    {
      "name": "uids",
      "type": {
        "type": "map",
        "values": "string"
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.GrowingObject.GetParts",
  "depends": []
}`);
            public static _protocol = 6;
            public static _messageTypeId = 3;
            public uri: AvroString = "";
            public format: AvroString = "xml";
            public uids = new Map<AvroString, AvroString>();
          }
          export const MsgGetParts = 3;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace GrowingObject {
          export class GetPartsMetadata {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.GrowingObject",
  "name": "GetPartsMetadata",
  "protocol": "6",
  "messageType": "8",
  "senderRole": "customer",
  "protocolRoles": "store,customer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "uris",
      "type": {
        "type": "map",
        "values": "string"
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.GrowingObject.GetPartsMetadata",
  "depends": []
}`);
            public static _protocol = 6;
            public static _messageTypeId = 8;
            public uris = new Map<AvroString, AvroString>();
          }
          export const MsgGetPartsMetadata = 8;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace GrowingObject {
          export class PutGrowingDataObjectsHeaderResponse {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.GrowingObject",
  "name": "PutGrowingDataObjectsHeaderResponse",
  "protocol": "6",
  "messageType": "17",
  "senderRole": "store",
  "protocolRoles": "store,customer",
  "multipartFlag": true,
  "fields": [
    {
      "name": "success",
      "type": {
        "type": "map",
        "values": "string"
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.GrowingObject.PutGrowingDataObjectsHeaderResponse",
  "depends": []
}`);
            public static _protocol = 6;
            public static _messageTypeId = 17;
            public success = new Map<AvroString, AvroString>();
          }
          export const MsgPutGrowingDataObjectsHeaderResponse = 17;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace GrowingObject {
          export class PutPartsResponse {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.GrowingObject",
  "name": "PutPartsResponse",
  "protocol": "6",
  "messageType": "13",
  "senderRole": "store",
  "protocolRoles": "store,customer",
  "multipartFlag": true,
  "fields": [
    {
      "name": "success",
      "type": {
        "type": "map",
        "values": "string"
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.GrowingObject.PutPartsResponse",
  "depends": []
}`);
            public static _protocol = 6;
            public static _messageTypeId = 13;
            public success = new Map<AvroString, AvroString>();
          }
          export const MsgPutPartsResponse = 13;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace GrowingObject {
          export class ReplacePartsByRangeResponse {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.GrowingObject",
  "name": "ReplacePartsByRangeResponse",
  "protocol": "6",
  "messageType": "18",
  "senderRole": "store",
  "protocolRoles": "store,customer",
  "multipartFlag": false,
  "fields": [],
  "fullName": "Energistics.Etp.v12.Protocol.GrowingObject.ReplacePartsByRangeResponse",
  "depends": []
}`);
            public static _protocol = 6;
            public static _messageTypeId = 18;
          }
          export const MsgReplacePartsByRangeResponse = 18;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace GrowingObjectNotification {
          export class SubscribePartNotificationsResponse {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.GrowingObjectNotification",
  "name": "SubscribePartNotificationsResponse",
  "protocol": "7",
  "messageType": "10",
  "senderRole": "store",
  "protocolRoles": "store,customer",
  "multipartFlag": true,
  "fields": [
    {
      "name": "success",
      "type": {
        "type": "map",
        "values": "string"
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.GrowingObjectNotification.SubscribePartNotificationsResponse",
  "depends": []
}`);
            public static _protocol = 7;
            public static _messageTypeId = 10;
            public success = new Map<AvroString, AvroString>();
          }
          export const MsgSubscribePartNotificationsResponse = 10;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace GrowingObjectQuery {
          export class FindParts {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.GrowingObjectQuery",
  "name": "FindParts",
  "protocol": "16",
  "messageType": "1",
  "senderRole": "customer",
  "protocolRoles": "store,customer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "uri",
      "type": "string"
    },
    {
      "name": "format",
      "type": "string",
      "default": "xml"
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.GrowingObjectQuery.FindParts",
  "depends": []
}`);
            public static _protocol = 16;
            public static _messageTypeId = 1;
            public uri: AvroString = "";
            public format: AvroString = "xml";
          }
          export const MsgFindParts = 1;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace StoreNotification {
          export class SubscribeNotificationsResponse {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.StoreNotification",
  "name": "SubscribeNotificationsResponse",
  "protocol": "5",
  "messageType": "10",
  "senderRole": "store",
  "protocolRoles": "store,customer",
  "multipartFlag": true,
  "fields": [
    {
      "name": "success",
      "type": {
        "type": "map",
        "values": "string"
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.StoreNotification.SubscribeNotificationsResponse",
  "depends": []
}`);
            public static _protocol = 5;
            public static _messageTypeId = 10;
            public success = new Map<AvroString, AvroString>();
          }
          export const MsgSubscribeNotificationsResponse = 10;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace Store {
          export class DeleteDataObjects {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.Store",
  "name": "DeleteDataObjects",
  "protocol": "4",
  "messageType": "3",
  "senderRole": "customer",
  "protocolRoles": "store,customer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "uris",
      "type": {
        "type": "map",
        "values": "string"
      }
    },
    {
      "name": "pruneContainedObjects",
      "type": "boolean",
      "default": false
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.Store.DeleteDataObjects",
  "depends": []
}`);
            public static _protocol = 4;
            public static _messageTypeId = 3;
            public uris = new Map<AvroString, AvroString>();
            public pruneContainedObjects = false;
          }
          export const MsgDeleteDataObjects = 3;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace Store {
          export class GetDataObjects {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.Store",
  "name": "GetDataObjects",
  "protocol": "4",
  "messageType": "1",
  "senderRole": "customer",
  "protocolRoles": "store,customer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "uris",
      "type": {
        "type": "map",
        "values": "string"
      }
    },
    {
      "name": "format",
      "type": "string",
      "default": "xml"
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.Store.GetDataObjects",
  "depends": []
}`);
            public static _protocol = 4;
            public static _messageTypeId = 1;
            public uris = new Map<AvroString, AvroString>();
            public format: AvroString = "xml";
          }
          export const MsgGetDataObjects = 1;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace Transaction {
          export class StartTransaction {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.Transaction",
  "name": "StartTransaction",
  "protocol": "18",
  "messageType": "1",
  "senderRole": "customer",
  "protocolRoles": "store,customer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "readOnly",
      "type": "boolean"
    },
    {
      "name": "message",
      "type": "string",
      "default": ""
    },
    {
      "name": "dataspaceUris",
      "type": {
        "type": "array",
        "items": "string"
      },
      "default": [
        ""
      ]
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.Transaction.StartTransaction",
  "depends": []
}`);
            public static _protocol = 18;
            public static _messageTypeId = 1;
            public readOnly = false;
            public message: AvroString = "";
            /** @maxItems 100000 */
            public dataspaceUris: AvroString[] = [];
          }
          export const MsgStartTransaction = 1;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Datatypes {
        export enum AnyArrayType {
          arrayOfBoolean = 0,
          arrayOfInt = 1,
          arrayOfLong = 2,
          arrayOfFloat = 3,
          arrayOfDouble = 4,
          arrayOfString = 5,
          bytes = 6
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Datatypes {
        export enum AnyLogicalArrayType {
          arrayOfBoolean = 0,
          arrayOfInt8 = 1,
          arrayOfUInt8 = 2,
          arrayOfInt16LE = 3,
          arrayOfInt32LE = 4,
          arrayOfInt64LE = 5,
          arrayOfUInt16LE = 6,
          arrayOfUInt32LE = 7,
          arrayOfUInt64LE = 8,
          arrayOfFloat32LE = 9,
          arrayOfDouble64LE = 10,
          arrayOfInt16BE = 11,
          arrayOfInt32BE = 12,
          arrayOfInt64BE = 13,
          arrayOfUInt16BE = 14,
          arrayOfUInt32BE = 15,
          arrayOfUInt64BE = 16,
          arrayOfFloat32BE = 17,
          arrayOfDouble64BE = 18,
          arrayOfString = 19,
          arrayOfCustom = 20
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Datatypes {
        export class ArrayOfBoolean {
          public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Datatypes",
  "name": "ArrayOfBoolean",
  "fields": [
    {
      "name": "values",
      "type": {
        "type": "array",
        "items": "boolean"
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Datatypes.ArrayOfBoolean",
  "depends": []
}`);
          /** @maxItems 100000 */
          public values: boolean[] = [];
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Datatypes {
        export class ArrayOfBytes {
          public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Datatypes",
  "name": "ArrayOfBytes",
  "fields": [
    {
      "name": "values",
      "type": {
        "type": "array",
        "items": "bytes"
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Datatypes.ArrayOfBytes",
  "depends": []
}`);
          /** @maxItems 100000 */
          public values: Bytes[] = [];
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Datatypes {
        export class ArrayOfDouble {
          public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Datatypes",
  "name": "ArrayOfDouble",
  "fields": [
    {
      "name": "values",
      "type": {
        "type": "array",
        "items": "double"
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Datatypes.ArrayOfDouble",
  "depends": []
}`);
          /** @maxItems 100000 */
          public values: Double[] = [];
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Datatypes {
        export class ArrayOfFloat {
          public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Datatypes",
  "name": "ArrayOfFloat",
  "fields": [
    {
      "name": "values",
      "type": {
        "type": "array",
        "items": "float"
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Datatypes.ArrayOfFloat",
  "depends": []
}`);
          /** @maxItems 100000 */
          public values: Float[] = [];
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Datatypes {
        export class ArrayOfInt {
          public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Datatypes",
  "name": "ArrayOfInt",
  "fields": [
    {
      "name": "values",
      "type": {
        "type": "array",
        "items": "int"
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Datatypes.ArrayOfInt",
  "depends": []
}`);
          /** @maxItems 100000 */
          public values: Integer32[] = [];
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Datatypes {
        export class ArrayOfLong {
          public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Datatypes",
  "name": "ArrayOfLong",
  "fields": [
    {
      "name": "values",
      "type": {
        "type": "array",
        "items": "long"
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Datatypes.ArrayOfLong",
  "depends": []
}`);
          /** @maxItems 100000 */
          public values: Integer64[] = [];
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Datatypes {
        export class ArrayOfNullableBoolean {
          public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Datatypes",
  "name": "ArrayOfNullableBoolean",
  "fields": [
    {
      "name": "values",
      "type": {
        "type": "array",
        "items": [
          "null",
          "boolean"
        ]
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Datatypes.ArrayOfNullableBoolean",
  "depends": []
}`);
          /** @maxItems 100000 */
          public values: Array<null | boolean> = [];
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Datatypes {
        export class ArrayOfNullableInt {
          public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Datatypes",
  "name": "ArrayOfNullableInt",
  "fields": [
    {
      "name": "values",
      "type": {
        "type": "array",
        "items": [
          "null",
          "int"
        ]
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Datatypes.ArrayOfNullableInt",
  "depends": []
}`);
          /** @maxItems 100000 */
          public values: Array<null | Integer32> = [];
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Datatypes {
        export class ArrayOfNullableLong {
          public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Datatypes",
  "name": "ArrayOfNullableLong",
  "fields": [
    {
      "name": "values",
      "type": {
        "type": "array",
        "items": [
          "null",
          "long"
        ]
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Datatypes.ArrayOfNullableLong",
  "depends": []
}`);
          /** @maxItems 100000 */
          public values: Array<null | Integer64> = [];
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Datatypes {
        export class ArrayOfString {
          public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Datatypes",
  "name": "ArrayOfString",
  "fields": [
    {
      "name": "values",
      "type": {
        "type": "array",
        "items": "string"
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Datatypes.ArrayOfString",
  "depends": []
}`);
          /** @maxItems 100000 */
          public values: AvroString[] = [];
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace Store {
          export class DeleteDataObjectsResponse {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.Store",
  "name": "DeleteDataObjectsResponse",
  "protocol": "4",
  "messageType": "10",
  "senderRole": "store",
  "protocolRoles": "store,customer",
  "multipartFlag": true,
  "fields": [
    {
      "name": "deletedUris",
      "type": {
        "type": "map",
        "values": "Energistics.Etp.v12.Datatypes.ArrayOfString"
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.Store.DeleteDataObjectsResponse",
  "depends": [
    "Energistics.Etp.v12.Datatypes.ArrayOfString"
  ]
}`);
            public static _protocol = 4;
            public static _messageTypeId = 10;
            public deletedUris = new Map<
              AvroString,
              Energistics.Etp.v12.Datatypes.ArrayOfString
            >();
          }
          export const MsgDeleteDataObjectsResponse = 10;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Datatypes {
        export class AnyArray {
          public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Datatypes",
  "name": "AnyArray",
  "fields": [
    {
      "name": "item",
      "type": [
        "Energistics.Etp.v12.Datatypes.ArrayOfBoolean",
        "Energistics.Etp.v12.Datatypes.ArrayOfInt",
        "Energistics.Etp.v12.Datatypes.ArrayOfLong",
        "Energistics.Etp.v12.Datatypes.ArrayOfFloat",
        "Energistics.Etp.v12.Datatypes.ArrayOfDouble",
        "Energistics.Etp.v12.Datatypes.ArrayOfString",
        "bytes"
      ]
    }
  ],
  "fullName": "Energistics.Etp.v12.Datatypes.AnyArray",
  "depends": [
    "Energistics.Etp.v12.Datatypes.ArrayOfBoolean",
    "Energistics.Etp.v12.Datatypes.ArrayOfInt",
    "Energistics.Etp.v12.Datatypes.ArrayOfLong",
    "Energistics.Etp.v12.Datatypes.ArrayOfFloat",
    "Energistics.Etp.v12.Datatypes.ArrayOfDouble",
    "Energistics.Etp.v12.Datatypes.ArrayOfString"
  ]
}`);
          public item: {
            _ArrayOfBoolean?: Energistics.Etp.v12.Datatypes.ArrayOfBoolean;
            _ArrayOfInt?: Energistics.Etp.v12.Datatypes.ArrayOfInt;
            _ArrayOfLong?: Energistics.Etp.v12.Datatypes.ArrayOfLong;
            _ArrayOfFloat?: Energistics.Etp.v12.Datatypes.ArrayOfFloat;
            _ArrayOfDouble?: Energistics.Etp.v12.Datatypes.ArrayOfDouble;
            _ArrayOfString?: Energistics.Etp.v12.Datatypes.ArrayOfString;
            _bytes?: Bytes;
            __keyName:
              | "_ArrayOfBoolean"
              | "_ArrayOfInt"
              | "_ArrayOfLong"
              | "_ArrayOfFloat"
              | "_ArrayOfDouble"
              | "_ArrayOfString"
              | "_bytes";
          } = {
            _ArrayOfBoolean: new Energistics.Etp.v12.Datatypes.ArrayOfBoolean(),
            __keyName: "_ArrayOfBoolean"
          };
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Datatypes {
        export class AnySubarray {
          public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Datatypes",
  "name": "AnySubarray",
  "fields": [
    {
      "name": "start",
      "type": "long"
    },
    {
      "name": "slice",
      "type": "Energistics.Etp.v12.Datatypes.AnyArray"
    }
  ],
  "fullName": "Energistics.Etp.v12.Datatypes.AnySubarray",
  "depends": [
    "Energistics.Etp.v12.Datatypes.AnyArray"
  ]
}`);
          public start: Integer64 = BigInt(0);
          public slice: Energistics.Etp.v12.Datatypes.AnyArray =
            new Energistics.Etp.v12.Datatypes.AnyArray();
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Datatypes {
        export class AnySparseArray {
          public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Datatypes",
  "name": "AnySparseArray",
  "fields": [
    {
      "name": "slices",
      "type": {
        "type": "array",
        "items": "Energistics.Etp.v12.Datatypes.AnySubarray"
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Datatypes.AnySparseArray",
  "depends": [
    "Energistics.Etp.v12.Datatypes.AnySubarray"
  ]
}`);
          /** @maxItems 100000 */
          public slices: Energistics.Etp.v12.Datatypes.AnySubarray[] = [];
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Datatypes {
        export class Contact {
          public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Datatypes",
  "name": "Contact",
  "fields": [
    {
      "name": "organizationName",
      "type": "string",
      "default": ""
    },
    {
      "name": "contactName",
      "type": "string",
      "default": ""
    },
    {
      "name": "contactPhone",
      "type": "string",
      "default": ""
    },
    {
      "name": "contactEmail",
      "type": "string",
      "default": ""
    }
  ],
  "fullName": "Energistics.Etp.v12.Datatypes.Contact",
  "depends": []
}`);
          public organizationName: AvroString = "";
          public contactName: AvroString = "";
          public contactPhone: AvroString = "";
          public contactEmail: AvroString = "";
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Datatypes {
        export enum DataObjectCapabilityKind {
          ActiveTimeoutPeriod = 0,
          MaxContainedDataObjectCount = 1,
          MaxDataObjectSize = 2,
          OrphanedChildrenPrunedOnDelete = 3,
          SupportsGet = 4,
          SupportsPut = 5,
          SupportsDelete = 6,
          MaxSecondaryIndexCount = 7
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Datatypes {
        export class DataValue {
          public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Datatypes",
  "name": "DataValue",
  "fields": [
    {
      "name": "item",
      "type": [
        "null",
        "boolean",
        "int",
        "long",
        "float",
        "double",
        "string",
        "Energistics.Etp.v12.Datatypes.ArrayOfBoolean",
        "Energistics.Etp.v12.Datatypes.ArrayOfNullableBoolean",
        "Energistics.Etp.v12.Datatypes.ArrayOfInt",
        "Energistics.Etp.v12.Datatypes.ArrayOfNullableInt",
        "Energistics.Etp.v12.Datatypes.ArrayOfLong",
        "Energistics.Etp.v12.Datatypes.ArrayOfNullableLong",
        "Energistics.Etp.v12.Datatypes.ArrayOfFloat",
        "Energistics.Etp.v12.Datatypes.ArrayOfDouble",
        "Energistics.Etp.v12.Datatypes.ArrayOfString",
        "Energistics.Etp.v12.Datatypes.ArrayOfBytes",
        "bytes",
        "Energistics.Etp.v12.Datatypes.AnySparseArray"
      ]
    }
  ],
  "fullName": "Energistics.Etp.v12.Datatypes.DataValue",
  "depends": [
    "Energistics.Etp.v12.Datatypes.ArrayOfBoolean",
    "Energistics.Etp.v12.Datatypes.ArrayOfNullableBoolean",
    "Energistics.Etp.v12.Datatypes.ArrayOfInt",
    "Energistics.Etp.v12.Datatypes.ArrayOfNullableInt",
    "Energistics.Etp.v12.Datatypes.ArrayOfLong",
    "Energistics.Etp.v12.Datatypes.ArrayOfNullableLong",
    "Energistics.Etp.v12.Datatypes.ArrayOfFloat",
    "Energistics.Etp.v12.Datatypes.ArrayOfDouble",
    "Energistics.Etp.v12.Datatypes.ArrayOfString",
    "Energistics.Etp.v12.Datatypes.ArrayOfBytes",
    "Energistics.Etp.v12.Datatypes.AnySparseArray"
  ]
}`);
          public item: {
            _boolean?: boolean;
            _int?: Integer32;
            _long?: Integer64;
            _float?: Float;
            _double?: Double;
            _string?: AvroString;
            _ArrayOfBoolean?: Energistics.Etp.v12.Datatypes.ArrayOfBoolean;
            _ArrayOfNullableBoolean?: Energistics.Etp.v12.Datatypes.ArrayOfNullableBoolean;
            _ArrayOfInt?: Energistics.Etp.v12.Datatypes.ArrayOfInt;
            _ArrayOfNullableInt?: Energistics.Etp.v12.Datatypes.ArrayOfNullableInt;
            _ArrayOfLong?: Energistics.Etp.v12.Datatypes.ArrayOfLong;
            _ArrayOfNullableLong?: Energistics.Etp.v12.Datatypes.ArrayOfNullableLong;
            _ArrayOfFloat?: Energistics.Etp.v12.Datatypes.ArrayOfFloat;
            _ArrayOfDouble?: Energistics.Etp.v12.Datatypes.ArrayOfDouble;
            _ArrayOfString?: Energistics.Etp.v12.Datatypes.ArrayOfString;
            _ArrayOfBytes?: Energistics.Etp.v12.Datatypes.ArrayOfBytes;
            _bytes?: Bytes;
            _AnySparseArray?: Energistics.Etp.v12.Datatypes.AnySparseArray;
            __keyName:
              | "_boolean"
              | "_int"
              | "_long"
              | "_float"
              | "_double"
              | "_string"
              | "_ArrayOfBoolean"
              | "_ArrayOfNullableBoolean"
              | "_ArrayOfInt"
              | "_ArrayOfNullableInt"
              | "_ArrayOfLong"
              | "_ArrayOfNullableLong"
              | "_ArrayOfFloat"
              | "_ArrayOfDouble"
              | "_ArrayOfString"
              | "_ArrayOfBytes"
              | "_bytes"
              | "_AnySparseArray";
          } | null = null;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Datatypes {
        export class DataAttribute {
          public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Datatypes",
  "name": "DataAttribute",
  "fields": [
    {
      "name": "attributeId",
      "type": "int"
    },
    {
      "name": "attributeValue",
      "type": "Energistics.Etp.v12.Datatypes.DataValue"
    }
  ],
  "fullName": "Energistics.Etp.v12.Datatypes.DataAttribute",
  "depends": [
    "Energistics.Etp.v12.Datatypes.DataValue"
  ]
}`);
          public attributeId: Integer32 = 0;
          public attributeValue: Energistics.Etp.v12.Datatypes.DataValue =
            new Energistics.Etp.v12.Datatypes.DataValue();
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Datatypes {
        export enum EndpointCapabilityKind {
          ActiveTimeoutPeriod = 0,
          AuthorizationDetails = 1,
          ChangePropagationPeriod = 2,
          ChangeRetentionPeriod = 3,
          MaxConcurrentMultipart = 4,
          MaxDataObjectSize = 5,
          MaxPartSize = 6,
          MaxSessionClientCount = 7,
          MaxSessionGlobalCount = 8,
          MaxWebSocketFramePayloadSize = 9,
          MaxWebSocketMessagePayloadSize = 10,
          MultipartMessageTimeoutPeriod = 11,
          ResponseTimeoutPeriod = 12,
          RequestSessionTimeoutPeriod = 13,
          SessionEstablishmentTimeoutPeriod = 14,
          SupportsAlternateRequestUris = 15,
          SupportsMessageHeaderExtensions = 16
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Datatypes {
        export class MessageHeader {
          public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Datatypes",
  "name": "MessageHeader",
  "fields": [
    {
      "name": "protocol",
      "type": "int"
    },
    {
      "name": "messageType",
      "type": "int"
    },
    {
      "name": "correlationId",
      "type": "long"
    },
    {
      "name": "messageId",
      "type": "long"
    },
    {
      "name": "messageFlags",
      "type": "int"
    }
  ],
  "fullName": "Energistics.Etp.v12.Datatypes.MessageHeader",
  "depends": []
}`);
          public protocol: Integer32 = 0;
          public messageType: Integer32 = 0;
          public correlationId: Integer64 = BigInt(0);
          public messageId: Integer64 = BigInt(0);
          public messageFlags: Integer32 = 0;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Datatypes {
        export class ErrorInfo {
          public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Datatypes",
  "name": "ErrorInfo",
  "fields": [
    {
      "name": "message",
      "type": "string"
    },
    {
      "name": "code",
      "type": "int"
    }
  ],
  "fullName": "Energistics.Etp.v12.Datatypes.ErrorInfo",
  "depends": []
}`);
          public message: AvroString = "";
          public code: Integer32 = 0;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace Core {
          export class ProtocolException {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.Core",
  "name": "ProtocolException",
  "protocol": "0",
  "messageType": "1000",
  "senderRole": "*",
  "protocolRoles": "client, server",
  "multipartFlag": true,
  "fields": [
    {
      "name": "error",
      "type": [
        "null",
        "Energistics.Etp.v12.Datatypes.ErrorInfo"
      ]
    },
    {
      "name": "errors",
      "type": {
        "type": "map",
        "values": "Energistics.Etp.v12.Datatypes.ErrorInfo"
      },
      "default": {}
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.Core.ProtocolException",
  "depends": [
    "Energistics.Etp.v12.Datatypes.ErrorInfo",
    "Energistics.Etp.v12.Datatypes.ErrorInfo"
  ]
}`);
            public static _protocol = 0;
            public static _messageTypeId = 1000;
            public error: null | Energistics.Etp.v12.Datatypes.ErrorInfo = null;
            public errors = new Map<
              AvroString,
              Energistics.Etp.v12.Datatypes.ErrorInfo
            >();
          }
          export const MsgProtocolException = 1000;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Datatypes {
        export class MessageHeaderExtension {
          public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Datatypes",
  "name": "MessageHeaderExtension",
  "fields": [
    {
      "name": "extension",
      "type": {
        "type": "map",
        "values": "Energistics.Etp.v12.Datatypes.DataValue"
      },
      "default": {}
    }
  ],
  "fullName": "Energistics.Etp.v12.Datatypes.MessageHeaderExtension",
  "depends": [
    "Energistics.Etp.v12.Datatypes.DataValue"
  ]
}`);
          public extension = new Map<
            AvroString,
            Energistics.Etp.v12.Datatypes.DataValue
          >();
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Datatypes {
        export enum Protocol {
          Core = 0,
          ChannelStreaming = 1,
          ChannelDataFrame = 2,
          Discovery = 3,
          Store = 4,
          StoreNotification = 5,
          GrowingObject = 6,
          GrowingObjectNotification = 7,
          DEPRECATED_8 = 8,
          DataArray = 9,
          RESERVED_10 = 10,
          RESERVED_11 = 11,
          RESERVED_12 = 12,
          DiscoveryQuery = 13,
          StoreQuery = 14,
          RESERVED_15 = 15,
          GrowingObjectQuery = 16,
          RESERVED_17 = 17,
          Transaction = 18,
          RESERVED_19 = 19,
          RESERVED_20 = 20,
          ChannelSubscribe = 21,
          ChannelDataLoad = 22,
          RESERVED_23 = 23,
          Dataspace = 24,
          SupportedTypes = 25,
          DataspaceOSDU = 2424
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Datatypes {
        export enum ProtocolCapabilityKind {
          FrameChangeDetectionPeriod = 0,
          MaxDataArraySize = 1,
          MaxDataObjectSize = 2,
          MaxFrameResponseRowCount = 3,
          MaxIndexCount = 4,
          MaxRangeChannelCount = 5,
          MaxRangeDataItemCount = 6,
          MaxResponseCount = 7,
          MaxStreamingChannelsSessionCount = 8,
          MaxSubscriptionSessionCount = 9,
          MaxTransactionCount = 10,
          SupportsSecondaryIndexFiltering = 11,
          TransactionTimeoutPeriod = 12
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Datatypes {
        export class SupportedDataObject {
          public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Datatypes",
  "name": "SupportedDataObject",
  "fields": [
    {
      "name": "qualifiedType",
      "type": "string"
    },
    {
      "name": "dataObjectCapabilities",
      "type": {
        "type": "map",
        "values": "Energistics.Etp.v12.Datatypes.DataValue"
      },
      "default": {}
    }
  ],
  "fullName": "Energistics.Etp.v12.Datatypes.SupportedDataObject",
  "depends": [
    "Energistics.Etp.v12.Datatypes.DataValue"
  ]
}`);
          public qualifiedType: AvroString = "";
          public dataObjectCapabilities = new Map<
            AvroString,
            Energistics.Etp.v12.Datatypes.DataValue
          >();
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Datatypes {
        export type Uuid = [
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number
        ];
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace ChannelDataFrame {
          export class CancelGetFrame {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.ChannelDataFrame",
  "name": "CancelGetFrame",
  "protocol": "2",
  "messageType": "5",
  "senderRole": "customer",
  "protocolRoles": "store,customer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "requestUuid",
      "type": "Energistics.Etp.v12.Datatypes.Uuid"
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.ChannelDataFrame.CancelGetFrame",
  "depends": [
    "Energistics.Etp.v12.Datatypes.Uuid"
  ]
}`);
            public static _protocol = 2;
            public static _messageTypeId = 5;
            public requestUuid: Energistics.Etp.v12.Datatypes.Uuid = [
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
            ];
          }
          export const MsgCancelGetFrame = 5;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace ChannelSubscribe {
          export class CancelGetRanges {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.ChannelSubscribe",
  "name": "CancelGetRanges",
  "protocol": "21",
  "messageType": "11",
  "senderRole": "customer",
  "protocolRoles": "store,customer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "requestUuid",
      "type": "Energistics.Etp.v12.Datatypes.Uuid"
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.ChannelSubscribe.CancelGetRanges",
  "depends": [
    "Energistics.Etp.v12.Datatypes.Uuid"
  ]
}`);
            public static _protocol = 21;
            public static _messageTypeId = 11;
            public requestUuid: Energistics.Etp.v12.Datatypes.Uuid = [
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
            ];
          }
          export const MsgCancelGetRanges = 11;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace GrowingObjectNotification {
          export class PartsDeleted {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.GrowingObjectNotification",
  "name": "PartsDeleted",
  "protocol": "7",
  "messageType": "3",
  "senderRole": "store",
  "protocolRoles": "store,customer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "uri",
      "type": "string"
    },
    {
      "name": "requestUuid",
      "type": "Energistics.Etp.v12.Datatypes.Uuid"
    },
    {
      "name": "changeTime",
      "type": "long"
    },
    {
      "name": "uids",
      "type": {
        "type": "array",
        "items": "string"
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.GrowingObjectNotification.PartsDeleted",
  "depends": [
    "Energistics.Etp.v12.Datatypes.Uuid"
  ]
}`);
            public static _protocol = 7;
            public static _messageTypeId = 3;
            public uri: AvroString = "";
            public requestUuid: Energistics.Etp.v12.Datatypes.Uuid = [
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
            ];
            public changeTime: Integer64 = BigInt(0);
            /** @maxItems 100000 */
            public uids: AvroString[] = [];
          }
          export const MsgPartsDeleted = 3;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace GrowingObjectNotification {
          export class PartSubscriptionEnded {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.GrowingObjectNotification",
  "name": "PartSubscriptionEnded",
  "protocol": "7",
  "messageType": "8",
  "senderRole": "store",
  "protocolRoles": "store,customer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "reason",
      "type": "string"
    },
    {
      "name": "requestUuid",
      "type": "Energistics.Etp.v12.Datatypes.Uuid"
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.GrowingObjectNotification.PartSubscriptionEnded",
  "depends": [
    "Energistics.Etp.v12.Datatypes.Uuid"
  ]
}`);
            public static _protocol = 7;
            public static _messageTypeId = 8;
            public reason: AvroString = "";
            public requestUuid: Energistics.Etp.v12.Datatypes.Uuid = [
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
            ];
          }
          export const MsgPartSubscriptionEnded = 8;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace GrowingObjectNotification {
          export class UnsubscribePartNotification {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.GrowingObjectNotification",
  "name": "UnsubscribePartNotification",
  "protocol": "7",
  "messageType": "4",
  "senderRole": "customer",
  "protocolRoles": "store,customer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "requestUuid",
      "type": "Energistics.Etp.v12.Datatypes.Uuid"
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.GrowingObjectNotification.UnsubscribePartNotification",
  "depends": [
    "Energistics.Etp.v12.Datatypes.Uuid"
  ]
}`);
            public static _protocol = 7;
            public static _messageTypeId = 4;
            public requestUuid: Energistics.Etp.v12.Datatypes.Uuid = [
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
            ];
          }
          export const MsgUnsubscribePartNotification = 4;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace StoreNotification {
          export class Chunk {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.StoreNotification",
  "name": "Chunk",
  "protocol": "5",
  "messageType": "9",
  "senderRole": "store",
  "protocolRoles": "store,customer",
  "multipartFlag": true,
  "fields": [
    {
      "name": "blobId",
      "type": "Energistics.Etp.v12.Datatypes.Uuid"
    },
    {
      "name": "data",
      "type": "bytes"
    },
    {
      "name": "final",
      "type": "boolean"
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.StoreNotification.Chunk",
  "depends": [
    "Energistics.Etp.v12.Datatypes.Uuid"
  ]
}`);
            public static _protocol = 5;
            public static _messageTypeId = 9;
            public blobId: Energistics.Etp.v12.Datatypes.Uuid = [
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
            ];
            public data: Bytes = Buffer.alloc(0);
            public final = false;
          }
          export const MsgChunk = 9;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace StoreNotification {
          export class ObjectAccessRevoked {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.StoreNotification",
  "name": "ObjectAccessRevoked",
  "protocol": "5",
  "messageType": "5",
  "senderRole": "store",
  "protocolRoles": "store,customer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "uri",
      "type": "string"
    },
    {
      "name": "changeTime",
      "type": "long"
    },
    {
      "name": "requestUuid",
      "type": "Energistics.Etp.v12.Datatypes.Uuid"
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.StoreNotification.ObjectAccessRevoked",
  "depends": [
    "Energistics.Etp.v12.Datatypes.Uuid"
  ]
}`);
            public static _protocol = 5;
            public static _messageTypeId = 5;
            public uri: AvroString = "";
            public changeTime: Integer64 = BigInt(0);
            public requestUuid: Energistics.Etp.v12.Datatypes.Uuid = [
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
            ];
          }
          export const MsgObjectAccessRevoked = 5;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace StoreNotification {
          export class ObjectDeleted {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.StoreNotification",
  "name": "ObjectDeleted",
  "protocol": "5",
  "messageType": "3",
  "senderRole": "store",
  "protocolRoles": "store,customer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "uri",
      "type": "string"
    },
    {
      "name": "changeTime",
      "type": "long"
    },
    {
      "name": "requestUuid",
      "type": "Energistics.Etp.v12.Datatypes.Uuid"
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.StoreNotification.ObjectDeleted",
  "depends": [
    "Energistics.Etp.v12.Datatypes.Uuid"
  ]
}`);
            public static _protocol = 5;
            public static _messageTypeId = 3;
            public uri: AvroString = "";
            public changeTime: Integer64 = BigInt(0);
            public requestUuid: Energistics.Etp.v12.Datatypes.Uuid = [
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
            ];
          }
          export const MsgObjectDeleted = 3;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace StoreNotification {
          export class SubscriptionEnded {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.StoreNotification",
  "name": "SubscriptionEnded",
  "protocol": "5",
  "messageType": "7",
  "senderRole": "store",
  "protocolRoles": "store,customer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "reason",
      "type": "string"
    },
    {
      "name": "requestUuid",
      "type": "Energistics.Etp.v12.Datatypes.Uuid"
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.StoreNotification.SubscriptionEnded",
  "depends": [
    "Energistics.Etp.v12.Datatypes.Uuid"
  ]
}`);
            public static _protocol = 5;
            public static _messageTypeId = 7;
            public reason: AvroString = "";
            public requestUuid: Energistics.Etp.v12.Datatypes.Uuid = [
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
            ];
          }
          export const MsgSubscriptionEnded = 7;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace StoreNotification {
          export class UnsubscribeNotifications {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.StoreNotification",
  "name": "UnsubscribeNotifications",
  "protocol": "5",
  "messageType": "4",
  "senderRole": "customer",
  "protocolRoles": "store,customer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "requestUuid",
      "type": "Energistics.Etp.v12.Datatypes.Uuid"
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.StoreNotification.UnsubscribeNotifications",
  "depends": [
    "Energistics.Etp.v12.Datatypes.Uuid"
  ]
}`);
            public static _protocol = 5;
            public static _messageTypeId = 4;
            public requestUuid: Energistics.Etp.v12.Datatypes.Uuid = [
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
            ];
          }
          export const MsgUnsubscribeNotifications = 4;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace Store {
          export class Chunk {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.Store",
  "name": "Chunk",
  "protocol": "4",
  "messageType": "8",
  "senderRole": "store,customer",
  "protocolRoles": "store,customer",
  "multipartFlag": true,
  "fields": [
    {
      "name": "blobId",
      "type": "Energistics.Etp.v12.Datatypes.Uuid"
    },
    {
      "name": "data",
      "type": "bytes"
    },
    {
      "name": "final",
      "type": "boolean"
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.Store.Chunk",
  "depends": [
    "Energistics.Etp.v12.Datatypes.Uuid"
  ]
}`);
            public static _protocol = 4;
            public static _messageTypeId = 8;
            public blobId: Energistics.Etp.v12.Datatypes.Uuid = [
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
            ];
            public data: Bytes = Buffer.alloc(0);
            public final = false;
          }
          export const MsgChunk = 8;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace StoreQuery {
          export class Chunk {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.StoreQuery",
  "name": "Chunk",
  "protocol": "14",
  "messageType": "3",
  "senderRole": "store",
  "protocolRoles": "store,customer",
  "multipartFlag": true,
  "fields": [
    {
      "name": "blobId",
      "type": "Energistics.Etp.v12.Datatypes.Uuid"
    },
    {
      "name": "data",
      "type": "bytes"
    },
    {
      "name": "final",
      "type": "boolean"
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.StoreQuery.Chunk",
  "depends": [
    "Energistics.Etp.v12.Datatypes.Uuid"
  ]
}`);
            public static _protocol = 14;
            public static _messageTypeId = 3;
            public blobId: Energistics.Etp.v12.Datatypes.Uuid = [
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
            ];
            public data: Bytes = Buffer.alloc(0);
            public final = false;
          }
          export const MsgChunk = 3;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace Transaction {
          export class CommitTransaction {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.Transaction",
  "name": "CommitTransaction",
  "protocol": "18",
  "messageType": "3",
  "senderRole": "customer",
  "protocolRoles": "store,customer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "transactionUuid",
      "type": "Energistics.Etp.v12.Datatypes.Uuid"
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.Transaction.CommitTransaction",
  "depends": [
    "Energistics.Etp.v12.Datatypes.Uuid"
  ]
}`);
            public static _protocol = 18;
            public static _messageTypeId = 3;
            public transactionUuid: Energistics.Etp.v12.Datatypes.Uuid = [
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
            ];
          }
          export const MsgCommitTransaction = 3;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace Transaction {
          export class CommitTransactionResponse {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.Transaction",
  "name": "CommitTransactionResponse",
  "protocol": "18",
  "messageType": "5",
  "senderRole": "store",
  "protocolRoles": "store,customer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "transactionUuid",
      "type": "Energistics.Etp.v12.Datatypes.Uuid"
    },
    {
      "name": "successful",
      "type": "boolean",
      "default": true
    },
    {
      "name": "failureReason",
      "type": "string",
      "default": ""
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.Transaction.CommitTransactionResponse",
  "depends": [
    "Energistics.Etp.v12.Datatypes.Uuid"
  ]
}`);
            public static _protocol = 18;
            public static _messageTypeId = 5;
            public transactionUuid: Energistics.Etp.v12.Datatypes.Uuid = [
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
            ];
            public successful = true;
            public failureReason: AvroString = "";
          }
          export const MsgCommitTransactionResponse = 5;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace Transaction {
          export class RollbackTransaction {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.Transaction",
  "name": "RollbackTransaction",
  "protocol": "18",
  "messageType": "4",
  "senderRole": "customer",
  "protocolRoles": "store,customer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "transactionUuid",
      "type": "Energistics.Etp.v12.Datatypes.Uuid"
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.Transaction.RollbackTransaction",
  "depends": [
    "Energistics.Etp.v12.Datatypes.Uuid"
  ]
}`);
            public static _protocol = 18;
            public static _messageTypeId = 4;
            public transactionUuid: Energistics.Etp.v12.Datatypes.Uuid = [
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
            ];
          }
          export const MsgRollbackTransaction = 4;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace Transaction {
          export class RollbackTransactionResponse {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.Transaction",
  "name": "RollbackTransactionResponse",
  "protocol": "18",
  "messageType": "6",
  "senderRole": "store",
  "protocolRoles": "store,customer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "transactionUuid",
      "type": "Energistics.Etp.v12.Datatypes.Uuid"
    },
    {
      "name": "successful",
      "type": "boolean",
      "default": true
    },
    {
      "name": "failureReason",
      "type": "string",
      "default": ""
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.Transaction.RollbackTransactionResponse",
  "depends": [
    "Energistics.Etp.v12.Datatypes.Uuid"
  ]
}`);
            public static _protocol = 18;
            public static _messageTypeId = 6;
            public transactionUuid: Energistics.Etp.v12.Datatypes.Uuid = [
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
            ];
            public successful = true;
            public failureReason: AvroString = "";
          }
          export const MsgRollbackTransactionResponse = 6;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace Transaction {
          export class StartTransactionResponse {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.Transaction",
  "name": "StartTransactionResponse",
  "protocol": "18",
  "messageType": "2",
  "senderRole": "store",
  "protocolRoles": "store,customer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "transactionUuid",
      "type": "Energistics.Etp.v12.Datatypes.Uuid"
    },
    {
      "name": "successful",
      "type": "boolean",
      "default": true
    },
    {
      "name": "failureReason",
      "type": "string",
      "default": ""
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.Transaction.StartTransactionResponse",
  "depends": [
    "Energistics.Etp.v12.Datatypes.Uuid"
  ]
}`);
            public static _protocol = 18;
            public static _messageTypeId = 2;
            public transactionUuid: Energistics.Etp.v12.Datatypes.Uuid = [
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
            ];
            public successful = true;
            public failureReason: AvroString = "";
          }
          export const MsgStartTransactionResponse = 2;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Datatypes {
        export class Version {
          public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Datatypes",
  "name": "Version",
  "fields": [
    {
      "name": "major",
      "type": "int",
      "default": 0
    },
    {
      "name": "minor",
      "type": "int",
      "default": 0
    },
    {
      "name": "revision",
      "type": "int",
      "default": 0
    },
    {
      "name": "patch",
      "type": "int",
      "default": 0
    }
  ],
  "fullName": "Energistics.Etp.v12.Datatypes.Version",
  "depends": []
}`);
          public major: Integer32 = 0;
          public minor: Integer32 = 0;
          public revision: Integer32 = 0;
          public patch: Integer32 = 0;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Datatypes {
        export class SupportedProtocol {
          public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Datatypes",
  "name": "SupportedProtocol",
  "fields": [
    {
      "name": "protocol",
      "type": "int"
    },
    {
      "name": "protocolVersion",
      "type": "Energistics.Etp.v12.Datatypes.Version"
    },
    {
      "name": "role",
      "type": "string"
    },
    {
      "name": "protocolCapabilities",
      "type": {
        "type": "map",
        "values": "Energistics.Etp.v12.Datatypes.DataValue"
      },
      "default": {}
    }
  ],
  "fullName": "Energistics.Etp.v12.Datatypes.SupportedProtocol",
  "depends": [
    "Energistics.Etp.v12.Datatypes.Version",
    "Energistics.Etp.v12.Datatypes.DataValue"
  ]
}`);
          public protocol: Integer32 = 0;
          public protocolVersion: Energistics.Etp.v12.Datatypes.Version =
            new Energistics.Etp.v12.Datatypes.Version();
          public role: AvroString = "";
          public protocolCapabilities = new Map<
            AvroString,
            Energistics.Etp.v12.Datatypes.DataValue
          >();
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace Core {
          export class OpenSession {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.Core",
  "name": "OpenSession",
  "protocol": "0",
  "messageType": "2",
  "senderRole": "server",
  "protocolRoles": "client, server",
  "multipartFlag": false,
  "fields": [
    {
      "name": "applicationName",
      "type": "string"
    },
    {
      "name": "applicationVersion",
      "type": "string"
    },
    {
      "name": "serverInstanceId",
      "type": "Energistics.Etp.v12.Datatypes.Uuid"
    },
    {
      "name": "supportedProtocols",
      "type": {
        "type": "array",
        "items": "Energistics.Etp.v12.Datatypes.SupportedProtocol"
      }
    },
    {
      "name": "supportedDataObjects",
      "type": {
        "type": "array",
        "items": "Energistics.Etp.v12.Datatypes.SupportedDataObject"
      }
    },
    {
      "name": "supportedCompression",
      "type": "string",
      "default": ""
    },
    {
      "name": "supportedFormats",
      "type": {
        "type": "array",
        "items": "string"
      },
      "default": [
        "xml"
      ]
    },
    {
      "name": "currentDateTime",
      "type": "long"
    },
    {
      "name": "earliestRetainedChangeTime",
      "type": "long"
    },
    {
      "name": "sessionId",
      "type": "Energistics.Etp.v12.Datatypes.Uuid"
    },
    {
      "name": "endpointCapabilities",
      "type": {
        "type": "map",
        "values": "Energistics.Etp.v12.Datatypes.DataValue"
      },
      "default": {}
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.Core.OpenSession",
  "depends": [
    "Energistics.Etp.v12.Datatypes.Uuid",
    "Energistics.Etp.v12.Datatypes.SupportedProtocol",
    "Energistics.Etp.v12.Datatypes.SupportedDataObject",
    "Energistics.Etp.v12.Datatypes.Uuid",
    "Energistics.Etp.v12.Datatypes.DataValue"
  ]
}`);
            public static _protocol = 0;
            public static _messageTypeId = 2;
            public applicationName: AvroString = "";
            public applicationVersion: AvroString = "";
            public serverInstanceId: Energistics.Etp.v12.Datatypes.Uuid = [
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
            ];
            /** @maxItems 100000 */
            public supportedProtocols: Energistics.Etp.v12.Datatypes.SupportedProtocol[] =
              [];
            /** @maxItems 100000 */
            public supportedDataObjects: Energistics.Etp.v12.Datatypes.SupportedDataObject[] =
              [];
            public supportedCompression: AvroString = "";
            /** @maxItems 100000 */
            public supportedFormats: AvroString[] = [];
            public currentDateTime: Integer64 = BigInt(0);
            public earliestRetainedChangeTime: Integer64 = BigInt(0);
            public sessionId: Energistics.Etp.v12.Datatypes.Uuid = [
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
            ];
            public endpointCapabilities = new Map<
              AvroString,
              Energistics.Etp.v12.Datatypes.DataValue
            >();
          }
          export const MsgOpenSession = 2;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace Core {
          export class RequestSession {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.Core",
  "name": "RequestSession",
  "protocol": "0",
  "messageType": "1",
  "senderRole": "client",
  "protocolRoles": "client, server",
  "multipartFlag": false,
  "fields": [
    {
      "name": "applicationName",
      "type": "string"
    },
    {
      "name": "applicationVersion",
      "type": "string"
    },
    {
      "name": "clientInstanceId",
      "type": "Energistics.Etp.v12.Datatypes.Uuid"
    },
    {
      "name": "requestedProtocols",
      "type": {
        "type": "array",
        "items": "Energistics.Etp.v12.Datatypes.SupportedProtocol"
      }
    },
    {
      "name": "supportedDataObjects",
      "type": {
        "type": "array",
        "items": "Energistics.Etp.v12.Datatypes.SupportedDataObject"
      }
    },
    {
      "name": "supportedCompression",
      "type": {
        "type": "array",
        "items": "string"
      },
      "default": []
    },
    {
      "name": "supportedFormats",
      "type": {
        "type": "array",
        "items": "string"
      },
      "default": [
        "xml"
      ]
    },
    {
      "name": "currentDateTime",
      "type": "long"
    },
    {
      "name": "earliestRetainedChangeTime",
      "type": "long"
    },
    {
      "name": "serverAuthorizationRequired",
      "type": "boolean",
      "default": false
    },
    {
      "name": "endpointCapabilities",
      "type": {
        "type": "map",
        "values": "Energistics.Etp.v12.Datatypes.DataValue"
      },
      "default": {}
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.Core.RequestSession",
  "depends": [
    "Energistics.Etp.v12.Datatypes.Uuid",
    "Energistics.Etp.v12.Datatypes.SupportedProtocol",
    "Energistics.Etp.v12.Datatypes.SupportedDataObject",
    "Energistics.Etp.v12.Datatypes.DataValue"
  ]
}`);
            public static _protocol = 0;
            public static _messageTypeId = 1;
            public applicationName: AvroString = "";
            public applicationVersion: AvroString = "";
            public clientInstanceId: Energistics.Etp.v12.Datatypes.Uuid = [
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
            ];
            /** @maxItems 100000 */
            public requestedProtocols: Energistics.Etp.v12.Datatypes.SupportedProtocol[] =
              [];
            /** @maxItems 100000 */
            public supportedDataObjects: Energistics.Etp.v12.Datatypes.SupportedDataObject[] =
              [];
            /** @maxItems 100000 */
            public supportedCompression: AvroString[] = [];
            /** @maxItems 100000 */
            public supportedFormats: AvroString[] = [];
            public currentDateTime: Integer64 = BigInt(0);
            public earliestRetainedChangeTime: Integer64 = BigInt(0);
            public serverAuthorizationRequired = false;
            public endpointCapabilities = new Map<
              AvroString,
              Energistics.Etp.v12.Datatypes.DataValue
            >();
          }
          export const MsgRequestSession = 1;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Datatypes {
        export class ServerCapabilities {
          public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Datatypes",
  "name": "ServerCapabilities",
  "fields": [
    {
      "name": "applicationName",
      "type": "string"
    },
    {
      "name": "applicationVersion",
      "type": "string"
    },
    {
      "name": "contactInformation",
      "type": "Energistics.Etp.v12.Datatypes.Contact"
    },
    {
      "name": "supportedCompression",
      "type": {
        "type": "array",
        "items": "string"
      },
      "default": []
    },
    {
      "name": "supportedEncodings",
      "type": {
        "type": "array",
        "items": "string"
      },
      "default": [
        "binary"
      ]
    },
    {
      "name": "supportedFormats",
      "type": {
        "type": "array",
        "items": "string"
      },
      "default": [
        "xml"
      ]
    },
    {
      "name": "supportedDataObjects",
      "type": {
        "type": "array",
        "items": "Energistics.Etp.v12.Datatypes.SupportedDataObject"
      }
    },
    {
      "name": "supportedProtocols",
      "type": {
        "type": "array",
        "items": "Energistics.Etp.v12.Datatypes.SupportedProtocol"
      }
    },
    {
      "name": "endpointCapabilities",
      "type": {
        "type": "map",
        "values": "Energistics.Etp.v12.Datatypes.DataValue"
      },
      "default": {}
    }
  ],
  "fullName": "Energistics.Etp.v12.Datatypes.ServerCapabilities",
  "depends": [
    "Energistics.Etp.v12.Datatypes.Contact",
    "Energistics.Etp.v12.Datatypes.SupportedDataObject",
    "Energistics.Etp.v12.Datatypes.SupportedProtocol",
    "Energistics.Etp.v12.Datatypes.DataValue"
  ]
}`);
          public applicationName: AvroString = "";
          public applicationVersion: AvroString = "";
          public contactInformation: Energistics.Etp.v12.Datatypes.Contact =
            new Energistics.Etp.v12.Datatypes.Contact();
          /** @maxItems 100000 */
          public supportedCompression: AvroString[] = [];
          /** @maxItems 100000 */
          public supportedEncodings: AvroString[] = [];
          /** @maxItems 100000 */
          public supportedFormats: AvroString[] = [];
          /** @maxItems 100000 */
          public supportedDataObjects: Energistics.Etp.v12.Datatypes.SupportedDataObject[] =
            [];
          /** @maxItems 100000 */
          public supportedProtocols: Energistics.Etp.v12.Datatypes.SupportedProtocol[] =
            [];
          public endpointCapabilities = new Map<
            AvroString,
            Energistics.Etp.v12.Datatypes.DataValue
          >();
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Datatypes {
        export namespace ChannelData {
          export class ChannelChangeRequestInfo {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Datatypes.ChannelData",
  "name": "ChannelChangeRequestInfo",
  "fields": [
    {
      "name": "sinceChangeTime",
      "type": "long"
    },
    {
      "name": "channelIds",
      "type": {
        "type": "array",
        "items": "long"
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Datatypes.ChannelData.ChannelChangeRequestInfo",
  "depends": []
}`);
            public sinceChangeTime: Integer64 = BigInt(0);
            /** @maxItems 100000 */
            public channelIds: Integer64[] = [];
          }
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace ChannelSubscribe {
          export class GetChangeAnnotations {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.ChannelSubscribe",
  "name": "GetChangeAnnotations",
  "protocol": "21",
  "messageType": "14",
  "senderRole": "customer",
  "protocolRoles": "store,customer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "channels",
      "type": {
        "type": "map",
        "values": "Energistics.Etp.v12.Datatypes.ChannelData.ChannelChangeRequestInfo"
      }
    },
    {
      "name": "latestOnly",
      "type": "boolean",
      "default": false
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.ChannelSubscribe.GetChangeAnnotations",
  "depends": [
    "Energistics.Etp.v12.Datatypes.ChannelData.ChannelChangeRequestInfo"
  ]
}`);
            public static _protocol = 21;
            public static _messageTypeId = 14;
            public channels = new Map<
              AvroString,
              Energistics.Etp.v12.Datatypes.ChannelData.ChannelChangeRequestInfo
            >();
            public latestOnly = false;
          }
          export const MsgGetChangeAnnotations = 14;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Datatypes {
        export namespace ChannelData {
          export enum ChannelDataKind {
            DateTime = 0,
            ElapsedTime = 1,
            MeasuredDepth = 2,
            PassIndexedDepth = 3,
            TrueVerticalDepth = 4,
            typeBoolean = 5,
            typeInt = 6,
            typeLong = 7,
            typeFloat = 8,
            typeDouble = 9,
            typeString = 10,
            typeBytes = 11
          }
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Datatypes {
        export class AttributeMetadataRecord {
          public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Datatypes",
  "name": "AttributeMetadataRecord",
  "fields": [
    {
      "name": "attributeId",
      "type": "int"
    },
    {
      "name": "attributeName",
      "type": "string"
    },
    {
      "name": "dataKind",
      "type": "Energistics.Etp.v12.Datatypes.ChannelData.ChannelDataKind"
    },
    {
      "name": "uom",
      "type": "string"
    },
    {
      "name": "depthDatum",
      "type": "string"
    },
    {
      "name": "attributePropertyKindUri",
      "type": "string"
    },
    {
      "name": "axisVectorLengths",
      "type": {
        "type": "array",
        "items": "int"
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Datatypes.AttributeMetadataRecord",
  "depends": [
    "Energistics.Etp.v12.Datatypes.ChannelData.ChannelDataKind"
  ]
}`);
          public attributeId: Integer32 = 0;
          public attributeName: AvroString = "";
          public dataKind: Energistics.Etp.v12.Datatypes.ChannelData.ChannelDataKind =
            Energistics.Etp.v12.Datatypes.ChannelData.ChannelDataKind.DateTime;
          public uom: AvroString = "";
          public depthDatum: AvroString = "";
          public attributePropertyKindUri: AvroString = "";
          /** @maxItems 100000 */
          public axisVectorLengths: Integer32[] = [];
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Datatypes {
        export namespace ChannelData {
          export enum ChannelIndexKind {
            DateTime = 0,
            ElapsedTime = 1,
            MeasuredDepth = 2,
            TrueVerticalDepth = 3,
            PassIndexedDepth = 4,
            Pressure = 5,
            Temperature = 6,
            Scalar = 7
          }
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Datatypes {
        export namespace ChannelData {
          export class FramePoint {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Datatypes.ChannelData",
  "name": "FramePoint",
  "fields": [
    {
      "name": "value",
      "type": "Energistics.Etp.v12.Datatypes.DataValue"
    },
    {
      "name": "valueAttributes",
      "type": {
        "type": "array",
        "items": "Energistics.Etp.v12.Datatypes.DataAttribute"
      },
      "default": []
    }
  ],
  "fullName": "Energistics.Etp.v12.Datatypes.ChannelData.FramePoint",
  "depends": [
    "Energistics.Etp.v12.Datatypes.DataValue",
    "Energistics.Etp.v12.Datatypes.DataAttribute"
  ]
}`);
            public value: Energistics.Etp.v12.Datatypes.DataValue =
              new Energistics.Etp.v12.Datatypes.DataValue();
            /** @maxItems 100000 */
            public valueAttributes: Energistics.Etp.v12.Datatypes.DataAttribute[] =
              [];
          }
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Datatypes {
        export namespace ChannelData {
          export enum IndexDirection {
            Increasing = 0,
            Decreasing = 1,
            Unordered = 2
          }
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Datatypes {
        export namespace ChannelData {
          export enum PassDirection {
            Up = 0,
            HoldingSteady = 1,
            Down = 2
          }
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Datatypes {
        export namespace ChannelData {
          export class PassIndexedDepth {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Datatypes.ChannelData",
  "name": "PassIndexedDepth",
  "fields": [
    {
      "name": "pass",
      "type": "long"
    },
    {
      "name": "direction",
      "type": "Energistics.Etp.v12.Datatypes.ChannelData.PassDirection"
    },
    {
      "name": "depth",
      "type": "double"
    }
  ],
  "fullName": "Energistics.Etp.v12.Datatypes.ChannelData.PassIndexedDepth",
  "depends": [
    "Energistics.Etp.v12.Datatypes.ChannelData.PassDirection"
  ]
}`);
            public pass: Integer64 = BigInt(0);
            public direction: Energistics.Etp.v12.Datatypes.ChannelData.PassDirection =
              Energistics.Etp.v12.Datatypes.ChannelData.PassDirection.Up;
            public depth: Double = 0;
          }
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Datatypes {
        export class IndexValue {
          public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Datatypes",
  "name": "IndexValue",
  "fields": [
    {
      "name": "item",
      "type": [
        "null",
        "long",
        "double",
        "Energistics.Etp.v12.Datatypes.ChannelData.PassIndexedDepth"
      ]
    }
  ],
  "fullName": "Energistics.Etp.v12.Datatypes.IndexValue",
  "depends": [
    "Energistics.Etp.v12.Datatypes.ChannelData.PassIndexedDepth"
  ]
}`);
          public item: {
            _long?: Integer64;
            _double?: Double;
            _PassIndexedDepth?: Energistics.Etp.v12.Datatypes.ChannelData.PassIndexedDepth;
            __keyName: "_long" | "_double" | "_PassIndexedDepth";
          } | null = null;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Datatypes {
        export namespace ChannelData {
          export class ChannelSubscribeInfo {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Datatypes.ChannelData",
  "name": "ChannelSubscribeInfo",
  "fields": [
    {
      "name": "channelId",
      "type": "long"
    },
    {
      "name": "startIndex",
      "type": "Energistics.Etp.v12.Datatypes.IndexValue"
    },
    {
      "name": "dataChanges",
      "type": "boolean",
      "default": true
    },
    {
      "name": "requestLatestIndexCount",
      "type": [
        "null",
        "int"
      ]
    }
  ],
  "fullName": "Energistics.Etp.v12.Datatypes.ChannelData.ChannelSubscribeInfo",
  "depends": [
    "Energistics.Etp.v12.Datatypes.IndexValue"
  ]
}`);
            public channelId: Integer64 = BigInt(0);
            public startIndex: Energistics.Etp.v12.Datatypes.IndexValue =
              new Energistics.Etp.v12.Datatypes.IndexValue();
            public dataChanges = true;
            public requestLatestIndexCount: null | Integer32 = null;
          }
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace ChannelSubscribe {
          export class SubscribeChannels {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.ChannelSubscribe",
  "name": "SubscribeChannels",
  "protocol": "21",
  "messageType": "3",
  "senderRole": "customer",
  "protocolRoles": "store,customer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "channels",
      "type": {
        "type": "map",
        "values": "Energistics.Etp.v12.Datatypes.ChannelData.ChannelSubscribeInfo"
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.ChannelSubscribe.SubscribeChannels",
  "depends": [
    "Energistics.Etp.v12.Datatypes.ChannelData.ChannelSubscribeInfo"
  ]
}`);
            public static _protocol = 21;
            public static _messageTypeId = 3;
            public channels = new Map<
              AvroString,
              Energistics.Etp.v12.Datatypes.ChannelData.ChannelSubscribeInfo
            >();
          }
          export const MsgSubscribeChannels = 3;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Datatypes {
        export namespace ChannelData {
          export class DataItem {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Datatypes.ChannelData",
  "name": "DataItem",
  "fields": [
    {
      "name": "channelId",
      "type": "long"
    },
    {
      "name": "indexes",
      "type": {
        "type": "array",
        "items": "Energistics.Etp.v12.Datatypes.IndexValue"
      }
    },
    {
      "name": "value",
      "type": "Energistics.Etp.v12.Datatypes.DataValue"
    },
    {
      "name": "valueAttributes",
      "type": {
        "type": "array",
        "items": "Energistics.Etp.v12.Datatypes.DataAttribute"
      },
      "default": []
    }
  ],
  "fullName": "Energistics.Etp.v12.Datatypes.ChannelData.DataItem",
  "depends": [
    "Energistics.Etp.v12.Datatypes.IndexValue",
    "Energistics.Etp.v12.Datatypes.DataValue",
    "Energistics.Etp.v12.Datatypes.DataAttribute"
  ]
}`);
            public channelId: Integer64 = BigInt(0);
            /** @maxItems 100000 */
            public indexes: Energistics.Etp.v12.Datatypes.IndexValue[] = [];
            public value: Energistics.Etp.v12.Datatypes.DataValue =
              new Energistics.Etp.v12.Datatypes.DataValue();
            /** @maxItems 100000 */
            public valueAttributes: Energistics.Etp.v12.Datatypes.DataAttribute[] =
              [];
          }
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace ChannelDataLoad {
          export class ChannelData {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.ChannelDataLoad",
  "name": "ChannelData",
  "protocol": "22",
  "messageType": "4",
  "senderRole": "customer",
  "protocolRoles": "store,customer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "data",
      "type": {
        "type": "array",
        "items": "Energistics.Etp.v12.Datatypes.ChannelData.DataItem"
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.ChannelDataLoad.ChannelData",
  "depends": [
    "Energistics.Etp.v12.Datatypes.ChannelData.DataItem"
  ]
}`);
            public static _protocol = 22;
            public static _messageTypeId = 4;
            /** @maxItems 100000 */
            public data: Energistics.Etp.v12.Datatypes.ChannelData.DataItem[] =
              [];
          }
          export const MsgChannelData = 4;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace ChannelStreaming {
          export class ChannelData {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.ChannelStreaming",
  "name": "ChannelData",
  "protocol": "1",
  "messageType": "2",
  "senderRole": "producer",
  "protocolRoles": "producer,consumer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "data",
      "type": {
        "type": "array",
        "items": "Energistics.Etp.v12.Datatypes.ChannelData.DataItem"
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.ChannelStreaming.ChannelData",
  "depends": [
    "Energistics.Etp.v12.Datatypes.ChannelData.DataItem"
  ]
}`);
            public static _protocol = 1;
            public static _messageTypeId = 2;
            /** @maxItems 100000 */
            public data: Energistics.Etp.v12.Datatypes.ChannelData.DataItem[] =
              [];
          }
          export const MsgChannelData = 2;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace ChannelSubscribe {
          export class ChannelData {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.ChannelSubscribe",
  "name": "ChannelData",
  "protocol": "21",
  "messageType": "4",
  "senderRole": "store",
  "protocolRoles": "store,customer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "data",
      "type": {
        "type": "array",
        "items": "Energistics.Etp.v12.Datatypes.ChannelData.DataItem"
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.ChannelSubscribe.ChannelData",
  "depends": [
    "Energistics.Etp.v12.Datatypes.ChannelData.DataItem"
  ]
}`);
            public static _protocol = 21;
            public static _messageTypeId = 4;
            /** @maxItems 100000 */
            public data: Energistics.Etp.v12.Datatypes.ChannelData.DataItem[] =
              [];
          }
          export const MsgChannelData = 4;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace ChannelSubscribe {
          export class GetRangesResponse {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.ChannelSubscribe",
  "name": "GetRangesResponse",
  "protocol": "21",
  "messageType": "10",
  "senderRole": "store",
  "protocolRoles": "store,customer",
  "multipartFlag": true,
  "fields": [
    {
      "name": "data",
      "type": {
        "type": "array",
        "items": "Energistics.Etp.v12.Datatypes.ChannelData.DataItem"
      },
      "default": []
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.ChannelSubscribe.GetRangesResponse",
  "depends": [
    "Energistics.Etp.v12.Datatypes.ChannelData.DataItem"
  ]
}`);
            public static _protocol = 21;
            public static _messageTypeId = 10;
            /** @maxItems 100000 */
            public data: Energistics.Etp.v12.Datatypes.ChannelData.DataItem[] =
              [];
          }
          export const MsgGetRangesResponse = 10;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Datatypes {
        export namespace ChannelData {
          export class FrameRow {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Datatypes.ChannelData",
  "name": "FrameRow",
  "fields": [
    {
      "name": "indexes",
      "type": {
        "type": "array",
        "items": "Energistics.Etp.v12.Datatypes.IndexValue"
      }
    },
    {
      "name": "points",
      "type": {
        "type": "array",
        "items": "Energistics.Etp.v12.Datatypes.ChannelData.FramePoint"
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Datatypes.ChannelData.FrameRow",
  "depends": [
    "Energistics.Etp.v12.Datatypes.IndexValue",
    "Energistics.Etp.v12.Datatypes.ChannelData.FramePoint"
  ]
}`);
            /** @maxItems 100000 */
            public indexes: Energistics.Etp.v12.Datatypes.IndexValue[] = [];
            /** @maxItems 100000 */
            public points: Energistics.Etp.v12.Datatypes.ChannelData.FramePoint[] =
              [];
          }
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace ChannelDataFrame {
          export class GetFrameResponseRows {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.ChannelDataFrame",
  "name": "GetFrameResponseRows",
  "protocol": "2",
  "messageType": "6",
  "senderRole": "store",
  "protocolRoles": "store,customer",
  "multipartFlag": true,
  "fields": [
    {
      "name": "frame",
      "type": {
        "type": "array",
        "items": "Energistics.Etp.v12.Datatypes.ChannelData.FrameRow"
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.ChannelDataFrame.GetFrameResponseRows",
  "depends": [
    "Energistics.Etp.v12.Datatypes.ChannelData.FrameRow"
  ]
}`);
            public static _protocol = 2;
            public static _messageTypeId = 6;
            /** @maxItems 100000 */
            public frame: Energistics.Etp.v12.Datatypes.ChannelData.FrameRow[] =
              [];
          }
          export const MsgGetFrameResponseRows = 6;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Datatypes {
        export namespace ChannelData {
          export class TruncateInfo {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Datatypes.ChannelData",
  "name": "TruncateInfo",
  "fields": [
    {
      "name": "channelId",
      "type": "long"
    },
    {
      "name": "newEndIndex",
      "type": "Energistics.Etp.v12.Datatypes.IndexValue"
    }
  ],
  "fullName": "Energistics.Etp.v12.Datatypes.ChannelData.TruncateInfo",
  "depends": [
    "Energistics.Etp.v12.Datatypes.IndexValue"
  ]
}`);
            public channelId: Integer64 = BigInt(0);
            public newEndIndex: Energistics.Etp.v12.Datatypes.IndexValue =
              new Energistics.Etp.v12.Datatypes.IndexValue();
          }
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace ChannelDataLoad {
          export class TruncateChannels {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.ChannelDataLoad",
  "name": "TruncateChannels",
  "protocol": "22",
  "messageType": "9",
  "senderRole": "customer",
  "protocolRoles": "store,customer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "channels",
      "type": {
        "type": "map",
        "values": "Energistics.Etp.v12.Datatypes.ChannelData.TruncateInfo"
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.ChannelDataLoad.TruncateChannels",
  "depends": [
    "Energistics.Etp.v12.Datatypes.ChannelData.TruncateInfo"
  ]
}`);
            public static _protocol = 22;
            public static _messageTypeId = 9;
            public channels = new Map<
              AvroString,
              Energistics.Etp.v12.Datatypes.ChannelData.TruncateInfo
            >();
          }
          export const MsgTruncateChannels = 9;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace ChannelStreaming {
          export class TruncateChannels {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.ChannelStreaming",
  "name": "TruncateChannels",
  "protocol": "1",
  "messageType": "5",
  "senderRole": "producer",
  "protocolRoles": "producer,consumer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "channels",
      "type": {
        "type": "array",
        "items": "Energistics.Etp.v12.Datatypes.ChannelData.TruncateInfo"
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.ChannelStreaming.TruncateChannels",
  "depends": [
    "Energistics.Etp.v12.Datatypes.ChannelData.TruncateInfo"
  ]
}`);
            public static _protocol = 1;
            public static _messageTypeId = 5;
            /** @maxItems 100000 */
            public channels: Energistics.Etp.v12.Datatypes.ChannelData.TruncateInfo[] =
              [];
          }
          export const MsgTruncateChannels = 5;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace ChannelSubscribe {
          export class ChannelsTruncated {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.ChannelSubscribe",
  "name": "ChannelsTruncated",
  "protocol": "21",
  "messageType": "13",
  "senderRole": "store",
  "protocolRoles": "store,customer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "channels",
      "type": {
        "type": "array",
        "items": "Energistics.Etp.v12.Datatypes.ChannelData.TruncateInfo"
      }
    },
    {
      "name": "changeTime",
      "type": "long"
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.ChannelSubscribe.ChannelsTruncated",
  "depends": [
    "Energistics.Etp.v12.Datatypes.ChannelData.TruncateInfo"
  ]
}`);
            public static _protocol = 21;
            public static _messageTypeId = 13;
            /** @maxItems 100000 */
            public channels: Energistics.Etp.v12.Datatypes.ChannelData.TruncateInfo[] =
              [];
            public changeTime: Integer64 = BigInt(0);
          }
          export const MsgChannelsTruncated = 13;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Datatypes {
        export namespace DataArrayTypes {
          export class DataArray {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Datatypes.DataArrayTypes",
  "name": "DataArray",
  "fields": [
    {
      "name": "dimensions",
      "type": {
        "type": "array",
        "items": "long"
      }
    },
    {
      "name": "data",
      "type": "Energistics.Etp.v12.Datatypes.AnyArray"
    }
  ],
  "fullName": "Energistics.Etp.v12.Datatypes.DataArrayTypes.DataArray",
  "depends": [
    "Energistics.Etp.v12.Datatypes.AnyArray"
  ]
}`);
            /** @maxItems 100000 */
            public dimensions: Integer64[] = [];
            public data: Energistics.Etp.v12.Datatypes.AnyArray =
              new Energistics.Etp.v12.Datatypes.AnyArray();
          }
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace DataArray {
          export class GetDataArraysResponse {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.DataArray",
  "name": "GetDataArraysResponse",
  "protocol": "9",
  "messageType": "1",
  "senderRole": "store",
  "protocolRoles": "store,customer",
  "multipartFlag": true,
  "fields": [
    {
      "name": "dataArrays",
      "type": {
        "type": "map",
        "values": "Energistics.Etp.v12.Datatypes.DataArrayTypes.DataArray"
      },
      "default": {}
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.DataArray.GetDataArraysResponse",
  "depends": [
    "Energistics.Etp.v12.Datatypes.DataArrayTypes.DataArray"
  ]
}`);
            public static _protocol = 9;
            public static _messageTypeId = 1;
            public dataArrays = new Map<
              AvroString,
              Energistics.Etp.v12.Datatypes.DataArrayTypes.DataArray
            >();
          }
          export const MsgGetDataArraysResponse = 1;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace DataArray {
          export class GetDataSubarraysResponse {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.DataArray",
  "name": "GetDataSubarraysResponse",
  "protocol": "9",
  "messageType": "8",
  "senderRole": "store",
  "protocolRoles": "store,customer",
  "multipartFlag": true,
  "fields": [
    {
      "name": "dataSubarrays",
      "type": {
        "type": "map",
        "values": "Energistics.Etp.v12.Datatypes.DataArrayTypes.DataArray"
      },
      "default": {}
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.DataArray.GetDataSubarraysResponse",
  "depends": [
    "Energistics.Etp.v12.Datatypes.DataArrayTypes.DataArray"
  ]
}`);
            public static _protocol = 9;
            public static _messageTypeId = 8;
            public dataSubarrays = new Map<
              AvroString,
              Energistics.Etp.v12.Datatypes.DataArrayTypes.DataArray
            >();
          }
          export const MsgGetDataSubarraysResponse = 8;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Datatypes {
        export namespace DataArrayTypes {
          export class DataArrayIdentifier {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Datatypes.DataArrayTypes",
  "name": "DataArrayIdentifier",
  "fields": [
    {
      "name": "uri",
      "type": "string"
    },
    {
      "name": "pathInResource",
      "type": "string"
    }
  ],
  "fullName": "Energistics.Etp.v12.Datatypes.DataArrayTypes.DataArrayIdentifier",
  "depends": []
}`);
            public uri: AvroString = "";
            public pathInResource: AvroString = "";
          }
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace DataArray {
          export class GetDataArrayMetadata {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.DataArray",
  "name": "GetDataArrayMetadata",
  "protocol": "9",
  "messageType": "6",
  "senderRole": "customer",
  "protocolRoles": "store,customer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "dataArrays",
      "type": {
        "type": "map",
        "values": "Energistics.Etp.v12.Datatypes.DataArrayTypes.DataArrayIdentifier"
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.DataArray.GetDataArrayMetadata",
  "depends": [
    "Energistics.Etp.v12.Datatypes.DataArrayTypes.DataArrayIdentifier"
  ]
}`);
            public static _protocol = 9;
            public static _messageTypeId = 6;
            public dataArrays = new Map<
              AvroString,
              Energistics.Etp.v12.Datatypes.DataArrayTypes.DataArrayIdentifier
            >();
          }
          export const MsgGetDataArrayMetadata = 6;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace DataArray {
          export class GetDataArrays {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.DataArray",
  "name": "GetDataArrays",
  "protocol": "9",
  "messageType": "2",
  "senderRole": "customer",
  "protocolRoles": "store,customer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "dataArrays",
      "type": {
        "type": "map",
        "values": "Energistics.Etp.v12.Datatypes.DataArrayTypes.DataArrayIdentifier"
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.DataArray.GetDataArrays",
  "depends": [
    "Energistics.Etp.v12.Datatypes.DataArrayTypes.DataArrayIdentifier"
  ]
}`);
            public static _protocol = 9;
            public static _messageTypeId = 2;
            public dataArrays = new Map<
              AvroString,
              Energistics.Etp.v12.Datatypes.DataArrayTypes.DataArrayIdentifier
            >();
          }
          export const MsgGetDataArrays = 2;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Datatypes {
        export namespace DataArrayTypes {
          export class GetDataSubarraysType {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Datatypes.DataArrayTypes",
  "name": "GetDataSubarraysType",
  "fields": [
    {
      "name": "uid",
      "type": "Energistics.Etp.v12.Datatypes.DataArrayTypes.DataArrayIdentifier"
    },
    {
      "name": "starts",
      "type": {
        "type": "array",
        "items": "long"
      },
      "default": []
    },
    {
      "name": "counts",
      "type": {
        "type": "array",
        "items": "long"
      },
      "default": []
    }
  ],
  "fullName": "Energistics.Etp.v12.Datatypes.DataArrayTypes.GetDataSubarraysType",
  "depends": [
    "Energistics.Etp.v12.Datatypes.DataArrayTypes.DataArrayIdentifier"
  ]
}`);
            public uid: Energistics.Etp.v12.Datatypes.DataArrayTypes.DataArrayIdentifier =
              new Energistics.Etp.v12.Datatypes.DataArrayTypes.DataArrayIdentifier();
            /** @maxItems 100000 */
            public starts: Integer64[] = [];
            /** @maxItems 100000 */
            public counts: Integer64[] = [];
          }
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace DataArray {
          export class GetDataSubarrays {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.DataArray",
  "name": "GetDataSubarrays",
  "protocol": "9",
  "messageType": "3",
  "senderRole": "customer",
  "protocolRoles": "store,customer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "dataSubarrays",
      "type": {
        "type": "map",
        "values": "Energistics.Etp.v12.Datatypes.DataArrayTypes.GetDataSubarraysType"
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.DataArray.GetDataSubarrays",
  "depends": [
    "Energistics.Etp.v12.Datatypes.DataArrayTypes.GetDataSubarraysType"
  ]
}`);
            public static _protocol = 9;
            public static _messageTypeId = 3;
            public dataSubarrays = new Map<
              AvroString,
              Energistics.Etp.v12.Datatypes.DataArrayTypes.GetDataSubarraysType
            >();
          }
          export const MsgGetDataSubarrays = 3;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Datatypes {
        export namespace DataArrayTypes {
          export class DataArrayMetadata {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Datatypes.DataArrayTypes",
  "name": "DataArrayMetadata",
  "fields": [
    {
      "name": "dimensions",
      "type": {
        "type": "array",
        "items": "long"
      }
    },
    {
      "name": "preferredSubarrayDimensions",
      "type": {
        "type": "array",
        "items": "long"
      },
      "default": []
    },
    {
      "name": "transportArrayType",
      "type": "Energistics.Etp.v12.Datatypes.AnyArrayType"
    },
    {
      "name": "logicalArrayType",
      "type": "Energistics.Etp.v12.Datatypes.AnyLogicalArrayType"
    },
    {
      "name": "storeLastWrite",
      "type": "long"
    },
    {
      "name": "storeCreated",
      "type": "long"
    },
    {
      "name": "customData",
      "type": {
        "type": "map",
        "values": "Energistics.Etp.v12.Datatypes.DataValue"
      },
      "default": {}
    }
  ],
  "fullName": "Energistics.Etp.v12.Datatypes.DataArrayTypes.DataArrayMetadata",
  "depends": [
    "Energistics.Etp.v12.Datatypes.AnyArrayType",
    "Energistics.Etp.v12.Datatypes.AnyLogicalArrayType",
    "Energistics.Etp.v12.Datatypes.DataValue"
  ]
}`);
            /** @maxItems 100000 */
            public dimensions: Integer64[] = [];
            /** @maxItems 100000 */
            public preferredSubarrayDimensions: Integer64[] = [];
            public transportArrayType: Energistics.Etp.v12.Datatypes.AnyArrayType =
              Energistics.Etp.v12.Datatypes.AnyArrayType.arrayOfBoolean;
            public logicalArrayType: Energistics.Etp.v12.Datatypes.AnyLogicalArrayType =
              Energistics.Etp.v12.Datatypes.AnyLogicalArrayType.arrayOfBoolean;
            public storeLastWrite: Integer64 = BigInt(0);
            public storeCreated: Integer64 = BigInt(0);
            public customData = new Map<
              AvroString,
              Energistics.Etp.v12.Datatypes.DataValue
            >();
          }
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace DataArray {
          export class GetDataArrayMetadataResponse {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.DataArray",
  "name": "GetDataArrayMetadataResponse",
  "protocol": "9",
  "messageType": "7",
  "senderRole": "store",
  "protocolRoles": "store,customer",
  "multipartFlag": true,
  "fields": [
    {
      "name": "arrayMetadata",
      "type": {
        "type": "map",
        "values": "Energistics.Etp.v12.Datatypes.DataArrayTypes.DataArrayMetadata"
      },
      "default": {}
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.DataArray.GetDataArrayMetadataResponse",
  "depends": [
    "Energistics.Etp.v12.Datatypes.DataArrayTypes.DataArrayMetadata"
  ]
}`);
            public static _protocol = 9;
            public static _messageTypeId = 7;
            public arrayMetadata = new Map<
              AvroString,
              Energistics.Etp.v12.Datatypes.DataArrayTypes.DataArrayMetadata
            >();
          }
          export const MsgGetDataArrayMetadataResponse = 7;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Datatypes {
        export namespace DataArrayTypes {
          export class PutDataArraysType {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Datatypes.DataArrayTypes",
  "name": "PutDataArraysType",
  "fields": [
    {
      "name": "uid",
      "type": "Energistics.Etp.v12.Datatypes.DataArrayTypes.DataArrayIdentifier"
    },
    {
      "name": "array",
      "type": "Energistics.Etp.v12.Datatypes.DataArrayTypes.DataArray"
    },
    {
      "name": "customData",
      "type": {
        "type": "map",
        "values": "Energistics.Etp.v12.Datatypes.DataValue"
      },
      "default": {}
    }
  ],
  "fullName": "Energistics.Etp.v12.Datatypes.DataArrayTypes.PutDataArraysType",
  "depends": [
    "Energistics.Etp.v12.Datatypes.DataArrayTypes.DataArrayIdentifier",
    "Energistics.Etp.v12.Datatypes.DataArrayTypes.DataArray",
    "Energistics.Etp.v12.Datatypes.DataValue"
  ]
}`);
            public uid: Energistics.Etp.v12.Datatypes.DataArrayTypes.DataArrayIdentifier =
              new Energistics.Etp.v12.Datatypes.DataArrayTypes.DataArrayIdentifier();
            public array: Energistics.Etp.v12.Datatypes.DataArrayTypes.DataArray =
              new Energistics.Etp.v12.Datatypes.DataArrayTypes.DataArray();
            public customData = new Map<
              AvroString,
              Energistics.Etp.v12.Datatypes.DataValue
            >();
          }
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace DataArray {
          export class PutDataArrays {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.DataArray",
  "name": "PutDataArrays",
  "protocol": "9",
  "messageType": "4",
  "senderRole": "customer",
  "protocolRoles": "store,customer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "dataArrays",
      "type": {
        "type": "map",
        "values": "Energistics.Etp.v12.Datatypes.DataArrayTypes.PutDataArraysType"
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.DataArray.PutDataArrays",
  "depends": [
    "Energistics.Etp.v12.Datatypes.DataArrayTypes.PutDataArraysType"
  ]
}`);
            public static _protocol = 9;
            public static _messageTypeId = 4;
            public dataArrays = new Map<
              AvroString,
              Energistics.Etp.v12.Datatypes.DataArrayTypes.PutDataArraysType
            >();
          }
          export const MsgPutDataArrays = 4;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Datatypes {
        export namespace DataArrayTypes {
          export class PutDataSubarraysType {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Datatypes.DataArrayTypes",
  "name": "PutDataSubarraysType",
  "fields": [
    {
      "name": "uid",
      "type": "Energistics.Etp.v12.Datatypes.DataArrayTypes.DataArrayIdentifier"
    },
    {
      "name": "data",
      "type": "Energistics.Etp.v12.Datatypes.AnyArray"
    },
    {
      "name": "starts",
      "type": {
        "type": "array",
        "items": "long"
      }
    },
    {
      "name": "counts",
      "type": {
        "type": "array",
        "items": "long"
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Datatypes.DataArrayTypes.PutDataSubarraysType",
  "depends": [
    "Energistics.Etp.v12.Datatypes.DataArrayTypes.DataArrayIdentifier",
    "Energistics.Etp.v12.Datatypes.AnyArray"
  ]
}`);
            public uid: Energistics.Etp.v12.Datatypes.DataArrayTypes.DataArrayIdentifier =
              new Energistics.Etp.v12.Datatypes.DataArrayTypes.DataArrayIdentifier();
            public data: Energistics.Etp.v12.Datatypes.AnyArray =
              new Energistics.Etp.v12.Datatypes.AnyArray();
            /** @maxItems 100000 */
            public starts: Integer64[] = [];
            /** @maxItems 100000 */
            public counts: Integer64[] = [];
          }
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace DataArray {
          export class PutDataSubarrays {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.DataArray",
  "name": "PutDataSubarrays",
  "protocol": "9",
  "messageType": "5",
  "senderRole": "customer",
  "protocolRoles": "store,customer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "dataSubarrays",
      "type": {
        "type": "map",
        "values": "Energistics.Etp.v12.Datatypes.DataArrayTypes.PutDataSubarraysType"
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.DataArray.PutDataSubarrays",
  "depends": [
    "Energistics.Etp.v12.Datatypes.DataArrayTypes.PutDataSubarraysType"
  ]
}`);
            public static _protocol = 9;
            public static _messageTypeId = 5;
            public dataSubarrays = new Map<
              AvroString,
              Energistics.Etp.v12.Datatypes.DataArrayTypes.PutDataSubarraysType
            >();
          }
          export const MsgPutDataSubarrays = 5;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Datatypes {
        export namespace DataArrayTypes {
          export class PutUninitializedDataArrayType {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Datatypes.DataArrayTypes",
  "name": "PutUninitializedDataArrayType",
  "fields": [
    {
      "name": "uid",
      "type": "Energistics.Etp.v12.Datatypes.DataArrayTypes.DataArrayIdentifier"
    },
    {
      "name": "metadata",
      "type": "Energistics.Etp.v12.Datatypes.DataArrayTypes.DataArrayMetadata"
    }
  ],
  "fullName": "Energistics.Etp.v12.Datatypes.DataArrayTypes.PutUninitializedDataArrayType",
  "depends": [
    "Energistics.Etp.v12.Datatypes.DataArrayTypes.DataArrayIdentifier",
    "Energistics.Etp.v12.Datatypes.DataArrayTypes.DataArrayMetadata"
  ]
}`);
            public uid: Energistics.Etp.v12.Datatypes.DataArrayTypes.DataArrayIdentifier =
              new Energistics.Etp.v12.Datatypes.DataArrayTypes.DataArrayIdentifier();
            public metadata: Energistics.Etp.v12.Datatypes.DataArrayTypes.DataArrayMetadata =
              new Energistics.Etp.v12.Datatypes.DataArrayTypes.DataArrayMetadata();
          }
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace DataArray {
          export class PutUninitializedDataArrays {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.DataArray",
  "name": "PutUninitializedDataArrays",
  "protocol": "9",
  "messageType": "9",
  "senderRole": "customer",
  "protocolRoles": "store,customer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "dataArrays",
      "type": {
        "type": "map",
        "values": "Energistics.Etp.v12.Datatypes.DataArrayTypes.PutUninitializedDataArrayType"
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.DataArray.PutUninitializedDataArrays",
  "depends": [
    "Energistics.Etp.v12.Datatypes.DataArrayTypes.PutUninitializedDataArrayType"
  ]
}`);
            public static _protocol = 9;
            public static _messageTypeId = 9;
            public dataArrays = new Map<
              AvroString,
              Energistics.Etp.v12.Datatypes.DataArrayTypes.PutUninitializedDataArrayType
            >();
          }
          export const MsgPutUninitializedDataArrays = 9;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Datatypes {
        export namespace Object {
          export enum ActiveStatusKind {
            Active = 0,
            Inactive = 1
          }
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Datatypes {
        export namespace ChannelData {
          export class FrameChannelMetadataRecord {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Datatypes.ChannelData",
  "name": "FrameChannelMetadataRecord",
  "fields": [
    {
      "name": "uri",
      "type": "string"
    },
    {
      "name": "channelName",
      "type": "string"
    },
    {
      "name": "dataKind",
      "type": "Energistics.Etp.v12.Datatypes.ChannelData.ChannelDataKind"
    },
    {
      "name": "uom",
      "type": "string"
    },
    {
      "name": "depthDatum",
      "type": "string"
    },
    {
      "name": "channelPropertyKindUri",
      "type": "string"
    },
    {
      "name": "status",
      "type": "Energistics.Etp.v12.Datatypes.Object.ActiveStatusKind"
    },
    {
      "name": "source",
      "type": "string"
    },
    {
      "name": "axisVectorLengths",
      "type": {
        "type": "array",
        "items": "int"
      }
    },
    {
      "name": "attributeMetadata",
      "type": {
        "type": "array",
        "items": "Energistics.Etp.v12.Datatypes.AttributeMetadataRecord"
      },
      "default": []
    },
    {
      "name": "customData",
      "type": {
        "type": "map",
        "values": "Energistics.Etp.v12.Datatypes.DataValue"
      },
      "default": {}
    }
  ],
  "fullName": "Energistics.Etp.v12.Datatypes.ChannelData.FrameChannelMetadataRecord",
  "depends": [
    "Energistics.Etp.v12.Datatypes.ChannelData.ChannelDataKind",
    "Energistics.Etp.v12.Datatypes.Object.ActiveStatusKind",
    "Energistics.Etp.v12.Datatypes.AttributeMetadataRecord",
    "Energistics.Etp.v12.Datatypes.DataValue"
  ]
}`);
            public uri: AvroString = "";
            public channelName: AvroString = "";
            public dataKind: Energistics.Etp.v12.Datatypes.ChannelData.ChannelDataKind =
              Energistics.Etp.v12.Datatypes.ChannelData.ChannelDataKind
                .DateTime;
            public uom: AvroString = "";
            public depthDatum: AvroString = "";
            public channelPropertyKindUri: AvroString = "";
            public status: Energistics.Etp.v12.Datatypes.Object.ActiveStatusKind =
              Energistics.Etp.v12.Datatypes.Object.ActiveStatusKind.Active;
            public source: AvroString = "";
            /** @maxItems 100000 */
            public axisVectorLengths: Integer32[] = [];
            /** @maxItems 100000 */
            public attributeMetadata: Energistics.Etp.v12.Datatypes.AttributeMetadataRecord[] =
              [];
            public customData = new Map<
              AvroString,
              Energistics.Etp.v12.Datatypes.DataValue
            >();
          }
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Datatypes {
        export namespace Object {
          export enum ContextScopeKind {
            self = 0,
            sources = 1,
            targets = 2,
            sourcesOrSelf = 3,
            targetsOrSelf = 4
          }
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace SupportedTypes {
          export class GetSupportedTypes {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.SupportedTypes",
  "name": "GetSupportedTypes",
  "protocol": "25",
  "messageType": "1",
  "senderRole": "customer",
  "protocolRoles": "store,customer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "uri",
      "type": "string"
    },
    {
      "name": "scope",
      "type": "Energistics.Etp.v12.Datatypes.Object.ContextScopeKind"
    },
    {
      "name": "returnEmptyTypes",
      "type": "boolean",
      "default": false
    },
    {
      "name": "countObjects",
      "type": "boolean",
      "default": false
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.SupportedTypes.GetSupportedTypes",
  "depends": [
    "Energistics.Etp.v12.Datatypes.Object.ContextScopeKind"
  ]
}`);
            public static _protocol = 25;
            public static _messageTypeId = 1;
            public uri: AvroString = "";
            public scope: Energistics.Etp.v12.Datatypes.Object.ContextScopeKind =
              Energistics.Etp.v12.Datatypes.Object.ContextScopeKind.self;
            public returnEmptyTypes = false;
            public countObjects = false;
          }
          export const MsgGetSupportedTypes = 1;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Datatypes {
        export namespace Object {
          export class Dataspace {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Datatypes.Object",
  "name": "Dataspace",
  "fields": [
    {
      "name": "uri",
      "type": "string"
    },
    {
      "name": "path",
      "type": "string",
      "default": ""
    },
    {
      "name": "storeLastWrite",
      "type": "long"
    },
    {
      "name": "storeCreated",
      "type": "long"
    },
    {
      "name": "customData",
      "type": {
        "type": "map",
        "values": "Energistics.Etp.v12.Datatypes.DataValue"
      },
      "default": {}
    }
  ],
  "fullName": "Energistics.Etp.v12.Datatypes.Object.Dataspace",
  "depends": [
    "Energistics.Etp.v12.Datatypes.DataValue"
  ]
}`);
            public uri: AvroString = "";
            public path: AvroString = "";
            public storeLastWrite: Integer64 = BigInt(0);
            public storeCreated: Integer64 = BigInt(0);
            public customData = new Map<
              AvroString,
              Energistics.Etp.v12.Datatypes.DataValue
            >();
          }
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace Dataspace {
          export class GetDataspacesResponse {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.Dataspace",
  "name": "GetDataspacesResponse",
  "protocol": "24",
  "messageType": "2",
  "senderRole": "store",
  "protocolRoles": "store,customer",
  "multipartFlag": true,
  "fields": [
    {
      "name": "dataspaces",
      "type": {
        "type": "array",
        "items": "Energistics.Etp.v12.Datatypes.Object.Dataspace"
      },
      "default": []
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.Dataspace.GetDataspacesResponse",
  "depends": [
    "Energistics.Etp.v12.Datatypes.Object.Dataspace"
  ]
}`);
            public static _protocol = 24;
            public static _messageTypeId = 2;
            /** @maxItems 100000 */
            public dataspaces: Energistics.Etp.v12.Datatypes.Object.Dataspace[] =
              [];
          }
          export const MsgGetDataspacesResponse = 2;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace Dataspace {
          export class PutDataspaces {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.Dataspace",
  "name": "PutDataspaces",
  "protocol": "24",
  "messageType": "3",
  "senderRole": "customer",
  "protocolRoles": "store,customer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "dataspaces",
      "type": {
        "type": "map",
        "values": "Energistics.Etp.v12.Datatypes.Object.Dataspace"
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.Dataspace.PutDataspaces",
  "depends": [
    "Energistics.Etp.v12.Datatypes.Object.Dataspace"
  ]
}`);
            public static _protocol = 24;
            public static _messageTypeId = 3;
            public dataspaces = new Map<
              AvroString,
              Energistics.Etp.v12.Datatypes.Object.Dataspace
            >();
          }
          export const MsgPutDataspaces = 3;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Datatypes {
        export namespace Object {
          export class DeletedResource {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Datatypes.Object",
  "name": "DeletedResource",
  "fields": [
    {
      "name": "uri",
      "type": "string"
    },
    {
      "name": "deletedTime",
      "type": "long"
    },
    {
      "name": "customData",
      "type": {
        "type": "map",
        "values": "Energistics.Etp.v12.Datatypes.DataValue"
      },
      "default": {}
    }
  ],
  "fullName": "Energistics.Etp.v12.Datatypes.Object.DeletedResource",
  "depends": [
    "Energistics.Etp.v12.Datatypes.DataValue"
  ]
}`);
            public uri: AvroString = "";
            public deletedTime: Integer64 = BigInt(0);
            public customData = new Map<
              AvroString,
              Energistics.Etp.v12.Datatypes.DataValue
            >();
          }
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace Discovery {
          export class GetDeletedResourcesResponse {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.Discovery",
  "name": "GetDeletedResourcesResponse",
  "protocol": "3",
  "messageType": "6",
  "senderRole": "store",
  "protocolRoles": "store,customer",
  "multipartFlag": true,
  "fields": [
    {
      "name": "deletedResources",
      "type": {
        "type": "array",
        "items": "Energistics.Etp.v12.Datatypes.Object.DeletedResource"
      },
      "default": []
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.Discovery.GetDeletedResourcesResponse",
  "depends": [
    "Energistics.Etp.v12.Datatypes.Object.DeletedResource"
  ]
}`);
            public static _protocol = 3;
            public static _messageTypeId = 6;
            /** @maxItems 100000 */
            public deletedResources: Energistics.Etp.v12.Datatypes.Object.DeletedResource[] =
              [];
          }
          export const MsgGetDeletedResourcesResponse = 6;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Datatypes {
        export namespace Object {
          export class IndexInterval {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Datatypes.Object",
  "name": "IndexInterval",
  "fields": [
    {
      "name": "startIndex",
      "type": "Energistics.Etp.v12.Datatypes.IndexValue"
    },
    {
      "name": "endIndex",
      "type": "Energistics.Etp.v12.Datatypes.IndexValue"
    },
    {
      "name": "uom",
      "type": "string"
    },
    {
      "name": "depthDatum",
      "type": "string",
      "default": ""
    }
  ],
  "fullName": "Energistics.Etp.v12.Datatypes.Object.IndexInterval",
  "depends": [
    "Energistics.Etp.v12.Datatypes.IndexValue",
    "Energistics.Etp.v12.Datatypes.IndexValue"
  ]
}`);
            public startIndex: Energistics.Etp.v12.Datatypes.IndexValue =
              new Energistics.Etp.v12.Datatypes.IndexValue();
            public endIndex: Energistics.Etp.v12.Datatypes.IndexValue =
              new Energistics.Etp.v12.Datatypes.IndexValue();
            public uom: AvroString = "";
            public depthDatum: AvroString = "";
          }
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace ChannelDataFrame {
          export class GetFrame {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.ChannelDataFrame",
  "name": "GetFrame",
  "protocol": "2",
  "messageType": "3",
  "senderRole": "customer",
  "protocolRoles": "store,customer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "uri",
      "type": "string"
    },
    {
      "name": "includeAllChannelSecondaryIndexes",
      "type": "boolean",
      "default": false
    },
    {
      "name": "requestedInterval",
      "type": "Energistics.Etp.v12.Datatypes.Object.IndexInterval"
    },
    {
      "name": "requestUuid",
      "type": "Energistics.Etp.v12.Datatypes.Uuid"
    },
    {
      "name": "requestedSecondaryIntervals",
      "type": {
        "type": "array",
        "items": "Energistics.Etp.v12.Datatypes.Object.IndexInterval"
      },
      "default": []
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.ChannelDataFrame.GetFrame",
  "depends": [
    "Energistics.Etp.v12.Datatypes.Object.IndexInterval",
    "Energistics.Etp.v12.Datatypes.Uuid",
    "Energistics.Etp.v12.Datatypes.Object.IndexInterval"
  ]
}`);
            public static _protocol = 2;
            public static _messageTypeId = 3;
            public uri: AvroString = "";
            public includeAllChannelSecondaryIndexes = false;
            public requestedInterval: Energistics.Etp.v12.Datatypes.Object.IndexInterval =
              new Energistics.Etp.v12.Datatypes.Object.IndexInterval();
            public requestUuid: Energistics.Etp.v12.Datatypes.Uuid = [
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
            ];
            /** @maxItems 100000 */
            public requestedSecondaryIntervals: Energistics.Etp.v12.Datatypes.Object.IndexInterval[] =
              [];
          }
          export const MsgGetFrame = 3;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace ChannelDataLoad {
          export class ReplaceRange {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.ChannelDataLoad",
  "name": "ReplaceRange",
  "protocol": "22",
  "messageType": "6",
  "senderRole": "customer",
  "protocolRoles": "store,customer",
  "multipartFlag": true,
  "fields": [
    {
      "name": "changedInterval",
      "type": "Energistics.Etp.v12.Datatypes.Object.IndexInterval"
    },
    {
      "name": "channelIds",
      "type": {
        "type": "array",
        "items": "long"
      }
    },
    {
      "name": "data",
      "type": {
        "type": "array",
        "items": "Energistics.Etp.v12.Datatypes.ChannelData.DataItem"
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.ChannelDataLoad.ReplaceRange",
  "depends": [
    "Energistics.Etp.v12.Datatypes.Object.IndexInterval",
    "Energistics.Etp.v12.Datatypes.ChannelData.DataItem"
  ]
}`);
            public static _protocol = 22;
            public static _messageTypeId = 6;
            public changedInterval: Energistics.Etp.v12.Datatypes.Object.IndexInterval =
              new Energistics.Etp.v12.Datatypes.Object.IndexInterval();
            /** @maxItems 100000 */
            public channelIds: Integer64[] = [];
            /** @maxItems 100000 */
            public data: Energistics.Etp.v12.Datatypes.ChannelData.DataItem[] =
              [];
          }
          export const MsgReplaceRange = 6;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace ChannelSubscribe {
          export class RangeReplaced {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.ChannelSubscribe",
  "name": "RangeReplaced",
  "protocol": "21",
  "messageType": "6",
  "senderRole": "store",
  "protocolRoles": "store,customer",
  "multipartFlag": true,
  "fields": [
    {
      "name": "changeTime",
      "type": "long"
    },
    {
      "name": "channelIds",
      "type": {
        "type": "array",
        "items": "long"
      }
    },
    {
      "name": "changedInterval",
      "type": "Energistics.Etp.v12.Datatypes.Object.IndexInterval"
    },
    {
      "name": "data",
      "type": {
        "type": "array",
        "items": "Energistics.Etp.v12.Datatypes.ChannelData.DataItem"
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.ChannelSubscribe.RangeReplaced",
  "depends": [
    "Energistics.Etp.v12.Datatypes.Object.IndexInterval",
    "Energistics.Etp.v12.Datatypes.ChannelData.DataItem"
  ]
}`);
            public static _protocol = 21;
            public static _messageTypeId = 6;
            public changeTime: Integer64 = BigInt(0);
            /** @maxItems 100000 */
            public channelIds: Integer64[] = [];
            public changedInterval: Energistics.Etp.v12.Datatypes.Object.IndexInterval =
              new Energistics.Etp.v12.Datatypes.Object.IndexInterval();
            /** @maxItems 100000 */
            public data: Energistics.Etp.v12.Datatypes.ChannelData.DataItem[] =
              [];
          }
          export const MsgRangeReplaced = 6;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace GrowingObject {
          export class GetPartsByRange {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.GrowingObject",
  "name": "GetPartsByRange",
  "protocol": "6",
  "messageType": "4",
  "senderRole": "customer",
  "protocolRoles": "store,customer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "uri",
      "type": "string"
    },
    {
      "name": "format",
      "type": "string",
      "default": "xml"
    },
    {
      "name": "indexInterval",
      "type": "Energistics.Etp.v12.Datatypes.Object.IndexInterval"
    },
    {
      "name": "includeOverlappingIntervals",
      "type": "boolean"
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.GrowingObject.GetPartsByRange",
  "depends": [
    "Energistics.Etp.v12.Datatypes.Object.IndexInterval"
  ]
}`);
            public static _protocol = 6;
            public static _messageTypeId = 4;
            public uri: AvroString = "";
            public format: AvroString = "xml";
            public indexInterval: Energistics.Etp.v12.Datatypes.Object.IndexInterval =
              new Energistics.Etp.v12.Datatypes.Object.IndexInterval();
            public includeOverlappingIntervals = false;
          }
          export const MsgGetPartsByRange = 4;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Datatypes {
        export namespace ChannelData {
          export class ChannelRangeInfo {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Datatypes.ChannelData",
  "name": "ChannelRangeInfo",
  "fields": [
    {
      "name": "channelIds",
      "type": {
        "type": "array",
        "items": "long"
      }
    },
    {
      "name": "interval",
      "type": "Energistics.Etp.v12.Datatypes.Object.IndexInterval"
    },
    {
      "name": "secondaryIntervals",
      "type": {
        "type": "array",
        "items": "Energistics.Etp.v12.Datatypes.Object.IndexInterval"
      },
      "default": []
    }
  ],
  "fullName": "Energistics.Etp.v12.Datatypes.ChannelData.ChannelRangeInfo",
  "depends": [
    "Energistics.Etp.v12.Datatypes.Object.IndexInterval",
    "Energistics.Etp.v12.Datatypes.Object.IndexInterval"
  ]
}`);
            /** @maxItems 100000 */
            public channelIds: Integer64[] = [];
            public interval: Energistics.Etp.v12.Datatypes.Object.IndexInterval =
              new Energistics.Etp.v12.Datatypes.Object.IndexInterval();
            /** @maxItems 100000 */
            public secondaryIntervals: Energistics.Etp.v12.Datatypes.Object.IndexInterval[] =
              [];
          }
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace ChannelSubscribe {
          export class GetRanges {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.ChannelSubscribe",
  "name": "GetRanges",
  "protocol": "21",
  "messageType": "9",
  "senderRole": "customer",
  "protocolRoles": "store,customer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "requestUuid",
      "type": "Energistics.Etp.v12.Datatypes.Uuid"
    },
    {
      "name": "channelRanges",
      "type": {
        "type": "array",
        "items": "Energistics.Etp.v12.Datatypes.ChannelData.ChannelRangeInfo"
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.ChannelSubscribe.GetRanges",
  "depends": [
    "Energistics.Etp.v12.Datatypes.Uuid",
    "Energistics.Etp.v12.Datatypes.ChannelData.ChannelRangeInfo"
  ]
}`);
            public static _protocol = 21;
            public static _messageTypeId = 9;
            public requestUuid: Energistics.Etp.v12.Datatypes.Uuid = [
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
            ];
            /** @maxItems 100000 */
            public channelRanges: Energistics.Etp.v12.Datatypes.ChannelData.ChannelRangeInfo[] =
              [];
          }
          export const MsgGetRanges = 9;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Datatypes {
        export namespace ChannelData {
          export class IndexMetadataRecord {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Datatypes.ChannelData",
  "name": "IndexMetadataRecord",
  "fields": [
    {
      "name": "indexKind",
      "type": "Energistics.Etp.v12.Datatypes.ChannelData.ChannelIndexKind",
      "default": "DateTime"
    },
    {
      "name": "interval",
      "type": "Energistics.Etp.v12.Datatypes.Object.IndexInterval"
    },
    {
      "name": "direction",
      "type": "Energistics.Etp.v12.Datatypes.ChannelData.IndexDirection",
      "default": "Increasing"
    },
    {
      "name": "name",
      "type": "string",
      "default": ""
    },
    {
      "name": "uom",
      "type": "string"
    },
    {
      "name": "depthDatum",
      "type": "string",
      "default": ""
    },
    {
      "name": "indexPropertyKindUri",
      "type": "string"
    },
    {
      "name": "filterable",
      "type": "boolean",
      "default": true
    }
  ],
  "fullName": "Energistics.Etp.v12.Datatypes.ChannelData.IndexMetadataRecord",
  "depends": [
    "Energistics.Etp.v12.Datatypes.ChannelData.ChannelIndexKind",
    "Energistics.Etp.v12.Datatypes.Object.IndexInterval",
    "Energistics.Etp.v12.Datatypes.ChannelData.IndexDirection"
  ]
}`);
            public indexKind: Energistics.Etp.v12.Datatypes.ChannelData.ChannelIndexKind =
              Energistics.Etp.v12.Datatypes.ChannelData.ChannelIndexKind
                .DateTime;
            public interval: Energistics.Etp.v12.Datatypes.Object.IndexInterval =
              new Energistics.Etp.v12.Datatypes.Object.IndexInterval();
            public direction: Energistics.Etp.v12.Datatypes.ChannelData.IndexDirection =
              Energistics.Etp.v12.Datatypes.ChannelData.IndexDirection
                .Increasing;
            public name: AvroString = "";
            public uom: AvroString = "";
            public depthDatum: AvroString = "";
            public indexPropertyKindUri: AvroString = "";
            public filterable = true;
          }
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace ChannelDataFrame {
          export class GetFrameMetadataResponse {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.ChannelDataFrame",
  "name": "GetFrameMetadataResponse",
  "protocol": "2",
  "messageType": "2",
  "senderRole": "store",
  "protocolRoles": "store,customer",
  "multipartFlag": true,
  "fields": [
    {
      "name": "uri",
      "type": "string"
    },
    {
      "name": "indexes",
      "type": {
        "type": "array",
        "items": "Energistics.Etp.v12.Datatypes.ChannelData.IndexMetadataRecord"
      }
    },
    {
      "name": "channels",
      "type": {
        "type": "array",
        "items": "Energistics.Etp.v12.Datatypes.ChannelData.FrameChannelMetadataRecord"
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.ChannelDataFrame.GetFrameMetadataResponse",
  "depends": [
    "Energistics.Etp.v12.Datatypes.ChannelData.IndexMetadataRecord",
    "Energistics.Etp.v12.Datatypes.ChannelData.FrameChannelMetadataRecord"
  ]
}`);
            public static _protocol = 2;
            public static _messageTypeId = 2;
            public uri: AvroString = "";
            /** @maxItems 100000 */
            public indexes: Energistics.Etp.v12.Datatypes.ChannelData.IndexMetadataRecord[] =
              [];
            /** @maxItems 100000 */
            public channels: Energistics.Etp.v12.Datatypes.ChannelData.FrameChannelMetadataRecord[] =
              [];
          }
          export const MsgGetFrameMetadataResponse = 2;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace ChannelDataFrame {
          export class GetFrameResponseHeader {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.ChannelDataFrame",
  "name": "GetFrameResponseHeader",
  "protocol": "2",
  "messageType": "4",
  "senderRole": "store",
  "protocolRoles": "store,customer",
  "multipartFlag": true,
  "fields": [
    {
      "name": "channelUris",
      "type": {
        "type": "array",
        "items": "string"
      }
    },
    {
      "name": "indexes",
      "type": {
        "type": "array",
        "items": "Energistics.Etp.v12.Datatypes.ChannelData.IndexMetadataRecord"
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.ChannelDataFrame.GetFrameResponseHeader",
  "depends": [
    "Energistics.Etp.v12.Datatypes.ChannelData.IndexMetadataRecord"
  ]
}`);
            public static _protocol = 2;
            public static _messageTypeId = 4;
            /** @maxItems 100000 */
            public channelUris: AvroString[] = [];
            /** @maxItems 100000 */
            public indexes: Energistics.Etp.v12.Datatypes.ChannelData.IndexMetadataRecord[] =
              [];
          }
          export const MsgGetFrameResponseHeader = 4;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Datatypes {
        export namespace ChannelData {
          export class ChannelMetadataRecord {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Datatypes.ChannelData",
  "name": "ChannelMetadataRecord",
  "fields": [
    {
      "name": "uri",
      "type": "string"
    },
    {
      "name": "id",
      "type": "long"
    },
    {
      "name": "indexes",
      "type": {
        "type": "array",
        "items": "Energistics.Etp.v12.Datatypes.ChannelData.IndexMetadataRecord"
      }
    },
    {
      "name": "channelName",
      "type": "string"
    },
    {
      "name": "dataKind",
      "type": "Energistics.Etp.v12.Datatypes.ChannelData.ChannelDataKind"
    },
    {
      "name": "uom",
      "type": "string"
    },
    {
      "name": "depthDatum",
      "type": "string"
    },
    {
      "name": "channelClassUri",
      "type": "string"
    },
    {
      "name": "status",
      "type": "Energistics.Etp.v12.Datatypes.Object.ActiveStatusKind"
    },
    {
      "name": "source",
      "type": "string"
    },
    {
      "name": "axisVectorLengths",
      "type": {
        "type": "array",
        "items": "int"
      }
    },
    {
      "name": "attributeMetadata",
      "type": {
        "type": "array",
        "items": "Energistics.Etp.v12.Datatypes.AttributeMetadataRecord"
      },
      "default": []
    },
    {
      "name": "customData",
      "type": {
        "type": "map",
        "values": "Energistics.Etp.v12.Datatypes.DataValue"
      },
      "default": {}
    }
  ],
  "fullName": "Energistics.Etp.v12.Datatypes.ChannelData.ChannelMetadataRecord",
  "depends": [
    "Energistics.Etp.v12.Datatypes.ChannelData.IndexMetadataRecord",
    "Energistics.Etp.v12.Datatypes.ChannelData.ChannelDataKind",
    "Energistics.Etp.v12.Datatypes.Object.ActiveStatusKind",
    "Energistics.Etp.v12.Datatypes.AttributeMetadataRecord",
    "Energistics.Etp.v12.Datatypes.DataValue"
  ]
}`);
            public uri: AvroString = "";
            public id: Integer64 = BigInt(0);
            /** @maxItems 100000 */
            public indexes: Energistics.Etp.v12.Datatypes.ChannelData.IndexMetadataRecord[] =
              [];
            public channelName: AvroString = "";
            public dataKind: Energistics.Etp.v12.Datatypes.ChannelData.ChannelDataKind =
              Energistics.Etp.v12.Datatypes.ChannelData.ChannelDataKind
                .DateTime;
            public uom: AvroString = "";
            public depthDatum: AvroString = "";
            public channelClassUri: AvroString = "";
            public status: Energistics.Etp.v12.Datatypes.Object.ActiveStatusKind =
              Energistics.Etp.v12.Datatypes.Object.ActiveStatusKind.Active;
            public source: AvroString = "";
            /** @maxItems 100000 */
            public axisVectorLengths: Integer32[] = [];
            /** @maxItems 100000 */
            public attributeMetadata: Energistics.Etp.v12.Datatypes.AttributeMetadataRecord[] =
              [];
            public customData = new Map<
              AvroString,
              Energistics.Etp.v12.Datatypes.DataValue
            >();
          }
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace ChannelStreaming {
          export class ChannelMetadata {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.ChannelStreaming",
  "name": "ChannelMetadata",
  "protocol": "1",
  "messageType": "1",
  "senderRole": "producer",
  "protocolRoles": "producer,consumer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "channels",
      "type": {
        "type": "array",
        "items": "Energistics.Etp.v12.Datatypes.ChannelData.ChannelMetadataRecord"
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.ChannelStreaming.ChannelMetadata",
  "depends": [
    "Energistics.Etp.v12.Datatypes.ChannelData.ChannelMetadataRecord"
  ]
}`);
            public static _protocol = 1;
            public static _messageTypeId = 1;
            /** @maxItems 100000 */
            public channels: Energistics.Etp.v12.Datatypes.ChannelData.ChannelMetadataRecord[] =
              [];
          }
          export const MsgChannelMetadata = 1;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace ChannelSubscribe {
          export class GetChannelMetadataResponse {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.ChannelSubscribe",
  "name": "GetChannelMetadataResponse",
  "protocol": "21",
  "messageType": "2",
  "senderRole": "store",
  "protocolRoles": "store,customer",
  "multipartFlag": true,
  "fields": [
    {
      "name": "metadata",
      "type": {
        "type": "map",
        "values": "Energistics.Etp.v12.Datatypes.ChannelData.ChannelMetadataRecord"
      },
      "default": {}
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.ChannelSubscribe.GetChannelMetadataResponse",
  "depends": [
    "Energistics.Etp.v12.Datatypes.ChannelData.ChannelMetadataRecord"
  ]
}`);
            public static _protocol = 21;
            public static _messageTypeId = 2;
            public metadata = new Map<
              AvroString,
              Energistics.Etp.v12.Datatypes.ChannelData.ChannelMetadataRecord
            >();
          }
          export const MsgGetChannelMetadataResponse = 2;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Datatypes {
        export namespace ChannelData {
          export class OpenChannelInfo {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Datatypes.ChannelData",
  "name": "OpenChannelInfo",
  "fields": [
    {
      "name": "metadata",
      "type": "Energistics.Etp.v12.Datatypes.ChannelData.ChannelMetadataRecord"
    },
    {
      "name": "preferRealtime",
      "type": "boolean",
      "default": true
    },
    {
      "name": "dataChanges",
      "type": "boolean",
      "default": true
    }
  ],
  "fullName": "Energistics.Etp.v12.Datatypes.ChannelData.OpenChannelInfo",
  "depends": [
    "Energistics.Etp.v12.Datatypes.ChannelData.ChannelMetadataRecord"
  ]
}`);
            public metadata: Energistics.Etp.v12.Datatypes.ChannelData.ChannelMetadataRecord =
              new Energistics.Etp.v12.Datatypes.ChannelData.ChannelMetadataRecord();
            public preferRealtime = true;
            public dataChanges = true;
          }
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace ChannelDataLoad {
          export class OpenChannelsResponse {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.ChannelDataLoad",
  "name": "OpenChannelsResponse",
  "protocol": "22",
  "messageType": "2",
  "senderRole": "store",
  "protocolRoles": "store,customer",
  "multipartFlag": true,
  "fields": [
    {
      "name": "channels",
      "type": {
        "type": "map",
        "values": "Energistics.Etp.v12.Datatypes.ChannelData.OpenChannelInfo"
      },
      "default": {}
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.ChannelDataLoad.OpenChannelsResponse",
  "depends": [
    "Energistics.Etp.v12.Datatypes.ChannelData.OpenChannelInfo"
  ]
}`);
            public static _protocol = 22;
            public static _messageTypeId = 2;
            public channels = new Map<
              AvroString,
              Energistics.Etp.v12.Datatypes.ChannelData.OpenChannelInfo
            >();
          }
          export const MsgOpenChannelsResponse = 2;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Datatypes {
        export namespace Object {
          export class ChangeAnnotation {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Datatypes.Object",
  "name": "ChangeAnnotation",
  "fields": [
    {
      "name": "changeTime",
      "type": "long"
    },
    {
      "name": "interval",
      "type": "Energistics.Etp.v12.Datatypes.Object.IndexInterval"
    }
  ],
  "fullName": "Energistics.Etp.v12.Datatypes.Object.ChangeAnnotation",
  "depends": [
    "Energistics.Etp.v12.Datatypes.Object.IndexInterval"
  ]
}`);
            public changeTime: Integer64 = BigInt(0);
            public interval: Energistics.Etp.v12.Datatypes.Object.IndexInterval =
              new Energistics.Etp.v12.Datatypes.Object.IndexInterval();
          }
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Datatypes {
        export namespace Object {
          export class ChangeResponseInfo {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Datatypes.Object",
  "name": "ChangeResponseInfo",
  "fields": [
    {
      "name": "responseTimestamp",
      "type": "long"
    },
    {
      "name": "changes",
      "type": {
        "type": "map",
        "values": {
          "type": "array",
          "items": "Energistics.Etp.v12.Datatypes.Object.ChangeAnnotation"
        }
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Datatypes.Object.ChangeResponseInfo",
  "depends": [
    "Energistics.Etp.v12.Datatypes.Object.ChangeAnnotation"
  ]
}`);
            public responseTimestamp: Integer64 = BigInt(0);
            public changes = new Map<
              AvroString,
              Energistics.Etp.v12.Datatypes.Object.ChangeAnnotation[]
            >();
          }
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace ChannelSubscribe {
          export class GetChangeAnnotationsResponse {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.ChannelSubscribe",
  "name": "GetChangeAnnotationsResponse",
  "protocol": "21",
  "messageType": "15",
  "senderRole": "store",
  "protocolRoles": "store,customer",
  "multipartFlag": true,
  "fields": [
    {
      "name": "changes",
      "type": {
        "type": "map",
        "values": "Energistics.Etp.v12.Datatypes.Object.ChangeResponseInfo"
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.ChannelSubscribe.GetChangeAnnotationsResponse",
  "depends": [
    "Energistics.Etp.v12.Datatypes.Object.ChangeResponseInfo"
  ]
}`);
            public static _protocol = 21;
            public static _messageTypeId = 15;
            public changes = new Map<
              AvroString,
              Energistics.Etp.v12.Datatypes.Object.ChangeResponseInfo
            >();
          }
          export const MsgGetChangeAnnotationsResponse = 15;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace GrowingObject {
          export class GetChangeAnnotationsResponse {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.GrowingObject",
  "name": "GetChangeAnnotationsResponse",
  "protocol": "6",
  "messageType": "20",
  "senderRole": "store",
  "protocolRoles": "store,customer",
  "multipartFlag": true,
  "fields": [
    {
      "name": "changes",
      "type": {
        "type": "map",
        "values": "Energistics.Etp.v12.Datatypes.Object.ChangeResponseInfo"
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.GrowingObject.GetChangeAnnotationsResponse",
  "depends": [
    "Energistics.Etp.v12.Datatypes.Object.ChangeResponseInfo"
  ]
}`);
            public static _protocol = 6;
            public static _messageTypeId = 20;
            public changes = new Map<
              AvroString,
              Energistics.Etp.v12.Datatypes.Object.ChangeResponseInfo
            >();
          }
          export const MsgGetChangeAnnotationsResponse = 20;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Datatypes {
        export namespace Object {
          export enum ObjectChangeKind {
            insert = 0,
            update = 1,
            authorized = 2,
            joined = 3,
            unjoined = 4,
            joinedSubscription = 5,
            unjoinedSubscription = 6
          }
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Datatypes {
        export namespace Object {
          export class ObjectPart {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Datatypes.Object",
  "name": "ObjectPart",
  "fields": [
    {
      "name": "uid",
      "type": "string"
    },
    {
      "name": "data",
      "type": "bytes"
    }
  ],
  "fullName": "Energistics.Etp.v12.Datatypes.Object.ObjectPart",
  "depends": []
}`);
            public uid: AvroString = "";
            public data: Bytes = Buffer.alloc(0);
          }
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace GrowingObject {
          export class GetPartsByRangeResponse {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.GrowingObject",
  "name": "GetPartsByRangeResponse",
  "protocol": "6",
  "messageType": "10",
  "senderRole": "store",
  "protocolRoles": "store,customer",
  "multipartFlag": true,
  "fields": [
    {
      "name": "uri",
      "type": "string"
    },
    {
      "name": "format",
      "type": "string",
      "default": "xml"
    },
    {
      "name": "parts",
      "type": {
        "type": "array",
        "items": "Energistics.Etp.v12.Datatypes.Object.ObjectPart"
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.GrowingObject.GetPartsByRangeResponse",
  "depends": [
    "Energistics.Etp.v12.Datatypes.Object.ObjectPart"
  ]
}`);
            public static _protocol = 6;
            public static _messageTypeId = 10;
            public uri: AvroString = "";
            public format: AvroString = "xml";
            /** @maxItems 100000 */
            public parts: Energistics.Etp.v12.Datatypes.Object.ObjectPart[] =
              [];
          }
          export const MsgGetPartsByRangeResponse = 10;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace GrowingObject {
          export class GetPartsResponse {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.GrowingObject",
  "name": "GetPartsResponse",
  "protocol": "6",
  "messageType": "6",
  "senderRole": "store",
  "protocolRoles": "store,customer",
  "multipartFlag": true,
  "fields": [
    {
      "name": "uri",
      "type": "string"
    },
    {
      "name": "format",
      "type": "string",
      "default": "xml"
    },
    {
      "name": "parts",
      "type": {
        "type": "map",
        "values": "Energistics.Etp.v12.Datatypes.Object.ObjectPart"
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.GrowingObject.GetPartsResponse",
  "depends": [
    "Energistics.Etp.v12.Datatypes.Object.ObjectPart"
  ]
}`);
            public static _protocol = 6;
            public static _messageTypeId = 6;
            public uri: AvroString = "";
            public format: AvroString = "xml";
            public parts = new Map<
              AvroString,
              Energistics.Etp.v12.Datatypes.Object.ObjectPart
            >();
          }
          export const MsgGetPartsResponse = 6;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace GrowingObject {
          export class PutParts {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.GrowingObject",
  "name": "PutParts",
  "protocol": "6",
  "messageType": "5",
  "senderRole": "customer",
  "protocolRoles": "store,customer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "uri",
      "type": "string"
    },
    {
      "name": "format",
      "type": "string",
      "default": "xml"
    },
    {
      "name": "parts",
      "type": {
        "type": "map",
        "values": "Energistics.Etp.v12.Datatypes.Object.ObjectPart"
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.GrowingObject.PutParts",
  "depends": [
    "Energistics.Etp.v12.Datatypes.Object.ObjectPart"
  ]
}`);
            public static _protocol = 6;
            public static _messageTypeId = 5;
            public uri: AvroString = "";
            public format: AvroString = "xml";
            public parts = new Map<
              AvroString,
              Energistics.Etp.v12.Datatypes.Object.ObjectPart
            >();
          }
          export const MsgPutParts = 5;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace GrowingObject {
          export class ReplacePartsByRange {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.GrowingObject",
  "name": "ReplacePartsByRange",
  "protocol": "6",
  "messageType": "7",
  "senderRole": "customer",
  "protocolRoles": "store,customer",
  "multipartFlag": true,
  "fields": [
    {
      "name": "uri",
      "type": "string"
    },
    {
      "name": "deleteInterval",
      "type": "Energistics.Etp.v12.Datatypes.Object.IndexInterval"
    },
    {
      "name": "includeOverlappingIntervals",
      "type": "boolean"
    },
    {
      "name": "format",
      "type": "string",
      "default": "xml"
    },
    {
      "name": "parts",
      "type": {
        "type": "array",
        "items": "Energistics.Etp.v12.Datatypes.Object.ObjectPart"
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.GrowingObject.ReplacePartsByRange",
  "depends": [
    "Energistics.Etp.v12.Datatypes.Object.IndexInterval",
    "Energistics.Etp.v12.Datatypes.Object.ObjectPart"
  ]
}`);
            public static _protocol = 6;
            public static _messageTypeId = 7;
            public uri: AvroString = "";
            public deleteInterval: Energistics.Etp.v12.Datatypes.Object.IndexInterval =
              new Energistics.Etp.v12.Datatypes.Object.IndexInterval();
            public includeOverlappingIntervals = false;
            public format: AvroString = "xml";
            /** @maxItems 100000 */
            public parts: Energistics.Etp.v12.Datatypes.Object.ObjectPart[] =
              [];
          }
          export const MsgReplacePartsByRange = 7;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace GrowingObjectNotification {
          export class PartsChanged {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.GrowingObjectNotification",
  "name": "PartsChanged",
  "protocol": "7",
  "messageType": "2",
  "senderRole": "store",
  "protocolRoles": "store,customer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "uri",
      "type": "string"
    },
    {
      "name": "requestUuid",
      "type": "Energistics.Etp.v12.Datatypes.Uuid"
    },
    {
      "name": "changeKind",
      "type": "Energistics.Etp.v12.Datatypes.Object.ObjectChangeKind"
    },
    {
      "name": "changeTime",
      "type": "long"
    },
    {
      "name": "format",
      "type": "string",
      "default": ""
    },
    {
      "name": "parts",
      "type": {
        "type": "array",
        "items": "Energistics.Etp.v12.Datatypes.Object.ObjectPart"
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.GrowingObjectNotification.PartsChanged",
  "depends": [
    "Energistics.Etp.v12.Datatypes.Uuid",
    "Energistics.Etp.v12.Datatypes.Object.ObjectChangeKind",
    "Energistics.Etp.v12.Datatypes.Object.ObjectPart"
  ]
}`);
            public static _protocol = 7;
            public static _messageTypeId = 2;
            public uri: AvroString = "";
            public requestUuid: Energistics.Etp.v12.Datatypes.Uuid = [
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
            ];
            public changeKind: Energistics.Etp.v12.Datatypes.Object.ObjectChangeKind =
              Energistics.Etp.v12.Datatypes.Object.ObjectChangeKind.insert;
            public changeTime: Integer64 = BigInt(0);
            public format: AvroString = "";
            /** @maxItems 100000 */
            public parts: Energistics.Etp.v12.Datatypes.Object.ObjectPart[] =
              [];
          }
          export const MsgPartsChanged = 2;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace GrowingObjectNotification {
          export class PartsReplacedByRange {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.GrowingObjectNotification",
  "name": "PartsReplacedByRange",
  "protocol": "7",
  "messageType": "6",
  "senderRole": "store",
  "protocolRoles": "store,customer",
  "multipartFlag": true,
  "fields": [
    {
      "name": "uri",
      "type": "string"
    },
    {
      "name": "requestUuid",
      "type": "Energistics.Etp.v12.Datatypes.Uuid"
    },
    {
      "name": "changeTime",
      "type": "long"
    },
    {
      "name": "deletedInterval",
      "type": "Energistics.Etp.v12.Datatypes.Object.IndexInterval"
    },
    {
      "name": "includeOverlappingIntervals",
      "type": "boolean"
    },
    {
      "name": "format",
      "type": "string",
      "default": ""
    },
    {
      "name": "parts",
      "type": {
        "type": "array",
        "items": "Energistics.Etp.v12.Datatypes.Object.ObjectPart"
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.GrowingObjectNotification.PartsReplacedByRange",
  "depends": [
    "Energistics.Etp.v12.Datatypes.Uuid",
    "Energistics.Etp.v12.Datatypes.Object.IndexInterval",
    "Energistics.Etp.v12.Datatypes.Object.ObjectPart"
  ]
}`);
            public static _protocol = 7;
            public static _messageTypeId = 6;
            public uri: AvroString = "";
            public requestUuid: Energistics.Etp.v12.Datatypes.Uuid = [
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
            ];
            public changeTime: Integer64 = BigInt(0);
            public deletedInterval: Energistics.Etp.v12.Datatypes.Object.IndexInterval =
              new Energistics.Etp.v12.Datatypes.Object.IndexInterval();
            public includeOverlappingIntervals = false;
            public format: AvroString = "";
            /** @maxItems 100000 */
            public parts: Energistics.Etp.v12.Datatypes.Object.ObjectPart[] =
              [];
          }
          export const MsgPartsReplacedByRange = 6;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace GrowingObjectQuery {
          export class FindPartsResponse {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.GrowingObjectQuery",
  "name": "FindPartsResponse",
  "protocol": "16",
  "messageType": "2",
  "senderRole": "store",
  "protocolRoles": "store,customer",
  "multipartFlag": true,
  "fields": [
    {
      "name": "uri",
      "type": "string"
    },
    {
      "name": "serverSortOrder",
      "type": "string"
    },
    {
      "name": "format",
      "type": "string",
      "default": "xml"
    },
    {
      "name": "parts",
      "type": {
        "type": "array",
        "items": "Energistics.Etp.v12.Datatypes.Object.ObjectPart"
      },
      "default": []
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.GrowingObjectQuery.FindPartsResponse",
  "depends": [
    "Energistics.Etp.v12.Datatypes.Object.ObjectPart"
  ]
}`);
            public static _protocol = 16;
            public static _messageTypeId = 2;
            public uri: AvroString = "";
            public serverSortOrder: AvroString = "";
            public format: AvroString = "xml";
            /** @maxItems 100000 */
            public parts: Energistics.Etp.v12.Datatypes.Object.ObjectPart[] =
              [];
          }
          export const MsgFindPartsResponse = 2;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Datatypes {
        export namespace Object {
          export class PartsMetadataInfo {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Datatypes.Object",
  "name": "PartsMetadataInfo",
  "fields": [
    {
      "name": "uri",
      "type": "string"
    },
    {
      "name": "name",
      "type": "string"
    },
    {
      "name": "index",
      "type": "Energistics.Etp.v12.Datatypes.ChannelData.IndexMetadataRecord"
    },
    {
      "name": "customData",
      "type": {
        "type": "map",
        "values": "Energistics.Etp.v12.Datatypes.DataValue"
      },
      "default": {}
    }
  ],
  "fullName": "Energistics.Etp.v12.Datatypes.Object.PartsMetadataInfo",
  "depends": [
    "Energistics.Etp.v12.Datatypes.ChannelData.IndexMetadataRecord",
    "Energistics.Etp.v12.Datatypes.DataValue"
  ]
}`);
            public uri: AvroString = "";
            public name: AvroString = "";
            public index: Energistics.Etp.v12.Datatypes.ChannelData.IndexMetadataRecord =
              new Energistics.Etp.v12.Datatypes.ChannelData.IndexMetadataRecord();
            public customData = new Map<
              AvroString,
              Energistics.Etp.v12.Datatypes.DataValue
            >();
          }
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace GrowingObject {
          export class GetPartsMetadataResponse {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.GrowingObject",
  "name": "GetPartsMetadataResponse",
  "protocol": "6",
  "messageType": "9",
  "senderRole": "store",
  "protocolRoles": "store,customer",
  "multipartFlag": true,
  "fields": [
    {
      "name": "metadata",
      "type": {
        "type": "map",
        "values": "Energistics.Etp.v12.Datatypes.Object.PartsMetadataInfo"
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.GrowingObject.GetPartsMetadataResponse",
  "depends": [
    "Energistics.Etp.v12.Datatypes.Object.PartsMetadataInfo"
  ]
}`);
            public static _protocol = 6;
            public static _messageTypeId = 9;
            public metadata = new Map<
              AvroString,
              Energistics.Etp.v12.Datatypes.Object.PartsMetadataInfo
            >();
          }
          export const MsgGetPartsMetadataResponse = 9;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Datatypes {
        export namespace Object {
          export class PutResponse {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Datatypes.Object",
  "name": "PutResponse",
  "fields": [
    {
      "name": "createdContainedObjectUris",
      "type": {
        "type": "array",
        "items": "string"
      },
      "default": []
    },
    {
      "name": "deletedContainedObjectUris",
      "type": {
        "type": "array",
        "items": "string"
      },
      "default": []
    },
    {
      "name": "joinedContainedObjectUris",
      "type": {
        "type": "array",
        "items": "string"
      },
      "default": []
    },
    {
      "name": "unjoinedContainedObjectUris",
      "type": {
        "type": "array",
        "items": "string"
      },
      "default": []
    }
  ],
  "fullName": "Energistics.Etp.v12.Datatypes.Object.PutResponse",
  "depends": []
}`);
            /** @maxItems 100000 */
            public createdContainedObjectUris: AvroString[] = [];
            /** @maxItems 100000 */
            public deletedContainedObjectUris: AvroString[] = [];
            /** @maxItems 100000 */
            public joinedContainedObjectUris: AvroString[] = [];
            /** @maxItems 100000 */
            public unjoinedContainedObjectUris: AvroString[] = [];
          }
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace Store {
          export class PutDataObjectsResponse {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.Store",
  "name": "PutDataObjectsResponse",
  "protocol": "4",
  "messageType": "9",
  "senderRole": "store",
  "protocolRoles": "store,customer",
  "multipartFlag": true,
  "fields": [
    {
      "name": "success",
      "type": {
        "type": "map",
        "values": "Energistics.Etp.v12.Datatypes.Object.PutResponse"
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.Store.PutDataObjectsResponse",
  "depends": [
    "Energistics.Etp.v12.Datatypes.Object.PutResponse"
  ]
}`);
            public static _protocol = 4;
            public static _messageTypeId = 9;
            public success = new Map<
              AvroString,
              Energistics.Etp.v12.Datatypes.Object.PutResponse
            >();
          }
          export const MsgPutDataObjectsResponse = 9;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Datatypes {
        export namespace Object {
          export enum RelationshipKind {
            Primary = 0,
            Secondary = 1,
            Both = 2
          }
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Datatypes {
        export namespace Object {
          export class ContextInfo {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Datatypes.Object",
  "name": "ContextInfo",
  "fields": [
    {
      "name": "uri",
      "type": "string"
    },
    {
      "name": "depth",
      "type": "int"
    },
    {
      "name": "dataObjectTypes",
      "type": {
        "type": "array",
        "items": "string"
      },
      "default": []
    },
    {
      "name": "navigableEdges",
      "type": "Energistics.Etp.v12.Datatypes.Object.RelationshipKind"
    },
    {
      "name": "includeSecondaryTargets",
      "type": "boolean",
      "default": false
    },
    {
      "name": "includeSecondarySources",
      "type": "boolean",
      "default": false
    }
  ],
  "fullName": "Energistics.Etp.v12.Datatypes.Object.ContextInfo",
  "depends": [
    "Energistics.Etp.v12.Datatypes.Object.RelationshipKind"
  ]
}`);
            public uri: AvroString = "";
            public depth: Integer32 = 0;
            /** @maxItems 100000 */
            public dataObjectTypes: AvroString[] = [];
            public navigableEdges: Energistics.Etp.v12.Datatypes.Object.RelationshipKind =
              Energistics.Etp.v12.Datatypes.Object.RelationshipKind.Primary;
            public includeSecondaryTargets = false;
            public includeSecondarySources = false;
          }
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace Discovery {
          export class GetResources {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.Discovery",
  "name": "GetResources",
  "protocol": "3",
  "messageType": "1",
  "senderRole": "customer",
  "protocolRoles": "store,customer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "context",
      "type": "Energistics.Etp.v12.Datatypes.Object.ContextInfo"
    },
    {
      "name": "scope",
      "type": "Energistics.Etp.v12.Datatypes.Object.ContextScopeKind"
    },
    {
      "name": "countObjects",
      "type": "boolean",
      "default": false
    },
    {
      "name": "storeLastWriteFilter",
      "type": [
        "null",
        "long"
      ]
    },
    {
      "name": "activeStatusFilter",
      "type": [
        "null",
        "Energistics.Etp.v12.Datatypes.Object.ActiveStatusKind"
      ]
    },
    {
      "name": "includeEdges",
      "type": "boolean",
      "default": false
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.Discovery.GetResources",
  "depends": [
    "Energistics.Etp.v12.Datatypes.Object.ContextInfo",
    "Energistics.Etp.v12.Datatypes.Object.ContextScopeKind",
    "Energistics.Etp.v12.Datatypes.Object.ActiveStatusKind"
  ]
}`);
            public static _protocol = 3;
            public static _messageTypeId = 1;
            public context: Energistics.Etp.v12.Datatypes.Object.ContextInfo =
              new Energistics.Etp.v12.Datatypes.Object.ContextInfo();
            public scope: Energistics.Etp.v12.Datatypes.Object.ContextScopeKind =
              Energistics.Etp.v12.Datatypes.Object.ContextScopeKind.self;
            public countObjects = false;
            public storeLastWriteFilter: null | Integer64 = null;
            public activeStatusFilter: null | Energistics.Etp.v12.Datatypes.Object.ActiveStatusKind =
              null;
            public includeEdges = false;
          }
          export const MsgGetResources = 1;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace DiscoveryQuery {
          export class FindResources {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.DiscoveryQuery",
  "name": "FindResources",
  "protocol": "13",
  "messageType": "1",
  "senderRole": "customer",
  "protocolRoles": "store,customer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "context",
      "type": "Energistics.Etp.v12.Datatypes.Object.ContextInfo"
    },
    {
      "name": "scope",
      "type": "Energistics.Etp.v12.Datatypes.Object.ContextScopeKind"
    },
    {
      "name": "storeLastWriteFilter",
      "type": [
        "null",
        "long"
      ]
    },
    {
      "name": "activeStatusFilter",
      "type": [
        "null",
        "Energistics.Etp.v12.Datatypes.Object.ActiveStatusKind"
      ]
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.DiscoveryQuery.FindResources",
  "depends": [
    "Energistics.Etp.v12.Datatypes.Object.ContextInfo",
    "Energistics.Etp.v12.Datatypes.Object.ContextScopeKind",
    "Energistics.Etp.v12.Datatypes.Object.ActiveStatusKind"
  ]
}`);
            public static _protocol = 13;
            public static _messageTypeId = 1;
            public context: Energistics.Etp.v12.Datatypes.Object.ContextInfo =
              new Energistics.Etp.v12.Datatypes.Object.ContextInfo();
            public scope: Energistics.Etp.v12.Datatypes.Object.ContextScopeKind =
              Energistics.Etp.v12.Datatypes.Object.ContextScopeKind.self;
            public storeLastWriteFilter: null | Integer64 = null;
            public activeStatusFilter: null | Energistics.Etp.v12.Datatypes.Object.ActiveStatusKind =
              null;
          }
          export const MsgFindResources = 1;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace StoreQuery {
          export class FindDataObjects {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.StoreQuery",
  "name": "FindDataObjects",
  "protocol": "14",
  "messageType": "1",
  "senderRole": "customer",
  "protocolRoles": "store,customer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "context",
      "type": "Energistics.Etp.v12.Datatypes.Object.ContextInfo"
    },
    {
      "name": "scope",
      "type": "Energistics.Etp.v12.Datatypes.Object.ContextScopeKind"
    },
    {
      "name": "storeLastWriteFilter",
      "type": [
        "null",
        "long"
      ]
    },
    {
      "name": "activeStatusFilter",
      "type": [
        "null",
        "Energistics.Etp.v12.Datatypes.Object.ActiveStatusKind"
      ]
    },
    {
      "name": "format",
      "type": "string",
      "default": "xml"
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.StoreQuery.FindDataObjects",
  "depends": [
    "Energistics.Etp.v12.Datatypes.Object.ContextInfo",
    "Energistics.Etp.v12.Datatypes.Object.ContextScopeKind",
    "Energistics.Etp.v12.Datatypes.Object.ActiveStatusKind"
  ]
}`);
            public static _protocol = 14;
            public static _messageTypeId = 1;
            public context: Energistics.Etp.v12.Datatypes.Object.ContextInfo =
              new Energistics.Etp.v12.Datatypes.Object.ContextInfo();
            public scope: Energistics.Etp.v12.Datatypes.Object.ContextScopeKind =
              Energistics.Etp.v12.Datatypes.Object.ContextScopeKind.self;
            public storeLastWriteFilter: null | Integer64 = null;
            public activeStatusFilter: null | Energistics.Etp.v12.Datatypes.Object.ActiveStatusKind =
              null;
            public format: AvroString = "xml";
          }
          export const MsgFindDataObjects = 1;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Datatypes {
        export namespace Object {
          export class Edge {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Datatypes.Object",
  "name": "Edge",
  "fields": [
    {
      "name": "sourceUri",
      "type": "string"
    },
    {
      "name": "targetUri",
      "type": "string"
    },
    {
      "name": "relationshipKind",
      "type": "Energistics.Etp.v12.Datatypes.Object.RelationshipKind"
    },
    {
      "name": "customData",
      "type": {
        "type": "map",
        "values": "Energistics.Etp.v12.Datatypes.DataValue"
      },
      "default": {}
    }
  ],
  "fullName": "Energistics.Etp.v12.Datatypes.Object.Edge",
  "depends": [
    "Energistics.Etp.v12.Datatypes.Object.RelationshipKind",
    "Energistics.Etp.v12.Datatypes.DataValue"
  ]
}`);
            public sourceUri: AvroString = "";
            public targetUri: AvroString = "";
            public relationshipKind: Energistics.Etp.v12.Datatypes.Object.RelationshipKind =
              Energistics.Etp.v12.Datatypes.Object.RelationshipKind.Primary;
            public customData = new Map<
              AvroString,
              Energistics.Etp.v12.Datatypes.DataValue
            >();
          }
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace Discovery {
          export class GetResourcesEdgesResponse {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.Discovery",
  "name": "GetResourcesEdgesResponse",
  "protocol": "3",
  "messageType": "7",
  "senderRole": "store",
  "protocolRoles": "store,customer",
  "multipartFlag": true,
  "fields": [
    {
      "name": "edges",
      "type": {
        "type": "array",
        "items": "Energistics.Etp.v12.Datatypes.Object.Edge"
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.Discovery.GetResourcesEdgesResponse",
  "depends": [
    "Energistics.Etp.v12.Datatypes.Object.Edge"
  ]
}`);
            public static _protocol = 3;
            public static _messageTypeId = 7;
            /** @maxItems 100000 */
            public edges: Energistics.Etp.v12.Datatypes.Object.Edge[] = [];
          }
          export const MsgGetResourcesEdgesResponse = 7;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Datatypes {
        export namespace Object {
          export class Resource {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Datatypes.Object",
  "name": "Resource",
  "fields": [
    {
      "name": "uri",
      "type": "string"
    },
    {
      "name": "alternateUris",
      "type": {
        "type": "array",
        "items": "string"
      },
      "default": []
    },
    {
      "name": "name",
      "type": "string"
    },
    {
      "name": "sourceCount",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "targetCount",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "lastChanged",
      "type": "long"
    },
    {
      "name": "storeLastWrite",
      "type": "long"
    },
    {
      "name": "storeCreated",
      "type": "long"
    },
    {
      "name": "activeStatus",
      "type": "Energistics.Etp.v12.Datatypes.Object.ActiveStatusKind"
    },
    {
      "name": "customData",
      "type": {
        "type": "map",
        "values": "Energistics.Etp.v12.Datatypes.DataValue"
      },
      "default": {}
    }
  ],
  "fullName": "Energistics.Etp.v12.Datatypes.Object.Resource",
  "depends": [
    "Energistics.Etp.v12.Datatypes.Object.ActiveStatusKind",
    "Energistics.Etp.v12.Datatypes.DataValue"
  ]
}`);
            public uri: AvroString = "";
            /** @maxItems 100000 */
            public alternateUris: AvroString[] = [];
            public name: AvroString = "";
            public sourceCount: null | Integer32 = null;
            public targetCount: null | Integer32 = null;
            public lastChanged: Integer64 = BigInt(0);
            public storeLastWrite: Integer64 = BigInt(0);
            public storeCreated: Integer64 = BigInt(0);
            public activeStatus: Energistics.Etp.v12.Datatypes.Object.ActiveStatusKind =
              Energistics.Etp.v12.Datatypes.Object.ActiveStatusKind.Active;
            public customData = new Map<
              AvroString,
              Energistics.Etp.v12.Datatypes.DataValue
            >();
          }
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace Discovery {
          export class GetResourcesResponse {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.Discovery",
  "name": "GetResourcesResponse",
  "protocol": "3",
  "messageType": "4",
  "senderRole": "store",
  "protocolRoles": "store,customer",
  "multipartFlag": true,
  "fields": [
    {
      "name": "resources",
      "type": {
        "type": "array",
        "items": "Energistics.Etp.v12.Datatypes.Object.Resource"
      },
      "default": []
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.Discovery.GetResourcesResponse",
  "depends": [
    "Energistics.Etp.v12.Datatypes.Object.Resource"
  ]
}`);
            public static _protocol = 3;
            public static _messageTypeId = 4;
            /** @maxItems 100000 */
            public resources: Energistics.Etp.v12.Datatypes.Object.Resource[] =
              [];
          }
          export const MsgGetResourcesResponse = 4;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace DiscoveryQuery {
          export class FindResourcesResponse {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.DiscoveryQuery",
  "name": "FindResourcesResponse",
  "protocol": "13",
  "messageType": "2",
  "senderRole": "store",
  "protocolRoles": "store,customer",
  "multipartFlag": true,
  "fields": [
    {
      "name": "resources",
      "type": {
        "type": "array",
        "items": "Energistics.Etp.v12.Datatypes.Object.Resource"
      },
      "default": []
    },
    {
      "name": "serverSortOrder",
      "type": "string"
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.DiscoveryQuery.FindResourcesResponse",
  "depends": [
    "Energistics.Etp.v12.Datatypes.Object.Resource"
  ]
}`);
            public static _protocol = 13;
            public static _messageTypeId = 2;
            /** @maxItems 100000 */
            public resources: Energistics.Etp.v12.Datatypes.Object.Resource[] =
              [];
            public serverSortOrder: AvroString = "";
          }
          export const MsgFindResourcesResponse = 2;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace StoreNotification {
          export class ObjectActiveStatusChanged {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.StoreNotification",
  "name": "ObjectActiveStatusChanged",
  "protocol": "5",
  "messageType": "11",
  "senderRole": "store",
  "protocolRoles": "store,customer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "activeStatus",
      "type": "Energistics.Etp.v12.Datatypes.Object.ActiveStatusKind"
    },
    {
      "name": "changeTime",
      "type": "long"
    },
    {
      "name": "resource",
      "type": "Energistics.Etp.v12.Datatypes.Object.Resource"
    },
    {
      "name": "requestUuid",
      "type": "Energistics.Etp.v12.Datatypes.Uuid"
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.StoreNotification.ObjectActiveStatusChanged",
  "depends": [
    "Energistics.Etp.v12.Datatypes.Object.ActiveStatusKind",
    "Energistics.Etp.v12.Datatypes.Object.Resource",
    "Energistics.Etp.v12.Datatypes.Uuid"
  ]
}`);
            public static _protocol = 5;
            public static _messageTypeId = 11;
            public activeStatus: Energistics.Etp.v12.Datatypes.Object.ActiveStatusKind =
              Energistics.Etp.v12.Datatypes.Object.ActiveStatusKind.Active;
            public changeTime: Integer64 = BigInt(0);
            public resource: Energistics.Etp.v12.Datatypes.Object.Resource =
              new Energistics.Etp.v12.Datatypes.Object.Resource();
            public requestUuid: Energistics.Etp.v12.Datatypes.Uuid = [
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
            ];
          }
          export const MsgObjectActiveStatusChanged = 11;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Datatypes {
        export namespace Object {
          export class DataObject {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Datatypes.Object",
  "name": "DataObject",
  "fields": [
    {
      "name": "resource",
      "type": "Energistics.Etp.v12.Datatypes.Object.Resource"
    },
    {
      "name": "format",
      "type": "string",
      "default": "xml"
    },
    {
      "name": "blobId",
      "type": [
        "null",
        "Energistics.Etp.v12.Datatypes.Uuid"
      ]
    },
    {
      "name": "data",
      "type": "bytes",
      "default": ""
    }
  ],
  "fullName": "Energistics.Etp.v12.Datatypes.Object.DataObject",
  "depends": [
    "Energistics.Etp.v12.Datatypes.Object.Resource",
    "Energistics.Etp.v12.Datatypes.Uuid"
  ]
}`);
            public resource: Energistics.Etp.v12.Datatypes.Object.Resource =
              new Energistics.Etp.v12.Datatypes.Object.Resource();
            public format: AvroString = "xml";
            public blobId: null | Energistics.Etp.v12.Datatypes.Uuid = null;
            public data: Bytes = Buffer.alloc(0);
          }
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace GrowingObject {
          export class GetGrowingDataObjectsHeaderResponse {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.GrowingObject",
  "name": "GetGrowingDataObjectsHeaderResponse",
  "protocol": "6",
  "messageType": "15",
  "senderRole": "store",
  "protocolRoles": "store,customer",
  "multipartFlag": true,
  "fields": [
    {
      "name": "dataObjects",
      "type": {
        "type": "map",
        "values": "Energistics.Etp.v12.Datatypes.Object.DataObject"
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.GrowingObject.GetGrowingDataObjectsHeaderResponse",
  "depends": [
    "Energistics.Etp.v12.Datatypes.Object.DataObject"
  ]
}`);
            public static _protocol = 6;
            public static _messageTypeId = 15;
            public dataObjects = new Map<
              AvroString,
              Energistics.Etp.v12.Datatypes.Object.DataObject
            >();
          }
          export const MsgGetGrowingDataObjectsHeaderResponse = 15;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace GrowingObject {
          export class PutGrowingDataObjectsHeader {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.GrowingObject",
  "name": "PutGrowingDataObjectsHeader",
  "protocol": "6",
  "messageType": "16",
  "senderRole": "customer",
  "protocolRoles": "store,customer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "dataObjects",
      "type": {
        "type": "map",
        "values": "Energistics.Etp.v12.Datatypes.Object.DataObject"
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.GrowingObject.PutGrowingDataObjectsHeader",
  "depends": [
    "Energistics.Etp.v12.Datatypes.Object.DataObject"
  ]
}`);
            public static _protocol = 6;
            public static _messageTypeId = 16;
            public dataObjects = new Map<
              AvroString,
              Energistics.Etp.v12.Datatypes.Object.DataObject
            >();
          }
          export const MsgPutGrowingDataObjectsHeader = 16;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace Store {
          export class GetDataObjectsResponse {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.Store",
  "name": "GetDataObjectsResponse",
  "protocol": "4",
  "messageType": "4",
  "senderRole": "store",
  "protocolRoles": "store,customer",
  "multipartFlag": true,
  "fields": [
    {
      "name": "dataObjects",
      "type": {
        "type": "map",
        "values": "Energistics.Etp.v12.Datatypes.Object.DataObject"
      },
      "default": {}
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.Store.GetDataObjectsResponse",
  "depends": [
    "Energistics.Etp.v12.Datatypes.Object.DataObject"
  ]
}`);
            public static _protocol = 4;
            public static _messageTypeId = 4;
            public dataObjects = new Map<
              AvroString,
              Energistics.Etp.v12.Datatypes.Object.DataObject
            >();
          }
          export const MsgGetDataObjectsResponse = 4;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace Store {
          export class PutDataObjects {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.Store",
  "name": "PutDataObjects",
  "protocol": "4",
  "messageType": "2",
  "senderRole": "customer",
  "protocolRoles": "store,customer",
  "multipartFlag": true,
  "fields": [
    {
      "name": "dataObjects",
      "type": {
        "type": "map",
        "values": "Energistics.Etp.v12.Datatypes.Object.DataObject"
      }
    },
    {
      "name": "pruneContainedObjects",
      "type": "boolean",
      "default": false
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.Store.PutDataObjects",
  "depends": [
    "Energistics.Etp.v12.Datatypes.Object.DataObject"
  ]
}`);
            public static _protocol = 4;
            public static _messageTypeId = 2;
            public dataObjects = new Map<
              AvroString,
              Energistics.Etp.v12.Datatypes.Object.DataObject
            >();
            public pruneContainedObjects = false;
          }
          export const MsgPutDataObjects = 2;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace StoreQuery {
          export class FindDataObjectsResponse {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.StoreQuery",
  "name": "FindDataObjectsResponse",
  "protocol": "14",
  "messageType": "2",
  "senderRole": "store",
  "protocolRoles": "store,customer",
  "multipartFlag": true,
  "fields": [
    {
      "name": "dataObjects",
      "type": {
        "type": "array",
        "items": "Energistics.Etp.v12.Datatypes.Object.DataObject"
      },
      "default": []
    },
    {
      "name": "serverSortOrder",
      "type": "string"
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.StoreQuery.FindDataObjectsResponse",
  "depends": [
    "Energistics.Etp.v12.Datatypes.Object.DataObject"
  ]
}`);
            public static _protocol = 14;
            public static _messageTypeId = 2;
            /** @maxItems 100000 */
            public dataObjects: Energistics.Etp.v12.Datatypes.Object.DataObject[] =
              [];
            public serverSortOrder: AvroString = "";
          }
          export const MsgFindDataObjectsResponse = 2;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Datatypes {
        export namespace Object {
          export class ObjectChange {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Datatypes.Object",
  "name": "ObjectChange",
  "fields": [
    {
      "name": "changeKind",
      "type": "Energistics.Etp.v12.Datatypes.Object.ObjectChangeKind"
    },
    {
      "name": "changeTime",
      "type": "long"
    },
    {
      "name": "dataObject",
      "type": "Energistics.Etp.v12.Datatypes.Object.DataObject"
    }
  ],
  "fullName": "Energistics.Etp.v12.Datatypes.Object.ObjectChange",
  "depends": [
    "Energistics.Etp.v12.Datatypes.Object.ObjectChangeKind",
    "Energistics.Etp.v12.Datatypes.Object.DataObject"
  ]
}`);
            public changeKind: Energistics.Etp.v12.Datatypes.Object.ObjectChangeKind =
              Energistics.Etp.v12.Datatypes.Object.ObjectChangeKind.insert;
            public changeTime: Integer64 = BigInt(0);
            public dataObject: Energistics.Etp.v12.Datatypes.Object.DataObject =
              new Energistics.Etp.v12.Datatypes.Object.DataObject();
          }
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace StoreNotification {
          export class ObjectChanged {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.StoreNotification",
  "name": "ObjectChanged",
  "protocol": "5",
  "messageType": "2",
  "senderRole": "store",
  "protocolRoles": "store,customer",
  "multipartFlag": true,
  "fields": [
    {
      "name": "change",
      "type": "Energistics.Etp.v12.Datatypes.Object.ObjectChange"
    },
    {
      "name": "requestUuid",
      "type": "Energistics.Etp.v12.Datatypes.Uuid"
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.StoreNotification.ObjectChanged",
  "depends": [
    "Energistics.Etp.v12.Datatypes.Object.ObjectChange",
    "Energistics.Etp.v12.Datatypes.Uuid"
  ]
}`);
            public static _protocol = 5;
            public static _messageTypeId = 2;
            public change: Energistics.Etp.v12.Datatypes.Object.ObjectChange =
              new Energistics.Etp.v12.Datatypes.Object.ObjectChange();
            public requestUuid: Energistics.Etp.v12.Datatypes.Uuid = [
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
            ];
          }
          export const MsgObjectChanged = 2;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Datatypes {
        export namespace Object {
          export class SubscriptionInfo {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Datatypes.Object",
  "name": "SubscriptionInfo",
  "fields": [
    {
      "name": "context",
      "type": "Energistics.Etp.v12.Datatypes.Object.ContextInfo"
    },
    {
      "name": "scope",
      "type": "Energistics.Etp.v12.Datatypes.Object.ContextScopeKind"
    },
    {
      "name": "requestUuid",
      "type": "Energistics.Etp.v12.Datatypes.Uuid"
    },
    {
      "name": "includeObjectData",
      "type": "boolean"
    },
    {
      "name": "format",
      "type": "string",
      "default": "xml"
    }
  ],
  "fullName": "Energistics.Etp.v12.Datatypes.Object.SubscriptionInfo",
  "depends": [
    "Energistics.Etp.v12.Datatypes.Object.ContextInfo",
    "Energistics.Etp.v12.Datatypes.Object.ContextScopeKind",
    "Energistics.Etp.v12.Datatypes.Uuid"
  ]
}`);
            public context: Energistics.Etp.v12.Datatypes.Object.ContextInfo =
              new Energistics.Etp.v12.Datatypes.Object.ContextInfo();
            public scope: Energistics.Etp.v12.Datatypes.Object.ContextScopeKind =
              Energistics.Etp.v12.Datatypes.Object.ContextScopeKind.self;
            public requestUuid: Energistics.Etp.v12.Datatypes.Uuid = [
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
            ];
            public includeObjectData = false;
            public format: AvroString = "xml";
          }
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace GrowingObjectNotification {
          export class SubscribePartNotifications {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.GrowingObjectNotification",
  "name": "SubscribePartNotifications",
  "protocol": "7",
  "messageType": "7",
  "senderRole": "customer",
  "protocolRoles": "store,customer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "request",
      "type": {
        "type": "map",
        "values": "Energistics.Etp.v12.Datatypes.Object.SubscriptionInfo"
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.GrowingObjectNotification.SubscribePartNotifications",
  "depends": [
    "Energistics.Etp.v12.Datatypes.Object.SubscriptionInfo"
  ]
}`);
            public static _protocol = 7;
            public static _messageTypeId = 7;
            public request = new Map<
              AvroString,
              Energistics.Etp.v12.Datatypes.Object.SubscriptionInfo
            >();
          }
          export const MsgSubscribePartNotifications = 7;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace GrowingObjectNotification {
          export class UnsolicitedPartNotifications {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.GrowingObjectNotification",
  "name": "UnsolicitedPartNotifications",
  "protocol": "7",
  "messageType": "9",
  "senderRole": "store",
  "protocolRoles": "store,customer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "subscriptions",
      "type": {
        "type": "array",
        "items": "Energistics.Etp.v12.Datatypes.Object.SubscriptionInfo"
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.GrowingObjectNotification.UnsolicitedPartNotifications",
  "depends": [
    "Energistics.Etp.v12.Datatypes.Object.SubscriptionInfo"
  ]
}`);
            public static _protocol = 7;
            public static _messageTypeId = 9;
            /** @maxItems 100000 */
            public subscriptions: Energistics.Etp.v12.Datatypes.Object.SubscriptionInfo[] =
              [];
          }
          export const MsgUnsolicitedPartNotifications = 9;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace StoreNotification {
          export class SubscribeNotifications {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.StoreNotification",
  "name": "SubscribeNotifications",
  "protocol": "5",
  "messageType": "6",
  "senderRole": "customer",
  "protocolRoles": "store,customer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "request",
      "type": {
        "type": "map",
        "values": "Energistics.Etp.v12.Datatypes.Object.SubscriptionInfo"
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.StoreNotification.SubscribeNotifications",
  "depends": [
    "Energistics.Etp.v12.Datatypes.Object.SubscriptionInfo"
  ]
}`);
            public static _protocol = 5;
            public static _messageTypeId = 6;
            public request = new Map<
              AvroString,
              Energistics.Etp.v12.Datatypes.Object.SubscriptionInfo
            >();
          }
          export const MsgSubscribeNotifications = 6;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace StoreNotification {
          export class UnsolicitedStoreNotifications {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.StoreNotification",
  "name": "UnsolicitedStoreNotifications",
  "protocol": "5",
  "messageType": "8",
  "senderRole": "store",
  "protocolRoles": "store,customer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "subscriptions",
      "type": {
        "type": "array",
        "items": "Energistics.Etp.v12.Datatypes.Object.SubscriptionInfo"
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.StoreNotification.UnsolicitedStoreNotifications",
  "depends": [
    "Energistics.Etp.v12.Datatypes.Object.SubscriptionInfo"
  ]
}`);
            public static _protocol = 5;
            public static _messageTypeId = 8;
            /** @maxItems 100000 */
            public subscriptions: Energistics.Etp.v12.Datatypes.Object.SubscriptionInfo[] =
              [];
          }
          export const MsgUnsolicitedStoreNotifications = 8;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Datatypes {
        export namespace Object {
          export class SupportedType {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Datatypes.Object",
  "name": "SupportedType",
  "fields": [
    {
      "name": "dataObjectType",
      "type": "string"
    },
    {
      "name": "objectCount",
      "type": [
        "null",
        "int"
      ]
    },
    {
      "name": "relationshipKind",
      "type": "Energistics.Etp.v12.Datatypes.Object.RelationshipKind"
    }
  ],
  "fullName": "Energistics.Etp.v12.Datatypes.Object.SupportedType",
  "depends": [
    "Energistics.Etp.v12.Datatypes.Object.RelationshipKind"
  ]
}`);
            public dataObjectType: AvroString = "";
            public objectCount: null | Integer32 = null;
            public relationshipKind: Energistics.Etp.v12.Datatypes.Object.RelationshipKind =
              Energistics.Etp.v12.Datatypes.Object.RelationshipKind.Primary;
          }
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace SupportedTypes {
          export class GetSupportedTypesResponse {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.SupportedTypes",
  "name": "GetSupportedTypesResponse",
  "protocol": "25",
  "messageType": "2",
  "senderRole": "store",
  "protocolRoles": "store,customer",
  "multipartFlag": true,
  "fields": [
    {
      "name": "supportedTypes",
      "type": {
        "type": "array",
        "items": "Energistics.Etp.v12.Datatypes.Object.SupportedType"
      },
      "default": []
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.SupportedTypes.GetSupportedTypesResponse",
  "depends": [
    "Energistics.Etp.v12.Datatypes.Object.SupportedType"
  ]
}`);
            public static _protocol = 25;
            public static _messageTypeId = 2;
            /** @maxItems 100000 */
            public supportedTypes: Energistics.Etp.v12.Datatypes.Object.SupportedType[] =
              [];
          }
          export const MsgGetSupportedTypesResponse = 2;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace PrivateProtocols {
        export namespace WitsmlSoap {
          export class WMLS_AddToStore {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.PrivateProtocols.WitsmlSoap",
  "name": "WMLS_AddToStore",
  "protocol": "2100",
  "messageType": "1",
  "senderRole": "customer",
  "protocolRoles": "store,customer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "WMLtypeIn",
      "type": "string"
    },
    {
      "name": "XMLin",
      "type": "string"
    },
    {
      "name": "OptionsIn",
      "type": "string"
    },
    {
      "name": "CapabilitiesIn",
      "type": "string"
    }
  ],
  "fullName": "Energistics.Etp.v12.PrivateProtocols.WitsmlSoap.WMLS_AddToStore",
  "depends": []
}`);
            public static _protocol = 2100;
            public static _messageTypeId = 1;
            public WMLtypeIn: AvroString = "";
            public XMLin: AvroString = "";
            public OptionsIn: AvroString = "";
            public CapabilitiesIn: AvroString = "";
          }
          export const MsgWMLS_AddToStore = 1;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace PrivateProtocols {
        export namespace WitsmlSoap {
          export class WMLS_AddToStoreResponse {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.PrivateProtocols.WitsmlSoap",
  "name": "WMLS_AddToStoreResponse",
  "protocol": "2100",
  "messageType": "2",
  "senderRole": "store",
  "protocolRoles": "store,customer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "Result",
      "type": "int"
    },
    {
      "name": "SuppMsgOut",
      "type": "string"
    }
  ],
  "fullName": "Energistics.Etp.v12.PrivateProtocols.WitsmlSoap.WMLS_AddToStoreResponse",
  "depends": []
}`);
            public static _protocol = 2100;
            public static _messageTypeId = 2;
            public Result: Integer32 = 0;
            public SuppMsgOut: AvroString = "";
          }
          export const MsgWMLS_AddToStoreResponse = 2;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace PrivateProtocols {
        export namespace WitsmlSoap {
          export class WMLS_DeleteFromStore {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.PrivateProtocols.WitsmlSoap",
  "name": "WMLS_DeleteFromStore",
  "protocol": "2100",
  "messageType": "3",
  "senderRole": "customer",
  "protocolRoles": "store,customer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "WMLtypeIn",
      "type": "string"
    },
    {
      "name": "XMLin",
      "type": "string"
    },
    {
      "name": "OptionsIn",
      "type": "string"
    },
    {
      "name": "CapabilitiesIn",
      "type": "string"
    }
  ],
  "fullName": "Energistics.Etp.v12.PrivateProtocols.WitsmlSoap.WMLS_DeleteFromStore",
  "depends": []
}`);
            public static _protocol = 2100;
            public static _messageTypeId = 3;
            public WMLtypeIn: AvroString = "";
            public XMLin: AvroString = "";
            public OptionsIn: AvroString = "";
            public CapabilitiesIn: AvroString = "";
          }
          export const MsgWMLS_DeleteFromStore = 3;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace PrivateProtocols {
        export namespace WitsmlSoap {
          export class WMLS_DeleteFromStoreResponse {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.PrivateProtocols.WitsmlSoap",
  "name": "WMLS_DeleteFromStoreResponse",
  "protocol": "2100",
  "messageType": "4",
  "senderRole": "store",
  "protocolRoles": "store,customer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "Result",
      "type": "int"
    },
    {
      "name": "SuppMsgOut",
      "type": "string"
    }
  ],
  "fullName": "Energistics.Etp.v12.PrivateProtocols.WitsmlSoap.WMLS_DeleteFromStoreResponse",
  "depends": []
}`);
            public static _protocol = 2100;
            public static _messageTypeId = 4;
            public Result: Integer32 = 0;
            public SuppMsgOut: AvroString = "";
          }
          export const MsgWMLS_DeleteFromStoreResponse = 4;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace PrivateProtocols {
        export namespace WitsmlSoap {
          export class WMLS_GetBaseMsg {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.PrivateProtocols.WitsmlSoap",
  "name": "WMLS_GetBaseMsg",
  "protocol": "2100",
  "messageType": "5",
  "senderRole": "customer",
  "protocolRoles": "store,customer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "ReturnValueIn",
      "type": "int"
    }
  ],
  "fullName": "Energistics.Etp.v12.PrivateProtocols.WitsmlSoap.WMLS_GetBaseMsg",
  "depends": []
}`);
            public static _protocol = 2100;
            public static _messageTypeId = 5;
            public ReturnValueIn: Integer32 = 0;
          }
          export const MsgWMLS_GetBaseMsg = 5;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace PrivateProtocols {
        export namespace WitsmlSoap {
          export class WMLS_GetCap {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.PrivateProtocols.WitsmlSoap",
  "name": "WMLS_GetCap",
  "protocol": "2100",
  "messageType": "7",
  "senderRole": "customer",
  "protocolRoles": "store,customer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "OptionsIn",
      "type": "string"
    }
  ],
  "fullName": "Energistics.Etp.v12.PrivateProtocols.WitsmlSoap.WMLS_GetCap",
  "depends": []
}`);
            public static _protocol = 2100;
            public static _messageTypeId = 7;
            public OptionsIn: AvroString = "";
          }
          export const MsgWMLS_GetCap = 7;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace PrivateProtocols {
        export namespace WitsmlSoap {
          export class WMLS_GetBaseMsgResponse {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.PrivateProtocols.WitsmlSoap",
  "name": "WMLS_GetBaseMsgResponse",
  "protocol": "2100",
  "messageType": "6",
  "senderRole": "store",
  "protocolRoles": "store,customer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "Result",
      "type": "string"
    }
  ],
  "fullName": "Energistics.Etp.v12.PrivateProtocols.WitsmlSoap.WMLS_GetBaseMsgResponse",
  "depends": []
}`);
            public static _protocol = 2100;
            public static _messageTypeId = 6;
            public Result: AvroString = "";
          }
          export const MsgWMLS_GetBaseMsgResponse = 6;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace PrivateProtocols {
        export namespace WitsmlSoap {
          export class WMLS_GetFromStore {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.PrivateProtocols.WitsmlSoap",
  "name": "WMLS_GetFromStore",
  "protocol": "2100",
  "messageType": "9",
  "senderRole": "customer",
  "protocolRoles": "store,customer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "WMLtypeIn",
      "type": "string"
    },
    {
      "name": "XMLin",
      "type": "string"
    },
    {
      "name": "OptionsIn",
      "type": "string"
    },
    {
      "name": "CapabilitiesIn",
      "type": "string"
    }
  ],
  "fullName": "Energistics.Etp.v12.PrivateProtocols.WitsmlSoap.WMLS_GetFromStore",
  "depends": []
}`);
            public static _protocol = 2100;
            public static _messageTypeId = 9;
            public WMLtypeIn: AvroString = "";
            public XMLin: AvroString = "";
            public OptionsIn: AvroString = "";
            public CapabilitiesIn: AvroString = "";
          }
          export const MsgWMLS_GetFromStore = 9;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace PrivateProtocols {
        export namespace WitsmlSoap {
          export class WMLS_GetCapResponse {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.PrivateProtocols.WitsmlSoap",
  "name": "WMLS_GetCapResponse",
  "protocol": "2100",
  "messageType": "8",
  "senderRole": "store",
  "protocolRoles": "store,customer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "Result",
      "type": "int"
    },
    {
      "name": "CapabilitiesOut",
      "type": "string"
    },
    {
      "name": "SuppMsgOut",
      "type": "string"
    }
  ],
  "fullName": "Energistics.Etp.v12.PrivateProtocols.WitsmlSoap.WMLS_GetCapResponse",
  "depends": []
}`);
            public static _protocol = 2100;
            public static _messageTypeId = 8;
            public Result: Integer32 = 0;
            public CapabilitiesOut: AvroString = "";
            public SuppMsgOut: AvroString = "";
          }
          export const MsgWMLS_GetCapResponse = 8;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace PrivateProtocols {
        export namespace WitsmlSoap {
          export class WMLS_GetFromStoreResponse {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.PrivateProtocols.WitsmlSoap",
  "name": "WMLS_GetFromStoreResponse",
  "protocol": "2100",
  "messageType": "10",
  "senderRole": "store",
  "protocolRoles": "store,customer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "Result",
      "type": "int"
    },
    {
      "name": "XMLout",
      "type": "string"
    },
    {
      "name": "SuppMsgOut",
      "type": "string"
    }
  ],
  "fullName": "Energistics.Etp.v12.PrivateProtocols.WitsmlSoap.WMLS_GetFromStoreResponse",
  "depends": []
}`);
            public static _protocol = 2100;
            public static _messageTypeId = 10;
            public Result: Integer32 = 0;
            public XMLout: AvroString = "";
            public SuppMsgOut: AvroString = "";
          }
          export const MsgWMLS_GetFromStoreResponse = 10;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace PrivateProtocols {
        export namespace WitsmlSoap {
          export class WMLS_GetVersion {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.PrivateProtocols.WitsmlSoap",
  "name": "WMLS_GetVersion",
  "protocol": "2100",
  "messageType": "11",
  "senderRole": "customer",
  "protocolRoles": "store,customer",
  "multipartFlag": false,
  "fields": [],
  "fullName": "Energistics.Etp.v12.PrivateProtocols.WitsmlSoap.WMLS_GetVersion",
  "depends": []
}`);
            public static _protocol = 2100;
            public static _messageTypeId = 11;
          }
          export const MsgWMLS_GetVersion = 11;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace PrivateProtocols {
        export namespace WitsmlSoap {
          export class WMLS_GetVersionResponse {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.PrivateProtocols.WitsmlSoap",
  "name": "WMLS_GetVersionResponse",
  "protocol": "2100",
  "messageType": "12",
  "senderRole": "store",
  "protocolRoles": "store,customer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "Result",
      "type": "string"
    }
  ],
  "fullName": "Energistics.Etp.v12.PrivateProtocols.WitsmlSoap.WMLS_GetVersionResponse",
  "depends": []
}`);
            public static _protocol = 2100;
            public static _messageTypeId = 12;
            public Result: AvroString = "";
          }
          export const MsgWMLS_GetVersionResponse = 12;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace PrivateProtocols {
        export namespace WitsmlSoap {
          export class WMLS_UpdateInStore {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.PrivateProtocols.WitsmlSoap",
  "name": "WMLS_UpdateInStore",
  "protocol": "2100",
  "messageType": "13",
  "senderRole": "customer",
  "protocolRoles": "store,customer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "WMLtypeIn",
      "type": "string"
    },
    {
      "name": "XMLin",
      "type": "string"
    },
    {
      "name": "OptionsIn",
      "type": "string"
    },
    {
      "name": "CapabilitiesIn",
      "type": "string"
    }
  ],
  "fullName": "Energistics.Etp.v12.PrivateProtocols.WitsmlSoap.WMLS_UpdateInStore",
  "depends": []
}`);
            public static _protocol = 2100;
            public static _messageTypeId = 13;
            public WMLtypeIn: AvroString = "";
            public XMLin: AvroString = "";
            public OptionsIn: AvroString = "";
            public CapabilitiesIn: AvroString = "";
          }
          export const MsgWMLS_UpdateInStore = 13;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace PrivateProtocols {
        export namespace WitsmlSoap {
          export class WMLS_UpdateInStoreResponse {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.PrivateProtocols.WitsmlSoap",
  "name": "WMLS_UpdateInStoreResponse",
  "protocol": "2100",
  "messageType": "14",
  "senderRole": "store",
  "protocolRoles": "store,customer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "Result",
      "type": "int"
    },
    {
      "name": "SuppMsgOut",
      "type": "string"
    }
  ],
  "fullName": "Energistics.Etp.v12.PrivateProtocols.WitsmlSoap.WMLS_UpdateInStoreResponse",
  "depends": []
}`);
            public static _protocol = 2100;
            public static _messageTypeId = 14;
            public Result: Integer32 = 0;
            public SuppMsgOut: AvroString = "";
          }
          export const MsgWMLS_UpdateInStoreResponse = 14;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace DataspaceOSDU {
          export class GetDataspaceInfo {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.DataspaceOSDU",
  "name": "GetDataspaceInfo",
  "protocol": "2424",
  "messageType": "1",
  "senderRole": "customer",
  "protocolRoles": "store,customer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "uris",
      "type": {
        "type": "map",
        "values": "string"
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.DataspaceOSDU.GetDataspaceInfo",
  "depends": []
}`);
            public static _protocol = 2424;
            public static _messageTypeId = 1;
            public uris = new Map<AvroString, AvroString>();
          }
          export const MsgGetDataspaceInfo = 1;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace DataspaceOSDU {
          export class GetDataspaceInfoResponse {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.DataspaceOSDU",
  "name": "GetDataspaceInfoResponse",
  "protocol": "2424",
  "messageType": "2",
  "senderRole": "store",
  "protocolRoles": "store,customer",
  "multipartFlag": true,
  "fields": [
    {
      "name": "dataspaces",
      "type": {
        "type": "map",
        "values": "Energistics.Etp.v12.Datatypes.Object.Dataspace"
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.DataspaceOSDU.GetDataspaceInfoResponse",
  "depends": [
    "Energistics.Etp.v12.Datatypes.Object.Dataspace"
  ]
}`);
            public static _protocol = 2424;
            public static _messageTypeId = 2;
            public dataspaces = new Map<
              AvroString,
              Energistics.Etp.v12.Datatypes.Object.Dataspace
            >();
          }
          export const MsgGetDataspaceInfoResponse = 2;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace DataspaceOSDU {
          export class CopyDataspacesContent {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.DataspaceOSDU",
  "name": "CopyDataspacesContent",
  "protocol": "2424",
  "messageType": "3",
  "senderRole": "customer",
  "protocolRoles": "store,customer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "dataspaces",
      "type": {
        "type": "map",
        "values": "string"
      }
    },
    {
      "name": "targetDataspace",
      "type": "string"
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.DataspaceOSDU.CopyDataspacesContent",
  "depends": []
}`);
            public static _protocol = 2424;
            public static _messageTypeId = 3;
            public dataspaces = new Map<AvroString, AvroString>();
            public targetDataspace: AvroString = "";
          }
          export const MsgCopyDataspacesContent = 3;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace DataspaceOSDU {
          export class CopyDataspacesContentResponse {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.DataspaceOSDU",
  "name": "CopyDataspacesContentResponse",
  "protocol": "2424",
  "messageType": "4",
  "senderRole": "store",
  "protocolRoles": "store,customer",
  "multipartFlag": true,
  "fields": [
    {
      "name": "success",
      "type": {
        "type": "map",
        "values": "string"
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.DataspaceOSDU.CopyDataspacesContentResponse",
  "depends": []
}`);
            public static _protocol = 2424;
            public static _messageTypeId = 4;
            public success = new Map<AvroString, AvroString>();
          }
          export const MsgCopyDataspacesContentResponse = 4;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace DataspaceOSDU {
          export class LockDataspaces {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.DataspaceOSDU",
  "name": "LockDataspaces",
  "protocol": "2424",
  "messageType": "5",
  "senderRole": "customer",
  "protocolRoles": "store,customer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "uris",
      "type": {
        "type": "map",
        "values": "string"
      }
    },
    {
      "name": "lock",
      "type": "boolean"
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.DataspaceOSDU.LockDataspaces",
  "depends": []
}`);
            public static _protocol = 2424;
            public static _messageTypeId = 5;
            public uris = new Map<AvroString, AvroString>();
            public lock = false;
          }
          export const MsgLockDataspaces = 5;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace DataspaceOSDU {
          export class LockDataspacesResponse {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.DataspaceOSDU",
  "name": "LockDataspacesResponse",
  "protocol": "2424",
  "messageType": "6",
  "senderRole": "store",
  "protocolRoles": "store,customer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "success",
      "type": {
        "type": "map",
        "values": "string"
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.DataspaceOSDU.LockDataspacesResponse",
  "depends": []
}`);
            public static _protocol = 2424;
            public static _messageTypeId = 6;
            public success = new Map<AvroString, AvroString>();
          }
          export const MsgLockDataspacesResponse = 6;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace DataspaceOSDU {
          export class CopyToDataspace {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.DataspaceOSDU",
  "name": "CopyToDataspace",
  "protocol": "2424",
  "messageType": "7",
  "senderRole": "customer",
  "protocolRoles": "store,customer",
  "multipartFlag": false,
  "fields": [
    {
      "name": "uris",
      "type": {
        "type": "map",
        "values": "string"
      }
    },
    {
      "name": "dataspaceUri",
      "type": "string"
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.DataspaceOSDU.CopyToDataspace",
  "depends": []
}`);
            public static _protocol = 2424;
            public static _messageTypeId = 7;
            public uris = new Map<AvroString, AvroString>();
            public dataspaceUri: AvroString = "";
          }
          export const MsgCopyToDataspace = 7;
        }
      }
    }
  }
}
export namespace Energistics {
  export namespace Etp {
    export namespace v12 {
      export namespace Protocol {
        export namespace DataspaceOSDU {
          export class CopyToDataspaceResponse {
            public static _schema: any = JSON.parse(`{
  "type": "record",
  "namespace": "Energistics.Etp.v12.Protocol.DataspaceOSDU",
  "name": "CopyToDataspaceResponse",
  "protocol": "2424",
  "messageType": "8",
  "senderRole": "store",
  "protocolRoles": "store,customer",
  "multipartFlag": true,
  "fields": [
    {
      "name": "success",
      "type": {
        "type": "map",
        "values": "string"
      }
    }
  ],
  "fullName": "Energistics.Etp.v12.Protocol.DataspaceOSDU.CopyToDataspaceResponse",
  "depends": []
}`);
            public static _protocol = 2424;
            public static _messageTypeId = 8;
            public success = new Map<AvroString, AvroString>();
          }
          export const MsgCopyToDataspaceResponse = 8;
        }
      }
    }
  }
}
