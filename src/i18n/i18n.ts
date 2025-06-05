import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { LANGUAGES } from '@/constants/language';

// Import all translation files
import enCommon from './locales/en/common.json';
import zhTwCommon from './locales/zh-tw/common.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      [LANGUAGES.EN]: {
        common: enCommon,
      },
      [LANGUAGES.ZH_TW]: {
        common: zhTwCommon,
      },
    },
    fallbackLng: LANGUAGES.EN,
    supportedLngs: [LANGUAGES.EN, LANGUAGES.ZH_TW],
    interpolation: {
      escapeValue: false,
    },
    defaultNS: 'common',
  });

export default i18n;
