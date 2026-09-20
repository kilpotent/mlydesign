import { useLanguage } from "../../context/LanguageContext";
import styles from "./Services.module.css";

const SERVICE_KEYS = ["branding", "logo", "print", "packaging", "website"];

export default function Services() {
  const { t } = useLanguage();

  const scrollToNext = () => {
    window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <section id="services" className={styles.services} aria-label="Services">
      <div className={styles.intro}>
        <h1>{t("services_title")}</h1>
        <p>{t("services_sub1")}</p>
        <p>{t("services_sub2")}</p>
        <img
          className={styles.tape}
          src="/images/paper-tape.png"
          alt="An idea made visible"
        />
      </div>

      <ol className={styles.list}>
        {SERVICE_KEYS.map((key, i) => (
          <li key={key} className={styles.item}>
            <span className={styles.num}>({String(i + 1).padStart(2, "0")})</span>
            <div className={styles.itemBody}>
              <h2>{t(`services_${key}_title`)}</h2>
              <p>{t(`services_${key}_desc`)}</p>
            </div>
          </li>
        ))}
      </ol>

      <button
        className={styles.arrowBtn}
        onClick={scrollToNext}
        aria-label="Scroll to next section"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          viewBox="0 0 16 16"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
          />
        </svg>
        <span className={styles.arrowBtnLabel}>{t("services_contact")}</span>
      </button>
    </section>
  );
}
