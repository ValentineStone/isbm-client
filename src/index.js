import 'babel-polyfill'
import es6Promise from 'es6-promise'
es6Promise.polyfill()
import 'whatwg-fetch'

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.js'

ReactDOM.render(
  <App />,
  document.querySelector('#app')
)