"use strict";var BCP47={};BCP47.parse=function(e){var t=/^(?:(en-GB-oed|i-(?:ami|bnn|default|enochian|hak|klingon|lux|mingo|navajo|pwn|tao|tay|tsu)|sgn-(?:BE-FR|BE-NL|CH-DE))|(art-lojban|cel-gaulish|no-(?:bok|nyn)|zh-(?:guoyu|hakka|min|min-nan|xiang)))$|^(x(?:-[0-9a-z]{1,8})+)$|^(?:((?:[a-z]{2,3}(?:(?:-[a-z]{3}){1,3})?)|[a-z]{4}|[a-z]{5,8})(?:-([a-z]{4}))?(?:-([a-z]{2}|[0-9]{3}))?((?:-(?:[a-z0-9]{5,8}|[0-9][a-z0-9]{3}))*)?((?:-[0-9a-wy-z](?:-[a-z0-9]{2,8}){1,})*)?(-x(?:-[0-9a-z]{1,8})+)?)$/i,n=t.exec(e);if(!n)return null;var r=n[4];r=r?r.split("-"):null;var i=null;r&&(i=r.shift());var s=n[7];s=s?s.split("-"):null,s&&s.shift();var o=n[9];o=o?o.split("-"):null,o&&(o.shift(),o.shift());var u=n[3];return u=u?u.split("-"):null,u&&u.shift(),{language:{language:i,extlang:r},script:n[5]||null,region:n[6]||null,variant:s||null,extension:parseExtension(n[8]),privateuse:o||u,grandfathered:{irregular:n[1]||null,regular:n[2]||null}}},BCP47.isValid=function(e){return BCP47.parse(e)!==null};var parseExtension=function(e){if(!e)return null;var t=[],n,r,i=!1,s=!1,o="",u=!1;for(var a=0,f=e.length;a<f;a++){r=e[a];if(r==="-"&&!i){i=!0,n={singleton:null,extension:[]};continue}if(i&&!s){s=!0,n.singleton=r;continue}if(r==="-"){u?o.length===1?(u=!1,s=!1,t.push(n),n={singleton:null,extension:[]}):(n.extension.push(o),o=""):(o="",u=!0);continue}o+=r}return n.extension.push(o),t.push(n),t};module.exports=BCP47;