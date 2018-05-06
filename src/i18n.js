import React from 'react'

import EventEmmiter from './tiny-events.js'

import {
  importLang,
  defaultLang,
  defaultModule
} from './i18n/langs.js'

const getDeep = (object, path) => {
  let value = object
  for (
    let i = 0;
    i < path.length
    && value
    && typeof value === 'object';
    i++
  )
    value = value[path[i]]
  return value
}

const intertwine = (arr1, arr2) => {
  let intertwinedLength = arr1.length + arr2.length
  let intertwined = new Array(intertwinedLength)
  for (let i = 0, j = 0; i < arr2.length; j += 2, i++) {
    intertwined[j] = arr1[i]
    intertwined[j + 1] = arr2[i]
  }
  intertwined[intertwinedLength - 1] = arr1[arr1.length - 1]
  return intertwined.join('')
}

class I18n extends EventEmmiter {

  constructor({ importLang, defaultLang, defaultModule }) {
    super()

    this.getTemplateLiteralTranslation =
      this.getTemplateLiteralTranslation.bind(this)

    this.templateLiteralReplaceRegex = /{(.*?)}/g
    this.nestedPathSeparator = /\./
    this.allowNestedPaths = false
    this.fallbackOnDefaultLang = false
    this.prefixUnknownPaths = false

    this.defaultLang = defaultLang
    this.defaultModule = defaultModule
    this.lang = this.defaultLang
    this.module = this.defaultModule
    this.modules = {
      [this.defaultLang]: this.defaultModule
    }

    document.documentElement.setAttribute('lang', this.defaultLang)
  }

  async setLang(lang) {
    if (lang !== this.defaultLang)
      this.modules[lang] = await importLang(lang)
    if (lang !== this.lang) {
      const from = this.lang
      this.lang = lang
      this.module = this.modules[lang]
      document.documentElement.setAttribute('lang', lang)
      this.emit('translate', from, lang)
    }
  }

  getTemplateLiteralTranslation(string) {
    return string.replace(
      this.templateLiteralReplaceRegex,
      (match, path) => this.getTranslation(path)
    )
  }

  needsFallbackTranslation(value) {
    return (
      value === undefined
      && this.fallbackOnDefaultLang
      && this.lang !== this.defaultLang
    )
  }

  getTranslation(path) {
    let translated
    if (this.allowNestedPaths) {
      let splitPath = path.split(this.nestedPathSeparator)
      translated = getDeep(this.module, splitPath)
      if (this.needsFallbackTranslation(translated))
        translated = getDeep(this.defaultModule, splitPath)
    }
    else {
      translated = this.module[path]
      if (this.needsFallbackTranslation(translated))
        translated = this.defaultModule[path]
    }

    if (translated === undefined)
      if (this.prefixUnknownPaths)
        translated = this.lang + ':' + path
      else
        translated = path

    return translated
  }

  t(strings, ...args) {
    if (args.length > 0)
      return intertwine(
        strings.map(this.getTemplateLiteralTranslation),
        args
      )
    else if (Array.isArray(strings))
      return this.getTemplateLiteralTranslation(strings[0])
    else
      return this.getTranslation(strings)
  }

  translate(Component) {
    const i18nInstance = this

    const HOC = class extends React.Component {
      constructor() {
        super()
        this.forceUpdateOnTranslation = () =>
          this.mountedOrMounting && this.forceUpdate()
      }
      componentDidMount() {
        this.mountedOrMounting = true
        i18nInstance.on('translate', this.forceUpdateOnTranslation)
      }
      componentWillUnmount() {
        this.mountedOrMounting = false
        i18nInstance.remove('translate', this.forceUpdateOnTranslation)
      }
      render() {
        return (
          <Component
            {...this.props}
            lang={i18nInstance.lang}
          />
        )
      }
    }
    HOC.displayName = `Translated(${
      Component.displayName || Component.name || 'Component'
    })`
    return HOC
  }

}

const instance = new I18n({
  importLang,
  defaultLang,
  defaultModule
})

export default instance