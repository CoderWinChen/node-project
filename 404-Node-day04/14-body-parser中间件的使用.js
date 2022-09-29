// 导入express模块;
const express = require('express');
const bodyParser = require('body-parser')
// 创建express的服务器实例;
const app = express();

app.use(bodyParser.urlencoded({extended:false}))

app.post('/hello',(req,res)=>{
    console.log(req.body); //没有配置解析中间件，拿到的就是undefined
    res.send('ok')
})

// 调用app.listen方法，在指定的3000端口启动web服务器;
app.listen(3000, () => {
    console.log('Express server running at http://127.0.0.1:3000');
})