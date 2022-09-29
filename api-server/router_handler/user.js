const db = require("../db")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken') //生成密钥
const { secretKey, expiresIn } = require('../config')
module.exports.user_login_handler = (req, res) => {
    // 登录功能
    // 登录需要加密后的密码

    // 1.根据用户名查询数据库
    const sql = 'select * from ev_user where username = ?'
    db.query(sql, req.body.username, (err, result) => {
        if (err) {
            return req.cc(err.message)
        }
        // console.log(result);
        // 2. 表单的密码和数据库密码进行比较
        const flag = bcrypt.compareSync(req.body.password, result[0].password)
        if (!flag) {
            return req.cc('密码错误，请重新输入')
        }
        // 登录成功，使用jwt生成token并返回给客户端
        const userInfo = {
            ...result[0],
            password: '',
            user_pic: ''
        }
    
        const jwt_token = jwt.sign(userInfo, secretKey, { expiresIn: expiresIn })
        res.send({
            status: 0,
            msg: '登陆成功',
            token: 'Bearer ' + jwt_token
        })
    })

}

// 注册业务
module.exports.user_register = (req, res) => {
    // 注册功能
    // 1.用户名查重
    const sql = 'select * from ev_user where username = ?'
    db.query(sql, req.body.username, (err, result) => {
        if (err) {
            return req.cc(err.message)
        }
        if (result.length > 0) {
            return req.cc('用户名已被注册，请更换用户名')
        }
        //2. 注册之前对密码进行加密
        userInfo = {
            ...req.body,
            password: bcrypt.hashSync(req.body.password, 10)
        }
        const sql = 'insert into ev_user set ?'
        db.query(sql, userInfo, (err, result) => {
            if (err) {
                return req.cc(err.message)
            }
            if (result.affectedRows !== 1) {
                return req.cc('注册用户失败')
            }
            req.cc('注册用户成功')
        })
    })
}