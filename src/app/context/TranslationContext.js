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
      <div>{children}</div>
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => useContext(TranslationContext);
