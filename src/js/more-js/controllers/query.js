import queryView from '../views/query.art'
import queryData from '../views/queryData.art'

class InitQuery {
    async init(session) {
        this.session = session || JSON.parse(localStorage.getItem('user'))
        this.orederId = null
        this.res = await this.loadData()
        let html = queryView()
        $('main').html(html)
        $('.explist').html(queryData({
            data: this.res.data
        }))
        this.bindEvent()
        this.isEmpty(this.res.code)

    }

    isEmpty(code) {
        if (code === 0) {
            $('.explist').css('display', 'block')
            $('.empty').css('display', 'none')
        } else {
            $('.explist').css('display', 'none')
            $('.empty').css('display', 'block')
            $('.in-loading').css('display', 'none')
        }
    }
    bindEvent() {
        $('.ctrl').on('tap', this.ctr.bind(this))
        $('.cancel').on('tap', this.cancel)
        $('.danger').on('tap', this.delete.bind(this))
        $('.search input').on('input', this.search.bind(this))
    }
    search() {
        let searchVal = $('#search').val()
        if (!searchVal) {
            $('.explist').html(queryData({
                data: this.res.data
            }))
            return false
        }
        let d = this.res.data.filter((ele, index) => {
            if (ele.orderId.indexOf(searchVal) != -1 || ele.cscName.indexOf(searchVal) != -1) {
                return ele
            }
        })
        $('.explist').html(queryData({
            data: d
        }))
        if (d.length === 0) {
            $('.in-loading').hide()
            return false
        }
        $('.in-loading').show()

    }
    ctr(evt) {
        $('.m-mask').css({
            display: 'block'
        })
        $('.actionsheet').addClass('open')
        this.orderId = $(evt.target).parent().find('small').html()
    }
    delete() {
        let that = this
        $.ajax({
            url: `/deleteOrder/${this.orderId}`,
            type: 'delete',
            success: function (res) {
                if (res.code === 0) {
                    $('.m-mask').css({
                        display: 'none'
                    })
                    $('.actionsheet').removeClass('open')
                    that.init()
                }

            }
        })

    }
    cancel() {
        $('.m-mask').css({
            display: 'none'
        })
        $('.actionsheet ').removeClass('open')
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

}
export default new InitQuery()