const db = require("../db")

// 文章分类处理函数
exports.list_cates_handler = (req, res) => {
    // 查询文章分类数据
    const sql = 'select * from ev_article_cates where is_delete=0 order by id asc'
    db.query(sql, (err, result) => {
        if (err) {
            req.cc(err.message)
        }
        res.send({
            status: 0,
            msg: '查询分类数据成功',
            data: result
        })
    })
}

exports.add_cates_handler = (req, res) => {
    // 添加分类前要查重
    const sql = 'select * from ev_article_cates where name = ? or alias = ?'
    db.query(sql, [req.body.name, req.body.alias], (err, result) => {
        if (err) {
            return req.cc(err.message)
        }
        if (result.length === 1 && req.body.name === result[0].name && req.body.alias === result[0].alias) {
            return req.cc('分类名和别名都已经被占用')
        }
        if (result.length === 1 && req.body.name === result[0].name) {
            return req.cc('分类名已经被占用')
        }
        if (result.length === 1 && req.body.alias === result[0].alias) {
            return req.cc('别名已经被占用')
        }
        const sql = 'insert into ev_article_cates set ? '
        // 添加分类
        db.query(sql, req.body, (err, result) => {
            if (err) {
                return req.cc(err.message)
            }
            if (result.affectedRows !== 1) {
                req.cc('添加分类失败')
            }

            req.cc('添加分类成功', 0)

        })
    })

}

exports.del_cates_handler = (req, res) => {
    // 标记删除
    const sql = 'update ev_article_cates set is_delete = 1 where id = ?'
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

exports.get_cates_handler = (req, res) => {
    const sql = 'select * from ev_article_cates where id = ?'
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

exports.update_cates_handler = (req, res) => {

    // 添加分类前要查重
    const sql = 'select * from ev_article_cates where name = ? or alias = ?'
    db.query(sql, [req.body.name, req.body.alias], (err, result) => {
        if (err) {
            return req.cc(err.message)
        }
        if (result.length === 1 && req.body.name === result[0].name && req.body.alias === result[0].alias) {
            return req.cc('分类名和别名都已经被占用')
        }
        if (result.length === 1 && req.body.name === result[0].name) {
            return req.cc('分类名已经被占用')
        }
        if (result.length === 1 && req.body.alias === result[0].alias) {
            return req.cc('别名已经被占用')
        }
        console.log(req.body);
        const sql = 'update ev_article_cates set ? where id = ?'
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
    })
}
