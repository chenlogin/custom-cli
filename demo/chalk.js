#! /usr/bin/env node

/**
 * node demo/chalk.js create project_name  
*/
const program = require('commander')
const chalk = require('chalk')
const figlet = require('figlet')

program
.version('0.1.0')
.command('create <name>')
.description('create a new project')
.action(name => { 
    // 打印命令行输入的值

    // 文本样式
    console.log("project name is " + chalk.bold(name))

    // 颜色
    console.log("project name is " + chalk.cyan(name))
    console.log("project name is " + chalk.green(name))

    // 背景色
    console.log("project name is " + chalk.bgRed(name))

    // 使用RGB颜色输出
    console.log("project name is " + chalk.rgb(4, 156, 219).underline(name));
    console.log("project name is " + chalk.hex('#049CDB').bold(name));
    console.log("project name is " + chalk.bgHex('#049CDB').bold(name))

    console.log(chalk.yellow(figlet.textSync('SUCCESS', {
      horizontalLayout: 'full'
  })));
})

program.parse()