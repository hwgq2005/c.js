
/**
 * @authors H君
 * @date     2017-07-01 18:10:09
 */

;(function(window) {

    var h = {};

    /**
     * 获取url参数值
     * @param name - 参数名称
     */
    h.getQueryString = function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.slice(1).match(reg);
        return r != null ? unescape(r[2]) : null;
    }


    /**
     * 匹配终端
     */
    h.browser = function() {
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

    /**
     * cookies操作 
     */
    h.cookies = function(){

        var cookies = {
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
        return cookies;
    }
   

    /**
     * 获取屏幕横屏、竖屏
     */
    h.orient = function() {
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


    /**
     * 合并对象
     */
    h.extend = function(to, from) {
        for (var key in from) {
            to[key] = from[key];
        }
        return to;
    }

    /**
     *  判断是否存在class
     */
    h.hasClass = function(obj, cls) {
        return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    }

    /**
     *  添加class
     */
    h.addClass = function(obj, cls) {
        if (!hasClass(obj, cls)) obj.className += " " + cls;
    }

    /**
     *  移除class
     */
    h.removeClass = function(obj, cls) {
        if (hasClass(obj, cls)) {
            var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
            obj.className = obj.className.replace(reg, ' ');
        }
    }

    /**
     *  获取兄弟元素
     */
    h.sibling = function(elem) {
        var obj = [],
            elemArr = elem.parentNode.children;

        for (var i = 0; i < elemArr.length; i++) {
            if (elemArr[i] != elem) {
                obj.push(elemArr[i]);
            }
        }
        return obj;
    }

    /**
     *  前一个兄弟节点
     */
    h.prevSibling = function(node) {
        var tempFirst = node.parentNode.firstChild;
        if (node == tempFirst) return null;
        var tempObj = node.previousSibling;
        while (tempObj.nodeType != 1 && tempObj.previousSibling != null) {
            tempObj = tempObj.previousSibling;
        }
        return (tempObj.nodeType == 1) ? tempObj : null;
    }

    /**
     *  下一个兄弟节点
     */
    h.nextSibling = function(node) {
        var tempLast = node.parentNode.lastChild;
        if (node == tempLast) return null;
        var tempObj = node.nextSibling;
        while (tempObj.nodeType != 1 && tempObj.nextSibling != null) {
            tempObj = tempObj.nextSibling;
        }
        return (tempObj.nodeType == 1) ? tempObj : null;
    }


    /*
     * 下滑滚动
     * @param distance - 底部距离
     * @param callback - 回调函数
     */
    h.distanceScroll = function(distance, callback) {

        const vm = this;
        const scrollTop = document.body.scrollTop || document.documentElement.scrollTop,
            docHeight = document.body.clientHeight,
            screenHeight = window.screen.availHeight;

        const differ = scrollTop > docHeight - screenHeight - distance;

        if (differ && vm.isLoad) {
            callback();
        }

    }

    /**
     * 判断是否为微信内核
     */
    h.isWeChat = function() {
        var ua = window.navigator.userAgent.toLowerCase()
        ua.match(/MicroMessenger/i) == 'micromessenger' ?
            return true: return false
    }

    /**
     * 倒计时
     * @param seconds   - 秒数
     * @param startText - 倒计时中文案
     * @param endText   - 结束后文案
     * @param callback  - 结束后回调方法
     */
    h.countDown(options) {
        var vm = this;
        var defaults = {
            seconds: 60,
            startText: '${seconds}s',
            endText: '重发验证码',
            callback: function(){}
        };
        options = Object.assign({},defaults,options);
        if (!options.el) return;
        if (vm.countDown.status) return;
        vm.countDown.status = true;
        options.el.innerHTML = options.startText.replace('${seconds}',options.seconds);
        var time = null;
        time = setInterval(function () {
            options.seconds--;
            if (!options.seconds) {
                clearInterval(time);
                options.el.innerHTML = defaults.endText;
                vm.countDown.status = false;
                options.callback ? options.callback() : '';
                return;
            }
            options.el.innerHTML = options.startText.replace('${seconds}',options.seconds);
        }, 1000);
    },

    /**
     * 请求封装
     * @param url     - 地址
     * @param method  - 请求方法
     * @param data    - 传输数据
     * @param success - 请求成功回调
     * @param fail    - 请求失败回调
     */
    h.getJSON = function(options) {

        var keys = '';
        for (var key in options.data) {
            keys += key + '=' + options.data[key] + '&'
        }
        keys = keys.substring(0, keys.length - 1);

        options.method.toUpperCase() == 'GET' ? (
            keys += '&' + options.url.split('?').pop(),
            options.url = options.url.split('?').shift()
        ) : '';

        var xml;
        if (window.XMLHttpRequest) {
            xml = new XMLHttpRequest();
        } else {
            xml = new ActiveXObject('Microsoft.XMLHTTP');
        }
        var handler = function() {

            if (xml.readyState == 4 && xml.status == 200) {
                options.success ? options.success(xml.response) : '';
            }else if (xml.readyState == 4 && xml.status != 200) {
                options.fail ? options.fail(xml.response) : '';
            }
        }

        xml.open(options.method, options.method.toUpperCase() == 'GET' ? options.url + '?' + keys :     options.url,true);
        xml.onreadystatechange = handler;
        xml.responseType = 'json';

        //post请求一定要添加请求头才行不然会报错
        xml.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xml.setRequestHeader('Accept', 'application/json');
        xml.send(options.method.toUpperCase() == 'POST' ? keys : '');
    }

    window.h = h;

})(this)
