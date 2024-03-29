const execa = require('execa')

module.exports = function executeCommand(command, cwd) {
    return new Promise((resolve, reject) => {
        const child = execa.commandSync(command, {
          cwd,
          stdio: ["inherit", "inherit", "inherit"],
        });
        
        resolve()
        // child.stdout.on('data', buffer => {
        //   process.stdout.write(buffer)
        // })

        // child.on('close', code => {
        //     if (code !== 0) {
        //         reject(new Error(`command failed: ${command}`))
        //         return
        //     }
        //     resolve()
        // })
    })
}