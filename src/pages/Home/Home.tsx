import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import PortfolioGrid from "../../components/PortfolioGrid/PortfolioGrid";
import Services from "../../components/Services/Services";
import ReviewForm from "../../components/ReviewForm/ReviewForm";
import ReviewsGrid from "../../components/ReviewsGrid/ReviewsGrid";
import ImageModal from "../../components/ImageModal/ImageModal";
import ScrollTopButton from "../../components/ScrollTopButton/ScrollTopButton";
import styles from "./Home.module.css";
import type { PortfolioItem } from "../../types";

export default function Home() {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<PortfolioItem | null>(null);
  const [reviewsRefreshKey, setReviewsRefreshKey] = useState(0);
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.slice(1);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [location.hash]);

  const scrollToPortfolio = () => {
    document
      .getElementById("portfolio")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <div className={styles.homeHeroBg}>
        <Navbar />
        <main>
          <section className={styles.introContainer} aria-label="Introduction">
            <p
              className={styles.intro}
              dangerouslySetInnerHTML={{ __html: t("intro") }}
            />
            <p className={styles.introSub}>{t("intro_sub")}</p>
            <button
              className={styles.clickHere}
              onClick={scrollToPortfolio}
              aria-label="Scroll to portfolio"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                fill="currentColor"
                viewBox="0 0 16 16"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                />
              </svg>
            </button>
          </section>
          <Services />
          <PortfolioGrid onImageClick={setSelectedImage} />
          <section
            id="reviews"
            className={styles.reviewsSection}
            aria-label="Client reviews"
          >
            <ReviewsGrid refreshKey={reviewsRefreshKey} />
            <ReviewForm onSubmitted={() => setReviewsRefreshKey((k) => k + 1)} />
          </section>
        </main>
      </div>

      <ImageModal
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
      <ScrollTopButton />
      <Footer />
    </>
  );
}
