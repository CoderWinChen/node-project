const jwt = require("express-jwt");
const db = require("../db");
const bcrypt = require('bcryptjs');
const config = require("../config");

module.exports.getUserInfo_handler = (req, res) => {
    // 验证权限，通过往header传入Authorization
    // 根据id获取用户信息，这里id是从express-jwt解析拿到的对象，在登录成功之后存入了用户信息，通过req.user可以获取得到
    console.log(req.user);
    // 这里不使用*，因为密码不需要查
    const userInfoSQL = 'select id,username,nickname,email,user_pic from ev_user where id = ?'
    db.query(userInfoSQL, [req.user.id], (err, result) => {
        if (err) {
            return res.cc(err)
        }
        console.log(result);
        if (result.length !== 1) {
            return res.cc('获取用户信息失败')
        }
        res.send({
            status: 0,
            msg: '获取用户信息成功',
            data: result[0]
        })
    })
}

// 更新用户信息
module.exports.updateUserInfo_handler = (req, res) => {
    const updateSQL = 'update ev_user set ? where id = ?'
    db.query(updateSQL, [req.body, req.body.id], (err, result) => {
        if (err) {
            return res.cc(err)
        }
        if (result.affectedRows !== 1) {
            return res.cc('修改用户信息失败')
        }
        res.send('修改成功', 0)
    })
}

module.exports.repassword_handler = (req, res) => {
    console.log(req.user);
    // 根据id查询用户
    let sql = 'select * from ev_user where id = ?'
    db.query(sql, req.user.id, (err, result) => {

        if (err) {
            return res.cc(err.message)
        }

        // 查不到
        if (result.length != 1) {
            return res.cc('查询用户失败')
        }

        console.log(result[0]);

        // 查得到，查用户输入的旧密码是否和数据库旧密码一致，查得到则可以将新密码插入
        const flag = bcrypt.compareSync(req.body.oldPwd, result[0].password)
        if (!flag) {
            return res.cc('旧密码错误')
        }

        // 旧密码验证成功，修改密码
        // 修改密码之前需要对新密码进行加密处理
        const newPwd = bcrypt.hashSync(req.body.newPwd, 10);
        sql = 'update ev_user set password = ? where id = ?'
        db.query(sql, [newPwd, req.user.id], (err, result) => {
            if (err) {
                return res.cc(err.message)
            }
            if (result.affectedRows != 1) {
                return res.cc('密码修改失败')
            }
            res.cc('密码修改成功', 0)
        })

    })
}

// 修改用户头像处理函数
exports.avatar_handler = (req, res) => {
    // 修改数据库中用户头像
    const sql = 'update ev_user set user_pic = ? where id = ?'
    db.query(sql, [req.body.avatar, req.user.id], (err, result) => {
        if (err) {
            return res.cc(err.message)
        }
        if (result.affectedRows !== 1) {
            res.cc('修改用户头像失败')
        }
        res.cc('用户头像修改成功', 0)
    })
}