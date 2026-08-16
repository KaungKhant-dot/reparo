'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'my' | 'en';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (my: string, en: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  toggleLanguage: () => {},
  t: (my, en) => en,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'my' ? 'en' : 'my');
  };

  const t = (my: string, en: string) => language === 'my' ? my : en;

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
