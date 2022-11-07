// 定义一个名为 data_div 的新组件
Vue.component('data_div', {
    data: function () {
        return {}
    },
    template: '<div><slot></slot></div>'
})
// 定义一个名为 diamond_num 的新组件
Vue.component('diamond_num', {
    data: function () {
        return {}
    },
    template: `
        <div class="header_down_get">
            <span class='diamond'><slot name='names'></slot></span>
            <span class='num'><slot name='num'></slot></span>
        </div>
    `
})

let app = new Vue({
    el: '#app',
    data: function () {
        return {
            isChoiceTime: false,    //是否显示日期选择器。。
            cont: 1,                   //切换背景图。。。
            // toolTime01: new Date(new Date().toLocaleDateString()).getTime(),
            // toolTime02: new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1,
            toolTime01: new Date(new Date().toLocaleDateString()).getTime(),
            toolTime02: new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1,
            // currentDate: new Date(),
            startTimes: '',
            titles: ['汇总', '聊天', '礼物', '视频', '语音', '邀请收益', '系统赠送', '消费钻石',],
            isicon: 0,                    //tab选中状态。
            add_border: true,           //tab左右边框样式。。
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

        getMondayAndSunday() {
            var today = new Date();

            //构建当前日期,格式：2022-08-22 00:00:00
            var year = today.getFullYear(); //本年 
            var month = today.getMonth() + 1; //本月
            var day = today.getDate(); //本日
            // var newDate = new Date(year + "-" + month + "-" + day + " 00:00:00"); //年月日拼接
            var newDate = new Date(year + "-" + month + "-" + day); //年月日拼接

            var nowTime = newDate.getTime(); //当前的时间戳
            var weekDay = newDate.getDay(); //当前星期 0.1.2.3.4.5.6 【0 = 周日】

            var oneDayTime = 24 * 60 * 60 * 1000; //一天的总ms

            // 当前星期减去天数，如今天为周五，则本周一为周五的时间戳减去4天的时间戳。但周日特殊，周一至周六是周几的到的weekDay就是几，但是周日的到的为0，需特殊处理
            var thisWeekMondayTime = (1 - weekDay) * oneDayTime + nowTime; //本周一的时间戳
            if (weekDay == 0) {
                // weekDay = 0 为周日，此时本周一时间为周日减去6天的时间
                thisWeekMondayTime = nowTime - 6 * oneDayTime
            }

            var thisWeekSundayTime = thisWeekMondayTime + 6 * 24 * 60 * 60 * 1000 // 本周日

           
            console.log(thisWeekMondayTime, thisWeekSundayTime)
        }

    },
    mounted() {
        this.getMondayAndSunday()
    }
    

})
//头部轮播图。。
let swiper = new Swiper(".study_fo", {
    // 可以看到的是 3个半
    slidesPerView: 4,
    // 每个的元素间隔
    spaceBetween: 0,
});