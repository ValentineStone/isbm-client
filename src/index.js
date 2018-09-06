import 'babel-polyfill'
import es6Promise from 'es6-promise'
es6Promise.polyfill()
import 'whatwg-fetch'

import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter } from 'react-router-dom'
import { Provider as RouteProvider } from '~/context/router'

import { createStore, applyMiddleware } from 'redux'
import { Provider as ReduxProvider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import LoggerMiddleware from '~/utils/redux-logger'

import rootReducer from '~/reducers'
import initializeApp from '~/actions/initializeApp'
import { importLang } from '~/langs'
import App from '~/App'

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, new LoggerMiddleware(false))
)

ReactDOM.render(
  <ReduxProvider store={store}>
    <BrowserRouter>
      <RouteProvider>
        <App />
      </RouteProvider>
    </BrowserRouter>
  </ReduxProvider>,
  document.querySelector('#app')
)

store.dispatch(initializeApp({
  i18nOptions: {
    importLang,
    defaultLang: 'en'
  }
}))