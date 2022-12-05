// 页面数据
const pageData = {
	invitedCode: '', // 我的邀请码
	userInfo: {}, // 我的信息
	inviterInfo: {} // 邀请人信息
}
// 翻页信息
const pageInfo = {
	pageNum: 1,
	pageSize: 20
}
const FN = document.querySelector.bind(document)
const lang = localStorage.getItem('lang')
console.log('--------index.js--------', lang);

window.addEventListener('DOMContentLoaded', () => {
	//ios首次进入页面加载次方法，获取到uid
	if (browser.ios) {
		console.log('----ios调试--------------');
		window.appSetToken = appSetToken
	}

	console.log('-------userInfo----------', userInfo);

	if (browser.android) {
		langTranslate()
		getUserInfo()
		getMyInviteCode()
		getInviteIncome()
	}
		
	// 打开规则弹层
	FN('.i-aside_rule').addEventListener('click', function () {
		document.body.classList.add('bg-fixed')
		FN('.i-layer_mask').style.display = 'block'
		FN('.i-layer_rule').style.display = 'block'
		FN('.i-rule_close').addEventListener('click', function () {
			document.body.classList.remove('bg-fixed')
			FN('.i-layer_mask').style.display = 'none'
			FN('.i-rule_wrap').classList.add('i-rule_moveOut')
			setTimeout(() => {
				FN('.i-layer_rule').style.display = 'none'
				FN('.i-rule_wrap').classList.remove('i-rule_moveOut')
			}, 200)
		})
	})
	
	// 分享链接
	FN('.btn-share_link').addEventListener('click', function () {
		shareLink('.btn-share_link')
	})
	
	// 跳转家族扶持计划页
	
	
	// tabs 切换
	FN('.i-tab').addEventListener('click', function (e) {
		const cur = this.getAttribute('data-cur')
		const { target } = e
		if (target.nodeName === 'LI' && target.classList.contains('i-tab_item')) {
			const type = target.getAttribute('data-type')
			sessionStorage.removeItem('sortType')
			// 判断是否点击当前 tab
			if (cur !== type) {
				pageInfo.pageNum = 1
				FN('.i-content').innerHTML = ''
				this.setAttribute('data-cur', type)
				Array.from(target.parentNode.children).forEach(item => {
					item.classList.remove('i-tab_item--active')
				})
				target.classList.add('i-tab_item--active')
				switch (type) {
					case 'income':
						getInviteIncome(type)
						break
					case 'person':
						getInvitePerson(type)
						break
					case 'rank':
						getInviteRank(type)
						break
					default:
						break
				}
			}
		}
	})
	
	// 滚动列表事件委托监听
	FN('.i-content').addEventListener('click', e => {
		const { target } = e
		// 判断是否点击最新或最高排序
		if (target.nodeName === 'DIV' && (target.classList.contains('btn-latest') || target.classList.contains('btn-highest'))) {
			pageInfo.pageNum = 1
			FN('.i-content').innerHTML = ''
			if (target.classList.contains('btn-sort_active')) {
				target.previousElementSibling.classList.remove('btn-sort_active')
				target.classList.add('btn-sort_active')
			}
			const type = target.getAttribute('data-type')
			sessionStorage.setItem('sortType', type)
			getInvitePerson('person', { sortType: type })
			return
		}
		
		// 跳转兑换现金
		if (target.nodeName === 'DIV' && target.classList.contains('btn-exchange')) {
			_YM_JSBridge.openAppLink(1001)
		}
		
		// 跳转个人信息
		if ((target.nodeName === 'IMG' && target.classList.contains('i-content_item--avatar') || (target.nodeName === 'P' && target.classList.contains('i-content_item--nickname')))) {
			const uid = target.getAttribute('data-uid')
			console.log('log - uid ---------------->', uid)
			_YM_JSBridge.openUserInfo(uid)
		}
	})
})

