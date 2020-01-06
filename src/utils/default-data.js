let defaultData = {
    'gdclaudy.com': {
        id: 'gdclaudy.com',
        body: {
            '1': {
                ip: '125.216.242.186',
                domain: 'lab.tc.gdclaudy.com',
                description: 'description 1',
                selected: true,
            },
            '2': {
                ip: '222.201.190.96',
                domain: 'drom.tc.gdclaudy.com',
                description: 'description 2',
                selected: false,
            }
        }
    }
}
let tmp = defaultData['gdclaudy.com']

Object.keys(tmp.body).forEach(k => {
    const {ip, domain} = tmp.body[k]
    const id = ip + domain
    tmp.body[id] = {...tmp.body[k], id}
    delete tmp.body[k]
})
export default defaultData