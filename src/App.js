import React, {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Col, Row} from 'antd'
import {ConfigList} from './components/config-list'
import {HOST_CONFIG_STORE_KEY, hostsConfigsStore} from './utils/store'
import defaultData from './utils/default-data'
import {SearchInput} from './components/config-search'

function App() {
    const [hostsConfigs, setHostsConfigs] = useState(
        hostsConfigsStore.get(HOST_CONFIG_STORE_KEY)
        || defaultData)

    return <Row>
        <Col span='6' className='left-panel'>
            <SearchInput onSearch={query => {
                console.info(query)
            }}/>
            <ConfigList hostsConfigs={hostsConfigs}/>
        </Col>
        <Col span='18' className='right-panel'>

        </Col>
    </Row>
}

export default App
