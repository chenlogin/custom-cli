## plop：一款小而美的脚手架工具
- 可以将其直接集成到项目中，解决一下重复性的或者需要标准化的创建工作
- plop 的使用过程大致可以拆解为：
  - 安装 plop，新增配置文件 plopfile.js
  - 创建模板文件
  - 执行创建任务
    - npx plop --plopfile ./demo/plop/plopfile.js
## ora 命令行 loading 动效
- node demo/ora.js
## chalk 好看的日志输出
- node demo/chalk.js create myProject
## inquirer 用户与命令行交互的工具
- node demo/inquirer.js
## command 用户命令行输入和参数解析的工具
 * node demo/command.js --version
 * node demo/command.js --help
 * node demo/command.js create newProject
 * node demo/command.js create plop -c ./newcli.conf
 * node demo/command.js ex install -e fast
## ejs JavaScript 模板引擎
- node demo/ejs/cli.js
## spawn 批处理脚本
- node demo/spawn.js