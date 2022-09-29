// fs操作文件系统模块
// 第一步：导入fs系统文件模块
const fs = require('fs')

/* 第一个参数：
    文件路径
第二个参数：
    字符集
第三个参数：
    回调函数
        err：读取成功，返回null，读取失败，返回错误信息
        data：读取成功，返回data，读取失败，返回null */

fs.readFile('./hello.txt', 'utf8',function (err,data) {
    if (err){
        return console.log('读取文件失败：\n'+err);
    }
    
    console.log('读取文件成功：\n'+data);
})