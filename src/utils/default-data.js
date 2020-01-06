import uuidv4 from 'uuid/v4'

const idx = uuidv4()
let defaultData = {
    [idx]: {
        id: idx, title: 'gdclaudy.com',
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
let tmp = defaultData[idx]
Object.keys(tmp.body).forEach(k => {
    const id = uuidv4()
    tmp.body[id] = {...tmp.body[k], id}
    delete tmp.body[k]
})
export default defaultData