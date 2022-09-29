const myParser = require('./myParser')
const express = require('express');

const app = express();
app.use(myParser)
app.post('/demo',(req,res)=>{
    console.log(req.body);
    res.send('demo')
})

// 调用app.listen方法，在指定的3000端口启动web服务器;
app.listen(3000, () => {
    console.log('Express server running at http://127.0.0.1:3000');
})