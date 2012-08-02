var BCP47 = require ("../../build/bcp47");
var assert = require ("assert");

var tags;

//=== langtag & language ===//

//{2,3} alpha
tags = BCP47.parse ("aa");
assert.ok (tags.language.language === "aa");

//{2,3} alpha
tags = BCP47.parse ("aaa");
assert.ok (tags.language.language === "aaa");

//{4} alpha
tags = BCP47.parse ("aaaa");
assert.ok (tags.language.language === "aaaa");

//{5,8} alpha
tags = BCP47.parse ("aaaaa");
assert.ok (tags.language.language === "aaaaa");

//{5,8} alpha
tags = BCP47.parse ("aaaaaa");
assert.ok (tags.language.language === "aaaaaa");

//{5,8} alpha
tags = BCP47.parse ("aaaaaaa");
assert.ok (tags.language.language === "aaaaaaa");

//{5,8} alpha
tags = BCP47.parse ("aaaaaaaa");
assert.ok (tags.language.language === "aaaaaaaa");

//language with 1 extlang
tags = BCP47.parse ("aa-bbb");
assert.ok (tags.language.language === "aa");
assert.deepEqual (tags.language.extlang, ["bbb"]);

//language with 2 extlang
tags = BCP47.parse ("aaa-bbb-ccc");
assert.ok (tags.language.language === "aaa");
assert.deepEqual (tags.language.extlang, ["bbb", "ccc"]);

//language with 3 extlang
tags = BCP47.parse ("aa-bbb-ccc-ddd");
assert.ok (tags.language.language === "aa");
assert.deepEqual (tags.language.extlang, ["bbb", "ccc", "ddd"]);


//=== langtag & script ===//

tags = BCP47.parse ("aaaa-bbbb");
assert.ok (tags.language.language === "aaaa");
assert.ok (tags.script === "bbbb");


//=== langtag & region ===//

//{2} alpha
tags = BCP47.parse ("aaaa-bb");
assert.ok (tags.language.language === "aaaa");
assert.ok (tags.region === "bb");

//{3} digit
tags = BCP47.parse ("aaaa-111");
assert.ok (tags.language.language === "aaaa");
assert.ok (tags.region === "111");

//region with script
tags = BCP47.parse ("aaaa-bbbb-cc");
assert.ok (tags.language.language === "aaaa");
assert.ok (tags.script === "bbbb");
assert.ok (tags.region === "cc");


//=== langtag & variant ===//

tags = BCP47.parse ("aaaa-b1b1b");
assert.ok (tags.language.language === "aaaa");
assert.deepEqual (tags.variant, ["b1b1b"]);

tags = BCP47.parse ("aaaa-b1b1b-6a8b-cccccc");
assert.ok (tags.language.language === "aaaa");
assert.deepEqual (tags.variant, ["b1b1b", "6a8b", "cccccc"]);

//2 variant with 2 extlang
tags = BCP47.parse ("aaa-bbb-ccc-1111-ccccc-b1b1b");
assert.ok (tags.language.language === "aaa");
assert.deepEqual (tags.language.extlang, ["bbb", "ccc"]);
assert.deepEqual (tags.variant, ["1111", "ccccc", "b1b1b"]);


//=== langtag & extension ===//

tags = BCP47.parse ("aaa-7-123abc-abc-1-12");
assert.ok (tags.language.language === "aaa");
assert.deepEqual (tags.extension,
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


//=== langtag & privateuse ===//

tags = BCP47.parse ("aaa-x-1234ab-d");
assert.ok (tags.language.language === "aaa");
assert.deepEqual (tags.privateuse, ["1234ab", "d"]);


//=== privateuse ===//

tags = BCP47.parse ("x-1234ab-d");
assert.deepEqual (tags.privateuse, ["1234ab", "d"]);


//=== grandfathered irregular ===//

tags = BCP47.parse ("i-bnn");
assert.ok (tags.grandfathered.irregular === "i-bnn");

//=== grandfathered regular ===//

tags = BCP47.parse ("zh-min");
assert.ok (tags.grandfathered.regular === "zh-min");


//=== langtag all ===//

tags = BCP47.parse ("aaa-bbb-ccc-ddd-abcd-123-abc123-0abc-b-01-abc123-x-01ab-abc12");
assert.ok (tags.language.language === "aaa");
assert.deepEqual (tags.language.extlang, ["bbb", "ccc", "ddd"]);
assert.ok (tags.script === "abcd");
assert.ok (tags.region === "123");
assert.deepEqual (tags.variant, ["abc123", "0abc"]);
assert.deepEqual (tags.extension,
	[{
		singleton: "b",
		extension: ["01", "abc123"]
	}]
);
assert.deepEqual (tags.privateuse, ["01ab", "abc12"]);