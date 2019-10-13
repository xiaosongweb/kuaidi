import homeView from '../views/home.art'

class InitHome {
    init() {
        let html = homeView()
        $("main").html(html)

        this.bindEvent()

    }
    bindEvent() {
        $('.app-form input').on('input', this.isInput.bind(this))
        $('.clear-input-new').on('click', this.clear.bind(this))
    }
    clear() {
        console.log(1)
        $('.app-form input').val("")
        this.isInput()
    }
    isInput() {
        if ($('.app-form input').val() !== '') {
            $('.clear-input-new').show()
            $('.scan').hide()
            $('.app-search-new').css({
                visibility: "visible"
            })
        } else {
            $('.clear-input-new').hide()
            $('.scan').css({
                display: 'block'
            })
            $('.app-search-new').css({
                visibility: "hidden"
            })
        }
    }
}
export default new InitHome()