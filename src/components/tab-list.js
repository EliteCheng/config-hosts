import React, {} from 'react'
import PropTypes from 'prop-types'
import {Icon} from 'antd'

import './tab-list.less'
import {useContextMenu} from '../hooks/use-context-menu'

export function TabList({configArr, activeId, unsavedIds, onTabClick, onCloseTab}) {
    // const clickedItem = useContextMenu([
    //     {
    //         label: '关闭其他',
    //         click: () => {
    //             const parentElement = getParentNode(clickedItem.current, 'file-item')
    //             if (parentElement) {
    //                 const {id, title} = parentElement.dataset
    //                 setEditStatus(id)
    //                 setValue(title)
    //             }
    //         }
    //     },
    //     {
    //         label: '关闭所有',
    //         click: () => {
    //             const parentElement = getParentNode(clickedItem.current, 'file-item')
    //             if (parentElement) {
    //                 onFileDelete(parentElement.dataset.id)
    //             }
    //         }
    //     }
    // ], '.file-list', [configArr])
    return <ul className='nav nav-pills tab-list-component'>
        {configArr.map(c => {
            const withUnsavedMark = unsavedIds.includes(c.id)
            let fClassName = 'c-link nav-link no-border'
            if (c.id === activeId) fClassName += ' active'
            if (withUnsavedMark) fClassName += ' withUnsaved'
            return <li className='nav-item mr-1' key={c.id}>
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
                              onCloseTab(c.id)
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
