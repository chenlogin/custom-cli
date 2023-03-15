# @cm/mini-cli
## package.json 字段说明
- main, 指定了加载的入口文件，require('moduleName')就会加载这个文件。默认值是模块根目录下面的index.js
- scripts, 指定了运行脚本命令的npm命令行缩写
- files, 当你发布package时，具体那些文件会发布上去
- bin, 项用来指定各个内部命令对应的可执行文件的位置
- config, 设置一些用于npm包的脚本命令会用到的配置参数
- browser, 指定该模板供浏览器使用的版本
- engines, 字段指明了该模块运行的平台，也可以指定适用的npm、yarn版本
## 使用Vue3 或者 React 快速搭建前端项目的脚手架工具
### 安装
#### NPM
```
npm install -g @cm/mini-cli
```

#### Yarn
```
yarn global add @cm/mini-cli
```
#### 常用命令
```
cmcli create <项目名>  #创建项目
cmcli --help          #查看帮助
```
#### 更多命令
```
Options:
  -v, --version                output the version number
  -h, --help                   display help for command

Commands:
  create [options] <app-name>  crate a new project
    Options:
    -f, --force  Overwrite target directory if it exists
    -h, --help   display help for command
  help [command]               display help for command

```
#### 模版说明
1. Vue3可选择 单页/多页 两种打包形式
2. React默认单页项目
3. UI组件库：PC端使用element plus，手机端使用Vant

### 项目规范
- 代码规范
  - 命名
    1. node层文件名使用中划线分割命名 hello-world.ts，render层使用驼峰命名testReact.ts
    2. 文件夹名：驼峰命名 lowerCamelCase 
    3. 文件名：驼峰命名（注：components下组件使用帕斯卡命名）
    4. 属性、方法、实例：驼峰命名  
    5. 类、接口、枚举：用帕斯卡命名 UpperCamelCase     
    6. 常量、枚举值：采用全大写 CONST_VAR
    7. css建议使用BEM命名规范，模块名 + 元素名 + 修饰器名，block-name__element-name--modifier-name
- 提交规范
  - 提交类型
    - feat:   新功能
    - fix:     修复Bug
    - improvement：对当前功能改进
    - docs:  文档变更
    - style:     代码格式（不影响代码运行的变动
    - refactor:  重构（既不是增加feature）,也不是修复bug
    - pref:      性能优化
    - test:      增加测试
    - chore:     构建过程或辅助工具的变动
    - revert:    回退
    - build:     打包
- 分支规范
  1. 环境分支：test，staging，master
  2. 功能分支：feature_xxx，hotfix_xxx
  3. 主分支开功能分支，上线后分支删除

- 项目名称规范
  - 全小写


    