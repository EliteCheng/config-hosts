import React, {useMemo, useState} from 'react'

import {TabList} from "./tab-list"
import {TablePanel} from "./table-panel"
import {isSameConfig, objToArr} from "../utils/helper"

import './right-panel.less'
import {getConfigsCache} from "../utils/store"

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

    const selectItem = (ids, records) => {
        let newConf = JSON.parse(JSON.stringify(activeConfig))
        Object.keys(newConf.body).forEach(k => {
            newConf.body[k].selected = false
        })
        ids.forEach(id => {
            newConf.body[id].selected = true
        })
        setConfigs({...configs, [activeConfigID]: newConf})
        if (!isSameConfig(getConfigsCache()[activeConfigID], newConf)) {
            if (!unsavedConfigIDs.includes(activeConfigID)) {
                setUnsavedConfigIDs([...unsavedConfigIDs, activeConfigID])
            }
        } else {
            setUnsavedConfigIDs(unsavedConfigIDs.filter(id => id !== activeConfigID))
        }
    }
    const handleItemChange = (dataIndex, v, record) => {
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
                            title={() => activeConfig.id}/>
            </> :
            <div className='start-page'>
                选择或者创建新的 Hosts Config 文档
            </div>
        }
    </>
}
