import { useLanguage } from "../context/LanguageContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SitesGrid from "../components/SitesGrid";

export default function Sites() {
  const { t } = useLanguage();

  return (
    <>
      <Header />
      <main>
        <section className="sites-section" aria-label="Websites we have built">
          <h1 className="sites-heading">{t("sites_title")}</h1>
          <p className="sites-sub">{t("sites_sub")}</p>
          <SitesGrid />
        </section>
      </main>
      <Footer />
    </>
  );
}
