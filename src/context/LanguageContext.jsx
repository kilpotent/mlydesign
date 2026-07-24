import { createContext, useContext, useState, useEffect } from "react";
import { translations } from "../data/translations";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem("lang") || "en");

  useEffect(() => {
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang === "gr" ? "el" : "en";
  }, [lang]);

  const toggleLang = () => setLang((prev) => (prev === "en" ? "gr" : "en"));

  const t = (key) => translations[lang]?.[key] ?? key;

  const value = { lang, toggleLang, t };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
