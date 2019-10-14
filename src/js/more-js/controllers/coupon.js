import couponView from '../views/coupon.art'
class InitCoupon {
    init() {
        let html = couponView()
        $('main').html(html)
    }


}
export default new InitCoupon()