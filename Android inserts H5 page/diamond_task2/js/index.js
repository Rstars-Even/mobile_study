//   ios首次进入页面加载次方法，获取到uid
// function appSetToken(user, device) {
//     console.log('-------ios------user-----------', user);
//     console.log('-------ios------device-----------', device);
//     userInfo = JSON.parse(user)
//     deviceInfo = JSON.parse(device)

    // langTranslate ()
    // getUserInfo ()
// }
// window.appSetToken = appSetToken

// if (browser.android) {        
//     getUserInfo ()
// }

// 邀请好友赚钱。。..
function jump_invite() {
    
    $('.url').click(function() {
        let url = deviceInfo.lang;
        console.log('--66666------', url)
        if (url === 'en') {
            location.href= "http://beta-act.sukiechat.com/inviteAct/index.html?lang=en"
        } else if (url === 'vi') {
            location.href= "http://beta-act.sukiechat.com/inviteAct/index.html?lang=vn"
        } else {
            location.href= "http://beta-act.sukiechat.com/inviteAct/index.html?lang=cn"
        }
    })
}


let app = new Vue({
    el: '#app',
    data: function () {
        return {
            head_data: {                     //头部轮播图数据。。
                // dayNum: '',
                // matchNum: '',
                // msgNum: '',
                // replyNum: ''
            },
            lang: deviceInfo.lang,
            list: [],
            type: 1,                    //默认为新人任务。
            showPopover: false,         //气泡框状态。
            hint: false,                //问号-气泡框状态。
            previewIndex: '',           //区分气泡框。
            timer: null,                //设置一个定时器。
            // time: 5000
            show: false,                //是否显示弹窗
            dialog: {                   //弹出框数据
                type: '',
                type_text: '',
                num: '',             //
            },
            is_show_newUser: true,       //是否显示新人任务。
            // active: 2005,
        }
    },
    methods: {
        // tab 切换。。
        change(name) {
            let index = Number(name);   //1:新人，2：今日，3：本周。
            if (this.type === index) {
                console.log('-------------防抖----------');
                return
            }
            this.type = index;
            console.log('change事件------index:', index);

            this.list = [];
            this.get_task(this.type);
        },
        // 获取任务.
        get_task(type, fn) {    //1:新人，2：今日，3：本周。
            defRequest({
                method: 'get',
                url: '/api/task2/diamond/getInfo',
                data: {
                    type: type,
                }
            }).then(res => {
                console.log('res-------任务列表11111111，。。--------:', res);
                if (res.code != 200) {
                    return;
                };
                this.list = res.data.taskList;
                this.head_data = res.data
                // console.log('----fn', fn);
                if (fn) {
                    fn()        //执行回调函数，检测是否还有新人任务。。
                }

                if (this.type != 1) {
                    this.find_tabIdex()  //寻找tab。。
                }
                langTranslate ()            //国际化。。
            })
            .catch(err => {
                defToast(err.message)
            })
        },
        // 打开气泡框无操作5秒后自动关闭。。
        // opened(){
        //     console.log('开始倒计时五秒器。。。');
        //     this.timer = setTimeout(()=>{
        //         this.showPopover = false
        //         this.previewIndex = ''
        //     }, this.time)
        // },
        // // 有操作要清楚定时器。
        closed(){
            console.log('执行清除计时器2222222222222222。。。');
            clearTimeout(this.timer);
            this.timer = null;
            this.previewIndex = ''
        },
        // 用事件控制气泡框。。
        click_open(i){
            clearTimeout(this.timer);
            console.log('------------i----------', i);
            if (this.previewIndex === i) {
                this.showPopover = false;
                this.previewIndex = ''
                return;
            }
            this.previewIndex = i;
            this.showPopover = true;
            
            console.log('开始倒计时五秒器。。。');
            this.timer = setTimeout(()=>{
                this.showPopover = false
                this.previewIndex = ''
            }, 5000)
            // this.time = 5000;
        },
        /**
         * @description 发送领取钻石请求。
         * @param {string} orderId 对应任务id
         * @param {number} type 宝箱类型：1‘青铜’，2‘白银’，3‘黄金’，4‘钻石图片’
         */
        get_reward(id, type) {
            console.log('-----id----type----', id, type);
            defRequest({
                method: 'get',
                url: '/api/task2/diamond/getReward',
                data: {
                    taskId: id,
                }
            }).then(res => {
                console.log('res-------领取结果22222222，。。--------:', res);
                if (res.code != 200) {
                    return;
                };

                this.dialog.type = type;
                if (this.lang == 'en') {
                    this.dialog.type_text = type == 1 ? ' bronze ' : (type == 2 ? ' silver ' : ' golden ');
                } else if (this.lang == 'vi') {
                    this.dialog.type_text = type == 1 ? 'đồng' : (type == 2 ? 'bạc' : 'vàng');
                } else {
                    this.dialog.type_text = type == 1 ? '青铜' : (type == 2 ? '白银' : '黄金');
                }
                this.dialog.num = res.data;
                this.dialog.num = 100;
                langTranslate ()            //国际化。。
                this.show = true;               //显示弹出框。。。
            })
            .catch(err => {
                defToast(err.message)
            })
        },
        // 点击确定，关闭弹出框后的事件。。
        confirm() {
            console.log('-------事件触发------');
            location.reload();
        },
        // 检测是否还有新人任务。。。。。
        is_show() {
            try {

                // let newUser_status_arr = [];
                this.list.forEach( (mov, i, arr) => {
                    // console.log('---------mov.status--------', mov.status);

                    //有一个status不等于2直接跳出检测，继续渲染新人任务模块。
                    if (mov.status !== 2) {
                        this.is_show_newUser = true;
                        throw new error;
                    } else if (mov.status === 2) {
                        // newUser_status_arr.push(mov.status);
                        // if (newUser_status_arr.length == arr.length) {
                        //     this.is_show_newUser = false;
                        // }
                        this.is_show_newUser = false;
                    }
                })
            } catch (error) {
                console.log(error)
            }
        },
        // 找到对应 tab 任务的下标。
        find_tabIdex() {
            
            this.list.forEach((mov, i, arr) => {
                // console.log('--------------mov----------------', mov);
                if (mov.tasks && mov.id != 200) {
                    for (let index = 0; index < mov.tasks.length; index++) {
                        const element = mov.tasks[index];
                        //正常来说如果第一个没完成，或者待领取奖励就不用找了。
                        if (element.status == 0 || element.status == 1) {      
                            mov.tabIndex = element.id;
                            break;
                        }
                        
                        mov.tabIndex = element.id;
                    }
                } else if (mov.id == 200) {     //这个要先找是否有可以领取的奖励，因为有跳级、。。
                    try {
                        mov.tasks.forEach(function (item, j, arrs) {
                            if (item.status == 1) {
                                mov.tabIndex = item.id;
                                throw new error;
                            } else if (j === arrs.length-1) {
                                //找完可领取的状态找未完成的状态，都没有就为已完成的最后一个。。
                                mov.tasks.forEach(function (data, k) {
                                    if (item.status == 0) {
                                        mov.tabIndex = data.id;
                                        throw new error;
                                    }
                                    mov.tabIndex = data.id;
                                })
                            }
                        })
                    } catch (error) {
                        console.log(error)
                    }
                }
            })
            console.log('---找到了tab----', this.list);
        },

        //ios首次进入页面加载次方法，获取到uid
        appSetToken(user, device) {
            console.log('-------ios------user-----------', user);
            console.log('-------ios------device-----------', device);
            userInfo = JSON.parse(user)
            deviceInfo = JSON.parse(device)

            this.get_task(this.type, this.is_show);
            langTranslate ()
            jump_invite()
            //头部轮播图。。
            let swiper = new Swiper(".study_fo", {
                // 可以看到的是 3个半
                slidesPerView: 3.5,
                // 每个的元素间隔
                spaceBetween: -12,
            });

        }
    },
    mounted() {
        if (browser.ios) {
            window.appSetToken = this.appSetToken;
        } else {

            this.get_task(this.type, this.is_show);
            langTranslate ()
            jump_invite()
            //头部轮播图。。
            let swiper = new Swiper(".study_fo", {
                // 可以看到的是 3个半
                slidesPerView: 3.5,
                // 每个的元素间隔
                spaceBetween: -12,
            });
        }
    }
})