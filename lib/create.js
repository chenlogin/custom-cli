const path = require('path')
const inquirer = require('inquirer')
const chalk = require('chalk');
const figlet = require('figlet')
const PromptModuleAPI = require('./PromptModuleAPI')
const Creator = require('./Creator')
const Generator = require('./Generator')
const executeCommand = require('./utils/executeCommand')

async function create(name) {
    const creator = new Creator()
    // 获取各个模块的交互提示语
    const promptModules = getPromptModules()
    const promptAPI = new PromptModuleAPI(creator)
    promptModules.forEach(m => m(promptAPI))

    // 弹出交互提示语并获取用户的选择
    const finalPrompts = creator.getFinalPrompts()
    //console.log("finalPrompts", finalPrompts)
    const answers = await inquirer.prompt(finalPrompts)
    // 填入必选项，无需用户选择
    answers.commitLint = ['husky + commitLint','commitizen']
    console.log("answers", answers)

    // package.json 文件内容
    const pkg = {
        name,
        version: '0.1.0',
        description: "Create By CM CLI",
        license:"MIT",
        dependencies: {},
        devDependencies: {},
    }
    
    const generator = new Generator(pkg, path.join(process.cwd(), name))
    // 根据用户选择的选项加载相应的模块，在 package.json 写入对应的依赖项
    // 并且将对应的 template 模块渲染
    require(`./generator/${answers.framework}`)(generator, answers)
    require(`./generator/deploy`)(generator, answers)
    await generator.generate()

    // 初始化项目
    console.log('\n初始化项目...\n')
    await executeCommand('git init', path.join(process.cwd(), name))
    // 下载依赖
    console.log('\n正在下载依赖...\n')
    await executeCommand('npm install', path.join(process.cwd(), name))
    
    if(answers.framework === 'vue'){
      // 执行脚本
      // console.log('\n执行脚本...\n')
      // await executeCommand('npm run prepare', path.join(process.cwd(), name))
    }

    console.log("***********************************************************")
    console.log(chalk.yellow(figlet.textSync('SUCCESS', {
      horizontalLayout: 'full'
    })));
    console.log("依赖下载完成! project name is " + chalk.bgBlue(name))
    console.log('执行下列命令开始开发：')
    console.log(chalk.cyan(`cd ${name}`))
    console.log(chalk.cyan(`npm run dev`))
    console.log("***********************************************************")
}

function getPromptModules() {
    return [
        'vue',
        'react',
        'deploy'
    ].map(file => require(`./promptModules/${file}`))
}

module.exports = create