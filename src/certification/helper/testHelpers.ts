import { expect } from "@jest/globals";
import { Energistics } from "../../lib/common/Etp12";

import ErrorInfo = Energistics.Etp.v12.Datatypes.ErrorInfo;
import ProtocolException = Energistics.Etp.v12.Protocol.Core.ProtocolException;
import StoreProtocol = Energistics.Etp.v12.Datatypes.Protocol.Store;
import MsgProtocolExceptionTypeId = Energistics.Etp.v12.Protocol.Core.MsgProtocolException;
import { ErrorCode } from "../../lib/common/EtpTypes";


export function verifyProtocolExceptionResponse(response: any): void {
  verifyMessage(response, new ProtocolException(), MsgProtocolExceptionTypeId);
}

export function verifyErrorMessage(response: any, uriKey: string, expectedErrorCode: ErrorCode): void {
  expect(Object.keys(response.body.errors.get(uriKey))).toEqual(Object.keys(new ErrorInfo()));
  expect(response.body.errors.get(uriKey).code).toBe(expectedErrorCode);
}

export function verifyTotalErrors(response: any, expectedNumberOfErrors: number): void {
  expect(response.body.errors.size).toBe(expectedNumberOfErrors);
}

export function verifyMessage(response: any, messageObj: any, messageTypeId: number): void {
  expect(response).toBeDefined();
  expect(Object.is(typeof response, "object")).toBeTruthy();
  expect(Object.keys(response.body)).toEqual(Object.keys(messageObj));
  expect(response.header.protocol).toBe(StoreProtocol.valueOf());
  expect(response.header.messageType).toBe(messageTypeId);
}