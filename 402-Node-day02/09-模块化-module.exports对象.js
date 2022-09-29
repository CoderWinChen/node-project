// 向外暴露一个对象
module.exports = {
    username:'张三'
}
// 向外暴露一个变量
module.exports.age = 23
// 向外暴露一个方法
module.exports.sayHello = function(){
    console.log('hello!');
}
