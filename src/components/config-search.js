import React, {useEffect, useState, useRef} from 'react'
import PropTypes from 'prop-types'
import {useKeyPress, KEY_CODE_MAP} from '../hooks/use-key-press'
import {useIpcRenderer} from '../hooks/use-ipc-renderer'
import {Icon, Input} from 'antd'

SearchInput.propTypes = {
    title: PropTypes.string,
    onSearch: PropTypes.func.isRequired,
}
SearchInput.defaultProps = {
    title: '我的Hosts配置'
}

export function SearchInput({title, onSearch}) {
    const [inputActive, setInputActive] = useState(false)
    const searchInputDom = useRef(null)
    const escPressed = useKeyPress(KEY_CODE_MAP.esc)
    const closeSearch = () => {
        setInputActive(false)
        onSearch(null)
    }

    useEffect(() => {
        if (escPressed && inputActive) {
            closeSearch()
        }
    }, [escPressed])
    useEffect(() => {
        if (inputActive) {
            searchInputDom.current.focus()
        }
    }, [inputActive])
    useIpcRenderer({
        'search-file': () => {
            setInputActive(true)
        }
    })
    return <div className='no-border alert alert-primary d-flex justify-content-between align-items-center mb-0'>
        {inputActive ?
            <>
                <Input.Search ref={searchInputDom}
                              placeholder="input search text"
                              onSearch={value => onSearch(value)}
                              style={{width: '100%'}}/>
                <Icon type='close' className='ml-2' onClick={closeSearch}/>
            </> :
            <>
                <span>{title}</span>
                <Icon type='search' onClick={() => {
                    setInputActive(true)
                }}/>
            </>
        }
    </div>
}