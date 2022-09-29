const db = require("../db")

// 文章分类处理函数
exports.list_article_handler = (req, res) => {
    // 查询文章分类数据
    const sql = 'select * from ev_article where is_delete=0 order by id asc'
    db.query(sql, (err, result) => {
        if (err) {
            req.cc(err.message)
        }
        res.send({
            status: 0,
            msg: '查询文章数据成功',
            data: result
        })
    })
}

exports.add_article_handler = (req, res) => {
    // console.log(req.file);

    const sql = 'insert into ev_article set ? '
    const articleInfo = {
        ...req.body,
        cover_img: req.file.filename,
        author_id: req.user.id,
        pub_date: new Date()
    }
    // 添加分类
    db.query(sql, articleInfo, (err, result) => {
        if (err) {
            return req.cc(err.message)
        }
        if (result.affectedRows !== 1) {
            req.cc('添加分类失败')
        }

        req.cc('添加分类成功', 0)

    })

}

exports.del_article_handler = (req, res) => {
    // 标记删除
    const sql = 'update ev_article set is_delete = 1 where id = ?'
    db.query(sql, req.params.id, (err, result) => {
        if (err) {
            return req.cc(err.message)
        }
        if (result.affectedRows !== 1) {
            return req.cc('删除失败')
        }
        req.cc('删除成功')
    })
}

exports.get_article_handler = (req, res) => {
    const sql = 'select * from ev_article where id = ?'
    db.query(sql, req.params.id, (err, result) => {
        if (err) {
            return req.cc(err.message)
        }
        res.send({
            status: 0,
            msg: '查询分类数据成功',
            data: result
        })
    })
}

exports.update_article_handler = (req, res) => {

    console.log(req.body);
        const sql = 'update ev_article set ? where id = ?'
        // 添加分类
        db.query(sql, [req.body, req.body.id], (err, result) => {
            if (err) {
                return req.cc(err.message)
            }
            if (result.affectedRows !== 1) {
                req.cc('修改分类失败')
            }

            req.cc('修改分类成功', 0)

        })
}
