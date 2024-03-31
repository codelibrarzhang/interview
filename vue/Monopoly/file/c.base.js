// 注册
;
(function() {
	function mkdir(catalog, name) {
		return catalog[name] = catalog[name] || {};
	}

	function __eco__(root, path, name, bind) {
		if(typeof path === undefined || typeof path === 'function' || typeof path === 'array' || typeof path === 'object' || typeof path === 'number') {
			throw new Error('目录错误');
		}
		var list = path.split('.');
		var head = list.shift();
		var content = null;
		if(root[head] === undefined) {
			content = root[head] = {};
		} else {
			content = root[head];
		}
		while(list.length) {
			var dir = list.shift();
			content = mkdir(content, dir);
		}
		content[name] = bind;
	}
	window.__eco__ = __eco__;

}());
//两个及以上多个异步调用同时返回成功后同步处理回调
;
(function() {
	var eachof = function(files, fn, callback) {
		callback = callback || function() {};
		files = files || [];
		if(!files.length) {}
		var count = 0;
		var queue = [];
		for(var i = 0; i < files.length; i++) {
			fn(files[i], i, nextPointer);
		}

		function nextPointer(err, data, insert) {
			count++;
			if(err) {}
			queue.splice(insert, 0, data);
			if(count === files.length) {
				callback(queue);
			}
		}
	}
	window.__eco__(this, 'base', 'eachof', eachof);
}());
// 事件监听
;
(function() {
	function Monitor() {
		this.json = {}; //{abc: [fn, fn, fn], data: [], end: [...]}
	};
	Monitor.prototype.addListener = Monitor.prototype.on = function(name, fn) {
		if(!this.json[name]) {
			this.json[name] = [];
		}

		this.json[name].push(fn);
	};
	Monitor.prototype.emit = function(name) {
		var arr = [];
		arr = arr.concat.apply(arr, arguments);

		arr.shift();

		if(this.json[name]) {
			var fns = this.json[name];
			for(var i = 0; i < fns.length; i++) {
				fns[i].apply(null, arr);
			}
		}
	};
	window.__eco__(this, 'base', 'monitor', new Monitor());
}());
// 队列
;
(function() {
	var queue = [];

	function Then(callback, context) {
		callback(function() {
			queue[0] && queue.shift().apply(null, [arguments.callee].concat(Array.prototype.slice.call(arguments, 0)))
		}, context || {});

		return this;
	}

	Then.prototype.then = function(callback) {
		queue.push(callback);

		return this;
	}

	window.__eco__(this, 'base.promise', 'Then', function(callback, context) {
		return new Then(callback, context);
	});
}());
// 验证
;
(function() {
	function Validate(strategies) {
		return new Validate.prototype.init(strategies);
	}
	Validate.prototype.init = function(strategies) {
		this.cache = [];

		this.strategies = strategies;
	}
	Validate.prototype.add = function(dom, rules) {
		rules.forEach(function(rule, i) {
			var strategyArg = rule.strategy.split(':');
			var errorMsg = rule.errorMsg;

			this.cache.push(function() {
				return this.strategies[strategyArg[0]].apply(dom, strategyArg.slice(1).concat(errorMsg));
			})
		});
	}
	Validate.prototype.start = function() {
		var errorMsg = '';

		for(var i = 0; i < this.cache.length; i++) {
			var validatorFunc = this.cache[i];

			errorMsg = validatorFunc();

			if(errorMsg) break;
		}

		return errorMsg;
	}
	Validate.prototype.init.prototype = Validate.prototype;

	window.__eco__(this, 'base', 'validate', Validate);
}());

window.validator = base.validate({
	isNonEmpty: function(errorMsg) {
		if(!this.value) {
			return errorMsg;
		}
	},
	minLength: function(length, errorMsg) {
		if(String(this.value).length < parseInt(length)) {
			return errorMsg;
		}
	},
	isMobile: function(value, errorMsg) {
		if(!/(^1[3|5|8][0-9]{9}$)/.test(value)) {
			return errorMsg;
		}
	}
});

//函数原型
Function.prototype.after = function(fn) {
	var me = this;
	return function() {
		var ret = me.apply(this, arguments);
		if(ret === false) {
			return false;
		}
		fn.apply(this, arguments);
		return ret;
	}
}
//函数原型
Function.prototype.before = function(fn) {
	var me = this;
	return function() {
		var ret = fn.apply(this, arguments);
		if(ret === false) {
			return false;
		}
		return me.apply(this, arguments);
	}
};

/*function zhunbei() {
	alert('执行 准备 工作');
}

function miaosha() {
	alert('执行 秒杀 业务');
}

function shangbao() {
	alert('执行 统计数据 上报')
}

$('.aaa').click(miaosha.before(zhunbei).after(shangbao));


miaosha.before(zhunbei).after(shangbao);*/

