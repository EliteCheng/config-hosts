import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import {Modal} from 'antd'

import './index.less'
import App from './App'
import {useIpcRenderer} from "./hooks/use-ipc-renderer"
import {fileHelper} from "./utils/file-helper"
import {getConfigsFromStore, mergeConfigs, saveConfigsToStore} from "./utils/store"
import {ipcRenderer, shell} from "./native/electron-api"
import {saveConfigsToHosts} from "./utils/hosts-helper"

// window.console.warn = () => {}
function Index() {
    const [configs, setConfigs] = useState(getConfigsFromStore() || {})

    const importConfig = async (evt, data) => {
        const {path} = data
        const res = await fileHelper.readFile(path)
        let importConfigsObj = null
        try {
            importConfigsObj = JSON.parse(res)
            const newConfigs = mergeConfigs(configs, importConfigsObj)
            setConfigs(newConfigs)
            saveConfigsToStore(newConfigs)
            Modal.confirm({
                title: '导入Hosts 配置文件',
                content: `导入成功！已为您自动合并配置，是否更新Hosts文件？`,
                okText: '确认',
                cancelText: '取消',
                centered: true,
                onOk() {
                    saveConfigsToHosts(newConfigs)
                }
            })
        } catch (e) {
            Modal.error({
                title: '导入Hosts 配置文件',
                content: `文件格式错误！导入失败！`,
            })
        }
    }
    const exportConfig = async (evt, data) => {
        const {path} = data
        const configsObj = getConfigsFromStore()
        const content = JSON.stringify(configsObj, null, 4)
        await fileHelper.writeFile(path, content)
        Modal.confirm({
            title: '导出Hosts 配置文件',
            content: `配置已导出至${path},是否立即查看？`,
            okText: '确认',
            cancelText: '取消',
            centered: true,
            onOk() {
                shell.openItem(path)
            }
        });
    }

    useIpcRenderer({
        'import-config': importConfig,
        'export-config': exportConfig,
    })

    return <App configs={configs} setConfigs={setConfigs}/>
}

ReactDOM.render(<Index/>, document.getElementById('root'))
