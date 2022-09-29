const express = require('express')
const moment = require('moment')
const app = express()

app.use((req,res,next)=>{
    // 中间件作用：统一处理，共享资源，节省代码
    req.startTime = moment().format('YYYY-MM-DD HH:mm:ss') //在中间件的req对象设置一个自定义属性为startTime,
    // 在其他中间件和路由中的req也是和这个中间件的req对象是一样的，所以可以共享
    next()
})
app.get('/user',(req,res)=>{
    res.send(`User GET!=>${req.startTime}`) //这里路由的req和中间件的req是同一个对象
})

app.get('/hero', (req, res) => {
    res.send(`User GET!=>${req.startTime}`) //这里路由的req和中间件的req是同一个对象
})
app.listen(80,()=>{
    console.log('server running at http://localhost');
})