(function () {
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
    console.log('browser=====:', browser)


    /**
     * @description 用户信息
     * @date 2022/6/2
     * @author: lzf
     * @param {object} userInfo
     * @param {number} userInfo.uid 用户uid
     * @param {string} userInfo.ticket 用户登录ticket
     */
    let userInfo = {
        uid: '100',
        ticket: '65b04941ce3de4950c2587dca22e6d2b'
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
        app: 'yamoo',
        appVersion: '1.0.0',
        country: 'Vietnam',
        deviceId: '001',
        fcmToken: 'fcmToken',
        imei: '001',
        lang: 'zh',
        os: 'android',
        brand: 'Huawei',
        model: 'P40%20pro',
        osVersion: '10.0'
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

                console.log('调用安卓方法：', JSON.stringify(deviceInfo))
                
            } else if (browser.ios && window.webkit) {}
            localStorage.setItem('deviceInfo', JSON.stringify(deviceInfo))
        },
        
        /**
         * @description 获取用户uid、token
         * @date 2022/6/2
         * @author: lzf
         */
        _getAppUserInfo () {
            if (browser.ios && window.webkit) {
                window.webkit.messageHandlers.getUid.postMessage(null)
                window.webkit.messageHandlers.getTicket.postMessage(null)
            } else if (browser.android) {
                userInfo.uid = parseInt(window.androidJsObj.getUid())

                alert('调用安卓方法：', window.androidJsObj.getTicket())
                
                userInfo.ticket = window.androidJsObj.getTicket()
                userInfo.auth = 'Bearer ' + userInfo.ticket
                localStorage.setItem('info', JSON.stringify(userInfo))
            }
        },
        
        // /**
        //  * @desc app 链接跳转
        //  * @date 2022/5/30
        //  * @author: lzf
        //  * @param {string|number} url 跳转的链接key
        //  */
        // openAppLink: function (url) {
        //     if (browser.android) {
        //         const urlMap = {
        //             1001: 'app://yamoo.com/UserDiamondActivity', // 跳转兑换现金
        //             1002: 'app://yamoo.com/HomeFamilyCreateActivity', // 跳转创建家族
        //             1003: 'app://yamoo.com/UserAuthActivity' // 跳转真人认证
        //         }
        //         window.location.href = urlMap[url]
        //     } else if (browser.ios) {
        //     }
        // },

        // openUserInfo (uid) {
        //     if (browser.android) {
        //         window.androidJsObj.openUserPage(uid)
        //     }
        // }
    }

    _YM_JSBridge._getAppUserInfo()
    _YM_JSBridge._getAppDeviceInfo()


    //头部轮播图。。
    let swiper = new Swiper(".study_fo", {
        // 可以看到的是 3个半
        slidesPerView: 3.5,
        // 每个的元素间隔
        spaceBetween: -12,
    });


        
    // 简易请求封装。。
    function defRequest (param) {
       
        param.data = {
            ...param.data,
            ...deviceInfo,
            ticket: userInfo.ticket,
            uid: userInfo.uid,
        }
        let origin = location.origin
        console.log('origin----------', origin)
        console.log('oriparam.datagin----------', param.data)
        // origin = origin.indexOf('localhost') > -1 ? 'http://beta.sukiechat.com' : origin
        // origin = origin.indexOf('beta') > -1 ? origin : 'http://act.sukiechat.com'
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
                console.log('---最终请求地址---:', `${ origin }/${ param.url }?${ param.data }`)
                req.open('get', `${ origin }/${ param.url }?${ param.data }`)
            }
            if (param.method === 'post') {
                req.open('post', `${ origin }/${ param.url }?`)
                req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8')
            }
            req.send(param.method === 'post' ? new URLSearchParams(param.data) : null)
        })
    }


    // 获取钻石任务列表数据。。。
    function getUserInfo () {
        defRequest({
            method: 'get',
            url: 'api/task/diamond/getInfo',
            // data: {
            //     queryUid: 103
            // }
        })
            .then(res => {
                // console.log('html ---------------->', $('.num').text())

                $('.num1').html(res.data.matchNum)
                $('.num2').html(res.data.replyNum)
                $('.num3').html(res.data.msgNum)
                $('.num4').html(res.data.dayNum)
                $('.num5').html(res.data.giftNum)
                console.log('log - res ---------------->', res)
                // pageData.userInfo = res.data
                let data = res.data;
                let item = '';
                for (let index = 0; index < data.taskList.length; index++) {
                    let element = '';
                    // const element = array[index];
                    for (let i = 0; i < data.taskList[index].tasks.length; i++) {
                        // console.log('----------------------><<<><><>:', data.taskList[index].tasks[i].title)

                        element += `
                            <div class="list_item_reward">
                                <span class="list_item_reward_title ${data.taskList[index].tasks[i].done ? '' : 'colors'}">${data.taskList[index].tasks[i].title}</span>
                                <span class="lilist_item_reward_num ${data.taskList[index].tasks[i].done ? '' : 'colors'}">${data.taskList[index].tasks[i].value}/${data.taskList[index].tasks[i].need}</span>
                                <span class="${data.taskList[index].tasks[i].done ? '' : 'active'} lilist_item_reward_img"><img src="./images/ic-gouxuan@2x.png" alt=""></span>
                            </div>
                        `
                    }

                    item += `
                        <div class="list_item">
                            <div class="item_content">

                                <div class="item_content_left">

                                    <p class="list_item_diamonds">${data.taskList[index].reward}<span data-i18n="i18n_diamond_bootom"></span></p>
                                    ${element}
                                </div>
                                <button id='yes_btn${index}' onclick="fn(${data.taskList[index].id}, ${data.taskList[index].reward}, ${data.taskList[index].status})" data-i18n=${data.taskList[index].status === 0 || data.taskList[index].statu === 1 ? "i18n_receive_award" : 'i18n_received'} class='${data.taskList[index].status === 1 ? "status" : (data.taskList[index].status === 2 ? "none" : "")} item_content_btn_reward'></button>

                            </div>

                            <span class="item_date" data-i18n="${data.taskList[index].type === 1 ? 'i18n_daily' : 'i18n_weekly'}"></span>
                        </div>
                    `
                }
                // console.log('item-------------', item)
                $('.content').append(item)
                langTranslate ()

            })
            .catch(err => {
                defToast(err.message)
            })
    }
    getUserInfo ()

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
	const url = new URLSearchParams(location.search)
	const lang = url.get('lang') || 'vn'
	document.body.setAttribute('data-lang', lang)
	localStorage.setItem('lang', lang)

    function langTranslate () {
        const $i18n = $.i18n()
        $i18n.locale = lang

        console.log(".....", lang)
        if ( lang === 'en' ) {
            $(".invitation_btn_imgags").attr("src", "./images/invite-en.png");
            $('.item_date').css({'width':'auto', 'min-width':'41.6px'});
            $('.item_content_btn_reward').css({'width':'auto'});
        } else if ( lang === 'vn' ) {
            $(".invitation_btn_imgags").attr("src", "./images/invite-vn.png");
            $('.item_date').css({'width':'auto', 'min-width':'41.6px'});
            $('.item_content_btn_reward').css({'width':'auto'});
        } else {
            $(".invitation_btn_imgags").attr("src", "./images/invite-cn.png");
        }

        $.i18n.debug = true
        $i18n.load(`lang/i18n_${ lang }.json`, $i18n.locale).done(
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
        // console.log(".....", 11111111111)
    }
    
    //弹窗事件。。
    $(".pop").on('click', '.pop-up_ok', function() {
        $('.show').css('display', 'none')
        $('body').css('overflow', 'auto')
        $(".pop-up").remove();
        location.reload();
    });

    //领取钻石奖励弹窗事件。。
    fn = function (id, reward, status) {
        console.log('-----------', id, reward, status)
        // if (status === 0 || status === 2) {
        //     console.log('---000000000000222222222222')
        //     return
        // }

        defRequest({
            method: 'get',
            url: 'api/task/diamond/getReward',
            data: {
                taskId: id
            }
        })
            .then(res => {
                console.log('res', res);


                if (res === 200) {

                    $('.show').css('display', 'block')
                    $('body').css('overflow', 'hidden')
                    let pop_up = `
                        <div class="pop-up">
                            <div class="pop-up_img"></div>
                            <div class="pop-up_text">获得${reward}钻石</div>
                            <div class="pop-up_ok">确定</div>
                        </div>
                    `;
                    $('.pop').append(pop_up)
                }
            })
            .catch(err => {
                defToast(err.message)
            })
    }

    // 邀请好友..
    $('.url').click(function() {
        let url = localStorage.getItem('lang')
        console.log('--66666------', url)
        if (url === 'en') {
            location.href= "http://act.sukiechat.com/inviteAct/index.html?lang=en"
        } else if (url === 'vn') {
            location.href= "http://act.sukiechat.com/inviteAct/index.html?lang=vn"
        } else {
            location.href= "http://act.sukiechat.com/inviteAct/index.html?lang=cn"
        }
    })
})();