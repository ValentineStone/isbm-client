const langs = {
  en: () => import('./en.ini'),
  ru: () => import('./ru.ini'),
}

export const importLang = lang => {
  if (lang in langs)
    return langs[lang]().then(v => v.default)
  else
    throw new Error('Unknown lang: ' + lang)
}