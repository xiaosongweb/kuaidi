
const express = require('express')
const bodyParser = require('body-parser')
const routerApi = require('./router/api')
const path = require('path')

let app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
})
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use('/user', routerApi)

app.listen(9999, () => {
    console.log('port：9999 is  open');
})
