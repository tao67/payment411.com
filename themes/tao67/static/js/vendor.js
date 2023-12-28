/*!
 * The MIT License (MIT)
 * Copyright (c) 2018 Mango
 */
!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var e;"undefined"!=typeof window?e=window:"undefined"!=typeof global?e=global:"undefined"!=typeof self&&(e=self),e.Slideout=t()}}(function(){var t,e,n;return function i(t,e,n){function o(r,a){if(!e[r]){if(!t[r]){var u=typeof require=="function"&&require;if(!a&&u)return u(r,!0);if(s)return s(r,!0);var l=new Error("Cannot find module '"+r+"'");throw l.code="MODULE_NOT_FOUND",l}var h=e[r]={exports:{}};t[r][0].call(h.exports,function(e){var n=t[r][1][e];return o(n?n:e)},h,h.exports,i,t,e,n)}return e[r].exports}var s=typeof require=="function"&&require;for(var r=0;r<n.length;r++)o(n[r]);return o}({1:[function(t,e,n){"use strict";var i=t("decouple");var o=t("emitter");var s;var r=false;var a=window.document;var u=a.documentElement;var l=window.navigator.msPointerEnabled;var h={start:l?"MSPointerDown":"touchstart",move:l?"MSPointerMove":"touchmove",end:l?"MSPointerUp":"touchend"};var f=function v(){var t=/^(Webkit|Khtml|Moz|ms|O)(?=[A-Z])/;var e=a.getElementsByTagName("script")[0].style;for(var n in e){if(t.test(n)){return"-"+n.match(t)[0].toLowerCase()+"-"}}if("WebkitOpacity"in e){return"-webkit-"}if("KhtmlOpacity"in e){return"-khtml-"}return""}();function c(t,e){for(var n in e){if(e[n]){t[n]=e[n]}}return t}function p(t,e){t.prototype=c(t.prototype||{},e.prototype)}function d(t){while(t.parentNode){if(t.getAttribute("data-slideout-ignore")!==null){return t}t=t.parentNode}return null}function _(t){t=t||{};this._startOffsetX=0;this._currentOffsetX=0;this._opening=false;this._moved=false;this._opened=false;this._preventOpen=false;this.panel=t.panel;this.menu=t.menu;this._touch=t.touch===undefined?true:t.touch&&true;this._side=t.side||"left";this._easing=t.fx||t.easing||"ease";this._duration=parseInt(t.duration,10)||300;this._tolerance=parseInt(t.tolerance,10)||70;this._padding=this._translateTo=parseInt(t.padding,10)||256;this._orientation=this._side==="right"?-1:1;this._translateTo*=this._orientation;if(!this.panel.classList.contains("slideout-panel")){this.panel.classList.add("slideout-panel")}if(!this.panel.classList.contains("slideout-panel-"+this._side)){this.panel.classList.add("slideout-panel-"+this._side)}if(!this.menu.classList.contains("slideout-menu")){this.menu.classList.add("slideout-menu")}if(!this.menu.classList.contains("slideout-menu-"+this._side)){this.menu.classList.add("slideout-menu-"+this._side)}if(this._touch){this._initTouchEvents()}}p(_,o);_.prototype.open=function(){var t=this;this.emit("beforeopen");if(!u.classList.contains("slideout-open")){u.classList.add("slideout-open")}this._setTransition();this._translateXTo(this._translateTo);this._opened=true;setTimeout(function(){t.panel.style.transition=t.panel.style["-webkit-transition"]="";t.emit("open")},this._duration+50);return this};_.prototype.close=function(){var t=this;if(!this.isOpen()&&!this._opening){return this}this.emit("beforeclose");this._setTransition();this._translateXTo(0);this._opened=false;setTimeout(function(){u.classList.remove("slideout-open");t.panel.style.transition=t.panel.style["-webkit-transition"]=t.panel.style[f+"transform"]=t.panel.style.transform="";t.emit("close")},this._duration+50);return this};_.prototype.toggle=function(){return this.isOpen()?this.close():this.open()};_.prototype.isOpen=function(){return this._opened};_.prototype._translateXTo=function(t){this._currentOffsetX=t;this.panel.style[f+"transform"]=this.panel.style.transform="translateX("+t+"px)";return this};_.prototype._setTransition=function(){this.panel.style[f+"transition"]=this.panel.style.transition=f+"transform "+this._duration+"ms "+this._easing;return this};_.prototype._initTouchEvents=function(){var t=this;this._onScrollFn=i(a,"scroll",function(){if(!t._moved){clearTimeout(s);r=true;s=setTimeout(function(){r=false},250)}});this._preventMove=function(e){if(t._moved){e.preventDefault()}};a.addEventListener(h.move,this._preventMove);this._resetTouchFn=function(e){if(typeof e.touches==="undefined"){return}t._moved=false;t._opening=false;t._startOffsetX=e.touches[0].pageX;t._preventOpen=!t._touch||!t.isOpen()&&t.menu.clientWidth!==0};this.panel.addEventListener(h.start,this._resetTouchFn);this._onTouchCancelFn=function(){t._moved=false;t._opening=false};this.panel.addEventListener("touchcancel",this._onTouchCancelFn);this._onTouchEndFn=function(){if(t._moved){t.emit("translateend");t._opening&&Math.abs(t._currentOffsetX)>t._tolerance?t.open():t.close()}t._moved=false};this.panel.addEventListener(h.end,this._onTouchEndFn);this._onTouchMoveFn=function(e){if(r||t._preventOpen||typeof e.touches==="undefined"||d(e.target)){return}var n=e.touches[0].clientX-t._startOffsetX;var i=t._currentOffsetX=n;if(Math.abs(i)>t._padding){return}if(Math.abs(n)>20){t._opening=true;var o=n*t._orientation;if(t._opened&&o>0||!t._opened&&o<0){return}if(!t._moved){t.emit("translatestart")}if(o<=0){i=n+t._padding*t._orientation;t._opening=false}if(!(t._moved&&u.classList.contains("slideout-open"))){u.classList.add("slideout-open")}t.panel.style[f+"transform"]=t.panel.style.transform="translateX("+i+"px)";t.emit("translate",i);t._moved=true}};this.panel.addEventListener(h.move,this._onTouchMoveFn);return this};_.prototype.enableTouch=function(){this._touch=true;return this};_.prototype.disableTouch=function(){this._touch=false;return this};_.prototype.destroy=function(){this.close();a.removeEventListener(h.move,this._preventMove);this.panel.removeEventListener(h.start,this._resetTouchFn);this.panel.removeEventListener("touchcancel",this._onTouchCancelFn);this.panel.removeEventListener(h.end,this._onTouchEndFn);this.panel.removeEventListener(h.move,this._onTouchMoveFn);a.removeEventListener("scroll",this._onScrollFn);this.open=this.close=function(){};return this};e.exports=_},{decouple:2,emitter:3}],2:[function(t,e,n){"use strict";var i=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)}}();function o(t,e,n){var o,s=false;function r(t){o=t;a()}function a(){if(!s){i(u);s=true}}function u(){n.call(t,o);s=false}t.addEventListener(e,r,false);return r}e.exports=o},{}],3:[function(t,e,n){"use strict";var i=function(t,e){if(!(t instanceof e)){throw new TypeError("Cannot call a class as a function")}};n.__esModule=true;var o=function(){function t(){i(this,t)}t.prototype.on=function e(t,n){this._eventCollection=this._eventCollection||{};this._eventCollection[t]=this._eventCollection[t]||[];this._eventCollection[t].push(n);return this};t.prototype.once=function n(t,e){var n=this;function i(){n.off(t,i);e.apply(this,arguments)}i.listener=e;this.on(t,i);return this};t.prototype.off=function o(t,e){var n=undefined;if(!this._eventCollection||!(n=this._eventCollection[t])){return this}n.forEach(function(t,i){if(t===e||t.listener===e){n.splice(i,1)}});if(n.length===0){delete this._eventCollection[t]}return this};t.prototype.emit=function s(t){var e=this;for(var n=arguments.length,i=Array(n>1?n-1:0),o=1;o<n;o++){i[o-1]=arguments[o]}var s=undefined;if(!this._eventCollection||!(s=this._eventCollection[t])){return this}s=s.slice(0);s.forEach(function(t){return t.apply(e,i)});return this};return t}();n["default"]=o;e.exports=n["default"]},{}]},{},[1])(1)});
/*!
 * WA MediaBox
 * @author WA Studio <www.webarts.name>
 * @author Jiri Hybek <jiri@hybek.cz>
 * @license MIT
*/
!function(){var t=function(){this.el=document.createElement("div"),this.el.classList.add("wa-mediabox-preloader"),this.wrap=document.createElement("div"),this.wrap.classList.add("wa-mediabox-preloader-wrap"),this.spinner=document.createElement("div"),this.spinner.classList.add("wa-mediabox-preloader-spinner"),this.patch=document.createElement("div"),this.patch.classList.add("wa-mediabox-preloader-patch"),this.clipperLeft=document.createElement("div"),this.clipperLeft.classList.add("wa-mediabox-preloader-clipper"),this.clipperLeft.classList.add("cleft"),this.clipperRight=document.createElement("div"),this.clipperRight.classList.add("wa-mediabox-preloader-clipper"),this.clipperRight.classList.add("cright");var t=document.createElement("div");t.classList.add("wa-mediabox-preloader-circle"),this.patch.appendChild(t),this.clipperLeft.appendChild(t.cloneNode(!0)),this.clipperRight.appendChild(t.cloneNode(!0)),this.spinner.appendChild(this.clipperLeft),this.spinner.appendChild(this.patch),this.spinner.appendChild(this.clipperRight),this.wrap.appendChild(this.spinner),this.el.appendChild(this.wrap)};t.prototype.show=function(){this.el.classList.remove("hidden"),this.el.style.display=""},t.prototype.hide=function(){var t=this;this.el.classList.add("hidden"),setTimeout(function(){t.el.classList.contains("hidden")&&(t.el.style.display="none")},350)};var e=function(t){this.parent=t,this.mediaList=[],this.opened=!1,this.loaded=!1,this.current=null,this.containerWidth=null,this.containerHeight=null};e.prototype.addImage=function(t,e){return this.mediaList.push({type:"image",src:t,title:e}),this.mediaList.length-1},e.prototype.addIframe=function(t,e,i,n){return this.mediaList.push({type:"iframe",src:t,title:e,width:i,height:n}),this.mediaList.length-1},e.prototype.open=function(e){if(!this.opened){var i=this;this.current=-1,this.loaded=!1,this.overlay=document.createElement("div"),this.overlay.classList.add("wa-mediabox-overlay"),this.frame=document.createElement("div"),this.frame.classList.add("wa-mediabox-frame"),this.container=document.createElement("div"),this.container.classList.add("wa-mediabox-container"),this.title=document.createElement("div"),this.title.classList.add("wa-mediabox-title"),this.loading=new t,this.closeBtn=document.createElement("button"),this.closeBtn.classList.add("wa-mediabox-close"),this.closeBtn.innerHTML='<svg viewBox="0 0 24 24"><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg>',this.closeBtn.setAttribute("title",this.parent.lang.close),this.prevBtn=document.createElement("button"),this.prevBtn.classList.add("wa-mediabox-prev"),this.prevBtn.innerHTML='<svg viewBox="0 0 24 24"><path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" /></svg>',this.prevBtn.setAttribute("title",this.parent.lang.prev),this.nextBtn=document.createElement("button"),this.nextBtn.classList.add("wa-mediabox-next"),this.nextBtn.innerHTML='<svg viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" /></svg>',this.nextBtn.setAttribute("title",this.parent.lang.next),this.openBtn=document.createElement("button"),this.openBtn.classList.add("wa-mediabox-open"),this.openBtn.innerHTML='<svg viewBox="0 0 24 24"><path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z" /></svg>',this.openBtn.setAttribute("title",this.parent.lang.openInNew),this.frame.appendChild(this.container),this.frame.appendChild(this.title),this.frame.appendChild(this.loading.el),this.frame.appendChild(this.closeBtn),this.frame.appendChild(this.prevBtn),this.frame.appendChild(this.nextBtn),this.frame.appendChild(this.openBtn),this.overlay.appendChild(this.frame),document.body.appendChild(this.overlay),this.overlay.addEventListener("click",function(t){t.stopPropagation(),i.close()}),this.closeBtn.addEventListener("click",function(t){t.stopPropagation(),i.close()}),this.prevBtn.addEventListener("click",function(t){t.stopPropagation(),i.prev()}),this.nextBtn.addEventListener("click",function(t){t.stopPropagation(),i.next()}),this.container.addEventListener("click",function(t){t.stopPropagation(),i.next()}),this.openBtn.addEventListener("click",function(t){t.stopPropagation(),i.openSource()}),this.resizeHandler=function(){i.resizeContainer()},this.keyDownHandler=function(t){return t.preventDefault(),t.stopPropagation(),37===t.keyCode?i.prev():39===t.keyCode?i.next():27===t.keyCode&&i.close(),!1},window.addEventListener("resize",this.resizeHandler),document.body.addEventListener("keydown",this.keyDownHandler),setTimeout(function(){i.overlay.classList.add("opened"),i.loadMedia(e)},10),this.opened=!0}},e.prototype.close=function(){if(this.opened){var t=this;this.overlay.classList.remove("opened"),window.removeEventListener("resize",this.resizeHandler),document.body.removeEventListener("keydown",this.keyDownHandler),setTimeout(function(){t.overlay.parentElement.removeChild(t.overlay),t.opened=!1,t.nextBtn=null,t.prevBtn=null,t.closeBtn=null,t.openBtn=null,t.loading=null,t.container=null,t.frame=null,t.overlay=null,t.current=null,t.containerWidth=null,t.containerHeight=null},450)}},e.prototype.resizeContainer=function(){if(this.opened){this.containerWidth||(this.containerWidth=Math.round(.7*this.overlay.offsetWidth)),this.containerHeight||(this.containerHeight=Math.round(.7*this.overlay.offsetWidth));var t=160;this.overlay.offsetWidth<480&&(t=70);var e=Math.min(.9*this.overlay.offsetWidth,this.overlay.offsetWidth-t),i=Math.min(.9*this.overlay.offsetHeight,this.overlay.offsetHeight-64),n=this.containerWidth,s=this.containerHeight,a=n/s;n>e&&(n=Math.round(e),s=n/a),s>i&&(s=Math.round(i),n=s*a),this.frame.style.width=n+"px",this.frame.style.height=s+"px",this.frame.style.marginLeft=-Math.round(n/2)+"px",this.frame.style.marginTop=-Math.round(s/2)+"px"}},e.prototype.setMedia=function(t,e,i,n,s){if(this.opened){var a=this;this.loaded=!1,this.frame.classList.remove("can-open-in-new"),a.frame.classList.remove("has-title"),this.container.innerHTML="";var r=null;"image"==t?(n&&(this.containerWidth=n),s&&(this.containerHeight=s),this.resizeContainer(),r=document.createElement("img"),r.addEventListener("load",function(){a.containerWidth=r.width,a.containerHeight=r.height,a.resizeContainer(),a.frame.classList.add("can-open-in-new"),a.container.appendChild(r)}),r.src=e):(n&&(this.containerWidth=n),s&&(this.containerHeight=s+(i?52:0)),this.resizeContainer(),r=document.createElement("iframe"),r.src=e,r.setAttribute("width",parseInt(this.frame.style.width)),r.setAttribute("height",parseInt(this.frame.style.height)-(i?52:0)),r.setAttribute("frameborder","0"),r.setAttribute("allowfullscreen","allowfullscreen"),this.container.appendChild(r)),r.addEventListener("load",function(){setTimeout(function(){i&&(a.title.innerHTML=i,a.frame.classList.add("has-title")),a.frame.classList.add("loaded"),a.loading.hide(),a.loaded=!0},550)})}},e.prototype.loadMedia=function(t){if(this.opened&&t!=this.current){var e=this;if(!this.mediaList[t])throw new Error("Undefined media");var i=function(){e.setMedia(e.mediaList[t].type,e.mediaList[t].src,e.mediaList[t].title,e.mediaList[t].width,e.mediaList[t].height)};this.loaded?(this.frame.classList.remove("loaded"),this.loading.show(),setTimeout(i,350)):i(),t>0?this.frame.classList.add("has-prev"):this.frame.classList.remove("has-prev"),t<this.mediaList.length-1?this.frame.classList.add("has-next"):this.frame.classList.remove("has-next"),this.current=t}},e.prototype.prev=function(){if(this.opened){var t=Math.max(0,this.current-1);this.loadMedia(t)}},e.prototype.next=function(){if(this.opened){var t=Math.min(this.mediaList.length-1,this.current+1);this.loadMedia(t)}},e.prototype.openSource=function(){this.opened&&window.open(this.mediaList[this.current].src)};var i=function(){this.lang={prev:"Previous",next:"Next",close:"Close",openInNew:"Open in new window"},this.galleries={}};i.prototype.openGallery=function(t,e){if(!this.galleries[t])throw new Error("Gallery not found");this.galleries[t].open(e)},i.prototype.addImage=function(t,i,n){return this.galleries[t]||(this.galleries[t]=new e(this)),this.galleries[t].addImage(i,n)},i.prototype.addIframe=function(t,i,n,s,a){return this.galleries[t]||(this.galleries[t]=new e(this)),this.galleries[t].addIframe(i,n,s,a)},i.prototype.bind=function(t){if(!t._waMediaBoxBound){t._waMediaBoxBound=!0;var e=this,i=t.getAttribute("data-mediabox")||"_",n=String(t.getAttribute("href")||t.getAttribute("data-src")),s=t.getAttribute("data-title"),a=t.hasAttribute("data-iframe")||n.indexOf("youtube")>=0?!0:!1,r=t.hasAttribute("data-width")?parseInt(t.getAttribute("data-width")):null,o=t.hasAttribute("data-height")?parseInt(t.getAttribute("data-height")):null,d=null;d=a?this.addIframe(i,n,s,r,o):this.addImage(i,n,s),t.addEventListener("click",function(t){return t.preventDefault(),t.stopPropagation(),e.openGallery(i,d),!1})}},i.prototype.bindAll=function(t){for(var e=t.querySelectorAll("a[data-mediabox]"),i=0;i<e.length;i++)this.bind(e.item(i))},window.WAMediaBox=new i,window.addEventListener("load",function(){window.WAMediaBox.bindAll(document.body)})}();

