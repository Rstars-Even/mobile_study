
// const lang = localStorage.getItem('lang')

(function () {
    // 调试工具加载
	// const script = document.createElement('script')
	// script.src = './lib/eruda.min.js'
	// document.body.appendChild(script)
	// script.onload = function () { eruda.init() }


    // /**
    //  * @description 获取客户端类型
    //  * @date 2022/6/7
    //  * @author: lzf
    //  */
    // function checkClient () {
    //     const u = navigator.userAgent,
    //         app = navigator.appVersion
    //     return {
    //         trident: u.indexOf('Trident') > -1, //IE内核
    //         presto: u.indexOf('Presto') > -1, //opera内核
    //         webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
    //         gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, //火狐内核
    //         mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
    //         ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
    //         android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
    //         iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
    //         iPad: u.indexOf('iPad') > -1, //是否iPad
    //         webApp: u.indexOf('Safari') === -1, //是否web应该程序，没有头部与底部
    //         weixin: u.indexOf('MicroMessenger') > -1, //是否微信
    //         qq: u.match(/\sQQ/i) === ' qq', //是否QQ
    //     }
    // }
    // const browser = checkClient()
    // // console.log('browser=====:', browser)


    // /**
    //  * @description 用户信息
    //  * @date 2022/6/2
    //  * @author: lzf
    //  * @param {object} userInfo
    //  * @param {number} userInfo.uid 用户uid
    //  * @param {string} userInfo.ticket 用户登录ticket
    //  */
    // let userInfo = {
    //     uid: '38603',
    //     ticket: "e54a170352223a8d8084c1646dd98e0e",
    // }


    // /**
    //  * @description 设备信息
    //  * @date 2022/6/2
    //  * @author: lzf
    //  * @param {object} deviceInfo
    //  * @param {string} deviceInfo.app app名称
    //  * @param {string} deviceInfo.appVersion app版本
    //  * @param {string} deviceInfo.country 国家
    //  * @param {string} deviceInfo.deviceId 设备id
    //  * @param {string} deviceInfo.fcmToken FCM推送token
    //  * @param {string} deviceInfo.imei 设备imei号
    //  * @param {string} deviceInfo.lang 语言
    //  * @param {string} deviceInfo.os 操作系统
    //  */
    // let deviceInfo = {
    //     app: 'yamoo',
    //     appVersion: '1.0.0',
    //     country: 'Vietnam',
    //     deviceId: '001',
    //     fcmToken: 'fcmToken',
    //     imei: '001',
    //     lang: 'en',
    //     os: 'android',
    //     brand: 'Huawei',
    //     model: 'P40 pro',
    //     osVersion: '10.0'
    // }

    // // Yamoo APP中h5调用原生app方法
    // const _YM_JSBridge = {
    //     /**
    //      * @description 获取设备相关信息
    //      * @date 2022/6/2
    //      * @author: lzf
    //      */
    //     _getAppDeviceInfo () {
    //         if (browser.android && window.androidJsObj) {
    //             deviceInfo = { ...JSON.parse(window.androidJsObj.getDeviceInfo()) }

    //             console.log('调用手机信息：', JSON.stringify(deviceInfo))
                
    //         } else if (browser.ios && window.webkit) {}
    //         localStorage.setItem('deviceInfo', JSON.stringify(deviceInfo))
    //     },
        
    //     /**
    //      * @description 获取用户uid、token
    //      * @date 2022/6/2
    //      * @author: lzf
    //      */
    //     _getAppUserInfo () {
    //         try {

    //             if (browser.ios && window.webkit) {
    //                 window.webkit.messageHandlers.getUid.postMessage(null)
    //                 window.webkit.messageHandlers.getTicket.postMessage(null)
    //             } else if (browser.android) {
    //                 userInfo.uid = parseInt(window.androidJsObj.getUid())
                    
    //                 console.log('获取身份信息：', window.androidJsObj.getTicket())
                    
    //                 userInfo.ticket = window.androidJsObj.getTicket()
    //                 userInfo.auth = 'Bearer ' + userInfo.ticket
    //                 localStorage.setItem('info', JSON.stringify(userInfo))
    //             }

    //         } catch (error) {
    //             defToast(error)                
    //         }
    //     },

    //     //安卓查看用户信息方法。。
    //     openUserInfo (uid) {
	// 	if (browser.android) {
	// 		window.androidJsObj.openUserPage(uid)
	// 	}
	// }
    // }

    // _YM_JSBridge._getAppUserInfo()
    // _YM_JSBridge._getAppDeviceInfo()


    // /**
    //     * @description 建议 toast 提示框。
    //     * @date 2022/5/30
    //     * @author: lzf
    //     * @param {string} msg toast内容
    //     * @param {number} [duration=1500] 自动关闭时间
    // */
    // function defToast (msg, duration = 1500) {
    //     const toastList = document.querySelector('.d-toast')
    //     if (toastList) {
    //         if (this.timer) {
    //             clearTimeout(this.timer)
    //         }
    //         toastList.parentNode.removeChild(toastList)
    //     }
        
    //     const divElm = document.createElement('div')
    //     divElm.innerText = msg
    //     divElm.classList.add('d-toast')
    //     divElm.style.cssText = `
    //         position: fixed;
    //         top: 50%;
    //         left: 50%;
    //         z-index: 99999;
    //         -webkit-transform: translate3d(-50%, -50%, 0);
    //         -moz-transform: translate3d(-50%, -50%, 0);
    //         -ms-transform: translate3d(-50%, -50%, 0);
    //         transform: translate3d(-50%, -50%, 0);
    //         background-color: rgba(0, 0, 0, .5);
    //         font-size: 0.373rem;
    //         color: #fff;
    //         border-radius: 2.67vw;
    //         padding: 1.6vw 2.67vw;
    //     `
    //     document.body.appendChild(divElm)
    //     this.timer = setTimeout(() => {
    //         if (divElm) document.body.removeChild(divElm)
    //     }, duration)
    // }


    // // 设置语言类型
	// const lang = deviceInfo.lang || 'zh'
	// document.body.setAttribute('data-lang', lang)
	// localStorage.setItem('lang', lang)

    // function langTranslate () {
    //     const $i18n = $.i18n()
    //     $i18n.locale = lang
    //     console.log(".....---------------------", lang)
        
    //     $.i18n.debug = true
    //     $i18n.load(`lang/i18n_${ lang }.json`, $i18n.locale).done(
            
    //         function () {
    //             // console.log('----------------666666666-----------', $.i18n().localize('i18n_enter_real_name'));
    //             $('[data-i18n]').each(function (index, item) {
    //                 if (item.nodeName === 'INPUT' && item.getAttribute('placeholder')) {
    //                     item.setAttribute('placeholder', $i18n.localize($(item).data('i18n')))
    //                 } else {
    //                     $(item).text($i18n.localize($(item).data('i18n')))
    //                 }
    //             })
    //         }
    //     )
    // }
    // langTranslate ()

    // // 简易请求封装。。
    // function defRequest (param) {
    //     param.data = {
    //         ...param.data,
    //         ...deviceInfo,
    //         ticket: userInfo.ticket,
    //         uid: userInfo.uid,
    //     }
    //     let origin = location.origin
    //     origin = 'http://beta.sukiechat.com'
    //     // origin = 'http://act.sukiechat.com'
    //     return new Promise((resolve, reject) => {
    //         param.data = param.data || {}
    //         const formData = []
            
    //         for (let key in param.data) {
    //             formData.push(`${ key }=${ param.data[key] }`)
    //         }
    //         param.data = formData.join('&')
            
    //         const req = new XMLHttpRequest()
    //         req.responseType = 'json'
            
    //         // 超时处理
    //         req.timeout = 1000 * 60
    //         req.ontimeout = function () {
    //             req.abort()
    //         }
            
    //         req.onreadystatechange = function () {
    //             if (req.readyState === 4) {
    //                 if (req.status === 200) {
    //                     if (req.response.code === 200) {
    //                         resolve(req.response)
    //                     } else {
    //                         reject(req.response)
    //                     }
    //                 } else {
    //                     reject(req.response)
    //                 }
    //             }
    //         }
            
    //         if (param.method === 'get') {
    //             console.log('---最终请求地址---:', `${ origin }/${ param.url }?${ param.data }`)
    //             req.open('get', `${ origin }/${ param.url }?${ param.data }`)
    //         }
    //         if (param.method === 'post') {
    //             req.open('post', `${ origin }/${ param.url }?`)
    //             req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8')
    //         }
    //         req.send(param.method === 'post' ? new URLSearchParams(param.data) : null)
    //     })
    // }
    const url = new URLSearchParams(location.search)
    // const lang = url.get('lang') || 'cn'
    const edit_type = url.get('type') || 1
    const email = url.get('email');
    const userName = url.get('userName');

    console.log('填写类型-----------：', edit_type)
    let bankIds = 0;        //选择的银行id...
    let edit_id = 0;        //修改时所需的银行id...


      //ios首次进入页面加载次方法，获取到uid
    function appSetToken(user, device) {
        console.log('-------ios------user-----------', user);
        console.log('-------ios------device-----------', device);
        userInfo = JSON.parse(user)
        deviceInfo = JSON.parse(device)

        langTranslate ();
        init ();
    }
    window.appSetToken = appSetToken


    if (browser.android) {
        init ();
    }
    function init() {
        
        // 添加payoneer 账号信息填写。。
        if (edit_type == 1) {
            $('.box1').css('display','block')
            setTimeout(function() {
                $('.form_num').attr("placeholder", $.i18n().localize('i18n_enter_account'));
                $('.form_userName').attr("placeholder", $.i18n().localize('i18n_enter_name'));
            }, 800)
            
        } else if (edit_type == 2) {        // 添加银行账户信息填写。。。。。
            $('.box2').css('display','block')
            $('.bank_info').html('银行账号')

            $('.bank_info').attr("data-i18n", "i18n_bank_account");
            $('.bank_name').attr("data-i18n", "i18n_real_name");
            setTimeout(function() {
                $('.form_num').attr("placeholder", $.i18n().localize('i18n_input_bank_num'));
                $('.form_userName').attr("placeholder", $.i18n().localize('i18n_enter_real_name'));
            }, 800)

            get_bnak_list ()
        } else {        // 修改银行账户信息填写。。。。
            const bankName = url.get('bankName');
            const logo = url.get('logo');
            const id = url.get('id');
            const bankId = url.get('bankId');
            
            if ( bankId != 0) {
                
                $('.bank_info').attr("data-i18n", "i18n_bank_account");
                $('.bank_name').attr("data-i18n", "i18n_real_name");
                setTimeout(function() {
                    $('.form_num').attr("placeholder", $.i18n().localize('i18n_input_bank_num'));
                    $('.form_userName').attr("placeholder", $.i18n().localize('i18n_enter_real_name'));
                }, 500)
            }
            
            $('.box1').css('display','block');
            setTimeout(function() {
                $('.form_num').attr("placeholder", $.i18n().localize('i18n_enter_account'));
                $('.form_userName').attr("placeholder", $.i18n().localize('i18n_enter_name'));
            }, 800)
            // $('.bank_info').html('银行账号');
            $('.form_num').attr("value", `${email}`);
            $('.form_userName').attr("value", `${userName}`);
            $('.box1 span').html(`${bankName}`);
            $('.box1 img').attr("src", `${logo}`);
            
            bankIds = bankId;
            edit_id = id;
        }
    }
    


    //选择提现金额列表。。。
    $(".box2_title").click(function(){
        $(".show").css({"display":"block"});
        $(".bottom_ul").css({"bottom":"0"});
    });
    let bankImgSrc = '';
    let bankName = '';
    // 选择要绑定的银行。。确定
    $(".bottom_ul_title_ok").click(function(){
        $(".show").css({"display":"none"});
        $(".bottom_ul").css({"bottom":"-20.8rem"});


        $('.box2_title div img').attr("src", bankImgSrc)     //选择列表中的第几家银行。
        $('.box2_title div span').html(bankName)
    })


     // 获取可绑定的银行卡列表。。
    function get_bnak_list () {
        defRequest({
            method: 'get',
            url: '/api/user/purse/bankList',
            // data: {
            //     type: 2,
            // }
        }).then(res => {
            console.log('res-------银行卡列表--------:', res);

            if (res.code === 200) {
                let datas = res.data;
                $('.box2_title div img').attr("src", datas[0].logo)     //首次默认为列表中的第一家银行。
                $('.box2_title div span').html(datas[0].bankName)

                $('.bottom_ul_box>li').remove();    //先清空，在创建。
                creat_item(datas)

                //edit==2 时给默认，因用户点击选择银行直接点确定会出现空白。。
                bankImgSrc = datas[0].logo;
                bankName = datas[0].bankName;
                bankIds = datas[0].id;

            }
        })
        .catch(err => {
            defToast(err.message)
        })
    }
    

     // 动态创建银行卡列表数据。。
    let creat_item = function (data) {
        let table_ul_li = ''

        for (let index = 0; index < data.length; index++) {
            let src = data[index].logo;

            table_ul_li += `
                <li class="" onclick="selected_banks(${index}, '${src}', '${data[index].bankName}', ${data[index].id})">
                    <div>
                        <img src="${src}" alt="">
                        <span>${data[index].bankName}</span>
                    </div>
                    <img class="ul_li_imgs" src="./images/icon／未勾选.png" alt="">
                </li>
            `;
        }
        $('.bottom_ul_box').append(table_ul_li)

        $('.bottom_ul_box li:first-child .ul_li_imgs').attr("src", "./images/icon／勾选.png")
        
        langTranslate ()
    };
    
    selected_banks = function (index, src, name, id) {
        bankImgSrc = src;
        bankName = name;
        bankIds = id;
        // console.log('7777----index----777', index);
        
        $('.ul_li_imgs').attr("src", "./images/icon／未勾选.png")
        // $('.selected').hide();
        $(`.bottom_ul_box li:nth-child(${index + 1}) .ul_li_imgs`).attr("src", "./images/icon／勾选.png");
    }

    // 绑定银行卡确认提交。。
    $('.btn_ok').click(function () {
        let btn_email = $('.form_num').val().trim();
        let btn_userName = $('.form_userName').val().trim();

        if (edit_type == 2 && bankIds == 0) {
            defToast($.i18n().localize('i18n_select_bank'))
            return;
        }

        if (btn_email && btn_userName) {
            console.log('绑定卡最后参数--------------------》》》', btn_email, btn_userName, +bankIds, +edit_id);
            defRequest({
                method: 'post',
                url: '/api/user/purse/savePayonner',
                data: {
                    email: btn_email,
                    userName: btn_userName,
                    bankId: +bankIds,
                    id: +edit_id
                }
            }).then(res => {
        
                if (res.code === 200) {
                    
                    location.href = 'index.html';
                }
            })
            .catch(err => {
                defToast(err.message)
            })

        } else {
            defToast($.i18n().localize('i18n_enter_account'))
        }
    })


})();