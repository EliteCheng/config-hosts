import React, {useState} from 'react'
import {Layout, List} from "antd"

const {Sider} = Layout

function NavLeft({hostsConfFiles}) {

    const siderStyle = {
        height: '100vh',
        background: '#abc',
    }
    const renderItem = hostsConfFile => {
        const {id} = hostsConfFile
        return <List.Item key={id}>

        </List.Item>
    }
    return <Sider style={siderStyle} className=''>
        <List dataSource={hostsConfFiles}
              renderItem={renderItem}
        />
    </Sider>
}

export {
    NavLeft
}
