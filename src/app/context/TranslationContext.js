"use client";

import { createContext, useContext, useEffect, useState } from "react";

const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  const [locale, setLocale] = useState("en");
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    // تحميل الترجمات عند تغيير اللغة
    const loadTranslations = async () => {
      const response = await fetch(`/locales/${locale}.json`);
      const data = await response.json();
      setTranslations(data);
    };
    loadTranslations();

    // تحديث خاصية lang في عنصر <html>
    document.documentElement.lang = locale;
  }, [locale]);

  const changeLanguage = (lang) => {
    setLocale(lang);
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
