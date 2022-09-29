// 这个模块是专门用来存放路由处理函数的
const db = require('../db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')
const salt = bcrypt.genSaltSync(10)
// let secertKey = "sztu chenchen = v =" //修改为从全局配置文件中导入，方便共享多个文件共享变量
module.exports.register = (req, res) => {

    // 不使用if……else进行表单验证，使用第三方中间件进行验证

    const userInfo = req.body;

    // 2. 用户名查重
    let registerSql = "select * from ev_user where username = ?";
    db.query(registerSql, [userInfo.username], (err, result) => {
        if (err) {
            return res.cc(err)
        }
        if (result.length > 0) {
            return res.cc('用户名已被注册')
        }
        // 调用hashSync(明文密码，随机盐的长度)对密码进行加密处理
        userInfo.password = bcrypt.hashSync(userInfo.password, salt);
        console.log(userInfo.password);
        // 插入数据库
        let addUserSql = "insert into ev_user set ?"
        console.log(userInfo.username);
        // 注意：这里传递的是对象，对象才能和?进行匹配，而只需要插入用户名和密码，其他的默认
        db.query(addUserSql, { username: userInfo.username, password: userInfo.password }, (err, result) => {

            if (err) {
                return res.cc(err)
            }
            console.log(result);
            if (result.affectedRows >= 1) {
                return res.cc('添加用户成功', 0)
            }

        })
    })


}

// 注册处理函数
module.exports.login = (req, res) => {
    // 1. 通过中间件的形式进行了表单验证

    // 2.获取用户传递的信息
    const userInfo = req.body;

    // // 3.根据用户名查询数据，查得到说明有这个用户
    const loginSql = 'select * from ev_user where username = ?'
    db.query(loginSql, userInfo.username, (err, result) => {
        if (err) {
            return res.cc(err.message)
        }
        if (result.length !== 1) {
            return res.cc('登录失败，用户名不存在')
        }

        // 用户名存在，拿密码进行比对
        //4. 如果有该用户名，则调用bcryptjs中的compareSync(用户提交的字符串，数据库中的密码)
        const flag = bcrypt.compareSync(userInfo.password, result[0].password)
        if (!flag) {
            return res.cc('登录失败，密码错误')
        }

        // 密码也正确，登录成功
        // 5.验证成功，生成jwt字符串
        const user = { ...result[0], password: '', user_pic: '' } //ES6写法，解构赋值，将后面的替换到前面的属性
        // console.log(user);
        const tokenStr = jwt.sign(user, config.secertKey, { expiresIn: config.expiresIn })

        res.send({
            status: 0,
            msg: '登录成功',
            // 修改为从全局配置文件中导入，加上Bearer，方便开发者复制
            token: 'Bearer ' + tokenStr
        })

    })
}