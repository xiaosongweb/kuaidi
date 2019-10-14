import pointView from '../views/point.art'
class InitPoint{
    init() {
        let html = pointView()
        $('main').html(html)
    }


}
export default new InitPoint()