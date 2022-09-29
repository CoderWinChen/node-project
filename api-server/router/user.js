const express = require('express')
const user_handler = require('../router_handler/user')
const expressJoi = require('@escook/express-joi') //在调用接口的时候传递中间件

const { register_schema } = require('../schema/user')
const userRouter = express.Router()
userRouter.post('/login', expressJoi(register_schema),user_handler.user_login_handler)
userRouter.post('/register', expressJoi(register_schema), user_handler.user_register)
module.exports = userRouter