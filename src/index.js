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
import loggerMiddleware from '~/utils/redux-logger'

import rootReducer from '~/reducers'
import initializeApp from '~/actions/initializeApp'
import { importLang } from '~/langs'
import App from '~/App'

import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider'
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils'

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
)

ReactDOM.render(
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <ReduxProvider store={store}>
      <BrowserRouter>
        <RouteProvider>
          <App />
        </RouteProvider>
      </BrowserRouter>
    </ReduxProvider>
  </MuiPickersUtilsProvider>,
  document.querySelector('#app')
)

store.dispatch(initializeApp({
  i18nOptions: {
    importLang,
    defaultLang: 'en'
  }
}))