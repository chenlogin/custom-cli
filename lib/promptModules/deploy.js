module.exports = (api) => {
  api.injectPrompt({
    name: 'deploy',
    type: 'list',
    message: 'Pick a deploy script:',
    description: 'deploy script',
    choices: () => [
      {
          name: 'www.chenlogin.com',
          value: 'chenlogin',
          short: 'chenlogin',
      },
      {
        name: 'other',
        value: 'other',
        short: 'other',
      },
    ],
  })
}
