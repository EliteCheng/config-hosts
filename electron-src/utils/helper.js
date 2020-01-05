const flattenArr = (arr) => {
    return arr.reduce((acc, item) => {
        acc[item.id] = item
        return acc
    }, {})
}

const objToArr = (obj) => {
    return Object.keys(obj).map(k => obj[k])
}

module.exports = {
    objToArr,
    flattenArr
}