window.onload = function () {
	// 打开海报弹层
	FN('.btn-share_poster').addEventListener('click', function () {
		createPosterLayer({
			uid: pageData.userInfo.chatNo,
			avatar: pageData.userInfo.avatar,
			code: pageData.invitedCode,
			url: 'https://www.sukiechat.com'
		}, 'invite', lang)
	})
	
	// 复制邀请码
	FN('.btn-copy').addEventListener('click', function () {
		const clipBoard = new ClipboardJS('.btn-copy')
		clipBoard.on('success', e => {
			defToast($.i18n().localize('common_copy_success'))
		})
	})
	
	// 填写邀请码
	FN('.i-aside_invite').addEventListener('click', function () {
		document.body.classList.add('bg-fixed')
		FN('.i-layer_mask').style.display = 'block'
		FN('.i-layer_code').style.display = 'block'
		FN('.i-invite_content').style.display = 'block'
		FN('.i-layer_code').setAttribute('data-type', 'invite')
	})
	
	// 确认邀请码
	FN('.i-invite_confirm').addEventListener('click', function () {
		const code = FN('.i-invite_input').value
		if (!code) {
			defToast($.i18n().localize('common_invite_input_code'))
			return
		}
		defRequest({
			url: 'api/user/invite/bind',
			method: 'post',
			data: {
				inviteCode: code
			}
		})
			.then(res => {
				if (res.data) {
					getMyInviteCode()
					pageData.inviterInfo = res.data
					FN('.i-treasure_avatar').src = res.data.avatar
					FN('.i-treasure_nickname').innerText = res.data.nickName
					setTimeout(() => {
						FN('.i-invite_content').style.display = 'none'
						FN('.i-treasure_content').style.display = 'block'
						FN('.i-invite_input').value = ''
						FN('.i-layer_code').setAttribute('data-type', 'treasure')
					}, 100)
				}
			})
			.catch(err => {
				defToast(err.message || 'error')
			})
		
	})
	
	// 确认打开宝箱
	FN('.i-treasure_open').addEventListener('click', function () {
		FN('.i-diamond_reward').innerText = pageData.inviterInfo.diamondNum
		FN('.i-treasure_content').style.display = 'none'
		FN('.i-diamond_content').style.display = 'block'
		FN('.i-layer_code').setAttribute('data-type', 'diamond')
	})
	
	// 确认收到钻石
	FN('.i-diamond_confirm').addEventListener('click', function () {
		document.body.classList.remove('bg-fixed')
		FN('.i-layer_code').setAttribute('data-type', '')
		FN('.i-layer_mask').style.display = 'none'
		FN('.i-layer_code').style.display = 'none'
		FN('.i-diamond_content').style.display = 'none'
	})
	
	// 关闭邀请码相关弹层
	FN('.i-code_close').addEventListener('click', function () {
		const type = FN('.i-layer_code').getAttribute('data-type')
		if (type === 'invite') {
			FN('.i-invite_input').value = ''
		}
		FN(`.i-${ type }_content`).style.display = 'none'
		FN('.i-layer_code').style.display = 'none'
		document.body.classList.remove('bg-fixed')
		FN('.i-layer_code').setAttribute('data-type', '')
		FN('.i-layer_mask').style.display = 'none'
	})
	
	// 滚动监听，tabs 固定顶部
	document.body.onscroll = function () {
		const tabTop = FN('.i-tabs').getBoundingClientRect().top
		const contentTop = FN('.i-content').getBoundingClientRect().top
		if (tabTop < 15) {
			FN('.i-tabs').style.cssText = `
				height: 100vh;
				overflow: hidden;
			`
			FN('.i-content').style.cssText = `
			 height: ${ window.innerHeight - contentTop }px;
			 overflow: auto
			`
		} else {
			FN('.i-tabs').style.cssText = `
				height: auto;
				overflow: auto;
			`
			FN('.i-content').style.cssText = `
			 min-height: ${ window.innerHeight - contentTop }px;
			 overflow: auto
			`
		}
	}
	
	// 数据列表滚动加载
	const scrollContentFn = function () {
		const curType = FN('.i-tab').getAttribute('data-cur')
		const eleHeight = FN('.i-content').clientHeight
		const scrollHeight = FN('.i-content').scrollHeight
		const scrollTop = FN('.i-content').scrollTop
		if (eleHeight === scrollHeight) return
		if (eleHeight + scrollTop + 10 >= scrollHeight) {
			pageInfo.pageNum++
			switch (curType) {
				case 'income':
					getInviteIncome(curType)
					break
				case 'person':
					getInvitePerson(curType)
					break
				case 'rank':
					getInviteRank(curType)
					break
				default:
					break
			}
		}
	}
	FN('.i-content').onscroll = debounce(scrollContentFn, 100)
}

