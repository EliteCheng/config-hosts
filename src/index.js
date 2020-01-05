import React from 'react'
import ReactDOM from 'react-dom'
import './index.less'
import App from './App'

window.console.warn = () => {}
ReactDOM.render(<App/>, document.getElementById('root'))
