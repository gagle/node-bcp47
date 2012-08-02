/**
 * @name BCP47.
 * @description Parser for the BCP 47 language tag specification for node.js.
 *
 * @author Gabriel Llamas
 * @created 31/07/2012
 * @modified 02/08/2012
 * @version 1.0.0
 */
"use strict";

var BCP47 = {};

BCP47.parse = function (tag){
	var re = /^(?:(en-GB-oed|i-(?:ami|bnn|default|enochian|hak|klingon|lux|mingo|navajo|pwn|tao|tay|tsu)|sgn-(?:BE-FR|BE-NL|CH-DE))|(art-lojban|cel-gaulish|no-(?:bok|nyn)|zh-(?:guoyu|hakka|min|min-nan|xiang)))$|^(x(?:-[0-9a-z]{1,8})+)$|^(?:((?:[a-z]{2,3}(?:(?:-[a-z]{3}){1,3})?)|[a-z]{4}|[a-z]{5,8})(?:-([a-z]{4}))?(?:-([a-z]{2}|[0-9]{3}))?((?:-(?:[a-z0-9]{5,8}|[0-9][a-z0-9]{3}))*)?((?:-[0-9a-wy-z](?:-[a-z0-9]{2,8}){1,})*)?(-x(?:-[0-9a-z]{1,8})+)?)$/i;
	
	/**
	 *	/
	 *	^(?:
	 *		(											irregular
	 *			en-GB-oed |
	 *			i-
	 *			(?:
	 *				ami |
	 *				bnn |
	 *				default |
	 *				enochian |
	 *				hak |
	 *				klingon |
	 *				lux |
	 *				mingo |
	 *				navajo |
	 *				pwn |
	 *				tao |
	 *				tay |
	 *				tsu
	 *			) |
	 *			sgn-
	 *			(?:
	 *				BE-FR |
	 *				BE-NL |
	 *				CH-DE
	 *			)
	 *		) |
	 *		(											regular
	 *			art-lojban |
	 *			cel-gaulish |
	 *			no-
	 *			(?:
	 *				bok |
	 *				nyn
	 *			) |
	 *			zh-
	 *			(?:
	 *				guoyu |
	 *				hakka |
	 *				min |
	 *				min-nan |
	 *				xiang
	 *			)
	 *		)
	 *	)$ |
	 *	^(												privateuse
	 *		x
	 *		(?:
	 *			-[0-9a-z]{1,8}
	 *		)+
	 *	)$ |
	 *	^(?:											langtag
	 *		(											language
	 *			(?:
	 *				[a-z]{2,3}							ISO 639
	 *				(?:									extlang can appear or not
	 *					(?:								if extlang, min 1 subtag, max 3 subtags
	 *						-[a-z]{3}					ISO 639
	 *					){1,3}
	 *				)?
	 *			) |
	 *			[a-z]{4} |								reserved for future use
	 *			[a-z]{5,8}								registered language subtag
	 *		)
	 *		(?:											script
	 *			-
	 *			(
	 *				[a-z]{4}							ISO 15924
	 *			)
	 *		)?
	 *		(?:											region
	 *			-
	 *			(
	 *				[a-z]{2} |							ISO 3166-1
	 *				[0-9]{3}							UN M.49
	 *			)
	 *		)?
	 *		(											variant
	 *			(?:
	 *				-
	 *				(?:									registered variants
	 *					[a-z0-9]{5,8} |
	 *					[0-9][a-z0-9]{3}
	 *				)
	 *			)*
	 *		)?
	 *		(											extension
	 *			(?:
	 *				-
	 *				[0-9a-wy-z]							singleton
	 *				(?:
	 *					-[a-z0-9]{2,8}
	 *				){1,}
	 *			)*
	 *		)?
	 *		(											privateuse
	 *			-x
	 *			(?:
	 *				-[0-9a-z]{1,8}
	 *			)+
	 *		)?
	 *	)$/
	 *	i												case insensitive
	 */
	var match = re.exec (tag);
	if (!match) return null;
	
	var match4 = match[4];
	match4 = match4 ? match4.split ("-") : null;
	var language = null;
	if (match4){
		language = match4.shift ();
	}
	
	var match7 = match[7];
	match7 = match7 ? match7.split ("-") : null;
	if (match7) match7.shift ();
	
	var match9 = match[9];
	match9 = match9 ? match9.split ("-") : null;
	if (match9){
		match9.shift ();
		match9.shift ();
	}
	
	var match3 = match[3];
	match3 = match3 ? match3.split ("-") : null;
	if (match3) match3.shift ();
	
	return {
		language: {
			language: language,
			extlang: match4 || []
		},
		script: match[5] || null,
		region: match[6] || null,
		variant: match7 || null,
		extension: parseExtension (match[8]),
		privateuse: match9 || match3 || [],
		grandfathered: {
			irregular: match[1] || null,
			regular: match[2] || null
		}
	};
};

BCP47.isValid = function (tag){
	return BCP47.parse (tag) !== null;
};

var parseExtension = function (tag){
	if (!tag) return [];

	var extensions = [];
	var e;
	var c;
	var newExtension = false;
	var singleton = false;
	var extension = "";
	var parsingExtension = false;
	
	for (var i=0, len=tag.length; i<len; i++){
		c = tag[i];
		
		if (c === "-" && !newExtension){
			newExtension = true;
			e = {
				singleton: null,
				extension: []
			};
			continue;
		}
		
		if (newExtension && !singleton){
			singleton = true;
			e.singleton = c;
			continue;
		}
		
		if (c === "-"){
			if (!parsingExtension){
				extension = "";
				parsingExtension = true;
			}else{
				if (extension.length === 1){
					parsingExtension = false;
					singleton = false;
					extensions.push (e);
					e = {
						singleton: null,
						extension: []
					};
				}else{
					e.extension.push (extension);
					extension = "";
				}
			}
			continue;
		}
		
		extension += c;
	}
	
	e.extension.push (extension);
	extensions.push (e);
	
	return extensions;
};

module.exports = BCP47;