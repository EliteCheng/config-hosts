const Store = require('electron-store')

const settingsStore = new Store({name: 'Settings'})
module.exports = {
    settingsStore,
}