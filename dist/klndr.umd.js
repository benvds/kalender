!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):e.klndr=n()}(this,function(){var e=7;function n(e){return{month:e.getMonth(),year:e.getFullYear()}}function t(n,t){return(e-t+new Date(n.year,n.month,1).getDay())%e}return function(r,o){void 0===r&&(r=new Date);var u=function(n,r){for(var o=-1*t(n,r),u=function(n,r){return function(n,r){return Math.ceil((function(e){return new Date(e.year,e.month+1,0).getDate()}(n)+t(n,r))/e)}(n,r)*e}(n,r),f=new Array(u),a=1;a<=u;a++)f[a-1]=new Date(n.year,n.month,o+a);return f}(function(e){return e instanceof Date?n(e):"object"==typeof e?e:n(new Date(e))}(r),function(e){return"number"==typeof e?e:"object"==typeof e?e.weekStart:0}(o));return u.reduce(function(n,t,r){return n[Math.floor(r/e)][r%e]=t,n},function(n){for(var t=u.length/e,r=[],o=0;o<t;o++)r[o]=new Array(e);return r}())}});
//# sourceMappingURL=klndr.umd.js.map