const _s_c_ = {};
_s_c_.hasClass = function (ele, cls) {
    return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

_s_c_.addClass = function (ele, cls) {
    if (!_s_c_.hasClass(ele, cls)) {
        ele.className += " " + cls;
    }
}

_s_c_.removeClass = function (ele, cls) {
    if (_s_c_.hasClass(ele, cls)) {
        let reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        ele.className = ele.className.replace(reg, ' ');
    }
}

_s_c_.wrap = function (els, wrapper) {
    els.parentNode.insertBefore(wrapper, els);
    wrapper.appendChild(els);
}

_s_c_.backToTop = function () {
    function scrollToTop(duration) {
        const height = window.scrollY;
        const step = Math.PI / (duration / 15);
        const cos = height / 2;
        let count = 0;
        let margin;
        let interval = setInterval( function() {
            if (window.scrollY != 0) {
                count = count + 1;  
                margin = cos - cos * Math.cos(count * step);
                window.scrollTo(0, (height - margin));
            } else {
                clearInterval(interval);
            }
        }, 15);
    }
    let anchor = document.getElementById('btt');
    if (anchor.addEventListener) {
        anchor.addEventListener('click', scrollToTop, false);
    }
    window.addEventListener('scroll', function(e) {
        if (window.scrollY > 100) {
            anchor.style.display = 'block';
        } else {
            anchor.style.display = 'none';
        }
    });
}

_s_c_.mobileNavbar = function () {
    const mobileNav = document.getElementById('mobile-navbar');
    const mobilePanel = document.getElementById('mobile-panel');
    const mobileNavIcon = document.getElementById('mobile-navbar-icon');
    const mobileMenu = document.getElementById('mobile-menu');
    const slideout = new Slideout({
        'panel': mobilePanel,
        'menu': mobileMenu,
        'padding': 180,
        'tolerance': 70
    });
    slideout.disableTouch();
    mobileNavIcon.addEventListener('click', function() {
        slideout.toggle();
    }, false);
    slideout.on('beforeopen', function () {
        _s_c_.addClass(mobileNav, 'fixed-open');
        _s_c_.addClass(mobileNavIcon, 'icon-click');
        _s_c_.removeClass(mobileNavIcon, 'icon-out');
    });
    slideout.on('beforeclose', function () {
        _s_c_.removeClass(mobileNav, 'fixed-open');
        _s_c_.addClass(mobileNavIcon, 'icon-out');
        _s_c_.removeClass(mobileNavIcon, 'icon-click');
    });
    mobilePanel.addEventListener('touchend', function() {
        slideout.isOpen() && slideout.toggle();
    }, false);
}

_s_c_.lightbox = function () {
    const forEach = (array, callback, scope) => {
        for (var i = 0; i < array.length; i++) {
            callback.call(scope, i, array[i]); 
        }
    };
    let eles = document.querySelectorAll(".lightbox");
    if (eles !== null) {
        forEach(eles, (index, ele) => {
            WAMediaBox.bind(ele);
        });
    }
}
