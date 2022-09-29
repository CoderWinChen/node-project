// 格式化时间的函数
function formate(dateStr) {
    let year = appendZero(dateStr.getFullYear())
    let month = appendZero(dateStr.getMonth() + 1)
    let day = appendZero(dateStr.getDate())
    let hour = appendZero(dateStr.getHours())
    let minute = appendZero(dateStr.getMinutes())
    let second = appendZero(dateStr.getSeconds())
    dateStr = `${year}年${month}月${day}日 ${hour}:${minute}:${second}`
    return dateStr;
}

// 补零函数
function appendZero(n) {
    return n < 9 ? '0' + n : n;
}

module.exports = {
    formate
}