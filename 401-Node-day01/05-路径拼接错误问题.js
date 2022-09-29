const fs = require('fs')
// ./hello.txt是相对路径，会有路径拼接问题，使用绝对路径解决
// fs.readFile('./hello.txt','utf-8',function(err,data){
//     if (err) {
//         return console.log('文件读取失败:\n',err);
//     }
//     console.log(data);
// })

// 可移植性差
// fs.readFile('D:\\011-Study\\1011-前端学习\\0004-Node-代码练习\\401-Node-day01\\04-成绩-ok.txt', 'utf-8', function (err, data) {
//     if (err) {
//         return console.log('文件读取失败:\n', err);
//     }
//     console.log(data);
// })


console.log(__dirname);
fs.readFile(__dirname +'\\04-成绩-ok.txt', 'utf-8', function (err, data) {
    if (err) {
        return console.log('文件读取失败:\n', err);
    }
    console.log(data);
})
