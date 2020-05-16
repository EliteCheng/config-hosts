import React, {useEffect, useRef, useState} from 'react'
import {Icon, Input, List, message, Popconfirm, Switch, Tooltip} from 'antd'

import './config-list.less'
import {KEY_CODE_MAP, useKeyPress} from '../hooks/use-key-press'
import {saveConfigsToStore} from '../utils/store'
import {saveConfigsToHosts} from '../utils/hosts-helper'
import {debounce} from '../utils/helper'

function ConfigItem(
    {
        config, onConfigDelete,
        activeConfigID, onItemClick,
        editingId, setEditingId, closeEdit,
        inputDom, value, setValue,
        setUsed,
    }) {
    const {id, title, isNew, used} = config
    let className = 'px-2 c-link'
    if (id === activeConfigID) {
        className += ' c-link-active'
    }
    return <List.Item key={id} className={className}
                      onClick={() => {
                          if (!(id === editingId || isNew)) {
                              onItemClick(id)
                          }
                      }}>
        {(id === editingId || isNew) ?
            <div className='d-flex align-items-center' style={{width: '100%'}}>
                <Input value={value} placeholder='请输入文件名称' ref={inputDom}
                       onChange={e => setValue(e.target.value)}/>
                <Icon type='close' className='ml-2' style={{color: 'orangered'}}
                      onClick={() => closeEdit(config)}/>
            </div> :
            <div className='d-flex justify-content-between align-items-center'
                 style={{width: '100%', lineHeight: '16px'}}>
                <span>{title}</span>
                <div className={'d-flex align-items-center'}>
                    <Tooltip title={used ? '禁用配置' : '启用配置'}>
                        <Switch size='small' className='mr-2' checked={used}
                                onChange={(used, evt) => {
                                    evt.stopPropagation()
                                    setUsed(config, used)
                                }}/>
                    </Tooltip>
                    <Tooltip title='重命名' placement='left'>
                        <Icon type='edit' style={{color: '#0bd'}} className='mr-2'
                              onClick={e => {
                                  e.stopPropagation()
                                  setEditingId(id)
                                  setValue(title)
                              }}/>
                    </Tooltip>
                    <Popconfirm title={`确认删除${title}配置文档吗？`}
                                cancelText='否' okText='是' placement='right'
                                onConfirm={e => {
                                    e.stopPropagation()
                                    onConfigDelete(id)
                                }}
                                onCancel={e => e.stopPropagation()}>
                        <Tooltip title='删除' placement='right'>
                            <Icon type='delete' style={{color: 'orangered'}}
                                  onClick={e => e.stopPropagation()}/>
                        </Tooltip>
                    </Popconfirm>
                </div>
            </div>
        }
    </List.Item>
}

const debounceSave = debounce((newConfigs) => {
    saveConfigsToStore(newConfigs)
    saveConfigsToHosts(newConfigs)
}, 1000)

export function ConfigList(
    {
        configArr, onItemClick, onConfigDelete, onSaveEdit, activeConfigID,
        configs, setConfigs
    }) {
    const [editingId, setEditingId] = useState(false)
    const [value, setValue] = useState('')
    const inputDom = useRef(null)
    const enterPressed = useKeyPress(KEY_CODE_MAP.enter)
    const escPressed = useKeyPress(KEY_CODE_MAP.esc)
    const handleUsedChange = ({id}, used) => {
        configs[id].used = used
        const newConfigs = JSON.parse(JSON.stringify(configs))
        setConfigs(newConfigs)
        debounceSave(newConfigs)
    }
    const closeEdit = editItem => {
        setEditingId(false)
        setValue('')
        //如果在编辑一个新文件的文件名
        if (editItem.isNew) {
            //那么点关闭意思就是不想要这个文件了，直接删除即可
            onConfigDelete(editItem.id)
        }
    }
    //search状态下键盘操作副作用
    useEffect(() => {
        const editItem = configs[editingId]
        if (enterPressed && editingId) {
            const inputValue = value && value.trim()
            const existed = Object.keys(configs).some(k =>
                k !== editingId &&
                configs[k].title === inputValue)
            if (inputValue && inputValue.length > 2 && !existed) {
                onSaveEdit(editingId, inputValue)
                setEditingId(false)
                setValue('')
            } else {
                message.error('配置名称不合法，请重新输入![至少3个字符，名称不能重复]')
            }
        } else if (escPressed && editingId) {
            closeEdit(editItem)
        }
    }, [enterPressed, escPressed])
    //文件列表中新建文件的副作用，此时需要将当前新建文件状态转为编辑状态
    useEffect(() => {
        const newConfig = configArr.find(f => f.isNew)
        if (newConfig) {
            setEditingId(newConfig.id)
            setValue(newConfig.title)
        }
    }, [configArr])
    //重命名或者是新建文件状态下修改inputDom的focus
    useEffect(() => {
        if (editingId !== false) {
            inputDom.current.focus()
        }
    }, [editingId])

    return <List style={{maxHeight: 'calc(100vh - 90px)', overflow: 'auto'}}
                 dataSource={configArr}
                 renderItem={c =>
                     <ConfigItem config={c} activeConfigID={activeConfigID}
                                 editingId={editingId} setEditingId={setEditingId}
                                 inputDom={inputDom} value={value} setValue={setValue}
                                 onConfigDelete={onConfigDelete} onItemClick={onItemClick}
                                 closeEdit={closeEdit} setUsed={handleUsedChange}/>
                 }
    />
}
