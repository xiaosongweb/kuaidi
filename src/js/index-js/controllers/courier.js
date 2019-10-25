import courierView from '../views/courier.art'
class InitCourier {
    init(session) {
        let html = courierView()
        $("main").html(html)
    }
}
export default new InitCourier()