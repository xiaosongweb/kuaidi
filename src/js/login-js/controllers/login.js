import view from '../views/login.art'
class Lgin {
    init() {
        let html = view()
        $('main').html(html)
        this.bindEvent()
    }
    bindEvent() {
        $('#submit').on('tap', this.test)
        $('form input').on('focus', this.focus)
        $('#goReg').on('tap', this.reg)
    }
    reg() {
        location.hash = '#reg'
    }
    test() {
        let username = $('#name').val()
        let password = $('#password').val()
        if (!username) {
            $('#warn').animate({
                opacity: 1,
                height: '21.58px'
            }).html('请输入用户名')
            return false
        }
        if (!password) {
            $('#warn').animate({
                opacity: 1,
                height: '21.58px'
            }).html('请输入密码')
            return false
        }
        $.ajax({
            url: '/userLogin',
            data: {
                username: username,
                password: password
            },
            type: 'POST',
            success: function (res) {
                if (res.code === 0) {
                    localStorage.setItem('user', JSON.stringify(res))
                    location.href = 'index.html#center'
                } else {
                    $('#warn').animate({
                        opacity: 1,
                        height: '21.58px'
                    }).html('账号密码错误')
                    return false
                }
            }
        })


    }
    focus() {
        $('#warn').animate({
            opacity: 0,
            height: 0
        })
    }

}
export default new Lgin()