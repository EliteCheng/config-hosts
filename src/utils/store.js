import {objToArr} from './helper'
import {remote, Store} from '../native/electron-api'

const hostsPath = path.resolve('C:\\Windows\\System32\\drivers\\etc\\hosts');
const STORE_PATH = remote.app.getPath('appData')

const fileStore = new Store({name: 'Files Data'})
const FILE_STORE_KEY = 'hostsConfFiles'
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
    fileStore,
    FILE_STORE_KEY,
    STORE_PATH,
    saveFilesToStore
}