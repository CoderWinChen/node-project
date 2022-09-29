const express = require('express')
const router = express.Router()
router.get('/user', (req, res) => {
    let query = req.query
    console.log(req.query);
    res.send({
        code: 0,
        msg: 'success',
        data: query
    })
})

router.post('/user', (req, res) => {
    let body = req.body
    res.send({
        code: 0,
        msg: 'success',
        data: body
    })
})

router.delete('/user', (req, res) => {
    res.send({
        code: 0,
        msg: 'success'
    })
})

module.exports = router;