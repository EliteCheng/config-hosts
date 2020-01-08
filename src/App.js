import React, {useState, useMemo} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button, Col, Row} from 'antd'

import {ConfigList} from './components/config-list'
import {getConfigsFromStore, saveConfigsToStore} from './utils/store'
import {SearchInput} from './components/config-search'
import {objToArr} from './utils/helper'
import {RightPanel} from './components/right-panel'
import {useIpcRenderer} from './hooks/use-ipc-renderer'
import uuidv4 from 'uuid/v4'
import {saveConfigsToHosts} from "./utils/hosts-helper"
import {ipcRenderer} from "./native/electron-api"

function App({configs, setConfigs}) {
    const [activeConfigID, setActiveConfigID] = useState('')
    const [openedConfigIDs, setOpenedConfigIDs] = useState([])
    const [searchedConfigArr, setSearchedConfigArr] = useState(null)
    const configsArr = useMemo(() => objToArr(configs), [configs])

    const configSearch = val => {
        if (val === null) {
            return setSearchedConfigArr(null)
        }
        const tmpArr = configsArr.filter(c => c.title.includes(val))
        setSearchedConfigArr(tmpArr)
    }
    const configClick = id => {
        setActiveConfigID(id)
        if (openedConfigIDs.includes(id)) return
        setOpenedConfigIDs([...openedConfigIDs, id])
    }
    const deleteConfig = id => {
        const {[id]: _, ...afterDelete} = configs
        if (!configs[id].isNew) {
            saveConfigsToStore(afterDelete)
            saveConfigsToHosts(afterDelete)
            tabClose(id)
        }
        setConfigs(afterDelete)
    }
    const updateConfigName = (id, title) => {
        const modifyConfig = {...configs[id], isNew: false, title}
        const newConfigs = {...configs, [id]: modifyConfig}
        setConfigs(newConfigs)
        saveConfigsToStore(newConfigs)
    }
    //新建配置文件
    const createNewConfig = () => {
        if (searchedConfigArr !== null) return
        //这里只在files上添加，并没有写入持久化，因为还没有文件名。
        //写入操作在updateFileName函数中实现。
        const newId = uuidv4()
        const newConfig = {
            id: newId, isNew: true,
            body: {}, title: '',
            used: false,
        }
        setConfigs({...configs, [newId]: newConfig})
    }

    const tabClick = id => setActiveConfigID(id)
    const tabClose = confId => {
        const tabsWithout = openedConfigIDs.filter(id => id !== confId)
        if (tabsWithout.length > 0) {
            setActiveConfigID(tabsWithout[0])
        } else {
            setActiveConfigID('')
        }
        setOpenedConfigIDs(tabsWithout)
    }

    useIpcRenderer({
        'create-new-file': createNewConfig,
    })
    return <Row>
        <Col span={6} className='left-panel'>
            <SearchInput onSearch={configSearch}/>
            <ConfigList configArr={searchedConfigArr || configsArr}
                        configs={configs} setConfigs={setConfigs}
                        activeConfigID={activeConfigID}
                        onConfigDelete={deleteConfig}
                        onSaveEdit={updateConfigName}
                        onItemClick={configClick}/>
            <div className='bottom-button-group'>
                <Button size='large' type='primary' icon='plus' className='no-border'
                        onClick={createNewConfig} style={{width: 'calc(25vw - 176px)'}}>新建</Button>
                <Button size='large' type='warning' icon='import' className='no-border'
                        onClick={() => ipcRenderer.send('import-config')}>导入</Button>
                <Button size='large' type='default' icon='export' className='no-border'
                        onClick={() => ipcRenderer.send('export-config')}>导出</Button>
            </div>
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
