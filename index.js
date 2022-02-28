#! /usr/bin/env node
// const chalk = require('chalk')
// const figlet = require('figlet')
// const { Command } = require('commander')
// const packageJson = require("./package.json")
const inquirer = require("inquirer")


// // console.log(chalk.yellow(figlet.textSync('Chen', {
// //     horizontalLayout: 'full'
// // })));




// const program = new Command();
// program.version(packageJson.version,'-v, --version')

// // create 命令
// program
//     .command('create <app-name>')
//     .description('crate a new project')
//     .option('-f, --force', 'Overwrite target directory if it exists')
//     .action(appname => {
//         // 输入的 appname
//     })

// program
//     //添加指令 add,<taskName>是指令的参数
//     .command('add <taskName>')
//     .description('add a task')//指令的描述
//     .action((taskName) => {
//         //action是操作指令后会干什么
//         console.log(taskName)
//     });
// program
//     .command('clear')
//     .description('clear all task')
//     .action(() => {
//         console.log("execute clear")
//     });

// // 开始解析参数
// program.parse(process.argv);

// // 无任何命令时输出帮助信息
// if (!process.argv.slice(2).length) {
//     program.outputHelp();
// }

inquirer.prompt([
    {
      type: 'input', //type： input, number, confirm, list, checkbox ... 
      name: 'name', // key 名
      message: 'Your name', // 提示信息
      default: 'custom-cli' // 默认值
    }
  ]).then(answers => {
    // 打印互用输入结果
    console.log(answers)
  })