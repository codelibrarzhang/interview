/**
 * Copyright (c) 2009-2016 Storm and other contributors
 * https://github.com/tabooc
 *
 * Released under the MIT license
 * support IE6+ and other browsers
 * source:lib,original,contributors
 */
(function() {

	//工具箱
	var toolkit = {};

	//版本
	toolkit.version = '1.0.3';

	/**
	 * 空方法
	 * @return {undefined}
	 */
	toolkit.noop = function() {};

	/**
	 * 用逗号分割数字
	 * @param  {Number} number 要处理的数字
	 * @param  {int} length 逗号之间的长度,默认为3
	 * @return {String}
	 */
	toolkit.comma = function(number, length) {
		var source = number;
		if (!length || length < 1) {
			length = 3;
		}

		source = source.toString().split(".");
		source[0] = source[0].replace(new RegExp('(\\d)(?=(\\d{' + length + '})+$)', 'ig'), "$1,");
		return source.join(".");
	};

	/**
	 * 对目标元素按指定长度进行补0处理
	 * @param  {Number} number
	 * @param  {int} length
	 * @return {String}
	 */
	toolkit.pad = function(number, length) {
		var source = number,
			pre = "",
			negative = (source < 0),
			string = Math.abs(source).toString();

		if (string.length < length) {
			pre = (new Array(length - string.length + 1)).join('0');
		}

		return (negative ? "-" : "") + pre + string;
	};

	/**
	 * 生成[min, max]范围内的随机整数
	 * @param  {Number}  min
	 * @param  {Number}  max
	 * @return {Number}  
	 */
	toolkit.randomInt = function(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	};

	/**
	 * 清理字符串中的html标签
	 * @param  {String} string
	 * @return {String}
	 */
	toolkit.stripTags = function(string) {
		return (string || '').replace(/<[^>]+>/g, '');
	};

	/**
	 * 对'-'分割的字符串进行驼峰化处理
	 * @param  {String} string
	 * @return {String}
	 */
	toolkit.toCamelCase = function(string) {
		var source = string.valueOf();
		if (source.indexOf('-') < 0) {
			return source;
		}
		return source.replace(/[-][^-]/g, function(match) {
			return match.charAt(1).toUpperCase();
		});
	};

	/**
	 * 去除左右空白符
	 * @param  {String} string
	 * @return {String}
	 */
	toolkit.trim = function(string) {
		var trimer = new RegExp('(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+\x24)', 'g');
		return string ? string.replace(trimer, '') : '';
	};

	/**
	 * 生成UUID
	 * @return {String}
	 */
	toolkit.guid = function() {
		function s4() {
			return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
		}
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
			s4() + '-' + s4() + s4() + s4();
	}

	/**
	 * URI - query属性查询
	 * @param {String} attr      要搜索的字段
	 * @param {String} splitChar 地址栏参数分隔符,默认为'&'
	 * @return {String}			搜索到的对应字段值
	 */
	toolkit.URISearch = function(attr, splitChar) {
		var query = window.location.search,
			splitChar = splitChar || '&',
			attrArr = [],
			attrObj = {};

		query = query.replace(/^\?/, '');
		attrArr = query.split(splitChar);
		for (var i = attrArr.length - 1; i >= 0; i--) {
			attrObj[attrArr[i].split('=')[0]] = attrArr[i].split('=')[1];
		};

		return attrObj[attr];
	};

	/**
	 * 判断版本号是否在两者之间
	 * 需传入版本规范一致的版本号,如('1.0.0','0.9.0','3.1.5')
	 * @param  {String} version 当前版本
	 * @param  {String} lower   最低版本
	 * @param  {String} upper   最高版本
	 * @return {Boolean}        
	 */
	toolkit.betweenVersion = function(version, lower, upper) {
		return this.compareVersion(version, lower) >= 0 && this.compareVersion(version, upper) <= 0;
	};
	/**
	 * 版本号大小比较
	 * @param  {String} a 版本号
	 * @param  {String} b 版本号
	 * @return {Number}   0 || 大于0 || 小于0
	 */
	toolkit.compareVersion = function(a, b) {
		var a = a.split(/[^\d]+/g),
			b = b.split(/[^\d]+/g),
			len = a.length,
			num, num2;
		for (var i = 0; i < len; i++) {
			num = +a[i];
			num2 = +b[i];
			if (num != num2) return num - num2;
		}
		return 0;
	};

	/**
	 * 默认值设置
	 * @param  {String} str    要处理的字符串
	 * @param  {String} newStr 字符串默认值
	 * @return {String}
	 */
	toolkit.default = function(str, newStr) {
		return str || newStr;
	};

	/**
	 * 随机字符串生成
	 * @param  {Int} length 期望生成字符串的长度
	 * @param  {String} string 自定义字符串
	 * @param  {Boolean} Boolean 是否用自定义字符串覆盖默认值(A-Za-z0-9)
	 * @return {String}
	 */
	toolkit.randomStr = function(length, string, model) {
		var result = '',
			length = length || 12,
			source = 'ABCDEFJHIJKLMNOPQISTUVWXYZabcdefjhijklmnopqistuvwxyz0123456789';

		if (this.trim(string)) {
			if (model) {
				source = string;
			} else {
				source += string;
			}
		}

		for (var i = 0, len = source.length; i < length; i++) {
			result += source[this.randomInt(0, len - 1)];
		}
		return result;
	};

	/**
	 * 生成HEX随机颜色
	 * @return {String} #ff0000形式色值
	 */
	toolkit.randomColor = function() {
		return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6);
	};

	/**
	 * 随机打乱数组元素
	 * @param  {Array} arr 需要处理的目标数组
	 * @return {Array}     打乱后的数组
	 */
	toolkit.shuffle = function(arr) {
		var len = arr.length;
		for (var i = 0; i < len - 1; i++) {
			var idx = Math.floor(Math.random() * (len - i));
			var temp = arr[idx];
			arr[idx] = arr[len - i - 1];
			arr[len - i - 1] = temp;
		}
		return arr;
	};

	/**
	 * 检测字符串是否全是中文
	 * @param  {String}  string 要检测的字符串
	 * @return {Boolean}        
	 */
	toolkit.isCn = function(string) {
		return /^[\u4e00-\u9fa5]+$/g.test(string);
	};

	/**
	 * 遮挡手机号码中间数字
	 * @param  {String} phone 11位手机号
	 * @return {String}       
	 */
	toolkit.cloakPhone = function(phone) {
		return phone.slice(0, 3) + '****' + phone.slice(-4);
	};

	/**
	 * 获取对象长度
	 * @param  {Object} obj 对象,如{a:1,b:2}
	 * @return {Number}
	 */
	toolkit.objectSize = function(obj) {
		var len = 0;
		for (var i in obj) {
			obj.hasOwnProperty(i) && len++;
		}
		return len;
	};

	/**
	 * 数据类型判断
	 * @param  {Object} obj
	 * @return {Boolean}     
	 */
	toolkit.typeof = function(obj) {
		var type = Object.prototype.toString.call(obj).slice(8, -1);
		if ('Number' === type && isNaN(obj)) return 'NaN';
		return type;
	};

	/**
	 * 克隆对象
	 * @return {Object}
	 */
	toolkit.extend = function() {
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[0] || {},
			i = 1,
			length = arguments.length,
			deep = false;
		//如果第一个值为bool值，那么就将第二个参数作为目标参数，同时目标参数从2开始计数
		if (this.typeof(target) === "Boolean") {
			deep = target;
			target = arguments[1] || {};
			// skip the boolean and the target
			i = 2;
		}
		// 当目标参数不是object 或者不是函数的时候，设置成object类型的
		if (this.typeof(target) !== "Object" && this.typeof(target) !== 'Function') {
			target = {};
		}
		//如果extend只有一个函数的时候，那么将跳出后面的操作
		if (length === i) {
			target = this;
			--i;
		}
		for (; i < length; i++) {
			// 仅处理不是 null/undefined values
			if ((options = arguments[i]) != null) {
				// 扩展options对象
				for (name in options) {
					src = target[name];
					copy = options[name];
					// 如果目标对象和要拷贝的对象是恒相等的话，那就执行下一个循环。
					if (target === copy) {
						continue;
					}
					// 如果我们拷贝的对象是一个对象或者数组的话(这里没有像jQuery一样做朴素对象验证
					// jQuery.isPlainObject(copy))
					if (deep && copy && ((this.typeof(copy) === 'Object') || (copyIsArray = this.isArray(copy)))) {
						if (copyIsArray) {
							copyIsArray = false;
							clone = src && this.isArray(src) ? src : [];
						} else {
							clone = src && (this.typeof(src) === 'Object') ? src : {};
						}
						//不删除目标对象，将目标对象和原对象重新拷贝一份出来。 
						target[name] = this.extend(deep, clone, copy);
						// 如果options[name]的不为空，那么将拷贝到目标对象上去。
					} else if (copy !== undefined) {
						target[name] = copy;
					}
				}
			}
		}
		// 返回修改的目标对象
		return target;
	};

	/**
	 * 生成范围为[start,end)的整数数组
	 * @param  {Number} start 起始值
	 * @param  {Number} end   结束值
	 * @param  {Number} step  步进值
	 * @return {Array}       整数数组
	 */
	toolkit.range = function(start, end, step) {
		step || (step = 1);
		if (end == null) {
			end = start || 0;
			start = 0;
		}
		var index = -1,
			length = Math.max(0, Math.ceil((end - start) / step)),
			result = new Array(length);
		while (++index < length) {
			result[index] = start;
			start += step;
		}
		return result;
	}

	/**
	 * 判断目标对象是否是数组
	 * @param  {Object}
	 * @return {Boolean}
	 */
	toolkit.isArray = function(arg) {
		return this.typeof(arg) === '[object Array]';
	};

	/**
	 * 判断元素是否在目标数组中(现代浏览器可用indexOf)
	 * @param  {Array} array
	 * @param  {Object} item
	 * @return {Boolean}
	 */
	toolkit.inArray = function(array, item) {
		for (var i = 0, len = array.length; i < len; i++) {
			if (array[i] === item) {
				return true;
			}
		}
		return false;
	};

	/**
	 * 清空数组
	 * @param  {Array} array
	 * @return {Array}
	 */
	toolkit.empty = function(array) {
		array.length = 0;
		return array;
	};

	/**
	 * 元素在目标数组中的索引
	 * @param  {Array} array 目标数组
	 * @param  {Object} searchElement 要判断的元素
	 * @param  {Number} formIndex 起始位置
	 * @return {Number} index or -1
	 */
	toolkit.indexOf = function(array, searchElement, fromIndex) {

		var k;

		// 1. Let O be the result of calling ToObject passing
		//    the this value as the argument.
		if (array == null) {
			throw new TypeError('"this" is null or not defined');
		}

		var O = Object(array);

		// 2. Let lenValue be the result of calling the Get
		//    internal method of O with the argument "length".
		// 3. Let len be ToUint32(lenValue).
		var len = O.length >>> 0;

		// 4. If len is 0, return -1.
		if (len === 0) {
			return -1;
		}

		// 5. If argument fromIndex was passed let n be
		//    ToInteger(fromIndex); else let n be 0.
		var n = +fromIndex || 0;

		if (Math.abs(n) === Infinity) {
			n = 0;
		}

		// 6. If n >= len, return -1.
		if (n >= len) {
			return -1;
		}

		// 7. If n >= 0, then Let k be n.
		// 8. Else, n<0, Let k be len - abs(n).
		//    If k is less than 0, then let k be 0.
		k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

		// 9. Repeat, while k < len
		while (k < len) {
			// a. Let Pk be ToString(k).
			//   This is implicit for LHS operands of the in operator
			// b. Let kPresent be the result of calling the
			//    HasProperty internal method of O with argument Pk.
			//   This step can be combined with c
			// c. If kPresent is true, then
			//    i.  Let elementK be the result of calling the Get
			//        internal method of O with the argument ToString(k).
			//   ii.  Let same be the result of applying the
			//        Strict Equality Comparison Algorithm to
			//        searchElement and elementK.
			//  iii.  If same is true, return k.
			if (k in O && O[k] === searchElement) {
				return k;
			}
			k++;
		}
		return -1;
	};

	/**
	 * 数组去重
	 * @param  {Array} array 要处理的数组
	 * @param  {Function} fn 去重方法(默认为严格对比)
	 * @return {Array}
	 */
	toolkit.unique = function(array, fn) {
		var len = array.length,
			result = array.slice(0),
			i, datum;

		if ('function' !== typeof fn) {
			fn = function(item1, item2) {
				return item1 === item2;
			};
		}
		// 从后往前双重循环比较
		// 如果两个元素相同，删除后一个
		while (--len > 0) {
			datum = result[len];
			i = len;
			while (i--) {
				if (fn(datum, result[i])) {
					result.splice(len, 1);
					break;
				}
			}
		}

		len = array.length = result.length;
		for (i = 0; i < len; i++) {
			array[i] = result[i];
		}

		return array;
	};

	/**
	 * 数组合并
	 * @param  {Array} first 第一个数组
	 * @param  {Array} second 第二个数组
	 * @return {Array}
	 */
	toolkit.merge = function(first, second) {
		var i = first.length,
			j = 0;

		if (typeof second.length === "number") {
			for (var l = second.length; j < l; j++) {
				first[i++] = second[j];
			}

		} else {
			while (second[j] !== undefined) {
				first[i++] = second[j++];
			}
		}

		first.length = i;

		return first;
	};

	/**
	 * 日期格式化
	 * @param  {Date} source  要格式化的日期对象
	 * @param  {String} pattern 格式化规则
	 * @return {String}         格式化后的字符串
	 */
	toolkit.dateFormat = function(source, pattern) {
		if ('string' != typeof pattern) {
			return source.toString();
		}

		function replacer(patternPart, result) {
			pattern = pattern.replace(patternPart, result);
		}

		var pad = toolkit.pad,
			year = source.getFullYear(),
			month = source.getMonth() + 1,
			date2 = source.getDate(),
			hours = source.getHours(),
			minutes = source.getMinutes(),
			seconds = source.getSeconds();

		replacer(/yyyy/g, pad(year, 4));
		replacer(/yy/g, pad(parseInt(year.toString().slice(2), 10), 2));
		replacer(/MM/g, pad(month, 2));
		replacer(/M/g, month);
		replacer(/dd/g, pad(date2, 2));
		replacer(/d/g, date2);

		replacer(/HH/g, pad(hours, 2));
		replacer(/H/g, hours);
		replacer(/hh/g, pad(hours % 12, 2));
		replacer(/h/g, hours % 12);
		replacer(/mm/g, pad(minutes, 2));
		replacer(/m/g, minutes);
		replacer(/ss/g, pad(seconds, 2));
		replacer(/s/g, seconds);

		return pattern;
	};

	/**
	 * 将目标字符串转换成日期对象
	 * @param  {String} source 目标字符串
	 * @return {Date}        转换后的日期对象
	 */
	toolkit.dateParse = function(source) {
		var reg = new RegExp("^\\d+(\\-|\\/)\\d+(\\-|\\/)\\d+\x24");
		if ('string' == typeof source) {
			if (reg.test(source) || isNaN(Date.parse(source))) {
				var d = source.split(/ |T/),
					d1 = d.length > 1 ? d[1].split(/[^\d]/) : [0, 0, 0],
					d0 = d[0].split(/[^\d]/);
				return new Date(d0[0] - 0,
					d0[1] - 1,
					d0[2] - 0,
					d1[0] - 0,
					d1[1] - 0,
					d1[2] - 0);
			} else {
				return new Date(source);
			}
		}

		return new Date();
	};

	/**
	 * 获取指定月份的天数
	 * @param  {String | Number} year  合法的年份
	 * @param  {String | Number} month 月份(1-12)
	 * @return {Number}
	 */
	toolkit.getDate = function(year, month) {
		return new Date(year, month, 0).getDate();
	};

	/**
	 * 闰年判断
	 * @param  {Number | String} year 合法的年份
	 * @return {Boolean}
	 */
	toolkit.leapYear = function(year) {
		return this.getDate(year, 2) === 29;
	};
	/**
	 * 获取当前系统时间加XX分钟后的日期
	 * @param  {Number | String} minute 合法分钟数
	 * @return {Date}
	 * @auth by zhugj
	 */
	toolkit.getDateAddMinutes = function(minute){
		var date = new Date();
		if(minute >=0){
			var currMinute = date.getMinutes();
			date.setMinutes(currMinute + minute);
		}
		return date;
	}
	/**
	 * 获取两个时间相差的天数
	 * @param  {Date} startDate  小的时间
	 * @param  {Date} endDate  大的时间
	 * @return {dates} 相关的天数
	 * @auth by zhugj
	 */
	toolkit.dateDiff = function(startDate,endDate){
		var startTime = startDate.getTime();     
	    var endTime = endDate.getTime();     
		var dates = Math.abs((startTime - endTime))/(1000*60*60*24);     
	    return dates;  
	}

	//浏览器标识码
	var _userAgent = window.navigator.userAgent.toLowerCase();

	toolkit.portrait = function() {
		return (window.innerHeight / window.innerWidth) > 1;
	};

	toolkit.landscape = function() {
		return (window.innerHeight / window.innerWidth) < 1;
	};

	/**
	 * 运行代码
	 * @param  {String} id 文本域ID
	 * @return {undefined}   
	 */
	toolkit.runCode = function(id) {
		var code = document.getElementById(id).value;
		var newWindow = window.open();
		newWindow.opener = null;
		newWindow.document.write(code);
		newWindow.document.close();
	};

	/**
	 * 定时关闭当前页
	 * @param  {Number} delay 毫秒
	 * @return {undefined}
	 */
	toolkit.closeCurrentPage = function(delay) {
		setTimeout(function() {
			window.open('', '_self', '');
			window.close();
		}, delay || 0);
	};

	/**
	 * 天数倒计时
	 * @param  {Number}
	 * @param  {Number}
	 * @param  {Number}
	 * @param  {Number}
	 * @param  {Number}
	 * @param  {Number}
	 * @return {Number}
	 */
	toolkit.getCountDown = function(Y, M, D, h, m, s) {
		Y = Y || 0;
		M = M || 0;
		D = D || 0;
		h = h || 0;
		m = m || 0;
		s = s || 0;
		var date = new Date(Y, M - 1, D, h, m, s),
			times = date.getTime() - new Date().getTime();
		return Math.ceil(times / (1000 * 60 * 60 * 24));
	};

	/**
	 * 查看网页源码(需求:1 服务器环境;2 权限)
	 * @param  {String}
	 * @return {undefined}
	 */
	toolkit.viewSource = function(url) {
		var xmlHttp = null;
		if (window.XMLHttpRequest) {
			xmlHttp = new XMLHttpRequest();
		} else {
			xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlHttp.onreadystatechange = function() {
			if (xmlHttp.readyState == 4) {
				if (xmlHttp.status == 200) {
					alert(xmlHttp.responseText);
				} else {
					throw new Error('fail');
				}
			}
		};

		xmlHttp.open("GET", url, true);
		xmlHttp.send(null);
	};

	/**
	 * 判断图片是否加载完成
	 * @param  {element}   img
	 * @param  {Function} callback
	 */
	toolkit.imgComplete = function(img, callback) {
		var T = null;
		T = setInterval(function() {
			if (img.complete) {
				clearInterval(T);
				if (typeof callback === 'function') {
					callback();
				}
			}
		}, 50);
	};
	/** --------------------------个人添加----------------------------------*/
	toolkit.calculateResponseEffective = function(data){//计算对象是否有效
		if(toolkit.isArray(data)){
			return data.length > 0 ? true : false ;
		}else{
			return toolkit.calculateMapEffective(data);
		}
	};
	/**
	 * 判断对象里是否存在数据，无数据即视无效
	 * @param  map {} 
	 * @return true/false
	 */
	toolkit.calculateMapEffective = function(map){//计算对象是否有效
		if(typeof map != "undefined" && typeof map == "object"){
			for(var key in map){
				if(key) return true;
			}
		}
		return false;
	};
	/**
	 * 计算某一个属性是否在对象中存在
	 * @param  map {} 
	 * @param  element
	 * @return true/false
	 */
	toolkit.checkMapIncludeElement = function(map,element){//
		return map.hasOwnProperty(element);
	};
	/**
	 * 计算数组中是否包含当前元素
	 * @param  array [] 
	 * @param  element
	 * @return true/false
	 */
	toolkit.calculateArrayIncludeElement = function(array,element){
		for(var i = 0; i<array.length;i++){
			if(array[i].toString() == element.toString()){
				return true;
			}
		}
		return false;
	};
	/**
	 * 计算数组转字串
	 * @param  array [] 
	 * @return string
	 */
	toolkit.toString = function(param){
		var str = "";
		if(typeof param!= "undefined" && param.length > 0){
			str = param.join(',');
		}
		return str;
	};
	/**
	 * JSON字符串转JSON对象
	 * @param  "{a:b,c:d}"
	 * @return {a:b,c:d}
	 */
	toolkit.toJSON = function(str){
		return (new Function("return "+ str))();
	};
	/**
	 * JSON对象转get参数串
	 * @param  {b:123,c:"fa"}
	 * @return b=123&c=fa
	 */
	toolkit.jsonToString = function(a, b) {
	    var d = "", c;
	    for (c in a) {
	        d = d + (c + "=" + (b ? encodeURIComponent(a[c]) : a[c]) + "&")
	    }
	    return d.slice(0, -1)
	};
	/**
	 * get参数串转JSON对象
	 * @param  b=123&c=fa
	 * @return {b:123,c:"fa"}
	 */
	toolkit.stringToJson = function(a) {
	    for (var a = a.split("&"), b = "", d = 0; d < a.length; d++) {
	        var c = a[d].split("=")
	          , b = b + ("'" + c[0] + "':'" + c[1] + "',")
	    }
	    return eval("({" + b.substring(0, b.length - 1) + "})")
	};
		/**
	 * 一个比typeof运算符更准确的类型判断函数
	 * @param o :需要对比的数据
	 * @return true/false
	 */
	toolkit.verifyType = function(o){
		var s = Object.prototype.toString.call(o);
		return s.match(/\[object (.*?)\]/)[1].toLowerCase();
	};
	/**
	 * 扩展私有函数
	 * isNull(),isUndefined()....isInfinite()
	 */
	['Null','Undefined','Object','Array','String','Number','Boolean','Function','RegExp','NaN','Infinite'].forEach(function(t) {
		toolkit.verifyType['is' + t] = function (o) {
		    return toolkit.verifyType(o) === t.toLowerCase();
		};
	});
	/**
	 * JS 实现 类似 java StringBuffer 对象
	 * @return 
	 */
	toolkit.StringBuffer = function(){
		this._things_= new Array();
	}
	toolkit.StringBuffer.prototype.append = function(str){
	    this._things_.push(str);
	    return this;
	};
	/**
	 * JS 实现 类似 java Buffer 的toString 方法
	 * @return
	 */
	toolkit.StringBuffer.prototype.toString =function(){
	    return this._things_.join("");
	};
	/** 在字符串末尾追加字符串 **/
	toolkit.append = function (str) {
		return this.concat(str);
	};
	/** 删除指定索引位置的字符，索引无效将不删除任何字符 **/
	toolkit.deleteCharAt = function (str,index) {
		if (index < 0 || index >= str.length) {
			return str.valueOf();
		}
		else if (index == 0) {
			return str.substring(1, str.length);
		}
		else if (index == str.length - 1) {
			return str.substring(0, str.length - 1);
		}
		else {
			return str.substring(0, index) + str.substring(index + 1);
		}
	};
	/** 删除指定索引区间的字符串 **/
	toolkit.deleteString = function (str,start, end) {
		if (start == end) {
			return deleteCharAt(str,start);
		}
		else {
			if (start > end) {
				var temp = start;
				start = end;
				end = temp;
			}
			if (start < 0) {
				start = 0;
			}
			if (end > str.length - 1) {
				end = str.length - 1;
			}
			return str.substring(0, start) + str.substring(end +1 , str.length);
		}
	};
	/** 检查字符串是否以subStr结尾 **/
	toolkit.endWith = function (str,subStr) {
		if (subStr.length > str.length) {
			return false;
		}
		else {
			return (str.lastIndexOf(subStr) == (str.length - subStr.length)) ? true : false;
		}
	};
	/** 比较两个字符串是否相等，也可以直接用 == 进行比较 **/
	toolkit.equal = function (str1,str2) {
		if (str1.length != str2.length) {
			return false;
		}
		else {
			for (var i = 0; i < str1.length; i++) {
				if (str1.charAt(i) != str2.charAt(i)) {
					return false;
				}
			}
			return true;
		}
	};
	/** 比较两个字符串是否相等，不区分大小写 **/
	toolkit.equalIgnoreCase = function (str1,str2) {
		var temp1 = str1.toLowerCase();
		var temp2 = str2.toLowerCase();
		return equal(temp1,temp2);
	};
	/** 将指定的字符串subStr插入到指定字串str的ofset位置后面，索引无效将直接追加到字符串的末尾 **/
	toolkit.insert = function (str, ofset, subStr) {
		if (ofset < 0 || ofset >= str.length - 1) {
			return str.append(subStr);
		}
		return str.substring(0, ofset + 1) + subStr + str.substring(ofset + 1);
	};
	/** 判断字符串是否数字串 **/
	toolkit.isAllNumber = function (str) {
		for (var i = 0; i < str.length; i++) {
			if (str.charAt(i) < '0' || str.charAt(i) > '9') {
				return false;
			}
		}
		return true;
	};
	/** 将字符串反序排列 **/
	toolkit.reserve = function (str) {
		var temp = "";
		for (var i = str.length - 1; i >= 0; i--) {
			temp = temp.concat(str.charAt(i));
		}
		return temp;
	};
	/** 将字串str指定的位置index的字符设置为subStr字符串.索引无效将直接返回不做任何处理 **/
	toolkit.setCharAt = function (str, index, subStr) {
		if (index < 0 || index > this.length - 1) {
			return str.valueOf();
		}
		return str.substring(0, index) + subStr + str.substring(index+1);
	};
	/** 检查字符串是否以subStr开头 **/
	toolkit.startWith = function (str,subStr) {
		if (subStr.length > str.length) {
			return false;
		}
		return (str.indexOf(subStr) == 0) ? true : false;
	};
	/** 计算长度，每个汉字占两个长度，英文字符每个占一个长度 **/
	toolkit.charLength = function (str) {
		var temp = 0;
		for (var i = 0; i < str.length; i++) {
			if (str.charCodeAt(i) > 255) {
				temp += 2;
			}
			else {
				temp += 1;
			}
		}
		return temp;
	};
	/** 计算长度，每个汉字占两个长度，英文字符每个占一个长度 **/
	toolkit.charLengthReg = function (str) {
		return str.replace(/[^\x00-\xff]/g, "**").length;
	};
	/** 测试是否是整数 **/ 
	toolkit.isInt = function (str) {
		if (str == "NaN")
			return false;
		return str == parseInt(str).toString();
	};
	/** 合并多个空白为一个空白 **/ 
	toolkit.resetBlank = function (str) {
		return strstr.replace(/s+/g, " ");
	};
	/** 去掉首尾空格 **/
	toolkit.trimAll = function (str) {
		return str.replace(/\s/g, "");
	};
	/** 除去两边空白 **/ 
	toolkit.trim = function (str) {
		return str.replace(/(^s+)|(s+$)/g, "");
	};
	/** 除去左边空白 **/ 
	toolkit.lTrim = function (str) {
		return str.replace(/^s+/g, "");
	};
	/** 除去右边空白 **/ 
	toolkit.rTrim = function (str) {
		return str.replace(/s+$/g, "");
	};
	/** 保留数字 **/ 
	toolkit.getNum = function (str) {
		return str.replace(/[^d]/g, "");
	};
	/** 保留字母 **/ 
	toolkit.getEn = function (str) {
		return str.replace(/[^A-Za-z]/g, "");
	};
	/** 保留中文 **/ 
	toolkit.getCn = function (str) {
		return str.replace(/[^u4e00-u9fa5uf900-ufa2d]/g, "");
	};
	/** 得到字节长度 **/ 
	toolkit.getRealLength = function (str) {
		return str.replace(/[^x00-xff]/g, "--").length;
	};
	/** 从str字串左截取指定长度的字串 **/ 
	toolkit.leftSubString = function (str,n) {
		return str.slice(0, n);
	};
	/** 从str字串右截取指定长度的字串 **/ 
	toolkit.rightSubString = function (str,n) {
		return str.slice(str.length - n);
	};
	/** 字串转数组 **/
	toolkit.toArray = function(str){			
		return str.split('');
	};		
	/**
	 * 字串截取返回带...的串 
	 * "abcdefg" ==> "abc..."
	 */
	toolkit.textEllipsis = function(a, b) {
		return a.length <= b ? a : a.substring(0, b) + "..."
	};
	
	// Device.js
	// (c) 2014 Matthew Hudson
	// Device.js is freely distributable under the MIT license.
	// For all details and documentation:
	// http://matthewhudson.me/projects/device.js/

	function device(){
		var device,
			previousDevice,
			addClass,
			documentElement,
			find,
			handleOrientation,
			hasClass,
			orientationEvent,
			removeClass,
			userAgent;
	
	  // Save the previous value of the device variable.
		previousDevice = window.device;
		
		device = {};
		
		// Add device as a global object.
		window.device = device;
		
		// The <html> element.
		documentElement = window.document.documentElement;
		
		// The client user agent string.
		// Lowercase, so we can use the more efficient indexOf(), instead of Regex
		userAgent = window.navigator.userAgent.toLowerCase();
		
		// Main functions
		
		device.isWechat = function() {//判断是否是微信环境
			if (userAgent.match(/MicroMessenger/i) == "micromessenger") {
			return true;
			}
			return false;
		};
		
		device.isAlipay = function() {//判断是否是支付宝环境
			if(userAgent.match(/Alipay/i)=="alipay"){
		        return true;
		    }else{
		        return false;
		    }
		};
		
		device.ios = function () {
			return device.iphone() || device.ipod() || device.ipad();
		};
		
		device.iphone = function () {
			return !device.windows() && find('iphone');
		};
		
		device.ipod = function () {
			return find('ipod');
		};
		
		device.ipad = function () {
			return find('ipad');
		};
		
		device.android = function () {
			return !device.windows() && find('android');
		};
		
		device.androidPhone = function () {
			return device.android() && find('mobile');
		};
		
		device.androidTablet = function () {
			return device.android() && !find('mobile');
		};
		
		device.blackberry = function () {
			return find('blackberry') || find('bb10') || find('rim');
		};
		
		device.blackberryPhone = function () {
			return device.blackberry() && !find('tablet');
		};
		
		device.blackberryTablet = function () {
			return device.blackberry() && find('tablet');
		};
		
		device.windows = function () {
			return find('windows');
		};
		
		device.windowsPhone = function () {
			return device.windows() && find('phone');
		};
		
		device.windowsTablet = function () {
			return device.windows() && (find('touch') && !device.windowsPhone());
		};
		
		device.fxos = function () {
			return (find('(mobile;') || find('(tablet;')) && find('; rv:');
		};
		
		device.fxosPhone = function () {
			return device.fxos() && find('mobile');
		};
		
		device.fxosTablet = function () {
			return device.fxos() && find('tablet');
		};
		
		device.meego = function () {
			return find('meego');
		};
		
		device.cordova = function () {
			return window.cordova && location.protocol === 'file:';
		};
		
		device.nodeWebkit = function () {
			return typeof window.process === 'object';
		};
		
		device.mobile = function () {
			return device.androidPhone() || device.iphone() || device.ipod() || device.windowsPhone() || device.blackberryPhone() || device.fxosPhone() || device.meego();
		};
		
		device.tablet = function () {
			return device.ipad() || device.androidTablet() || device.blackberryTablet() || device.windowsTablet() || device.fxosTablet();
		};
		
		device.desktop = function () {
			return !device.tablet() && !device.mobile();
		};
		
		device.television = function() {
			var i, television = [
			"googletv",
			"viera",
			"smarttv",
			"internet.tv",
			"netcast",
			"nettv",
			"appletv",
			"boxee",
			"kylo",
			"roku",
			"dlnadoc",
			"roku",
			"pov_tv",
			"hbbtv",
			"ce-html"
			];
		
			i = 0;
			while (i < television.length) {
			if (find(television[i])) {
				return true;
			}
			i++;
			}
			return false;
		};
		
		device.portrait = function () {
			return (window.innerHeight / window.innerWidth) > 1;
		};
		
		device.landscape = function () {
			return (window.innerHeight / window.innerWidth) < 1;
		};
		
		// Public Utility Functions
		// ------------------------
		
		// Run device.js in noConflict mode,
		// returning the device variable to its previous owner.
		device.noConflict = function () {
			window.device = previousDevice;
			return this;
		};
		
		// Private Utility Functions
		// -------------------------
		
		// Simple UA string search
		find = function (needle) {
			return userAgent.indexOf(needle) !== -1;
		};
		
		// Check if documentElement already has a given class.
		hasClass = function (className) {
			var regex;
			regex = new RegExp(className, 'i');
			return documentElement.className.match(regex);
		};
	
		return device
	}
	toolkit.device = device();
	/**
	 * 字符串转XMLDocument对象
	 * @param  {String} htmlStr 目标字符串
	 * @param  {boolean} isClosure XML是否是闭合的,例如<a><b></b><c></c></a>,非闭合的如<b></b><c></c>
	 * @return {XMLDocument} 
	 */
	toolkit.parseStr4XMLDocument = function(htmlStr,isClosure){
		if (htmlStr && htmlStr.length > 0) {
			htmlStr = isClosure ? htmlStr : '<body>' + htmlStr + '</body>'
			//Internet Explorer
			try {
				  xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
				  xmlDoc.async="false";
				  xmlDoc.loadXML(htmlStr);
				  //alert('IE');
				  return(xmlDoc); 
			}catch(e){
				//Firefox, Mozilla, Opera, etc.
				try {
						parser=new DOMParser();
						xmlDoc=parser.parseFromString(htmlStr,"text/xml");
					 //alert('FMO');
						return(xmlDoc);
				} catch(e) {
					console.log(e.message)
				}
			}
			return(null);
		} else {
			return(null);
		}
	}
	/**获取XMLDocument的innerHTML*/
	toolkit.innerHTML4XMLDocument = function(elem) {
		if (elem && typeof elem.constructor === 'function' && elem.constructor.name === 'XMLDocument') {
			return elem.documentElement.innerHTML
		} else {
			return ''
		}
	}
	/*XMLDocument对象转html字串*/
	/**
	 * XMLDocument对象转htmlStr字符串
	 * @param  {XMLDocument} elem 目标字符串
	 * @return htmlStr 
	 * @desc  serializeToString 有个坑 
	 *		例如 documentElement为 <div class="adb"><a class="dasfa"></a><span>111</span><div> 的XMLDocument a标签内没有内容的话会被转成 '<div class="adb"><a class="dasfa"/><span>111</span><div>'
	 *		正确写法 ： <div class="adb"><a class="dasfa"> </a><span>111</span><div> 加个空格 表明有内空
	 */
	toolkit.parseXMLDocument4Str = function (elem) {  
		var serialized;  
		try {  
			// XMLSerializer exists in current Mozilla browsers                                                                              
			serializer = new XMLSerializer();                                                                                                
			serialized = serializer.serializeToString(elem);                                                                                 
		}                                                                                                                                    
		catch (e) {  
			// Internet Explorer has a different approach to serializing XML                                                                 
			serialized = elem.xml;                                                                                                           
		}      
		return serialized;                                                                                                                   
	}
	// 判断是否有该 class
    toolkit.hasClass = function (el, className) {
		/*var reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
      	return reg.test(el.className)*/
     	return el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
    },
	// 添加 class
	toolkit.addClass = function (el, className) {
	  /*if (toolkit.hasClass(el, className)) {
		return
	  }
	  var newClass = el.className.split(' ')
	  newClass.push(className)
	  el.className = newClass.join(' ')*/
	 	if (!toolkit.hasClass(el, className)) el.className += ' ' + className
	}
	// 删除类名
	toolkit.removeClass = function (el, className) {
	  /*if (toolkit.hasClass(el, className)) {
		if(el.classList) { //表示浏览器支持classList属性
			el.classList.remove(className);
		} else {
			var reg = new RegExp(className, 'ig');
			var className = node.className;
			if (reg.test(className)) {
				node.className = node.className.replace(className, '')
			}
		}
	  }*/
	 	if (toolkit.hasClass(el, className)) {
			var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
			el.className = el.className.replace(reg, ' ')
		}
	}
	toolkit.toggleClass = function (el, className) {
		if (toolkit.hasClass(el, className)) {
			toolkit.removeClass(el, className)
		} else {
			toolkit.addClass(el, className)
		}
	}
	// 替换类名
	toolkit.replaceClass = function (obj, newName, oldName) {
	  toolkit.removeClass(obj, oldName)
	  toolkit.addClass(obj, newName)
	}
	// clone 对象
	toolkit.cloneObj = function (obj) {
		var str = ''
		var newobj = obj.constructor === Array ? [] : {}
		if (typeof obj !== 'object') {
			return
		} else if (window.JSON) {
			str = JSON.stringify(obj) //序列化对象
			newobj = JSON.parse(str) //还原
		} else {
			for (var i in obj) {
				newobj[i] = typeof obj[i] === 'object' ? cloneObj(obj[i]) : obj[i]
			}
		}
		return newobj
	}
	/**
	 * 函数功能 给dom元素绑定事件
	 * @param  
	 * 		target 目标元素
	 * 		type 事件类型 如click
	 * 		handler 执行函数
	 */
	toolkit.addEventListener = function(target,type,handler){
    	return target.attachEvent ? target.attachEvent("on"+type,handler) : target.addEventListener(type,handler,false);
  	}
	
	/**
	 * 函数功能 给dom元素移除绑定事件
	 * @param  
	 * 		target 目标元素
	 * 		type 事件类型 如click
	 * 		handler 执行函数
	 */
	toolkit.removeEventListener = function(target,type,handler){
    	return target.detachEvent ? target.detachEvent("on"+type, handler) : target.removeEventListener(type,handler,false);
  	}
	
	window.__eco__(this,"utils","toolkit",toolkit);
	
	
})();