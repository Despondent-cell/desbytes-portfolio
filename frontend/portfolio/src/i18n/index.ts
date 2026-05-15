import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import pl from "./locales/pl.json";

i18n
  // LanguageDetector sprawdza kolejno: localStorage, navigator.language, html[lang].
  // Dzięki temu wybrany język przeżywa odświeżenie strony.
  .use(LanguageDetector)

  // initReactI18next wstrzykuje i18n do kontekstu Reacta,
  // żeby hook useTranslation() działał w każdym komponencie.
  .use(initReactI18next)

  .init({
    // Zasoby tłumaczeń ładowane statycznie (bez requestów HTTP).
    // Alternatywą byłoby lazy loading z backendu, ale przy dwóch plikach
    // JSON to niepotrzebna komplikacja.
    resources: {
      en: { translation: en },
      pl: { translation: pl },
    },

    // Fallback gdy wybrany język nie ma danego klucza.
    // Zamiast pustego stringa wyświetli angielski tekst.
    fallbackLng: "en",

    // Obsługiwane języki — LanguageDetector zignoruje inne.
    supportedLngs: ["en", "pl"],

    // Wyłącza escape HTML w tłumaczeniach (React sam to robi przez JSX).
    interpolation: {
      escapeValue: false,
    },

    // Klucz w localStorage gdzie LanguageDetector zapisuje wybrany język.
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "desbytes-lang",
    },
  });

export default i18n;
