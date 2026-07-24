import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="site-footer">
      <p>{t("footer")}</p>
    </footer>
  );
}
