import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PortfolioGrid from "../components/PortfolioGrid";
import ImageModal from "../components/ImageModal";
import ScrollTopButton from "../components/ScrollTopButton";

export default function Home() {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState(null);

  const scrollToPortfolio = () => {
    document
      .getElementById("portfolio")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <Header />
      <main>
        <section className="intro-container" aria-label="Introduction">
          <p
            className="intro"
            dangerouslySetInnerHTML={{ __html: t("intro") }}
          />
          <p className="intro-sub">{t("intro_sub")}</p>
          <button
            className="click-here"
            onClick={scrollToPortfolio}
            aria-label="Scroll to portfolio"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              fill="currentColor"
              viewBox="0 0 16 16"
              aria-hidden="true"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293z" />
            </svg>
          </button>
        </section>

        <PortfolioGrid onImageClick={setSelectedImage} />
      </main>

      <ImageModal
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
      <ScrollTopButton />
      <Footer />
    </>
  );
}
