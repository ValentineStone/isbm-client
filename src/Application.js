import server from '/server.js'

class Application {
  constructor() {
    super()
    this.toggleTheme = this.toggleTheme.bind(this)
    this.toggleLang = this.toggleLang.bind(this)

    this.theme = store.getOrSet('theme', 'light')
    this.lang = store.getOrSet('lang', 'en')
    if (I18n.lang !== this.lang)
      I18n.setLang(this.lang)

    this.state = { theme: this.theme }
  }

  get server() {
    return server
  }
  
  toggleTheme() {
    if (this.theme === 'dark')
      this.theme = 'light'
    else
      this.theme = 'dark'
    store.set('theme', this.theme)
    this.setState({ theme: this.theme })
  }
  toggleLang() {
    if (this.lang === 'en')
      this.lang = 'ru'
    else
      this.lang = 'en'
    I18n.setLang(this.lang)
    store.set('lang', this.lang)
  }
}


export default new Application()