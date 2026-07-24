import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ReviewForm from "../components/ReviewForm";
import ReviewsGrid from "../components/ReviewsGrid";

export default function About() {
  const { t } = useLanguage();
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <>
      <Header />
      <main>
        <section
          className="about-section"
          aria-label="About Maria Limperi Graphic Designer"
        >
          <h1>MARIA LIMPERI</h1>
          <h2>{t("about_h2")}</h2>
          <div className="about-container">
            <p>{t("about_p1")}</p>
            <p>{t("about_p2")}</p>
            <p>{t("about_p3")}</p>
            <p>{t("about_p4")}</p>
          </div>
        </section>

        <section className="contact" aria-label="Contact information">
          <div>
            <img
              className="icon"
              src="/icons/phone.png"
              alt=""
              aria-hidden="true"
              width="25"
              height="25"
            />
            <a href="tel:+306987387416">+30 698 738 7416</a>
          </div>
          <div>
            <img
              className="icon"
              src="/icons/mail.png"
              alt=""
              aria-hidden="true"
              width="25"
              height="25"
            />
            <a href="mailto:mlydsg@hotmail.com">mlydsg@hotmail.com</a>
          </div>
          <div>
            <img
              className="icon"
              src="/icons/insta.png"
              alt=""
              aria-hidden="true"
              width="25"
              height="25"
            />
            <img
              className="icon"
              src="/icons/fb.png"
              alt=""
              aria-hidden="true"
              width="25"
              height="25"
            />
            <a
              href="https://www.instagram.com/maria.lymperi"
              target="_blank"
              rel="noopener noreferrer"
            >
              mly.dsg
            </a>
          </div>
        </section>

        <section className="reviews-section" aria-label="Client reviews">
          <ReviewForm onSubmitted={() => setRefreshKey((k) => k + 1)} />
          <ReviewsGrid refreshKey={refreshKey} />
        </section>
      </main>
      <Footer />
    </>
  );
}
