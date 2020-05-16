import React from 'react'
import PropTypes from 'prop-types'
import {Icon} from 'antd'

import './tab-list.less'
import {useContextMenu} from '../hooks/use-context-menu'

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

export function TabList({configArr, activeId, unsavedIds, onTabClick, onCloseTab}) {
    const clickedItem = useContextMenu([
        {
            label: '关闭其他',
            click: () => {
                const parentElement = getParentNode(clickedItem.current, 'config-item')
                if (parentElement != null) {
                    let {id} = parentElement.dataset
                    const closeIds = configArr.filter(c => c.id !== id).map(c => c.id)
                    onCloseTab(closeIds)
                }
            }
        },
        {
            label: '关闭所有',
            click: () => {
                onCloseTab(configArr.map(c => c.id))
            }
        }
    ], '.tab-list-component', [configArr])
    return <ul className='nav nav-pills tab-list-component'>
        {configArr.map(c => {
            const withUnsavedMark = unsavedIds.includes(c.id)
            let fClassName = 'c-link nav-link no-border'
            if (c.id === activeId) fClassName += ' active'
            if (withUnsavedMark) fClassName += ' withUnsaved'
            return <li className='nav-item mr-1 config-item' key={c.id} data-id={c.id}>
                <div className={fClassName}
                     onClick={e => {
                         e.preventDefault()
                         onTabClick(c.id)
                     }}>
                    <span>{c.title}</span>
                    <Icon type='close' className='ml-2 close-icon'
                          onClick={e => {
                              e.preventDefault()
                              e.stopPropagation()
                              onCloseTab([c.id])
                          }}/>
                    {withUnsavedMark &&
                    <span className='ml-2 rounded-circle unsaved-icon'/>
                    }
                </div>
            </li>
        })}
    </ul>
}

TabList.propTypes = {
    files: PropTypes.array,
    activeId: PropTypes.string,
    unsavedIds: PropTypes.array,
    onTabClick: PropTypes.func,
    onCloseTab: PropTypes.func
}
TabList.defaultProps = {}
