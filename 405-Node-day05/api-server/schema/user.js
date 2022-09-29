// 用户信息验证模块
const Joi = require('joi')
const username = Joi.string().alphanum().min(1).max(10).required()
const password = Joi.string().alphanum().pattern(/^[\S{6,12}]$/).required() //[/^$/]以什么开头以什么结尾
//  \S非空字符{6,12}个数范围

// 导出对象
exports.reg_login_schema = {
    body: {
        username,
        password
    }
}