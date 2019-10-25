
import headerView from '../views/header.art'
class InitHeader {
    init(hash) {
        let html = headerView();
        $('header').html(html)
    }
}
export default new InitHeader()