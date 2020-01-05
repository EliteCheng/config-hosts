export const flattenArr = (arr) => {
    return arr.reduce((acc, item) => {
        acc[item.id] = item
        return acc
    }, {})
}

export const objToArr = (obj) => {
    return Object.keys(obj).map(k => obj[k])
}

/**
 * 获取DOM元素固定类名的父节点
 */
export const getParentNode = (node, parentClassName) => {
    let current = node
    while (current !== document.body) {
        if (current.classList.contains(parentClassName)) {
            return current
        }
        current = current.parentNode
    }
    return false
}

export const timestampToString = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
}