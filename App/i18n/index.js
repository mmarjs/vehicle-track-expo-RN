import I18n from 'ex-react-native-i18n';

/*
Make sure to have something like this on main page
This will load translations before rendering

async componentWillMount() {
  // Load translations
  await I18n.initAsync();
}
*/

const enTranslation = require('./en.json');
const frTranslation = require('./fr.json');

I18n.fallbacks = true;

I18n.translations = {
  en: enTranslation,
  fr: frTranslation,
};

export default I18n;
