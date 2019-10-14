import queryView from '../views/query.art'
class InitQuery {
    init() {
        let html = queryView()
        $('main').html(html)
    }


}
export default new InitQuery()