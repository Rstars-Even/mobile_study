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
            // lang: 'zh',
            // titles: ['汇总', '聊天'],
            // isicon: 0,                    //tab选中状态。
            // add_border: true,           //tab左右边框样式。。
            pool_list: {},               //汇总列表。。
            incrDiamond: '',
            decrDiamond: "",
            listType: 2,                 //列表类型。。 1 获得，2 消费

            pageNum: 1,
            pageSize: 20,
            lists: [],

            indexList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        }
    },
    filters: {
        time_filter: function (value) {
            if (!value) return ''
            // value = value.toString()
            if (value >= 3600) {
                return dayjs(value).format('HH:mm:ss');
            }
            return dayjs(value * 1000).format('mm:ss');
        }
    },
    methods: {
        // 点击显示时间选择器。。
        header_top_click() {
            this.isChoiceTime = true;
            langTranslate ()

        },
        // 取消关闭时间选择器。。
        cancelClick() {
            this.isChoiceTime = false;
        },
        // 确认选择的时间。发起查询请求。。。
        async determine() {

            this.isChoiceTime = false;
            // 把所选的时间转为时间戳。。
            let test_startDate = dayjs(this.toolTime01).valueOf();
            let end = dayjs(this.toolTime02).endOf('day').format('YYYY-MM-DD HH:mm:ss');
            let test_endDate = dayjs(end).valueOf();

            if (test_startDate > test_endDate) {//先检测时间选择是否正确。。
			    defToast($.i18n().localize('i18n_time_err'))
                return;
            }

            this.start_date_num = test_startDate;
            this.end_date_num = test_endDate;
            console.log('-----请求的时间戳------：', this.start_date_num, this.end_date_num)

            this.startDate = this.toolTime01;
            this.endDate = this.toolTime02;

            // 请求初始化。
            this.lists = [];
            this.pageNum = 1;
            document.documentElement.scrollTop = 0;


            this.geta_pool_list();
            this.lists = await this.get_list (this.listType);
            // console.log ('-----------数据-------------0000',this.lists);
            langTranslate ()
        },
        // 时间选择器切换背景事件。。
        timeClick(n) {
            let times
            if(n == 1) {
                this.cont = 1;
                times = this.toolTime01.split('-');       //设置选择器默认值。。。
                this.startTimes = new Date(times[0], times[1] - 1, times[2]);
            } else {
                this.cont = 2;
                times = this.toolTime02.split('-');       //设置选择器默认值。。。
                this.startTimes = new Date(times[0], times[1] - 1, times[2]);
            }
        },
        // 选择的时间段。。选择器自带的事件。。。
        changeTimeMore(picker) {
            let startTime = picker.getValues();
            this.startTimes = startTime[0] + "-" + startTime[1] + "-" + startTime[2];
            // console.log('---------this.startTimes----', this.startTimes);

            if(this.cont == 1) {
                this.toolTime01 = this.startTimes;
            } else {
                this.toolTime02 = this.startTimes;
            }
        },
        async change(name) {       //选择要显示的列表类型。。。1 获取 2 消费
            let index = Number(name);
            if (this.listType == index && this.lists.length > 0) {
                console.log('--------防抖--节流------')
                return
            }
            this.lists = [];
            document.documentElement.scrollTop = 0;
            this.pageNum = 1;
            this.listType = index;
            console.log('-----listType------',index, this.listType);
          
            this.lists = await this.get_list (index);
        
            console.log ('-----------数据-------------0000',this.lists);
            langTranslate ()
        },
       
        //初始化时间处理。
        getMondayAndSunday() {
          
            let today_week = dayjs().day()
            let start_time = dayjs().subtract(today_week == 0 ? today_week + 6 : today_week - 1, 'day').format('YYYY-MM-DD')
            let end_time = dayjs(start_time).add(6, 'day').format('YYYY-MM-DD')

            this.toolTime01 = start_time;
            this.toolTime02 = end_time;
            this.startDate = start_time;
            this.endDate = end_time;

            let time = this.startDate.split('-');       //设置选择器默认值。。。
            // console.log('--jion---------', time)
            this.startTimes = new Date(time[0], time[1] - 1, time[2]);
            //为星期天加上23：59：59...。
            let ends = dayjs(end_time).endOf('day').format('YYYY-MM-DD HH:mm:ss');

            // console.log(start_time, end_time)
            console.log('-------------yy-mm--dd:', this.startDate, this.endDate)

            console.log('时间戳', dayjs(start_time).valueOf(), dayjs(end_time).valueOf());
            // console.log('777777777', dayjs(ends).valueOf())
            
            this.start_date_num = dayjs(start_time).valueOf();
            this.end_date_num = dayjs(ends).valueOf();
        },

        // 请求金币汇总列表数据。。。
        geta_pool_list () {

            defRequest({
                method: 'get',
                url: '/api/user/purse/sumGold',
                data: {
                    startDate: this.start_date_num,
                    endDate: this.end_date_num,
                    // startDate: 1665728426000,
                    // endDate: 1668406826000,
                }
            }).then(res => {
                console.log('res-------汇总列表11111111，。。--------:', res);
                if (res.code != 200) {
                    return;
                }
                // this.pool_list = res.data;
                this.incrDiamond = res.data.incrGold;
                this.decrDiamond = res.data.decrGold;
                console.log('=-------pool_list-----11111------', this.incrDiamond, this.decrDiamond)
            })
            .catch(err => {
                defToast(err.message)
            })
        },
        // 请求金币列表明细数据。。type: 1 获得， 2 消费
        get_list (type) {

            return new Promise((resolve) => {

                defRequest({
                    method: 'get',
                    url: '/api/user/purse/listGold',
                    data: {
                        startDate: this.start_date_num,
                        endDate: this.end_date_num,
                        // startDate: 1665728426000,
                        // endDate: 1668406826000,
                        type: type,
                        pageNum: this.pageNum,
                        pageSize: this.pageSize
                    }
                }).then(res => {
                    console.log(`res-------qingqiu金币列表，。。-------:`, res);
                    if (res.code != 200) {
                        return;
                    } else if (res.data.length == 0) {
			            defToast($.i18n().localize('i18n_no_more'))
                        return;
                    }
                    // console.log('=-------pool_list-----11111------', this.pool_list, this.get_diamond, this.reduce_diamond)
                    let data = res.data;
                    let ress = this.data_handling (data);
                    // this.lists = ress;

                    // console.log('------数据处理完成,返回 Promise----', this.lists);
                    resolve(ress);
                })
                .catch(err => {
                    defToast(err.message)
                })

            });
        },
        //数据处理 
        data_handling (data) { 
            let tempArr = [];
            var newArr = [];
            let time_day;
            let time_days
            let time_dayss
            for (let i = 0; i < data.length; i++) {
                time_day = dayjs(data[i].createTime).format('YYYY-MM-DD');
                // let time_hours = dayjs(data[i].createTime).format('HH:mm');
                // console.log('-------时间对比-----', time_day,);

                if (tempArr.indexOf(time_day) === -1) {
                    newArr.push({
                        createTime: time_day,
                        datas: [data[i]]
                    });
                    tempArr.push(time_day);
                } else {
                    for (let j = 0; j < newArr.length; j++) {
                        time_days = dayjs(data[i].createTime).format('YYYY-MM-DD');
                        time_dayss = dayjs(newArr[j].createTime).format('YYYY-MM-DD');
                        
                        if (time_days == time_dayss) {
                            newArr[j].datas.push(data[i]);
                            // newArr[j].datas[j].time_hours = time_hours;
                            break;
                        }
                    }
                }
            }
            let time_hours
            for (let index = 0; index < newArr.length; index++) {
                const element = newArr[index];

                for (let k = 0; k < element.datas.length; k++) {
                    const elements = element.datas[k];
                    time_hours = dayjs(elements.createTime).format('HH:mm');

                    // console.log('-------时间对比-----', time_day, time_hours);
                    elements.time_hours = time_hours;
                }
            }
            // console.log('------------newArr------------', newArr)
            return newArr;
        },

        // 第二次数据处理。。。

        // 数据下拉加载更多。。。
        async handle () {
            let scrollTop = $(window).scrollTop();
            let scrollHeight = $(document).height();
            let windowHeight = $(window).height();
            // console.log('---', scrollTop, scrollHeight, windowHeight);
            if (scrollTop + windowHeight + 0.6 >= scrollHeight) {
                
                this.pageNum++;
                let data;
                data = await this.get_list (this.listType);      //消费、。。
                    
                console.log("----------滑动加载数据----------:", this.pageNum, data);
                let lists_arr = this.lists.concat(data);
                // console.log("----------合并滑动加载数1111111111111----------:", lists_arr);
                
                let time;
                for (let index = 0; index < lists_arr.length; index++) {
                    const element = lists_arr[index];

                    if (element.createTime == time && index != 0) {
                        lists_arr[index - 1].datas = lists_arr[index - 1].datas.concat(element.datas);
                        lists_arr.splice(index,1);
                        break;
                    }
                    time = element.createTime
                }
                
                console.log("----------合并滑动加载数据22222222222222----------:", lists_arr);
                this.lists = lists_arr;
                console.log('--------滑动后的最终数据this.lists-----------', this.lists);
                langTranslate ()

            }
        },
        async init () {
            this.lists = await this.get_list(2);
            langTranslate ()
            console.log('-----首次列表数据----------', this.lists);
        },
        // 查看用户信息。。
        find_infor (uid) {
            console.log('---uid---:', uid);
            _YM_JSBridge.openUserInfo(uid)
        },
    },
    mounted() {
       
        this.getMondayAndSunday();
        this.init();
        this.geta_pool_list();
        window.addEventListener('scroll', this.handle)

    }
})