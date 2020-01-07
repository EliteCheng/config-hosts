import React, {useEffect, useRef, useState} from 'react'
import {Icon, Input, Tooltip} from 'antd'
import './table-cell-editable.less'

export function TableCellEditable({text, onSave, record}) {
    const inputDom = useRef(null)
    const [editing, setEditing] = useState(false)
    const [value, setValue] = useState(text)
    const handleStartEditing = evt => {
        setEditing(true)
    }
    const handleCancelEditing = evt => {
        evt.stopPropagation()
        setEditing(false)
    }
    useEffect(() => {
        editing && inputDom.current.focus()
    }, [editing])
    return <div onClick={handleStartEditing} className='editable-cell'>
        {editing ?
            <div className='editable-cell-input'>
                <Input value={value} onChange={e => setValue(e.target.value)}
                       size={'small' && 'default'} ref={inputDom}/>
                <Icon type='check' className='ml-1 mr-1'
                      onClick={e => {
                          onSave(value, record)
                          handleCancelEditing(e)
                      }}/>
                <Icon type='close' style={{color: 'orangered'}}
                      onClick={handleCancelEditing}/>
            </div> :
            <div className='editable-cell-text'>
                <span>{text}</span>
                <Tooltip title='点击编辑'>
                    <Icon type='edit' className='h-icon'/>
                </Tooltip>
            </div>
        }
    </div>
}
