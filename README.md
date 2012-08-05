<a name="start"></a>

Node BCP47
==========

#### Parser for the BCP 47 language tag specification for node.js. ####

[Show me!](#showme) | [Availability](#availability) | [Compatibility](#compatibility) | [Documentation](#documentation)

Version: 1.0.0

<a name="showme"></a>
#### Show me! [↑](#start) ####

```javascript
var BCP47 = require ("bcp47");

//Eastern Armenian written in Latin script, as used in Italy
console.log (BCP47.parse ("hy-Latn-IT-arevela"));

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

***

<a name="availability"></a>
#### Availability [↑](#start) ####

Via npm:

```
npm install bcp47
```

Or simply copying `build/bcp47.js` into your project's directory and `require()` accordingly.

***

<a name="compatibility"></a>
#### Compatibility [↑](#start) ####

✔ Node *

***

<a name="documentation"></a>
#### Documentation [↑](#start) ####
 
[Reference](https://github.com/Gagle/Node-BCP47/wiki/Reference)  
[Change Log](https://github.com/Gagle/Node-BCP47/wiki/Change-Log)  
[MIT License](https://github.com/Gagle/Node-BCP47/blob/master/LICENSE)