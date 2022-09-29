const qs = require('querystring')
let str = ''
const myParser = (req, res, next) => {
        // 第二步：监听data方法，获取客户端发来的数据
        req.on('data', (chunk) => {
            // 这里的chunk拿到的就是客户端发来的数据，但不是一次性拿到
            str += chunk;
        })

        // 第三步：监听end方法，执行获取数据结束后函数
        req.on('end', () => {
            let body = qs.parse(str)
            req.body = body;
            next()
        })
    }

module.exports = myParser