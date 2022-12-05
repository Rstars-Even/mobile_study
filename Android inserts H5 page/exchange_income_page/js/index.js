// (function () {
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
    // langTranslate ()    //国际化。。


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

    //   ios首次进入页面加载次方法，获取到uid
    function appSetToken(user, device) {
        console.log('-------ios------user-----------', user);
        console.log('-------ios------device-----------', device);
        userInfo = JSON.parse(user)
        deviceInfo = JSON.parse(device)

        langTranslate ()
        get_bind_bank_card ();
    }
    window.appSetToken = appSetToken

    // 为适应国际化，进行初始化调整。。
    if (deviceInfo.lang === 'en' || deviceInfo.lang === 'vi') {
        console.log('---------index.js---------', deviceInfo.lang);
        // console.log(866666)
        $('.enter_password_title').css({"width":"70%"});
        $('.bottom_ul_title').css({"display":"block"});
    }


    let itemId = ''         //提现项目ID。。。。。。。。
    let confId	= ''            //提现账号ID ...
    
    let item_amount	= ''            //提现项目ID美元。。。。.
    let bank_Id	= ''            //提现账号类型 ...

    // let bank_id_includeds = localStorage.getItem('bank_id_included');//获取存储的元素
    // console.log('bank_id_included', bank_id_includeds)

    // 获取可兑换的钻石列表。。
    function get_diamond_select () {
        defRequest({
            method: 'get',
            url: '/api/user/purse/costDiamond',
            data: {
                type: 2,
            }
        }).then(res => {
            console.log('res-------提现列表选项--------:', res);

            if (res.code === 200 && res.data.length > 0) {
                let datas = res.data;
            
                $('.bottom_ul_box>li').remove();    //先清空，在创建。
                creat_item(datas)
            }
        })
        .catch(err => {
            defToast(err.message)
        })
    }
    // 获取用户的钻石总数。。
    let diamondNum = 0;
    function get_diamond () {
        defRequest({
            method: 'get',
            url: '/api/user/purse/getPurse',
            // data: {
            //     type: 2,
            // }
        }).then(res => {
            console.log('res-------钻石数量--------:', res);

            if (res.code === 200) {
                let datas = res.data.diamondNum;
                diamondNum = datas;
                $('.bottom_ul_title_num').html(datas);
            }
        })
        .catch(err => {
            defToast(err.message)
        })
    }


    // 动态创建兑换提现列表数据。。
    let creat_item = function (data) {
        let table_ul_li = ''

        for (let index = 0; index < data.length; index++) {

            table_ul_li += `
                <li onclick='select_item(${data[index].amount}, ${data[index].diamond}, ${data[index].id})'>
                    <div class="bottom_li_us">$ ${data[index].amount}</div>
                    <button>
                        <img src="./images/zuanshi.png" alt="">
                        <span>${data[index].diamond}</span>
                    </button>
                </li>
            `;
        }
        $('.bottom_ul_box').append(table_ul_li)
        langTranslate ()
    };

    // 选择要兑换提现的美元/。。。
    select_item = function (amount, diamond, id) {

        if (diamondNum < diamond) {
            // alert('所需的钻石数量不够。。。');
			defToast($.i18n().localize('i18n_diamond_insufficient'))
            return;
        }
        $('.password').removeAttr("readonly");

        $(".shows").css({"display":"none"});
        $(".bottom_ul").css({"bottom":"-20.8rem"});     //隐藏选项框。。
        $("body").css({"overflow":"auto"});
        
        $(".show_select").css({"display":"none"});
        $(".show_selects").css({"display":"flex"});
        
        $('.box_content_us1>span').html(amount);
        $('.box_content_num_diamond>span').html(diamond);

        $('.number_of_diamonds').html(diamond);
        $('.dollar').html(`$${amount}`);


        itemId = id;
        item_amount = +amount;
        console.log('amount, diamond----->:', amount, diamond, id)


        if (itemId && confId) {

            $(".btn").css({"background":"linear-gradient(270deg, #FF8386 0%, #FFA3A6 100%)","box-shadow":"0px 2px 20px 0px rgba(255,131,134,0.4)","color":"#FFF"});
            $(".btn").addClass("btns_submit");
            
            console.log('bank_Id-------',bank_Id, '-------item_amount---', item_amount);
            // if ((bank_Id == 0 && item_amount >= 50) || (bank_Id >= 1 && item_amount >= 5)) {
                $(".password").css({"display":"block"});
            // }
        }
    }


    //选择提现钻石列表。。。
    $(".box_content").click(function(){
        $("body").css({"overflow":"hidden"});
        $(".shows").css({"display":"block"});
        $(".bottom_ul").css({"bottom":"0"});
        // $(".hint_view").css({"display":"block"});

        let ul_length = $(".bottom_ul_box").children("li").length;
        console.log('ul_le----------->', ul_length);

        if ( ul_length <= 0 ) {
            get_diamond ()
            get_diamond_select ()
        }
    })
    // 点击蒙层关闭钻石提现列表。。
    $(".shows").click(function(){
        $(".shows").css({"display":"none"});
        $(".bottom_ul").css({"bottom":"-20.8rem"});     //隐藏选项框。。
        $("body").css({"overflow":"auto"});
    })

    //右侧问号图标按钮是否显示提示框。。。
    $(".box2_title_img").click(function(){
        $(".show").css({"display":"block"});
        $(".hint_view").css({"display":"block"});
        $("body").css({"overflow":"hidden"});
    })
    // 点击关闭提示框。。
    $(".hint_view_title_off").click(function(){
        $(".hint_view").css({"display":"none"});
        $(".show").css({"display":"none"});
        $("body").css({"overflow":"auto"});
    })
    // 点击复制Payoneer地址。
    $(".copy").click(function(){
        const clipBoard = new ClipboardJS('.copy')
		clipBoard.on('success', e => {
			defToast($.i18n().localize('common_copy_success'))
            // https://www.payoneer.com/
            // alert('666')
		})
    })


     // 获取用户已经绑定的银行卡。。
    function get_bind_bank_card () {
        defRequest({
            method: 'get',
            url: '/api/user/purse/getPayonner',
            // data: {
            //     type: 2,
            // }
        }).then(res => {
            console.log('res-------已经绑定过的银行卡--------:', res);
            
            if (res.code === 200 && res.data.length > 0) {
                confId = res.data[0].id;
                bank_Id = res.data[0].bankId;
                console.log('confId', confId);

                $('.box_bank_card .box2_yinhangka').remove();    //先清空，在创建。
                creat_bank_card(res.data);

                if (res.data.length == 1) {
                    const element = res.data[0].bankId;
                    if (element == 0) {

                        $(".bank_click").css({"display":"flex"});
                    } else {
                        
                        $(".payoneer_click").css({"display":"flex"});
                    }
                }

            } else {
                $(".box2_content").css({"display":"flex"});
            }
        })
        .catch(err => {
            defToast(err.message)
        })
    };
    if (browser.android) {
        get_bind_bank_card ();
    }

     // 动态创建用户已经绑定的银行卡列表数据。。
    let creat_bank_card = function (data) {
        let bank_card_item = ''

        for (let index = 0; index < data.length; index++) {

            bank_card_item += `
                <div class="box2_yinhangka">
                    <div class="box2_yinhangka_top" onclick='select_bank_card(${index}, ${data[index].id}, ${data[index].bankId})'>
                        <div class="box2_yinhangka_top_img">
                            <img src="${data[index].bank.logo}" alt="">
                        </div>
                        <div class="box2_yinhangka_top_userinfo">
                            <p class="box2_yinhangka_userinfo_num">${data[index].email}</p>
                            <p class="box2_yinhangka_userinfo_text">${data[index].userName}</p>
                        </div>

                        <div class="selected" data-i18n="i18n_current">当前方式</div>
                    </div>
                    <div class="box2_yinhangka_bottom">
                        <div class="box2_yinhangka_bottom_left" onclick='del_bank_crad(${data[index].id})'>
                            <img src="./images/chengyuan_ic_delete.png" alt="">
                            <span data-i18n="i18n_delete">删除</span>
                        </div>
                        <div class="box2_yinhangka_bottom_right" onclick="edit_bank_crad('${data[index].id}', '${data[index].email}', '${data[index].userName}', '${data[index].bank.shortName}', '${data[index].bank.logo}', '${data[index].bankId}')">
                            <img src="./images/zhuye_ic_bianji.png" alt="">
                            <span data-i18n="i18n_edit">编辑</span>
                        </div>
                    </div>
                </div>
            `;
        }
        $('.box_bank_card').append(bank_card_item);

        if (deviceInfo.lang === 'vi') {
            $('.selected').css({"width":"7.4133rem"});
            
        }

        $('.box_bank_card .box2_yinhangka:first-child .box2_yinhangka_top .selected').show();
        langTranslate ()
    };


    //选择银行卡事件。。
    select_bank_card = function (index, id, bankId) {
        // console.log('index', index, id);
        $('.password').removeAttr("readonly");

        $('.selected').hide();
        $(`.box_bank_card .box2_yinhangka:nth-child(${index + 1}) .box2_yinhangka_top .selected`).show();

        confId = id;
        bank_Id = bankId;
        console.log('confId', confId);
    };
    // 删除银行卡事件。。
    let bankId = '';
    del_bank_crad = function(id) {
        console.log('del_bank_crad', id);

        $(".show").css({"display":"block"});
        $("body").css({"overflow":"hidden"});
        $(".delete").css({"display":"block"});
        bankId = id
    }
    //确定删除。。
    $('.del_box_click_del').click(function () {
        defRequest({
            method: 'post',
            url: '/api/user/purse/delPayonner',
            data: {
                id: bankId,
            }
        }).then(res => {
            // console.log('res-------已经绑定过的银行卡--------:', res);
    
            if (res.code === 200) {
                // $(".show").css({"display":"none"});
                // $("body").css({"overflow":"auto"});
                // $(".delete").css({"display":"none"});
                location.reload();
            }
        })
        .catch(err => {
            defToast(err.message)
        })

    })

    // 取消删除
    $('.del_box_click_off').click(function() {
        $(".show").css({"display":"none"});
        $("body").css({"overflow":"auto"});
        $(".delete").css({"display":"none"});
    })
    // 编辑银行卡事件。。
    edit_bank_crad = function(...data) {
        console.log('edit_bank_crad', data);
        edit_type = 3;
        location.href = `fill_info.html?type=${edit_type}&id=${data[0]}&email=${data[1]}&userName=${data[2]}&bankName=${data[3]}&logo=${data[4]}&bankId=${data[5]}`

    }
    // $(".box_bank_card").on('click', '.box2_yinhangka_top', function() {
    //     console.log('index', 54);
    // });


    // 确认提现。。。打开输入密码页面。
    // $('.view').on('click', '.btns_submit', function() {

    //     $(".show").css({"display":"block"});
    //     $(".enter_password_box").css({"display":"block"});
    //     $("body").css({"overflow":"hidden"});
    // })
    $('.view').on('click', '#password', function() {

        // console.log(".....焦点事件-------------", 777777)
        if ( bank_Id == 0 &&  item_amount < 50) {

            $('.password').attr("readonly", "readonly") //设置input只读，输入无效不显示。
            var input = document.getElementById("passwords");
            input.blur();

			defToast($.i18n().localize('i18n_withdrawal$50'))
            return;
        } else if ( bank_Id >= 1 && item_amount < 5) {

            $('.password').attr("readonly", "readonly")
            var input = document.getElementById("passwords");
            input.blur();

			defToast($.i18n().localize('i18n_withdrawal$5'))
            return;
        }

        $(".show").css({"display":"block"});
        $(".enter_password_box").css({"display":"block"});
        $("body").css({"overflow":"hidden"});

    });


    // 关闭输入密码页面。。
    $('.enter_password_off').click(function() {
        $(".show").css({"display":"none"});
        $(".enter_password_box").css({"display":"none"});
        $("body").css({"overflow":"auto"});
    });

    //payoneer账号信息添加 
    let edit_type = 1;
    $('.payoneer_click').click(function() {
        location.href = `fill_info.html?type=${edit_type}`
    })
    //银行卡账号信息添加 \
    $('.bank_click').click(function() {
        edit_type = 2;
        location.href = `fill_info.html?type=${edit_type}`
    })

    let token = ''
    $('.password').on('input',function(e){           //输入密码事件。。
        let value = $(this).val();
        let length = value.length;
        $('.enter_password_num').find('.li').each(function(i){
            if (i < length) {
                $(this).find('.circle').css({display: 'inline-block'});
            } else {
                $(this).find('.circle').hide();
            }
        });
    
        if(length == 4) {
            console.log('事件----------', e)

                setTimeout(function() {         //每次输完密码后清空。。
                    $('#passwords').val('');
                    $('.enter_password_num').find('.circle').hide();
                }, 500)

            let pwd = value;
            console.log('pwd', pwd);
            
            defRequest({            //校验密码请求。。。
                method: 'post',
                url: '/api/user/setting/checkPwd',
                data: {
                    pwd: pwd,
                }
            }).then(res => {
                console.log('res-------验证密码成功--------:', res);
        
                if (res.code === 200) {
                    // location.reload();
                    token = res.data;

                    submit(token);
                    
                }
            })
            .catch(err => {
                // console.log('--------锁误信息------>', err);
                // defToast(err.message)
                $('.enter_password_hint').html(err.message);
                
            })
        }
    });


    // 最终提现请求。。。
    function submit(token) {
        console.log("---最终请求数据-------------》：", confId, itemId, token);
        defRequest({
            method: 'post',
            url: '/api/user/purse/withdraw',
            data: {
                confId: confId,
                itemId: itemId,
                token: token,
            }
        }).then(res => {
            console.log('res-------交易成功--------:', res);
    
            if (res.code === 200) {

                // localStorage.setItem('bank_id_included', confId)

                // console.log(6666666666);
			    defToast($.i18n().localize('i18n_success'))

                location.reload();
            }
        })
        .catch(err => {
            defToast(err.message)
        })
    }


// })();

