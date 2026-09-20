import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { translations } from "../data/translations";
import type { Lang } from "../types";

interface LanguageContextValue {
  lang: Lang;
  toggleLang: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(
    () => (localStorage.getItem("lang") as Lang | null) || "en",
  );

  useEffect(() => {
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang === "gr" ? "el" : "en";
  }, [lang]);

  const toggleLang = () => setLang((prev) => (prev === "en" ? "gr" : "en"));

  const t = (key: string) => translations[lang]?.[key] ?? key;

  const value: LanguageContextValue = { lang, toggleLang, t };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
