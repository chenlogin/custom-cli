module.exports = (generator, answers) => {
  
  generator.render(`./template/${answers.deploy}`, { deployName: answers.deploy })
}
