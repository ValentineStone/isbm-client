import 'babel-polyfill'
import es6Promise from 'es6-promise'
es6Promise.polyfill()
import 'whatwg-fetch'

import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, applyMiddleware } from 'redux'
import { Provider as ReduxProvider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import loggerMiddleware from '~/utils/redux-logger'

import rootReducer from '~/reducers'
import initializeApp from '~/actions/initializeApp'
import { importLang } from '~/langs'
import App from '~/App'
import RouteContext from '~/context/RouteContext'
import NavigationProvider from '~/containers/NavigationProvider'

import favicon from '~/assets/picture-frame-blue-128.png'

document.head.innerHTML += `<link rel="shortcut icon" type="image/png" href="${favicon}"/>`

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
)

ReactDOM.render(
  <ReduxProvider store={store}>
    <App />
  </ReduxProvider >,
  document.querySelector('#app')
)

store.dispatch(initializeApp({
  i18nOptions: {
    importLang,
    defaultLang: 'en'
  }
}))