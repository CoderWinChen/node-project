// 导入模块
const express = require('express')
const cors = require('cors')
const userRouter = require('./router/user')
const joi = require('joi')
const config = require('./config')
const expressJWT = require('express-jwt')
const userInfoRouter = require('./router/userInfo')
const articleCateRouter = require('./router/article_cate')
const articleRouter = require('./router/article')
const app = express()
// 配置中间件
app.use(cors())
// 解析post表单
app.use(express.urlencoded({
    extended: false
}))

// 注意：必须写在路由之前,作为统一处理响应结果的中间件，封装挂载一个cc()函数
app.use((req, res, next) => {
    res.cc = function (err, status = 1) {
        res.send(
            {
                status,
                msg: err instanceof Error ? err.message : err
            }
        )
    }
    next()
})
// 传递密钥，调用unless()：哪些接口路径不需要验证，req.user拿到token
app.use(expressJWT({ secret: config.secertKey }).unless({ path: [/^\/api/] }))
app.use('/api', userRouter) //配置用户登录注册路由
app.use('/my', userInfoRouter) //配置用户个人中心路由
app.use('/my/cates', articleCateRouter) //配置文章分类路由
app.use('/my/article',articleRouter) //配置文章路由
app.use('/uploads', express.static('/uploads'))
// 错误级别中间件
app.use((err, req, res, next) => {
    // 数据验证失败的错误
    if (err instanceof joi.ValidationError) {
        return res.cc(err)
    }
    if (err.name === 'UnauthorizedError') {
        return res.cc('验证失败')
    }
    // 服务器异常错误
    res.cc(err)
})
app.listen(3000, () => {
    console.log('server running at http://localhost:3000');
})