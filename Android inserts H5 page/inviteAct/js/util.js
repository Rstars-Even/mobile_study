(function () {
	// 设置语言类型
	const url = new URLSearchParams(location.search)
	const lang = url.get('lang')
	document.body.setAttribute('data-lang', lang)
	localStorage.setItem('lang', lang)
	// 调试工具加载
	// const script = document.createElement('script')
	// script.src = 'lib/eruda.min.js'
	// document.body.appendChild(script)
	// script.onload = function () { eruda.init() }
})()


const browser = checkClient()

/**
 * @description 用户信息
 * @date 2022/6/2
 * @author: lzf
 * @param {object} userInfo
 * @param {number} userInfo.uid 用户uid
 * @param {string} userInfo.ticket 用户登录ticket
 */
let userInfo = {
	// uid: '10161',
	// ticket: '82ff9783f7132fcf8c508ac4dd21e5dc'
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
	// app: 'sukie',
	// appVersion: '1.0.0',
	// country: 'HongKong',
	// deviceId: '001',
	// fcmToken: 'fcmToken',
	// imei: '001',
	// lang: 'en',
	// os: 'android'
}

// Yamoo APP中h5调用原生app方法
const _YM_JSBridge = {
	/**
	 * @description 获取设备相关信息
	 * @date 2022/6/2
	 * @author: lzf
	 */
	_getAppDeviceInfo () {
		if (browser.android && window.androidJsObj) {
			deviceInfo = { ...JSON.parse(window.androidJsObj.getDeviceInfo()) }
		} else if (browser.ios && window.webkit) {
		
		}
		localStorage.setItem('deviceInfo', JSON.stringify(deviceInfo))
	},
	
	/**
	 * @description 获取用户uid、token
	 * @date 2022/6/2
	 * @author: lzf
	 */
	_getAppUserInfo () {
		if (browser.ios && window.webkit) {
			// window.webkit.messageHandlers.getUid.postMessage(null)
			// window.webkit.messageHandlers.getTicket.postMessage(null)
		} else if (browser.android) {
			console.log('-----android---------');
			userInfo.uid = parseInt(window.androidJsObj.getUid())
			userInfo.ticket = window.androidJsObj.getTicket()
			userInfo.auth = 'Bearer ' + userInfo.ticket
			localStorage.setItem('info', JSON.stringify(userInfo))
		}
	},
	
	/**
	 * @desc app 链接跳转
	 * @date 2022/5/30
	 * @author: lzf
	 * @param {string|number} url 跳转的链接key
	 */
	openAppLink: function (url) {
		if (browser.android) {
			const urlMap = {
				1001: 'app://yamoo.com/UserDiamondActivity', // 跳转兑换现金
				1002: 'app://yamoo.com/HomeFamilyCreateActivity', // 跳转创建家族
				1003: 'app://yamoo.com/UserAuthActivity' // 跳转真人认证
			}
			window.location.href = urlMap[url]
		} else if (browser.ios) {
			if (url == 1001) {
				window.webkit.messageHandlers.jump_income.postMessage(null) // 跳转兑换现金
			}
		}
	},

	openUserInfo (uid) {
		if (browser.android) {
			window.androidJsObj.openUserPage(uid)
		} else if (browser.ios) {
            window.webkit.messageHandlers.jump_userinfo.postMessage(uid)
		}
	}
}

_YM_JSBridge._getAppUserInfo()
_YM_JSBridge._getAppDeviceInfo()


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


// //ios首次进入页面加载次方法，获取到uid
// if (browser.ios) {
// 	console.log('----ios调试--------------');
// 	window.appSetToken = appSetToken
// }
// function appSetToken(user, device) {
// 	console.log('-------ios------user-----------', user);
// 	console.log('-------ios------device-----------', device);
// 	userInfo = JSON.parse(user)
// 	deviceInfo = JSON.parse(device)
	
// 	localStorage.setItem('lang', device.lang)
// 	localStorage.setItem('info', JSON.stringify(user))
// 	localStorage.setItem('deviceInfo', JSON.stringify(device))

// 	langTranslate()
// 	getUserInfo()
// 	getMyInviteCode()
// 	getInviteIncome()
// }