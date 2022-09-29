const sztu = require('./sztu-tools')
let date = sztu.formate(new Date())
console.log(date);

console.log('-----');

let str = '<h1 style="hello">hello World</h1>'
str = sztu.encodeHTML(str) //转义HTML
str = sztu.decodeHTML(str) //还原HTML

console.log(str);