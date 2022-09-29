const express = require('express')
const expressJoi = require('@escook/express-joi')
const { getUserInfo_handler, updateUserInfo_handler, repassword_handler, avatar_handler } = require('../router_handler/userInfo')
const { update_userInfo_schema, repassword_schema, avatar_schama } = require('../schema/user')
const userInfoRouter = express.Router()
userInfoRouter.get('/getUserInfo', getUserInfo_handler)
// 传入验证规则对表单数据进行验证
userInfoRouter.post('/updateUserInfo', expressJoi(update_userInfo_schema), updateUserInfo_handler)
userInfoRouter.post('/repassword',expressJoi(repassword_schema),repassword_handler)
userInfoRouter.post('/updateAvater', expressJoi(avatar_schama),avatar_handler)
module.exports = userInfoRouter