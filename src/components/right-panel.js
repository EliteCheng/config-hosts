import React, {useMemo, useState} from 'react'

import {TabList} from './tab-list'
import {TablePanel} from './table-panel'
import {isSameConfig, objToArr} from '../utils/helper'

import './right-panel.less'
import {getConfigsCache} from '../utils/store'

export function RightPanel(
    {
        configs, setConfigs,
        tabClick, tabClose,
        openedConfigIDs, activeConfigID,
    }) {
    const [unsavedConfigIDs, setUnsavedConfigIDs] = useState([])
    const activeConfig = useMemo(() => configs[activeConfigID], [configs, activeConfigID])
    const openedConfigArr = useMemo(() => {
        return openedConfigIDs.map(id => configs[id])
    }, [openedConfigIDs, configs])
    const selectedItemIds = useMemo(() => {
        let res = []
        if (activeConfig && activeConfig.body) {
            for (const k in activeConfig.body) {
                if (activeConfig.body[k].selected) {
                    res.push(k)
                }
            }
        }
        return res
    }, [activeConfig])

    const handleUnsaveConfigIds = newConf => {
        if (!isSameConfig(getConfigsCache()[activeConfigID], newConf)) {
            if (!unsavedConfigIDs.includes(activeConfigID)) {
                setUnsavedConfigIDs([...unsavedConfigIDs, activeConfigID])
            }
        } else {
            setUnsavedConfigIDs(unsavedConfigIDs.filter(id => id !== activeConfigID))
        }
    }

    const selectItem = (ids, records) => {
        let newConfig = JSON.parse(JSON.stringify(activeConfig))
        Object.keys(newConfig.body).forEach(k => {
            newConfig.body[k].selected = false
        })
        ids.forEach(id => {
            newConfig.body[id].selected = true
        })
        setConfigs({...configs, [activeConfigID]: newConfig})
        handleUnsaveConfigIds(newConfig)
    }
    const handleItemChange = (dataIndex, v, record) => {
        const newConfig = JSON.parse(JSON.stringify(activeConfig))
        record[dataIndex] = v
        newConfig.body[record.id] = {...record}
        setConfigs({...configs, [activeConfigID]: newConfig})
        handleUnsaveConfigIds(newConfig)
    }

    return <>
        {activeConfig ?
            <>
                <TabList configArr={JSON.parse(JSON.stringify(openedConfigArr))}
                         activeId={activeConfigID}
                         unsavedIds={unsavedConfigIDs}
                         onTabClick={tabClick}
                         onCloseTab={tabClose}/>
                <TablePanel items={objToArr(activeConfig.body)}
                            className='mx-2 mt-3' selectedRowKeys={selectedItemIds}
                            onSelectItem={selectItem} handleItemChange={handleItemChange}
                            title={() => activeConfig.title}/>
            </> :
            <div className='start-page'>
                选择或者创建新的 Hosts Config 文档
            </div>
        }
    </>
}
