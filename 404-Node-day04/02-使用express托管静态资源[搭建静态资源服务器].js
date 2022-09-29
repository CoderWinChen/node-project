const express = require('express')
const app = express()
// express.static()托管静态资源，但是访问的时候不包括clock目录，直接输入该目录下的文件即可
app.use(express.static('clock'))
app.listen(3000,()=>{
    console.log('server running at http://localhost:3000');
})