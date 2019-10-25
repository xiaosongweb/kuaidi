module.exports = {
    userSchema: function (Schema) {
        return new Schema({
            username: {
                type: String,
                require: true
            },
            password: {
                type: String,
                require: true
            },
            name: {
                type: String,
                default: ''
            },
            confimPassword: {
                type: String,
                require: true
            },
            phone: {
                type: Number,
                require: true
            },
            roles: {
                type: Number,
                default: 1
            },
            time: {
                type: String,
            },
            code: {
                type: String
            }, //激活码，格式自己定义
            date: {
                type: Number
            }, //过期日期，过期后不能激活
            islive: {
                type:Boolean
            } //判断是否激活
        })
    },
    userOrderSchema: function (Schema) {
        return new Schema({
            username: {
                type: String,
                require: true
            },
            orderId: {
                type: String,
                require: true
            },
            cscNum: {
                type: String,

            },
            cscName: {
                type: String,

            },
            cscId: {
                type: Number,
                require: true
            },
            imgUrl: {
                type: String
            },
            time: {
                type: String,
            }
        }, { collection: 'userLoOrders' })
    }
}