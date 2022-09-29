const db = require('../db')
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)
// 这个模块是专门用来存放路由处理函数的
module.exports.register = (req, res) => {

    // 不使用if……else进行表单验证，使用第三方中间件进行验证

    const userInfo = req.body;
    // 1. 验证用户名和密码是否为空
    // if (!userInfo.username || !userInfo.password) {
        // return res.send({
        //     code: 1,
        //     msg: '用户名或密码不能为空'
        // })

    //     return req.result('用户名或密码不能为空')
    // }
    // 2. 用户名查重
    let registerSql = "select * from ev_user where username = ?";
    db.query(registerSql, [userInfo.username], (err, result) => {
        if (err) {
            // return res.send({
            //     code: 1,
            //     msg: err.message
            // })
            return req.result(err)
        }
        if (result.length > 0) {
            // return res.send({
            //     code: 1,
            //     msg: '用户名已被注册'
            // })
            return req.result('用户名已被注册')
        }
        // 调用hashSync(明文密码，随机盐的长度)对密码进行加密处理
        userInfo.password = bcrypt.hashSync(userInfo.password, salt);
        console.log(userInfo.password);
        // 插入数据库
        let addUserSql = "insert into ev_user set ?"
        console.log(userInfo.username);
        // 注意：这里传递的是对象，对象才能和?进行匹配，而只需要插入用户名和密码，其他的默认
        db.query(addUserSql, { username: userInfo.username, password:userInfo.password}, (err, result) => {
        
            if (err) {
                // return res.send({
                //     code: 1,
                //     msg: err.message
                // })
                return req.result(err)
                
            }
            console.log(result);
            if (result.affectedRows >= 1) {
                // res.send({
                //     code: 0,
                //     msg: '添加用户成功'
                // })
                return req.result('添加用户成功',0)
            }

        })
    })


}

module.exports.login = (req, res) => {
    const userInfo = req.body;
    if (!userInfo.username || !userInfo.password) {
        return res.send({
            code: 1,
            msg: '用户名或密码不能为空'
        })
    }

    // 调用hashSync(明文密码，随机盐的长度)对密码进行加密处理
    userInfo.password = bcrypt.hashSync(userInfo.password, 10);
    // 用户名和密码验证
    // if (userInfo.username === '')
}