import { useLanguage } from "../../context/LanguageContext";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import SitesGrid from "../../components/SitesGrid/SitesGrid";
import styles from "./Sites.module.css";

export default function Sites() {
  const { t } = useLanguage();

  return (
    <>
      <Navbar />
      <main>
        <section className={styles.sitesSection} aria-label="Websites we have built">
          <h1 className={styles.sitesHeading}>{t("sites_title")}</h1>
          <p className={styles.sitesSub}>{t("sites_sub")}</p>
          <SitesGrid />
        </section>
      </main>
      <Footer />
    </>
  );
}
