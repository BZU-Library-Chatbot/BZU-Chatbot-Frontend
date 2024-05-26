import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import English from "./translationFiles/english";
import Arabic from "./translationFiles/arabic";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: English,
    },
    ar: {
      translation: Arabic,
    },
  },
  fallbackLng: "en",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
