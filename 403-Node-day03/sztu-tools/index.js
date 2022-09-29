const date = require('./dateFormate')
const html = require('./htmlHandle')
module.exports = {
    ...date, //ES6写法，将date里面的所有成员展开
    ...html  //ES6写法，将date里面的所有成员展开
}