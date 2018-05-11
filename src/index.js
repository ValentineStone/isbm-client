import 'babel-polyfill'
import es6Promise from 'es6-promise'
es6Promise.polyfill()
import 'whatwg-fetch'

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from '~/components/App'
import rootReducer from '~/reducers'
//import { initial, translate, setTheme } from '~/actions'

const store = createStore(rootReducer)

const renderApp = () => ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#app')
)

store.dispatch()