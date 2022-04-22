const inquirer = require('inquirer');

module.exports = {
  askCreateAppName: () => {
      const questions = [
          {
              name: 'name',// key 名
              type: 'input',//type： input, number, confirm, list, checkbox ... 
              message: 'Enter project name:',// 提示信息
              default: 'custom-cli', // 默认值
              validate: function (value) {
                  if (value.length) {
                      return true;
                  } else {
                      return 'Please enter a app name.';
                  }
              }
          }
      ];
      return inquirer.prompt(questions);
  }
}