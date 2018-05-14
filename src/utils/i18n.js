import React from 'react'

import EventEmmiter from '~/utils/tiny-events'

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

export default class I18n extends EventEmmiter {

  constructor({
    importLang,
    defaultLang,
    initialLang,
    templateLiteralReplaceRegex = /{(.*?)}/g,
    nestedPathSeparator = /\./,
    allowNestedPaths = false,
    fallbackOnDefaultLang = true,
    prefixUnknownPaths = false,
    setHTMLLangAttribute = true,
    onReady
  }) {
    super()

    this.importLang = importLang
    this.defaultLang = defaultLang
    this.templateLiteralReplaceRegex = templateLiteralReplaceRegex
    this.nestedPathSeparator = nestedPathSeparator
    this.allowNestedPaths = allowNestedPaths
    this.fallbackOnDefaultLang = fallbackOnDefaultLang
    this.prefixUnknownPaths = prefixUnknownPaths
    this.setHTMLLangAttribute = setHTMLLangAttribute
    this.defaultLangLoaded = false

    this.defaultLang = defaultLang
    this.defaultModule = undefined
    this.lang = undefined
    this.module = undefined
    this.modules = {}

    this.t = this.t.bind(this)
    this.getTemplateLiteralTranslation =
      this.getTemplateLiteralTranslation.bind(this)



    this.translationQueue = Promise.resolve()
    this.translationQueue = this.setLang(this.defaultLang)
      .then(() => this.defaultModule = this.module)

    if (initialLang)
      this.setLang(initialLang)
    this.getTranslationQueue().then(onReady)
  }

  getTranslationQueue() {
    return this.translationQueue
  }

  setLang(lang) {
    return this.translationQueue = this.translationQueue
      .then(() => this.importLang(lang))
      .then(module => {
        if (lang !== this.lang) {
          this.modules[lang] = module

          const prevLang = this.lang
          this.lang = lang
          this.module = this.modules[lang]

          if (this.setHTMLLangAttribute)
            document.documentElement.setAttribute('lang', lang)

          return prevLang
        }
      })
      .then(prevLang => prevLang && this.emit('translate', lang, prevLang))
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
      if (strings[1] === true)
        return this.getTemplateLiteralTranslation(strings[0])
      else
        return this.getTranslation(strings[0])
    else
      return this.getTranslation(strings)
  }

  toJSON() {
    return this.toString()
  }
}