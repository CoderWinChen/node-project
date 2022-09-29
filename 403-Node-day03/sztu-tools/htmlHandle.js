// 转义HTML的方法
function encodeHTML(str) {
    // 第二个参数拿到的是每一个字符
    return str.replace(/<|>|"|&/g, (match) => {
        switch (match) {
            case '<':
                return '&lt;'
            case '>':
                return '&gt;'
            case '"':
                return '&quot;'
            case "&":
                return "&amp;"
        }
    })
}

// 还原HTML的方法
function decodeHTML(str) {
    return str.replace(/&lt;|&gt;|&amp;|&quot;/g, (match) => {
        switch (match) {
            case '&lt;':
                return '<';
            case '&gt;':
                return '>';
            case '&amp;':
                return '&';
            case '&quot;':
                return '"';
        }
    })
}

module.exports = {
    encodeHTML,
    decodeHTML
}