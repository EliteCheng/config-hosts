import {fs, fsSync, join} from '../native/node-api'

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
    },
    copyFile: (src, dest) => {
        return fs.copyFile(src, dest)
        .then(() => console.log(`${src}已拷贝到${dest}`))
        .catch(() => console.error(`${src}文件无法拷贝!`))
    }
}
export {
    fileHelper,
}