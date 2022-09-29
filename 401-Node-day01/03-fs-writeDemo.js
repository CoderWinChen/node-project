const fs = require('fs')
for (let index = 0; index < 3; index++) {
    fs.writeFile('./write.txt', '你好呀123456', function (err) {
        // 写入成功，err返回null，写入失败err返回错误信息
        if (err) {
            return console.log('文件写入失败:\n', err);
        }
        console.log('文件写入成功!');
    })
    
}
