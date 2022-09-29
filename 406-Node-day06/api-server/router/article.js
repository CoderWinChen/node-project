const expressJoi = require('@escook/express-joi')
const express = require('express')
const multer = require('multer')
const path = require('path')
const { article_handle, addArticle_handle, delete_article_handle, getArticle_handle, edit_article_handle } = require('../router_handler/article')
const { article_schema, delete_article_schema, edit_article_schema } = require('../schema/article')
const articleRouter = express.Router()
// 图片使用multer进行解析

// 1. 安装multer：npm i multer@1.4.2
// 2. 调用multer()中间件，传递文件的存放路径dest属性
const upload = multer({
    dest: path.join(__dirname, '../uploads')
})
// single()
articleRouter.post('/add', upload.single('cover_img'), expressJoi(article_schema), addArticle_handle)
articleRouter.get('/list', article_handle)
articleRouter.get('/delete/:id', expressJoi(delete_article_schema), delete_article_handle) //标记删除
articleRouter.get('/:id', expressJoi(delete_article_schema), getArticle_handle)
articleRouter.post('/edit', upload.single('cover_img'), expressJoi(edit_article_schema), edit_article_handle)
module.exports = articleRouter