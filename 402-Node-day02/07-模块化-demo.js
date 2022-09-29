const test = require('./07-模块化-模块作用域的好处') //引入就会执行该文件
console.log(test.username); //但是拿不到07的代码中的变量【因为有模块作用域】