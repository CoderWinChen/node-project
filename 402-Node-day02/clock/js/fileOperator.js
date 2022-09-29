const fs = require('fs')
const path = require('path')

let filePath = path.join(__dirname, '../', './index.html')
let cssPath = path.join(__dirname, '../', './css')
let jsPath = path.join(__dirname, '../', './js')

// \s表示空白字符，\S表示非空白字符
let styleReg = /<style>[\s\S]*<\/style>/
let jsReg = /<script>[\s\S]*<\/script>/


fs.readFile(filePath, 'utf-8', function (err, data) {
    if (err) {
        return console.log('文件读取失败:\n', err);
    }
    resolveCss(data)
    resolveJS(data)
    resolveHTML(data)
})



function resolveCss(data) {
    let css = styleReg.exec(data)[0]
    if (css == null) {
        return console.log('没有需要提取的CSS代码，CSS写入失败');
    }

    css = css.replace('<style>', '').replace('<\/style>', '')

    fs.writeFile(path.join(cssPath, './index.css'), css, function (err) {
        if (err) {
            return console.log('CSS写入失败:\n', err);
        }
        console.log('CSS写入成功!');
    })
}

function resolveJS(data) {
    let js = jsReg.exec(data)
    if (js == null) {
        return console.log('无需提取的JS代码，JS写入失败');
    }

    js = js.replace('<script>', '').replace('<\/script>', '')

    fs.writeFile(path.join(jsPath, './index.js'), js, function (err) {
        if (err) {
            return console.log('JS写入失败:\n', err);
        }
        console.log('JS写入成功!');
    })
 
}


function resolveHTML(data) {
    console.log(data);
    console.log('----');
    console.log(styleReg.exec(data));
    let html = data.replace(styleReg, "<link rel='stylesheet' href='./css/index.css'>")
        .replace(jsReg, "<script src='./js/index.js'></script>")

    fs.writeFile(filePath, html, function (err) {
        if (err) {
            return console.log('HTML写入失败:\n', err);
        }
        console.log('HTML写入成功!');
    })
}