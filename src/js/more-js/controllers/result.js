import View from '../views/result.art'
import { getOnOreder } from '../models/queryData'
class Result {
    async init(session) {
        if ($.isEmptyObject(session)) {
            location.href = 'login.html'
        }
        this.searchVal = location.hash.replace('#result/', '')
        let d = await this.load(session.username, this.searchVal)
        let html = View({
            cscName: d.data[0].cscName,
            cscNum: d.data[0].cscNum,
            imgUrl: d.data[0].imgUrl,
            orderId: d.data[0].orderId,
            inputVal: this.searchVal
        })
        $('main').html(html)
        $('.common-title').html('快递100')
    }
    load(username, orderId) {
        return getOnOreder({ username, orderId })
    }
}

export default new Result()