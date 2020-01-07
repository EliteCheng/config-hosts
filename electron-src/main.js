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
    mainWindow.on('closed', () => {
        mainWindow = null
    })
    let menu = Menu.buildFromTemplate(menuTemplate)
    Menu.setApplicationMenu(menu)
    ipcMain.on('show-message-box', (evt, data) => {
        const {type = 'info', message, title, buttons = undefined} = data
        dialog.showMessageBox({
            type, title, message,
            buttons,
        })
    })
    isDev && mainWindow.webContents.openDevTools()
})