/**
 * @desc 获取用户信息
 * @date 2022/5/24
 * @author: lzf
 * @param
 */
function getUserInfo () {
	defRequest({
		method: 'get',
		url: 'api/user/getInfo',
		data: {
			queryUid: userInfo.uid
		}
	})
		.then(res => {
			console.log('log - res ---------------->', res)
			pageData.userInfo = res.data
		})
		.catch(err => {
			defToast(err.message)
		})
}

/**
 * @desc 获取我的邀请码
 * @date 2022/5/24
 * @author: lzf
 * @param
 */
function getMyInviteCode () {
	defRequest({
		method: 'get',
		url: 'api/user/invite/getInfo'
	})
		.then(res => {
			console.log('log - res ---------------->', res)
			const { inviteCode, inputCode } = res.data
			pageData.invitedCode = inviteCode
			FN('.i-invite_code').innerText = inviteCode
			FN('.btn-copy').setAttribute('data-clipboard-text', inviteCode)
			if (inputCode) {
				FN('.i-aside_invite').style.display = 'flex'
			}
		})
		.catch(err => {
			defToast(err.message)
		})
}

/**
 * @desc 获取邀请收益
 * @date 2022/5/24
 * @author: lzf
 * @param {'income'} type=income
 */
function getInviteIncome (type = 'income') {
	defRequest({
		url: 'api/user/invite/inviteIncome',
		method: 'get',
		data: {
			...pageInfo
		}
	})
		.then(res => {
			console.log('---------邀请收益------', res);
			const { data: { incomeList, total } } = res
			setTimeout(() => {
				createInviteList(type, incomeList, total)
			})
		})
		.catch(err => {
			defToast(err.message)
		})
}

/**
 * @desc 获取邀请人数
 * @date 2022/5/24
 * @author: lzf
 * @param {'person'} type
 * @param {{sortType: string}} [param]
 * @param {1 | 2} param.sortType 1：最新；2：最高
 */
function getInvitePerson (type = 'person', param) {
	defRequest({
		url: 'api/user/invite/inviteUsers',
		method: 'get',
		data: {
			...pageInfo,
			sortType: 1,
			...param
		}
	})
		.then(res => {
			const { data: { userList, total } } = res
			createInviteList(type, userList, total)
		})
		.catch(err => {
			defToast(err.message)
		})
}

/**
 * @desc 获取邀请排行榜
 * @date 2022/5/24
 * @author: lzf
 * @param type { 'rank' }
 */
function getInviteRank (type) {
	defRequest({
		url: 'api/user/invite/listRank',
		method: 'get',
		data: {
			...pageInfo
		}
	})
		.then(res => {
			console.log('log - res ---------------->', res)
			const { data } = res
			createInviteList(type, data)
		})
		.catch(err => {
			defToast(err.message)
		})
}

/**
 * @desc 创建滚动列表
 * @date 2022/5/24
 * @author: lzf
 * @param {'income' | 'person' | 'rank'} type=income income:邀请收益：person:邀请人数；rank:邀请榜单
 * @param {object} data 数据
 * @param {string | number} [total] 总数相关数据
 */
function createInviteList (type, data, total) {
	const docFrag = document.createDocumentFragment()
	if (pageInfo.pageNum === 1) {
		docFrag.appendChild(createFirstInviteItem(type, total))
	}
	if (data.length > 0) {
		for (let i = 0, len = data.length; i < len; i++) {
			data[i] = { ...data[i], index: i + 1 }
			docFrag.appendChild(createInviteItem(type, data[i]))
		}
	} else {
		if (pageInfo.pageNum === 1) {
			const emptyContent = `
			<p class="i-content_item--empty">${ $.i18n().localize(`common_${ type }_empty`) }</p>
		`
			docFrag.appendChild(document.createRange().createContextualFragment(emptyContent))
		}
	}
	const top = FN('.i-content').getBoundingClientRect().top
	const clientH = window.innerHeight
	FN('.i-content').style.minHeight = `${ clientH - top }px`
	FN('.i-content').className = `i-content i-content_${ type }`
	FN('.i-content').appendChild(docFrag)
}

