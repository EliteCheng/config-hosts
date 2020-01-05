const {app, shell, ipcMain} = require('electron')

const isMac = process.platform === 'darwin'
let menuTemplate = [
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
            }
        ]
    },
    {
        label: '设置',
        submenu: [{
            label: 'options',
            accelerator: 'CmdOrCtrl+,',
            click: () => {
                ipcMain.emit('open-settings-window')
            }
        }]
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
            {
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
    {
        label: '帮助',
        role: 'help',
        submenu: [
            {
                label: '学习更多',
                click: () => {
                    shell.openExternal('http://electron.atom.io')
                }
            },
        ]
    },
]
if (isMac) {
    const name = app.getName()
    menuTemplate.unshift({
        label: name,
        submenu: [{
            label: `关于 ${name}`,
            role: 'about'
        }, {
            type: 'separator'
        }, {
            label: '设置',
            accelerator: 'Command+,',
            click: () => {
                ipcMain.emit('open-settings-window')
            }
        }, {
            label: '服务',
            role: 'services',
            submenu: []
        }, {
            type: 'separator'
        }, {
            label: `隐藏 ${name}`,
            accelerator: 'Command+H',
            role: 'hide'
        }, {
            label: '隐藏其它',
            accelerator: 'Command+Alt+H',
            role: 'hideothers'
        }, {
            label: '显示全部',
            role: 'unhide'
        }, {
            type: 'separator'
        }, {
            label: '退出',
            accelerator: 'Command+Q',
            click: () => {
                app.quit()
            }
        }]
    })
} else {
    menuTemplate[0].submenu.push({
        label: '设置',
        accelerator: 'Ctrl+,',
        click: () => {
            ipcMain.emit('open-settings-window')
        }
    })
}

module.exports = {
    menuTemplate,
}