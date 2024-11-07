"use client";

import { createContext, useContext, useEffect, useState } from "react";

const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  const [locale, setLocale] = useState("en");
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    const loadTranslations = async () => {
      const response = await fetch(`/locales/${locale}.json`);
      const data = await response.json();
      setTranslations(data);
    };
    loadTranslations();
  }, [locale]);

  const changeLanguage = (lang) => {
    setLocale(lang);
  };

  return (
    <TranslationContext.Provider
      value={{ t: (key) => translations[key] || key, changeLanguage, locale }}
    >
<<<<<<< HEAD
      <div dir={locale === "ar" ? "rtl" : "ltr"}>{children}</div>
=======
     <div dir={locale === "en" ? "ltr" : "rtl"}>{children}</div>
>>>>>>> aee03c118f7949eea3560d62351b461e661c0d8e
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => useContext(TranslationContext);
