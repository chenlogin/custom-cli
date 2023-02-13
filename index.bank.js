const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const { Command } = require('commander');

const inquirer = require('inquirer');
const packageJson = require('./package.json');

// 清除控制台
clear();

const runInputName = async () => {
  const values = await inquirer.askCreateAppName();
  console.log(values);
  let appName = values.name;
  console.log(chalk.yellow(`Begin create app: ${appName}`))
};

const program = new Command();
program
  .version(packageJson.version,'-v, --version')
  .usage('<commnad [options]>');

// 可选参数
program
.option('-d, --debug', 'crate a app project');

// create 命令
program
    .command('create <app-name>')
    .description('crate a new project')
    .option('-f, --force', 'Overwrite target directory if it exists')
    .action(appname => {
        
        // if (fs.readdirSync('.').includes(input)) {
        //   return '目录已存在'
        // }
        // 输入的 appname
        console.log(appname)
    })
// 配置 config 命令
program
  .command('config [value]')
  .description('inspect and modify the config')
  .option('-g, --get <path>', 'get value from option')
  .option('-s, --set <path> <value>')
  .option('-d, --delete <path>', 'delete option from config')
  .action((value, options) => {
    console.log(value, options)
  })

// 触发 --help 后打印一些信息
program.on('--help', () => {
  console.log();
  console.log(`  create by ${chalk.cyan('cm')} `);
  console.log(`  more click ${chalk.red('https://github.com/chenlogin/custom-cli')}`)
  console.log();
});

program.commands.forEach(c => c.on('--help', () => console.log()));

// 解析参数
program.parse(process.argv);


console.log("解析参数：",process.argv)
console.log("当前目录：",process.cwd())
// 无任何命令时输出帮助信息
if (!process.argv.slice(2).length) {
    program.outputHelp();
}




