const path = require('path')
const HOST = 'localhost'
const PORT = 3166
/**
 *  basePath路径为当前项目根路径/
 */
const basePath = path.join(__dirname, "../")
/**
 * 如果修改了输出路径OUTPUT_PATH
 * 需要同时修改package.json中的build项的files打包路径
 */
const OUTPUT_PATH = path.join(basePath, 'build')
const PUBLIC_PATH = './'

module.exports = {
    basePath,
    OUTPUT_PATH,
    PUBLIC_PATH,
    HOST,
    PORT,
}