//实现服务延时加载
(function() {
	var serverlazy = {};
	var callback = function() {};
	var offset, poll, delay, useDebounce, unload;
	var isHidden = function(element) {
		return(element.offsetParent === null);
	};
	var inView = function(element, view) {
		if(isHidden(element)) {
			return false;
		}
		var box = element.getBoundingClientRect();
		return(box.right >= view.l && box.bottom >= view.t && box.left <= view.r && box.top <= view.b);
	};
	var debounceOrThrottle = function() {
		if(!useDebounce && !!poll) {
			return;
		}
		clearTimeout(poll);
		poll = setTimeout(function() {
			serverlazy.render();
			poll = null;
		}, delay);
	};
	serverlazy.Selector = null;
	serverlazy.init = function(opts) {
		// 	opts:{
		// offset:10, //四个方向全部为10，距离边界为10时开始加载，组1，组1、组2、组3优先级组3>组2>组1
		// offsetVertical:30, //垂直方向距离边界为30时开始加载，组2，组1，组1、组2、组3优先级组3>组2>组1
		// offsetHorizontal:30, //水平方向距离边界为30时开始加载，组2
		// offsetTop:20, //垂直方向距离上边界为20时开始加载，组3，组1，组1、组2、组3优先级组3>组2>组1
		// offsetBottom:20, //垂直方向距离下边界为20时开始加载，组3
		// offsetLeft:20, //垂直方向距离左边界为20时开始加载，组3
		// offsetRight:20, //垂直方向距离右边界为20时开始加载，组3
		// throttle:'2000',  //延迟加载的时间，和debounce一起使用
		// debounce:false,   //要不要用延迟加载，和throttle一起使用
		// unload:'',
		// callback:function(){}
		// 	}
		opts = opts || {};
		var offsetAll = opts.offset || 0;
		var offsetVertical = opts.offsetVertical || offsetAll;
		var offsetHorizontal = opts.offsetHorizontal || offsetAll;
		var optionToInt = function(opt, fallback) {
			return parseInt(opt || fallback, 10);
		};
		offset = {
			t: optionToInt(opts.offsetTop, offsetVertical),
			b: optionToInt(opts.offsetBottom, offsetVertical),
			l: optionToInt(opts.offsetLeft, offsetHorizontal),
			r: optionToInt(opts.offsetRight, offsetHorizontal)
		};
		delay = optionToInt(opts.throttle, 250);
		useDebounce = opts.debounce !== false;
		unload = !!opts.unload;
		callback = opts.callback || callback;
		serverlazy.render();
		if(document.addEventListener) {
			window.addEventListener('scroll', debounceOrThrottle, false);
			window.addEventListener('load', debounceOrThrottle, false);
		} else {
			window.attachEvent('onscroll', debounceOrThrottle);
			window.attachEvent('onload', debounceOrThrottle);
		}
	};
	serverlazy.render = function() {
		//var nodes = document.querySelectorAll('img[data-serverlazy], [data-serverlazy-background]');
		var nodes = document.querySelectorAll(serverlazy.Selector);
		var length = nodes.length;
		var src,
			elem;
		var view = {
			l: 0 - offset.l,
			t: 0 - offset.t,
			b: (window.innerHeight || document.documentElement.clientHeight) + offset.b,
			r: (window.innerWidth || document.documentElement.clientWidth) + offset.r
		};
		for(var i = 0; i < length; i++) {
			elem = nodes[i];
			if(inView(elem, view)) {
				if(elem.unload === undefined) {
					callback(elem, 'load');
				}

				elem.unload = true;
			}
		}
		if(!length) {
			serverlazy.detach();
		}
	};
	serverlazy.detach = function() {
		if(document.removeEventListener) {
			window.removeEventListener('scroll', debounceOrThrottle);
		} else {
			window.detachEvent('onscroll', debounceOrThrottle);
		}
		clearTimeout(poll);
	};
	window.__eco__(this, 'base', 'serverlazy', function(Selector) {
		serverlazy.Selector = Selector;
		return serverlazy;
	});
}());
/**
 * 定义异常信息
 */

