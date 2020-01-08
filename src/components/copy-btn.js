import React, {useState} from 'react'
import {Icon, Spin, Tooltip} from 'antd'

export function CopyBtn({style, className, onCopy}) {
    const [copied, setCopied] = useState(false)
    const handleCopy = e => {
        e.stopPropagation()
        setCopied(true)
        setTimeout(() => {
            onCopy()
            setCopied(false)
        }, 696)
    }
    return <span style={style} className={className}>
        {!copied && <Tooltip title='复制'>
            <Icon type='copy' style={{cursor: 'pointer'}} onClick={handleCopy}/>
        </Tooltip>}
        {copied && <Spin size='small'/>}
    </span>
}


