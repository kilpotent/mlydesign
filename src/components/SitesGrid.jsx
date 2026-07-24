import { useEffect, useState } from "react";
import SiteCard from "./SiteCard";

export default function SitesGrid() {
  const [sites, setSites] = useState(null);
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
    return <p className="reviews-loading">Could not load websites.</p>;
  }

  if (sites === null) {
    return <p className="reviews-loading">Loading websites...</p>;
  }

  if (sites.length === 0) {
    return <p className="reviews-loading">No websites to show yet.</p>;
  }

  return (
    <div className="sites-grid">
      {sites.map((site, i) => (
        <SiteCard key={i} site={site} />
      ))}
    </div>
  );
}
