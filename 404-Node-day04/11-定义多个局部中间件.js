const express = require('express');
const app = express();
// 定义中间件函数
const mv1 = (req, res, next) => {
    console.log('第一个局部中间件被调用了');
    next()
}
const mv2 = (req, res, next) => {
    console.log('第二个局部中间件被调用了');
    next()
}

// mv1中间件和mv2中间件只在这个路由有效
app.get('/', mv1, mv2,(req, res) => {
    res.send('Home Page!')
})

app.get('/user', (req, res) => {
    res.send('User Page!')
})

// 调用app.listen方法，在指定的3000端口启动web服务器;
app.listen(3000, () => {
    console.log('Express server running at http:127.0.0.1:3000');
})