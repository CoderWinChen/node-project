const express = require('express')
const expressJWT = require('express-jwt') //还原jwt的中间件
const router = require('./router')


const app = express()
app.use(express.urlencoded({
    extended: false
}))

// path指定哪些接口不需要访问权限
app.use(expressJWT({ secret: router.secretKey }).unless({ path: [/^\/api\//] }))
app.use('/api', router.router) //注册路由中间件

// 请求权限接口
app.get('/admin/getInfo', (req, res) => {
    res.send({
        status: 0,
        msg:'身份验证成功',
        username: req.user.username
    })
})

// 错误级别中间件，捕获异常
app.use((err,req,res,next)=>{
    if (err){
        console.log(err.message);
        res.send('鉴权失败')
        next()
    }
})
app.listen(8000, () => {
    console.log('server running at http://localhost:8000');
})