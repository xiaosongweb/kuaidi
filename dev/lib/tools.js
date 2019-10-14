
module.exports = {
    serialize: function (hash) {
        let naemList = {
            price: '失效价格',
            all: '快递大全',
            network: '网点查询',
            global: '国际快递',
            downapp: '下载App',
            orderimport: '订单导入'
        }
        for (let item in naemList) {
            if (hash === "#" + item) {
                return naemList[item]
            }
        }

    }
}