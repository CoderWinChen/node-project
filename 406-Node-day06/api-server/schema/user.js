// 用户信息验证模块
const Joi = require('joi')
const username = Joi.string().alphanum().min(1).max(10).required()
const password = Joi.string().alphanum().pattern(/^[\S]{6,12}$/).required() //[/^$/]以什么开头以什么结尾
//  \S非空字符{6,12}个数范围

// 导出对象
exports.reg_login_schema = {
    body: {
        username,
        password
    }
}

// 修改用户信息：定义id，nickname，email的验证规则
const id = Joi.number()
    .integer()
    .min(1).required()
const nickname = Joi.
    string()
    .required()
const email1 = Joi.string()
    .email()
exports.update_userInfo_schema = {
    // 这里的body，表示对req.body里面的字段进行验证
    body: {
        id,
        nickname,
        email: email1
    }
}

// 重置密码验证规则
exports.repassword_schema = {
    body: {
        oldPwd: password,
        // 新密码不能和旧密码一样，但是要有密码的验证规则
        newPwd: Joi.not(Joi.ref('oldPwd')).concat(password)
    }
}

// 修改用户头像：验证规则

const avatar = Joi.string().dataUri().required()
module.exports.avatar_schama = {
    body: {
        avatar
    }
}