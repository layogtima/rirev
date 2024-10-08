/****** FILE: public/_resources/themes/rirev/node_modules/waypoints/lib/jquery.waypoints.min.js *****/
/*!
Waypoints - 4.0.1
Copyright © 2011-2016 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blob/master/licenses.txt
*/
!function(){"use strict";function t(o){if(!o)throw new Error("No options passed to Waypoint constructor");if(!o.element)throw new Error("No element option passed to Waypoint constructor");if(!o.handler)throw new Error("No handler option passed to Waypoint constructor");this.key="waypoint-"+e,this.options=t.Adapter.extend({},t.defaults,o),this.element=this.options.element,this.adapter=new t.Adapter(this.element),this.callback=o.handler,this.axis=this.options.horizontal?"horizontal":"vertical",this.enabled=this.options.enabled,this.triggerPoint=null,this.group=t.Group.findOrCreate({name:this.options.group,axis:this.axis}),this.context=t.Context.findOrCreateByElement(this.options.context),t.offsetAliases[this.options.offset]&&(this.options.offset=t.offsetAliases[this.options.offset]),this.group.add(this),this.context.add(this),i[this.key]=this,e+=1}var e=0,i={};t.prototype.queueTrigger=function(t){this.group.queueTrigger(this,t)},t.prototype.trigger=function(t){this.enabled&&this.callback&&this.callback.apply(this,t)},t.prototype.destroy=function(){this.context.remove(this),this.group.remove(this),delete i[this.key]},t.prototype.disable=function(){return this.enabled=!1,this},t.prototype.enable=function(){return this.context.refresh(),this.enabled=!0,this},t.prototype.next=function(){return this.group.next(this)},t.prototype.previous=function(){return this.group.previous(this)},t.invokeAll=function(t){var e=[];for(var o in i)e.push(i[o]);for(var n=0,r=e.length;r>n;n++)e[n][t]()},t.destroyAll=function(){t.invokeAll("destroy")},t.disableAll=function(){t.invokeAll("disable")},t.enableAll=function(){t.Context.refreshAll();for(var e in i)i[e].enabled=!0;return this},t.refreshAll=function(){t.Context.refreshAll()},t.viewportHeight=function(){return window.innerHeight||document.documentElement.clientHeight},t.viewportWidth=function(){return document.documentElement.clientWidth},t.adapters=[],t.defaults={context:window,continuous:!0,enabled:!0,group:"default",horizontal:!1,offset:0},t.offsetAliases={"bottom-in-view":function(){return this.context.innerHeight()-this.adapter.outerHeight()},"right-in-view":function(){return this.context.innerWidth()-this.adapter.outerWidth()}},window.Waypoint=t}(),function(){"use strict";function t(t){window.setTimeout(t,1e3/60)}function e(t){this.element=t,this.Adapter=n.Adapter,this.adapter=new this.Adapter(t),this.key="waypoint-context-"+i,this.didScroll=!1,this.didResize=!1,this.oldScroll={x:this.adapter.scrollLeft(),y:this.adapter.scrollTop()},this.waypoints={vertical:{},horizontal:{}},t.waypointContextKey=this.key,o[t.waypointContextKey]=this,i+=1,n.windowContext||(n.windowContext=!0,n.windowContext=new e(window)),this.createThrottledScrollHandler(),this.createThrottledResizeHandler()}var i=0,o={},n=window.Waypoint,r=window.onload;e.prototype.add=function(t){var e=t.options.horizontal?"horizontal":"vertical";this.waypoints[e][t.key]=t,this.refresh()},e.prototype.checkEmpty=function(){var t=this.Adapter.isEmptyObject(this.waypoints.horizontal),e=this.Adapter.isEmptyObject(this.waypoints.vertical),i=this.element==this.element.window;t&&e&&!i&&(this.adapter.off(".waypoints"),delete o[this.key])},e.prototype.createThrottledResizeHandler=function(){function t(){e.handleResize(),e.didResize=!1}var e=this;this.adapter.on("resize.waypoints",function(){e.didResize||(e.didResize=!0,n.requestAnimationFrame(t))})},e.prototype.createThrottledScrollHandler=function(){function t(){e.handleScroll(),e.didScroll=!1}var e=this;this.adapter.on("scroll.waypoints",function(){(!e.didScroll||n.isTouch)&&(e.didScroll=!0,n.requestAnimationFrame(t))})},e.prototype.handleResize=function(){n.Context.refreshAll()},e.prototype.handleScroll=function(){var t={},e={horizontal:{newScroll:this.adapter.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.adapter.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};for(var i in e){var o=e[i],n=o.newScroll>o.oldScroll,r=n?o.forward:o.backward;for(var s in this.waypoints[i]){var a=this.waypoints[i][s];if(null!==a.triggerPoint){var l=o.oldScroll<a.triggerPoint,h=o.newScroll>=a.triggerPoint,p=l&&h,u=!l&&!h;(p||u)&&(a.queueTrigger(r),t[a.group.id]=a.group)}}}for(var c in t)t[c].flushTriggers();this.oldScroll={x:e.horizontal.newScroll,y:e.vertical.newScroll}},e.prototype.innerHeight=function(){return this.element==this.element.window?n.viewportHeight():this.adapter.innerHeight()},e.prototype.remove=function(t){delete this.waypoints[t.axis][t.key],this.checkEmpty()},e.prototype.innerWidth=function(){return this.element==this.element.window?n.viewportWidth():this.adapter.innerWidth()},e.prototype.destroy=function(){var t=[];for(var e in this.waypoints)for(var i in this.waypoints[e])t.push(this.waypoints[e][i]);for(var o=0,n=t.length;n>o;o++)t[o].destroy()},e.prototype.refresh=function(){var t,e=this.element==this.element.window,i=e?void 0:this.adapter.offset(),o={};this.handleScroll(),t={horizontal:{contextOffset:e?0:i.left,contextScroll:e?0:this.oldScroll.x,contextDimension:this.innerWidth(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:e?0:i.top,contextScroll:e?0:this.oldScroll.y,contextDimension:this.innerHeight(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};for(var r in t){var s=t[r];for(var a in this.waypoints[r]){var l,h,p,u,c,d=this.waypoints[r][a],f=d.options.offset,w=d.triggerPoint,y=0,g=null==w;d.element!==d.element.window&&(y=d.adapter.offset()[s.offsetProp]),"function"==typeof f?f=f.apply(d):"string"==typeof f&&(f=parseFloat(f),d.options.offset.indexOf("%")>-1&&(f=Math.ceil(s.contextDimension*f/100))),l=s.contextScroll-s.contextOffset,d.triggerPoint=Math.floor(y+l-f),h=w<s.oldScroll,p=d.triggerPoint>=s.oldScroll,u=h&&p,c=!h&&!p,!g&&u?(d.queueTrigger(s.backward),o[d.group.id]=d.group):!g&&c?(d.queueTrigger(s.forward),o[d.group.id]=d.group):g&&s.oldScroll>=d.triggerPoint&&(d.queueTrigger(s.forward),o[d.group.id]=d.group)}}return n.requestAnimationFrame(function(){for(var t in o)o[t].flushTriggers()}),this},e.findOrCreateByElement=function(t){return e.findByElement(t)||new e(t)},e.refreshAll=function(){for(var t in o)o[t].refresh()},e.findByElement=function(t){return o[t.waypointContextKey]},window.onload=function(){r&&r(),e.refreshAll()},n.requestAnimationFrame=function(e){var i=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||t;i.call(window,e)},n.Context=e}(),function(){"use strict";function t(t,e){return t.triggerPoint-e.triggerPoint}function e(t,e){return e.triggerPoint-t.triggerPoint}function i(t){this.name=t.name,this.axis=t.axis,this.id=this.name+"-"+this.axis,this.waypoints=[],this.clearTriggerQueues(),o[this.axis][this.name]=this}var o={vertical:{},horizontal:{}},n=window.Waypoint;i.prototype.add=function(t){this.waypoints.push(t)},i.prototype.clearTriggerQueues=function(){this.triggerQueues={up:[],down:[],left:[],right:[]}},i.prototype.flushTriggers=function(){for(var i in this.triggerQueues){var o=this.triggerQueues[i],n="up"===i||"left"===i;o.sort(n?e:t);for(var r=0,s=o.length;s>r;r+=1){var a=o[r];(a.options.continuous||r===o.length-1)&&a.trigger([i])}}this.clearTriggerQueues()},i.prototype.next=function(e){this.waypoints.sort(t);var i=n.Adapter.inArray(e,this.waypoints),o=i===this.waypoints.length-1;return o?null:this.waypoints[i+1]},i.prototype.previous=function(e){this.waypoints.sort(t);var i=n.Adapter.inArray(e,this.waypoints);return i?this.waypoints[i-1]:null},i.prototype.queueTrigger=function(t,e){this.triggerQueues[e].push(t)},i.prototype.remove=function(t){var e=n.Adapter.inArray(t,this.waypoints);e>-1&&this.waypoints.splice(e,1)},i.prototype.first=function(){return this.waypoints[0]},i.prototype.last=function(){return this.waypoints[this.waypoints.length-1]},i.findOrCreate=function(t){return o[t.axis][t.name]||new i(t)},n.Group=i}(),function(){"use strict";function t(t){this.$element=e(t)}var e=window.jQuery,i=window.Waypoint;e.each(["innerHeight","innerWidth","off","offset","on","outerHeight","outerWidth","scrollLeft","scrollTop"],function(e,i){t.prototype[i]=function(){var t=Array.prototype.slice.call(arguments);return this.$element[i].apply(this.$element,t)}}),e.each(["extend","inArray","isEmptyObject"],function(i,o){t[o]=e[o]}),i.adapters.push({name:"jquery",Adapter:t}),i.Adapter=t}(),function(){"use strict";function t(t){return function(){var i=[],o=arguments[0];return t.isFunction(arguments[0])&&(o=t.extend({},arguments[1]),o.handler=arguments[0]),this.each(function(){var n=t.extend({},o,{element:this});"string"==typeof n.context&&(n.context=t(this).closest(n.context)[0]),i.push(new e(n))}),i}}var e=window.Waypoint;window.jQuery&&(window.jQuery.fn.waypoint=t(window.jQuery)),window.Zepto&&(window.Zepto.fn.waypoint=t(window.Zepto))}();
/****** FILE: public/_resources/themes/rirev/node_modules/jquery.counterup/jquery.counterup.min.js *****/
!function(t){"use strict";t.fn.counterUp=function(e){var a,n=t.extend({time:400,delay:10,offset:100,beginAt:0,formatter:!1,context:"window",again:!1,ifVisible:!0,easing:!1,booster:25,callback:function(){}},e);return this.each(function(){var e=t(this),i={num:t(this).data("counterup-num")||t(this).text(),time:t(this).data("counterup-time")||n.time,delay:t(this).data("counterup-delay")||n.delay,offset:t(this).data("counterup-offset")||n.offset,beginAt:t(this).data("counterup-beginat")||n.beginAt,again:t(this).data("counterup-again")||n.again,ifVisible:t(this).data("counterup-ifvisible")||n.ifVisible,easing:t(this).data("counterup-easing")||n.easing,booster:t(this).data("counterup-booster")||n.booster,context:t(this).data("counterup-context")||n.context};e.waypoint(function(s){i.ifVisible&&!t(this.element).is(":visible")||(!function(){var s=[],u=i.time/i.delay,o=i.num,r=/[0-9]+,[0-9]+/.test(o),c=((o=o.replace(/,/g,"")).split(".")[1]||[]).length;i.beginAt>o&&(i.beginAt=o);var f=/[0-9]+:[0-9]+:[0-9]+/.test(o);if(f){var l=o.split(":"),d=1;for(a=0;l.length>0;)a+=d*parseInt(l.pop(),10),d*=60}for(var p=u;p>=i.beginAt/o*u;p--){var g=parseFloat(o/u*p).toFixed(c);if(f){g=parseInt(a/u*p);var h=parseInt(g/3600)%24,b=parseInt(g/60)%60,m=parseInt(g%60,10);g=(h<10?"0"+h:h)+":"+(b<10?"0"+b:b)+":"+(m<10?"0"+m:m)}if(r)for(;/(\d+)(\d{3})/.test(g.toString());)g=g.toString().replace(/(\d+)(\d{3})/,"$1,$2");n.formatter&&(g=n.formatter.call(this,g)),s.unshift(g)}e.data("counterup-nums",s),e.text(i.beginAt);var v=0;e.data("counterup-func",function(){if(i.easing)a=(a=t.easing[i.easing](++v/u))*i.booster+2;else var a=i.delay;e.data("counterup-nums")?(e.html(e.data("counterup-nums").shift()),e.data("counterup-nums").length?setTimeout(e.data("counterup-func"),a):(e.data("counterup-nums",null),e.data("counterup-func",null),n.callback.call(this))):n.callback.call(this)}),setTimeout(e.data("counterup-func"),i.delay)}(),i.again||this.destroy())},{offset:i.offset+"%",context:i.context})})}}(jQuery);
/****** FILE: public/_resources/themes/rirev/node_modules/imagesloaded/imagesloaded.pkgd.min.js *****/
/*!
 * imagesLoaded PACKAGED v4.1.4
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

!function(e,t){"function"==typeof define&&define.amd?define("ev-emitter/ev-emitter",t):"object"==typeof module&&module.exports?module.exports=t():e.EvEmitter=t()}("undefined"!=typeof window?window:this,function(){function e(){}var t=e.prototype;return t.on=function(e,t){if(e&&t){var i=this._events=this._events||{},n=i[e]=i[e]||[];return n.indexOf(t)==-1&&n.push(t),this}},t.once=function(e,t){if(e&&t){this.on(e,t);var i=this._onceEvents=this._onceEvents||{},n=i[e]=i[e]||{};return n[t]=!0,this}},t.off=function(e,t){var i=this._events&&this._events[e];if(i&&i.length){var n=i.indexOf(t);return n!=-1&&i.splice(n,1),this}},t.emitEvent=function(e,t){var i=this._events&&this._events[e];if(i&&i.length){i=i.slice(0),t=t||[];for(var n=this._onceEvents&&this._onceEvents[e],o=0;o<i.length;o++){var r=i[o],s=n&&n[r];s&&(this.off(e,r),delete n[r]),r.apply(this,t)}return this}},t.allOff=function(){delete this._events,delete this._onceEvents},e}),function(e,t){"use strict";"function"==typeof define&&define.amd?define(["ev-emitter/ev-emitter"],function(i){return t(e,i)}):"object"==typeof module&&module.exports?module.exports=t(e,require("ev-emitter")):e.imagesLoaded=t(e,e.EvEmitter)}("undefined"!=typeof window?window:this,function(e,t){function i(e,t){for(var i in t)e[i]=t[i];return e}function n(e){if(Array.isArray(e))return e;var t="object"==typeof e&&"number"==typeof e.length;return t?d.call(e):[e]}function o(e,t,r){if(!(this instanceof o))return new o(e,t,r);var s=e;return"string"==typeof e&&(s=document.querySelectorAll(e)),s?(this.elements=n(s),this.options=i({},this.options),"function"==typeof t?r=t:i(this.options,t),r&&this.on("always",r),this.getImages(),h&&(this.jqDeferred=new h.Deferred),void setTimeout(this.check.bind(this))):void a.error("Bad element for imagesLoaded "+(s||e))}function r(e){this.img=e}function s(e,t){this.url=e,this.element=t,this.img=new Image}var h=e.jQuery,a=e.console,d=Array.prototype.slice;o.prototype=Object.create(t.prototype),o.prototype.options={},o.prototype.getImages=function(){this.images=[],this.elements.forEach(this.addElementImages,this)},o.prototype.addElementImages=function(e){"IMG"==e.nodeName&&this.addImage(e),this.options.background===!0&&this.addElementBackgroundImages(e);var t=e.nodeType;if(t&&u[t]){for(var i=e.querySelectorAll("img"),n=0;n<i.length;n++){var o=i[n];this.addImage(o)}if("string"==typeof this.options.background){var r=e.querySelectorAll(this.options.background);for(n=0;n<r.length;n++){var s=r[n];this.addElementBackgroundImages(s)}}}};var u={1:!0,9:!0,11:!0};return o.prototype.addElementBackgroundImages=function(e){var t=getComputedStyle(e);if(t)for(var i=/url\((['"])?(.*?)\1\)/gi,n=i.exec(t.backgroundImage);null!==n;){var o=n&&n[2];o&&this.addBackground(o,e),n=i.exec(t.backgroundImage)}},o.prototype.addImage=function(e){var t=new r(e);this.images.push(t)},o.prototype.addBackground=function(e,t){var i=new s(e,t);this.images.push(i)},o.prototype.check=function(){function e(e,i,n){setTimeout(function(){t.progress(e,i,n)})}var t=this;return this.progressedCount=0,this.hasAnyBroken=!1,this.images.length?void this.images.forEach(function(t){t.once("progress",e),t.check()}):void this.complete()},o.prototype.progress=function(e,t,i){this.progressedCount++,this.hasAnyBroken=this.hasAnyBroken||!e.isLoaded,this.emitEvent("progress",[this,e,t]),this.jqDeferred&&this.jqDeferred.notify&&this.jqDeferred.notify(this,e),this.progressedCount==this.images.length&&this.complete(),this.options.debug&&a&&a.log("progress: "+i,e,t)},o.prototype.complete=function(){var e=this.hasAnyBroken?"fail":"done";if(this.isComplete=!0,this.emitEvent(e,[this]),this.emitEvent("always",[this]),this.jqDeferred){var t=this.hasAnyBroken?"reject":"resolve";this.jqDeferred[t](this)}},r.prototype=Object.create(t.prototype),r.prototype.check=function(){var e=this.getIsImageComplete();return e?void this.confirm(0!==this.img.naturalWidth,"naturalWidth"):(this.proxyImage=new Image,this.proxyImage.addEventListener("load",this),this.proxyImage.addEventListener("error",this),this.img.addEventListener("load",this),this.img.addEventListener("error",this),void(this.proxyImage.src=this.img.src))},r.prototype.getIsImageComplete=function(){return this.img.complete&&this.img.naturalWidth},r.prototype.confirm=function(e,t){this.isLoaded=e,this.emitEvent("progress",[this,this.img,t])},r.prototype.handleEvent=function(e){var t="on"+e.type;this[t]&&this[t](e)},r.prototype.onload=function(){this.confirm(!0,"onload"),this.unbindEvents()},r.prototype.onerror=function(){this.confirm(!1,"onerror"),this.unbindEvents()},r.prototype.unbindEvents=function(){this.proxyImage.removeEventListener("load",this),this.proxyImage.removeEventListener("error",this),this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},s.prototype=Object.create(r.prototype),s.prototype.check=function(){this.img.addEventListener("load",this),this.img.addEventListener("error",this),this.img.src=this.url;var e=this.getIsImageComplete();e&&(this.confirm(0!==this.img.naturalWidth,"naturalWidth"),this.unbindEvents())},s.prototype.unbindEvents=function(){this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},s.prototype.confirm=function(e,t){this.isLoaded=e,this.emitEvent("progress",[this,this.element,t])},o.makeJQueryPlugin=function(t){t=t||e.jQuery,t&&(h=t,h.fn.imagesLoaded=function(e,t){var i=new o(this,e,t);return i.jqDeferred.promise(h(this))})},o.makeJQueryPlugin(),o});
/****** FILE: public/_resources/themes/rirev/node_modules/isotope-layout/dist/isotope.pkgd.min.js *****/
/*!
 * Isotope PACKAGED v3.0.6
 *
 * Licensed GPLv3 for open source use
 * or Isotope Commercial License for commercial use
 *
 * https://isotope.metafizzy.co
 * Copyright 2010-2018 Metafizzy
 */

!function(t,e){"function"==typeof define&&define.amd?define("jquery-bridget/jquery-bridget",["jquery"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("jquery")):t.jQueryBridget=e(t,t.jQuery)}(window,function(t,e){"use strict";function i(i,s,a){function u(t,e,o){var n,s="$()."+i+'("'+e+'")';return t.each(function(t,u){var h=a.data(u,i);if(!h)return void r(i+" not initialized. Cannot call methods, i.e. "+s);var d=h[e];if(!d||"_"==e.charAt(0))return void r(s+" is not a valid method");var l=d.apply(h,o);n=void 0===n?l:n}),void 0!==n?n:t}function h(t,e){t.each(function(t,o){var n=a.data(o,i);n?(n.option(e),n._init()):(n=new s(o,e),a.data(o,i,n))})}a=a||e||t.jQuery,a&&(s.prototype.option||(s.prototype.option=function(t){a.isPlainObject(t)&&(this.options=a.extend(!0,this.options,t))}),a.fn[i]=function(t){if("string"==typeof t){var e=n.call(arguments,1);return u(this,t,e)}return h(this,t),this},o(a))}function o(t){!t||t&&t.bridget||(t.bridget=i)}var n=Array.prototype.slice,s=t.console,r="undefined"==typeof s?function(){}:function(t){s.error(t)};return o(e||t.jQuery),i}),function(t,e){"function"==typeof define&&define.amd?define("ev-emitter/ev-emitter",e):"object"==typeof module&&module.exports?module.exports=e():t.EvEmitter=e()}("undefined"!=typeof window?window:this,function(){function t(){}var e=t.prototype;return e.on=function(t,e){if(t&&e){var i=this._events=this._events||{},o=i[t]=i[t]||[];return o.indexOf(e)==-1&&o.push(e),this}},e.once=function(t,e){if(t&&e){this.on(t,e);var i=this._onceEvents=this._onceEvents||{},o=i[t]=i[t]||{};return o[e]=!0,this}},e.off=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var o=i.indexOf(e);return o!=-1&&i.splice(o,1),this}},e.emitEvent=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){i=i.slice(0),e=e||[];for(var o=this._onceEvents&&this._onceEvents[t],n=0;n<i.length;n++){var s=i[n],r=o&&o[s];r&&(this.off(t,s),delete o[s]),s.apply(this,e)}return this}},e.allOff=function(){delete this._events,delete this._onceEvents},t}),function(t,e){"function"==typeof define&&define.amd?define("get-size/get-size",e):"object"==typeof module&&module.exports?module.exports=e():t.getSize=e()}(window,function(){"use strict";function t(t){var e=parseFloat(t),i=t.indexOf("%")==-1&&!isNaN(e);return i&&e}function e(){}function i(){for(var t={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0},e=0;e<h;e++){var i=u[e];t[i]=0}return t}function o(t){var e=getComputedStyle(t);return e||a("Style returned "+e+". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1"),e}function n(){if(!d){d=!0;var e=document.createElement("div");e.style.width="200px",e.style.padding="1px 2px 3px 4px",e.style.borderStyle="solid",e.style.borderWidth="1px 2px 3px 4px",e.style.boxSizing="border-box";var i=document.body||document.documentElement;i.appendChild(e);var n=o(e);r=200==Math.round(t(n.width)),s.isBoxSizeOuter=r,i.removeChild(e)}}function s(e){if(n(),"string"==typeof e&&(e=document.querySelector(e)),e&&"object"==typeof e&&e.nodeType){var s=o(e);if("none"==s.display)return i();var a={};a.width=e.offsetWidth,a.height=e.offsetHeight;for(var d=a.isBorderBox="border-box"==s.boxSizing,l=0;l<h;l++){var f=u[l],c=s[f],m=parseFloat(c);a[f]=isNaN(m)?0:m}var p=a.paddingLeft+a.paddingRight,y=a.paddingTop+a.paddingBottom,g=a.marginLeft+a.marginRight,v=a.marginTop+a.marginBottom,_=a.borderLeftWidth+a.borderRightWidth,z=a.borderTopWidth+a.borderBottomWidth,I=d&&r,x=t(s.width);x!==!1&&(a.width=x+(I?0:p+_));var S=t(s.height);return S!==!1&&(a.height=S+(I?0:y+z)),a.innerWidth=a.width-(p+_),a.innerHeight=a.height-(y+z),a.outerWidth=a.width+g,a.outerHeight=a.height+v,a}}var r,a="undefined"==typeof console?e:function(t){console.error(t)},u=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"],h=u.length,d=!1;return s}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("desandro-matches-selector/matches-selector",e):"object"==typeof module&&module.exports?module.exports=e():t.matchesSelector=e()}(window,function(){"use strict";var t=function(){var t=window.Element.prototype;if(t.matches)return"matches";if(t.matchesSelector)return"matchesSelector";for(var e=["webkit","moz","ms","o"],i=0;i<e.length;i++){var o=e[i],n=o+"MatchesSelector";if(t[n])return n}}();return function(e,i){return e[t](i)}}),function(t,e){"function"==typeof define&&define.amd?define("fizzy-ui-utils/utils",["desandro-matches-selector/matches-selector"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("desandro-matches-selector")):t.fizzyUIUtils=e(t,t.matchesSelector)}(window,function(t,e){var i={};i.extend=function(t,e){for(var i in e)t[i]=e[i];return t},i.modulo=function(t,e){return(t%e+e)%e};var o=Array.prototype.slice;i.makeArray=function(t){if(Array.isArray(t))return t;if(null===t||void 0===t)return[];var e="object"==typeof t&&"number"==typeof t.length;return e?o.call(t):[t]},i.removeFrom=function(t,e){var i=t.indexOf(e);i!=-1&&t.splice(i,1)},i.getParent=function(t,i){for(;t.parentNode&&t!=document.body;)if(t=t.parentNode,e(t,i))return t},i.getQueryElement=function(t){return"string"==typeof t?document.querySelector(t):t},i.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},i.filterFindElements=function(t,o){t=i.makeArray(t);var n=[];return t.forEach(function(t){if(t instanceof HTMLElement){if(!o)return void n.push(t);e(t,o)&&n.push(t);for(var i=t.querySelectorAll(o),s=0;s<i.length;s++)n.push(i[s])}}),n},i.debounceMethod=function(t,e,i){i=i||100;var o=t.prototype[e],n=e+"Timeout";t.prototype[e]=function(){var t=this[n];clearTimeout(t);var e=arguments,s=this;this[n]=setTimeout(function(){o.apply(s,e),delete s[n]},i)}},i.docReady=function(t){var e=document.readyState;"complete"==e||"interactive"==e?setTimeout(t):document.addEventListener("DOMContentLoaded",t)},i.toDashed=function(t){return t.replace(/(.)([A-Z])/g,function(t,e,i){return e+"-"+i}).toLowerCase()};var n=t.console;return i.htmlInit=function(e,o){i.docReady(function(){var s=i.toDashed(o),r="data-"+s,a=document.querySelectorAll("["+r+"]"),u=document.querySelectorAll(".js-"+s),h=i.makeArray(a).concat(i.makeArray(u)),d=r+"-options",l=t.jQuery;h.forEach(function(t){var i,s=t.getAttribute(r)||t.getAttribute(d);try{i=s&&JSON.parse(s)}catch(a){return void(n&&n.error("Error parsing "+r+" on "+t.className+": "+a))}var u=new e(t,i);l&&l.data(t,o,u)})})},i}),function(t,e){"function"==typeof define&&define.amd?define("outlayer/item",["ev-emitter/ev-emitter","get-size/get-size"],e):"object"==typeof module&&module.exports?module.exports=e(require("ev-emitter"),require("get-size")):(t.Outlayer={},t.Outlayer.Item=e(t.EvEmitter,t.getSize))}(window,function(t,e){"use strict";function i(t){for(var e in t)return!1;return e=null,!0}function o(t,e){t&&(this.element=t,this.layout=e,this.position={x:0,y:0},this._create())}function n(t){return t.replace(/([A-Z])/g,function(t){return"-"+t.toLowerCase()})}var s=document.documentElement.style,r="string"==typeof s.transition?"transition":"WebkitTransition",a="string"==typeof s.transform?"transform":"WebkitTransform",u={WebkitTransition:"webkitTransitionEnd",transition:"transitionend"}[r],h={transform:a,transition:r,transitionDuration:r+"Duration",transitionProperty:r+"Property",transitionDelay:r+"Delay"},d=o.prototype=Object.create(t.prototype);d.constructor=o,d._create=function(){this._transn={ingProperties:{},clean:{},onEnd:{}},this.css({position:"absolute"})},d.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},d.getSize=function(){this.size=e(this.element)},d.css=function(t){var e=this.element.style;for(var i in t){var o=h[i]||i;e[o]=t[i]}},d.getPosition=function(){var t=getComputedStyle(this.element),e=this.layout._getOption("originLeft"),i=this.layout._getOption("originTop"),o=t[e?"left":"right"],n=t[i?"top":"bottom"],s=parseFloat(o),r=parseFloat(n),a=this.layout.size;o.indexOf("%")!=-1&&(s=s/100*a.width),n.indexOf("%")!=-1&&(r=r/100*a.height),s=isNaN(s)?0:s,r=isNaN(r)?0:r,s-=e?a.paddingLeft:a.paddingRight,r-=i?a.paddingTop:a.paddingBottom,this.position.x=s,this.position.y=r},d.layoutPosition=function(){var t=this.layout.size,e={},i=this.layout._getOption("originLeft"),o=this.layout._getOption("originTop"),n=i?"paddingLeft":"paddingRight",s=i?"left":"right",r=i?"right":"left",a=this.position.x+t[n];e[s]=this.getXValue(a),e[r]="";var u=o?"paddingTop":"paddingBottom",h=o?"top":"bottom",d=o?"bottom":"top",l=this.position.y+t[u];e[h]=this.getYValue(l),e[d]="",this.css(e),this.emitEvent("layout",[this])},d.getXValue=function(t){var e=this.layout._getOption("horizontal");return this.layout.options.percentPosition&&!e?t/this.layout.size.width*100+"%":t+"px"},d.getYValue=function(t){var e=this.layout._getOption("horizontal");return this.layout.options.percentPosition&&e?t/this.layout.size.height*100+"%":t+"px"},d._transitionTo=function(t,e){this.getPosition();var i=this.position.x,o=this.position.y,n=t==this.position.x&&e==this.position.y;if(this.setPosition(t,e),n&&!this.isTransitioning)return void this.layoutPosition();var s=t-i,r=e-o,a={};a.transform=this.getTranslate(s,r),this.transition({to:a,onTransitionEnd:{transform:this.layoutPosition},isCleaning:!0})},d.getTranslate=function(t,e){var i=this.layout._getOption("originLeft"),o=this.layout._getOption("originTop");return t=i?t:-t,e=o?e:-e,"translate3d("+t+"px, "+e+"px, 0)"},d.goTo=function(t,e){this.setPosition(t,e),this.layoutPosition()},d.moveTo=d._transitionTo,d.setPosition=function(t,e){this.position.x=parseFloat(t),this.position.y=parseFloat(e)},d._nonTransition=function(t){this.css(t.to),t.isCleaning&&this._removeStyles(t.to);for(var e in t.onTransitionEnd)t.onTransitionEnd[e].call(this)},d.transition=function(t){if(!parseFloat(this.layout.options.transitionDuration))return void this._nonTransition(t);var e=this._transn;for(var i in t.onTransitionEnd)e.onEnd[i]=t.onTransitionEnd[i];for(i in t.to)e.ingProperties[i]=!0,t.isCleaning&&(e.clean[i]=!0);if(t.from){this.css(t.from);var o=this.element.offsetHeight;o=null}this.enableTransition(t.to),this.css(t.to),this.isTransitioning=!0};var l="opacity,"+n(a);d.enableTransition=function(){if(!this.isTransitioning){var t=this.layout.options.transitionDuration;t="number"==typeof t?t+"ms":t,this.css({transitionProperty:l,transitionDuration:t,transitionDelay:this.staggerDelay||0}),this.element.addEventListener(u,this,!1)}},d.onwebkitTransitionEnd=function(t){this.ontransitionend(t)},d.onotransitionend=function(t){this.ontransitionend(t)};var f={"-webkit-transform":"transform"};d.ontransitionend=function(t){if(t.target===this.element){var e=this._transn,o=f[t.propertyName]||t.propertyName;if(delete e.ingProperties[o],i(e.ingProperties)&&this.disableTransition(),o in e.clean&&(this.element.style[t.propertyName]="",delete e.clean[o]),o in e.onEnd){var n=e.onEnd[o];n.call(this),delete e.onEnd[o]}this.emitEvent("transitionEnd",[this])}},d.disableTransition=function(){this.removeTransitionStyles(),this.element.removeEventListener(u,this,!1),this.isTransitioning=!1},d._removeStyles=function(t){var e={};for(var i in t)e[i]="";this.css(e)};var c={transitionProperty:"",transitionDuration:"",transitionDelay:""};return d.removeTransitionStyles=function(){this.css(c)},d.stagger=function(t){t=isNaN(t)?0:t,this.staggerDelay=t+"ms"},d.removeElem=function(){this.element.parentNode.removeChild(this.element),this.css({display:""}),this.emitEvent("remove",[this])},d.remove=function(){return r&&parseFloat(this.layout.options.transitionDuration)?(this.once("transitionEnd",function(){this.removeElem()}),void this.hide()):void this.removeElem()},d.reveal=function(){delete this.isHidden,this.css({display:""});var t=this.layout.options,e={},i=this.getHideRevealTransitionEndProperty("visibleStyle");e[i]=this.onRevealTransitionEnd,this.transition({from:t.hiddenStyle,to:t.visibleStyle,isCleaning:!0,onTransitionEnd:e})},d.onRevealTransitionEnd=function(){this.isHidden||this.emitEvent("reveal")},d.getHideRevealTransitionEndProperty=function(t){var e=this.layout.options[t];if(e.opacity)return"opacity";for(var i in e)return i},d.hide=function(){this.isHidden=!0,this.css({display:""});var t=this.layout.options,e={},i=this.getHideRevealTransitionEndProperty("hiddenStyle");e[i]=this.onHideTransitionEnd,this.transition({from:t.visibleStyle,to:t.hiddenStyle,isCleaning:!0,onTransitionEnd:e})},d.onHideTransitionEnd=function(){this.isHidden&&(this.css({display:"none"}),this.emitEvent("hide"))},d.destroy=function(){this.css({position:"",left:"",right:"",top:"",bottom:"",transition:"",transform:""})},o}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("outlayer/outlayer",["ev-emitter/ev-emitter","get-size/get-size","fizzy-ui-utils/utils","./item"],function(i,o,n,s){return e(t,i,o,n,s)}):"object"==typeof module&&module.exports?module.exports=e(t,require("ev-emitter"),require("get-size"),require("fizzy-ui-utils"),require("./item")):t.Outlayer=e(t,t.EvEmitter,t.getSize,t.fizzyUIUtils,t.Outlayer.Item)}(window,function(t,e,i,o,n){"use strict";function s(t,e){var i=o.getQueryElement(t);if(!i)return void(u&&u.error("Bad element for "+this.constructor.namespace+": "+(i||t)));this.element=i,h&&(this.$element=h(this.element)),this.options=o.extend({},this.constructor.defaults),this.option(e);var n=++l;this.element.outlayerGUID=n,f[n]=this,this._create();var s=this._getOption("initLayout");s&&this.layout()}function r(t){function e(){t.apply(this,arguments)}return e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e}function a(t){if("number"==typeof t)return t;var e=t.match(/(^\d*\.?\d*)(\w*)/),i=e&&e[1],o=e&&e[2];if(!i.length)return 0;i=parseFloat(i);var n=m[o]||1;return i*n}var u=t.console,h=t.jQuery,d=function(){},l=0,f={};s.namespace="outlayer",s.Item=n,s.defaults={containerStyle:{position:"relative"},initLayout:!0,originLeft:!0,originTop:!0,resize:!0,resizeContainer:!0,transitionDuration:"0.4s",hiddenStyle:{opacity:0,transform:"scale(0.001)"},visibleStyle:{opacity:1,transform:"scale(1)"}};var c=s.prototype;o.extend(c,e.prototype),c.option=function(t){o.extend(this.options,t)},c._getOption=function(t){var e=this.constructor.compatOptions[t];return e&&void 0!==this.options[e]?this.options[e]:this.options[t]},s.compatOptions={initLayout:"isInitLayout",horizontal:"isHorizontal",layoutInstant:"isLayoutInstant",originLeft:"isOriginLeft",originTop:"isOriginTop",resize:"isResizeBound",resizeContainer:"isResizingContainer"},c._create=function(){this.reloadItems(),this.stamps=[],this.stamp(this.options.stamp),o.extend(this.element.style,this.options.containerStyle);var t=this._getOption("resize");t&&this.bindResize()},c.reloadItems=function(){this.items=this._itemize(this.element.children)},c._itemize=function(t){for(var e=this._filterFindItemElements(t),i=this.constructor.Item,o=[],n=0;n<e.length;n++){var s=e[n],r=new i(s,this);o.push(r)}return o},c._filterFindItemElements=function(t){return o.filterFindElements(t,this.options.itemSelector)},c.getItemElements=function(){return this.items.map(function(t){return t.element})},c.layout=function(){this._resetLayout(),this._manageStamps();var t=this._getOption("layoutInstant"),e=void 0!==t?t:!this._isLayoutInited;this.layoutItems(this.items,e),this._isLayoutInited=!0},c._init=c.layout,c._resetLayout=function(){this.getSize()},c.getSize=function(){this.size=i(this.element)},c._getMeasurement=function(t,e){var o,n=this.options[t];n?("string"==typeof n?o=this.element.querySelector(n):n instanceof HTMLElement&&(o=n),this[t]=o?i(o)[e]:n):this[t]=0},c.layoutItems=function(t,e){t=this._getItemsForLayout(t),this._layoutItems(t,e),this._postLayout()},c._getItemsForLayout=function(t){return t.filter(function(t){return!t.isIgnored})},c._layoutItems=function(t,e){if(this._emitCompleteOnItems("layout",t),t&&t.length){var i=[];t.forEach(function(t){var o=this._getItemLayoutPosition(t);o.item=t,o.isInstant=e||t.isLayoutInstant,i.push(o)},this),this._processLayoutQueue(i)}},c._getItemLayoutPosition=function(){return{x:0,y:0}},c._processLayoutQueue=function(t){this.updateStagger(),t.forEach(function(t,e){this._positionItem(t.item,t.x,t.y,t.isInstant,e)},this)},c.updateStagger=function(){var t=this.options.stagger;return null===t||void 0===t?void(this.stagger=0):(this.stagger=a(t),this.stagger)},c._positionItem=function(t,e,i,o,n){o?t.goTo(e,i):(t.stagger(n*this.stagger),t.moveTo(e,i))},c._postLayout=function(){this.resizeContainer()},c.resizeContainer=function(){var t=this._getOption("resizeContainer");if(t){var e=this._getContainerSize();e&&(this._setContainerMeasure(e.width,!0),this._setContainerMeasure(e.height,!1))}},c._getContainerSize=d,c._setContainerMeasure=function(t,e){if(void 0!==t){var i=this.size;i.isBorderBox&&(t+=e?i.paddingLeft+i.paddingRight+i.borderLeftWidth+i.borderRightWidth:i.paddingBottom+i.paddingTop+i.borderTopWidth+i.borderBottomWidth),t=Math.max(t,0),this.element.style[e?"width":"height"]=t+"px"}},c._emitCompleteOnItems=function(t,e){function i(){n.dispatchEvent(t+"Complete",null,[e])}function o(){r++,r==s&&i()}var n=this,s=e.length;if(!e||!s)return void i();var r=0;e.forEach(function(e){e.once(t,o)})},c.dispatchEvent=function(t,e,i){var o=e?[e].concat(i):i;if(this.emitEvent(t,o),h)if(this.$element=this.$element||h(this.element),e){var n=h.Event(e);n.type=t,this.$element.trigger(n,i)}else this.$element.trigger(t,i)},c.ignore=function(t){var e=this.getItem(t);e&&(e.isIgnored=!0)},c.unignore=function(t){var e=this.getItem(t);e&&delete e.isIgnored},c.stamp=function(t){t=this._find(t),t&&(this.stamps=this.stamps.concat(t),t.forEach(this.ignore,this))},c.unstamp=function(t){t=this._find(t),t&&t.forEach(function(t){o.removeFrom(this.stamps,t),this.unignore(t)},this)},c._find=function(t){if(t)return"string"==typeof t&&(t=this.element.querySelectorAll(t)),t=o.makeArray(t)},c._manageStamps=function(){this.stamps&&this.stamps.length&&(this._getBoundingRect(),this.stamps.forEach(this._manageStamp,this))},c._getBoundingRect=function(){var t=this.element.getBoundingClientRect(),e=this.size;this._boundingRect={left:t.left+e.paddingLeft+e.borderLeftWidth,top:t.top+e.paddingTop+e.borderTopWidth,right:t.right-(e.paddingRight+e.borderRightWidth),bottom:t.bottom-(e.paddingBottom+e.borderBottomWidth)}},c._manageStamp=d,c._getElementOffset=function(t){var e=t.getBoundingClientRect(),o=this._boundingRect,n=i(t),s={left:e.left-o.left-n.marginLeft,top:e.top-o.top-n.marginTop,right:o.right-e.right-n.marginRight,bottom:o.bottom-e.bottom-n.marginBottom};return s},c.handleEvent=o.handleEvent,c.bindResize=function(){t.addEventListener("resize",this),this.isResizeBound=!0},c.unbindResize=function(){t.removeEventListener("resize",this),this.isResizeBound=!1},c.onresize=function(){this.resize()},o.debounceMethod(s,"onresize",100),c.resize=function(){this.isResizeBound&&this.needsResizeLayout()&&this.layout()},c.needsResizeLayout=function(){var t=i(this.element),e=this.size&&t;return e&&t.innerWidth!==this.size.innerWidth},c.addItems=function(t){var e=this._itemize(t);return e.length&&(this.items=this.items.concat(e)),e},c.appended=function(t){var e=this.addItems(t);e.length&&(this.layoutItems(e,!0),this.reveal(e))},c.prepended=function(t){var e=this._itemize(t);if(e.length){var i=this.items.slice(0);this.items=e.concat(i),this._resetLayout(),this._manageStamps(),this.layoutItems(e,!0),this.reveal(e),this.layoutItems(i)}},c.reveal=function(t){if(this._emitCompleteOnItems("reveal",t),t&&t.length){var e=this.updateStagger();t.forEach(function(t,i){t.stagger(i*e),t.reveal()})}},c.hide=function(t){if(this._emitCompleteOnItems("hide",t),t&&t.length){var e=this.updateStagger();t.forEach(function(t,i){t.stagger(i*e),t.hide()})}},c.revealItemElements=function(t){var e=this.getItems(t);this.reveal(e)},c.hideItemElements=function(t){var e=this.getItems(t);this.hide(e)},c.getItem=function(t){for(var e=0;e<this.items.length;e++){var i=this.items[e];if(i.element==t)return i}},c.getItems=function(t){t=o.makeArray(t);var e=[];return t.forEach(function(t){var i=this.getItem(t);i&&e.push(i)},this),e},c.remove=function(t){var e=this.getItems(t);this._emitCompleteOnItems("remove",e),e&&e.length&&e.forEach(function(t){t.remove(),o.removeFrom(this.items,t)},this)},c.destroy=function(){var t=this.element.style;t.height="",t.position="",t.width="",this.items.forEach(function(t){t.destroy()}),this.unbindResize();var e=this.element.outlayerGUID;delete f[e],delete this.element.outlayerGUID,h&&h.removeData(this.element,this.constructor.namespace)},s.data=function(t){t=o.getQueryElement(t);var e=t&&t.outlayerGUID;return e&&f[e]},s.create=function(t,e){var i=r(s);return i.defaults=o.extend({},s.defaults),o.extend(i.defaults,e),i.compatOptions=o.extend({},s.compatOptions),i.namespace=t,i.data=s.data,i.Item=r(n),o.htmlInit(i,t),h&&h.bridget&&h.bridget(t,i),i};var m={ms:1,s:1e3};return s.Item=n,s}),function(t,e){"function"==typeof define&&define.amd?define("isotope-layout/js/item",["outlayer/outlayer"],e):"object"==typeof module&&module.exports?module.exports=e(require("outlayer")):(t.Isotope=t.Isotope||{},t.Isotope.Item=e(t.Outlayer))}(window,function(t){"use strict";function e(){t.Item.apply(this,arguments)}var i=e.prototype=Object.create(t.Item.prototype),o=i._create;i._create=function(){this.id=this.layout.itemGUID++,o.call(this),this.sortData={}},i.updateSortData=function(){if(!this.isIgnored){this.sortData.id=this.id,this.sortData["original-order"]=this.id,this.sortData.random=Math.random();var t=this.layout.options.getSortData,e=this.layout._sorters;for(var i in t){var o=e[i];this.sortData[i]=o(this.element,this)}}};var n=i.destroy;return i.destroy=function(){n.apply(this,arguments),this.css({display:""})},e}),function(t,e){"function"==typeof define&&define.amd?define("isotope-layout/js/layout-mode",["get-size/get-size","outlayer/outlayer"],e):"object"==typeof module&&module.exports?module.exports=e(require("get-size"),require("outlayer")):(t.Isotope=t.Isotope||{},t.Isotope.LayoutMode=e(t.getSize,t.Outlayer))}(window,function(t,e){"use strict";function i(t){this.isotope=t,t&&(this.options=t.options[this.namespace],this.element=t.element,this.items=t.filteredItems,this.size=t.size)}var o=i.prototype,n=["_resetLayout","_getItemLayoutPosition","_manageStamp","_getContainerSize","_getElementOffset","needsResizeLayout","_getOption"];return n.forEach(function(t){o[t]=function(){return e.prototype[t].apply(this.isotope,arguments)}}),o.needsVerticalResizeLayout=function(){var e=t(this.isotope.element),i=this.isotope.size&&e;return i&&e.innerHeight!=this.isotope.size.innerHeight},o._getMeasurement=function(){this.isotope._getMeasurement.apply(this,arguments)},o.getColumnWidth=function(){this.getSegmentSize("column","Width")},o.getRowHeight=function(){this.getSegmentSize("row","Height")},o.getSegmentSize=function(t,e){var i=t+e,o="outer"+e;if(this._getMeasurement(i,o),!this[i]){var n=this.getFirstItemSize();this[i]=n&&n[o]||this.isotope.size["inner"+e]}},o.getFirstItemSize=function(){var e=this.isotope.filteredItems[0];return e&&e.element&&t(e.element)},o.layout=function(){this.isotope.layout.apply(this.isotope,arguments)},o.getSize=function(){this.isotope.getSize(),this.size=this.isotope.size},i.modes={},i.create=function(t,e){function n(){i.apply(this,arguments)}return n.prototype=Object.create(o),n.prototype.constructor=n,e&&(n.options=e),n.prototype.namespace=t,i.modes[t]=n,n},i}),function(t,e){"function"==typeof define&&define.amd?define("masonry-layout/masonry",["outlayer/outlayer","get-size/get-size"],e):"object"==typeof module&&module.exports?module.exports=e(require("outlayer"),require("get-size")):t.Masonry=e(t.Outlayer,t.getSize)}(window,function(t,e){var i=t.create("masonry");i.compatOptions.fitWidth="isFitWidth";var o=i.prototype;return o._resetLayout=function(){this.getSize(),this._getMeasurement("columnWidth","outerWidth"),this._getMeasurement("gutter","outerWidth"),this.measureColumns(),this.colYs=[];for(var t=0;t<this.cols;t++)this.colYs.push(0);this.maxY=0,this.horizontalColIndex=0},o.measureColumns=function(){if(this.getContainerWidth(),!this.columnWidth){var t=this.items[0],i=t&&t.element;this.columnWidth=i&&e(i).outerWidth||this.containerWidth}var o=this.columnWidth+=this.gutter,n=this.containerWidth+this.gutter,s=n/o,r=o-n%o,a=r&&r<1?"round":"floor";s=Math[a](s),this.cols=Math.max(s,1)},o.getContainerWidth=function(){var t=this._getOption("fitWidth"),i=t?this.element.parentNode:this.element,o=e(i);this.containerWidth=o&&o.innerWidth},o._getItemLayoutPosition=function(t){t.getSize();var e=t.size.outerWidth%this.columnWidth,i=e&&e<1?"round":"ceil",o=Math[i](t.size.outerWidth/this.columnWidth);o=Math.min(o,this.cols);for(var n=this.options.horizontalOrder?"_getHorizontalColPosition":"_getTopColPosition",s=this[n](o,t),r={x:this.columnWidth*s.col,y:s.y},a=s.y+t.size.outerHeight,u=o+s.col,h=s.col;h<u;h++)this.colYs[h]=a;return r},o._getTopColPosition=function(t){var e=this._getTopColGroup(t),i=Math.min.apply(Math,e);return{col:e.indexOf(i),y:i}},o._getTopColGroup=function(t){if(t<2)return this.colYs;for(var e=[],i=this.cols+1-t,o=0;o<i;o++)e[o]=this._getColGroupY(o,t);return e},o._getColGroupY=function(t,e){if(e<2)return this.colYs[t];var i=this.colYs.slice(t,t+e);return Math.max.apply(Math,i)},o._getHorizontalColPosition=function(t,e){var i=this.horizontalColIndex%this.cols,o=t>1&&i+t>this.cols;i=o?0:i;var n=e.size.outerWidth&&e.size.outerHeight;return this.horizontalColIndex=n?i+t:this.horizontalColIndex,{col:i,y:this._getColGroupY(i,t)}},o._manageStamp=function(t){var i=e(t),o=this._getElementOffset(t),n=this._getOption("originLeft"),s=n?o.left:o.right,r=s+i.outerWidth,a=Math.floor(s/this.columnWidth);a=Math.max(0,a);var u=Math.floor(r/this.columnWidth);u-=r%this.columnWidth?0:1,u=Math.min(this.cols-1,u);for(var h=this._getOption("originTop"),d=(h?o.top:o.bottom)+i.outerHeight,l=a;l<=u;l++)this.colYs[l]=Math.max(d,this.colYs[l])},o._getContainerSize=function(){this.maxY=Math.max.apply(Math,this.colYs);var t={height:this.maxY};return this._getOption("fitWidth")&&(t.width=this._getContainerFitWidth()),t},o._getContainerFitWidth=function(){for(var t=0,e=this.cols;--e&&0===this.colYs[e];)t++;return(this.cols-t)*this.columnWidth-this.gutter},o.needsResizeLayout=function(){var t=this.containerWidth;return this.getContainerWidth(),t!=this.containerWidth},i}),function(t,e){"function"==typeof define&&define.amd?define("isotope-layout/js/layout-modes/masonry",["../layout-mode","masonry-layout/masonry"],e):"object"==typeof module&&module.exports?module.exports=e(require("../layout-mode"),require("masonry-layout")):e(t.Isotope.LayoutMode,t.Masonry)}(window,function(t,e){"use strict";var i=t.create("masonry"),o=i.prototype,n={_getElementOffset:!0,layout:!0,_getMeasurement:!0};for(var s in e.prototype)n[s]||(o[s]=e.prototype[s]);var r=o.measureColumns;o.measureColumns=function(){this.items=this.isotope.filteredItems,r.call(this)};var a=o._getOption;return o._getOption=function(t){return"fitWidth"==t?void 0!==this.options.isFitWidth?this.options.isFitWidth:this.options.fitWidth:a.apply(this.isotope,arguments)},i}),function(t,e){"function"==typeof define&&define.amd?define("isotope-layout/js/layout-modes/fit-rows",["../layout-mode"],e):"object"==typeof exports?module.exports=e(require("../layout-mode")):e(t.Isotope.LayoutMode)}(window,function(t){"use strict";var e=t.create("fitRows"),i=e.prototype;return i._resetLayout=function(){this.x=0,this.y=0,this.maxY=0,this._getMeasurement("gutter","outerWidth")},i._getItemLayoutPosition=function(t){t.getSize();var e=t.size.outerWidth+this.gutter,i=this.isotope.size.innerWidth+this.gutter;0!==this.x&&e+this.x>i&&(this.x=0,this.y=this.maxY);var o={x:this.x,y:this.y};return this.maxY=Math.max(this.maxY,this.y+t.size.outerHeight),this.x+=e,o},i._getContainerSize=function(){return{height:this.maxY}},e}),function(t,e){"function"==typeof define&&define.amd?define("isotope-layout/js/layout-modes/vertical",["../layout-mode"],e):"object"==typeof module&&module.exports?module.exports=e(require("../layout-mode")):e(t.Isotope.LayoutMode)}(window,function(t){"use strict";var e=t.create("vertical",{horizontalAlignment:0}),i=e.prototype;return i._resetLayout=function(){this.y=0},i._getItemLayoutPosition=function(t){t.getSize();var e=(this.isotope.size.innerWidth-t.size.outerWidth)*this.options.horizontalAlignment,i=this.y;return this.y+=t.size.outerHeight,{x:e,y:i}},i._getContainerSize=function(){return{height:this.y}},e}),function(t,e){"function"==typeof define&&define.amd?define(["outlayer/outlayer","get-size/get-size","desandro-matches-selector/matches-selector","fizzy-ui-utils/utils","isotope-layout/js/item","isotope-layout/js/layout-mode","isotope-layout/js/layout-modes/masonry","isotope-layout/js/layout-modes/fit-rows","isotope-layout/js/layout-modes/vertical"],function(i,o,n,s,r,a){return e(t,i,o,n,s,r,a)}):"object"==typeof module&&module.exports?module.exports=e(t,require("outlayer"),require("get-size"),require("desandro-matches-selector"),require("fizzy-ui-utils"),require("isotope-layout/js/item"),require("isotope-layout/js/layout-mode"),require("isotope-layout/js/layout-modes/masonry"),require("isotope-layout/js/layout-modes/fit-rows"),require("isotope-layout/js/layout-modes/vertical")):t.Isotope=e(t,t.Outlayer,t.getSize,t.matchesSelector,t.fizzyUIUtils,t.Isotope.Item,t.Isotope.LayoutMode)}(window,function(t,e,i,o,n,s,r){function a(t,e){return function(i,o){for(var n=0;n<t.length;n++){var s=t[n],r=i.sortData[s],a=o.sortData[s];if(r>a||r<a){var u=void 0!==e[s]?e[s]:e,h=u?1:-1;return(r>a?1:-1)*h}}return 0}}var u=t.jQuery,h=String.prototype.trim?function(t){return t.trim()}:function(t){return t.replace(/^\s+|\s+$/g,"")},d=e.create("isotope",{layoutMode:"masonry",isJQueryFiltering:!0,sortAscending:!0});d.Item=s,d.LayoutMode=r;var l=d.prototype;l._create=function(){this.itemGUID=0,this._sorters={},this._getSorters(),e.prototype._create.call(this),this.modes={},this.filteredItems=this.items,this.sortHistory=["original-order"];for(var t in r.modes)this._initLayoutMode(t)},l.reloadItems=function(){this.itemGUID=0,e.prototype.reloadItems.call(this)},l._itemize=function(){for(var t=e.prototype._itemize.apply(this,arguments),i=0;i<t.length;i++){var o=t[i];o.id=this.itemGUID++}return this._updateItemsSortData(t),t},l._initLayoutMode=function(t){var e=r.modes[t],i=this.options[t]||{};this.options[t]=e.options?n.extend(e.options,i):i,this.modes[t]=new e(this)},l.layout=function(){return!this._isLayoutInited&&this._getOption("initLayout")?void this.arrange():void this._layout()},l._layout=function(){var t=this._getIsInstant();this._resetLayout(),this._manageStamps(),this.layoutItems(this.filteredItems,t),this._isLayoutInited=!0},l.arrange=function(t){this.option(t),this._getIsInstant();var e=this._filter(this.items);this.filteredItems=e.matches,this._bindArrangeComplete(),this._isInstant?this._noTransition(this._hideReveal,[e]):this._hideReveal(e),this._sort(),this._layout()},l._init=l.arrange,l._hideReveal=function(t){this.reveal(t.needReveal),this.hide(t.needHide)},l._getIsInstant=function(){var t=this._getOption("layoutInstant"),e=void 0!==t?t:!this._isLayoutInited;return this._isInstant=e,e},l._bindArrangeComplete=function(){function t(){e&&i&&o&&n.dispatchEvent("arrangeComplete",null,[n.filteredItems])}var e,i,o,n=this;this.once("layoutComplete",function(){e=!0,t()}),this.once("hideComplete",function(){i=!0,t()}),this.once("revealComplete",function(){o=!0,t()})},l._filter=function(t){var e=this.options.filter;e=e||"*";for(var i=[],o=[],n=[],s=this._getFilterTest(e),r=0;r<t.length;r++){var a=t[r];if(!a.isIgnored){var u=s(a);u&&i.push(a),u&&a.isHidden?o.push(a):u||a.isHidden||n.push(a)}}return{matches:i,needReveal:o,needHide:n}},l._getFilterTest=function(t){return u&&this.options.isJQueryFiltering?function(e){return u(e.element).is(t);
}:"function"==typeof t?function(e){return t(e.element)}:function(e){return o(e.element,t)}},l.updateSortData=function(t){var e;t?(t=n.makeArray(t),e=this.getItems(t)):e=this.items,this._getSorters(),this._updateItemsSortData(e)},l._getSorters=function(){var t=this.options.getSortData;for(var e in t){var i=t[e];this._sorters[e]=f(i)}},l._updateItemsSortData=function(t){for(var e=t&&t.length,i=0;e&&i<e;i++){var o=t[i];o.updateSortData()}};var f=function(){function t(t){if("string"!=typeof t)return t;var i=h(t).split(" "),o=i[0],n=o.match(/^\[(.+)\]$/),s=n&&n[1],r=e(s,o),a=d.sortDataParsers[i[1]];return t=a?function(t){return t&&a(r(t))}:function(t){return t&&r(t)}}function e(t,e){return t?function(e){return e.getAttribute(t)}:function(t){var i=t.querySelector(e);return i&&i.textContent}}return t}();d.sortDataParsers={parseInt:function(t){return parseInt(t,10)},parseFloat:function(t){return parseFloat(t)}},l._sort=function(){if(this.options.sortBy){var t=n.makeArray(this.options.sortBy);this._getIsSameSortBy(t)||(this.sortHistory=t.concat(this.sortHistory));var e=a(this.sortHistory,this.options.sortAscending);this.filteredItems.sort(e)}},l._getIsSameSortBy=function(t){for(var e=0;e<t.length;e++)if(t[e]!=this.sortHistory[e])return!1;return!0},l._mode=function(){var t=this.options.layoutMode,e=this.modes[t];if(!e)throw new Error("No layout mode: "+t);return e.options=this.options[t],e},l._resetLayout=function(){e.prototype._resetLayout.call(this),this._mode()._resetLayout()},l._getItemLayoutPosition=function(t){return this._mode()._getItemLayoutPosition(t)},l._manageStamp=function(t){this._mode()._manageStamp(t)},l._getContainerSize=function(){return this._mode()._getContainerSize()},l.needsResizeLayout=function(){return this._mode().needsResizeLayout()},l.appended=function(t){var e=this.addItems(t);if(e.length){var i=this._filterRevealAdded(e);this.filteredItems=this.filteredItems.concat(i)}},l.prepended=function(t){var e=this._itemize(t);if(e.length){this._resetLayout(),this._manageStamps();var i=this._filterRevealAdded(e);this.layoutItems(this.filteredItems),this.filteredItems=i.concat(this.filteredItems),this.items=e.concat(this.items)}},l._filterRevealAdded=function(t){var e=this._filter(t);return this.hide(e.needHide),this.reveal(e.matches),this.layoutItems(e.matches,!0),e.matches},l.insert=function(t){var e=this.addItems(t);if(e.length){var i,o,n=e.length;for(i=0;i<n;i++)o=e[i],this.element.appendChild(o.element);var s=this._filter(e).matches;for(i=0;i<n;i++)e[i].isLayoutInstant=!0;for(this.arrange(),i=0;i<n;i++)delete e[i].isLayoutInstant;this.reveal(s)}};var c=l.remove;return l.remove=function(t){t=n.makeArray(t);var e=this.getItems(t);c.call(this,t);for(var i=e&&e.length,o=0;i&&o<i;o++){var s=e[o];n.removeFrom(this.filteredItems,s)}},l.shuffle=function(){for(var t=0;t<this.items.length;t++){var e=this.items[t];e.sortData.random=Math.random()}this.options.sortBy="random",this._sort(),this._layout()},l._noTransition=function(t,e){var i=this.options.transitionDuration;this.options.transitionDuration=0;var o=t.apply(this,e);return this.options.transitionDuration=i,o},l.getFilteredItemElements=function(){return this.filteredItems.map(function(t){return t.element})},d});
/****** FILE: public/_resources/themes/rirev/javascript/essentials.js *****/
$(document).ready(function () {
    essentials().init();
});

