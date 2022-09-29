const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken') //解析jwt的中间件
let secretKey = "sztu cyf QvQ"
router.post('/login', (req, res) => {
    if (req.body.username != 'admin' || req.body.password != '6666') {
        return res.send({
            status: 1,
            msg: '登录失败'
        })
    }
    // 三个参数:
    let token = jwt.sign(
        {
            username: req.body.username
        },
        secretKey,
        { expiresIn: '60s' }
    )
    res.send({
        status: 0,
        msg: '登录成功',
        token: token
    })

})

module.exports = { router, secretKey }