"use client";

import { createContext, useContext, useEffect, useState } from "react";

const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  const [locale, setLocale] = useState(() => {
    return localStorage.getItem("locale") || "en";
  });
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    const loadTranslations = async () => {
      const response = await fetch(`/locales/${locale}.json`);
      const data = await response.json();
      setTranslations(data);
    };
    loadTranslations();

    document.documentElement.lang = locale;
  }, [locale]);

  const changeLanguage = (lang) => {
    setLocale(lang);
    localStorage.setItem("locale", lang);
  };

  return (
    <TranslationContext.Provider
      value={{
        t: (key) => translations[key] || key,
        changeLanguage,
        locale,
      }}
    >
      <div dir={locale === "en" ? "ltr" : "rtl"}>{children}</div>
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => useContext(TranslationContext);
