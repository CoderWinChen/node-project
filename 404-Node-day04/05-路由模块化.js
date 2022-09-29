const express = require('express')
const router = require('./06-router') //注册路由模块
const app = express()
app.use(router) //使用路由模块
app.listen(80, () => {
    console.log('server running at http://localhost');
})