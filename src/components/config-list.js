import React, {useEffect, useRef, useState} from 'react'
import {Icon, Input, List, Popconfirm, Tooltip} from 'antd'

import './config-list.less'
import {KEY_CODE_MAP, useKeyPress} from "../hooks/use-key-press"
import {ipcRenderer} from "../native/electron-api"

function ConfigList({configArr, onItemClick, onConfigDelete, onSaveEdit, activeConfigID, configs}) {
    const [activeDomain, setActiveDomain] = useState(false)
    const [value, setValue] = useState('')
    const inputDom = useRef(null)
    const enterPressed = useKeyPress(KEY_CODE_MAP.enter)
    const escPressed = useKeyPress(KEY_CODE_MAP.esc)
    const closeEdit = editItem => {
        setActiveDomain(false)
        setValue('')
        //如果在编辑一个新文件的文件名
        if (editItem.isNew) {
            //那么点关闭意思就是不想要这个文件了，直接删除即可
            onConfigDelete(editItem.id)
        }
    }
    //search状态下键盘操作副作用
    useEffect(() => {
        const editItem = configArr.find(c => c.id === activeDomain)
        console.debug(enterPressed, escPressed);
        if (enterPressed && activeDomain) {
            const inputValue = value && value.trim()
            if (inputValue && inputValue.length > 2 && (!configs[inputValue])) {
                onSaveEdit(editItem.id, inputValue, editItem.isNew)
                setActiveDomain(false)
                setValue('')
            } else {
                ipcRenderer.send('show-message-box', {
                    title: '错误',
                    message: '配置名称不合法，请重新输入'
                })
            }
        } else if (escPressed && activeDomain) {
            closeEdit(editItem)
        }
    }, [enterPressed, escPressed])
    //文件列表中新建文件的副作用，此时需要将当前新建文件状态转为编辑状态
    useEffect(() => {
        const newConfig = configArr.find(f => f.isNew)
        if (newConfig) {
            setActiveDomain(newConfig.id)
            setValue(newConfig.title)
        }
    }, [configArr])
    //重命名或者是新建文件状态下修改inputDom的focus
    useEffect(() => {
        if (activeDomain !== false) {
            inputDom.current.focus()
        }
    }, [activeDomain])

    const renderItem = config => {
        const {id, isNew} = config
        let className = 'px-2 c-link'
        if (id === activeConfigID) {
            className += ' c-link-active'
        }
        return <List.Item key={id} className={className}
                          onClick={() => {
                              if (!(id === activeDomain || isNew)) {
                                  onItemClick(id)
                              }
                          }}>
            {(id === activeDomain || isNew) ?
                <div className='d-flex align-items-center' style={{width: '100%'}}>
                    <Input value={value} placeholder='请输入文件名称' ref={inputDom}
                           onChange={e => setValue(e.target.value)}/>
                    <Icon type='close' className='ml-2' style={{color: 'orangered'}}
                          onClick={() => closeEdit(config)}/>
                </div> :
                <div className='d-flex justify-content-between align-items-center'
                     style={{width: '100%', lineHeight: '16px'}}>
                    <span>{id}</span>
                    <div>
                        <Tooltip title='重命名' placement='left'>
                            <Icon type='edit' style={{color: '#0bd'}} className='mr-2'
                                  onClick={e => {
                                      e.stopPropagation()
                                      setActiveDomain(id)
                                      setValue(id)
                                  }}/>
                        </Tooltip>
                        <Popconfirm title={`确认删除${id}配置文档吗？`}
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
    return <List style={{height: 'calc(100vh - 37px)'}}
                 dataSource={configArr}
                 renderItem={renderItem}/>
}

export {
    ConfigList
}