(function(global) {
	"use strict";
	var _Base64 = global.Base64_;
	var version = "2.1.9";
	var buffer;
	if(typeof module !== "undefined" && module.exports) {
		try {
			buffer = require("buffer").Buffer
		} catch(err) {}
	}
	var b64chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	var b64tab = function(bin) {
		var t = {};
		for(var i = 0, l = bin.length; i < l; i++) t[bin.charAt(i)] = i;
		return t
	}(b64chars);
	var fromCharCode = String.fromCharCode;
	var cb_utob = function(c) {
		if(c.length < 2) {
			var cc = c.charCodeAt(0);
			return cc < 128 ? c : cc < 2048 ? fromCharCode(192 | cc >>> 6) + fromCharCode(128 | cc & 63) : fromCharCode(224 | cc >>> 12 & 15) + fromCharCode(128 | cc >>> 6 & 63) + fromCharCode(128 | cc & 63)
		} else {
			var cc = 65536 + (c.charCodeAt(0) - 55296) * 1024 + (c.charCodeAt(1) - 56320);
			return fromCharCode(240 | cc >>> 18 & 7) + fromCharCode(128 | cc >>> 12 & 63) + fromCharCode(128 | cc >>> 6 & 63) + fromCharCode(128 | cc & 63)
		}
	};
	var re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
	var utob = function(u) {
		return u.replace(re_utob, cb_utob)
	};
	var cb_encode = function(ccc) {
		var padlen = [0, 2, 1][ccc.length % 3],
			ord = ccc.charCodeAt(0) << 16 | (ccc.length > 1 ? ccc.charCodeAt(1) : 0) << 8 | (ccc.length > 2 ? ccc.charCodeAt(2) : 0),
			chars = [b64chars.charAt(ord >>> 18), b64chars.charAt(ord >>> 12 & 63), padlen >= 2 ? "=" : b64chars.charAt(ord >>> 6 & 63), padlen >= 1 ? "=" : b64chars.charAt(ord & 63)];
		return chars.join("")
	};
	var btoa = global.btoa ? function(b) {
		return global.btoa(b)
	} : function(b) {
		return b.replace(/[\s\S]{1,3}/g, cb_encode)
	};
	var _encode = buffer ? function(u) {
		return(u.constructor === buffer.constructor ? u : new buffer(u)).toString("base64")
	} : function(u) {
		return btoa(utob(u))
	};
	var encode = function(u, urisafe) {
		return !urisafe ? _encode(String(u)) : _encode(String(u)).replace(/[+\/]/g, function(m0) {
			return m0 == "+" ? "-" : "_"
		}).replace(/=/g, "")
	};
	var encodeURI = function(u) {
		return encode(u, true)
	};
	var re_btou = new RegExp(["[À-ß][-¿]", "[à-ï][-¿]{2}", "[ð-÷][-¿]{3}"].join("|"), "g");
	var cb_btou = function(cccc) {
		switch(cccc.length) {
			case 4:
				var cp = (7 & cccc.charCodeAt(0)) << 18 | (63 & cccc.charCodeAt(1)) << 12 | (63 & cccc.charCodeAt(2)) << 6 | 63 & cccc.charCodeAt(3),
					offset = cp - 65536;
				return fromCharCode((offset >>> 10) + 55296) + fromCharCode((offset & 1023) + 56320);
			case 3:
				return fromCharCode((15 & cccc.charCodeAt(0)) << 12 | (63 & cccc.charCodeAt(1)) << 6 | 63 & cccc.charCodeAt(2));
			default:
				return fromCharCode((31 & cccc.charCodeAt(0)) << 6 | 63 & cccc.charCodeAt(1))
		}
	};
	var btou = function(b) {
		return b.replace(re_btou, cb_btou)
	};
	var cb_decode = function(cccc) {
		var len = cccc.length,
			padlen = len % 4,
			n = (len > 0 ? b64tab[cccc.charAt(0)] << 18 : 0) | (len > 1 ? b64tab[cccc.charAt(1)] << 12 : 0) | (len > 2 ? b64tab[cccc.charAt(2)] << 6 : 0) | (len > 3 ? b64tab[cccc.charAt(3)] : 0),
			chars = [fromCharCode(n >>> 16), fromCharCode(n >>> 8 & 255), fromCharCode(n & 255)];
		chars.length -= [0, 0, 2, 1][padlen];
		return chars.join("")
	};
	var atob = global.atob ? function(a) {
		return global.atob(a)
	} : function(a) {
		return a.replace(/[\s\S]{1,4}/g, cb_decode)
	};
	var _decode = buffer ? function(a) {
		return(a.constructor === buffer.constructor ? a : new buffer(a, "base64")).toString()
	} : function(a) {
		return btou(atob(a))
	};
	var decode = function(a) {
		return _decode(String(a).replace(/[-_]/g, function(m0) {
			return m0 == "-" ? "+" : "/"
		}).replace(/[^A-Za-z0-9\+\/]/g, ""))
	};
	var noConflict = function() {
		var Base64_ = global.Base64_;
		global.Base64_ = _Base64;
		return Base64_
	};
	global.Base64_ = {
		VERSION: version,
		atob: atob,
		btoa: btoa,
		fromBase64: decode,
		toBase64: encode,
		utob: utob,
		encode: encode,
		encodeURI: encodeURI,
		btou: btou,
		decode: decode,
		noConflict: noConflict
	};
	if(typeof Object.defineProperty === "function") {
		var noEnum = function(v) {
			return {
				value: v,
				enumerable: false,
				writable: true,
				configurable: true
			}
		};
		global.Base64_.extendString = function() {
			Object.defineProperty(String.prototype, "fromBase64", noEnum(function() {
				return decode(this)
			}));
			Object.defineProperty(String.prototype, "toBase64", noEnum(function(urisafe) {
				return encode(this, urisafe)
			}));
			Object.defineProperty(String.prototype, "toBase64URI", noEnum(function() {
				return encode(this, true)
			}))
		}
	}
	if(global["Meteor"]) {
		Base64_ = global.Base64_
	}
})(this);

