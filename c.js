/**
 *
 * @authors H君
 * @date    2017-03-23 11:14:18
 */
;
(function(window) {

	//获取url地址参数值
	function getQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return unescape(r[2]);
		return null;
	}

	//匹配终端
	function browser() {
		var userAgentInfo = navigator.userAgent;
		var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
		var flag = true;
		for (var v = 0; v < Agents.length; v++) {
			if (userAgentInfo.indexOf(Agents[v]) > 0) {
				flag = false;
				break;
			}
		}
		return flag;
	}

	//cookies操作 
	var cookies ={
		//设置cookies
		set: function(name, value, days) {
			if (days) {
				var date = new Date();
				date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
				var expires = "; expires=" + date.toGMTString();
			} else var expires = "";
			document.cookie = name + "=" + value + expires + "; path=/";
		},

		//获取cookies
		get: function(name) {
			var nameEQ = name + "=";
			var ca = document.cookie.split(';');
			for (var i = 0; i < ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0) == ' ') c = c.substring(1, c.length);
				if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
			}
			return null;
		},

		//清除cookies
		erase: function(name) {
			this.set(name, "", -1);
		}
	}

	//获取屏幕横屏、竖屏
	function orient() {
		var orientation;
		if (window.orientation == 90 || window.orientation == -90) {
			//ipad、iphone竖屏；Andriod横屏
			orientation = 'landscape';
		} else if (window.orientation == 0 || window.orientation == 180) {
			//ipad、iphone横屏；Andriod竖屏
			orientation = 'portrait';
		}
		return orientation;
	}

	// 合并对象
	function extend(to, from) {
		for (var key in from) {
			to[key] = from[key];
		}
		return to;
	}

	// 判断是否存在class
	function hasClass(obj, cls) {
		return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
	}

	// 添加class
	function addClass(obj, cls) {
		if (!hasClass(obj, cls)) obj.className += " " + cls;
	}

	// 移除class
	function removeClass(obj, cls) {
		if (hasClass(obj, cls)) {
			var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
			obj.className = obj.className.replace(reg, ' ');
		}
	}


	//打开APP
	var skipAPP ={
		androidFn: function() {
	        window.location.href = "myapp://tronker.com/openwith?h5AccessUrl="+accessUrl+"&title="+docTitle;
	        window.setTimeout(function(){
	           window.location.href = "https://www.tronker.com/work/tronker/qrcode.html?form=tronker"; /***下载app的地址***/
	        },2000);
	    },
	    iosFn: function() {
	        window.location.href = "iOSTronkerApp://?h5AccessUrl="+accessUrl+"&title="+docTitle;
	        window.setTimeout(function(){
	           window.location.href = "https://www.tronker.com/work/tronker/qrcode.html?form=tronker"; /***下载app的地址***/
	        },2000)
	    }
	}

	// distance : 底部距离
	// thisPage : 当前页
	// totalPage : 总页数
	// isLoad : 是否加载完成
	function distanceScroll(distance,thisPage,totalPage,isLoad){
		var scrollTop = document.body.scrollTop,
			docHeight = document.body.clientHeight,
			screenHeight = window.screen.availHeight;
		differ = scrollTop > docHeight - screenHeight - distance;
		if (differ && isLoad && thisPage <= totalPage ) {
			isLoad = !isLoad;
			vm.getList(thisPage);
		}	
	}


	function numberFormat(number, decimals, dec_point, thousands_sep){
		/*
	    * 参数说明：
	    * number：要格式化的数字
	    * decimals：保留几位小数
	    * dec_point：小数点符号
	    * thousands_sep：千分位符号
	    * */
	    number = (number + '').replace(/[^0-9+-Ee.]/g, '');
	    var n = !isFinite(+number) ? 0 : +number,
	        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
	        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
	        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
	        s = '',
	        toFixedFix = function (n, prec) {
	            var k = Math.pow(10, prec);
	            return '' + Math.ceil(n * k) / k;
	        };
	 
	    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
	    var re = /(-?\d+)(\d{3})/;
	    while (re.test(s[0])) {
	        s[0] = s[0].replace(re, "$1" + sep + "$2");
	    }
	 
	    if ((s[1] || '').length < prec) {
	        s[1] = s[1] || '';
	        s[1] += new Array(prec - s[1].length + 1).join('0');
	    }
	    return s.join(dec);
	}


	//判断是否为微信内核
	function isWeiXin(){
	    var ua = window.navigator.userAgent.toLowerCase();
	    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
	        return true;
	    }else{
	        return false;
	    }
	}


	/**
	 * 	
	 * @param  count  [description]
	 * @param  fmtStr [description]
	 * @param  endStr [description]
	 * countDown(60, '#{count} s', '重新获取')
	 */
	function countDown(count, fmtStr, endStr) {

		var _self = this,
			_count = count || 60,
			_fmtStr = fmtStr || '#{count}s',
			_endStr = endStr || '获取验证码',
			_interval = null;
		var currentTarget = event.currentTarget;
		currentTarget.innerHTML = _fmtStr.replace('#{count}', _count);
		_interval = setInterval(function() {
			_count--;
			if (_count == 0) {
				currentTarget.innerHTML = _endStr;
				currentTarget.classList.remove('disabled');
				clearInterval(_interval);
			} else {
				currentTarget.innerHTML = _fmtStr.replace('#{count}', _count);
			}
		}, 1000);
	}

})(this)
