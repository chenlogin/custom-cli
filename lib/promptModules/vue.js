const chalk = require('chalk')
module.exports = (api) => {
  api.injectFeature({
      name: 'Vue3',
      value: 'vue',
      description: 'Vue3 framework for building web user interfaces.',
      link: 'https://cn.vuejs.org/',
      checked: true
  })

  api.injectPrompt({
    name: 'SPA',
    when: answers => answers.framework === 'vue',
    type: 'confirm',
    message: `Single-page application for project? ${chalk.yellow(`(Single-page or Multi-page)`)}`,
    description: `An SPA (Single-page application) is a web app implementation that loads only a single web document. The project binds vue-router and pinia`,
    link: 'https://cn.vuejs.org/guide/scaling-up/routing.html',
  })

  api.injectPrompt({
    name: 'Moblie',
    when: answers => answers.framework === 'vue',
    type: 'confirm',
    message: `Mobile terminal project? ${chalk.yellow(`(Mobile or PC)`)}`,
    description: `Mobile project binds Vant4; PC project binds Element Plus; `,
    link: 'https://vant-ui.github.io/vant/#/zh-CN/home',
  })
}
