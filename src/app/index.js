
import React from 'react'
import ReactDOM from 'react-dom'
import App from '/App'

import EventEmmiter from '/utils/tiny-events'
import i18nInstance from './i18n'

import server from './server'
import store from './store'

import { lightTheme, darkTheme } from './themes'

const app = new class extends EventEmmiter {
  constructor() {
    super()

    store.setIfUnset('theme', 'dark')
    store.setIfUnset('lang', 'en')

    i18nInstance.on('translate', (lang, prevLang) => {
      store.set('lang', lang)
      this.emit('translate', lang, prevLang)
    })
    this.setLang(this.getLang())
      .then(() => ReactDOM.render(<App />, document.querySelector('#app')))

    this.toggleTheme = this.toggleTheme.bind(this)
    this.toggleLang = this.toggleLang.bind(this)
  }

  setLang(lang) {
    return i18nInstance.setLang(lang)
  }

  getLang() {
    return store.get('lang')
  }

  toggleLang() {
    if (this.getLang() === 'en')
      this.setLang('ru')
    else
      this.setLang('en')
  }

  setTheme(theme) {
    store.set('theme', theme)
    this.emit('themechange', this.getTheme(theme), theme)
  }

  getTheme() {
    return store.get('theme') === 'dark' ? darkTheme : lightTheme
  }

  getThemeName() {
    return store.get('theme')
  }

  toggleTheme() {
    if (this.getThemeName() === 'dark')
      this.setTheme('light')
    else
      this.setTheme('dark')
  }
}
export default app

