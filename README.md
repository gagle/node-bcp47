bcp47
=====

_Node.js project_

#### Parser for the BCP 47 language tag specification ####

Version: 1.1.0

BCP: [47](http://tools.ietf.org/html/bcp47)

#### Installation ####

```
npm install bcp47
```

#### Example ####

```javascript
var bcp47 = require ("bcp47");

//Eastern Armenian written in Latin script, as used in Italy
var tag = "hy-Latn-IT-arevela";

console.log (bcp47.isValid (tag)); //true

console.log (bcp47.parse (tag));

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
```