/**
 * @desc 创建邀请相关第一个 item
 * @date 2022/5/24
 * @author: lzf
 * @param type {'income' | 'person' | 'rank'} income:邀请收益：person:邀请人数；rank:邀请榜单
 * @param data {object} 数据
 * @return {DocumentFragment}
 */
function createFirstInviteItem (type = 'income', data) {
	let firstItem
	switch (type) {
		case 'income':
			firstItem = `
				<div class="i-content_first--item">
					<p>
						<span data-i18n="common_invite_total_money">${ $.i18n().localize('common_invite_total_money') }</span>
						<span>${ data }</span>
					</p>
					<div class="btn-exchange" data-i18n="common_invite_exchange_money">${ $.i18n().localize('common_invite_exchange_money') }</div>
				</div>
			`
			break
		case 'person': {
			const sortType = sessionStorage.getItem('sortType') || '1'
			firstItem = `
					<div class="i-content_first--item">
						<p>
							<span data-i18n="common_invite_total_count">${ $.i18n().localize('common_invite_total_count') }</span>
							<span>${ data }</span>
						</p>
						<div data-type="1" data-i18n="common_invite_new" class="btn-latest ${ sortType === '1' ? ' btn-sort_active' : '' }">${ $.i18n().localize('common_invite_new') }</div>
						<div data-type="2" data.i18n="common_invite_height" class="btn-highest ${ sortType === '2' ? ' btn-sort_active' : '' }">${ $.i18n().localize('common_invite_height') }</div>
					</div>
				`
		}
			break
		default:
			firstItem = ''
	}
	return document.createRange().createContextualFragment(firstItem)
}

/**
 * @desc 创建邀请相关 item
 * @date 2022/5/24
 * @author: lzf
 * @param type {'income' | 'person' | 'rank'} income:邀请收益：person:邀请人数；rank:邀请榜单
 * @param data {object} 数据
 * @return {DocumentFragment}
 */
function createInviteItem (type = 'income', data) {
	let inviteInfo
	if (type === 'income') {
		inviteInfo = `
			<p>${ $.i18n().localize('user_invite1') } ${ data.diamond }
				<img
						alt=""
						class="i-content_income--item--diamond"
						src="images/index/icon-diamond@2x.png" />
			</p>
			<p class="i-content_income--item--sub">${ data.incomeDate }</p>
		`
	} else {
		inviteInfo = `
			<p class="i-content_item--nickname" data-uid="${ data.uid }">${ data.nickname }</p>
			<p class="i-content_income--item--sub">
				${ $.i18n().localize('user_invite1') } ${ data.diamond }
				<img
						alt=""
						class="i-content_income--item--diamond"
						src="images/index/icon-diamond@2x.png" />
			</p>
		`
	}
	const inviteItem = `
		<div class="i-content_item i-${ type }_item">
			${ type === 'rank' ? `<span class="i-content_item--order">${ (pageInfo.pageNum - 1) * pageInfo.pageSize + data.index }</span>` : '' }
			${ type !== 'income' ? `<img
					alt=""
					data-uid="${ data.uid }"
					class="i-content_item--avatar"
					src="${ data.avatar }">` : '' }
			<div class="i-content_item--info">
				${ inviteInfo }
			</div>
			</div>
			`
			// <p>+${ data.amount }$</p>
	return document.createRange().createContextualFragment(inviteItem)
}

// //ios首次进入页面加载次方法，获取到uid
function appSetToken(user, device) {
	console.log('-------ios------user-----------', user);
	console.log('-------ios------device-----------', device);
	userInfo = JSON.parse(user)
	deviceInfo = JSON.parse(device)
	
	localStorage.setItem('lang', device.lang)
	localStorage.setItem('info', JSON.stringify(user))
	localStorage.setItem('deviceInfo', JSON.stringify(device))

	langTranslate()
	getUserInfo()
	getMyInviteCode()
	getInviteIncome()
}
