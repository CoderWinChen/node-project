// 这个模块是专门用来存放路由的
const userHandler = require('../router_handler/user')
// 解构写法，本来拿到的是对象，但是拿到对象里面的属性/变量可以通过 {} 的形式拿到
const { reg_login_schema } = require('../schema/user')
const expressJoi = require('@escook/express-joi')
const express = require('express')
const router = express.Router()
// 抽离处理函数，让模块更加纯粹
router.post('/register',expressJoi(reg_login_schema), userHandler.register) //局部中间件写法，传入验证规则
router.post('/login',userHandler.register)
module.exports = router