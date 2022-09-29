const http = require('http')
let server = http.createServer()
server.on('request',(req,res)=>{
    res.setHeader('Content-Type','text/plain;charset=utf-8') //解决中文乱码问题
    const str = `你请求的url是${req.url},请求的方法类型是${req.method}`
    res.end(str) //响应给客户端的信息
})
server.listen(9000,()=>{
    console.log('server running at http://localhost:9000');
})