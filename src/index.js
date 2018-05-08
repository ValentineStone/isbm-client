import 'babel-polyfill'
import es6Promise from 'es6-promise'
es6Promise.polyfill()
import 'whatwg-fetch'

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.js'

import app from '/application.js'
import { createI18nInstance } from '/react-base-i18n.js'
import { importLang } from '/i18n/langs.js'

const i18nInstace = createI18nInstance({ importLang, defaultLang: 'en' })
i18nInstace.setLang(app.getLang('en'), () => {
  ReactDOM.render(<App />, document.querySelector('#app'))
})