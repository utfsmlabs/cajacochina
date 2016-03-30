/* Riot v2.3.17, @license MIT */
!function(e,t){"use strict";function n(e,t,n){var r={};return r[e.key]=t,e.pos&&(r[e.pos]=n),r}function r(e,t){for(var n,r=t.length,o=e.length;r>o;)n=t[--r],t.splice(r,1),n.unmount()}function o(e,t){Object.keys(e.tags).forEach(function(n){var r=e.tags[n];R(r)?g(r,function(e){S(e,n,t)}):S(r,n,t)})}function i(e,t,n){var r,o=e._root;for(e._virts=[];o;)r=o.nextSibling,n?t.insertBefore(o,n._root):t.appendChild(o),e._virts.push(o),o=r}function a(e,t,n,r){for(var o,i=e._root,a=0;r>a;a++)o=i.nextSibling,t.insertBefore(i,n._root),i=o}function u(e,t,u){v(e,"each");var s,c=typeof y(e,"no-reorder")!==W||v(e,"no-reorder"),l=L(e),p=G[l]||{tmpl:e.outerHTML},d=ne.test(l),g=e.parentNode,h=document.createTextNode(""),m=w(e),b="option"===l.toLowerCase(),x=[],_=[],S="VIRTUAL"==e.tagName;u=ae.loopKeys(u),g.insertBefore(h,e),t.one("before-mount",function(){e.parentNode.removeChild(e),g.stub&&(g=t.root)}).on("update",function(){var v=ae(u.val,t),y=document.createDocumentFragment();R(v)||(s=v||!1,v=s?Object.keys(v).map(function(e){return n(u,e,v[e])}):[]);for(var w=0,C=v.length;C>w;w++){var E=v[w],L=c&&E instanceof Object&&!s,O=_.indexOf(E),j=~O&&L?O:w,T=x[j];E=!s&&u.key?n(u,E,w):E,!L&&!T||L&&!~O||!T?(T=new f(p,{parent:t,isLoop:!0,hasImpl:!!G[l],root:d?g:e.cloneNode(),item:E},e.innerHTML),T.mount(),S&&(T._root=T.root.firstChild),w!=x.length&&x[w]?(S?i(T,g,x[w]):g.insertBefore(T.root,x[w].root),_.splice(w,0,E)):S?i(T,y):y.appendChild(T.root),x.splice(w,0,T),j=w):T.update(E,!0),j!==w&&L&&x[w]&&(S?a(T,g,x[w],e.childNodes.length):g.insertBefore(T.root,x[w].root),u.pos&&(T[u.pos]=w),x.splice(w,0,x.splice(j,1)[0]),_.splice(w,0,_.splice(j,1)[0]),!m&&T.tags&&o(T,w)),T._item=E,N(T,"_parent",t)}if(r(v,x),b){if(g.appendChild(y),g.length){var M,I=g.options;for(g.selectedIndex=M=-1,w=0;w<I.length;w++)(I[w].selected=I[w].__selected)&&0>M&&(g.selectedIndex=M=w)}}else g.insertBefore(y,h);m&&(t.tags[l]=x),_=v.slice()})}function s(e,t,n,r){I(e,function(e){if(1==e.nodeType){if(e.isLoop=e.isLoop||e.parentNode&&e.parentNode.isLoop||y(e,"each")?1:0,n){var o=w(e);o&&!e.isLoop&&n.push(C(o,{root:e,parent:t},e.innerHTML,t))}e.isLoop&&!r||P(e,t,[])}})}function c(e,t,n){function r(e,t,r){ae.hasExpr(t)&&n.push(O({dom:e,expr:t},r))}I(e,function(e){var n,o=e.nodeType;return 3==o&&"STYLE"!=e.parentNode.tagName&&r(e,e.nodeValue),1==o?(n=y(e,"each"))?(u(e,t,n),!1):(g(e.attributes,function(t){var n=t.name,o=n.split("__")[1];return r(e,t.value,{attr:o||n,bool:o}),o?(v(e,n),!1):void 0}),w(e)?!1:void 0):void 0})}function f(e,n,r){function o(){var e=S&&_?p:w||p;g(k.attributes,function(t){var n=t.value;y[b(t.name)]=ae.hasExpr(n)?ae(n,e):n}),g(Object.keys(F),function(t){y[b(t)]=ae(F[t],e)})}function i(e){for(var t in C)typeof p[t]!==ee&&T(p,t)&&(p[t]=e[t])}function a(){p.parent&&_&&g(Object.keys(p.parent),function(e){var t=!j(re,e)&&j(K,e);(typeof p[e]===ee||t)&&(t||K.push(e),p[e]=p.parent[e])})}function u(e){p.update(e,!0)}function f(e){if(g(I,function(t){t[e?"mount":"unmount"]()}),w){var t=e?"on":"off";_?w[t]("unmount",p.unmount):w[t]("update",u)[t]("unmount",p.unmount)}}var l,p=z.observable(this),y=B(n.opts)||{},w=n.parent,_=n.isLoop,S=n.hasImpl,C=M(n.item),L=[],I=[],k=n.root,H=k.tagName.toLowerCase(),F={},K=[];e.name&&k._tag&&k._tag.unmount(!0),this.isMounted=!1,k.isLoop=_,k._tag=this,N(this,"_riot_id",++U),O(this,{parent:w,root:k,opts:y,tags:{}},C),g(k.attributes,function(e){var t=e.value;ae.hasExpr(t)&&(F[e.name]=t)}),l=ue(e.tmpl,r),N(this,"update",function(e,t){return e=M(e),a(),e&&m(C)&&(i(e),C=e),O(p,e),o(),p.trigger("update",e),d(L,p),t&&p.parent?p.parent.one("updated",function(){p.trigger("updated")}):ce(function(){p.trigger("updated")}),this}),N(this,"mixin",function(){return g(arguments,function(e){var t;e=typeof e===W?z.mixin(e):e,h(e)?(t=new e,e=e.prototype):t=e,g(Object.getOwnPropertyNames(e),function(e){"init"!=e&&(p[e]=h(t[e])?t[e].bind(p):t[e])}),t.init&&t.init.bind(p)()}),this}),N(this,"mount",function(){o();var t=z.mixin(Q);if(t&&p.mixin(t),e.fn&&e.fn.call(p,y),c(l,p,L),f(!0),e.attrs&&A(e.attrs,function(e,t){x(k,e,t)}),(e.attrs||S)&&c(p.root,p,L),p.parent&&!_||p.update(C),p.trigger("before-mount"),_&&!S)k=l.firstChild;else{for(;l.firstChild;)k.appendChild(l.firstChild);k.stub&&(k=w.root)}N(p,"root",k),_&&s(p.root,p.parent,null,!0),!p.parent||p.parent.isMounted?(p.isMounted=!0,p.trigger("mount")):p.parent.one("mount",function(){$(p.root)||(p.parent.isMounted=p.isMounted=!0,p.trigger("mount"))})}),N(this,"unmount",function(e){var n,r=k,o=r.parentNode,i=V.indexOf(p);if(p.trigger("before-unmount"),~i&&V.splice(i,1),this._virts&&g(this._virts,function(e){e.parentNode&&e.parentNode.removeChild(e)}),o){if(w)n=E(w),R(n.tags[H])?g(n.tags[H],function(e,t){e._riot_id==p._riot_id&&n.tags[H].splice(t,1)}):n.tags[H]=t;else for(;r.firstChild;)r.removeChild(r.firstChild);e?v(o,"riot-tag"):o.removeChild(r)}p.trigger("unmount"),f(),p.off("*"),p.isMounted=!1,delete k._tag}),s(l,this,I)}function l(t,n,r,o){r[t]=function(t){var i,a=o._parent,u=o._item;if(!u)for(;a&&!u;)u=a._item,a=a._parent;t=t||e.event,T(t,"currentTarget")&&(t.currentTarget=r),T(t,"target")&&(t.target=t.srcElement),T(t,"which")&&(t.which=t.charCode||t.keyCode),t.item=u,n.call(o,t)===!0||/radio|check/.test(r.type)||(t.preventDefault&&t.preventDefault(),t.returnValue=!1),t.preventUpdate||(i=u?E(a):o,i.update())}}function p(e,t,n){e&&(e.insertBefore(n,t),e.removeChild(t))}function d(e,t){g(e,function(e,n){var r=e.dom,o=e.attr,i=ae(e.expr,t),a=e.dom.parentNode;if(e.bool?(i=!!i,"selected"===o&&(r.__selected=i)):null==i&&(i=""),e.value!==i){if(e.value=i,!o)return i+="",void(a&&("TEXTAREA"===a.tagName?(a.value=i,oe||(r.nodeValue=i)):r.nodeValue=i));if("value"===o)return void(r.value=i);if(v(r,o),h(i))l(o,i,r,t);else if("if"==o){var u=e.stub,s=function(){p(u.parentNode,u,r)},c=function(){p(r.parentNode,r,u)};i?u&&(s(),r.inStub=!1,$(r)||I(r,function(e){e._tag&&!e._tag.isMounted&&(e._tag.isMounted=!!e._tag.trigger("mount"))})):(u=e.stub=u||document.createTextNode(""),r.parentNode?c():(t.parent||t).one("updated",c),r.inStub=!0)}else"show"===o?r.style.display=i?"":"none":"hide"===o?r.style.display=i?"none":"":e.bool?(r[o]=i,i&&x(r,o,o)):(0===i||i&&typeof i!==Y)&&(q(o,Z)&&o!=J&&(o=o.slice(Z.length)),x(r,o,i))}})}function g(e,t){for(var n,r=e?e.length:0,o=0;r>o;o++)n=e[o],null!=n&&t(n,o)===!1&&o--;return e}function h(e){return typeof e===te||!1}function m(e){return e&&typeof e===Y}function v(e,t){e.removeAttribute(t)}function b(e){return e.replace(/-(\w)/g,function(e,t){return t.toUpperCase()})}function y(e,t){return e.getAttribute(t)}function x(e,t,n){e.setAttribute(t,n)}function w(e){return e.tagName&&G[y(e,X)||y(e,J)||e.tagName.toLowerCase()]}function _(e,t,n){var r=n.tags[t];r?(R(r)||r!==e&&(n.tags[t]=[r]),j(n.tags[t],e)||n.tags[t].push(e)):n.tags[t]=e}function S(e,t,n){var r,o=e.parent;o&&(r=o.tags[t],R(r)?r.splice(n,0,r.splice(r.indexOf(e),1)[0]):_(e,t,o))}function C(e,t,n,r){var o=new f(e,t,n),i=L(t.root),a=E(r);return o.parent=a,o._parent=r,_(o,i,a),a!==r&&_(o,i,r),t.root.innerHTML="",o}function E(e){for(var t=e;!w(t.root)&&t.parent;)t=t.parent;return t}function N(e,t,n,r){return Object.defineProperty(e,t,O({value:n,enumerable:!1,writable:!1,configurable:!1},r)),e}function L(e){var t=w(e),n=y(e,"name"),r=n&&!ae.hasExpr(n)?n:t?t.name:e.tagName.toLowerCase();return r}function O(e){for(var t,n=arguments,r=1;r<n.length;++r)if(t=n[r])for(var o in t)T(e,o)&&(e[o]=t[o]);return e}function j(e,t){return~e.indexOf(t)}function R(e){return Array.isArray(e)||e instanceof Array}function T(e,t){var n=Object.getOwnPropertyDescriptor(e,t);return typeof e[t]===ee||n&&n.writable}function M(e){if(!(e instanceof f||e&&typeof e.trigger==te))return e;var t={};for(var n in e)j(re,n)||(t[n]=e[n]);return t}function I(e,t){if(e){if(t(e)===!1)return;for(e=e.firstChild;e;)I(e,t),e=e.nextSibling}}function A(e,t){for(var n,r=/([-\w]+) ?= ?(?:"([^"]*)|'([^']*)|({[^}]*}))/g;n=r.exec(e);)t(n[1].toLowerCase(),n[2]||n[3]||n[4])}function $(e){for(;e;){if(e.inStub)return!0;e=e.parentNode}return!1}function k(e){return document.createElement(e)}function H(e,t){return(t||document).querySelectorAll(e)}function F(e,t){return(t||document).querySelector(e)}function B(e){function t(){}return t.prototype=e,new t}function K(e){return y(e,"id")||y(e,"name")}function P(e,t,n){var r,o=K(e),i=function(i){j(n,o)||(r=R(i),i?(!r||r&&!j(i,e))&&(r?i.push(e):t[o]=[i,e]):t[o]=e)};o&&(ae.hasExpr(o)?t.one("mount",function(){o=K(e),i(t[o])}):i(t[o]))}function q(e,t){return e.slice(0,t.length)===t}function D(e,t,n){var r=G[t],o=e._innerHTML=e._innerHTML||e.innerHTML;return e.innerHTML="",r&&e&&(r=new f(r,{root:e,opts:n},o)),r&&r.mount&&(r.mount(),j(V,r)||V.push(r)),r}var z={version:"v2.3.17",settings:{}},U=0,V=[],G={},Q="__global_mixin",Z="riot-",J=Z+"tag",X="data-is",W="string",Y="object",ee="undefined",te="function",ne=/^(?:t(?:body|head|foot|[rhd])|caption|col(?:group)?|opt(?:ion|group))$/,re=["_item","_id","_parent","update","root","mount","unmount","mixin","isMounted","isLoop","tags","parent","opts","trigger","on","off","one"],oe=0|(e&&e.document||{}).documentMode;z.observable=function(e){e=e||{};var t={},n=Array.prototype.slice,r=function(e,t){e.replace(/\S+/g,t)};return Object.defineProperties(e,{on:{value:function(n,o){return"function"!=typeof o?e:(r(n,function(e,n){(t[e]=t[e]||[]).push(o),o.typed=n>0}),e)},enumerable:!1,writable:!1,configurable:!1},off:{value:function(n,o){return"*"!=n||o?r(n,function(e){if(o)for(var n,r=t[e],i=0;n=r&&r[i];++i)n==o&&r.splice(i--,1);else delete t[e]}):t={},e},enumerable:!1,writable:!1,configurable:!1},one:{value:function(t,n){function r(){e.off(t,r),n.apply(e,arguments)}return e.on(t,r)},enumerable:!1,writable:!1,configurable:!1},trigger:{value:function(o){for(var i,a=arguments.length-1,u=new Array(a),s=0;a>s;s++)u[s]=arguments[s+1];return r(o,function(r){i=n.call(t[r]||[],0);for(var o,a=0;o=i[a];++a){if(o.busy)return;o.busy=1,o.apply(e,o.typed?[r].concat(u):u),i[a]!==o&&a--,o.busy=0}t["*"]&&"*"!=r&&e.trigger.apply(e,["*",r].concat(u))}),e},enumerable:!1,writable:!1,configurable:!1}}),e},function(t){function n(e){return e.split(/[\/?#]/)}function r(e,t){var n=new RegExp("^"+t[C](/\*/g,"([^/?#]+?)")[C](/\.\./,".*")+"$"),r=e.match(n);return r?r.slice(1):void 0}function o(e,t){var n;return function(){clearTimeout(n),n=setTimeout(e,t)}}function i(e){g=o(l,1),j[_](E,g),j[_](N,g),R[_](A,p),e&&l(!0)}function a(){this.$=[],t.observable(this),k.on("stop",this.s.bind(this)),k.on("emit",this.e.bind(this))}function u(e){return e[C](/^\/|\/$/,"")}function s(e){return"string"==typeof e}function c(e){return(e||M.href||"")[C](y,"")}function f(e){return"#"==h[0]?(e||M.href||"").split(h)[1]||"":c(e)[C](h,"")}function l(e){var t=0==B;if(!(B>=O)&&(B++,F.push(function(){var t=f();(e||t!=m)&&(k[L]("emit",t),m=t)}),t)){for(;F.length;)F[0](),F.shift();B=0}}function p(e){if(!(1!=e.which||e.metaKey||e.ctrlKey||e.shiftKey||e.defaultPrevented)){for(var t=e.target;t&&"A"!=t.nodeName;)t=t.parentNode;!t||"A"!=t.nodeName||t[S]("download")||!t[S]("href")||t.target&&"_self"!=t.target||-1==t.href.indexOf(M.href.match(y)[0])||(t.href==M.href||t.href.split("#")[0]!=M.href.split("#")[0]&&("#"==h||0===c(t.href).indexOf(h))&&d(f(t.href),t.title||R.title))&&e.preventDefault()}}function d(e,t,n){return T?(e=h+u(e),t=t||R.title,n?T.replaceState(null,t,e):T.pushState(null,t,e),R.title=t,H=!1,l(),H):k[L]("emit",f(e))}var g,h,m,v,b,y=/^.+?\/+[^\/]+/,x="EventListener",w="remove"+x,_="add"+x,S="hasAttribute",C="replace",E="popstate",N="hashchange",L="trigger",O=3,j="undefined"!=typeof e&&e,R="undefined"!=typeof document&&document,T=j&&history,M=j&&(T.location||j.location),I=a.prototype,A=R&&R.ontouchstart?"touchstart":"click",$=!1,k=t.observable(),H=!1,F=[],B=0;I.m=function(e,t,n){!s(e)||t&&!s(t)?t?this.r(e,t):this.r("@",e):d(e,t,n||!1)},I.s=function(){this.off("*"),this.$=[]},I.e=function(e){this.$.concat("@").some(function(t){var n=("@"==t?v:b)(u(e),u(t));return"undefined"!=typeof n?(this[L].apply(null,[t].concat(n)),H=!0):void 0},this)},I.r=function(e,t){"@"!=e&&(e="/"+u(e),this.$.push(e)),this.on(e,t)};var K=new a,P=K.m.bind(K);P.create=function(){var e=new a;return e.m.stop=e.s.bind(e),e.m.bind(e)},P.base=function(e){h=e||"#",m=f()},P.exec=function(){l(!0)},P.parser=function(e,t){e||t||(v=n,b=r),e&&(v=e),t&&(b=t)},P.query=function(){var e={},t=M.href||m;return t[C](/[?&](.+?)=([^&]*)/g,function(t,n,r){e[n]=r}),e},P.stop=function(){$&&(j&&(j[w](E,g),j[w](N,g),R[w](A,p)),k[L]("stop"),$=!1)},P.start=function(e){$||(j&&("complete"==document.readyState?i(e):j[_]("load",function(){setTimeout(function(){i(e)},1)})),$=!0)},P.base(),P.parser(),t.route=P}(z);var ie=function(e){function t(e){return e}function n(e,t){return t||(t=v),new RegExp(e.source.replace(/{/g,t[2]).replace(/}/g,t[3]),e.global?c:"")}function r(e){if(e===g)return h;var t=e.split(" ");if(2!==t.length||/[\x00-\x1F<>a-zA-Z0-9'",;\\]/.test(e))throw new Error('Unsupported brackets "'+e+'"');return t=t.concat(e.replace(/(?=[[\]()*+?.^$|])/g,"\\").split(" ")),t[4]=n(t[1].length>1?/{[\S\s]*?}/:h[4],t),t[5]=n(e.length>3?/\\({|})/g:h[5],t),t[6]=n(h[6],t),t[7]=RegExp("\\\\("+t[3]+")|([[({])|("+t[3]+")|"+p,c),t[8]=e,t}function o(e){return e instanceof RegExp?u(e):v[e]}function i(e){(e||(e=g))!==v[8]&&(v=r(e),u=e===g?t:n,v[9]=u(h[9]),v[10]=u(h[10])),m=e}function a(e){var t;e=e||{},t=e.brackets,Object.defineProperty(e,"brackets",{set:i,get:function(){return m},enumerable:!0}),s=e,i(t)}var u,s,c="g",f=/\/\*[^*]*\*+(?:[^*\/][^*]*\*+)*\//g,l=/"[^"\\]*(?:\\[\S\s][^"\\]*)*"|'[^'\\]*(?:\\[\S\s][^'\\]*)*'/g,p=l.source+"|"+/(?:\breturn\s+|(?:[$\w\)\]]|\+\+|--)\s*(\/)(?![*\/]))/.source+"|"+/\/(?=[^*\/])[^[\/\\]*(?:(?:\[(?:\\.|[^\]\\]*)*\]|\\.)[^[\/\\]*)*?(\/)[gim]*/.source,d={"(":RegExp("([()])|"+p,c),"[":RegExp("([[\\]])|"+p,c),"{":RegExp("([{}])|"+p,c)},g="{ }",h=["{","}","{","}",/{[^}]*}/,/\\([{}])/g,/\\({)|{/g,RegExp("\\\\(})|([[({])|(})|"+p,c),g,/^\s*{\^?\s*([$\w]+)(?:\s*,\s*(\S+))?\s+in\s+(\S.*)\s*}/,/(^|[^\\]){=[\S\s]*?}/],m=e,v=[];return o.split=function(e,t,n){function r(e){t||a?c.push(e&&e.replace(n[5],"$1")):c.push(e)}function o(e,t,n){var r,o=d[t];for(o.lastIndex=n,n=1;(r=o.exec(e))&&(!r[1]||(r[1]===t?++n:--n)););return n?e.length:o.lastIndex}n||(n=v);var i,a,u,s,c=[],f=n[6];for(a=u=f.lastIndex=0;i=f.exec(e);){if(s=i.index,a){if(i[2]){f.lastIndex=o(e,i[2],f.lastIndex);continue}if(!i[3])continue}i[1]||(r(e.slice(u,s)),u=f.lastIndex,f=n[6+(a^=1)],f.lastIndex=u)}return e&&u<e.length&&r(e.slice(u)),c},o.hasExpr=function(e){return v[4].test(e)},o.loopKeys=function(e){var t=e.match(v[9]);return t?{key:t[1],pos:t[2],val:v[0]+t[3].trim()+v[1]}:{val:e.trim()}},o.hasRaw=function(e){return v[10].test(e)},o.array=function(e){return e?r(e):v},Object.defineProperty(o,"settings",{set:a,get:function(){return s}}),o.settings="undefined"!=typeof z&&z.settings||{},o.set=i,o.R_STRINGS=l,o.R_MLCOMMS=f,o.S_QBLOCKS=p,o}(),ae=function(){function t(e,t){return e?(u[e]||(u[e]=r(e))).call(t,n):e}function n(e,n){t.errorHandler&&(e.riotData={tagName:n&&n.root&&n.root.tagName,_riot_id:n&&n._riot_id},t.errorHandler(e))}function r(e){var t=o(e);return"try{return "!==t.slice(0,11)&&(t="return "+t),new Function("E",t+";")}function o(e){var t,n=[],r=ie.split(e.replace(/\u2057/g,'"'),1);if(r.length>2||r[0]){var o,a,u=[];for(o=a=0;o<r.length;++o)t=r[o],t&&(t=1&o?i(t,1,n):'"'+t.replace(/\\/g,"\\\\").replace(/\r\n?|\n/g,"\\n").replace(/"/g,'\\"')+'"')&&(u[a++]=t);t=2>a?u[0]:"["+u.join(",")+'].join("")'}else t=i(r[1],0,n);return n[0]&&(t=t.replace(c,function(e,t){return n[t].replace(/\r/g,"\\r").replace(/\n/g,"\\n")})),t}function i(e,t,n){function r(t,n){var r,o=1,i=f[t];for(i.lastIndex=n.lastIndex;r=i.exec(e);)if(r[0]===t)++o;else if(!--o)break;n.lastIndex=o?e.length:i.lastIndex}if("="===e[0]&&(e=e.slice(1)),e=e.replace(s,function(e,t){return e.length>2&&!t?""+(n.push(e)-1)+"~":e}).replace(/\s+/g," ").trim().replace(/\ ?([[\({},?\.:])\ ?/g,"$1")){for(var o,i=[],u=0;e&&(o=e.match(l))&&!o.index;){var c,p,d=/,|([[{(])|$/g;for(e=RegExp.rightContext,c=o[2]?n[o[2]].slice(1,-1).trim().replace(/\s+/g," "):o[1];p=(o=d.exec(e))[1];)r(p,d);p=e.slice(0,o.index),e=RegExp.rightContext,i[u++]=a(p,1,c)}e=u?u>1?"["+i.join(",")+'].join(" ").trim()':i[0]:a(e,t)}return e}function a(e,t,n){var r;return e=e.replace(d,function(e,t,n,o,i){return n&&(o=r?0:o+e.length,"this"!==n&&"global"!==n&&"window"!==n?(e=t+'("'+n+p+n,o&&(r="."===(i=i[o])||"("===i||"["===i)):o&&(r=!g.test(i.slice(o)))),e}),r&&(e="try{return "+e+"}catch(e){E(e,this)}"),n?e=(r?"function(){"+e+"}.call(this)":"("+e+")")+'?"'+n+'":""':t&&(e="function(v){"+(r?e.replace("return ","v="):"v=("+e+")")+';return v||v===0?v:""}.call(this)'),e}var u={};t.haveRaw=ie.hasRaw,t.hasExpr=ie.hasExpr,t.loopKeys=ie.loopKeys,t.errorHandler=null;var s=RegExp(ie.S_QBLOCKS,"g"),c=/\x01(\d+)~/g,f={"(":/[()]/g,"[":/[[\]]/g,"{":/[{}]/g},l=/^(?:(-?[_A-Za-z\xA0-\xFF][-\w\xA0-\xFF]*)|\x01(\d+)~):/,p='"in this?this:'+("object"!=typeof e?"global":"window")+").",d=/[,{][$\w]+:|(^ *|[^$\w\.])(?!(?:typeof|true|false|null|undefined|in|instanceof|is(?:Finite|NaN)|void|NaN|new|Date|RegExp|Math)(?![$\w]))([$_A-Za-z][$\w]*)/g,g=/^(?=(\.[$\w]+))\1(?:[^.[(]|$)/;return t.parse=function(e){return e},t.version=ie.version="v2.3.21",t}(),ue=function e(){function e(e,r){var o=e&&e.match(/^\s*<([-\w]+)/),i=o&&o[1].toLowerCase(),a=k("div");return e=n(e,r),s.test(i)?a=t(a,e,i):a.innerHTML=e,a.stub=!0,a}function t(e,t,n){var r="o"===n[0],o=r?"select>":"table>";if(e.innerHTML="<"+o+t.trim()+"</"+o,o=e.firstChild,r)o.selectedIndex=-1;else{var i=u[n];i&&1===o.childElementCount&&(o=F(i,o))}return o}function n(e,t){if(!r.test(e))return e;var n={};return t=t&&t.replace(i,function(e,t,r){return n[t]=n[t]||r,""}).trim(),e.replace(a,function(e,t,r){return n[t]||r||""}).replace(o,function(e,n){return t||n||""})}var r=/<yield\b/i,o=/<yield\s*(?:\/>|>([\S\s]*?)<\/yield\s*>)/gi,i=/<yield\s+to=['"]([^'">]*)['"]\s*>([\S\s]*?)<\/yield\s*>/gi,a=/<yield\s+from=['"]?([-\w]+)['"]?\s*(?:\/>|>([\S\s]*?)<\/yield\s*>)/gi,u={tr:"tbody",th:"tr",td:"tr",col:"colgroup"},s=oe&&10>oe?ne:/^(?:t(?:body|head|foot|[rhd])|caption|col(?:group)?)$/;return e}(),se=function(t){if(!e)return{add:function(){},inject:function(){}};var n=function(){var e=k("style");x(e,"type","text/css");var t=F("style[type=riot]");return t?(t.id&&(e.id=t.id),t.parentNode.replaceChild(e,t)):document.getElementsByTagName("head")[0].appendChild(e),e}(),r=n.styleSheet,o="";return Object.defineProperty(t,"styleNode",{value:n,writable:!0}),{add:function(e){o+=e},inject:function(){o&&(r?r.cssText+=o:n.innerHTML+=o,o="")}}}(z),ce=function(e){var t=e.requestAnimationFrame||e.mozRequestAnimationFrame||e.webkitRequestAnimationFrame;if(!t||/iP(ad|hone|od).*OS 6/.test(e.navigator.userAgent)){var n=0;t=function(e){var t=Date.now(),r=Math.max(16-(t-n),0);setTimeout(function(){e(n=t+r)},r)}}return t}(e||{});z.util={brackets:ie,tmpl:ae},z.mixin=function(){var e={};return function(t,n){return m(t)?(n=t,void(e[Q]=O(e[Q]||{},n))):n?void(e[t]=n):e[t]}}(),z.tag=function(e,t,n,r,o){return h(r)&&(o=r,/^[\w\-]+\s?=/.test(n)?(r=n,n=""):r=""),n&&(h(n)?o=n:se.add(n)),e=e.toLowerCase(),G[e]={name:e,tmpl:t,attrs:r,fn:o},e},z.tag2=function(e,t,n,r,o){return n&&se.add(n),G[e]={name:e,tmpl:t,attrs:r,fn:o},e},z.mount=function(e,t,n){function r(e){var t="";return g(e,function(e){/[^-\w]/.test(e)||(e=e.trim().toLowerCase(),t+=",["+X+'="'+e+'"],['+J+'="'+e+'"]')}),t}function o(){var e=Object.keys(G);return e+r(e)}function i(e){if(e.tagName){var r=y(e,X)||y(e,J);t&&r!==t&&(r=t,x(e,X,t));var o=D(e,r||e.tagName.toLowerCase(),n);o&&s.push(o)}else e.length&&g(e,i)}var a,u,s=[];if(se.inject(),m(t)&&(n=t,t=0),typeof e===W?("*"===e?e=u=o():e+=r(e.split(/, */)),a=e?H(e):[]):a=e,"*"===t){if(t=u||o(),a.tagName)a=H(t,a);else{var c=[];g(a,function(e){c.push(H(t,e))}),a=c}t=0}return i(a),s},z.update=function(){return g(V,function(e){e.update()})},z.Tag=f;var fe=function(){function t(t){var n=e[t];if(n)return n;throw new Error(t+" parser not found.")}function n(e,t){if(t)for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e}var r={html:{jade:function(e,r,o){return r=n({pretty:!0,filename:o,doctype:"html"},r),t("jade").render(e,r)}},css:{less:function(e,r,o,i){var a;return o=n({sync:!0,syncImport:!0,filename:i},o),t("less").render(r,o,function(e,t){if(e)throw e;a=t.css}),a}},js:{es6:function(e,r){return r=n({blacklist:["useStrict","strict","react"],sourceMaps:!1,comments:!1},r),t("babel").transform(e,r).code},babel:function(e,r,o){return t("babel").transform(e,n({filename:o},r)).code},coffee:function(e,r){return t("CoffeeScript").compile(e,n({bare:!0},r))},livescript:function(e,r){return t("livescript").compile(e,n({bare:!0,header:!1},r))},typescript:function(e,n){return t("typescript")(e,n)},none:function(e){return e}}};return r.js.javascript=r.js.none,r.js.coffeescript=r.js.coffee,r}();z.parsers=fe;var le=function(){function e(e){var t,n=E;for(~e.indexOf("\r")&&(e=e.replace(/\r\n?/g,"\n")),n.lastIndex=0;t=n.exec(e);)"<"===t[0][0]&&(e=RegExp.leftContext+RegExp.rightContext,n.lastIndex=t[3]+1);return e}function t(e,t){var n,r,o,i=[];for(C.lastIndex=0,e=e.replace(/\s+/g," ");n=C.exec(e);){var a=n[1].toLowerCase(),u=n[2];u?(u[0]!==I&&(u=I+(u[0]===A?u.slice(1,-1):u)+I),"type"===a&&T.test(u)?r=u:(/\u0001\d/.test(u)&&("value"===a?o=1:L.test(a)?a="__"+a:~O.indexOf(a)&&(a="riot-"+a)),i.push(a+"="+u))):i.push(a)}return r&&(o&&(r=I+t._bp[0]+A+r.slice(1,-1)+A+t._bp[1]+I),i.push("type="+r)),i.join(" ")}function n(e,t,n){var r=n._bp;if(e&&r[4].test(e)){for(var o,i,a=t.expr&&(t.parser||t.type)?u:0,s=ie.split(e,0,r),c=1;c<s.length;c+=2)o=s[c],"^"===o[0]?o=o.slice(1):a&&(i="="===o[0],o=a(i?o.slice(1):o,t).trim(),";"===o.slice(-1)&&(o=o.slice(0,-1)),i&&(o="="+o)),s[c]=""+(n.push(o)-1)+r[1];e=s.join("")}return e}function r(e,t){return t.length&&(e=e.replace(/\u0001(\d+)/g,function(e,n){var r=t[n];return"="===r[0]&&(r=r.replace(ie.R_STRINGS,function(e){return e.replace(/</g,"&lt;").replace(/>/g,"&gt;")})),t._bp[0]+r.trim().replace(/[\r\n]+/g," ").replace(/"/g,"⁗")})),e}function o(e,o,i){if(e=n(e,o,i).replace(N,function(e,n,r,o){return n=n.toLowerCase(),o=o&&!j.test(n)?"></"+n:"",r&&(n+=" "+t(r,i)),"<"+n+o+">"}),!o.whitespace){var a=[];/<pre[\s>]/.test(e)&&(e=e.replace(R,function(e){return a.push(e),""})),e=e.trim().replace(/\s+/g," "),a.length&&(e=e.replace(/\u0002/g,function(){return a.shift()}))}return o.compact&&(e=e.replace(/>[ \t]+<([-\w\/])/g,"><$1")),r(e,i).replace(M,"")}function i(t,n,r){return Array.isArray(n)?(r=n,n={}):(r||(r=[]),n||(n={})),r._bp=ie.array(n.brackets),o(e(t),n,r)}function a(e){function t(e,t,n){for(t.lastIndex=0;n=t.exec(e);)"/"!==n[0][0]||n[1]||n[2]||(e=s.leftContext+" "+s.rightContext,t.lastIndex=n[3]+1);return e}function n(e,t){var n,r=1;for(t.lastIndex=0;r&&(n=t.exec(e));)"{"===n[0]?++r:"}"===n[0]&&--r;return r?e.length:t.lastIndex}var r,o,i,a,u=[],s=RegExp;for(~e.indexOf("/")&&(e=t(e,H));r=e.match($);)u.push(s.leftContext),e=s.rightContext,i=n(e,k),a=r[1],o=!/^(?:if|while|for|switch|catch|function)$/.test(a),a=o?r[0].replace(a,"this."+a+" = function"):r[0],u.push(a,e.slice(0,i)),e=e.slice(i),o&&!/^\s*.\s*bind\b/.test(e)&&u.push(".bind(this)");return u.length?u.join("")+e:e}function u(e,t,n,r,o){if(!/\S/.test(e))return"";n||(n=t.type);var i=t.parser||(n?fe.js[n]:a);if(!i)throw new Error('JS parser not found: "'+n+'"');return i(e,r,o).replace(/\r\n?/g,"\n").replace(M,"")}function s(e,t,n,r){return"string"==typeof t&&(r=n,n=t,t={}),n&&"object"==typeof n&&(r=n,n=""),r||(r={}),u(e,t||{},n,r.parserOptions,r.url)}function c(e,t){var n=":scope";return t.replace(F,function(t,r,o){return o?(o=o.replace(/[^,]+/g,function(t){var r=t.trim();return r&&"from"!==r&&"to"!==r&&"%"!==r.slice(-1)?(r=r.indexOf(n)<0?e+" "+r+',[riot-tag="'+e+'"] '+r:r.replace(n,e)+","+r.replace(n,'[riot-tag="'+e+'"]')," "===t.slice(-1)?r+" ":r):t}),r?r+" "+o:o):t})}function f(e,t,n,r){var o=(r||(r={})).scoped;if(n)if("scoped-css"===n)o=!0;else if(fe.css[n])e=fe.css[n](t,e,r.parserOpts||{},r.url);else if("css"!==n)throw new Error('CSS parser not found: "'+n+'"');if(e=e.replace(ie.R_MLCOMMS,"").replace(/\s+/g," ").trim(),o){if(!t)throw new Error("Can not parse scoped CSS without a tagName");e=c(t,e)}return e}function l(e,t,n){return t&&"object"==typeof t?(n=t,t=""):n||(n={}),f(e,n.tagName,t,n)}function p(e,t){return e?(e=A+e.replace(/\\/g,"\\\\").replace(/'/g,"\\'")+A,t&&~e.indexOf("\n")?e.replace(/\n/g,"\\n"):e):"''"}function d(e,t,n,r,o,i){var a=", ",u="}"+(i.length?", "+p(i._bp[8]):"")+");";return o&&"\n"!==o.slice(-1)&&(u="\n"+u),"riot.tag2('"+e+A+a+p(t,1)+a+p(n)+a+p(r)+", function(opts) {\n"+o+u}function g(e){if(/<[-\w]/.test(e))for(var t,n=e.lastIndexOf("<"),r=e.length;~n;){if(t=e.slice(n,r).match(P))return n+=t.index+t[0].length,[e.slice(0,n),e.slice(n)];r=n,n=e.lastIndexOf("<",n-1)}return["",e]}function h(e){if(e){var t=e.match(B);if(t=t&&(t[2]||t[3]))return t.replace("text/","")}return""}function m(e,t){if(e){var n=e.match(RegExp("\\s"+t+K,"i"));if(n=n&&n[1])return/^['"]/.test(n)?n.slice(1,-1):n}return""}function v(e){var t=m(e,"options");return t?JSON.parse(t):null}function b(e,t,n,r){var o=h(n);return u(e,t,o,v(n),r)}function y(e,t,n,r,o){var i={parserOpts:v(n),scoped:n&&/\sscoped(\s|=|$)/i.test(n),url:r};return f(e,o,h(n)||t.style,i)}function x(e,t,n,r){var o=fe.html[n];if(!o)throw new Error('Template parser not found: "'+n+'"');return o(e,r,t)}function w(i,a,s){var c,f=[];a||(a={}),c=a.exclude?function(e){return a.exclude.indexOf(e)<0}:function(){return 1},s||(s="");var l=ie.array(a.brackets);return a.template&&(i=x(i,s,a.template,a.templateOptions)),i=e(i).replace(q,function(e,i,p,h,m,v){var x="",w="",_="",S=[];if(S._bp=l,p=p.toLowerCase(),h=h&&c("attribs")?r(t(n(h,a,S),S),S):"",(m||(m=v))&&/\S/.test(m))if(v)c("html")&&(_=o(v,a,S));else{m=m.replace(RegExp("^"+i,"gm"),""),m=m.replace(U,function(e,t,n){return c("css")&&(w+=(w?" ":"")+y(n,a,t,s,p)),""}),m=m.replace(D,function(e,t,n){if(c("js")){var r=b(n,a,t,s);r&&(x+=(x?"\n":"")+r)}return""});var C=g(m.replace(M,""));c("html")&&(_=o(C[0],a,S)),c("js")&&(m=u(C[1],a,null,null,s),m&&(x+=(x?"\n":"")+m))}return x=/\S/.test(x)?x.replace(/\n{3,}/g,"\n\n"):"",a.entities?(f.push({tagName:p,html:_,css:w,attribs:h,js:x}),""):d(p,_,w,h,x,S)}),a.entities?f:i}var _=/"[^"\n\\]*(?:\\[\S\s][^"\n\\]*)*"|'[^'\n\\]*(?:\\[\S\s][^'\n\\]*)*'/.source,S=ie.R_STRINGS.source,C=/ *([-\w:\xA0-\xFF]+) ?(?:= ?('[^']*'|"[^"]*"|\S+))?/g,E=RegExp(/<!--(?!>)[\S\s]*?-->/.source+"|"+_,"g"),N=/<([-\w]+)(?:\s+([^"'\/>]*(?:(?:"[^"]*"|'[^']*'|\/[^>])[^'"\/>]*)*)|\s*)(\/?)>/g,L=RegExp("^(?:disabled|checked|readonly|required|allowfullscreen|auto(?:focus|play)|compact|controls|default|formnovalidate|hidden|ismap|itemscope|loop|multiple|muted|no(?:resize|shade|validate|wrap)?|open|reversed|seamless|selected|sortable|truespeed|typemustmatch)$"),O=["style","src","d"],j=/^(?:input|img|br|wbr|hr|area|base|col|embed|keygen|link|meta|param|source|track)$/,R=/<pre(?:\s+(?:[^">]*|"[^"]*")*)?>([\S\s]+?)<\/pre\s*>/gi,T=/^"(?:number|date(?:time)?|time|month|email|color)\b/i,M=/[ \t]+$/gm,I='"',A="'",$=/^[ \t]*([$_A-Za-z][$\w]*)\s*\([^()]*\)\s*{/m,k=RegExp("[{}]|"+ie.S_QBLOCKS,"g"),H=RegExp(ie.R_MLCOMMS.source+"|//[^\r\n]*|"+ie.S_QBLOCKS,"g"),F=RegExp("([{}]|^)[ ;]*([^@ ;{}][^{}]*)(?={)|"+_,"g"),B=/\stype\s*=\s*(?:(['"])(.+?)\1|(\S+))/i,K="\\s*=\\s*("+S+"|{[^}]+}|\\S+)",P=/\/>\n|^<(?:\/?[-\w]+\s*|[-\w]+\s+[-\w:\xA0-\xFF][\S\s]*?)>\n/,q=RegExp(/^([ \t]*)<([-\w]+)(?:\s+([^'"\/>]+(?:(?:@|\/[^>])[^'"\/>]*)*)|\s*)?(?:\/>|>[ \t]*\n?([\S\s]*)^\1<\/\2\s*>|>(.*)<\/\2\s*>)/.source.replace("@",S),"gim"),D=/<script(\s+[^>]*)?>\n?([\S\s]*?)<\/script\s*>/gi,U=/<style(\s+[^>]*)?>\n?([\S\s]*?)<\/style\s*>/gi;return z.util.compiler={compile:w,html:i,css:l,js:s,version:"v2.3.22"},w}();z.compile=function(){function e(e,t,n){var r=new XMLHttpRequest;r.onreadystatechange=function(){4===r.readyState&&(200===r.status||!r.status&&r.responseText.length)&&t(r.responseText,n,e)},r.open("GET",e,!0),r.send("")}function n(e,t){if(typeof e===W){var n=k("script"),r=document.documentElement;t&&(e+="\n//# sourceURL="+t+".js"),n.text=e,r.appendChild(n),r.removeChild(n)}}function r(t,r){function a(){o.trigger("ready"),i=!0,t&&t()}function u(e,t,r){var o=le(e,t,r);n(o,r),--c||a()}var s=H('script[type="riot/tag"]'),c=s.length;if(c)for(var f=0;f<s.length;++f){var l=s[f],p=O({template:y(l,"template")},r),d=y(l,"src");d?e(d,u,p):u(l.innerHTML,p)}else a()}var o,i;return function(a,u,s){if(typeof a===W){if(m(u)&&(s=u,u=!1),/^\s*</m.test(a)){var c=le(a,s);return u!==!0&&n(c),h(u)&&u(c,a,s),c}e(a,function(e,t,r){var o=le(e,t,r);n(o,r),u&&u(o,e,t)})}else{if(h(a)?(s=u,u=a):(s=a,u=t),i)return u&&u();o?u&&o.on("ready",u):(o=z.observable(),r(u,s))}}}();var pe=z.mount;z.mount=function(e,t,n){var r;return z.compile(function(){r=pe(e,t,n)}),r},typeof exports===Y?module.exports=z:typeof define===te&&typeof define.amd!==ee?define(function(){return z}):e.riot=z}("undefined"!=typeof window?window:void 0);