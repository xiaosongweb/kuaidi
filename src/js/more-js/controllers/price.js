import priceView from '../views/price.art'
class InitPrice {
    init(session) {
        let html = priceView()
        $('main').html(html)
        this.bindEvent()
    }
    bindEvent() {
        $('.plus').on('tap', this.add)
        $('.minus').on('tap', this.decrease)

    }
    add() {
        $('.small').val(parseInt($('.small').val()) + 1)
        $('.minus').removeClass('disabled')
    }
    decrease() {
        if ($('.small').val() <= 1) {
            $(this).addClass('disabled')
            return false
        }
        $(this).removeClass('disabled')
        $('.small').val(parseInt($('.small').val()) - 1)
    }
    changeClass() {

    }
}
export default new InitPrice()