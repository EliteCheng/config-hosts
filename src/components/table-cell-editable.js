import React, {useEffect, useRef, useState} from 'react'
import {Icon, Input, Tooltip} from 'antd'
import './table-cell-editable.less'
import {KEY_CODE_MAP, useKeyPress} from "../hooks/use-key-press"

export function TableCellEditable({text, onSave, record}) {
    const inputDom = useRef(null)
    const [focusing, setFocusing] = useState(false)
    const [editing, setEditing] = useState(false)
    const [value, setValue] = useState(text)
    const enterPress = useKeyPress(KEY_CODE_MAP.enter)
    const escPress = useKeyPress(KEY_CODE_MAP.esc)

    const handleStartEditing = evt => {
        evt && evt.stopPropagation()
        setEditing(true)
    }
    const handleCancelEditing = evt => {
        evt && evt.stopPropagation()
        setEditing(false)
    }
    const handleSaveEdit = evt => {
        onSave(value, record)
        handleCancelEditing(evt)
    }
    useEffect(() => {
        editing && inputDom.current.focus()
    }, [editing])
    useEffect(() => {
        if (editing && focusing) {
            if (enterPress) {
                handleSaveEdit()
            } else if (escPress) {
                handleCancelEditing()
            }
        }
    }, [enterPress, escPress, editing, focusing])
    return <div onClick={handleStartEditing} className='editable-cell'>
        {editing ?
            <div className='editable-cell-input'>
                <Input value={value} onChange={e => setValue(e.target.value)}
                       size={'small' && 'default'} ref={inputDom}
                       onFocus={() => setFocusing(true)}
                       onBlur={() => setFocusing(false)}/>
                <Icon type='check' className='ml-1 mr-1'
                      onClick={handleSaveEdit}/>
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
