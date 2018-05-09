import EventEmmiter from './tiny-events.js'

import { createI18nInstance, setLang } from '/react-base-i18n.js'
import importLang from '/i18n/langs.js'

import server from '/server.js'
import store from '/store.js'

export default class ApplicationController extends EventEmmiter {
  constructor({ onReady }) {
    super()

    const i18nInstance = createI18nInstance({ importLang, defaultLang: 'en' })

    i18nInstance.setLang(this.getCurrentLang('en')).then(onReady)
  }

  getCurrentLang(defaultLang) {
    return store.getOrSet('lang', defaultLang)
  }

  setLang(lang) {
    return store.set('lang', lang)
  }
}

export const createApplicationInstance =
  options => ApplicationController.instance =
    new ApplicationController(options)