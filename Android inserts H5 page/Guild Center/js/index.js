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
})();