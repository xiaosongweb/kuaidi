import addrView from '../views/addr.art'
class InitAddr {
    init() {
        let html = addrView()
        $('main').html(html)
    }


}
export default new InitAddr()