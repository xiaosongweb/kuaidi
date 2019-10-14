import globalView from '../views/global.art'
class InitGlobal {
    init() {
        let html = globalView()
        $('main').html(html)
        this.bindEvent()
    }
    bindEvent() {
        $('.main-title-name').on('tap', function (params) {
            $(this).addClass('choose').siblings().removeClass('choose')
            let index = $(this).index()
            $('.all > article').eq(index).addClass('active').siblings().removeClass('active')
        })
    }

}
export default new InitGlobal()