// eslint-disable-next-line @typescript-eslint/no-var-requires
const cxml = require("../../../../../cxml/cxml");

cxml.register(
  cxml.context("resqml22"),
  "xml-primitives",
  exports,
  [],
  ["any", "boolean", "Date", "number", "string"],
  [
    [0, 0, [], []],
    [3, 1, [], []],
    [3, 2, [], []],
    [3, 3, [], []],
    [3, 4, [], []],
    [3, 5, [], []]
  ],
  []
);
