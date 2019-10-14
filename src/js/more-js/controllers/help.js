import helpView from '../views/help.art'
class InitHelp {
    init() {
        let html = helpView()
        $('main').html(html)
    }


}
export default new InitHelp()