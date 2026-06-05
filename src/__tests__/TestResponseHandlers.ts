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

import "jest";
import { Energistics } from "../lib/common/Etp12";
import { MessageFlags } from "../lib/common/EtpTypes";

import {
  ArrayResponseHandler,
  MapResponseHandler,
  SingleResponseHandler,
  SuccessMapResponseHandler,
  Timer
} from "../lib/common/ResponseHandlers";

jest.setTimeout(30000);

describe("Timer", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  it("Normal 3s", () => {
    let called = false;
    const timer = new Timer(() => { called = true; }, 3000);
    expect(timer.finished).toBeFalsy();
    expect(called).toBe(false);
    jest.advanceTimersByTime(3000);
    expect(called).toBe(true);
  });

  it("Add 2s", () => {
    let called = false;
    const timer = new Timer(() => { called = true; }, 3000);
    timer.add(2000); // total ~5s
    jest.advanceTimersByTime(3000);
    expect(called).toBe(false);
    jest.advanceTimersByTime(2000);
    expect(called).toBe(true);
  });

  it("Add minimum 2s after 2s", () => {
    let called = false;
    const timer = new Timer(() => { called = true; }, 3000);
    jest.advanceTimersByTime(2000);
    timer.noTimeoutBefore(2000); // at t=2s, ensure at least 2s more => fires at t=4s
    jest.advanceTimersByTime(1500);
    expect(called).toBe(false);
    jest.advanceTimersByTime(1000);
    expect(called).toBe(true);
  });

  it("Add maximum 1s after 1s", () => {
    let called = false;
    const timer = new Timer(() => { called = true; }, 3000);
    jest.advanceTimersByTime(1000);
    timer.alwaysTimeoutBefore(1000); // at t=1s, cap at 1s more => fires at t=2s
    jest.advanceTimersByTime(500);
    expect(called).toBe(false);
    jest.advanceTimersByTime(600);
    expect(called).toBe(true);
  });

  it("Reset", () => {
    let called = false;
    const timer = new Timer(() => { called = true; }, 3000);
    jest.advanceTimersByTime(1000);
    timer.reset(); // reset after 1s => fires at t=4s (1+3)
    jest.advanceTimersByTime(2500);
    expect(called).toBe(false);
    jest.advanceTimersByTime(1000);
    expect(called).toBe(true);
  });

  it("Cancel", () => {
    let called = false;
    const timer = new Timer(() => { called = true; }, 3000);
    timer.cancel(true);
    expect(called).toBe(true);
    expect(timer.finished).toBe(true);
  });
});

const finalHeader: Energistics.Etp.v12.Datatypes.MessageHeader =
  new Energistics.Etp.v12.Datatypes.MessageHeader();
finalHeader.messageFlags = MessageFlags.FINALPART;
const intermediateHeader: Energistics.Etp.v12.Datatypes.MessageHeader =
  new Energistics.Etp.v12.Datatypes.MessageHeader();

describe("Single Handler", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  it(`On Valid Response`, async () => {
    const handler = new SingleResponseHandler<boolean>(1000);
    const promise = handler.waitForRequest(BigInt(0));
    handler.onResponse(finalHeader, true);
    const value = await promise;
    expect(value).toStrictEqual(true);
  });

  it(`On Error`, async () => {
    const handler = new SingleResponseHandler<boolean>(1000);
    const promise = handler.waitForRequest(BigInt(0));
    handler.onError(finalHeader, null);
    await expect(promise).rejects.toBeTruthy();
  });

  it(`Time Out`, async () => {
    const handler = new SingleResponseHandler<boolean>(1000);
    const promise = handler.waitForRequest(BigInt(0));
    jest.advanceTimersByTime(1100);
    await expect(promise).rejects.toBeTruthy();
  });

  it(`Time Out delayed by intermediate message`, async () => {
    const handler = new SingleResponseHandler<boolean>(2000, 1000);
    const promise = handler.waitForRequest(BigInt(0));
    handler.onResponse(intermediateHeader, true);
    jest.advanceTimersByTime(1100);
    await expect(promise).rejects.toBeTruthy();
  });
});

