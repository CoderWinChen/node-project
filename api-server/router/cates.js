// 文章分类路由
const express = require('express');
const expressJoi = require('@escook/express-joi')
const { list_cates_handler, add_cates_handler, del_cates_handler, get_cates_handler, update_cates_handler } = require('../router_handler/cates');
const { add_cates_schema, del_cates_schema, update_cates_schema } = require('../schema/cates');
const cateRouter = express.Router()
cateRouter.get('/cates', list_cates_handler)
cateRouter.post('/addcates', expressJoi(add_cates_schema), add_cates_handler)
cateRouter.get('/deletecate/:id', expressJoi(del_cates_schema), del_cates_handler)
cateRouter.get('/cates/:id', expressJoi(del_cates_schema), get_cates_handler)
cateRouter.post('/updatecate', expressJoi(update_cates_schema), update_cates_handler)
module.exports = cateRouter;