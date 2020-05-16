import {useEffect, useRef} from 'react'
import {getCurrentWindow, Menu, MenuItem} from '../native/electron-menu'

export function useContextMenu(itemArr, targetSelector, deps) {
    let clickedElement = useRef(null)
    useEffect(() => {
        const menu = new Menu()
        itemArr.forEach(item => {
            menu.append(new MenuItem(item))
        })
        const handleContextMenu = e => {
            //判断e.target DOM元素是否是targetSelector选择出来的DOM元素的子元素
            if (document.querySelector(targetSelector).contains(e.target)) {
                clickedElement.current = e.target
                menu.popup({window: getCurrentWindow()})
            }
        }
        window.addEventListener('contextmenu', handleContextMenu)
        return () => {
            window.removeEventListener('contextmenu', handleContextMenu)
        }
    }, deps)

    return clickedElement
}
