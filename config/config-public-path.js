const _ = require('lodash')
const path = require('path')
const print = require('./print')
const PathPlugin = require('./path-plugin')
const {HOST, PORT, PUBLIC_PATH} = require('./config-path')

const isDev = process.env.NODE_ENV === 'development'

const configPublicPath = () => {
    if (isDev) {
        process.env.PORT = PORT
        process.env.HOST = HOST
        process.env.BROWSER = 'none'//设置不自动打开浏览器
        print(`Your App is Run http://${HOST}:${PORT}`, {codeColor: 'blue'})
    } else {
        // 这里主要设置首页的favicon地址，即替换%PUBLIC_URL%
        // 一定要在回调方法之前执行。即写在这个地方才生效
        process.env.PUBLIC_URL = PUBLIC_PATH
        require('./handle-paths')
    }
    return webpackConf => {
        if (!isDev) {
            webpackConf.output.publicPath = `${PUBLIC_PATH}/`
        }
        webpackConf.plugins = _.concat(webpackConf.plugins, [
            new PathPlugin()
        ])
        return webpackConf
    }
}

module.exports = {
    publicPath: PUBLIC_PATH,
    configPublicPath,
}