var essentials = function () {
    return {
        isTablet: function () {
            return ($(window).width() <= 1201)
        },

        isPhone: function () {
            return ($(window).width() <= 992)
        },

        isTabletOrPhone: function () {
            return ($(window).width() <= 1201)
        },

        init: function () {
            essentials().global().init();
        },

        global: function () {
            return {
                init: function () {
                    // essentials().global().scrollReveal();
                    essentials().global().tooltips();
                },

                tooltips: function () {
                    $('body').tooltip({
                        selector: '[data-toggle=tooltip]'
                    });
                },

                scrollReveal: function () {
                    window.sr = ScrollReveal();
                    sr.reveal('.animated', {
                        duration: 1000,
                        delay: 100,
                        scale: 1
                    });
                }
            }
        },

        getFirstObject: function (object) {
            return object[Object.keys(object)[0]]
        }
    };
};

$.fn.exists = function () {
    return jQuery(this).length > 0;
};

String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

/****** FILE: public/_resources/themes/rirev/javascript/util.js *****/
"use strict";
const { PI, cos, sin, abs, sqrt, pow, round, random, atan2 } = Math;
const HALF_PI = 0.5 * PI;
const TAU = 2 * PI;
const TO_RAD = PI / 180;
const floor = n => n | 0;
const rand = n => n * random();
const randIn = (min, max) => rand(max - min) + min;
const randRange = n => n - rand(2 * n);
const fadeIn = (t, m) => t / m;
const fadeOut = (t, m) => (m - t) / m;
const fadeInOut = (t, m) => {
    let hm = 0.5 * m;
    return abs((t + hm) % m - hm) / (hm);
};
const dist = (x1, y1, x2, y2) => sqrt(pow(x2 - x1, 2) + pow(y2 - y1, 2));
const angle = (x1, y1, x2, y2) => atan2(y2 - y1, x2 - x1);
const lerp = (n1, n2, speed) => (1 - speed) * n1 + speed * n2;

