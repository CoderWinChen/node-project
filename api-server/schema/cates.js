// 分类验证规则
const Joi = require('joi')
const name = Joi.string().required()
const alias = Joi.string().alphanum().required()

exports.add_cates_schema = {
    name,
    alias
}

const id =  Joi.number().integer().min(1).required()

exports.del_cates_schema = {
    params: {
       id
    }
}

exports.update_cates_schema = {
    body: {
        id,
        name,
        alias
    }
}