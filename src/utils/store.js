import {remote, Store} from '../native/electron-api'
import {path} from '../native/node-api'
import {flattenArr, objToArr} from './helper'

const STORE_PATH = path.join(remote.app.getPath('appData'), 'config-hosts')
// console.debug(STORE_PATH)
const hostsConfigsStore = new Store({name: 'Hosts-Config-Data'})
const HOST_CONFIG_STORE_KEY = 'hostsConfigs'

const getConfigsFromStore = () => {
    return hostsConfigsStore.get(HOST_CONFIG_STORE_KEY)
}
let configsCache = getConfigsFromStore() || {}
const saveConfigsToStore = configs => {
    hostsConfigsStore.set(HOST_CONFIG_STORE_KEY, configs)
    configsCache = getConfigsFromStore()
}
const getConfigsCache = () => configsCache

const mergeConfigs = (configs, importConfigs) => {
    let configArr = objToArr(configs)
    const importConfigArr = objToArr(importConfigs)
    //比较第一层，如果第一层不同直接add
    importConfigArr.forEach(importConfig => {
        let index = -1
        configArr.some((c, idx) => {
            if (c.title === importConfig.title) {
                index = idx
                return true
            }
            return false
        })
        //第一层不同,直接push
        if (index === -1) {
            configArr.push(importConfig)
        } else {
            //merge config.body
            configArr[index].body = mergeConfigBody(configArr[index].body, importConfig.body)
        }
    })
    return JSON.parse(JSON.stringify(flattenArr(configArr)))
}

function mergeConfigBody(cb1, cb2) {
    const cb1Arr = objToArr(cb1)
    const cb2Arr = objToArr(cb2)
    cb2Arr.forEach(item2 => {
        const k = item2.ip + item2.domain
        let index = -1
        cb1Arr.some(({ip, domain}, idx) => {
            if ((ip + domain) === k) {
                index = idx
                return true
            }
            return false
        })
        if (index === -1) {
            cb1Arr.push(item2)
        } else {
            cb1Arr.splice(index, 1, item2)
        }
    })
    return flattenArr(cb1Arr)
}

export {
    getConfigsFromStore,
    saveConfigsToStore,
    getConfigsCache,
    mergeConfigs,
    HOST_CONFIG_STORE_KEY,
    STORE_PATH,
}
