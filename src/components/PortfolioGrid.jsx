import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function PortfolioGrid({ onImageClick }) {
  const [images, setImages] = useState([]);
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
    <section
      id="portfolio"
      className="portfolio-grid"
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
    </section>
  );
}
