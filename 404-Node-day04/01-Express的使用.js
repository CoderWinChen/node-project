// 导入express
const express = require('express')
// 创建web服务器
const app = express()

// 监听客户端的GET和POST请求，并响应内容
app.get('/', (req, res) => {
    res.send('Hello')
})

app.post('/hi', (req, res) => {
    res.send('你好呀,aaa')
})

app.get('/user',(req,res)=>{
    // 获取URL中传递的参数【查询字符串：?key1=value1&key2=value2】
    console.log(req.query);
    res.send(req.query)
})


app.get('/user/:id',(req,res)=>{
    console.log(req.params);
    // 使用req.params动态获取参数
    res.send(req.params)
})

// 可以接收多个动态参数名
app.get('/user/:username/:password',(req,res)=>{
    console.log(req.params);
    res.send(req.params)
})

// 启动web服务器，并监听80端口
app.listen(80,()=>{
    console.log('server running at http://localhost');
})


