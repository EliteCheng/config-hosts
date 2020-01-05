import React, {useState, useMemo} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button, Col, Row, Table} from 'antd'

import {ConfigList} from './components/config-list'
import {HOST_CONFIG_STORE_KEY, hostsConfigsStore} from './utils/store'
import defaultData from './utils/default-data'
import {SearchInput} from './components/config-search'
import {objToArr} from './utils/helper'
import {TabList} from './components/tab-list'

function App() {
    const [isLoading, setIsLoading] = useState(false)
    const [searchedFiles, setSearchedFiles] = useState(null)
    const [configs, setConfigs] = useState(
        hostsConfigsStore.get(HOST_CONFIG_STORE_KEY)
        || defaultData)
    const [activeConfigID, setActiveConfigID] = useState('')
    const [openedConfigIDs, setOpenedConfigIDs] = useState([])
    const [unsavedConfigIDs, setUnsavedConfigIDs] = useState([])
    const configsArr = useMemo(() => objToArr(configs), [configs])
    const openedConfigs = useMemo(() => openedConfigIDs.map(id => configs[id]),
        [openedConfigIDs, configs])
    const activeConfig = useMemo(() => configs[activeConfigID], [configs, activeConfigID])

    const configSearch = val => {
        if (val === null) {
            return setSearchedFiles(null)
        }
        const searchFileArr = configs.filter(c => c.id.includes(val))
        setSearchedFiles(searchFileArr)
    }
    const configClick = async id => {
        const {title} = configs[id]
        setActiveConfigID(id)
        if (openedConfigIDs.includes(id)) return
        setOpenedConfigIDs([...openedConfigIDs, id])
    }
    //新建文件
    const createNewConfig = () => {
        //这里只在files上添加，并没有写入持久化，因为还没有文件名。
        //写入操作在updateFileName函数中实现。
        const newConfig = {
            id: '___dummyId', isNew: true,
            body: {},
            createdAt: new Date().getTime(),
        }
        setConfigs({...configs, '___dummyId': newConfig})
    }
    const tabClick = fileId => setActiveConfigID(fileId)
    const tabClose = fileId => {
        const tabsWithout = openedConfigIDs.filter(id => id !== fileId)
        setOpenedConfigIDs(tabsWithout)
        if (tabsWithout.length > 0) {
            setActiveConfigID(tabsWithout[tabsWithout.length - 1])
        } else {
            setActiveConfigID('')
        }
    }
    return <Row>
        <Col span={6} className='left-panel'>
            <SearchInput onSearch={configSearch}/>
            <ConfigList hostsConfigs={configsArr} onItemClick={configClick}/>
            <Button size='large' type='primary' icon='plus' className='bottom-button'
                    onClick={createNewConfig} block>新建</Button>
        </Col>
        <Col span={18} className='right-panel'>
            {activeConfig ?
                <>
                    <TabList files={openedConfigs}
                             activeId={activeConfigID}
                             unsavedIds={unsavedConfigIDs}
                             onTabClick={tabClick}
                             onCloseTab={tabClose}/>
                    <Table

                    />
                </> :
                <div className='start-page'>
                    选择或者创建新的 Hosts Config 文档
                </div>
            }
        </Col>
    </Row>
}

export default App
