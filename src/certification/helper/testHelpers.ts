import { expect } from "@jest/globals";
import { Energistics } from "../../lib/common/Etp12";

import ErrorInfo = Energistics.Etp.v12.Datatypes.ErrorInfo;
import ProtocolException = Energistics.Etp.v12.Protocol.Core.ProtocolException;
import StoreProtocol = Energistics.Etp.v12.Datatypes.Protocol.Store;
import MsgProtocolExceptionTypeId = Energistics.Etp.v12.Protocol.Core.MsgProtocolException;
import { ErrorCode } from "../../lib/common/EtpTypes";
import { Well, Wellbore } from "../../lib/mlTypes/xmlns/www.energistics.org/energyml/witsmlv21/witsmlv2";
import { DataObjectFactory } from "./DataObjectFactory";

const wellVersion = 2.1;
const wellName = 'NO 15/9-F-1 C';
const wellboreName = 'NO 15/9-F-1';
const wellCountry = 'Norway';
const wellField = 'VOLVE';
const wellBlock = 'PL046B';
const wellStatus = 'inactive';
const wellTimeZone = '+02:00';
const wellRegion = 'Offshore';
const wellboreStatus = 'inactive';
const wellboreMdBitDepth = {
  "#text": 0,
  "uom": "m"
};
const wellboreTvdBitDepth = {
  "#text": 0,
  "uom": "m"
};
const wellboreMdKickoffDepth = {
  "#text": 16000,
  "uom": "m"
};
const wellboreTvdKickoffData = {
  "#text": -999.25,
  "uom": "m"
};

export function verifyProtocolExceptionResponse(response: any): void {
  verifyMessage(response, new ProtocolException(), MsgProtocolExceptionTypeId);
}

export function verifyErrorMessage(
  response: any,
  uriKey: string,
  expectedErrorCode: ErrorCode
): void {
  expect(Object.keys(response.body.errors.get(uriKey))).toEqual(
    Object.keys(new ErrorInfo())
  );
  expect(response.body.errors.get(uriKey).code).toBe(expectedErrorCode);
}

export function verifyTotalErrors(
  response: any,
  expectedNumberOfErrors: number
): void {
  expect(response.body.errors.size).toBe(expectedNumberOfErrors);
}

export function verifyMessage(
  response: any,
  messageObj: any,
  messageTypeId: number
): void {
  expect(response).toBeDefined();
  expect(Object.is(typeof response, "object")).toBeTruthy();
  expect(Object.keys(response.body)).toEqual(Object.keys(messageObj));
  expect(response.header.protocol).toBe(StoreProtocol.valueOf());
  expect(response.header.messageType).toBe(messageTypeId);
}

export function verifyGetStoreResponseContent(response: any, wellRef: any, expectedWellUuid: any,
                                              wellboreRef: any, expectedWellboreUuid: any): void {
  const successResponses = response.body.dataObjects;
  expect(successResponses.size).toBe(2);
  const wellResponse = successResponses.get(wellRef);
  const wellboreResponse = successResponses.get(wellboreRef);
  expect(wellResponse.resource.name).toBe(wellName);
  expect(wellboreResponse.resource.name).toBe(wellboreName);

  const well: Well = DataObjectFactory.parseXml(wellResponse.data).Well;
  const wellbore: Wellbore = DataObjectFactory.parseXml(wellboreResponse.data).Wellbore;
  verifyVolveData(well, expectedWellUuid, wellbore, expectedWellboreUuid);
}

function verifyVolveData(well: Well, expectedWellUuid: any, wellbore: Wellbore, expectedWellboreUuid: any) : void {
  verifyWellData(well, expectedWellUuid);
  verifyWellboreData(wellbore,expectedWellboreUuid, expectedWellUuid);
}

function verifyWellData(well: Well, expectedWellUuid: any) : void {
  expect(well.uuid).toBe(expectedWellUuid);
  expect(well.Citation.Title).toBe(wellName);
  expect(well.Country).toBe(wellCountry);
  expect(well.Field).toBe(wellField);
  expect(well.Block).toBe(wellBlock);
  expect(well.ActiveStatus).toBe(wellStatus);
  expect(well.TimeZone).toBe(wellTimeZone);
  expect(well.Region).toBe(wellRegion);
}

function verifyWellboreData(wellbore: Wellbore, expectedWellboreUuid: any, expectedWellUuid: any) : void {
  expect(wellbore.uuid).toBe(expectedWellboreUuid);
  expect(wellbore.Citation.Title).toBe(wellboreName);
  expect(wellbore.Well.Uuid).toBe(expectedWellUuid);
  expect(wellbore.Well.Title).toBe(wellName);
  expect(wellbore.Well.ObjectVersion).toBe(wellVersion);
  expect(wellbore.ActiveStatus).toBe(wellboreStatus);
  expect(wellbore.MdBit?.MeasuredDepth).toEqual(wellboreMdBitDepth);
  expect(wellbore.TvdBit?.VerticalDepth).toEqual(wellboreTvdBitDepth);
  expect(wellbore.MdKickoff?.MeasuredDepth).toEqual(wellboreMdKickoffDepth);
  expect(wellbore.TvdKickoff?.VerticalDepth).toEqual(wellboreTvdKickoffData);
}