
import footerView from '../views/footer.art'
class InitFooter {
    init() {
        let html = footerView();
        $('footer').html(html)
    }
}
export default new InitFooter()