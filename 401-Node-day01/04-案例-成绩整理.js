const fs = require('fs')
fs.readFile('./04-成绩.txt', 'utf-8', function (err, data) {
    if (err) {
        return console.log('文件读取失败:\n', err);
    }
    data = data.split(' '); //按照空格分隔
    let newData = []
    data.forEach(item=>{
        newData.push(item.replace('=',':'))
    })
    newData = newData.join('\r\n') // \r是回车，\n是换行
    fs.writeFile('./04-成绩-ok.txt',newData,function(err){
        if (err){
            return console.log('文件写入失败:\n',err);
        }
        console.log('文件写入成功');
    })
})