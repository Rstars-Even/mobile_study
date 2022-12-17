let app = new Vue({
    el: '#app',
    data: function () {
        return {
            show: false,    //是否显示活动规则弹窗。。
            shows: false,    //是否显示领取奖励弹弹窗。。
            dialog: {                   //弹出框数据
                type: '',
                type_text: '',
                num: '',             //
            },
            lang: 'zh',
            time: 0,                    //倒计时时间。。
            type: 0,                    // 0：今日，1：昨日。。
            user_info: "",
            is_open: false,             //是否到了晚上九点。。。
            is_add_family: false,       //是否加入家族
            bottom_popup: false,        //底部自己家族信息栏。。。
            list: [],
        }
    },
   
    methods: {
        // 规则弹窗按钮。。。
        rule_btn () {
            this.show = true;
            langTranslate (this.lang)
        
        },
        //请求魅力榜列表。。。--------
        get_charm_list (type) {
            if (type && type == this.type) {
                console.log('--------------66666666666---------------');
                return;
            } else if (type) {
                this.type = +type;
            }
            console.log('--------type-------', this.type);

            this.list = [];
            defRequest({
                method: 'get',
                url: '/api/family/act/list',
                data: {
                    type: this.type,
                }
            }).then(res => {
                console.log(`res-------魅力榜列...-------:`, res);
                if (res.code != 200) {
                    return;
                } 
                this.list = res.data;
                langTranslate (this.lang)

            })
            .catch(err => {
                defToast(err.message)
            })
        },
        // 请求用户信息。。。
        get_info () {

            defRequest({
                method: 'get',
                url: '/api/family/act/getInfo',
                // data: {}
            }).then(res => {
                console.log(`res-------用户信息，。。-------:`, res);
                if (res.code != 200) {
                    return;
                } 
                this.is_add_family = true;
                this.time = res.data.countDownSeconds * 1000;
                this.user_info = res.data;
                langTranslate (this.lang)

            })
            .catch(err => {
                defToast(err.message)
            })
        },
        // 显示底部自己家族信息栏。。。
        show_popup () {
            this.bottom_popup = true;
            $('.box_bottom').css('bottom', 0);
            $('.box').css('margin-bottom', '2.4rem');
        },
        // 宝箱没开启时，点击时的状态，，。。
        off_box (off_type) {
            if (off_type == 0) {
                defToast($.i18n().localize('i18n_add_family'))
            } else if (off_type == 1) {
                defToast($.i18n().localize('i18n_open_time'))
            }
        },
        // 打开宝箱领取钻石。。。
        open_box () {
            defRequest({
                method: 'get',
                url: '/api/family/act/getReward',
                // data: {}
            }).then(res => {
                console.log(`res-------领取奖励的信息，。。-------:`, res);
                if (res.code != 200) {
                    return;
                } 
                this.shows = true;
                this.dialog.num = res.data;
                langTranslate (this.lang)

            })
            .catch(err => {
                defToast(err.message)
            })
        },
        // 倒计时结束时事件，。。。。
        finish () {
            console.log(9999999999999);
            this.is_open = true;
            langTranslate (this.lang)
        },

        //ios首次进入页面加载次方法，获取到uid
        // appSetToken(user, device) {
        //     console.log('-------ios------user-----------', user);
        //     console.log('-------ios------device-----------', device);
        //     // userInfo = JSON.parse(user)
        //     // deviceInfo = JSON.parse(device)
        //     // this.langs = deviceInfo.lang
        //     langTranslate (this.langs)
        // }
    },
    mounted() {
        // if (browser.ios) {
        //     window.appSetToken = this.appSetToken;
        // } else {
            
        // }
        langTranslate (this.lang)
        this.get_info ();
        this.get_charm_list ();
    }
})
