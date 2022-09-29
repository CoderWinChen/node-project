const express = require('express')
const app = express()
// 托管多个静态资源，只需要写两次即可，但是有先后顺序之分，写在前面的会先加载该目录下的index.html文件
app.use(express.static('./files')) 
app.use(express.static('./clock')) 
app.listen(9000,()=>{
    console.log('server running at http://localhost:9000');
})