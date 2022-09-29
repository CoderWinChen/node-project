// 用户信息模块[操作用户的模块]
const express = require('express')
const expressJoi = require('@escook/express-joi')
const { getUserInfo_handler, updateUserInfo_handler, rePwd_handler, updateAvatar_handler } = require('../router_handler/userInfo')
const { updateUserInfo_schema, rePwd, updateAvater_schema } = require('../schema/user')
const userInfoRouter = express.Router()
userInfoRouter.get('/userinfo', getUserInfo_handler)
userInfoRouter.post('/userinfo', expressJoi(updateUserInfo_schema), updateUserInfo_handler)
userInfoRouter.post('/updatepwd', expressJoi(rePwd), rePwd_handler) //重置密码
userInfoRouter.post('/update/avatar', expressJoi(updateAvater_schema), updateAvatar_handler) //更换头像
module.exports = userInfoRouter