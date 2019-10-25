const { User, UserLoOrders } = require('../utils/db')

const register = (data) => {
    const user = new User(data)
    return user.save(data)
}
const hasUser = (data) => {
    return User.findOne(data)
}
const findAllOrder = (data, condition = {}) => {
    return UserLoOrders.find(data, condition).sort({ time: -1 })
}
const deleteOrder = (data) => {
    return UserLoOrders.remove(data)
}
const findUserAll = (data) => {
    return User.find(data)
}
const findOrderAll = (data) => {
    return UserLoOrders.find(data).sort({ time: -1 })
}
const addOrder = (data) => {
    const order = new UserLoOrders(data)
    return order.save()
}
const getMe = (data) => {
    return User.findOne(data, { password: 0, confimPassword: 0 })
}
module.exports = {
    register, hasUser, findAllOrder, deleteOrder, findUserAll, findOrderAll, addOrder, getMe
}