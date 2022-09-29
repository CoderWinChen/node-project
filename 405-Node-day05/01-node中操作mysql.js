// 导入mysql模块
const mysql = require('mysql')
// 创建mysql连接池，与MySQL数据库建立连接
const db = mysql.createPool({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'node_demo'
})

// 调用查询语句测试
// db.query('select * from user', (err, result) => {
//     if (err) {
//         return console.log('数据库连接失败:' + err);
//     }
//     console.log(result);
// })

let user = {
    username: '腾讯',
    password: 'tencent'
}
// let sqlStr = "insert into user(username,password) values(?,?)"
// // 添加数据
// db.query(sqlStr, [user.username, user.password], (err, result) => {
//     if (err) {
//         return console.log(err.message);
//     }
//     if (result.affectedRows >= 1) {
//         console.log('插入数据成功');
//     }
//     // console.log(result);
// })

let myUser = {
    username: '阿里巴巴',
    password: 'alibaba'
}
// 插入数据的简便写法
// let sqlStr = 'insert into user set ?'
// db.query(sqlStr,myUser,(err,result)=>{
//     if (err){
//         return console.log(err.message);
//     }
//     if (result.affectedRows>=1){
//         console.log('数据插入成功');
//     }
// })

let updateMsg = {
    status: 1,
    username: '阿里巴巴'
}

// 更新代码
// let sqlStr = 'update user set status = ? where username=?'
// db.query(sqlStr,[updateMsg.status,updateMsg.username],(err,result)=>{
//     if (err){
//         return console.log(err.message);
//     }
//     console.log(result);
//     if (result.affectedRows>=1){
//         console.log('修改数据成功');
//     }
// })

// let userInfo = {
//     id:4,
//     status: 1,
//     password: 'tencent'
// }
// // 更新数据的便捷写法
// let sqlStr = 'update user set ? where id = ?'
// db.query(sqlStr, [userInfo, userInfo.id], (err, result) => {
//     if (err) {
//         return console.log(err.message);
//     }
//     if (result.affectedRows >= 1) {
//         console.log('更新数据成功!');
//     }
// })


// 删除数据，删除id为15的用户
// let sqlStr = 'delete from user where id =?'
// db.query(sqlStr,15,(err,result)=>{
//     if (err){
//         return console.log(err.message);
//     }
//     if (result.affectedRows>=1){
//         console.log('删除成功');
//     }
// })

// 标记删除【不是真正意义上的删除，只是给待删除的添加了status为1的标记】
let sqlStr = 'update user set status = ? where id = ?'
db.query(sqlStr, [1,5], (err, result) => {
    if (err){
        return console.log(err.message);
    }
    if (result.affectedRows>=1){
        console.log('标记删除成功');
    }
})