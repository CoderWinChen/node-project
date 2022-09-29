## 安装
```
npm install sztu-tools
```

## 导入方式
```js
const sztu = require('sztu-tools')
```

## formate方法
```js
// 调用formate方法格式化时间
let date = sztu.formate(new Date())
console.log(date); //xxxx年xx月xx日 xx:xx:xx
```

## HTML转义方法-转义html
```js
// 代转义的html
let str = '<h1 style="hello">hello World</h1>'
str = sztu.encodeHTML(str) 
//结果：&lt;h1 style=&quot;hello&quot;&gt;hello World&lt;/h1&gt;
```

## HTML转义方法-还原html
```js
let str = '<h1 style="hello">hello World</h1>'
str = sztu.encodeHTML(str) //转义HTML
str = sztu.decodeHTML(str) //还原HTML
// 结果：<h1 style="hello">hello World</h1>
```

## 开源协议
ISC


