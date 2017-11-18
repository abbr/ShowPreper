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

var lang = window.navigator.language || window.navigator.userLanguage
export default langs[lang.split('-')[0]] || langs.en
export { langs }
