(function () {

   

    let swiper = new Swiper(".study_fo", {
        // 可以看到的是 3个半
        slidesPerView: 3.5,
        // 每个的元素间隔
        spaceBetween: -12,
    });

        // 简易请求封装
    function defRequest (param) {
        let deviceInfo = {
            app: 'yamoo',
            appVersion: '1.0.0',
            country: 'Vietnam',
            deviceId: '001',
            fcmToken: 'fcmToken',
            imei: '001',
            lang: 'vi',
            os: 'android',
            brand: 'Huawei',
            model: 'P40%20pro',
            osVersion: '10.0'
        }
        param.data = {
            ...param.data,
            ...deviceInfo,
            ticket: 'acce911787eb475e63cedabab823b979',
            uid: 103
        }
        let origin = location.origin
        console.log('origin----------', origin)
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
                req.open('get', `${ origin }/${ param.url }?${ param.data }`)
            }
            if (param.method === 'post') {
                req.open('post', `${ origin }/${ param.url }?`)
                req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8')
            }
            req.send(param.method === 'post' ? new URLSearchParams(param.data) : null)
        })
    }

    function getUserInfo () {
        defRequest({
            method: 'get',
            // url: 'api/user/getInfo',
            url: 'api/task/diamond/getInfo',
            // data: {
            //     queryUid: 103
            // }
        })
            .then(res => {
                console.log('log - res ---------------->', res)
                // pageData.userInfo = res.data
                let data = res.data;
                let item = '';
                for (let index = 0; index < data.taskList.length; index++) {
                    let element = '';
                    // const element = array[index];
                    for (let i = 0; i < data.taskList[index].tasks.length; i++) {
                        element += `
                            <div class="list_item_reward">
                                <span class="list_item_reward_title">${data.taskList[index].tasks[i].title}</span>
                                <span class="lilist_item_reward_num">${data.taskList[index].tasks[i].value}/${data.taskList[index].tasks[i].need}</span>
                                <span class="${data.taskList[index].tasks[i].done ? '' : 'active'} lilist_item_reward_img"><img src="./images/ic-gouxuan@2x.png" alt=""></span>
                            </div>
                        `
                    }

                    item+=`
                        <div class="list_item">
                            <div class="item_content">

                                <div class="item_content_left">

                                    <p class="list_item_diamonds">${data.taskList[index].reward}<span data-i18n="i18n_diamond_bootom"></span></p>
                                    ${element}
                                </div>
                                <div ${data.taskList[index].status === 0 || 1 ? "data-i18n=i18n_receive_award" : 'i18n_received'} class='${data.taskList[index].status === 1 ? "status" : ''} item_content_btn_reward'></div>

                            </div>

                            <span class="item_date" data-i18n="${data.taskList[index].type === 1 ? 'i18n_daily' : 'i18n_weekly'}"></span>
                        </div>
                    `
                }
                // console.log('item-------------', item)
                $('.content').append(item)
            })
            .catch(err => {
                defToast(err.message)
            })
    }
    getUserInfo ()


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



     // 设置语言类型
	const url = new URLSearchParams(location.search)
	const lang = url.get('lang') || 'en'
	document.body.setAttribute('data-lang', lang)
	localStorage.setItem('lang', lang)
    // let lang = 'i18n_en';

    function langTranslate () {
        const $i18n = $.i18n()
        $i18n.locale = lang

        console.log(".....", lang)

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
    }
    langTranslate ()
})();