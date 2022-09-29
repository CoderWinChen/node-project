const express = require('express')
const app = express()
// 定义第1个全局中间件
app.use((req, res, next) => {
    console.log('调用了第1个全局中间件');
    next()
})
// 定义第2个全局中间件
app.use((req, res, next) => {
    console.log('调用了第2个全局中间件');
    next()
})

app.get('/user', (req, res) => {
    res.send('User GET！')
})
app.listen(80, () => {
    console.log('server running at http://localhost');
})