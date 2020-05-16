const path = window.require('path')
const {
    join,
    basename: getBasename,
    extname: getExtname,
    dirname: getDirname,
    resolve,
} = path
const fs = window.require('fs').promises
const fsSync = window.require('fs')

export {
    join,
    getBasename,
    getExtname,
    getDirname,
    resolve,
    fs,
    fsSync,
    path
}
