/**
 *
 * @authors H君 (262281610@qq.com)
 * @date    2014-11-12 16:43:31
 * @version $Id$
 */
;
(function(window) {
	var c = {
		//获取CLASS对象
		getElementsClass: function(id, classnames) {
			var classobj = [];
			var tags = document.getElementById(id).getElementsByTagName("*");
			for (var i = 0; i < tags.length; i++) {
				if (tags[i].getAttribute("class") == classnames) {
					classobj.push(tags[i]);
				}
			}
			return classobj;
		},

		//是否含有CLASS
		hasClass: function(id, classnames) {
			var status;
			var tags = document.getElementById(id).getElementsByTagName("*");
			for (var i = 0; i < tags.length; i++) {
				if (tags[i].getAttribute("class") == classnames) {
					status = true;
				} else {
					status = false;
				}
			}
			return status;
		},

		//获取url地址参数值
		getQueryString: function(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
			var r = window.location.search.substr(1).match(reg);
			if (r != null) return unescape(r[2]);
			return null;
		},

		//匹配终端
		browser: function() {
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
		},

		//cookies操作 
		cookies: {
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
		},

		//获取屏幕横屏、竖屏
		orient: function() {
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

	};
	window.c=c;
})(this)
