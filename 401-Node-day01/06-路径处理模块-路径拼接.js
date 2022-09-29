const path = require('path')
const fs = require('fs')

// ../会抵消上一层路径
let paths = path.join('D:', '/011-Study','/1011-前端学习','/abc','../')
console.log(paths);

console.log('-----');
paths = path.join(__dirname,'./hello.txt')
console.log(paths);

fs.readFile(path.join(__dirname,'./hello.txt'),'utf-8',function(err,data){
    if (err) {
        return console.log('文件读取失败:\n',err);
    }
    console.log('文件读取成功：\n',data);
})