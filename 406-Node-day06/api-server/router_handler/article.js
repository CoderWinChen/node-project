const db = require("../db")
const path = require('path')
const articleRouter = require("../router/article")
// 添加文章处理函数

// 文章列表处理函数
exports.article_handle = (req, res) => {
    // 获取所有文章
    const sql = 'select * from ev_article'
    db.query(sql, (err, result) => {
        if (err) {
            return res.cc(err.message)
        }
        res.send({
            status: 0,
            msg: '查询文章列表成功',
            data: result
        })
    })
}

// 添加文章处理函数
exports.addArticle_handle = (req, res) => {
    console.log(req.body);
    console.log(req.file);
    // 验证用户是否上传了图片，上传了才能添加到服务器

    // 没有上传文件或者上传的文件参数名不是cover_img[和数据库对应]
    if (!req.file || req.file.fieldname !== 'cover_img') {
        return res.cc('请上传图片，图片是必选项')
    }
    // 添加到数据库,将uploads中存放的图片二进制覆盖
    const articleInfo = {
        // 标题、内容、状态、作者、发布时间，图片
        ...req.body,
        cover_img: path.join('/upload', req.file.filename),
        pub_date: new Date(),
        author_id: req.user.id
    }

    console.log(articleInfo);
    const sql = 'insert into ev_article set ?'
    db.query(sql, articleInfo, (err, result) => {
        if (err) {
            return res.cc(err.message)
        }
        if (result.affectedRows !== 1) {
            return res.cc('发布文章失败')
        }
        res.cc('发布文章成功', 0)

    })
}

// 删除文章处理函数
exports.delete_article_handle = (req, res) => {
    const sql = 'update ev_article set is_delete = 1 where id = ?'
    db.query(sql, req.params.id, (err, result) => {
        if (err) {
            return res.cc(err.message)
        }
        if (result.affectedRows !== 1) {
            return res.cc('删除文章失败')
        }
        res.cc('删除文章成功', 0)
    })
}

exports.getArticle_handle = (req, res) => {
    // 根据id获取文章
    const sql = 'select * from ev_article where id = ?'
    db.query(sql, req.params.id, (err, result) => {
        if (err) {
            return res.cc(err.message)
        }
        if (result.length !== 1) {
            return res.cc('查询文章详情失败')
        }
        res.send({
            status: 0,
            msg: '查询文章成功',
            data: result
        })
    })
}

exports.edit_article_handle = (req, res) => {
    // 根据id更新文章
    const articleInfo = {
        ...req.body,
        cover_img: path.join('/uploads/', req.file.filename)
    }
    const sql = 'update ev_article set ? where id = ?'
    db.query(sql, [articleInfo, req.body.id], (err, result) => {
        if (err) {
            return res.cc(err.message)
        }
        if (result.affectedRows !== 1) {
            return res.cc('修改文章失败')
        }
        res.cc('修改文章成功', 0)
    })
}