const pageData = {
	userInfo: {},
	familyInfo: {}
}

const FN = document.querySelector.bind(document)
const lang = localStorage.getItem('lang')

window.addEventListener('DOMContentLoaded', () => {
	langTranslate()
	getUserInfo()
})

window.onload = function () {
	// 跳转邀请页
	FN('.s-aside_invite').addEventListener('click', function () {
		location.href = `index.html?lang=${ lang }`
	})
	
	// 分享链接
	FN('.btn-share_link').addEventListener('click', function () {
		shareLink('.btn-share_link')
	})
	
	// 打开海报弹层
	FN('.btn-share_poster').addEventListener('click', function () {
		createPosterLayer({
			uid: pageData.familyInfo.familyNo || '',
			avatar: pageData.familyInfo.familyLogo || '',
			url: 'https://www.sukiechat.com'
		}, 'family', lang)
	})
	
	// 跳转创建家族
	FN('.s-family_create').addEventListener('click', function() {
		console.log('log - _YM_JSBridge ---------------->', _YM_JSBridge)
		_YM_JSBridge.openAppLink(1002)
	})
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
			pageData.userInfo = res.data
			if (res.data.familyId === 0) {
				FN('.s-family_create').style.display = 'block'
			} else {
				FN('.s-family_share').style.display = 'flex'
				getFamilyInfo()
			}
		})
		.catch(err => {
			defToast(err.message)
		})
}

/**
 * @desc 获取家族信息
 * @date 2022/5/25
 * @author: lzf
 * @param
 */
function getFamilyInfo () {
	defRequest({
		method: 'get',
		url: 'api/family/getInfo',
		data: {
			familyId: pageData.userInfo.familyId
		}
	}).then(res => {
		  pageData.familyInfo = res.data
	  })
	  .catch(err => {
		  defToast(err.message)
	  })
}
