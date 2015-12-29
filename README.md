dpac
=====

> 方便的替换线上、测试环境的静态资源；


### 安装

> npm install dpac -g

### 使用

> dpac -p 8090

> -p 端口号，不设置，默认是8090

> -h 帮助文档


### 用法说明

- 设置全局代理 127.0.0.1， 端口号 8090(或其他);

- 启动 dpac的项目的根目录，添加dpac-rules 文件，规则如下
   ```js
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
   ```

- 启动：dpac -p 8090(端口号需要与第2部设置的代理一致), 这个命令来启动代理，不写-p 参数，则代理端口号为8090。




