console.log(module.exports === exports);
// exports对象和module.exports一样，简化写法
exports.user = {
    username: '张三',
    age:23,
    sayHello:function(){
        console.log('你好呀');
    }
}