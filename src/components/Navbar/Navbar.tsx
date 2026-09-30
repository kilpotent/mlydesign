import { useState } from "react";
import type { MouseEvent } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import styles from "./Navbar.module.css";

/* Rendered twice: in the header on desktop, inside the burger menu on mobile
   (CSS decides which one is visible). */
function UtilityLinks() {
  const { lang, toggleLang } = useLanguage();

  return (
    <button
      className={styles.langToggle}
      aria-label="Switch language"
      onClick={toggleLang}
    >
      {lang === "en" ? "GR" : "EN"}
    </button>
  );
}

export default function Navbar() {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const { t } = useLanguage();
  const location = useLocation();

  const isAboutPage = location.pathname === "/about";
  const isHomePage = location.pathname === "/";

  const closeBurger = () => setIsBurgerOpen(false);

  const handleSectionLink = (e: MouseEvent, sectionId: string) => {
    closeBurger();
    if (isHomePage) {
      e.preventDefault();
      document
        .getElementById(sectionId)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className={styles.menuContainer} role="banner">
      <button
        className={`${styles.burger} ${isBurgerOpen ? styles.open : ""}`}
        aria-label="Open navigation menu"
        aria-expanded={isBurgerOpen}
        aria-controls="burgerMenu"
        onClick={() => setIsBurgerOpen((prev) => !prev)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav
        className={`${styles.burgerMenu} ${isBurgerOpen ? styles.open : ""}`}
        id="burgerMenu"
        aria-label="Main navigation"
        aria-hidden={!isBurgerOpen}
      >
        <Link to="/#portfolio" onClick={(e) => handleSectionLink(e, "portfolio")}>
          {t("nav_projects")}
        </Link>
        <Link to="/#services" onClick={(e) => handleSectionLink(e, "services")}>
          {t("nav_services")}
        </Link>
        <Link to="/#reviews" onClick={(e) => handleSectionLink(e, "reviews")}>
          {t("nav_reviews")}
        </Link>
        <Link
          to="/about"
          onClick={closeBurger}
          className={isAboutPage ? styles.active : ""}
        >
          {t("nav_about")}
        </Link>
        <div className={styles.menuExtras}>
          <UtilityLinks />
        </div>
      </nav>

      <Link to="/" className={styles.logoLink}>
        <img
          className={styles.logoImg}
          src="/images/white_black-logo.png"
          alt="Maria Limperi — Graphic Designer logo"
          width="120"
          height="60"
        />
      </Link>

      <nav className={styles.utilityNav} aria-label="Language">
        <UtilityLinks />
      </nav>
    </header>
  );
}
