const {remote, ipcRenderer} = window.require('electron')
const Store = window.require('electron-store')
const {
    dialog
} = remote

const {
    showOpenDialog,
    showMessageBox,
} = dialog


export {
    showOpenDialog,
    showMessageBox,
    remote,
    ipcRenderer,
    Store,
}