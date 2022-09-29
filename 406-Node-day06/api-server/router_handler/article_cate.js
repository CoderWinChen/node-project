const expressJoi = require("@escook/express-joi")
const db = require("../db")

// 查询文章分类的处理函数
exports.getArticleCates_handle = (req, res) => {
    // 查询所有没有被删除的文字，并按照id升序排序
    const sql = 'select * from ev_article_cates where is_delete = 0 order by id asc'
    db.query(sql, (err, result) => {
        if (err) {
            return res.cc(err)
        }
        res.send({
            status: 0,
            msg: '文字分类查询成功',
            data: result
        })
    })
}


exports.addCates_handle = (req, res) => {
    // 文章名称和别名查重，为了确保文章名和别名的唯一性
    const sql = 'select * from ev_article_cates where name = ? or alias = ?'
    db.query(sql, [req.body.name, req.body.alias], (err, result) => {

        if (err) {
            return res.cc(err.message)
        }
        // SQL查询成功
        // 分类名和别名查重：三种情况

        if (result.length === 1 && req.body.alias === result[0].alias && req.body.name === result[0].name) {
            return res.cc('分类名和分类别名都被占用，请修改后重试!')
        }
        if (result.length === 1 && req.body.name === result[0].name) {
            return res.cc('分类名已被占用，请修改后重试!')
        }
        if (result.length === 1 && req.body.alias === result[0].alias) {
            return res.cc('分类别名已被占用，请修改后重试!')
        }


        // 上面的功能已经对分类名和别名进行了查重处理，确保了分类名和别名的唯一性，所以插入的数据不可能和数据库的一样
        const sql = 'insert into ev_article_cates set ?'
        console.log(req.body);
        db.query(sql, req.body, (err, result) => {
            console.log(result);
            if (err) {
                return res.cc(err.message)
            }
            if (result.affectedRows !== 1) {
                return res.cc('分类插入失败')
            }
            res.cc('分类插入成功', 0)
        })
    })
}

// 根据id删除分类处理函数
exports.delete_cates_handle = (req, res) => {
    // 采用标记删除
    const sql = 'update ev_article_cates set is_delete = 1 where id = ?'
    db.query(sql, req.params.id, (err, result) => {
        if (err) {
            return res.cc(err.message)
        }
        if (result.affectedRows !== 1) {
            return res.cc('文章删除失败')
        }
        res.cc('文章删除成功')
    })
}

exports.catesById_handle = (req, res) => {
    // 根据id查询分类数据
    const sql = 'select * from ev_article_cates where id = ? and is_delete != 1'
    db.query(sql, req.params.id, (err, result) => {
        if (err) {
            return res.cc(err.message)
        }
        if (result.length !== 1) {
            res.cc('分类数据查询失败')
        }
        res.send({
            status: 0,
            msg: '查询分类数据成功',
            data: result[0]
        })
    })
}

exports.updateCates_handle = (req, res) => {
    // if (err) {
    //     return res.cc(err.message)
    // }
    // 数据库查重，更新的字段不能在数据库中存在
    const sql = 'select * from ev_article_cates where id !=? and (name = ? or alias = ?)'
    db.query(sql, [req.body.id, req.body.name, req.body.alias], (err, result) => {
        if (err) {
            return res.cc(err.message)
        }
        if (result.length === 1 && result[0].name === req.body.name && result[0].alias === req.body.alias) {
            return res.cc('分类名和别名已被占用')
        }
        if (result.length === 1 && result[0].name === req.body.name) {
            return res.cc('分类名已被占用')
        }
        if (result.length === 1 && result[0].alias === req.body.alias) {
            return res.cc('别名已被占用')
        }
        // 没被占用，则更新该用户的分类名和别名
        const sql = 'update ev_article_cates set ? where id = ?'
        db.query(sql, [req.body, req.body.id], (err, result) => {
            if (err) {
                return res.cc(err.message)
            }
            if (result.affectedRows !== 1) {
                return res.cc('分类信息修改失败')
            }
            res.cc('分类信息修改成功', 0)
        })
    })
}