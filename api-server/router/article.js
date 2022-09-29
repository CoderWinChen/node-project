// 文章分类路由
const express = require('express');
const expressJoi = require('@escook/express-joi')
const path = require('path')
const multer = require('multer')
const uploads = multer({
    dest: path.join(__dirname, '../uploads')
})
const { list_article_handler, add_article_handler, del_article_handler, get_article_handler, update_article_handler } = require('../router_handler/article');
const { add_article_schema, del_article_schema, update_article_schema } = require('../schema/article');
const articleRouter = express.Router()
articleRouter.get('/list', list_article_handler)
articleRouter.post('/add', uploads.single('cover_img'), expressJoi(add_article_schema), add_article_handler)
articleRouter.get('/delete/:id', expressJoi(del_article_schema), del_article_handler)
articleRouter.get('/article/:id', expressJoi(del_article_schema), get_article_handler)
articleRouter.post('/edit',uploads.single('cover_img'), expressJoi(update_article_schema), update_article_handler)
module.exports = articleRouter;