import messView from '../views/mess.art'
class InitMess {
    init() {
        let html = messView()
        $('main').html(html)
    }


}
export default new InitMess()