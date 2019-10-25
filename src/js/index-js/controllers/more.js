import moreView from '../views/more.art'
class InitMore {
    init(session) {
        let html = moreView()
        $("main").html(html)
    }
}
export default new InitMore()