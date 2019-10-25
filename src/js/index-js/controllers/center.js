import centerView from '../views/center.art'

class InitCenter {
    init(session) {
        let html = centerView()
        $("main").html(html)
        this.bindEvent()
        this.hasLogin()
    }
    bindEvent() {
        $('.menu-list li').on('tap', this.dump)
        $('#has').on('tap', this.login)
    }
    dump() {
        let className = $(this).children('.ico').attr("class")
        let hash = "more.html#" + className.split(" ")[1]
        location.href = hash
    }
    login() {
        location.href = 'login.html'
    }
    hasLogin() {
        if (!localStorage.getItem('user')) {
            $('.infos p:nth-child(1)').html('未登录')
            $('.infos p:nth-child(2)').html('<span>登录后享受更多特权</span>')
            return false
        }
        let { username } = JSON.parse(localStorage.getItem('user'))
        $('.infos p:nth-child(1)').html(username)
        $('.infos p:nth-child(2)').html(`<span>${username}</span>`)
        $('#has').off('tap', this.login)
        $('#has').on('tap', this.me)
    }
    me() {
        location.href= 'more.html#me'
    }

}
export default new InitCenter()