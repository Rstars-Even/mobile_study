/**
 * @description 建议 toast
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

// 简易请求封装
function defRequest (param) {
	param.data = {
		...param.data,
		...deviceInfo,
		ticket: userInfo.ticket,
		uid: userInfo.uid
	}
	let origin = location.origin
	origin = origin.indexOf('localhost') > -1 ? 'http://beta.sukiechat.com' : origin
	// origin = origin.indexOf('beta') > -1 ? origin : 'http://act.sukiechat.com'
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
 * @description 防抖
 * @date 2022/5/30
 * @author: lzf
 * @param {function} fn 需执行防抖的函数
 * @param {number} wait 延迟时间
 * @return {function}
 */
function debounce (fn, wait) {
	let timer = null
	return function () {
		if (timer) clearTimeout(timer)
		timer = setTimeout(function () {
			fn.apply(this, arguments)
		}, wait)
	}
}

/**
 * @description 分享链接
 * @date 2022/5/23
 * @author: lzf
 * @param {String} elem 分享的元素
 * @param {string} [url] 需分享的链接
 */
function shareLink (elem, url= 'https://www.sukiechat.com') {
	const copyText = url
	const clipBoard = new ClipboardJS(elem, {
		text: function () {
			return copyText
		}
	})
	clipBoard.on('success', e => {
		defToast($.i18n().localize('common_copy_share'))
	})
}

/**
 * @desc 创建海报弹层
 * @date 2022/5/23
 * @author: lzf
 * @param {object} data 海报数据
 * @param {number | string} data.uid uid
 * @param {string} data.avatar 头像
 * @param {string} [data.code] 邀请码
 * @param {string} data.url 二维码链接
 * @param {'invite' | 'family'} type='invite' 海报类型 invite：邀请赚钱；family：家族扶持
 * @param {'cn' | 'en' | 'vn'} lang='cn' 语言类型 cn：中文；en：英文：vn：越南语
 */
function createPosterLayer (data, type = 'invite', lang = 'cn') {
	addStyle(type, lang)
	const layer = addLayer(data, type, lang)
	const docFrag = document.createDocumentFragment()
	docFrag.appendChild(document.createRange().createContextualFragment(layer))
	document.body.appendChild(docFrag)
	
	const layerEle = document.querySelector('.poster-layer')
	
	const { url } = data
	// 生成二维码
	createQRCode('poster-qrCode', { text: url })
	
	// 生成海报图片
	document.querySelector('.btn-save').addEventListener('click', function () {
		createPosterImage('.poster-wrap', {
			background: '#fff',
			useCORS: true,
			allowTaint: true
		})
			.then(res => {
				if (window.androidJsObj) {
					window.androidJsObj.saveImages(res)
				} else {
					console.log('log - error ---------------->, "没有找到saveImages方法"')
				}
				defToast($.i18n().localize('common_save_share'))
				document.body.removeChild(layerEle)
			})
		
	})
	
	layerEle.addEventListener('click', function (e) {
		if (e.target.classList.contains('poster-layer')) {
			document.body.removeChild(layerEle)
		}
	})
	
	const posterAvatar = document.querySelector('.poster-avatar').getAttribute('src')
	convertImgToBase64(posterAvatar).then(res => {
		console.log('log - res ---------------->', res)
		document.querySelector('.poster-avatar').src = res
	})
	
	// 创建弹层node
	function addLayer (data, type, lang) {
		console.log('log - data ---------------->', data)
		const { avatar, uid, code } = data
		return `
			<div class="poster-layer">
				<div class="poster-wrap">
					<img
						alt=""
						class="poster-banner"
						src="images/${ lang }/poster-banner_${ type }@2x.png" />
					<div class="poster-content poster-content_${ type }">
						<img
							class="poster-avatar"
							alt=""
							src="${ avatar || '' }">
						<p class="poster-id">ID：${ uid || '' }</p>
						<p class="poster-tips" data-i18n="${ type === 'invite' ? 'common_invite_poster_into1' : 'common_invite_poster_into' }">${ type === 'invite' ? $.i18n().localize('common_invite_poster_into1') : $.i18n().localize('common_invite_poster_into') }</p>
						<div
							id="poster-qrCode"
							class="poster-qrCode"></div>
							${ type === 'invite' ? `<p class="poster-invite-code"><span data-i18n="common_invite_poster_code">${ $.i18n().localize('common_invite_poster_code') }</span>${ code || '' }</p>` : '' }
					</div>
				</div>
				<div class="btn-save btn-save_${ type }" data-i18n="common_save_poster">
					${ $.i18n().localize('common_save_poster') }
				</div>
			</div>
		`
	}
	
	// 添加样式
	function addStyle (type, lang) {
		const styleEle = document.createElement('style')
		styleEle.innerHTML = `
		.poster-layer{position:fixed;top:0;left:0;width:100vw;height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:9999;background-color:rgba(0,0,0,.5);}.poster-wrap{width:89.87vw;height:134.67vw;margin:0 auto;padding-top:4vw;text-align:center;background:url("images/poster-bg_${ type }@2x.png") no-repeat;background-size:contain;}.poster-banner{width:79.2vw;height:26.13vw;}.poster-content{width:79.2vw;height:97.87vw;margin:0 auto;}.poster-content_invite{background-color:#fff;border-radius:5.33vw;}.poster-content_family{background:url("images/support/img-poster-content@2x.png") no-repeat;background-size:contain;}.poster-avatar{margin-top:6.4vw;width:14.93vw;height:14.93vw;border-radius:5.33vw;}.poster-id,.poster-invite-code{font-weight:600;font-size:0.373rem;}.poster-tips{margin-top:9.33vw;font-size:0.32rem;}.poster-qrCode{margin:3.2vw auto 0;width:36.27vw;height:36.27vw;}.poster-qrCode>img{width:100%;}.poster-qrCode>canvas{width:100%;height:100%;}.poster-invite-code{margin-top:4vw;}.btn-save{margin-top:5.33vw;padding-top:4vw;text-align:center;font-size:0.453rem;font-weight:600;}.btn-save_family{width:76vw;height:15.47vw;background:url("images/btn-save_family@2x.png") no-repeat;background-size:contain;}.btn-save_invite {width:57.33vw;height:15.2vw;background: url("images/btn-save_invite@2x.png") no-repeat;background-size: contain;color:#fff;}
		`
		document.head.appendChild(styleEle)
	}
}

