import priceView from '../views/price.art'
class InitPrice {
    init() {
        let html = priceView()
        $("main").html(html)
    }
}
export default new InitPrice()