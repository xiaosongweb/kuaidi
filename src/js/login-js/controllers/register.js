import view from '../views/reg.art'
class Lgin {
    init() {
        let html = view()
        $('main').html(html)
        this.bindEvent()
    }
    bindEvent() {
        $('form input').on('focus', this.focus)
        $('.agreement>i').on('tap', this.agree)
        $('#submit').on('tap', this.reg)
    }
    reg() {
        let fromData = $('#form').serializeArray()
        let dat = {}
        fromData.forEach((ele, index) => {
            dat[ele.name] = ele.value
        });
        let { username, password, confimPassword } = dat

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
        if (!confimPassword) {
            $('#warn').animate({
                opacity: 1,
                height: '21.58px'
            }).html('请输入重复密码')
            return false
        }
        if (password !== confimPassword) {
            $('#warn').animate({
                opacity: 1,
                height: '21.58px'
            }).html('密码不一致')
            return false
        }

        if (!$('.agreement>i').hasClass('active')) {
            $('#warn').animate({
                opacity: 1,
                height: '21.58px'
            }).html('您没有同意注册协议')
            return false
        }
        $.ajax({
            url: '/userRegiser',
            type: 'POST',
            data: {
                username,
                password,
                confimPassword
            },
            success: function (res) {
                if (res.code === 0) {
                    location.hash = '#login'
                } else {
                    $('#warn').animate({
                        opacity: 1,
                        height: '21.58px'
                    }).html('账户已经存在')
                    return false
                }
            }
        })
    }
    agree() {
        $(this).toggleClass('active')
    }

    focus() {
        $('#warn').animate({
            opacity: 0,
            height: 0
        })
    }

}
export default new Lgin()