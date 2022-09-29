const http = require('http')
const fs = require('fs')
const path = require('path')
let server = http.createServer()

server.on('request',(req,res)=>{
    // 需求：将时钟案例通过web服务器访问

    // 1. 获取url，根据url对应本地磁盘目录
    let url = req.url;
    // 2. /clock/index.html对应clock目录下的index文件，读取该文件，将该文件的内容响应到浏览器中
    let fullPath = ''
    if (url === '/') {
        fullPath = path.join(__dirname, '/clock/index.html')
    }

    else {
        fullPath = path.join(__dirname, '/clock',url)
    }
    console.log('---',fullPath);
    fs.readFile(fullPath, 'utf-8', (err, data) => {
        
        if (err) {
            return res.end('404 Not Found')
        }
        res.end(data)
    })
    
    
})
server.listen(9000,()=>{
    console.log('server running at http://localhost:9000');
})
