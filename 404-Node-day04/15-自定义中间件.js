// 需求：自定义一个中间件，实现express.urlencoded()中间件的功能，能够解析post请求的数据
const express = require('express')
const qs = require('querystring')
let str = ''
const app = express()

// 将全局中间件拆分出去即可
app.use((req, res, next) => {
    // 第二步：监听data方法，获取客户端发来的数据
    req.on('data', (chunk) => {
        // 这里的chunk拿到的就是客户端发来的数据，但不是一次性拿到
        str += chunk;
    })

    // 第三步：监听end方法，执行获取数据结束后函数
    req.on('end', () => {
        let body = qs.parse(str)
        req.body = body;
        next()
    })
})

app.post('/user', (req, res) => {
    console.log(req.body);
    res.send('ok')
})
app.listen(80, () => {
    console.log('server running at http://localhost');
})