const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { userSchema, userOrderSchema } = require('./schema')
const { host, port, database } = require('./dbconfig')
mongoose.connect(`mongodb://${host}:${port}/${database}`, { useNewUrlParser: true, useUnifiedTopology: true })
const Models = {
    User: mongoose.model('user', userSchema(Schema)),
    UserLoOrders: mongoose.model('userLoOrders', userOrderSchema(Schema), 'userLoOrders')
}

module.exports = Models


