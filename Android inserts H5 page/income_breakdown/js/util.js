// (function () {
    // 调试工具加载
	// const script = document.createElement('script')
	// script.src = './lib/eruda.min.js'
	// document.body.appendChild(script)
	// script.onload = function () { eruda.init() }

    /**
     * @description 获取客户端类型
     * @date 2022/6/7
     * @author: lzf
     */
    function checkClient () {
        const u = navigator.userAgent,
            app = navigator.appVersion
        return {
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') === -1, //是否web应该程序，没有头部与底部
            weixin: u.indexOf('MicroMessenger') > -1, //是否微信
            qq: u.match(/\sQQ/i) === ' qq', //是否QQ
        }
    }
    const browser = checkClient()
    // console.log('browser=====:', browser)


    /**
     * @description 用户信息
     * @date 2022/6/2
     * @author: lzf
     * @param {object} userInfo
     * @param {number} userInfo.uid 用户uid
     * @param {string} userInfo.ticket 用户登录ticket
     */
    let userInfo = {
        // uid: '102',
        // ticket: "4a9d3d06a43bd4e01b28f408a1d65be9",
    }


    /**
     * @description 设备信息
     * @date 2022/6/2
     * @author: lzf
     * @param {object} deviceInfo
     * @param {string} deviceInfo.app app名称
     * @param {string} deviceInfo.appVersion app版本
     * @param {string} deviceInfo.country 国家
     * @param {string} deviceInfo.deviceId 设备id
     * @param {string} deviceInfo.fcmToken FCM推送token
     * @param {string} deviceInfo.imei 设备imei号
     * @param {string} deviceInfo.lang 语言
     * @param {string} deviceInfo.os 操作系统
     */
    let deviceInfo = {
        // app: 'yamoo',
        // appVersion: '1.0.0',
        // country: 'Vietnam',
        // deviceId: '001',
        // fcmToken: 'fcmToken',
        // imei: '001',
        // lang: 'zh',
        // os: 'android',
        // brand: 'Huawei',
        // model: 'P40%20pro',
        // osVersion: '10.0'
    }

    // Yamoo APP中h5调用原生app方法
    const _YM_JSBridge = {
        /**
         * @description 获取设备相关信息
         * @date 2022/6/2
         * @author: lzf
         */
        _getAppDeviceInfo () {
            console.log('--_getAppDeviceInfo----------', window.androidJsObj);
            if (browser.android) {
                console.log('是安卓手机。。。');                
                deviceInfo = { ...JSON.parse(window.androidJsObj.getDeviceInfo()) }
            }
        },
        
        /**
         * @description 获取用户uid、token
         * @date 2022/6/2
         * @author: lzf
         */
        _getAppUserInfo () {
            if (browser.android) {
                console.log('安卓获取身份信息：')
                
                userInfo.uid = parseInt(window.androidJsObj.getUid())
                userInfo.ticket = window.androidJsObj.getTicket()

            }
        },
        
        // 查看用户信息。。
        openUserInfo (uid) {
            if (browser.android) {
                window.androidJsObj.openUserPage(uid)
            }
        }
    }

    _YM_JSBridge._getAppUserInfo()
    _YM_JSBridge._getAppDeviceInfo()


    // 简易请求封装。。
    function defRequest (param) {
       
        param.data = {
            ...param.data,
            ...deviceInfo,
            // ticket: userInfo.ticket,
            // uid: userInfo.uid,
            ticket: "b64b522102bb3fce5b9a613de5e941bd",
            uid: 125,
        }
        let origin = location.origin
        origin = 'http://beta.sukiechat.com'
        return new Promise((resolve, reject) => {
            param.data = param.data || {}
            const formData = []
            
            for (let key in param.data) {
                formData.push(`${ key }=${ param.data[key] }`)
            }
            param.data = formData.join('&')
            
            const req = new XMLHttpRequest()
            req.responseType = 'json'
            
            // 超时处理
            req.timeout = 1000 * 60
            req.ontimeout = function () {
                req.abort()
            }
            
            req.onreadystatechange = function () {
                if (req.readyState === 4) {
                    if (req.status === 200) {
                        if (req.response.code === 200) {
                            resolve(req.response)
                        } else {
                            reject(req.response)
                        }
                    } else {
                        reject(req.response)
                    }
                }
            }
            
            if (param.method === 'get') {
                // console.log('---最终请求地址---:', `${ origin }/${ param.url }?${ param.data }`)
                req.open('get', `${ origin }/${ param.url }?${ param.data }`)
            }
            if (param.method === 'post') {
                req.open('post', `${ origin }/${ param.url }?`)
                req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8')
            }
            req.send(param.method === 'post' ? new URLSearchParams(param.data) : null)
        })
    }


    /**
        * @description 建议 toast 提示框。
        * @date 2022/5/30
        * @author: lzf
        * @param {string} msg toast内容
        * @param {number} [duration=1500] 自动关闭时间
    */
    function defToast (msg, duration = 1500) {
        const toastList = document.querySelector('.d-toast')
        if (toastList) {
            if (this.timer) {
                clearTimeout(this.timer)
            }
            toastList.parentNode.removeChild(toastList)
        }
        
        const divElm = document.createElement('div')
        divElm.innerText = msg
        divElm.classList.add('d-toast')
        divElm.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            z-index: 99999;
            -webkit-transform: translate3d(-50%, -50%, 0);
            -moz-transform: translate3d(-50%, -50%, 0);
            -ms-transform: translate3d(-50%, -50%, 0);
            transform: translate3d(-50%, -50%, 0);
            background-color: rgba(0, 0, 0, .5);
            font-size: 0.373rem;
            color: #fff;
            border-radius: 2.67vw;
            padding: 1.6vw 2.67vw;
        `
        document.body.appendChild(divElm)
        this.timer = setTimeout(() => {
            if (divElm) document.body.removeChild(divElm)
        }, duration)
    }

    // 设置语言类型
	if (browser.android) {
        console.log('国际化初始化');
        console.log('-------------userInfo', userInfo);
        console.log('-------------deviceInfo', deviceInfo);
        
        const lang = deviceInfo.lang;
        langTranslate (lang)
    } 

    function langTranslate (lang) {
        const $i18n = $.i18n()
        // $i18n.locale = lang
        $i18n.locale = 'zh'

        console.log("...------lang------..", lang)

        $.i18n.debug = true
        // $i18n.load(`lang/i18n_${ lang }.json`, $i18n.locale).done(
        $i18n.load(`lang/i18n_zh.json`, $i18n.locale).done(
            function () {
                $('[data-i18n]').each(function (index, item) {
                    if (item.nodeName === 'INPUT' && item.getAttribute('placeholder')) {
                        item.setAttribute('placeholder', $i18n.localize($(item).data('i18n')))
                    } else {
                        $(item).text($i18n.localize($(item).data('i18n')))
                    }
                })
            }
        )
    }
    // langTranslate ()
// })();