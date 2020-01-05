import {objToArr} from './helper'
import {remote, Store} from '../native/electron-api'

const STORE_PATH = remote.app.getPath('appData')
const settingsStore = new Store({name: 'Settings'})
const SETTINGS_STORE_KEY = 'savedFileLocation'

const fileStore = new Store({name: 'Files Data'})
const FILE_STORE_KEY = 'files'
const saveFilesToStore = (files) => {
    const filesStoreObj = objToArr(files).reduce((acc, file) => {
        const {id, path, title, createdAt, isSynced, updatedAt} = file
        acc[id] = {
            id, path, title, createdAt, isSynced, updatedAt
        }
        return acc
    }, {})
    fileStore.set(FILE_STORE_KEY, filesStoreObj)
}


export {
    settingsStore,
    fileStore,
    FILE_STORE_KEY,
    SETTINGS_STORE_KEY,
    STORE_PATH,
    saveFilesToStore
}