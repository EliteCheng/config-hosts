import {remote, Store} from '../native/electron-api'
import {resolve} from '../native/node-api'

const hostsPath = resolve('C:\\Windows\\System32\\drivers\\etc\\hosts')
const STORE_PATH = remote.app.getPath('appData')

const hostsConfigsStore = new Store({name: 'Hosts Config Data'})
const HOST_CONFIG_STORE_KEY = 'hostsConfigs'

const saveConfigsToStore = configs => {
    hostsConfigsStore.set(HOST_CONFIG_STORE_KEY, configs)
}

export {
    hostsConfigsStore,
    saveConfigsToStore,
    HOST_CONFIG_STORE_KEY,
    STORE_PATH,
}