// Vector2
"use strict";function _classCallCheck(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function t(t,i){for(var e=0;e<i.length;e++){var n=i[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(i,e,n){return e&&t(i.prototype,e),n&&t(i,n),i}}(),Vector2=function(){function t(i,e){return _classCallCheck(this,t),this.x="number"==typeof i?i:0,this.y="number"==typeof e?e:0,this}return _createClass(t,[{key:"zero",value:function(){return this.x=0,this.y=0,this}},{key:"clone",value:function(){return new t(this.x,this.y)}},{key:"add",value:function(t){return this.x+=t.x||0,this.y+=t.y||0,this}},{key:"addX",value:function(t){return this.x+=t.x||0,this}},{key:"addY",value:function(t){return this.y+=t.y||0,this}},{key:"addScalar",value:function(t){return this.x+=t||0,this.y+=t||0,this}},{key:"addScalarX",value:function(t){return this.x+=t||0,this}},{key:"addScalarY",value:function(t){return this.y+=t||0,this}},{key:"sub",value:function(t){return this.x-=t.x||0,this.y-=t.y||0,this}},{key:"subX",value:function(t){return this.x-=t.x||0,this}},{key:"subY",value:function(t){return this.y-=t.y||0,this}},{key:"subScalar",value:function(t){return this.x-=t||0,this.y-=t||0,this}},{key:"subX",value:function(t){return this.x-=t||0,this}},{key:"subY",value:function(t){return this.y-=t||0,this}},{key:"multiply",value:function(t){return this.x*=t.x||1,this.y*=t.y||1,this}},{key:"multiplyX",value:function(t){return this.x*=t.x||1,this}},{key:"multiplyY",value:function(t){return this.y*=t.y||1,this}},{key:"multiplyScalar",value:function(t){return this.x*=t||1,this.y*=t||1,this}},{key:"multiplyScalarX",value:function(t){return this.x*=t||1,this}},{key:"multiplyScalarY",value:function(t){return this.y*=t||1,this}},{key:"divide",value:function(t){return 0===t.x||0===t.y?void console.log("! Cannot divide by zero !"):(this.x/=t.x||1,this.y/=t.y||1,this)}},{key:"divideX",value:function(t){return 0===t.x?void console.log("! Cannot divide by zero !"):(this.x/=t.x||1,this)}},{key:"divideY",value:function(t){return 0===t.y?void console.log("! Cannot divide by zero !"):(this.y/=t.y||1,this)}},{key:"divideScalar",value:function(t){return 0===t?void console.log("! Cannot divide by zero !"):(this.x/=t||1,this.y/=t||1,this)}},{key:"divideScalarX",value:function(t){return 0===t?void console.log("! Cannot divide by zero !"):(this.x/=t||1,this)}},{key:"divideScalarY",value:function(t){return 0===t?void console.log("! Cannot divide by zero !"):(this.Y/=t||1,this)}},{key:"getMagnitude",value:function(){return Math.sqrt(Math.pow(this.x,2)+Math.pow(this.y,2))}},{key:"normalize",value:function(){this.divideScalar(this.getMagnitude())}},{key:"randomize",value:function(i){return i=i||new t(1,1),this.x=Math.random()*i.x,this.y=Math.random()*i.y,this}},{key:"addRandom",value:function(t){t=t||0,this.x+=t-Math.random()*(2*t),this.y+=t-Math.random()*(2*t)}},{key:"addRandomX",value:function(t){t=t||0,this.x+=t-Math.random()*(2*t)}},{key:"addRandomY",value:function(t){t=t||0,this.y+=t-Math.random()*(2*t)}},{key:"lerp",value:function(t,i){return t=t||this,i=i||.05,this.x=(1-i)*this.x+i*t.x,this.y=(1-i)*this.y+i*t.y,this}},{key:"midpoint",value:function(i){var e=new t(this.x+i.x,this.y+i.y);return e.divideScalar(2),e}},{key:"slope",value:function(t){return(t.y-this.y)/(t.x-this.x)*-1}},{key:"intercept",value:function(t){return console.log(-t*this.x+this.y),-t*this.x+this.y}},{key:"distanceTo",value:function(t){return t=t||this,Math.sqrt(Math.pow(t.x-this.x,2)+Math.pow(t.y-this.y,2))}},{key:"angleTo",value:function(t,i){return t=t||this,"rad"===(i=i||"rad")?Math.atan2(t.y-this.y,t.x-this.x):"deg"===i?180*Math.atan2(t.y-this.y,t.x-this.x)/Math.PI:void 0}}]),t}();
/****** FILE: public/_resources/themes/rirev/javascript/noise.js *****/
!function(){"use strict";var r=.5*(Math.sqrt(3)-1),e=(3-Math.sqrt(3))/6,t=1/6,a=(Math.sqrt(5)-1)/4,o=(5-Math.sqrt(5))/20;function i(r){var e;e="function"==typeof r?r:r?function(){var r=0,e=0,t=0,a=1,o=(i=4022871197,function(r){r=r.toString();for(var e=0;e<r.length;e++){var t=.02519603282416938*(i+=r.charCodeAt(e));t-=i=t>>>0,i=(t*=i)>>>0,i+=4294967296*(t-=i)}return 2.3283064365386963e-10*(i>>>0)});var i;r=o(" "),e=o(" "),t=o(" ");for(var n=0;n<arguments.length;n++)(r-=o(arguments[n]))<0&&(r+=1),(e-=o(arguments[n]))<0&&(e+=1),(t-=o(arguments[n]))<0&&(t+=1);return o=null,function(){var o=2091639*r+2.3283064365386963e-10*a;return r=e,e=t,t=o-(a=0|o)}}(r):Math.random,this.p=n(e),this.perm=new Uint8Array(512),this.permMod12=new Uint8Array(512);for(var t=0;t<512;t++)this.perm[t]=this.p[255&t],this.permMod12[t]=this.perm[t]%12}function n(r){var e,t=new Uint8Array(256);for(e=0;e<256;e++)t[e]=e;for(e=0;e<255;e++){var a=e+~~(r()*(256-e)),o=t[e];t[e]=t[a],t[a]=o}return t}i.prototype={grad3:new Float32Array([1,1,0,-1,1,0,1,-1,0,-1,-1,0,1,0,1,-1,0,1,1,0,-1,-1,0,-1,0,1,1,0,-1,1,0,1,-1,0,-1,-1]),grad4:new Float32Array([0,1,1,1,0,1,1,-1,0,1,-1,1,0,1,-1,-1,0,-1,1,1,0,-1,1,-1,0,-1,-1,1,0,-1,-1,-1,1,0,1,1,1,0,1,-1,1,0,-1,1,1,0,-1,-1,-1,0,1,1,-1,0,1,-1,-1,0,-1,1,-1,0,-1,-1,1,1,0,1,1,1,0,-1,1,-1,0,1,1,-1,0,-1,-1,1,0,1,-1,1,0,-1,-1,-1,0,1,-1,-1,0,-1,1,1,1,0,1,1,-1,0,1,-1,1,0,1,-1,-1,0,-1,1,1,0,-1,1,-1,0,-1,-1,1,0,-1,-1,-1,0]),noise2D:function(t,a){var o,i,n=this.permMod12,f=this.perm,s=this.grad3,v=0,h=0,l=0,u=(t+a)*r,d=Math.floor(t+u),p=Math.floor(a+u),M=(d+p)*e,m=t-(d-M),c=a-(p-M);m>c?(o=1,i=0):(o=0,i=1);var y=m-o+e,w=c-i+e,g=m-1+2*e,A=c-1+2*e,x=255&d,q=255&p,D=.5-m*m-c*c;if(D>=0){var S=3*n[x+f[q]];v=(D*=D)*D*(s[S]*m+s[S+1]*c)}var U=.5-y*y-w*w;if(U>=0){var b=3*n[x+o+f[q+i]];h=(U*=U)*U*(s[b]*y+s[b+1]*w)}var F=.5-g*g-A*A;if(F>=0){var N=3*n[x+1+f[q+1]];l=(F*=F)*F*(s[N]*g+s[N+1]*A)}return 70*(v+h+l)},noise3D:function(r,e,a){var o,i,n,f,s,v,h,l,u,d,p=this.permMod12,M=this.perm,m=this.grad3,c=(r+e+a)*(1/3),y=Math.floor(r+c),w=Math.floor(e+c),g=Math.floor(a+c),A=(y+w+g)*t,x=r-(y-A),q=e-(w-A),D=a-(g-A);x>=q?q>=D?(s=1,v=0,h=0,l=1,u=1,d=0):x>=D?(s=1,v=0,h=0,l=1,u=0,d=1):(s=0,v=0,h=1,l=1,u=0,d=1):q<D?(s=0,v=0,h=1,l=0,u=1,d=1):x<D?(s=0,v=1,h=0,l=0,u=1,d=1):(s=0,v=1,h=0,l=1,u=1,d=0);var S=x-s+t,U=q-v+t,b=D-h+t,F=x-l+2*t,N=q-u+2*t,C=D-d+2*t,P=x-1+.5,T=q-1+.5,_=D-1+.5,j=255&y,k=255&w,z=255&g,B=.6-x*x-q*q-D*D;if(B<0)o=0;else{var E=3*p[j+M[k+M[z]]];o=(B*=B)*B*(m[E]*x+m[E+1]*q+m[E+2]*D)}var G=.6-S*S-U*U-b*b;if(G<0)i=0;else{var H=3*p[j+s+M[k+v+M[z+h]]];i=(G*=G)*G*(m[H]*S+m[H+1]*U+m[H+2]*b)}var I=.6-F*F-N*N-C*C;if(I<0)n=0;else{var J=3*p[j+l+M[k+u+M[z+d]]];n=(I*=I)*I*(m[J]*F+m[J+1]*N+m[J+2]*C)}var K=.6-P*P-T*T-_*_;if(K<0)f=0;else{var L=3*p[j+1+M[k+1+M[z+1]]];f=(K*=K)*K*(m[L]*P+m[L+1]*T+m[L+2]*_)}return 32*(o+i+n+f)},noise4D:function(r,e,t,i){var n,f,s,v,h,l,u,d,p,M,m,c,y,w,g,A,x,q=this.perm,D=this.grad4,S=(r+e+t+i)*a,U=Math.floor(r+S),b=Math.floor(e+S),F=Math.floor(t+S),N=Math.floor(i+S),C=(U+b+F+N)*o,P=r-(U-C),T=e-(b-C),_=t-(F-C),j=i-(N-C),k=0,z=0,B=0,E=0;P>T?k++:z++,P>_?k++:B++,P>j?k++:E++,T>_?z++:B++,T>j?z++:E++,_>j?B++:E++;var G=P-(l=k>=3?1:0)+o,H=T-(u=z>=3?1:0)+o,I=_-(d=B>=3?1:0)+o,J=j-(p=E>=3?1:0)+o,K=P-(M=k>=2?1:0)+2*o,L=T-(m=z>=2?1:0)+2*o,O=_-(c=B>=2?1:0)+2*o,Q=j-(y=E>=2?1:0)+2*o,R=P-(w=k>=1?1:0)+3*o,V=T-(g=z>=1?1:0)+3*o,W=_-(A=B>=1?1:0)+3*o,X=j-(x=E>=1?1:0)+3*o,Y=P-1+4*o,Z=T-1+4*o,$=_-1+4*o,rr=j-1+4*o,er=255&U,tr=255&b,ar=255&F,or=255&N,ir=.6-P*P-T*T-_*_-j*j;if(ir<0)n=0;else{var nr=q[er+q[tr+q[ar+q[or]]]]%32*4;n=(ir*=ir)*ir*(D[nr]*P+D[nr+1]*T+D[nr+2]*_+D[nr+3]*j)}var fr=.6-G*G-H*H-I*I-J*J;if(fr<0)f=0;else{var sr=q[er+l+q[tr+u+q[ar+d+q[or+p]]]]%32*4;f=(fr*=fr)*fr*(D[sr]*G+D[sr+1]*H+D[sr+2]*I+D[sr+3]*J)}var vr=.6-K*K-L*L-O*O-Q*Q;if(vr<0)s=0;else{var hr=q[er+M+q[tr+m+q[ar+c+q[or+y]]]]%32*4;s=(vr*=vr)*vr*(D[hr]*K+D[hr+1]*L+D[hr+2]*O+D[hr+3]*Q)}var lr=.6-R*R-V*V-W*W-X*X;if(lr<0)v=0;else{var ur=q[er+w+q[tr+g+q[ar+A+q[or+x]]]]%32*4;v=(lr*=lr)*lr*(D[ur]*R+D[ur+1]*V+D[ur+2]*W+D[ur+3]*X)}var dr=.6-Y*Y-Z*Z-$*$-rr*rr;if(dr<0)h=0;else{var pr=q[er+1+q[tr+1+q[ar+1+q[or+1]]]]%32*4;h=(dr*=dr)*dr*(D[pr]*Y+D[pr+1]*Z+D[pr+2]*$+D[pr+3]*rr)}return 27*(n+f+s+v+h)}},i._buildPermutationTable=n,"undefined"!=typeof define&&define.amd&&define(function(){return i}),"undefined"!=typeof exports?exports.SimplexNoise=i:"undefined"!=typeof window&&(window.SimplexNoise=i),"undefined"!=typeof module&&(module.exports=i)}();
/****** FILE: public/_resources/themes/rirev/javascript/animationsWithWorkers.js *****/
function animationsWithWorkers(animation) {
    var event;
    var worker;
    var u = navigator.userAgent.toLowerCase();
    if (u.includes('lighthouse') || u.includes('emulated')) return true;

    if (!worker) {
        worker = new Worker('_resources/themes/rirev/javascript/animationsWorker.js');
    }

    var canvas = document.createElement('canvas');
    var message = {
        animation: animation,
        window: {innerWidth: window.innerWidth, innerHeight: window.innerHeight},
        event: event != undefined ? {
            type: event.type,
            clientX: event.clientX,
            clientY: event.clientY
        } : null
    };
    var transferMessage = [];
    if (!event) {

        switch (animation) {
            case 'interactiveDotGrid':
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                $('[data-canvas]').append(canvas);
                canvas = canvas.transferControlToOffscreen();
                message.canvas = canvas;
                transferMessage = [
                    message.canvas // The array buffer we created 9 lines above
                ];
                break;
            case 'swirl':
            case 'coalesce':
            case 'shift':
                canvas = document.createElement('canvas');
                var canvas_b = document.createElement('canvas');
                document.createElement('canvas');

                message.canvas = canvas.transferControlToOffscreen();
                message.canvas_b = canvas_b.transferControlToOffscreen();
                transferMessage = [
                    message.canvas,
                    message.canvas_b,
                ];
                $('[data-canvas]').append(canvas_b);
                break;
            default:
        }
    }
    worker.postMessage(
        message,
        transferMessage
    );

    return worker;
}

/****** FILE: public/_resources/themes/rirev/javascript/animations.js *****/
var animations = function () {
    return {
        interactiveDotGrid: function () {
            Vector2.prototype.repel = function (start, from, base, ex) {
                this.x += ((Math.cos(from.angleTo(this)) * (Math.pow(base, ex) / this.distanceTo(from))) + (start.x - this.x)) * repulsion;
                this.y += ((Math.sin(from.angleTo(this)) * (Math.pow(base, ex) / this.distanceTo(from))) + (start.y - this.y)) * repulsion;
            };

            var container,
                stats,
                canvas,
                ctx,
                osCanvas,
                osCtx,
                rect,
                bgColor = '#000000',
                fontColor = 'transparent',
                pColor = '#ffffff',
                mouse,
                userMouse,
                center,
                hover,
                padding = 0,
                step = 35,
                threshold = 100,
                repulsion = 0.025,
                points = [];

            function mouseHandler(e) {
                hover = e.type === 'mousemove';
                userMouse.x = e.clientX;
                userMouse.y = e.clientY;
            }

            function createGrid() {
                points = [];
                var endX = canvas.width - (padding * 2),
                    endY = canvas.height - (padding * 2),
                    xPoints = endX / step,
                    yPoints = endY / step;

                for (var i = 0; i <= xPoints; i++) {
                    for (var j = 0; j <= yPoints; j++) {
                        points.push({
                            size: 2,
                            position: new Vector2(padding + (i * step), padding + (j * step)),
                            startPosition: new Vector2(padding + (i * step), padding + (j * step)),
                            update: function () {
                                this.position.repel(this.startPosition, mouse, threshold, 2);
                            }
                        });
                    }
                }
            }

            function draw() {
                if (!hover) mouse.lerp(center, 0.015);
                else mouse.lerp(userMouse, 0.15);
                osCtx.fillStyle = bgColor;
                osCtx.fillRect(0, 0, canvas.width, canvas.height);
                for (var i = 0, len = points.length; i < len; i++) {
                    var p = points[i];
                    p.update();
                    osCtx.fillStyle = pColor;
                    osCtx.fillRect(p.position.x - p.size / 2, p.position.y - p.size / 2, p.size, p.size);
                }
                osCtx.fillStyle = fontColor,
                    osCtx.font = '2em Raleway';
                osCtx.fillText(`Particle Count: ${points.length}`, 20, canvas.height - 20);
                ctx.drawImage(osCanvas, 0, 0);
            }

            function loop() {
                draw();
                window.requestAnimationFrame(loop);
            }

            function resize() {
                canvas.width = osCanvas.width = window.innerWidth;
                canvas.height = osCanvas.height = window.innerHeight;

                center = new Vector2(canvas.width / 2, canvas.height / 2);
                mouse = new Vector2(center.x, center.y);
                userMouse = new Vector2(center.x, center.y);
                createGrid();
            }

            function init() {
                container = document.querySelector('.canvas-content');
                canvas = document.createElement('canvas');
                container.appendChild(canvas);

                osCanvas = window.OffscreenCanvas ? new OffscreenCanvas(canvas.width, canvas.height) : document.createElement("canvas");

                ctx = canvas.getContext("2d");
                osCtx = osCanvas.getContext("2d");

                hover = false;

                resize();
                createGrid();
                loop();
            }

            window.requestAnimationFrame = (() => {
                return window.requestAnimationFrame ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame ||
                    window.oRequestAnimationFrame ||
                    window.msRequestAnimationFrame ||
                    function (callback) {
                        window.setTimeout(callback, 1000 / 60);
                    };
            })();

            init();
            window.addEventListener('resize', resize);
            window.addEventListener('mouseout', mouseHandler);
            window.addEventListener('mousemove', mouseHandler);
        },

        coalesce: function () {
            const particleCount = essentials().isTabletOrPhone() ? 500 : 500;
            const particlePropCount = 9;
            const particlePropsLength = particleCount * particlePropCount;
            const baseTTL = 100;
            const rangeTTL = 500;
            const baseSpeed = essentials().isTabletOrPhone() ? 0.05 : 0.05;
            const rangeSpeed = essentials().isTabletOrPhone() ? 0.15 : 0.25;
            const baseSize = 0.5;
            const rangeSize = 6;
            const baseHue = 250;
            const rangeHue = 125;
            const noiseSteps = 2;
            const xOff = 0.0025;
            const yOff = 0.005;
            const zOff = 0.0005;
            const backgroundColor = 'rgba(0,0,0,1)';

            var container;
            var canvas;
            var ctx;
            var center;
            var gradient;
            var tick;
            var particleProps;
            var positions;
            var velocities;
            var lifeSpans;
            var speeds;
            var sizes;
            var hues;

            function setup() {
                createCanvas();
                resize();
                initParticles();
                draw();
            }

            function initParticles() {
                tick = 0;
                particleProps = new Float32Array(particlePropsLength);

                var i;

                for (i = 0; i < particlePropsLength; i += particlePropCount) {
                    initParticle(i);
                }
            }

            function initParticle(i) {
                var theta, x, y, vx, vy, life, ttl, speed, size, hue;

                x = rand(canvas.a.width);
                y = rand(canvas.a.height);
                theta = angle(x, y, center[0], center[1]);
                vx = cos(theta) * 6;
                vy = sin(theta) * 6;
                life = 0;
                ttl = baseTTL + rand(rangeTTL);
                speed = baseSpeed + rand(rangeSpeed);
                size = baseSize + rand(rangeSize);
                hue = baseHue + rand(rangeHue);

                particleProps.set([x, y, vx, vy, life, ttl, speed, size, hue], i);
            }

            function drawParticles() {
                var i;

                for (i = 0; i < particlePropsLength; i += particlePropCount) {
                    updateParticle(i);
                }
            }

            function updateParticle(i) {
                var i2 = 1 + i, i3 = 2 + i, i4 = 3 + i, i5 = 4 + i, i6 = 5 + i, i7 = 6 + i, i8 = 7 + i, i9 = 8 + i;
                var x, y, theta, vx, vy, life, ttl, speed, x2, y2, size, hue;

                x = particleProps[i];
                y = particleProps[i2];
                theta = angle(x, y, center[0], center[1]) + 0.75 * HALF_PI;
                vx = lerp(particleProps[i3], 2 * cos(theta), 0.05);
                vy = lerp(particleProps[i4], 2 * sin(theta), 0.05);
                life = particleProps[i5];
                ttl = particleProps[i6];
                speed = particleProps[i7];
                x2 = x + vx * speed;
                y2 = y + vy * speed;
                size = particleProps[i8];
                hue = particleProps[i9];

                drawParticle(x, y, theta, life, ttl, size, hue);

                life++;

                particleProps[i] = x2;
                particleProps[i2] = y2;
                particleProps[i3] = vx;
                particleProps[i4] = vy;
                particleProps[i5] = life;

                life > ttl && initParticle(i);
            }

            function drawParticle(x, y, theta, life, ttl, size, hue) {
                var xRel = x - (0.5 * size), yRel = y - (0.5 * size);

                ctx.a.save();
                ctx.a.lineCap = 'round';
                ctx.a.lineWidth = 1;
                ctx.a.strokeStyle = `hsla(${hue},100%,60%,${fadeInOut(life, ttl)})`;
                ctx.a.beginPath();
                ctx.a.translate(xRel, yRel);
                ctx.a.rotate(theta);
                ctx.a.translate(-xRel, -yRel);
                ctx.a.strokeRect(xRel, yRel, size, size);
                ctx.a.closePath();
                ctx.a.restore();
            }

            function createCanvas() {
                container = document.querySelector('.canvas-content');
                canvas = {
                    a: document.createElement('canvas'),
                    b: document.createElement('canvas')
                };
                container.appendChild(canvas.b);
                ctx = {
                    a: canvas.a.getContext('2d'),
                    b: canvas.b.getContext('2d')
                };
                center = [];
            }

            function resize() {
                const {innerWidth, innerHeight} = window;

                canvas.a.width = innerWidth;
                canvas.a.height = innerHeight;

                ctx.a.drawImage(canvas.b, 0, 0);

                canvas.b.width = innerWidth;
                canvas.b.height = innerHeight;

                ctx.b.drawImage(canvas.a, 0, 0);

                center[0] = 0.5 * canvas.a.width;
                center[1] = 0.5 * canvas.a.height;
            }

            function renderGlow() {
                ctx.b.save();
                ctx.b.filter = 'blur(8px) brightness(200%)';
                ctx.b.globalCompositeOperation = 'lighter';
                ctx.b.drawImage(canvas.a, 0, 0);
                ctx.b.restore();

                ctx.b.save();
                ctx.b.filter = 'blur(4px) brightness(200%)';
                ctx.b.globalCompositeOperation = 'lighter';
                ctx.b.drawImage(canvas.a, 0, 0);
                ctx.b.restore();
            }

            function render() {
                ctx.b.save();
                ctx.b.globalCompositeOperation = 'lighter';
                ctx.b.drawImage(canvas.a, 0, 0);
                ctx.b.restore();
            }

            function draw() {
                tick++;

                ctx.a.clearRect(0, 0, canvas.a.width, canvas.a.height);

                ctx.b.fillStyle = backgroundColor;
                ctx.b.fillRect(0, 0, canvas.a.width, canvas.a.height);

                drawParticles();
                renderGlow();
                render();

                window.requestAnimationFrame(draw);
            }

            setup();
            window.addEventListener('resize', resize);
        },

        swirl: function () {
            const particleCount = essentials().isTabletOrPhone() ? 550 : 550;
            const particlePropCount = 9;
            const particlePropsLength = particleCount * particlePropCount;
            const rangeY = 450;
            const baseTTL = 50;
            const rangeTTL = 150;
            const baseSpeed = 0.1;
            const rangeSpeed = essentials().isTabletOrPhone() ? 0.5 : 0.5;
            const baseRadius = 1;
            const rangeRadius = 4;
            const baseHue = 200;
            const rangeHue = 125;
            const noiseSteps = 10;
            const xOff = 0.00125;
            const yOff = 0.00125;
            const zOff = 0.0005;
            const backgroundColor = 'rgba(0,0,0,1)';

            var container;
            var canvas;
            var ctx;
            var center;
            var gradient;
            var tick;
            var simplex;
            var particleProps;
            var positions;
            var velocities;
            var lifeSpans;
            var speeds;
            var sizes;
            var hues;

            function setup() {
                createCanvas();
                resize();
                initParticles();
                draw();
            }

            function initParticles() {
                tick = 0;
                simplex = new SimplexNoise();
                particleProps = new Float32Array(particlePropsLength);

                var i;

                for (i = 0; i < particlePropsLength; i += particlePropCount) {
                    initParticle(i);
                }
            }

            function initParticle(i) {
                var x, y, vx, vy, life, ttl, speed, radius, hue;

                x = rand(canvas.a.width);
                y = center[1] + randRange(rangeY);
                vx = 0;
                vy = 0;
                life = 0;
                ttl = baseTTL + rand(rangeTTL);
                speed = baseSpeed + rand(rangeSpeed);
                radius = baseRadius + rand(rangeRadius);
                hue = baseHue + rand(rangeHue);

                particleProps.set([x, y, vx, vy, life, ttl, speed, radius, hue], i);
            }

            function drawParticles() {
                var i;

                for (i = 0; i < particlePropsLength; i += particlePropCount) {
                    updateParticle(i);
                }
            }

            function updateParticle(i) {
                var i2 = 1 + i, i3 = 2 + i, i4 = 3 + i, i5 = 4 + i, i6 = 5 + i, i7 = 6 + i, i8 = 7 + i, i9 = 8 + i;
                var n, x, y, vx, vy, life, ttl, speed, x2, y2, radius, hue;

                x = particleProps[i];
                y = particleProps[i2];
                n = simplex.noise3D(x * xOff, y * yOff, tick * zOff) * noiseSteps * TAU;
                vx = lerp(particleProps[i3], cos(n), 0.5);
                vy = lerp(particleProps[i4], sin(n), 0.5);
                life = particleProps[i5];
                ttl = particleProps[i6];
                speed = particleProps[i7];
                x2 = x + vx * speed;
                y2 = y + vy * speed;
                radius = particleProps[i8];
                hue = particleProps[i9];

                drawParticle(x, y, x2, y2, life, ttl, radius, hue);

                life++;

                particleProps[i] = x2;
                particleProps[i2] = y2;
                particleProps[i3] = vx;
                particleProps[i4] = vy;
                particleProps[i5] = life;

                (checkBounds(x, y) || life > ttl) && initParticle(i);
            }

            function drawParticle(x, y, x2, y2, life, ttl, radius, hue) {
                ctx.a.save();
                ctx.a.lineCap = 'round';
                ctx.a.lineWidth = radius;
                ctx.a.strokeStyle = `hsla(${hue},100%,60%,${fadeInOut(life, ttl)})`;
                ctx.a.beginPath();
                ctx.a.moveTo(x, y);
                ctx.a.lineTo(x2, y2);
                ctx.a.stroke()
                ctx.a.closePath();
                ctx.a.restore();
            }

            function checkBounds(x, y) {
                return (
                    x > canvas.a.width ||
                    x < 0 ||
                    y > canvas.a.height ||
                    y < 0
                );
            }

            function createCanvas() {
                // document.removeChild(document.querySelector('.canvas-content'));

                container = document.querySelector('.canvas-content');
                canvas = {
                    a: document.createElement('canvas'),
                    b: document.createElement('canvas')
                };
                container.appendChild(canvas.b);
                ctx = {
                    a: canvas.a.getContext('2d'),
                    b: canvas.b.getContext('2d')
                };
                center = [];
            }

            function resize() {
                const {innerWidth, innerHeight} = window;

                canvas.a.width = innerWidth;
                canvas.a.height = innerHeight;

                ctx.a.drawImage(canvas.b, 0, 0);

                canvas.b.width = innerWidth;
                canvas.b.height = innerHeight;

                ctx.b.drawImage(canvas.a, 0, 0);

                center[0] = 0.5 * canvas.a.width;
                center[1] = 0.5 * canvas.a.height;
            }

            function renderGlow() {
                ctx.b.save();
                ctx.b.filter = 'blur(8px) brightness(200%)';
                ctx.b.globalCompositeOperation = 'lighter';
                ctx.b.drawImage(canvas.a, 0, 0);
                ctx.b.restore();

                ctx.b.save();
                ctx.b.filter = 'blur(4px) brightness(200%)';
                ctx.b.globalCompositeOperation = 'lighter';
                ctx.b.drawImage(canvas.a, 0, 0);
                ctx.b.restore();
            }

            function renderToScreen() {
                ctx.b.save();
                ctx.b.globalCompositeOperation = 'lighter';
                ctx.b.drawImage(canvas.a, 0, 0);
                ctx.b.restore();
            }

            function draw() {
                tick++;

                ctx.a.clearRect(0, 0, canvas.a.width, canvas.a.height);

                ctx.b.fillStyle = backgroundColor;
                ctx.b.fillRect(0, 0, canvas.a.width, canvas.a.height);

                drawParticles();
                renderGlow();
                renderToScreen();

                window.requestAnimationFrame(draw);
            }

            setup();
            window.addEventListener('resize', resize);
        },

        shift: function () {
            'use strict';

            const circleCount = 150;
            const circlePropCount = 8;
            const circlePropsLength = circleCount * circlePropCount;
            const baseSpeed = 0.1;
            const rangeSpeed = 0.2;
            const baseTTL = 150;
            const rangeTTL = 200;
            const baseRadius = 100;
            const rangeRadius = 200;
            const rangeHue = 60;
            const xOff = 0.0015;
            const yOff = 0.0015;
            const zOff = 0.0015;
            const backgroundColor = 'hsla(260,40%,5%,1)';

            var container;
            var canvas;
            var ctx;
            var circles;
            var circleProps;
            var simplex;
            var baseHue;

            function setup() {
                createCanvas();
                resize();
                initCircles();
                draw();
            }

            function initCircles() {
                circleProps = new Float32Array(circlePropsLength);
                simplex = new SimplexNoise();
                baseHue = 220;

                var i;

                for (i = 0; i < circlePropsLength; i += circlePropCount) {
                    initCircle(i);
                }
            }

            function initCircle(i) {
                var x, y, n, t, speed, vx, vy, life, ttl, radius, hue;

                x = rand(canvas.a.width);
                y = rand(canvas.a.height);
                n = simplex.noise3D(x * xOff, y * yOff, baseHue * zOff);
                t = rand(TAU);
                speed = baseSpeed + rand(rangeSpeed);
                vx = speed * cos(t);
                vy = speed * sin(t);
                life = 0;
                ttl = baseTTL + rand(rangeTTL);
                radius = baseRadius + rand(rangeRadius);
                hue = baseHue + n * rangeHue;

                circleProps.set([x, y, vx, vy, life, ttl, radius, hue], i);
            }

            function updateCircles() {
                var i;

                baseHue++;

                for (i = 0; i < circlePropsLength; i += circlePropCount) {
                    updateCircle(i);
                }
            }

            function updateCircle(i) {
                var i2 = 1 + i, i3 = 2 + i, i4 = 3 + i, i5 = 4 + i, i6 = 5 + i, i7 = 6 + i, i8 = 7 + i;
                var x, y, vx, vy, life, ttl, radius, hue;

                x = circleProps[i];
                y = circleProps[i2];
                vx = circleProps[i3];
                vy = circleProps[i4];
                life = circleProps[i5];
                ttl = circleProps[i6];
                radius = circleProps[i7];
                hue = circleProps[i8];

                drawCircle(x, y, life, ttl, radius, hue);

                life++;

                circleProps[i] = x + vx;
                circleProps[i2] = y + vy;
                circleProps[i5] = life;

                (checkBounds(x, y, radius) || life > ttl) && initCircle(i);
            }

            function drawCircle(x, y, life, ttl, radius, hue) {
                ctx.a.save();
                ctx.a.fillStyle = `hsla(${hue},60%,30%,${fadeInOut(life, ttl)})`;
                ctx.a.beginPath();
                ctx.a.arc(x, y, radius, 0, TAU);
                ctx.a.fill();
                ctx.a.closePath();
                ctx.a.restore();
            }

            function checkBounds(x, y, radius) {
                return (
                    x < -radius ||
                    x > canvas.a.width + radius ||
                    y < -radius ||
                    y > canvas.a.height + radius
                );
            }

            function createCanvas() {
                container = document.querySelector('.canvas-content');
                canvas = {
                    a: document.createElement('canvas'),
                    b: document.createElement('canvas')
                };
                container.appendChild(canvas.b);
                ctx = {
                    a: canvas.a.getContext('2d'),
                    b: canvas.b.getContext('2d')
                };
            }

            function resize() {
                const {innerWidth, innerHeight} = window;

                canvas.a.width = innerWidth;
                canvas.a.height = innerHeight;

                ctx.a.drawImage(canvas.b, 0, 0);

                canvas.b.width = innerWidth;
                canvas.b.height = innerHeight;

                ctx.b.drawImage(canvas.a, 0, 0);
            }

            function render() {
                ctx.b.save();
                ctx.b.filter = 'blur(50px)';
                ctx.b.drawImage(canvas.a, 0, 0);
                ctx.b.restore();
            }

            function draw() {
                ctx.a.clearRect(0, 0, canvas.a.width, canvas.a.height);
                ctx.b.fillStyle = backgroundColor;
                ctx.b.fillRect(0, 0, canvas.b.width, canvas.b.height);
                updateCircles();
                render();
                window.requestAnimationFrame(draw);
            }

            setup();
            window.addEventListener('resize', resize);
        },

        abstract: function () {
            let particles = [];
            let frequency = 200;

            // Popolate particles
            setInterval(
                function () {
                    popolate()
                }.bind(this),
                frequency
            );

            var container = document.querySelector('.canvas-content');
            let tela = document.createElement('canvas');
            tela.width = $(window).width();
            tela.height = $(window).height();
            container.appendChild(tela);

            let canvas = tela.getContext('2d');

            class Particle {
                constructor(canvas, options) {
                    let random = Math.random();
                    this.canvas = canvas;

                    this.x = options.x;
                    this.y = options.y;
                    this.s = (0.5 + Math.random());
                    this.a = 0;
                    this.w = $(window).width();
                    this.h = $(window).height();
                    this.radius = options.radius || 0.5 + Math.random() * 10;
                    this.color = options.color || "#E5483F";

                    setTimeout(function () {
                        if (this.radius > 0.5) {
                            particles.push(
                                new Particle(canvas, {
                                    x: this.x,
                                    y: this.y,
                                    color: this.radius / 2 > 1 ? "#d6433b" : "#FFFFFF",
                                    radius: this.radius / 2.2
                                })
                            )
                        }
                    }.bind(this), 3000)
                }

                render() {
                    this.canvas.beginPath();
                    this.canvas.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
                    this.canvas.lineWidth = 2;
                    this.canvas.fillStyle = this.color;
                    this.canvas.fill();
                    this.canvas.closePath();
                }

                swapColor() {
                    if (this.color != "#FFFFFF") {
                        if (this.x < this.w / 2) {
                            this.color = "#36fcfa"
                        } else {
                            this.color = "#E5483F"
                        }
                    }
                }

                move() {
                    this.swapColor();
                    this.x += Math.cos(this.a) * this.s;
                    this.y += Math.sin(this.a) * this.s;
                    this.a += Math.random() * 0.8 - 0.4;

                    if (this.x < 0 || this.x > this.w - this.radius) {
                        return false
                    }

                    if (this.y < 0 || this.y > this.h - this.radius) {
                        return false
                    }

                    this.render();
                    return true
                }
            }

            /*
             * Function to clear layer canvas
             * @num:number number of particles
             */
            function popolate() {
                particles.push(
                    new Particle(canvas, {
                        x: ($(window).width() / 2),
                        y: ($(window).height() / 2)
                    })
                );
                return particles.length
            }

            function clear() {
                canvas.globalAlpha = 0.04;
                canvas.fillStyle = '#000000';
                canvas.fillRect(0, 0, tela.width, tela.height);
                canvas.globalAlpha = 1;
            }

            function update() {
                particles = particles.filter(function (p) {
                    return p.move()
                });
                clear();
                requestAnimationFrame(update.bind(this))
            }

            update();
        },
    };
};
/****** FILE: public/_resources/themes/rirev/javascript/script.js *****/
$(document).ready(function () {
    // Customer Care
    $('a').smoothScroll({
        offset: -90,
        speed: 500
    });

    // Menu
    $('.hamburger').on('click', function () {
        $(this).toggleClass('is-active');

        if ($(this).hasClass('is-active')) {
            $('.menu-wrapper').stop(true, false).fadeIn('fast', function () {
                $('.menu-wrapper').stop(true, false).animate({
                    'left': essentials().isPhone() ? 0 : '70%'
                }, 'fast', function () {
                });
            });
        } else {
            $('.menu-wrapper').stop(true, false).animate({
                'left': '100%'
            }, 'fast', function () {
                $('.menu-wrapper').stop(true, false).fadeOut('fast');
            });
        }
    });

    $('.menu-wrapper').on('click', function () {
        $('.hamburger').trigger('click');
    });

    // Trigger Navbar
    $(document).trigger('scroll');

    // Video playbackRate
    $('video[data-playback]').each(function () {
        $(this).get(0).playbackRate = $(this).data('playback');
    });

    // Play videos on autoplay on phone
    if (essentials().isTabletOrPhone()) {
        // $('video').attr('autoplay', 'autoplay');
    } else {
        // Play videos on hover on desktop
        $('.video-wrapper-trigger').hover(function () {
            $(this).find('video').get(0).play();
        }, function () {
            $(this).find('video').get(0).pause();
        });
    }

    // Animations
    $('[data-canvas]').each(function () {
        var animation = $(this).data('canvas');

        if (window.Worker && window.OffscreenCanvas && animation != 'interactiveDotGrid' && animation != 'abstract') {
            animationsWithWorkers(animation);
        } else {
            animations()[animation]();
        }
    });

    // Counter
    $('.accelerate-up').counterUp({
        time: 1000,
        offset: 100,
        beginAt: 0,
        again: true,
        ifVisible: true,
        booster: 25,
    });

    // Isotope
    var $grid = $('.grid').isotope({
        itemSelector: '.grid-item',
        stagger: 0,
        transitionDuration: '0s',
        percentPosition: false,
        masonry: {
            columnWidth: '.grid-sizer'
        }
    });
    $grid.imagesLoaded().progress( function() {
        $grid.isotope('layout');
    });
});

$(document).scroll(function () {
    // Navbar
    var $body = $("body");
    var navbarHeight = $('.navbar').height();

    $body.toggleClass('scrolled', $(this).scrollTop() > navbarHeight);
    $('.inverse .navbar .btn').toggleClass('btn-outline-dark', $(this).scrollTop() <= navbarHeight);
    $('.inverse .navbar .btn').toggleClass('btn-outline-light', $(this).scrollTop() > navbarHeight);
});

(function () {
    'use strict';
    window.addEventListener('load', function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();
