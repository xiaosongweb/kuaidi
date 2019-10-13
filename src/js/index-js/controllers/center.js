import centerView from '../views/center.art'

class InitCenter {
    init() {
        let html = centerView()
        $("main").html(html)
 
    }
}
export default new InitCenter()