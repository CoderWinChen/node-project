const express = require('express')
const app = express()
// 定义中间件函数
// let mw = (req, res, next) => {
//     console.log('这是一个最简单的中间件函数');
//     next() //交给下一个中间件或者路由
// }
// app.use(mw); //注册全局生效的中间件


// 全局中间件的简化写法
app.use((req,res,next)=>{
    console.log('这是一个最简单的中间件函数');
    next()
})

// 当用户请求/user的时候，在这之前会调用mv中间件，执行代码后，转交给路由，再执行/user的处理函数
app.get('/user', (req, res) => {
    console.log('/user路由被调用了');
    res.send('user Get！')
})

app.get('/hero', (req, res) => {
    console.log('/hero 路由被调用了');
    res.send('hero Get！')
})

app.listen(80, () => {
    console.log('server running at http://localhost');
})