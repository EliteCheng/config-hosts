import {remote} from '../native/electron-api'
import {join, resolve} from '../native/node-api'
import {fileHelper} from './file-helper'
import {objToArr} from './helper'

const cachePath = join(remote.app.getPath('documents'), 'hosts-bak.txt')
const HOSTS_PATH = resolve(`C:\\Windows\\System32\\drivers\\etc\\hosts`)

;(function () {
    const isExist = fileHelper.isExist(cachePath)
    if (!isExist) {
        fileHelper.copyFile(HOSTS_PATH, cachePath)
    }
})()

export function saveConfigsToHosts(configs) {
    let usedConfigArr = objToArr(configs).filter(c => c.used)
    let hasConfig = {}
    if (usedConfigArr.length === 0) {
        fileHelper.copyFile(cachePath, HOSTS_PATH)
        return
    }
    let configStr = `#======\r\n`
    usedConfigArr.forEach(c => {
        objToArr(c.body).forEach(({ip, domain, selected, description}) => {
            let k = `${ip} ${domain}`
            if (selected && !(hasConfig[k])) {
                configStr += `#${description}\r\n${k}\r\n`
                hasConfig[k] = true
            }
        })
    })
    if (configStr.length > '#======\r\n'.length) {
        configStr += `#Idea 破解需要\r\n0.0.0.0 account.jetbrains.com\r\n`
        fileHelper.writeFile(HOSTS_PATH, configStr)
    }
    console.info('saveConfigsToHosts', HOSTS_PATH)
}