

// 获取钻石任务列表数据。。。
function getUserInfo () {
    defRequest({
        method: 'get',
        url: 'api/task/diamond/getInfo',
        // data: {
        //     queryUid: 103
        // }
    })
        .then(res => {
            $('.num1').html(res.data.matchNum)
            $('.num2').html(res.data.replyNum)
            $('.num3').html(res.data.msgNum)
            $('.num4').html(res.data.dayNum)
            $('.num5').html(res.data.giftNum)
            console.log('log - res -------------数据-------->', res)
            let data = res.data;
            let item = '';
            for (let index = 0; index < data.taskList.length; index++) {
                let element = '';
                // const element = array[index];
                for (let i = 0; i < data.taskList[index].tasks.length; i++) {
                    // console.log('----------------------><<<><><>:', data.taskList[index].tasks[i].title)

                    element += `
                        <div class="list_item_reward">
                            <span class="list_item_reward_title ${data.taskList[index].tasks[i].done ? '' : 'colors'}">${data.taskList[index].tasks[i].title}</span>
                            <span class="lilist_item_reward_num ${data.taskList[index].tasks[i].done ? '' : 'colors'}">${data.taskList[index].tasks[i].value}/${data.taskList[index].tasks[i].need}</span>
                            <span class="${data.taskList[index].tasks[i].done ? '' : 'active'} lilist_item_reward_img"><img src="./images/ic-gouxuan@2x.png" alt=""></span>
                        </div>
                    `
                }

                item += `
                    <div class="list_item">
                        <div class="item_content">

                            <div class="item_content_left">

                                <p class="list_item_diamonds">${data.taskList[index].reward}<span data-i18n="i18n_diamond"></span></p>
                                ${element}
                            </div>
                            <button id='get${data.taskList[index].id}' onclick="fn(${data.taskList[index].id}, ${data.taskList[index].reward}, ${data.taskList[index].status})" data-i18n='${data.taskList[index].status === 0 || data.taskList[index].status === 1 ? "i18n_receive_award" : 'i18n_received'}' class='${data.taskList[index].status === 1 ? "status" : (data.taskList[index].status === 2 ? "none" : "")} item_content_btn_reward'></button>

                        </div>

                        <span id="${data.taskList[index].type === 1 ? '' : 'item_date_colors'}" class="item_date" data-i18n="${data.taskList[index].type === 1 ? 'i18n_daily' : 'i18n_weekly'}"></span>
                    </div>
                `
            }
            // console.log('item-------------', item)
            $('.content').append(item)
            langTranslate ()

        })
        .catch(err => {
            defToast(err.message)
        })
}

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

if (browser.android) {        
    getUserInfo ()
}

//弹窗事件。。
$(".pop").on('click', '.pop-up_ok', function() {
    $('.show').css('display', 'none')
    $('body').css('overflow', 'auto')
    $(".pop-up").remove();
});

//领取钻石奖励弹窗事件。。
fn = function (id, reward, status) {

    console.log('-----------', id, reward, status)
    if (status === 0 || status === 2) {
        return
    }

    defRequest({
        method: 'get',
        url: 'api/task/diamond/getReward',
        data: {
            taskId: id
        }
    })
        .then(res => {
            console.log('res-------领取成功返回------', res);

            if (res.code === 200) {

                $('.show').css('display', 'block')
                $('body').css('overflow', 'hidden')
                let pop_up = `
                    <div class="pop-up">
                        <div class="pop-up_img"></div>
                        <div class="pop-up_text">
                            <span data-i18n="i18n_get"></span>
                            <span>${reward}</span>
                            <span data-i18n="i18n_diamond_bootom"></span>
                        </div>
                        <div class="pop-up_ok" data-i18n="i18n_ok"></div>
                    </div>
                `;
                $('.pop').append(pop_up)

                $(`#get${id}`).removeAttr("data-i18n")
                $(`#get${id}`).html($.i18n().localize('i18n_received'))
                $(`#get${id}`).attr('class', 'none item_content_btn_reward')
                
                langTranslate ()
            }
        })
        .catch(err => {
            defToast(err.message)
        })
}

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
           active: 1
        }
    },
    methods: {
        change() {
            console.log('change事件');
        }
    },
    mounted() {
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
})