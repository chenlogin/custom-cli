# custom-cli

## package.json 字段说明
- main, 指定了加载的入口文件，require('moduleName')就会加载这个文件。这个字段的默认值是模块根目录下面的index.js
- scripts, 指定了运行脚本命令的npm命令行缩写
- files, 当你发布package时，具体那些文件会发布上去
- bin, 项用来指定各个内部命令对应的可执行文件的位置
- config, 设置一些用于npm包的脚本命令会用到的配置参数
- browser, 指定该模板供浏览器使用的版本
```
"browserslist": [
        "last 3 Chrome versions",
        "last 3 Firefox versions",
        "Safari >= 10",
        "Explorer >= 11",
        "Edge >= 12",
        "iOS >= 10",
        "Android >= 6"
    ]
```
- engines, 字段指明了该模块运行的平台，也可以指定适用的npm版本
```
"engines": {
        "node": ">=8.9.1",
        "npm": ">=5.5.1",
        "yarn": ">=1.3.2"
    },
```


    