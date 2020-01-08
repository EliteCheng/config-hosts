const path = require('path')

module.exports = {
    target: 'electron-main',
    entry: path.join(__dirname, '../electron-src/main.js'),
    output: {
        path: path.resolve(__dirname, '../build/electron-src'),
        filename: 'main.js'
    },
    node: {
        __dirname: false,//将__dirname设置成一个绝对路径
    }
}