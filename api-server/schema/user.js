// 验证表单数据模块
const Joi = require('joi')
// 验证注册
const username = Joi.string().alphanum().min(3).max(12).required()
const password = Joi.string().pattern(/^[\S]{6,12}$/).required()
module.exports.register_schema = {
    body: {
        username,
        password
    }
}

const id = Joi.number().integer().min(1).required()
const nickname = Joi.string().required()
const email = Joi.string().email().required()
module.exports.updateUserInfo_schema = {
    body: {
        id,
        nickname,
        email
    }
}


module.exports.rePwd = {
    body: {
        oldPwd: password,
        newPwd: Joi.not(Joi.ref('oldPwd')).concat(password) //新密码不能和老密码一样，并且要满足密码的验证规则
    }
}

module.exports.updateAvater_schema = {
    body: {
        avatar: Joi.string().dataUri().required()
    }
}