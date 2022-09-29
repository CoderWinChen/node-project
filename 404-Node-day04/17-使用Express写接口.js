const express = require('express')
const cors = require('cors')
const apiRouter = require('./apiRouter')
const app = express()
// 配置解析中间件必须写在路由之前
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// 注意写JSONP的接口的时候，必须写在cors之前，不然会被解析为cors接口
app.get('/api/jsonp', (req, res) => {
    let callBackFunname = req.query.callback;
    console.log(callBackFunname);
    let data = {
        "name": "张三",
        "friend": "李四"
    }
    // 注意在服务器端调用客户端的回调函数，并以JSON的数据格式传递数据
    res.send(`${callBackFunname}(${JSON.stringify(data)})`)
    // 相当于res.send(
    // jQuery36005705560596572817_1661137495774({"name": "张三",
    // "friend": "李四"}))
})

// 注意中间件必须写在路由之前
app.use(cors()) //注册cors中间件解决跨域问题

app.use('/api', apiRouter)

app.listen(80, () => {
    console.log('server running at http://localhost');
})