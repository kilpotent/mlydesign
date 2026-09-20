import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import SitesGrid from "../SitesGrid/SitesGrid";
import styles from "./PortfolioGrid.module.css";
import type { PortfolioItem } from "../../types";

const CATEGORIES = [
  { key: "all", labelKey: "nav_all" },
  { key: "branding", labelKey: "nav_branding" },
  { key: "logo", labelKey: "nav_logo" },
  { key: "prints", labelKey: "nav_prints" },
  { key: "packaging", labelKey: "nav_packaging" },
];

interface PortfolioGridProps {
  onImageClick: (item: PortfolioItem) => void;
}

export default function PortfolioGrid({ onImageClick }: PortfolioGridProps) {
  const { t } = useLanguage();
  const [images, setImages] = useState<PortfolioItem[]>([]);
  const [searchParams] = useSearchParams();

  const rawCategory = searchParams.get("category");
  const category = rawCategory || "all";

  useEffect(() => {
    fetch("/JSON/portfolio.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load portfolio data");
        return res.json();
      })
      .then((data) => setImages(data))
      .catch((err) => console.error("Portfolio load error:", err));
  }, []);

  const visibleImages = images.filter((item) => {
    const categories = (item.category || "").split(" ");
    const isPackagingOnly = categories.includes("packaging-only");
    if (category === "all") return !isPackagingOnly;
    if (category === "packaging")
      return categories.includes("packaging") || isPackagingOnly;
    return categories.includes(category);
  });

  useEffect(() => {
    if (rawCategory) {
      document
        .getElementById("portfolio")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [rawCategory]);

  return (
    <section id="portfolio" className={styles.portfolioSection}>
      <div className={styles.header}>
        <div className={styles.headerText}>
          <h2>{t("projects_title")}</h2>
          <p>{t("projects_sub")}</p>
        </div>
        <nav className={styles.filterNav} aria-label="Filter portfolio">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.key}
              to={`/?category=${cat.key}`}
              className={category === cat.key ? styles.active : ""}
            >
              {t(cat.labelKey)}
            </Link>
          ))}
          <Link
            to="/?category=websites"
            className={category === "websites" ? styles.active : ""}
          >
            {t("nav_website_design")}
          </Link>
        </nav>
      </div>

      {category === "websites" ? (
        <div className={styles.sitesWrapper}>
          <SitesGrid />
        </div>
      ) : (
        <div
          className={styles.grid}
          aria-label="Portfolio"
          aria-live="polite"
        >
          {visibleImages.map((item, i) => (
            <img
              key={i}
              src={item.src}
              alt={item.alt || ""}
              loading="lazy"
              onClick={() => onImageClick(item)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
