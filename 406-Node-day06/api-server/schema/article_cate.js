const Joi = require('joi')
// 文章名字和别名验证
const name = Joi.string().required()
const alias = Joi.string().alphanum().required()
exports.article_cate_schema = {
    body: {
        name,
        alias
    }
}

// 验证删除分类的动态参数id
const id = Joi.number().min(1).required()
exports.deleteCate_schema = {
    // 验证的是动态参数，restful风格的参数
    params: {
        id
    }
}

exports.catesById_schema = {
    params: {
        id
    }
}

exports.updateCates_schema = {
    body: {
        id,
        name,
        alias
    }
}