const Store = require('electron-store')

const hostsConfigsStore = new Store({name: 'Hosts Config Data'})
const HOST_CONFIG_STORE_KEY = 'hostsConfigs'

const getConfigsFromStore = () => {
    return hostsConfigsStore.get(HOST_CONFIG_STORE_KEY)
}

const saveConfigsToStore = configs => {
    hostsConfigsStore.set(HOST_CONFIG_STORE_KEY, configs)
}

export {
    getConfigsFromStore,
    saveConfigsToStore,
    HOST_CONFIG_STORE_KEY,
}
