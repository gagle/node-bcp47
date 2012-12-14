bcp47
=====

_Node.js project_

#### Parser for the BCP 47 language tag specification ####

Version: 1.0.1

#### Installation ####

```
npm install bcp47
```

#### Example ####

```javascript
var bcp47 = require ("bcp47");

//Eastern Armenian written in Latin script, as used in Italy
console.log (bcp47.parse ("hy-Latn-IT-arevela"));

/*
Prints:

{
	language: {
		language: "hy",
		extlang: []
	},
	script: "Latn",
	region: "IT",
	variant: ["arevela"],
	extension: [],
	privateuse: [],
	grandfathered: {
		irregular: null,
		regular: null
	}
}
*/
```