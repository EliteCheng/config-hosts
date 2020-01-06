import React, {useState, useMemo} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button, Col, Row, Table} from 'antd'

import {ConfigList} from './components/config-list'
import {getConfigsFromStore, saveConfigsToStore} from './utils/store'
import defaultData from './utils/default-data'
import {SearchInput} from './components/config-search'
import {objToArr} from './utils/helper'
import {RightPanel} from "./components/right-panel"
import {useIpcRenderer} from "./hooks/use-ipc-renderer"

function App() {
    const [configs, setConfigs] = useState(getConfigsFromStore() || defaultData)
    const [activeConfigID, setActiveConfigID] = useState('')
    const [openedConfigIDs, setOpenedConfigIDs] = useState([])
    const [searchedConfigArr, setSearchedConfigArr] = useState(null)
    const configsArr = useMemo(() => objToArr(configs), [configs])

    const configSearch = val => {
        if (val === null) {
            return setSearchedConfigArr(null)
        }
        const tmpArr = configsArr.filter(c => {
            return c.isNew ||
                c.id.includes(val)
        })
        setSearchedConfigArr(tmpArr)
    }
    const configClick = id => {
        setActiveConfigID(id)
        if (openedConfigIDs.includes(id)) return
        setOpenedConfigIDs([...openedConfigIDs, id])
    }
    const deleteConfig = id => {
        const {[id]: _, ...afterDelete} = configs
        setConfigs(afterDelete)
        tabClose(id)
    }
    const updateConfigName = (id, v) => {
        const {[id]: _, ...afterDelete} = configs
        configs[id].id = v
        configs[id].isNew = false
        setConfigs({...afterDelete, [v]: configs[id]})
        if (activeConfigID === id) {
            setActiveConfigID(v)
        }
        if (openedConfigIDs.includes(id)) {
            const newOpenIds = openedConfigIDs.filter(i => i !== id)
            setOpenedConfigIDs([...newOpenIds, v])
        }
    }
    //新建配置文件
    const createNewConfig = () => {
        if (searchedConfigArr !== null) return
        //这里只在files上添加，并没有写入持久化，因为还没有文件名。
        //写入操作在updateFileName函数中实现。
        const newConfig = {
            id: '___dummyId', isNew: true,
            body: {},
        }
        setConfigs({...configs, '___dummyId': newConfig})
    }

    const tabClick = id => setActiveConfigID(id)
    const tabClose = confId => {
        const tabsWithout = openedConfigIDs.filter(id => id !== confId)
        if (tabsWithout.length > 0) {
            const x = tabsWithout[tabsWithout.length - 1]
            setActiveConfigID(x)
        } else {
            setActiveConfigID('')
        }
        setOpenedConfigIDs(tabsWithout)
    }

    useIpcRenderer({
        'create-new-file': createNewConfig,
        // 'save-edit-file': saveCurrentFile,
    })
    return <Row>
        <Col span={6} className='left-panel'>
            <SearchInput onSearch={configSearch}/>
            <ConfigList configArr={searchedConfigArr || configsArr}
                        configs={configs}
                        activeConfigID={activeConfigID}
                        onConfigDelete={deleteConfig}
                        onSaveEdit={updateConfigName}
                        onItemClick={configClick}/>
            <Button size='large' type='primary' icon='plus' className='bottom-button'
                    onClick={createNewConfig} block>新建</Button>
        </Col>
        <Col span={18} className='right-panel'>
            <RightPanel configs={configs} setConfigs={setConfigs}
                        activeConfigID={activeConfigID}
                        openedConfigIDs={openedConfigIDs}
                        tabClick={tabClick}
                        tabClose={tabClose}/>
        </Col>
    </Row>
}

export default App
