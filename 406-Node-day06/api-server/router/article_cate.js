// 发布文章路由
const express = require('express')
const expressJoi = require('@escook/express-joi')
const { getArticleCates_handle, addCates_handle, delete_cates_handle, catesById_handle, updateCates_handle } = require('../router_handler/article_cate')
const { article_cate_schema, deleteCate_schema, catesById_schema, updateCates_schema } = require('../schema/article_cate')
const articleCateRouter = express.Router()
articleCateRouter.get('/cates', getArticleCates_handle)
articleCateRouter.post('/addArticle', expressJoi(article_cate_schema), addCates_handle)
articleCateRouter.delete('/deletecates/:id', expressJoi(deleteCate_schema), delete_cates_handle)
articleCateRouter.get('/cates/:id', expressJoi(catesById_schema), catesById_handle)
articleCateRouter.post('/updateCates', expressJoi(updateCates_schema), updateCates_handle)

module.exports = articleCateRouter