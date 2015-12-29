/**
 * @file: 主文件
 */

var Http = require('http');
var Requester = require('request');
var Url = require('url');

function progressProxyUrl (url) {
    /*{
     4     protocol: 'http:',
     5     slashes: true,
     6     auth: null,
     7     host: 'localhost:8888',
     8     port: '8888',
     9     hostname: 'localhost',
     10    hash: null,
     11    search: '?name=bigbear&memo=helloworld',
     12    query: 'name=bigbear&memo=helloworld',
     13    pathname: '/bb',
     14    path: '/bb?name=bigbear&memo=helloworld',
     15    href: 'http://localhost:8888/bb?name=bigbear&memo=helloworld'
     }*/
    var urlParse = Url.parse(url);
    var rules = context.rules;
    for (var key in rules) {
        var isMatchHost = urlParse.hostname.match(key);
        // 域名匹配
        if (isMatchHost && isMatchHost.length) {
            // 文件匹配
            for (var i = 0, len = rules[key].length; i < len; i++) {
                var isMatchFile = urlParse.path.match(rules[key][i].location);

                if (isMatchFile) {
                    var redict = rules[key][i].redict;

                    if (typeof redict == "function") {
                        return redict(url, urlParse);
                    }
                    else if (typeof redict == "string") {
                        return redict;
                    }
                    else {
                        console.log('必须指定替换文件：可用是函数、可用是string');
                    }
                }
            }

            break;
        }
    }

    return url;
}

exports.listen = function (port, host) {

    var server = Http.createServer(function (req, res) {
        var proxyUrl = progressProxyUrl(req.url);
        try {
            var x = Requester(req.url);
            req.pipe(x);

            if (proxyUrl && proxyUrl !== req.url) {
                console.log('origin-url:' + req.url);
                console.log('proxy-url:' + proxyUrl);

                if (proxyUrl.match('http') || proxyUrl.match('https')) {
                    var p = Requester(proxyUrl);
                    p.pipe(res);
                }
                else {
                    // 否则，则认为是本地文件
                    var filePath = require('path').resolve(process.cwd(), proxyUrl);
                    require('fs').readFile(filePath, function (err, data) {
                        res.end(data);
                    });
                }
            }
            else {
                x.pipe(res);
            }
        } catch(ex) {
            console.log(ex);
        }
    });

    try {
        server.listen(port);
    } catch (ex) {
        return '';
    }
};

