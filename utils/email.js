const nodemailer = require('nodemailer');
function sendEmail(email) {
    let transporter = nodemailer.createTransport({
        service: 'qq', // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
        port: 465, // SMTP 端口
        secureConnection: true, // 使用了 SSL
        auth: {
            user: '903300148@qq.com',
            pass: 'czrlyyoxjhlgbbif',
        }
    });
    let mailOptions = {
        from: '"快递信息后台管理系统账户激活" <903300148@qq.com>',
        to: email,
        subject: '账号激活信息',
        html: '快递信息管理系统：尊敬的用户你好，请进行账号的<a href="http://localhost:9999/checkCode" rel="external nofollow" >激活</a>'
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });
}
module.exports = sendEmail