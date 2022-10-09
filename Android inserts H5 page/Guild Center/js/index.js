(function () {

    let lang = 'i18n_en';

    function langTranslate () {
        const $i18n = $.i18n()
        $i18n.locale = lang
        $.i18n.debug = true
        $i18n.load(`lang/${ lang }.json`, $i18n.locale).done(
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


    // 本周上周数据样式切换。。
    $(".content_btn_weeks1").click(function(){
        $(".content_btn_weeks2").css({"color":"#FFFFFF", "background":"none"});
        $(".content_btn_weeks1").css({"color":"#6A70FF", "background":"#FFFFFF"});
    })
    $(".content_btn_weeks2").click(function(){
        $(".content_btn_weeks1").css({"color":"#FFFFFF", "background":"none"});
        $(".content_btn_weeks2").css({"color":"#6A70FF", "background":"#FFFFFF"});
    })


    // 用户信息点击更多。。。
    $(".table_icon").click(function(){
        $(".title_data1").css({"display":"none"});
        $(".title_data2").css({"display":"flex"});
        console.log(2222222222)
    })
    $(".table_icon2").click(function(){
        $(".title_data1").css({"display":"flex"});
        $(".title_data2").css({"display":"none"});
    })
   
})();