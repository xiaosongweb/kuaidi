import aboutView from '../views/about.art'
class InitAbout {
    init() {
        let html = aboutView()
        $('main').html(html)
    }


}
export default new InitAbout()