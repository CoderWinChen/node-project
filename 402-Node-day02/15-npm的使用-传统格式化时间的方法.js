// 传统格式化时间的方法

// 格式化时间函数
function formateDate(date) {
    let year   = padZero(date.getFullYear())
    let month  = padZero(date.getMonth() + 1)
    let day    = padZero(date.getDate())
    let hour   = padZero(date.getHours())
    let minute = padZero(date.getMinutes())
    let second = padZero(date.getSeconds())
    date = `${year}年${month}月${day}日 ${hour}:${minute}:${second}`
    return date
}

// 补零函数
function padZero(n) {
    return n < 10 ? '0' + n : n;
}
exports.formateDate = formateDate
