const express = require('express')
const router = require('./06-router')
const app = express()
// 在use方法里面加上了/api这个路由前缀，那么访问路由的时候就必须带上/api
app.use('/api', router)
app.listen(80, () => {
    console.log('server running at http://localhost');
})