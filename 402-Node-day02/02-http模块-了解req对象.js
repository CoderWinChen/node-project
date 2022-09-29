const http = require('http')
let server = http.createServer()
server.on('request',(req,resp)=>{
    const url = req.url;
    const method = req.method;
    console.log(`the vister's url is ${url},request method is ${method}`);
})
server.listen(8080,()=>{
    console.log('server running at http://localhost:8080');
})