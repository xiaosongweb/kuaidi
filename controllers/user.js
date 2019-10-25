
const modelsFn = require('../models/user')
const { encodePassword, parsePassword, addToken, parseToken, nowTime, randomOrder } = require('../utils/tools')
const sendEmail = require('../utils/email')

const registerUser = async (req, res, next) => {
    let to = req.body.to
    sendEmail(to)
    let { username, password, confimPassword, phone, roles = 1, name = "" } = req.body
    let time = nowTime()
    password = await encodePassword(password)
    confimPassword = await encodePassword(confimPassword)
    let result = modelsFn.register({ username, password, confimPassword, roles, time, phone, name })
    if (result) {
        res.json({
            code: 0,
            ret: 'success',
            message: 'success'
        })
    }
}
const hasUser = async function (req, res, next) {
    let { username } = req.body
    let result = await modelsFn.hasUser({ username })
    if (result) {
        return res.json({
            code: 1,
            ret: 'fail',
            message: 'user already exists'
        })
    }
    next()
}
const loginUser = async function (req, res, next) {
    let { username, password } = req.body
    await modelsFn.hasUser({ username }).then((data) => {
        return new Promise((resoleve, reject) => {
            if (!data) {
                return res.json({
                    code: 2,
                    ret: 'fail',
                    message: 'Wrong usrname and password'
                })
            }
            resoleve(data)
        })
    }).then(async (data) => {
        let result = await parsePassword(password, data.password)
        if (!result) {
            return res.json({
                code: 2,
                ret: 'fail',
                message: 'Wrong usrname and password'
            })
        }
        let tokenInfo = {
            content: {
                _id: data._id,
                username: data.username
            },
            secretKey: 'ig3am17$85s45hu321ai',
            outTime: 60 * 60 * 2
        }
        let token = addToken(tokenInfo)
        data.token = token
        await modelsFn.register(data)
        res.json({
            code: 0,
            message: 'success',
            token,
            username: data.username,
            name: data.name
        })
    })
}
const checkUser = function (req, res, next) {
    let { username, token } = req.body
    let secretKey = 'ig3am17$85s45hu321ai'
    parseToken(token, secretKey, (err, decoded) => {
        if (err) {
            res.json({
                code: 3,
                message: 'token no find or time lapse'
            })
        } else {
            res.json({
                code: 0,
                message: 'success'
            });
        }
    })
}
const historyOrder = async function (req, res, next) {
    let { username } = req.query
    let result = await modelsFn.findAllOrder({ username }, { username: 0 })
    if (result.length === 0) {
        return res.status(200).json({
            code: 8,
            message: "find fail"
        })
    }
    res.json({
        code: 0,
        message: 'success',
        data: result
    })
}
const findMeOrder = async function (req, res, next) {
    let { username, orderId } = req.query
    let result = await modelsFn.findAllOrder({ username, orderId })
    if (result.length === 0) {
        return res.status(200).json({
            code: 7,
            message: 'find  fail'
        })
    }
    res.json({
        code: 0,
        message: 'success',
        data: result
    })
}
const deleteOrder = async function (req, res, next) {
    let id = req.params.id
    let result = await modelsFn.deleteOrder({ orderId: id })
    if (result.n === 0) {
        return res.status(200).json({
            code: 5,
            message: 'delete fail'
        })
    }
    res.json({
        code: 0,
        message: 'success',
    })
}
const allUser = async function (req, res, next) {
    let { roles } = req.query
    if (parseInt(roles) !== 0) {
        return res.json({
            code: 13,
            message: '没有查询权限'
        })
    }
    let result = await modelsFn.findUserAll()
    if (result.length === 0) {
        return res.status(200).json({
            code: 12,
            message: 'find  fail'
        })
    }
    res.json({
        code: 0,
        message: 'success',
        data: result
    })
}
const allOrder = async function (req, res, next) {
    let { roles } = req.query
    if (parseInt(roles) !== 0) {
        return res.json({
            code: 13,
            message: '没有查询权限'
        })
    }
    let result = await modelsFn.findOrderAll()
    if (result.length === 0) {
        return res.status(200).json({
            code: 12,
            message: 'find  fail'
        })
    }
    res.json({
        code: 0,
        message: 'success',
        data: result
    })
}
const addOrder = async function (req, res, next) {
    let { username, cscNum, cscName, imgUrl, cscId } = req.body
    let time = nowTime()
    let orderId = randomOrder(cscId)
    let result = modelsFn.addOrder({ username, orderId, cscNum, cscName, imgUrl, cscId, time })
    if (result) {
        res.json({
            code: 0,
            ret: 'success',
            message: 'success'
        })
    }
}
const getMe = async function (req, res, next) {
    let { username } = req.query
    let result = await modelsFn.getMe({ username })
    if (result) {
        res.json({
            code: 0,
            ret: 'success',
            message: 'success',
            data: result

        })
    }

}
module.exports = {
    registerUser,
    hasUser,
    loginUser,
    checkUser,
    historyOrder,
    findMeOrder,
    deleteOrder,
    allUser,
    allOrder,
    addOrder,
    getMe
}