const inquirer = require('inquirer');
const chalk = require('chalk');

const prompts = [
  {
      "name": "features", // 选项名称
      "message": "Check the features needed for your project:", // 选项提示语
      "pageSize": 10,
      "type": "checkbox", // 选项类型 另外还有 confirm list 等
      "choices": [ // 具体的选项
          {
              "name": "Babel",
              "value": "babel",
              "short": "Babel",
              "description": "Transpile modern JavaScript to older versions (for compatibility)",
              "link": "https://babeljs.io/",
              "checked": true
          },
          {
              "name": "Router",
              "value": "router",
              "description": "Structure the app with dynamic pages",
              "link": "https://router.vuejs.org/"
          }
      ]
  },
  {
    name: 'historyMode',
    when: answers => answers.features.includes('router'),
    type: 'confirm',
    message: `Use history mode for router? ${chalk.yellow(`(Requires proper server setup for index fallback in production)`)}`,
    description: `By using the HTML5 History API, the URLs don't need the '#' character anymore.`,
    link: 'https://router.vuejs.org/guide/essentials/history-mode.html',
  },
]

inquirer
  .prompt(prompts)
  .then((answers) => {
    console.log(chalk.blue(JSON.stringify(answers)))
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });