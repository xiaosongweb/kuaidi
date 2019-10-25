const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const moment = require('moment')

const encodePassword = (password) => {
    const saltRounds = 10;
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(password, salt, function (err, hash) {
                resolve(hash)
            })
        })
    })
}
const parsePassword = (password, hash) => {
    return bcrypt.compare(password, hash)
}
const addToken = ({ content, secretKey, outTime = 3600 }) => {
    //news : 信息
    //secretKey:私钥
    //outTime:过期事件
    let token = jwt.sign(content, secretKey, {
        expiresIn: outTime
    })
    return token
}
const parseToken = (token, secretKey, callback) => {
    return jwt.verify(token, secretKey, (err, decoded) => {
        callback(err, decoded)
    })
}
const nowTime = function () {
    return moment().format('MM-DD/HH:mm');
}
const randomOrder = function (cscNum) {
    return cscNum + moment().format('YYYYMMDDHHMMSS')
}
module.exports = {
    encodePassword,
    parsePassword,
    addToken,
    parseToken,
    nowTime,
    randomOrder
}