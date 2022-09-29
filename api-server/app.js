const express = require('express')
const Joi = require('joi')
const userRouter = require('./router/user')
const expressJwt = require('express-jwt') //中间件，解密
const { secretKey } = require('./config')
const userInfoRouter = require('./router/userInfo')
const cateRouter = require('./router/cates')
const articleRouter = require('./router/article')
const app = express()
app.use(express.urlencoded({ extended: false }))


app.use((req, res, next) => {
    req.cc = (msg, status = 1) => {
        res.send({
            status,
            msg: msg instanceof Error ? msg.message : msg
        })
    }
    next()
})
// 注意要写在全局中间件之后
app.use(expressJwt({ secret: secretKey }).unless({
    path: [/^\/api/]
}))
app.use('/api', userRouter)
app.use('/my', userInfoRouter)
app.use('/my/article', cateRouter)
app.use('/my/article', articleRouter)
// 全局错误中间件
app.use((err, req, res, next) => {
    if (err instanceof Joi.ValidationError) {
        return req.cc(err)
    }
    if (err.name === 'UnauthorizedError') {
        return req.cc('验证失败')
    }
    req.cc(err)
})

app.listen(8080, () => {
    console.log('server running at: http://localhost:8080');
})