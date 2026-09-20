import styles from "./SiteCard.module.css";
import type { Site } from "../../types";

interface SiteCardProps {
  site: Site;
}

export default function SiteCard({ site }: SiteCardProps) {
  return (
    <a
      className={styles.siteCard}
      href={site.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className={styles.siteCardImgWrapper}>
        <img
          className={styles.siteCardImg}
          src={site.screenshot}
          alt={`Screenshot of ${site.title}`}
          loading="lazy"
        />
      </div>
      <div className={styles.siteCardBody}>
        <h3 className={styles.siteCardTitle}>{site.title}</h3>
        <p className={styles.siteCardDesc}>{site.description}</p>
        <span className={styles.siteCardLink}>Visit site →</span>
      </div>
    </a>
  );
}
