import React, {useState} from 'react'
import {Icon, List, Tooltip} from 'antd'

function ConfigList({hostsConfigs, onItemClick, on}) {
    const [activeDomain, setActiveDomain] = useState(false)

    const renderItem = hostsConfFile => {
        const {title} = hostsConfFile
        let className = 'px-2 c-link'
        if (title === activeDomain) {
            className += ' c-link-active'
        }
        return <List.Item key={title} className={className}>
            <div className='d-flex justify-content-between align-items-baseline'
                 style={{width: '100%'}}>
                <span>{title}</span>
                <div>
                    <Tooltip title='编辑' placement='left'>
                        <Icon type='edit' style={{color: '#0bd'}} className='mr-2'/>
                    </Tooltip>
                    <Tooltip title='删除' placement='right'>
                        <Icon type='delete' style={{color: 'orangered'}}/>
                    </Tooltip>
                </div>
            </div>
        </List.Item>
    }
    return <List style={{height:'calc(100vh - )'}}
            dataSource={hostsConfigs}

                 renderItem={renderItem}/>
}

export {
    ConfigList
}
