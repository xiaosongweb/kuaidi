import homeView from '../views/home.art'
class InitHome {
    async init(session) {
        this.session = session
        let res = await this.loadData()
        let html = homeView({
            data: res.data
        })
        $("main").html(html)
        this.isEmpty(res.code)
        res.data ? $('.show').html(res.data.length) : $('.show').hide()
        this.bindEvent()
    }
    isEmpty(code) {
        if (code === 0) {
            $('.box').css('display', 'none')

        } else {
            $('.box').css('display', 'block')
        }
    }

    loadData() {
        let that = this;
        return new Promise((resolve, reject) => {
            $.ajax({
                url: '/history',
                type: 'GET',
                data: {
                    username: that.session.username
                },
                success: function (res) {
                    if (res.code === 0) {
                        resolve(res)
                    } else {
                        resolve(res)
                    }

                }
            })
        })
    }
    bindEvent() {
        $('.app-form input').on('input', this.isInput.bind(this))
        $('.clear-input-new').on('tap', this.clear.bind(this))
        $('.app-search-new').on('tap', this.search)
    }

    search() {
        location.href = `more.html#result/${$('.search').val()}`
    }
    clear() {
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