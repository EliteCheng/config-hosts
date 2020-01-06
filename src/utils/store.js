import {remote, Store} from '../native/electron-api'
import {resolve} from '../native/node-api'
import defaultData from "./default-data"

const STORE_PATH = remote.app.getPath('appData')

const hostsConfigsStore = new Store({name: 'Hosts Config Data'})
const HOST_CONFIG_STORE_KEY = 'hostsConfigs'


const getConfigsFromStore = () => {
    return hostsConfigsStore.get(HOST_CONFIG_STORE_KEY)
}
let configsCache = getConfigsFromStore() || JSON.parse(JSON.stringify(defaultData));

const saveConfigsToStore = configs => {
    hostsConfigsStore.set(HOST_CONFIG_STORE_KEY, configs)
    configsCache = configs
}
const getConfigsCache = () => configsCache

export {
    getConfigsFromStore,
    saveConfigsToStore,
    getConfigsCache,
    HOST_CONFIG_STORE_KEY,
    STORE_PATH,
}
