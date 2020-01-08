const path = require('path')
const {app, ipcMain, Menu, dialog} = require('electron')
const isDev = require('electron-is-dev')
const {menuTemplate} = require('./menu-template')
const {AppWindow} = require('./app-window')
const {HOST, PORT} = require('../config/config-path')

const isMac = process.platform === 'drawin'
app.on('ready', () => {
    // isDev && require('devtron').install()
    const urlLocation = isDev ? `http://${HOST}:${PORT}` :
        `file://${path.join(__dirname, '../index.html')}`
    let mainWindow = new AppWindow({}, urlLocation)
    isDev && mainWindow.webContents.openDevTools()
    mainWindow.on('closed', () => {
        mainWindow = null
    })
    let menu = Menu.buildFromTemplate(menuTemplate)
    Menu.setApplicationMenu(menu)
    ipcMain.on('show-message-box', (evt, data) => {
        const {type = 'info', message, title, buttons = undefined} = data
        return dialog.showMessageBox({
            type, title, message,
            buttons,
        })
    })
    ipcMain.on('show-error-box', (evt, data) => {
        const {title, content} = data
        dialog.showErrorBox(title, content)
    })
    ipcMain.on('export-config', async (evt, data) => {
        const {canceled, filePath} = await dialog.showSaveDialog({
            title: '选择保存hosts config的路径',
            defaultPath: path.join(app.getPath('desktop'), 'config-hosts.json'),
            filters: [{name: 'json', extensions: ['json']}],
        })
        if (!canceled) {
            mainWindow.webContents.send('export-config', {
                path: filePath,
            })
        }
    })
    ipcMain.on('import-config', async (evt, data) => {
        const {canceled, filePaths} = await dialog.showOpenDialog({
            title: '选择导入hosts config的json文件',
            defaultPath: app.getPath('desktop'),
            filters: [{name: 'json', extensions: ['json']}],
            properties: ['openFile']
        })
        if (!canceled) {
            mainWindow.webContents.send('import-config', {
                path: filePaths[0]
            })
        }
    })
})

