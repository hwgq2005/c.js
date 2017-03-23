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

})(this)
