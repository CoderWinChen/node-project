// 分类验证规则
const Joi = require('joi')
const title = Joi.string().required()
const cate_id = Joi.number().integer().min(1).required()
const content = Joi.string().allow('').required()
const state = Joi.string().valid('已发布', '草稿').required()

exports.add_article_schema = {
    title,
    cate_id,
    content,
    state
}


const id = Joi.number().integer().min(1).required()

exports.del_article_schema = {
    params: {
        id
    }
}

exports.update_article_schema = {
    body: {
        id,
        title,
        cate_id,
        content,
        state
    }
}
