(function () {
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
        // ticket: "e20403c7cc390ead5250a55d9b80be81",
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
        // lang: 'en',
        // os: 'android',
        // brand: 'Huawei',
        // model: 'P40 pro',
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
            console.log('------window.androidJsObj-----', window.androidJsObj);
            if (browser.android && window.androidJsObj) {
                deviceInfo = { ...JSON.parse(window.androidJsObj.getDeviceInfo()) }

                console.log('调用手机信息：', JSON.stringify(deviceInfo))
                
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
            try {

                if (browser.ios && window.webkit) {
                    console.log('=---------------ios设备--------');
                    // window.webkit.messageHandlers.getUid.postMessage(null)
                    // window.webkit.messageHandlers.getTicket.postMessage(null)
                } else if (browser.android) {
                    console.log('获取身份信息：', window.androidJsObj.getTicket())

                    userInfo.uid = parseInt(window.androidJsObj.getUid())
                    userInfo.ticket = window.androidJsObj.getTicket()
                    
                    userInfo.auth = 'Bearer ' + userInfo.ticket
                    localStorage.setItem('info', JSON.stringify(userInfo))
                }

            } catch (error) {
                defToast(error)                
            }
        },

        //安卓查看用户信息方法。。
        openUserInfo (uid) {
		if (browser.android) {
			window.androidJsObj.openUserPage(uid)
		}
	}
    }

    _YM_JSBridge._getAppUserInfo()
    _YM_JSBridge._getAppDeviceInfo()


     //ios首次进入页面加载次方法，获取到uid
    function appSetToken(user, device) {
        console.log('-------ios------user-----------', user);
        console.log('-------ios------device-----------', device);
        userInfo = JSON.parse(user)
        deviceInfo = JSON.parse(device)
        // this.langs = deviceInfo.lang

        langTranslate ()
        guild_getInfo ()
        $(window).on("scroll", handle);

        // window.addEventListener('scroll', this.handle)
    }
    window.appSetToken = appSetToken
    console.log('-----------appSetToken------', window.appSetToken);


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
	// const lang = deviceInfo.lang;
	// document.body.setAttribute('data-lang', lang)
	// localStorage.setItem('lang', lang)

    function langTranslate () {
        const $i18n = $.i18n()
        $i18n.locale = deviceInfo.lang

        console.log(".....", deviceInfo.lang)

        $.i18n.debug = true
        $i18n.load(`lang/i18n_${ deviceInfo.lang }.json`, $i18n.locale).done(
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


    // 简易请求封装。。
    function defRequest (param) {
       
        param.data = {
            ...param.data,
            ...deviceInfo,
            ticket: userInfo.ticket,
            uid: userInfo.uid,
        }
        let origin = location.origin
        // console.log('origin----------', origin)
        // console.log('oriparam.datagin----------', param.data)
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


    //列表数据获取。。
    let pageData = {
        type: 1,
        pageNum: 1,
        pageSize: 20,
    }

    //滚动及监听。。
    let handle= function () {
        let scrollTop = $(this).scrollTop();
        let scrollHeight = $(document).height();
        let windowHeight = $(this).height();
        // console.log(666666666)
        if (scrollTop + windowHeight + 0.6 >= scrollHeight) {
            // console.log('---', scrollTop, scrollHeight, windowHeight);
            //这部分写逻辑代码
            //滚动条下拉时，再追加下面的dom数据
            pageData.pageNum++;
            console.log("pageData.pageNum--------------------:", pageData);

            guild_getInfo ()
        }
    }
    if (browser.android) {
        $(window).on("scroll", handle);
    }


    function guild_getInfo () {
        defRequest({
            method: 'get',
            url: 'api/guild/getInfo',
            data: {
                type: pageData.type,
                pageNum: pageData.pageNum,
                pageSize: pageData.pageSize
            }
        }).then(res => {
            console.log('res---------------:', res);

                if (res.code === 200) {
                    // 工会信息。。
                    let datas = res.data.guild;
                    $('.header_content_name').html(datas.title);
                    $('.header_userid').html(datas.id);
                    $('.header_num').html(datas.userNum);
                    $('.content_nums_num').html(res.data.diamond);

                    console.log('+++++res.data.userList.length:', res.data.userList.length)
                    if (res.data.userList.length == 0 ) {
                        
                        $(window).off("scroll", handle); //卸载滚动事件
                        return false;
                    }
                    creat_item(res)
                }
            })
        .catch(err => {
            defToast(err.message)
        })
    }
    if (browser.android) {
        guild_getInfo ()
    }

    let isactive = false;
    // 动态创建列表数据。。
    let creat_item = function (res) {
        let data = res.data.userList;
        let table_ul_li = ''

        for (let index = 0; index < data.length; index++) {

            table_ul_li += `
                <li class="table_ul_li">
                    <div class="table_li_item" onclick="fn(${data[index].uid})">
                        <img src="${data[index].avatar}" alt="" class="table_li_img"/>
                        <div class="table_li_name_data">
                            <p class="table_li_name">${data[index].nickName}</p>
                            <div class="table_li_icon">
                                <img src="./images/ic-id.png" alt="">
                                <span>${data[index].chatNo}</span>
                            </div>
                        </div>
                    </div>
                
                    <div class="table_li_num table_num1" id="${isactive ? 'active' : ''}">
                        <span>${data[index].diamond}</span>
                        <span>${data[index].matchNum}</span>
                        <span>${data[index].replyNum}</span>
                    </div>
                    <div class="table_li_num table_num2" id="${!isactive ? 'active' : ''}">
                        <span>${data[index].recvNum}</span>
                        <span>${data[index].days}</span>
                        <span>${data[index].giftNum}</span>
                    </div>
                </li>
            `;
        }
                    
        $('.table_ul').append(table_ul_li)
        langTranslate ()
    }

    let isrequest = false;
    // 本周上周数据样式切换。。
    $(".content_btn_weeks1").click(function(){
        if (isrequest) {
            $(window).on("scroll", handle);

            $(".content_btn_weeks2").css({"color":"#FFFFFF", "background":"none"});
            $(".content_btn_weeks1").css({"color":"#6A70FF", "background":"#FFFFFF"});
            pageData.type = 1;
            pageData.pageNum = 1;
            $('.table_ul_li').remove();
            guild_getInfo ()
            isrequest = false;
        }
    })
    $(".content_btn_weeks2").click(function(){
        if (!isrequest) {
            $(window).on("scroll", handle);

            $(".content_btn_weeks1").css({"color":"#FFFFFF", "background":"none"});
            $(".content_btn_weeks2").css({"color":"#6A70FF", "background":"#FFFFFF"});
            pageData.type = 2;
            pageData.pageNum = 1;
            $('.table_ul_li').remove();
            guild_getInfo ()
            isrequest = true;
        }
    })

    // 用户信息点击更多。。。
    $(".table_icon").click(function(){
        $(".title_data1").css({"display":"none"});
        $(".title_data2").css({"display":"flex"});
        console.log(2222222222)
        $(".table_num1").css({"display":"none"});
        $(".table_num2").css({"display":"flex"});

        isactive = true;
    })
    $(".table_icon2").click(function(){
        $(".title_data1").css({"display":"flex"});
        $(".title_data2").css({"display":"none"});
        $(".table_num1").css({"display":"flex"});
        $(".table_num2").css({"display":"none"});

        isactive = false;
    })
   

    // 查看公会成员用户信息。。
    fn = function (uid) {
        console.log('---uid---:', uid);
        if (browser.ios) {
            window.webkit.messageHandlers.jump_userinfo.postMessage(uid)

        } else {

            _YM_JSBridge.openUserInfo(uid)
        }
    }

    // 禁用头部滑动事件。。
    $('.container').on("touchstart", function (params) {
        // console.log('I touch you');
        $('body').css({"overflow":"hidden"});
    });
    $('.container').on("touchmove", function (params) {
        // console.log('move');
        $('body').css({"overflow":"hidden"});
    });
    $('.container').on("touchend", function (params) {
        // console.log('leave');
        $('body').css({"overflow":"auto"});
    });

})();