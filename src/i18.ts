import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './i18n/en.json';
import viTranslation from './i18n/vi.json';


i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslation },
    vi: { translation: viTranslation }
  },
  lng: 'vi', 
  fallbackLng: 'vi', 
  interpolation: {
    escapeValue: false 
  }
});

export default i18n;