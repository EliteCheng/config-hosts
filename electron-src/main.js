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
    ipcMain.on('show-open-dialog', (evt, data) => {
        const {sender, prevetDefault} = evt
        const {
            title = '', defaultPath = '', buttonLabel,
            filters = [
                {name: 'hosts', extensions: ['*', 'doc']},
            ],
            properties = ['openFile']
        } = data
        dialog.showOpenDialog({
            title, defaultPath, buttonLabel,
            filters, properties
        }).then(({canceled, filePaths}) => {
        })
    })
})
