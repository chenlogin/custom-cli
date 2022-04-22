#! /usr/bin/env node

const inquirer = require('inquirer')
const path = require('path')
const fs = require('fs')
const ejs = require('ejs')

inquirer.prompt([
  {
    type: 'input', //type：input,confirm,list,rawlist,checkbox,password...
    name: 'name', // key 名
    message: 'Your name', // 提示信息
    default: 'my-node-cli' // 默认值
  }
]).then(answers => {
  // 模版文件目录
  const destUrl = path.join(__dirname, 'templates'); 
  // 生成文件目录
  // process.cwd() 对应控制台所在目录
  const cwdUrl = process.cwd();
  // 从模版目录中读取文件
  fs.readdir(destUrl, (err, files) => {
    if (err) throw err;
    files.forEach((file) => {
      // 使用 ejs 渲染对应的模版文件
      // renderFile（模版文件地址，传入渲染数据）
      ejs.renderFile(path.join(destUrl, file), answers).then(data => {
        
        if (!fs.existsSync(path.join(cwdUrl, 'demo/ejs/dist'))) {
          fs.mkdir(path.join(cwdUrl, 'demo/ejs/dist'),function(err){

              if (err) {
          
                  return console.error(err);
              }
              console.log("目录创建成功。");
          });
        } 
        // 生成 ejs 处理后的模版文件
        fs.writeFileSync(path.join(cwdUrl, 'demo/ejs/dist', file) , data)
      })
    })
  })
})
