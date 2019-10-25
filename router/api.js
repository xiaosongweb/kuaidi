const express = require('express')
const router = express.Router()
const uc = require('../controllers/user')


router.get('/history', uc.historyOrder)
router.get('/findMeOrder', uc.findMeOrder)
router.get('/userAll', uc.allUser)
router.get('/orderAll', uc.allOrder)
router.post('/register', uc.hasUser, uc.registerUser)
router.post('/login', uc.loginUser)
router.post('/checkUser', uc.checkUser)
router.post('/addOrder', uc.addOrder)
router.get('/getMe', uc.getMe)
router.delete('/delete/:id', uc.deleteOrder)

// router.get('/checkCode', (req, res) => {
//     var username = req.query.name;
//     var code = req.query.code;
//     var outdate = req.query.outdate;
//     User.findOne({ name: username }, function (err, user) {
//         if (user.code === code && (user.date - Date.now()) > 0) {
//             User.update({ name: username }, { islive: true }, function (err) {
//                 if (err) {
//                     res.render('login', {
//                         title: '登录',
//                         error: '激活失败！'
//                     });
//                 } else {
//                     res.render('login', {
//                         title: '登录',
//                         error: '激活成功请登录！'
//                     });
//                 }
//             });
//         }
//     });
// })
module.exports = router
