const path = require('path')
const {app, ipcMain, Menu} = require('electron')
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
    isDev && mainWindow.webContents.openDevTools()
})



