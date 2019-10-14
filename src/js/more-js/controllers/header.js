
import headerView from '../views/header.art'
class InitHeader {
    init(hash) {
        let html = headerView({
            name: hash
        });
        $('header').html(html)
        this.bindEvent()
    }
    bindEvent() {
        $('.common-back').on('click', function (params) {
            window.history.back(-1)
        })
    }

}
export default new InitHeader()