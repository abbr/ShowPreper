var langs = {
  de: require('./de'),
  en: require('./en'),
  es: require('./es'),
  fr: require('./fr'),
  nl: require('./nl'),
  ru: require('./ru'),
  'zh-cn': require('./zh'),
  zh: require('./zh')
}

function getDefaultLang() {
  let lang
  if (typeof Storage !== 'undefined') {
    lang = localStorage.getItem('language')
  }
  if (!lang) {
    try {
      lang = (window.navigator.language || window.navigator.userLanguage).split(
        '-'
      )[0]
    } catch (ex) {}
  }
  return lang || 'en'
}

export default langs[getDefaultLang()]
export { langs, getDefaultLang }
