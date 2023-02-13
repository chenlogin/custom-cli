const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const clear = require('clear');
const program = require('commander');

const create = require('./lib/create');
const packageJson = require('./package.json');

// 清除控制台
clear();

program
  .version(packageJson.version,'-v, --version')

program
    .command('create <app-name>')
    .description('crate a new project')
    .option('-f, --force', 'Overwrite target directory if it exists')
    .action((appname, options) => {

      const dir = path.join(__dirname); 
      if (fs.readdirSync(dir).includes(appname) && !options.force) {

        console.log(chalk.red(`${appname}目录已存在`))
        process.exit(1);
      }
      
      create(appname);
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
  console.log(`create by ${chalk.cyan('cm')} `);
  console.log(`more click ${chalk.red('https://github.com/chenlogin/custom-cli')}`)
  console.log();
});

program.commands.forEach(c => c.on('--help', () => console.log()));

// 解析参数
program.parse(process.argv);

// 无任何命令时输出帮助信息
if (!process.argv.slice(2).length) {
    //只展示帮助信息，不退出程序
    program.outputHelp();
};