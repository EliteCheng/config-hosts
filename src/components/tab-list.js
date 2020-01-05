import React, {} from 'react'
import PropTypes from 'prop-types'
import {Icon} from 'antd'

import './tab-list.less'

export function TabList({files, activeId, unsavedIds, onTabClick, onCloseTab}) {
    return <ul className='nav nav-pills tab-list-component'>
        {files.map(f => {
            const withUnsavedMark = unsavedIds.includes(f.id)
            let fClassName = 'c-link nav-link no-border'
            if (f.id === activeId) fClassName += ' active'
            if (withUnsavedMark) fClassName += ' withUnsaved'
            return <li className='nav-item' key={f.id}>
                <div className={fClassName}
                     onClick={e => {
                         e.preventDefault()
                         onTabClick(f.id)
                     }}>
                    <span>{f.id}</span>
                    <Icon type='close' className='ml-2 close-icon'
                          onClick={e => {
                              e.preventDefault()
                              e.stopPropagation()
                              onCloseTab(f.id)
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