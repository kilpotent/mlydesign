import { useEffect, useState } from "react";
import SiteCard from "../SiteCard/SiteCard";
import styles from "./SitesGrid.module.css";
import type { Site } from "../../types";

export default function SitesGrid() {
  const [sites, setSites] = useState<Site[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/JSON/sites.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load sites data");
        return res.json();
      })
      .then((data) => setSites(data))
      .catch((err) => {
        console.error("Sites load error:", err);
        setError(true);
      });
  }, []);

  if (error) {
    return <p className={styles.loadingText}>Could not load websites.</p>;
  }

  if (sites === null) {
    return <p className={styles.loadingText}>Loading websites...</p>;
  }

  if (sites.length === 0) {
    return <p className={styles.loadingText}>No websites to show yet.</p>;
  }

  return (
    <div className={styles.sitesGrid}>
      {sites.map((site, i) => (
        <SiteCard key={i} site={site} />
      ))}
    </div>
  );
}
