// 这是路由模块化文件

// 1. 导入express模块
const express = require('express')
// 2. 创建路由对象
const router = express.Router()
// 3. 挂载具体路由
router.get('/user/list', (req, res) => {
    res.send('users info get success！')
})

router.post('/user/add', (req, res) => {
    res.send('add user success！')
})
// 4. 向外暴露路由对象
module.exports = router