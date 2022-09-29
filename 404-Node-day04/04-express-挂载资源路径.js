const express = require('express')
const app = express()
// 在use方法里面传递路径,表示该路径映射该文件夹
app.use('/files', express.static('./files')) //abc路径映射files文件夹
app.use(express.static('./clock'))
app.listen(9000, () => {
    console.log('server running at http://localhost:9000');
})