const path = require('path')
// 获取文件名+拓展名
let basename = path.basename(path.join(__dirname,'./hello.txt')) //hello.txt
// 获取文件名【不带拓展名】
let basename2 = path.basename(path.join(__dirname,'./hello.txt'),'.txt') //hello
console.log(basename); 
console.log(basename2); 


// 获取拓展名
let fullPathName = 'D://newWork//index.html'
let exeName = path.extname(fullPathName)
console.log(exeName); //.html