import {useEffect} from 'react'
import {ipcRenderer} from "../native/electron-api"


export function useIpcRenderer(keyCallbackMap) {
    useEffect(() => {
        Object.keys(keyCallbackMap).forEach(k => {
            ipcRenderer.on(k,keyCallbackMap[k])
        })
        return ()=>{
            Object.keys(keyCallbackMap).forEach(k => {
                ipcRenderer.removeListener(k,keyCallbackMap[k])
            })
        }
    })
}