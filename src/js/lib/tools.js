
module.exports = {
    serialize: function (hash) {
        let naemList = {
            price: '时效价格',
            all: '快递大全',
            network: '网点查询',
            global: '国际快递',
            downapp: '下载App',
            orderimport: '订单导入',
            add: '我的订单',
            query: '查件记录',
            mess: '消息中心',
            coupon: '我的卡券',
            point: '积分商城',
            about: '关于我们',
            help: '帮助中心',
            addr:"地址管理"
        }
        for (let item in naemList) {
            if (hash === "#" + item) {
                return naemList[item]
            }
        }

    }
}