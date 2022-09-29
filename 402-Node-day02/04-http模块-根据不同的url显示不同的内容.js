const http = require('http')
let server = http.createServer()
server.on('request',(req,res)=>{
    res.setHeader('Content-Type','text/html;charset=utf-8')
    let url = req.url;
    let content = '404 Not Found'
    if (url === '/' || url==='/index.html'){
        content = '这是首页'
    }
    else if (url === '/about.html'){
        content = '这是关于页面'
    }
    res.end(content)
})

server.listen(80,()=>{
    console.log('server running at http://localhost');
})