(function() {

	if(!-[1, ]) {
		var danger = true;

		var error = function() {
			throw new Error('not defined');
		}

		var noop = function() {}

		var listens = ['info', 'debug', 'warn', 'error', /*'log'*/ ]
		//var listens = ['warn'];

		var log4js = {}

		/*var proto = {}
        
		for (var key in console) {
		    proto[key] = console[key]
		}*/

		for(var i = 0; i < listens.length; i++) {
			var listen = listens[i];

			if(!console[listen]) continue

			if(console[listen].before === undefined) {
				console[listen].before = noop.before
			}

			log4js[listen] = console[listen].before(function() {
				if(Base64_.encode(Base64_.encode(sessionStorage.debug)) === 'Ykc5bk5HcHo=' ||
					Base64_.encode(Base64_.encode(localStorage.debug)) === 'Ykc5bk5HcHo=') {
					//proto[listen].apply(console, Array.prototype.slice.call(this, arguments))
				} else {
					//alert('想使用系统级别的调试信息，需先解锁，发布时删除此提示')

					return false
				}

				//return (Base64.encode(Base64.encode(sessionStorage.debug)) === 'Ykc5bk5HcHo=') || (Base64.encode(Base64.encode(localStorage.debug)) === 'Ykc5bk5HcHo=') 
			});
		}

		if(danger) {
			for(var key in log4js)
				console[key] = log4js[key]
		}

		window.__eco__(this, 'base', 'log4js', log4js);
	}
}());
(function(o) {
	try {
		document.domain = "01zhuanche.com";
	} catch(e) {};
	var domainName = ".01zhuanche.com";
	//设置cookie信息 
	o.addCookie = function(cname, cvalue, exdays, secureFlag, othenDomainName) {

		var d = new Date();

		d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));

		var expires = 'expires=' + d.toUTCString();

		var strCookie = cname + '=' + encodeURIComponent(cvalue) + '; ' + expires;

		strCookie += "; path=/";

		if(othenDomainName == null || othenDomainName == typeof("undifined")) {
			strCookie += "; domain=" + domainName;
		} else {
			strCookie += "; domain=" + othenDomainName;
		}
		if(typeof secureFlag != 'undefined' && secureFlag) {
			strCookie += "; secure";
		}
		document.cookie = strCookie;
	};
	//从cookie中根据key值，取cookie值
	o.getCookie = function(cname) {
		var name = cname + '=';
		var ca = document.cookie.split(';');
		for(var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while(c.charAt(0) == ' ') c = c.substring(1);
			if(c.indexOf(name) != -1) return decodeURIComponent(c.substring(name.length, c.length));
		}
		return null;
	};
	//清空当前cookie
	o.clearCookie = function(name) {
		addCookie(name, "", -1);
	};
})(window);
(function(doc, win) {
	var docEl = doc.documentElement,
		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
		recalc = function() {
			var clientWidth = docEl.clientWidth;
			if(clientWidth >= 750) {
				clientWidth = 750;
			};
			if(clientWidth <= 320) {
				clientWidth = 320;
			}
			if(!clientWidth) return;
			docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
		};
	if(!doc.addEventListener) return;
	win.addEventListener(resizeEvt, recalc, false);
	doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
/*
 * 招行后退按钮判断
 **/
(function(doc, win){
 	if(getCookie('channel') == 'cmb') {
 		// if (win.location.host.indexOf('monline') > -1){
	  //       var param = [{'btnType': 'goback', 'actionType': 'callback', 'actionContent': 'SQYCGOTO'}];
		 //    var paramStr = encodeURIComponent(JSON.stringify(param));
		 //    var url = 'http://cmbls/TopBarUI?id=xx&left_btn_style=' + paramStr;
			// location.href = url;
 		// }
 		win['setiPhoneGoBack'] = function () {}
 		win['CMBLS'] = win['CMBLS'] || {}
        CMBLS.TopBarUI = {}
        CMBLS.TopBarUI.successCallback = function () {};
        CMBLS.TopBarUI.SQYCGOTO = function () {
           win.history.back()
        }
    }
})(document, window);