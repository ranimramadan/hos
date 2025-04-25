'use client';
import { createContext, useState, useContext, useEffect } from 'react';
import { translations } from '../translations/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('language') || 'en';
    setLang(savedLang);
    document.dir = savedLang === 'ar' ? 'rtl' : 'ltr';
  }, []);

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[lang];
    keys.forEach(k => {
      value = value?.[k];
    });
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);