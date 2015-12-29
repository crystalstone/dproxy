/*
 * @file 主文件
 */
var proxy = require("./proxy");
// 参数
var argv = require('optimist').argv;
var port = argv.port || 8089;
global.context = {};

if (argv.h) {

    console.log(' 1. 全局安装');
    console.log(' 2. 设置全局代理 127.0.0.1， 端口号 8090(或其他); ');
    console.log(' 3. dproxy -p 8090(端口号需要与第2部设置的代理一致), 这个命令来启动代理，' +
        '不写-p 参数，则代理端口号为8090。');
    console.log(' 4. 启动dproxy 的项目的根目录，添加dproxy-rules 文件，规则如例子');
    return;
}

// 读取替换规则文件
if (require('fs').existsSync('./dproxy-rules.js')) {
    var absPath = require('path').resolve(process.cwd(), './dproxy-rules.js');
    context.rules = require(absPath).rules;
    proxy.listen(port, "127.0.0.1");
}
else {
    console.log("不存在dproxy-rules.js文件！");
}


