"use strict";

var bcp47 = require ("../lib");
var util = require ("util");

console.log (util.inspect (bcp47.parse ("aa-7-123abc-abc-a-12"),
    { depth: null }));

/*
{
  langtag: {
    language: {
      language: "aa",
      extlang: []
    },
    script: null,
    region: null,
    variant: [],
    extension: [
      {
        singleton: "7",
        extension: ["123abc", "abc"]
      },
      {
        singleton: "a",
        extension: ["12"]
      }
    ],
    privateuse: []
  },
  privateuse: [],
  grandfathered: {
    irregular: null,
    regular: null
  }
}
*/