// 1. 导入http模块
const http = require('http')
// 2. 创建web服务器实例
const server = http.createServer()
// 3. 监听request事件，可以监听客户端
server.on('request',(req,resp)=>{
    console.log('someone visit server');
})
// 4. 启动服务器，分配一个80端口
server.listen(80,()=>{
    console.log('server running at http://localhost');
})