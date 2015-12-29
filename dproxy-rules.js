/**
 * 配置文件的例子
 */

exports.rules = {
    // 10.14.24.22 可以换成域名(的部分)
    '10.14.24.22': [
        {
            location: '.js',
            redict: function (url, urlParse) {
                var base = 'http://localhost:3000';
                var fileName = urlParse.path.substr(0, urlParse.path.length - 14) + '.js';
                fileName = fileName.replace('/home', '');
                return base + fileName;
            }
        }/*,
        也可以如下配置
        {
            location: 'index-9a56289ea1.css',
            redict: './base.css'
        },
        {
            location: 'index-9a56289ea1.css',
            redict: 'http://localhost:3000/css/base.css'
        }*/
    ]
}