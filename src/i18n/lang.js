var langs = {
	de: require('./de'),
	en: require('./en'),
	es: require('./es'),
	fr: require('./fr'),
	nl: require('./nl'),
	ru: require('./ru'),
	zh: require('./zh')
};

var lang = window.navigator.language || window.navigator.userLanguage;
module.exports = langs[lang.split('-')[0]] || langs.en;
