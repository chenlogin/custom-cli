class Creator {
  constructor() {
      this.featurePrompt = {
          name: 'framework',
          message: 'Check the framework needed for your project:',
          pageSize: 10,
          type: 'list',
          choices: [],
      }

      this.injectedPrompts = []
  }

  getFinalPrompts() {
      this.injectedPrompts.forEach(prompt => {
          //无when条件判断时，默认是true
          const originalWhen = prompt.when || (() => true)
          prompt.when = answers => originalWhen(answers)
      })
  
      const prompts = [
          this.featurePrompt,
          ...this.injectedPrompts,
      ]
  
      return prompts
  }
}

module.exports = Creator