describe("Array Handler", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  it(`On Valid Response`, async () => {
    const handler = new ArrayResponseHandler<boolean>(1000);
    const promise = handler.waitForRequest(BigInt(0));
    handler.onResponse(finalHeader, [true, false]);
    const value = await promise;
    expect(value).toStrictEqual([true, false]);
  });

  it(`On Error`, async () => {
    const handler = new ArrayResponseHandler<boolean>(1000);
    const promise = handler.waitForRequest(BigInt(0));
    handler.onException(finalHeader, {
      error: { message: "error", code: 0 },
      errors: new Map()
    });
    await expect(promise).rejects.toBeTruthy();
  });

  it(`Time Out`, async () => {
    const handler = new ArrayResponseHandler<boolean>(1000);
    const promise = handler.waitForRequest(BigInt(0));
    jest.advanceTimersByTime(1100);
    await expect(promise).rejects.toBeTruthy();
  });

  it(`Time Out delayed by intermediate message`, async () => {
    const handler = new ArrayResponseHandler<boolean>(2000, 1000);
    const promise = handler.waitForRequest(BigInt(0));
    handler.onResponse(intermediateHeader, [true]);
    jest.advanceTimersByTime(1100);
    await expect(promise).rejects.toBeTruthy();
  });
});

describe("Map Handler", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  it(`On Valid Response`, async () => {
    const handler = new MapResponseHandler<boolean>(10000000);
    const keys = ["key1", "key2"];
    const promise = handler.waitForRequest(BigInt(0), keys);
    const map = new Map<string, boolean>();
    map.set("key1", true);
    map.set("key2", false);
    handler.onResponse(finalHeader, map);
    const value = await promise;
    expect(value).toStrictEqual([true, false]);
  });

  it(`On Error`, async () => {
    const handler = new MapResponseHandler<boolean>(1000);
    const keys = ["key1", "key2"];
    const promise = handler.waitForRequest(BigInt(0), keys);
    handler.onException(finalHeader, {
      error: { message: "error", code: 0 },
      errors: new Map()
    });
    await expect(promise).rejects.toBeTruthy();
  });

  it(`Time Out`, async () => {
    const handler = new MapResponseHandler<boolean>(1000);
    const keys = ["key1", "key2"];
    const promise = handler.waitForRequest(BigInt(0), keys);
    jest.advanceTimersByTime(1100);
    await expect(promise).rejects.toBeTruthy();
  });

  it(`Time Out delayed by intermediate message`, async () => {
    const handler = new MapResponseHandler<boolean>(2000, 1000);
    const keys = ["key1", "key2"];
    const promise = handler.waitForRequest(BigInt(0), keys);
    const map = new Map<string, boolean>();
    map.set("key1", true);
    handler.onResponse(intermediateHeader, map);
    jest.advanceTimersByTime(1100);
    await expect(promise).rejects.toBeTruthy();
  });
});

describe("Success Map Handler", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  it(`On Valid Response`, async () => {
    const handler = new SuccessMapResponseHandler(10000000);
    const keys = ["key1", "key2"];
    const promise = handler.waitForRequest(BigInt(0), keys);
    const map = new Map<string, string>();
    map.set("key1", "");
    map.set("key2", "");
    handler.onResponse(finalHeader, map);
    const value = await promise;
    expect(value[0].code).toStrictEqual(0);
    expect(value[1].code).toStrictEqual(0);
  });

  it(`On Error`, async () => {
    const handler = new SuccessMapResponseHandler(1000);
    const keys = ["key1", "key2"];
    const promise = handler.waitForRequest(BigInt(0), keys);
    handler.onException(finalHeader, {
      error: { message: "error", code: 0 },
      errors: new Map()
    });
    await expect(promise).rejects.toBeTruthy();
  });

  it(`Time Out`, async () => {
    const handler = new SuccessMapResponseHandler(1000);
    const keys = ["key1", "key2"];
    const promise = handler.waitForRequest(BigInt(0), keys);
    jest.advanceTimersByTime(1100);
    await expect(promise).rejects.toBeTruthy();
  });

  it(`Time Out delayed by intermediate message`, async () => {
    const handler = new SuccessMapResponseHandler(2000, 1000);
    const keys = ["key1", "key2"];
    const promise = handler.waitForRequest(BigInt(0), keys);
    const map = new Map<string, string>();
    map.set("key1", "");
    handler.onResponse(intermediateHeader, map);
    jest.advanceTimersByTime(1100);
    await expect(promise).rejects.toBeTruthy();
  });
});
