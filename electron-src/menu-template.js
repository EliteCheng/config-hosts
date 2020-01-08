const {resolve} = require('path')
const {app, shell, ipcMain} = require('electron')
const isDev = require('electron-is-dev')

const HOSTS_PATH = resolve(`C:\\Windows\\System32\\drivers\\etc\\hosts`)
const isMac = process.platform === 'darwin'
let menuTemplate = [
    {
        label: '文件',
        submenu: [{
            label: '新建',
            accelerator: 'CmdOrCtrl+N',
            click: (menuItem, browserWindow, event) => {
                browserWindow.webContents.send('create-new-file')
            }
        }, {
            label: '保存',
            accelerator: 'CmdOrCtrl+S',
            click: (menuItem, browserWindow, event) => {
                browserWindow.webContents.send('save-edit-file')
            }
        }, {
            label: '搜索',
            accelerator: 'CmdOrCtrl+F',
            click: (menuItem, browserWindow, event) => {
                browserWindow.webContents.send('search-file')
            }
        }, {
            label: '查看Hosts文件',
            accelerator: 'CmdOrCtrl+H',
            click() {
                shell.openItem(HOSTS_PATH)
            }
        }]
    },
    {
        label: '编辑',
        submenu: [
            {
                label: '撤销',
                accelerator: 'CmdOrCtrl+Z',
                role: 'undo'
            }, {
                label: '重做',
                accelerator: 'Shift+CmdOrCtrl+Z',
                role: 'redo'
            }, {
                type: 'separator'
            }, {
                label: '剪切',
                accelerator: 'CmdOrCtrl+X',
                role: 'cut'
            }, {
                label: '复制',
                accelerator: 'CmdOrCtrl+C',
                role: 'copy'
            }, {
                label: '粘贴',
                accelerator: 'CmdOrCtrl+V',
                role: 'paste'
            }, {
                label: '全选',
                accelerator: 'CmdOrCtrl+A',
                role: 'selectall'
            }, {
                label: '导出配置',
                accelerator: 'Shift+CmdOrCtrl+O',
                click(item, focusWin) {
                    ipcMain.emit('export-config')
                }
            }, {
                label: '导入配置',
                accelerator: 'Shift+CmdOrCtrl+I',
                click() {
                    ipcMain.emit('import-config')
                }
            }
        ]
    },
    {
        label: '视图',
        submenu: [
            {
                label: '刷新当前页面',
                accelerator: 'F5',
                click: (item, focusedWindow) => {
                    if (focusedWindow)
                        focusedWindow.reload()
                }
            },
            {
                label: '切换全屏幕',
                accelerator: (() => {
                    if (isMac)
                        return 'Ctrl+Command+F'
                    else
                        return 'F11'
                })(),
                click: (item, focusedWindow) => {
                    if (focusedWindow)
                        focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
                }
            },
        ]
    },
    {
        label: '窗口',
        role: 'window',
        submenu: [{
            label: '最小化',
            accelerator: 'CmdOrCtrl+M',
            role: 'minimize'
        }, {
            label: '关闭',
            accelerator: 'CmdOrCtrl+W',
            role: 'close'
        }]
    },
]
if (isDev) {
    menuTemplate[2].submenu.push({
        label: '切换开发者工具',
        accelerator: (function () {
            if (isMac)
                return 'Alt+Command+I'
            else
                return 'F12'
            // return 'Ctrl+Shift+I';
        })(),
        click: (item, focusedWindow) => {
            if (focusedWindow)
                focusedWindow.toggleDevTools()
        }
    })
}
module.exports = {
    menuTemplate,
}