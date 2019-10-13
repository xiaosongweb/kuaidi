import moreView from '../views/more.art'
class InitMore {
    init() {
        let html = moreView()
        $("main").html(html)
    }
}
export default new InitMore()