import React, {useState} from 'react'
import {Icon, List, Tooltip} from 'antd'

import './config-list.less'

function ConfigList({hostsConfigs, onItemClick, on}) {
    const [activeDomain, setActiveDomain] = useState(false)

    const renderItem = hostsConfFile => {
        const {id} = hostsConfFile
        let className = 'px-2 c-link'
        if (id === activeDomain) {
            className += ' c-link-active'
        }
        return <List.Item key={id} className={className}>
            <div className='d-flex justify-content-between align-items-baseline'
                 style={{width: '100%', lineHeight: '16px'}}
                 onClick={() => {
                     onItemClick(id)
                 }}>
                <span>{id}</span>
                <div>
                    <Tooltip title='编辑' placement='left'>
                        <Icon type='edit' style={{color: '#0bd'}} className='mr-2'
                              onClick={e => {
                                  e.stopPropagation()
                              }}/>
                    </Tooltip>
                    <Tooltip title='删除' placement='right'>
                        <Icon type='delete' style={{color: 'orangered'}}
                              onClick={e => {
                                  e.stopPropagation()

                              }}/>
                    </Tooltip>
                </div>
            </div>
        </List.Item>
    }
    return <List style={{height: 'calc(100vh - )'}}
                 dataSource={hostsConfigs}

                 renderItem={renderItem}/>
}

export {
    ConfigList
}
