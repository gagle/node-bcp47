"use strict";

var ASSERT = require ("assert");
var bcp47 = require ("../bcp47");

describe ("bcp47", function (){
	it ("langtag and language", function (done){
		//{2,3} alpha
		var tags = bcp47.parse ("aa");
		ASSERT.equal (tags.language.language, "aa");

		//{2,3} alpha
		tags = bcp47.parse ("aaa");
		ASSERT.equal (tags.language.language, "aaa");

		//{4} alpha
		tags = bcp47.parse ("aaaa");
		ASSERT.equal (tags.language.language, "aaaa");

		//{5,8} alpha
		tags = bcp47.parse ("aaaaa");
		ASSERT.equal (tags.language.language, "aaaaa");

		//{5,8} alpha
		tags = bcp47.parse ("aaaaaa");
		ASSERT.equal (tags.language.language, "aaaaaa");

		//{5,8} alpha
		tags = bcp47.parse ("aaaaaaa");
		ASSERT.equal (tags.language.language, "aaaaaaa");

		//{5,8} alpha
		tags = bcp47.parse ("aaaaaaaa");
		ASSERT.equal (tags.language.language, "aaaaaaaa");

		//language with 1 extlang
		tags = bcp47.parse ("aa-bbb");
		ASSERT.equal (tags.language.language, "aa");
		ASSERT.deepEqual (tags.language.extlang, ["bbb"]);

		//language with 2 extlang
		tags = bcp47.parse ("aaa-bbb-ccc");
		ASSERT.equal (tags.language.language, "aaa");
		ASSERT.deepEqual (tags.language.extlang, ["bbb", "ccc"]);

		//language with 3 extlang
		tags = bcp47.parse ("aa-bbb-ccc-ddd");
		ASSERT.equal (tags.language.language, "aa");
		ASSERT.deepEqual (tags.language.extlang, ["bbb", "ccc", "ddd"]);
		
		done ();
	});
	
	it ("langtag and script", function (done){
		var tags = bcp47.parse ("aaaa-bbbb");
		ASSERT.equal (tags.language.language, "aaaa");
		ASSERT.equal (tags.script, "bbbb");
		
		done ();
	});
	
	it ("langtag and region", function (done){
		//{2} alpha
		var tags = bcp47.parse ("aaaa-bb");
		ASSERT.equal (tags.language.language, "aaaa");
		ASSERT.equal (tags.region, "bb");

		//{3} digit
		tags = bcp47.parse ("aaaa-111");
		ASSERT.equal (tags.language.language, "aaaa");
		ASSERT.equal (tags.region, "111");

		//region with script
		tags = bcp47.parse ("aaaa-bbbb-cc");
		ASSERT.equal (tags.language.language, "aaaa");
		ASSERT.equal (tags.script, "bbbb");
		ASSERT.equal (tags.region, "cc");
		
		done ();
	});
	
	it ("langtag and variant", function (done){
		var tags = bcp47.parse ("aaaa-b1b1b");
		ASSERT.equal (tags.language.language, "aaaa");
		ASSERT.deepEqual (tags.variant, ["b1b1b"]);

		tags = bcp47.parse ("aaaa-b1b1b-6a8b-cccccc");
		ASSERT.equal (tags.language.language, "aaaa");
		ASSERT.deepEqual (tags.variant, ["b1b1b", "6a8b", "cccccc"]);

		//2 variant with 2 extlang
		tags = bcp47.parse ("aaa-bbb-ccc-1111-ccccc-b1b1b");
		ASSERT.equal (tags.language.language, "aaa");
		ASSERT.deepEqual (tags.language.extlang, ["bbb", "ccc"]);
		ASSERT.deepEqual (tags.variant, ["1111", "ccccc", "b1b1b"]);
		
		done ();
	});
	
	it ("langtag and extension", function (done){
		var tags = bcp47.parse ("aaa-7-123abc-abc-1-12");
		ASSERT.equal (tags.language.language, "aaa");
		ASSERT.deepEqual (tags.extension,
			[
				{
					singleton: "7",
					extension: ["123abc", "abc"]
				},
				{
					singleton: "1",
					extension: ["12"]
				}
			]
		);
		done ();
	});
	
	it ("langtag and privateuse", function (done){
		var tags = bcp47.parse ("aaa-x-1234ab-d");
		ASSERT.equal (tags.language.language, "aaa");
		ASSERT.deepEqual (tags.privateuse, ["1234ab", "d"]);
		done ();
	});
	
	it ("privateuse", function (done){
		var tags = bcp47.parse ("x-1234ab-d");
		ASSERT.deepEqual (tags.privateuse, ["1234ab", "d"]);
		done ();
	});
	
	it ("grandfathered irregular", function (done){
		var tags = bcp47.parse ("i-bnn");
		ASSERT.equal (tags.grandfathered.irregular, "i-bnn");
		done ();
	});
	
	it ("grandfathered regular", function (done){
		var tags = bcp47.parse ("zh-min");
		ASSERT.equal (tags.grandfathered.regular, "zh-min");
		done ();
	});
	
	it ("langtag all", function (done){
		var tags = bcp47.parse ("aaa-bbb-ccc-ddd-abcd-123-abc123-0abc-b-01-abc123-x-01ab-abc12");
		ASSERT.equal (tags.language.language, "aaa");
		ASSERT.deepEqual (tags.language.extlang, ["bbb", "ccc", "ddd"]);
		ASSERT.equal (tags.script, "abcd");
		ASSERT.equal (tags.region, "123");
		ASSERT.deepEqual (tags.variant, ["abc123", "0abc"]);
		ASSERT.deepEqual (tags.extension,
			[{
				singleton: "b",
				extension: ["01", "abc123"]
			}]
		);
		ASSERT.deepEqual (tags.privateuse, ["01ab", "abc12"]);
		done ();
	});
});
