import server from '/server.js'
import store from '/store.js'

export default new class {
  getLang(defaultLang) {
    return store.getOrSet('lang', defaultLang)
  }
  setLang(lang) {
    return store.set('lang', lang)
  }
}