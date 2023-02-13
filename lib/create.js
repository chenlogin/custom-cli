const path = require('path')
const inquirer = require('inquirer')
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
    console.log("finalPrompts", finalPrompts)
    const answers = await inquirer.prompt(finalPrompts)
    // 填入 vue webpack 必选项，无需用户选择
    answers.features.unshift('vue', 'webpack')
    console.log("answers", answers)

    // package.json 文件内容
    const pkg = {
        name,
        version: '0.1.0',
        dependencies: {},
        devDependencies: {},
    }
    
    const generator = new Generator(pkg, path.join(process.cwd(), name))
    // 根据用户选择的选项加载相应的模块，在 package.json 写入对应的依赖项
    // 并且将对应的 template 模块渲染
    answers.features.forEach(feature => {
        require(`./generator/${feature}`)(generator, answers)
    })

    await generator.generate()

    console.log('\n正在下载依赖...\n')
    // 下载依赖
    await executeCommand('npm install', path.join(process.cwd(), name))
    console.log('\n依赖下载完成! 执行下列命令开始开发：\n')
    console.log(`cd ${name}`)
    console.log(`npm run dev`)
}

function getPromptModules() {
    return [
        'babel',
        'router',
        'vuex',
        'linter',
    ].map(file => require(`./promptModules/${file}`))
}

module.exports = create