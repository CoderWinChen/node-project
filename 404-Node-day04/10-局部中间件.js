// 导入express模块;
const express = require('express');
// 创建express的服务器实例;
const app = express();

// 定义中间件函数
const mv1 = (req,res,next)=>{
    console.log('局部中间件被调用了');
    next()
}

// mv1中间件只在这个路由有效
app.get('/',mv1,(req,res)=>{
    res.send('Home Page!')
})

app.get('/user',(req,res)=>{
    res.send('User Page!')
})

// 调用app.listen方法，在指定的3000端口启动web服务器;
app.listen(3000, () => {
    console.log('Express server running at http:127.0.0.1:3000');
})