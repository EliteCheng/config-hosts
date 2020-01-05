import {fs, fsSync, join} from '../native/node-api'
import {remote} from '../native/electron-api'
import {settingsStore} from './store'

let savedLocation = settingsStore.get('savedFileLocation') || remote.app.getPath('documents')
const fileHelper = {
    readFile: path => {
        return fs.readFile(path, {encoding: 'utf8'})
    },
    writeFile: (path, content) => {
        return fs.writeFile(path, content, {encoding: 'utf8'})
        .catch(err => {
            console.error(err)
        })
    },
    /**
     *  如果path和newPath不在同一个directory,就会出现跨物理分区的问题。
     *  解决办法，直接执行拷贝文件操作，然后把path下的文件unlink即可
     */
    renameFile: (path, newPath) => {
        return fs.rename(path, newPath)
        .catch(err => {
            console.error(err)
        })
    },
    deleteFile: (path) => {
        return fs.unlink(path)
    },
    isExist: (filePath) => {
        return fsSync.existsSync(filePath)
    }
}
const getFileFullPath = filename => join(savedLocation, `${filename}.md`)
export {
    fileHelper,
    getFileFullPath
}