const db = require("../db")
const bcrypt = require("bcryptjs")
const { secertKey } = require("../../406-Node-day06/api-server/config")

exports.getUserInfo_handler = (req, res) => {
    // 获取用户信息
    const sql = 'select id,username,nickname,email,user_pic from ev_user where id = ?'
    db.query(sql, req.user.id, (err, result) => {
        if (err) {
            return req.cc(err.message)
        }
        if (result.length !== 1) {
            return req.cc('获取用户信息失败')
        }
        res.send({
            status: 0,
            msg: '获取用户信息成功',
            data: result[0]
        })
    })
}

// 更新用户信息
exports.updateUserInfo_handler = (req, res) => {
    //昵称和邮箱查重
    const sql = 'select * from ev_user where nickname = ? or email = ?'
    db.query(sql, [req.body.nickname, req.body.email], (err, result) => {
        if (err) {
            return req.cc(err.message)
        }
        if (result.length === 1 && result[0].nickname === req.body.nickname && result[0].email === req.body.email) {
            return req.cc('昵称和邮箱已被占用')
        }
        if (result.length === 1 && result[0].nickname === req.body.nickname) {
            return req.cc('昵称已被占用，请更换昵称')
        }
        if (result.length === 1 && result[0].email === req.body.email) {
            return req.cc('邮箱已被占用')
        }
        const sql = 'update ev_user set ? where id = ?'
        db.query(sql, [req.body, req.body.id], (err, result) => {
            if (err) {
                return req.cc(err.message)
            }
            if (result.affectedRows !== 1) {
                return req.cc('更新用户信息失败')
            }
            req.cc('修改用户信息成功', 0)
        })
    })
}

exports.rePwd_handler = (req, res) => {
    // 重置密码
    // 验证用户提交的新密码是否和数据库中的旧密码一致
    const sql = 'select * from ev_user where id = ?'

    db.query(sql, req.user.id, (err, result) => {
        if (err) {
            return req.cc(err.message)
        }
        console.log(result);

        if (result.length !== 1) {
            return req.cc('用户不存在')
        }

        const flag = bcrypt.compareSync(req.body.oldPwd, result[0].password)

        if (!flag) {
            return req.cc('旧密码错误')
        }

        // 旧密码验证，旧密码必须正确才能修改新密码
        const sql = 'update ev_user set password = ? where id = ?'
        // 新密码要加密在存进去
        req.body.newPwd = bcrypt.hashSync(req.body.newPwd, 10)
        db.query(sql, [req.body.newPwd, req.user.id], (err, result) => {
            if (err) {
                return req.cc(err.message)
            }
            if (result.affectedRows !== 1) {
                return req.cc('修改密码失败')
            }
            req.cc('重置密码成功', 0)
        })

    })
}

exports.updateAvatar_handler = (req, res) => {
    // 修改用户头像
    const sql = 'update ev_user set user_pic = ? where id = ?'
    db.query(sql, [req.body.avatar, req.user.id], (err, result) => {
        if (err) {
            return req.cc(err.message)
        }
        if (result.affectedRows !== 1) {
            return req.cc('修改头像失败')
        }
        req.cc('修改头像成功', 0)
    })
}