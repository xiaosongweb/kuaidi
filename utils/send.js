//sendtest.js
var send = require('./email');
// 创建一个邮件对象
var mail = {
  // 发件人
  from: '903300148@qq.com',
  // 主题
  subject: '测试',
  // 收件人
  to: 'boyangt577@126.com',
  // 邮件内容，HTML格式
  text: '点击激活：xxx' //接收激活请求的链接
};
send(mail);