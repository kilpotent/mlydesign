import { useLanguage } from "../../context/LanguageContext";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import styles from "./About.module.css";

export default function About() {
  const { t } = useLanguage();

  return (
    <div className={styles.aboutPageBg}>
      <Navbar />
      <main>
        <section
          className={styles.aboutSection}
          aria-label="About Maria Limperi Graphic Designer"
        >
          <div className={styles.headingBlock}>
            <h1 dangerouslySetInnerHTML={{ __html: t("about_heading") }} />
            <img
              className={styles.underline}
              src="/icons/underline-icon.png"
              alt=""
              aria-hidden="true"
            />
            <p className={styles.aboutSub}>{t("about_sub")}</p>
          </div>

          <ol className={styles.numberedList}>
            <li className={styles.numberedItem}>
              <img
                className={styles.numberIcon}
                src="/icons/number-1.png"
                alt="01"
              />
              <p>{t("about_point1")}</p>
            </li>
            <li className={styles.numberedItem}>
              <img
                className={styles.numberIcon}
                src="/icons/number-2.png"
                alt="02"
              />
              <p>{t("about_point2")}</p>
            </li>
            <li className={styles.numberedItem}>
              <img
                className={styles.numberIcon}
                src="/icons/number-3.png"
                alt="03"
              />
              <p>{t("about_point3")}</p>
            </li>
          </ol>
        </section>
      </main>
      <Footer />
    </div>
  );
}
