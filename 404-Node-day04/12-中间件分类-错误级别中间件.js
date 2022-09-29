const express = require('express')
const app = express()

app.get('/',(req,res)=>{
    throw new Error('服务器错误')
    res.send('Home Page!') //发生错误后无法执行后续代码
})
app.get('/user',(req,res)=>{
    console.log('User GET!');
})

// 错误级别中间件，必须写在所有路由之后，才能捕获异常
app.use((err,req,res,next)=>{
    console.log('错误信息：'+err);
    res.send(`错误信息：${err}`)
})

app.listen(80,()=>{
    console.log('server running at http://localhost');
})