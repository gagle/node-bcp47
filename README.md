bcp47
=====

#### Parser for the BCP 47 language tag specification ####

[![NPM version](https://badge.fury.io/js/bcp47.png)](http://badge.fury.io/js/bcp47 "Fury Version Badge")
[![Build Status](https://secure.travis-ci.org/gagle/node-bcp47.png)](http://travis-ci.org/gagle/node-bcp47 "Travis CI Badge")

[![NPM installation](https://nodei.co/npm/bcp47.png?mini=true)](https://nodei.co/npm/bcp47 "NodeICO Badge")

BCP: [47](http://tools.ietf.org/html/bcp47)

#### Functions ####

- [_module_.parse(tag) : Object](#parse)

---

<a name="parse"></a>
___module_.parse(tag) : Object__

Parses the language tag and returns an object with all the available information. If the tag is not valid it returns null. Look at the [examples](https://github.com/gagle/node-bcp47/tree/master/examples) folder to see what information returns.