/**
 * @desc 生成二维码
 * @date 2022/5/20
 * @author: lzf
 * @param {string} elem 二维码盒子
 * @param {object} options 参数选项
 */
function createQRCode (elem, options) {
	new QRCode(elem, options)
}

/**
 * @desc 生成海报图片
 * @date 2022/5/20
 * @author: lzf
 * @param {string} elem 需要生成图片的元素
 * @param {object} options
 * @return {promise}
 */
function createPosterImage (elem, options) {
	return new Promise((resolve, reject) => {
		const qrCode = document.querySelector(elem)
		html2canvas(qrCode, {
			width: qrCode.clientWidth,
			height: qrCode.clientHeight,
			...options
		})
			.then(canvas => {
				// 将 canvas 内容转为 base64 图片
				const imgUrl = canvas.toDataURL()
				resolve(imgUrl)
			})
			.catch(err => {
				console.log('log - err ---------------->', err)
			})
	})
}

/**
 * @desc 語言轉譯
 * @date 2022/5/30
 * @author: lzf
 * @param
 */
function langTranslate () {
	const $i18n = $.i18n()
	$i18n.locale = lang
	$.i18n.debug = true
	$i18n.load(`lang/${ lang }.json`, $i18n.locale).done(
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


/**
 * @description
 * @date 2022/6/7
 * @author: lzf
 * @param {string} url 图片链接
 */
function convertImgToBase64 (url) {
	return new Promise((resolve) => {
		const canvas = document.createElement('canvas')
		const ctx = canvas.getContext('2d')
		const img = new Image()
		img.setAttribute('crossOrigin', 'Anonymous')
		img.src = `${ url }?version=${ new Date().valueOf() }`
		console.log('log - url ---------------->', url)
		img.onload = function () {
			console.log('log - onload ---------------->', 'onload')
			canvas.height = img.height
			canvas.width = img.width
			ctx.drawImage(img, 0, 0)
			const dataURL = canvas.toDataURL('image/png')
			resolve(dataURL)
		}
		img.onerror = function (err) {
			console.log('log - err ---------------->', err)
		}
	})
}
