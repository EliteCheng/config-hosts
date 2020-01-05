const {BrowserWindow} = require('electron')

class AppWindow extends BrowserWindow {
    constructor(config, urlLocation) {
        const basicConfig = {
            width: 1366,
            height: 768,
            webPreferences: {
                nodeIntegration: true,
            },
            show: false,
            backgroundColor: '#efefef'
        }
        const finalConfig = {...basicConfig, ...config}
        super(finalConfig)
        this.loadURL(urlLocation)
        this.once('ready-to-show', () => {
            this.show()
        })
    }
}

module.exports = {
    AppWindow
}
