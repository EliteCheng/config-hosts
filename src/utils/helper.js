export const flattenArr = (arr) => {
    return arr.reduce((acc, item) => {
        acc[item.id] = item
        return acc
    }, {})
}

export const objToArr = (obj) => {
    return Object.keys(obj).map(k => obj[k])
}

export const isSameConfig = (oldConf, newConf) => {
    const oldBody = objToArr(oldConf.body)
    const newBody = newConf.body
    if (oldBody.length !== objToArr(newBody).length) return false
    return oldBody.every(c => {
        return !!newBody[c.id] &&
            newBody[c.id].description === c.description &&
            newBody[c.id].selected === c.selected
    })
}


export const timestampToString = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
}

