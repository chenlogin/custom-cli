const fs = require('fs-extra')
const path = require('path')
const ejs = require('ejs')
const { isBinaryFileSync } = require('isbinaryfile')
const sortObject = require('./utils/sortObject')
const normalizeFilePaths = require('./utils/normalizeFilePaths')
const writeFileTree = require('./utils/writeFileTree')
const isObject = (val) => val && typeof val === 'object'
class Generator {
    constructor(pkg, context) {
        this.pkg = pkg
        this.rootOptions = {}
        this.imports = {}
        this.files = {}
        this.entryFile = `src/main.js`
        this.fileMiddlewares = []
        this.context = context
        this.configTransforms = {}
    }

    // 添加package.json文件内容
    extendPackage(fields) {
        const pkg = this.pkg
        for (const key in fields) {
            const value = fields[key]
            const existing = pkg[key]
            if (isObject(value) && (key === 'dependencies' || key === 'devDependencies' || key === 'scripts')) {
                pkg[key] = Object.assign(existing || {}, value)
            } else {
                pkg[key] = value
            }
        }
    }

    async generate() {
        
        await this.resolveFiles()
        this.sortPkg()
        this.files['package.json'] = JSON.stringify(this.pkg, null, 2) + '\n'
        // 将所有文件写入到用户要创建的目录
        await writeFileTree(this.context, this.files)
    }

    // 按照下面的顺序对 package.json 中的 key 进行排序
    sortPkg() {
        // ensure package.json keys has readable order
        this.pkg.dependencies = sortObject(this.pkg.dependencies)
        this.pkg.devDependencies = sortObject(this.pkg.devDependencies)
        // this.pkg.scripts = sortObject(this.pkg.scripts, [
        //     'dev',
        //     'build',
        //     'test:unit',
        //     'test:e2e',
        //     'lint',
        //     'deploy',
        // ])

        this.pkg = sortObject(this.pkg, [
            'name',
            'version',
            'private',
            'description',
            'author',
            'scripts',
            'husky',
            'lint-staged',
            'main',
            'module',
            'browser',
            'jsDelivr',
            'unpkg',
            'files',
            'dependencies',
            'devDependencies',
            'peerDependencies',
            'vue',
            'babel',
            'eslintConfig',
            'prettier',
            'postcss',
            'browserslist',
            'jest',
        ])
    }

    // 使用 ejs 解析 lib\generator\xx\template 中的文件
    async resolveFiles() {
        const files = this.files
        for (const middleware of this.fileMiddlewares) {
            await middleware(files, ejs.render)
        }

        // normalize file paths on windows
        // all paths are converted to use / instead of \
        // 将反斜杠 \ 转换为正斜杠 /
        normalizeFilePaths(files)
    }

    render(source, additionalData = {}, ejsOptions = {}, additionalPath) {
        // 获取调用 generator.render() 函数的文件的父目录路径 
        const baseDir = extractCallDir()
        source = path.resolve(baseDir, source)
        this._injectFileMiddleware(async (files) => {
            const data = this._resolveData(additionalData)
            // https://github.com/sindresorhus/globby
            const globby = require('globby')
            // 读取目录中所有的文件
            const _files = await globby(['**/*'], { cwd: source, dot: true })
            for (const rawPath of _files) {
                const sourcePath = path.resolve(source, rawPath)
                // 解析文件内容
                const content = this.renderFile(sourcePath, data, ejsOptions)
                // only set file if it's not all whitespace, or is a Buffer (binary files)
                if (Buffer.isBuffer(content) || /[^\s]/.test(content)) {
                  if(additionalPath){
                    files[path.join(additionalPath, rawPath)] = content
                  } else {
                    files[rawPath] = content
                  }
                }
            }
        })
    }

    _injectFileMiddleware(middleware) {
        this.fileMiddlewares.push(middleware)
    }

    // 合并选项
    _resolveData(additionalData) {
        return { 
            projectName: this.pkg.name,
            options: this.options,
            rootOptions: this.rootOptions,
            ...additionalData,
        }
    }

    renderFile(name, data, ejsOptions) {
        // 如果是二进制文件，直接将读取结果返回
        if (isBinaryFileSync(name)) {
            return fs.readFileSync(name) // return buffer
        }

        // 返回文件内容
        const template = fs.readFileSync(name, 'utf-8')
        return ejs.render(template, data, ejsOptions)
    }
}

/** 
 * 获取调用栈信息
 * JavaScript语言标准中没有定义captureStackTrace
 * Node.js中，关于Error.captureStackTrace的描述：
 * Error.captureStackTrace(targetObject[, constructorOpt]) 在targetObject中添加一个.stack属性。
 * 对该属性进行访问时，将以字符串的形式返回Error.captureStackTrace()语句被调用时的代码位置信息(即：调用栈历史)。
 * */ 
function extractCallDir() {
    const obj = {}
    Error.captureStackTrace(obj)
    // 在 lib\generator\xx 等各个模块中 调用 generator.render()
    // 将会排在调用栈中的第四个，也就是 obj.stack.split('\n')[3]
    // obj.stack.split('\n')[1]是Generator.js中extractCallDir方法
    // obj.stack.split('\n')[2]是Generator.js中render方法
    // obj.stack.split('\n')[3]是在 lib\generator\xx\index.js 等各个模块中 调用 generator.render()
    const callSite = obj.stack.split('\n')[3]

    // the regexp for the stack when called inside a named function
    const namedStackRegExp = /\s\((.*):\d+:\d+\)$/
    // the regexp for the stack when called inside an anonymous
    const anonymousStackRegExp = /at (.*):\d+:\d+$/

    let matchResult = callSite.match(namedStackRegExp)
    if (!matchResult) {
        matchResult = callSite.match(anonymousStackRegExp)
    }

    const fileName = matchResult[1]
    // 获取对应文件的目录
    return path.dirname(fileName)
}

module.exports = Generator