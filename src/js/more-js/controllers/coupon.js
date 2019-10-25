import couponView from '../views/coupon.art'
class InitCoupon {
    init(session) {
        let html = couponView()
        $('main').html(html)
    }
}
export default new InitCoupon()