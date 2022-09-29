// 导入express模块;
const express = require('express');
// 创建express的服务器实例;
const app = express();
app.use(express.json()) //注册解析json格式的中间件，除了错误中间件，所有中间件都是写在路由之前
app.use(express.urlencoded({
    extended: false
})) //注册解析x-www-form-urlencoded格式的中间件，除了错误中间件，所有中间件都是写在路由之前

app.post('/user', (req, res) => {
    console.log(req.body); 
    // 所以没有请求体，拿到的数据为undefined【必须配置解析json的中间件才能拿到数据】
    res.send('ok')
})

app.post('/book', (req, res) => {
    // 必须配置urlencode中间件才能获取得到数据
    console.log(req.body);
    res.send('ok')
})

// 调用app.listen方法，在指定的3000端口启动web服务器;
app.listen(3000, () => {
    console.log('Express server running at http://127.0.0.1:3000');
})