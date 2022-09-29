const session = require('express-session')
const cors = require('cors')
const express = require('express') //导入session模块
const { json } = require('body-parser')
const { urlencoded } = require('express')
// 
const app = express()
// app.use(cors())
app.use(express.static('./public'))
// app.use(express.json())
app.use(express.urlencoded({
    extended:false
}))
app.use(session({
    secret: 'sztu',
    resave: false,
    saveUninitialized: true
})) //注册session中间件

// 登录接口
app.post('/api/login', (req, res) => {
    const user = req.body;
    if (user.username !== 'admin' || user.password !== 'admin') {
        return res.send({
            code: 1,
            msg: '登录失败'
        })
    }

    // 登录成功，向session存入数据
    req.session.user = user
    req.session.isLogin = true
    res.send({
        code: 0,
        msg: '登录成功'
    })
})

//获取数据接口【验证身份】
app.get('/api/getMessage', (req, res) => {
    console.log(req.session);
    if (!req.session.isLogin) {
        return res.send({
            code: 1,
            msg: '身份认证失败'
        })
    }

    res.send({
        code: 0,
        msg: '身份认证成功',
        username: req.session.user.username
    })
})

// 退出登录
app.get('/api/logout', (req, res) => {
    req.session.destroy()
    res.send({
        code: 0,
        msg: '退出登录成功'
    })
})


app.listen(80, () => {
    console.log('server running at http://localhost');
})