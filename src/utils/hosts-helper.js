import {resolve} from "../native/node-api"

const HOSTS_PATH = resolve('C:\\Windows\\System32\\drivers\\etc\\hosts')


module.exports = {
    updateHosts: conf => {
        let {body} = conf
        let fileStr = ``
        Object.keys(body).forEach(k => {
            let {ip, domain} = body[k]
            fileStr += `${ip} ${domain}`
        })

    }
}