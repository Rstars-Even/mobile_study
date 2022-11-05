// 定义一个名为 data_div 的新组件
Vue.component('data_div', {
    data: function () {
        return {}
    },
    template: '<div>2010-03-06</div>'
})
// 定义一个名为 diamond_num 的新组件
Vue.component('diamond_num', {
    data: function () {
        return {}
    },
    template: `
        <div class="header_down_get">
            <span class='diamond'>获得钻石：</span>
            <span class='num'>1000.00</span>
        </div>
    `
})

let app = new Vue({
    el: '#app',
    data: function () {
        return {
            isChoiceTime: false,    //是否显示日期选择器。。
            cont: 1,                   //切换背景图。。。
            toolTime01: '开始日期',
            toolTime02: '结束日期',
            currentDate: new Date(),
            startTimes: '',
            titles: ['汇总', '聊天', '礼物', '视频', '语音', '邀请收益', '系统赠送', '消费钻石',]
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
    },


})
//头部轮播图。。
let swiper = new Swiper(".study_fo", {
    // 可以看到的是 3个半
    slidesPerView: 4,
    // 每个的元素间隔
    spaceBetween: 0,
});