"use strict";

var assert = require ("assert");
var bcp47 = require ("../lib");

var tags;

var tests = {
	"langtag language": function (){
		//{2,3} alpha
		tags = bcp47.parse ("aa");
		assert.strictEqual (tags.langtag.language.language, "aa");
		assert.deepEqual (tags.langtag.language.extlang, []);

		//{2,3} alpha
		tags = bcp47.parse ("aaa");
		assert.strictEqual (tags.langtag.language.language, "aaa");
		assert.deepEqual (tags.langtag.language.extlang, []);

		//{4} alpha
		tags = bcp47.parse ("aaaa");
		assert.strictEqual (tags.langtag.language.language, "aaaa");
		assert.deepEqual (tags.langtag.language.extlang, []);

		//{5,8} alpha
		tags = bcp47.parse ("aaaaa");
		assert.strictEqual (tags.langtag.language.language, "aaaaa");
		assert.deepEqual (tags.langtag.language.extlang, []);

		//{5,8} alpha
		tags = bcp47.parse ("aaaaaa");
		assert.strictEqual (tags.langtag.language.language, "aaaaaa");
		assert.deepEqual (tags.langtag.language.extlang, []);

		//{5,8} alpha
		tags = bcp47.parse ("aaaaaaa");
		assert.strictEqual (tags.langtag.language.language, "aaaaaaa");
		assert.deepEqual (tags.langtag.language.extlang, []);

		//{5,8} alpha
		tags = bcp47.parse ("aaaaaaaa");
		assert.strictEqual (tags.langtag.language.language, "aaaaaaaa");
		assert.deepEqual (tags.langtag.language.extlang, []);

		//language with 1 extlang
		tags = bcp47.parse ("aa-bbb");
		assert.strictEqual (tags.langtag.language.language, "aa");
		assert.deepEqual (tags.langtag.language.extlang, ["bbb"]);

		//language with 2 extlang
		tags = bcp47.parse ("aaa-bbb-ccc");
		assert.strictEqual (tags.langtag.language.language, "aaa");
		assert.deepEqual (tags.langtag.language.extlang, ["bbb", "ccc"]);

		//language with 3 extlang
		tags = bcp47.parse ("aa-bbb-ccc-ddd");
		assert.strictEqual (tags.langtag.language.language, "aa");
		assert.deepEqual (tags.langtag.language.extlang, ["bbb", "ccc", "ddd"]);
	},
	"langtag script": function (){
		tags = bcp47.parse ("aa-bbbb");
		assert.strictEqual (tags.langtag.language.language, "aa");
		assert.strictEqual (tags.langtag.script, "bbbb");
	},
	"langtag region": function (){
		//{2} alpha
		tags = bcp47.parse ("aa-bb");
		assert.strictEqual (tags.langtag.language.language, "aa");
		assert.strictEqual (tags.langtag.region, "bb");

		//{3} digit
		tags = bcp47.parse ("aa-111");
		assert.strictEqual (tags.langtag.language.language, "aa");
		assert.strictEqual (tags.langtag.region, "111");

		//region with script
		tags = bcp47.parse ("aa-bbbb-cc");
		assert.strictEqual (tags.langtag.language.language, "aa");
		assert.strictEqual (tags.langtag.script, "bbbb");
		assert.strictEqual (tags.langtag.region, "cc");
	},
	"langtag variant": function (){
		tags = bcp47.parse ("aa-b1b1b");
		assert.strictEqual (tags.langtag.language.language, "aa");
		assert.deepEqual (tags.langtag.variant, ["b1b1b"]);

		tags = bcp47.parse ("aa-b1b1b-6a8b-cccccc");
		assert.strictEqual (tags.langtag.language.language, "aa");
		assert.deepEqual (tags.langtag.variant, ["b1b1b", "6a8b", "cccccc"]);

		//2 extlang with 3 variant
		tags = bcp47.parse ("aa-bbb-ccc-1111-ccccc-b1b1b");
		assert.strictEqual (tags.langtag.language.language, "aa");
		assert.deepEqual (tags.langtag.language.extlang, ["bbb", "ccc"]);
		assert.deepEqual (tags.langtag.variant, ["1111", "ccccc", "b1b1b"]);
	},
	"langtag extension": function (){
		tags = bcp47.parse ("aa-7-123abc-abc-a-12");
		assert.strictEqual (tags.langtag.language.language, "aa");
		assert.strictEqual (tags.langtag.language.language, "aa");
		assert.deepEqual (tags.langtag.extension,
			[
				{
					singleton: "7",
					extension: ["123abc", "abc"]
				},
				{
					singleton: "a",
					extension: ["12"]
				}
			]
		);
	},
	"langtag privateuse": function (){
		tags = bcp47.parse ("aa-x-1234ab-d");
		assert.strictEqual (tags.langtag.language.language, "aa");
		assert.deepEqual (tags.langtag.privateuse, ["1234ab", "d"]);
	},
	"langtag all": function (){
		tags = bcp47.parse ("aaa-bbb-ccc-ddd-abcd-123-abc123-0abc-b-01-" +
				"abc123-x-01ab-abc12");
		assert.strictEqual (tags.langtag.language.language, "aaa");
		assert.deepEqual (tags.langtag.language.extlang, ["bbb", "ccc", "ddd"]);
		assert.strictEqual (tags.langtag.script, "abcd");
		assert.strictEqual (tags.langtag.region, "123");
		assert.deepEqual (tags.langtag.variant, ["abc123", "0abc"]);
		assert.deepEqual (tags.langtag.extension,
			[{
				singleton: "b",
				extension: ["01", "abc123"]
			}]
		);
		assert.deepEqual (tags.langtag.privateuse, ["01ab", "abc12"]);
	},
	"privateuse": function (){
		var arr = ["x-111-aaaaa-BBB", "x-a", "x-1-2-a-b"];
		var res = [["111", "aaaaa", "BBB"], ["a"], ["1", "2", "a", "b"]];
		for (var i=0, ii=arr.length; i<ii; i++){
			assert.deepEqual (bcp47.parse (arr[i]).privateuse, res[i]);
		}
	},
	"grandfathered irregular": function (){
		var arr = ["en-GB-oed", "i-ami", "i-bnn", "i-default", "i-enochian",
				"i-hak", "i-klingon", "i-lux", "i-mingo", "i-navajo", "i-pwn",
				"i-tao", "i-tay", "i-tsu", "sgn-BE-FR", "sgn-BE-NL", "sgn-CH-DE"];
		arr.forEach (function (e){
			assert.strictEqual (bcp47.parse (e).grandfathered.irregular, e);
		});
	},
	"grandfathered regular": function (){
		var arr = ["art-lojban", "cel-gaulish", "no-bok", "no-nyn", "zh-guoyu",
				"zh-hakka", "zh-min", "zh-min-nan", "zh-xiang"];
		arr.forEach (function (e){
			assert.strictEqual (bcp47.parse (e).grandfathered.regular, e);
		});
	}
};

for (var test in tests){
	tests[test] ();
}