// 添加文章验证模块
const Joi = require('joi')
const title = Joi.string().required()
const cate_id = Joi.number().integer().min(1).required()
const content = Joi.string().required().allow('')
const state = Joi.string().valid('已发布', '草稿').required()

exports.article_schema = {
    // 验证req.body表单数据
    body: {
        title,
        cate_id,
        content,
        state
    }
}

const id = Joi.number().integer().min(1).required()
exports.delete_article_schema = {
    params: {
        id
    }
}

exports.edit_article_schema = {
    body: {
        id,
        title,
        cate_id,
        content,
        state
    }
}