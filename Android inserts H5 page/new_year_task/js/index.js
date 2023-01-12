let app = new Vue({
    el: '#app',
    data: function () {
        return {
            show: false,    //是否显示活动规则弹窗。。
            shows: false,    //是否显示领取奖励弹弹窗。。
            award_type: '',
            dialog: {                   //弹出框数据
                type: '',
                type_text: '',
                num: '',             //
            },
            lang: deviceInfo.lang,
            // time: 0,                    //倒计时时间。。
            type: 0,                    // 0：新年奖励，1：礼物榜单，2：榜单奖励。。
            types: 0,                    // 0：送礼榜，1：收礼榜。。
            // user_info: "",
            // is_open: false,             //是否到了晚上九点。。。
            // is_add_family: false,       //是否加入家族
            // bottom_popup: false,        //底部自己家族信息栏。。。
            list: [],
        }
    },
   
    methods: {
        // 规则弹窗按钮。。。
        rule_btn () {
            this.show = true;
            langTranslate (this.lang)
        
        },
        //tab 请求栏。。。--------
        get_charm_list (type) {
            if (type && type == this.type) {
                console.log('--------------66666666666---------------');
                return;
            } else if (type) {
                this.type = +type;
            }
            console.log('--------type-------', this.type);

            this.list = [];
            // defRequest({
            //     method: 'get',
            //     url: '/api/family/act/list',
            //     data: {
            //         type: this.type,
            //     }
            // }).then(res => {
            //     console.log(`res-------魅力榜列...-------:`, res);
            //     if (res.code != 200) {
            //         return;
            //     } 
            //     this.list = res.data;
            //     langTranslate (this.lang)

            // })
            // .catch(err => {
            //     defToast(err.message)
            // })
        },
        // 领取奖励。。
        open(num) {
            this.shows = true;
            this.award_type = num;
            // console.log();
        },
        // 请求送礼榜和收礼榜。。。0：送礼，1：收礼。。
        get_gift_list(id) {
            console.log('--------typessssss-------', this.type);

            if (this.types === id ) {
                console.log('重复请求。。。');
            }
            this.types = id;
        },
        // 跳转到用户个人信息。。
        open_userInfo(uid) {
            console.log('------uid----------', uid);
            _YM_JSBridge.openUserInfo(uid);
        },
        // 宝箱没开启时，点击时的状态，，。。
        // off_box (off_type) {
        //     if (off_type == 0) {
        //         defToast($.i18n().localize('i18n_add_family'))
        //     } else if (off_type == 1) {
        //         defToast($.i18n().localize('i18n_open_time'))
        //     }
        // },
        // 打开宝箱领取钻石。。。
        // open_box () {
        //     if (!this.user_info.hasOwnProperty('familyInfo')) {
        //         defToast($.i18n().localize('i18n_add_family'))
        //         return
        //     }

        //     defRequest({
        //         method: 'get',
        //         url: '/api/family/act/getReward',
        //         // data: {}
        //     }).then(res => {
        //         console.log(`res-------领取奖励的信息，。。-------:`, res);
        //         if (res.code != 200) {
        //             return;
        //         } 
        //         this.shows = true;
        //         this.dialog.num = res.data;
        //         langTranslate (this.lang)

        //     })
        //     .catch(err => {
        //         defToast(err.message)
        //     })
        // },
        // 点击确认
        confirm () {
            // window.location.reload();
        },

        //ios首次进入页面加载次方法，获取到uid
        appSetToken(user, device) {
            console.log('-------ios------user-----------', user);
            console.log('-------ios------device-----------', device);
            userInfo = JSON.parse(user)
            deviceInfo = JSON.parse(device)
            this.langs = deviceInfo.lang

            // if (this.lang == 'en' && this.is_open) {
            //     $('.box_timing_no').css('padding', '.6rem .8rem');
            //     $('.box_timing').css('padding', '.6rem .8rem');
            //     $('.box_timing_text').css('margin-bottom', '0rem');
            // } else if (this.lang == 'vi' && this.is_open) {
            //     $('.box_timing_no').css('padding', '.9rem .8rem');
            //     $('.box_timing').css('padding', '.9rem .8rem');
            // }
           
            langTranslate (this.langs)
            this.get_info ();
            this.get_charm_list ();
        }
    },
    mounted() {
        if (browser.ios) {
            window.appSetToken = this.appSetToken;
        } else {
            
            // if (this.lang == 'en' && this.is_open) {
            //     $('.box_timing_no').css('padding', '.6rem .8rem');
            //     $('.box_timing').css('padding', '.6rem .8rem');
            //     $('.box_timing_text').css('margin-bottom', '0rem');
            // } else if (this.lang == 'vi' && this.is_open) {
            //     $('.box_timing_no').css('padding', '.9rem .8rem');
            //     $('.box_timing').css('padding', '.9rem .8rem');
            // }
            
            langTranslate (this.lang)
            // this.get_info ();
            // this.get_charm_list ();
        }
    }
})
