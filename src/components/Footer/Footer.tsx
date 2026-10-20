import { useLanguage } from "../../context/LanguageContext";
import styles from "./Footer.module.css";
import logo from "../../../public/images/white-logo.png";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className={styles.siteFooter}>
      <div className={styles.footerContainer}>
        {" "}
        <a
          href="https://www.facebook.com/profile.php?id=61584868597929&locale=el_GR"
          target="_blank"
          className={`${styles.footerSocial} ${styles.socialLeft}`}
        >
          <i className="bi bi-facebook"></i> Facebook
        </a>

        <img
          src={logo}
          alt="Mly Design footer logo"
          className={styles.footerLogo}
        />

        <a
          href="https://www.instagram.com/maria.lymperi?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw=="
          target="_blank"
          className={`${styles.footerSocial} ${styles.socialRight}`}
        >
          <i className="bi bi-instagram"></i> Instagram
        </a>
      </div>
      <p>{t("footer")}</p>
    </footer>
  );
}
