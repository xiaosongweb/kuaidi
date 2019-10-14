import allView from '../views/all.art'
class InitAll {
    init() {
        let html = allView()
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
export default new InitAll()