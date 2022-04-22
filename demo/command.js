#!/usr/bin/env node

/**
 * node demo/command.js --version
 * node demo/command.js --help
 * 
 * node demo/command.js create newProject
 * node demo/command.js create plop -c ./newcli.conf
 * 
 * node demo/command.js ex install -e fast
 */
const { program } = require('commander');
const chalk = require('chalk');  
const fs = require('fs');
const path = require('path');

program
  .name('cli')
  .description('It is my cli')
  .usage('<command> [options] 快速搭建项目')
  .version('0.0.1','-v, --version')
  .option('-c, --config <path>', 'set config path', './cli.conf');

program
  .command('create <app-name>')
  .description('create a new project')
  .option('-f, --force', 'Overwrite target directory if it exists')
  .option('-a, --add <path>', 'add Something')
  .action((appname, options) => {
    
    const dir = path.join(__dirname); 
    if (fs.readdirSync(dir).includes(appname)) {
      console.log(chalk.red(`${appname}目录已存在`))
      process.exit(1);
    }
    console.log(chalk.blue(appname))
})
  
program
  .command('exec <script>')
  .alias('ex')
  .description('execute the given remote cmd')
  .option('-e, --exec_mode <mode>', 'Which exec mode to use', 'fast')
  .action((script, options) => {
    console.log('read config from %s', program.opts().config);
    console.log('exec "%s" using %s mode and config %s', script, options.exec_mode, program.opts().config);
  }).addHelpText('after', `
      Examples:
      $ my-cli exec install
      $ my-cli ex async -e fast`
  );

program.on('command:create', function () {
    console.log(chalk.blue("on:command:create"));
  });

program.on('option:config', function () {
  console.log(chalk.blue("on:option:config"));
});

program.on('command:*', function () {
  console.error('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' '));
  process.exit(1);
});

program.on('--help', function() {
  console.log('****************');
  console.log('Examples:https://github.com/tj/commander.js/blob/master/Readme_zh-CN.md');
  console.log('****************');
});

program.parse(process.argv);

const options = program.opts();
if (options.config) console.log(`==set config path== ${options.config}`);


