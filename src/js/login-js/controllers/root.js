import rootView from '../views/root.art'
class InitRoot {
    init() {
        let html = rootView();
        $('#root').html(html)
    }
}
export default new InitRoot()