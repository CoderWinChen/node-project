// 导入模块
const express = require('express')
const cors = require('cors')
const router = require('./router')
const joi = require('joi')
const app = express()
// 配置中间件
app.use(cors())
// 解析post表单
app.use(express.urlencoded({
    extended: false
}))
// 注意：必须写在路由之前,作为统一处理响应结果的中间件，封装挂载一个result()函数
app.use((req, res, next) => {
    req.result = (err, status = 1) => {
        if (err instanceof Error) {
            return res.send({
                status,
                msg: err.message
            })
        }
        res.send(
            {
                status,
                msg: err
            }
        )
    }
    next()
})
app.use('/api', router) //配置路由

// 错误级别中间件
app.use((err, req, res, next) => {
    // 数据验证失败的错误
    if (err instanceof joi.ValidationError) {
       return req.result(err)
    }
    // 服务器异常错误
    req.result(err)
    next()
})
app.listen(3000, () => {
    console.log('server running at http://localhost:3000');
})