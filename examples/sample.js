"use strict";

var bcp47 = require ("../lib");

//Eastern Armenian written in Latin script, as used in Italy
console.log (bcp47.parse ("hy-Latn-IT-arevela"));

/*
{
	langtag: {
		language: {
			language: "hy",
			extlang: []
		},
		script: "Latn",
		region: "IT",
		variant: ["arevela"],
		extension: [],
		privateuse: []
	},
	privateuse: [],
	grandfathered: {
		irregular: null,
		regular: null
	}
}
*/