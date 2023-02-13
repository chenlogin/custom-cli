const execa = require('execa')

module.exports = function executeCommand(command, cwd) {
  return new Promise((resolve, reject) => {
    // 使用 同步模式执行指定命令
    const child = execa.commandSync(command, {
      //指令执行路径
      cwd,
      //通信方式设置
      stdio: ["inherit", "inherit", "inherit"],
    });
})
}