import aboutView from '../views/about.art'
class InitAbout {
    init(session) {
        let html = aboutView()
        $('main').html(html)
    }


}
export default new InitAbout()