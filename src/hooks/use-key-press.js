import {useEffect, useState} from 'react'
import {debounce} from "../utils/helper"

export const KEY_CODE_MAP = {
    enter: 13,
    esc: 27
}

export function useKeyPress(targetKeyCode) {
    const [keyPressed, setKeyPressed] = useState(false)

    useEffect(() => {
        const keyDownHandler = debounce(({keyCode}) => {
            if (keyCode === targetKeyCode) {
                setKeyPressed(true)
            }
        })
        const keyUpHandler = debounce(({keyCode}) => {
            if (keyCode === targetKeyCode) {
                setKeyPressed(false)
            }
        })
        document.addEventListener('keyup', keyUpHandler)
        document.addEventListener('keydown', keyDownHandler)
        return () => {
            document.removeEventListener('keyup', keyUpHandler)
            document.removeEventListener('keydown', keyDownHandler)
        }
    })

    return keyPressed
}
