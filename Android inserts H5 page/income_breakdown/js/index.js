// 定义一个名为 data_div 的新组件
Vue.component('data_div', {
    data: function () {
        return {}
    },
    template: '<div><slot></slot></div>'
})

let app = new Vue({
    el: '#app',
    data: function () {
        return {
            isChoiceTime: false,    //是否显示日期选择器。。
            cont: 1,                   //切换背景图。。。
            toolTime01: '',
            toolTime02: '',             //选择器中的日期
            startDate: '',
            endDate: '',
            start_date_num: '',         //请求的时间戳-
            end_date_num: '',
            // currentDate: new Date(),
            startTimes: '',            //时间选择器选定的时间。。
            titles: ['汇总', '聊天', '礼物', '视频', '语音', '邀请收益', '系统赠送', '消费钻石',],
            isicon: 0,                    //tab选中状态。
            add_border: true,           //tab左右边框样式。。
            pool_list: {},               //汇总列表。。
            // get_diamond: '666',            //获取钻石总数。。
            // reduce_diamond: '999'          //消费钻石的总数。。
        }
    },
    components: {
// // 定义一个名为 diamond_num 的新组件
        diamond_num: {
            //组件是不能直接访问wm身上的数据的，如果想访问，就必须让VM传递过来
            template:`
                <div class="header_down_get">
                    <span class='diamond'><slot name='names'></slot></span>
                    <span class='num'><slot name='num'></slot></span>
                </div>`,
            // data:function(){//组件身上的data成员必须是function对象
            //     return {
                
            //         name:'老李',
            //         age:28
            //     };
            // },
        }            
    },
    methods: {
        // 点击显示时间选择器。。
        header_top_click() {
            this.isChoiceTime = true;
        },
        // 取消关闭时间选择器。。
        cancelClick() {
            this.isChoiceTime = false;
        },
        // 确认选择的时间。发起查询请求。。。
        determine() {
            this.isChoiceTime = false;
            this.startDate = this.toolTime01;
            this.endDate = this.toolTime02;

            this.start_date_num = dayjs(this.toolTime01).valueOf();
            let end = dayjs(this.toolTime02).endOf('day').format('YYYY-MM-DD HH:mm:ss');
            this.end_date_num = dayjs(end).valueOf();
            
            console.log('-----请求的时间戳------：', this.start_date_num, this.end_date_num)
            this.geta_pool_list();
        },
        // 切换背景事件。。
        timeClick(n) {
            if(n == 1) {
                this.cont = 1;
            } else {
                this.cont = 2;
            }
        },
        // 选择的时间段。。
        changeTimeMore(picker) {
            let startTime = picker.getValues();
            this.startTimes = startTime[0] + "-" + startTime[1] + "-" + startTime[2];
            
            if(this.cont == 1) {
                this.toolTime01 = this.startTimes;
            } else {
                this.toolTime02 = this.startTimes;
            }
        },
        selected(index) {
            this.isicon = index;
        },
        gtouchmove(event) {
            event.preventDefault();
            // console.log("...滑动事件..------", event.touches[0].clientX > 250)
            if (event.touches[0].clientX > 200) {
                this.add_border = true;
            } else {
                this.add_border = false;
            } 
        },
        //时间处理。
        getMondayAndSunday() {
          
            let today_week = dayjs().day()
            let start_time = dayjs().subtract(today_week == 0 ? today_week + 6 : today_week - 1, 'day').format('YYYY-MM-DD')
            let end_time = dayjs(start_time).add(6, 'day').format('YYYY-MM-DD')


            this.toolTime01 = start_time;
            this.toolTime02 = end_time;
            this.startDate = start_time;
            this.endDate = end_time;

            let time = this.startDate.split('-');       //设置选择器默认值。。。
            console.log('--jion---------', time)
            this.startTimes = new Date(time[0], time[1] - 1, time[2]);
            //为星期天加上23：59：59...。
            let ends = dayjs(end_time).endOf('day').format('YYYY-MM-DD HH:mm:ss');

            // console.log(start_time, end_time)
            console.log('-------------yy-mm--dd:', this.startDate, this.endDate)

            console.log('时间戳', dayjs(start_time).valueOf(), dayjs(end_time).valueOf());
            console.log('777777777', dayjs(ends).valueOf())
            
            this.start_date_num = dayjs(start_time).valueOf();
            this.end_date_num = dayjs(ends).valueOf();
            // this.start_date_num = startDate_num;
            // this.end_date_num = endDate_num;
        },

        // 简易请求封装。。
        defRequest (param) {
            param.data = {
                ...param.data,
                ...deviceInfo,
                ticket: userInfo.ticket,
                uid: userInfo.uid,
            }
            let origin = location.origin
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
        }, 

        // 请求汇总列表数据。。。
        geta_pool_list () {

            this.defRequest({
                method: 'get',
                url: '/api/user/purse/sumDiamond',
                data: {
                    startDate: this.start_date_num,
                    endDate: this.end_date_num,
                }
            }).then(res => {
                console.log('res-------汇总列表，。。--------:', res);
                this.pool_list = res.data;
                // console.log('=-------pool_list-----11111------', this.pool_list, this.get_diamond, this.reduce_diamond)
            })
            .catch(err => {
                defToast(err.message)
            })
        },
    },
    mounted() {
        this.getMondayAndSunday();
        this.geta_pool_list();
        // console.log('=-------pool_list-----------', this.pool_list)
    }
})
//头部轮播图。。
let swiper = new Swiper(".study_fo", {
    // 可以看到的是 3个半
    slidesPerView: 4,
    // 每个的元素间隔
    spaceBetween: 0,
});