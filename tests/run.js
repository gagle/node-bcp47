"use strict";

var Runner = require ("mocha-runner");

new Runner ({
	tests: ["bcp47.js"]
}).run (function (error){
	if (error) console.log (error);
});