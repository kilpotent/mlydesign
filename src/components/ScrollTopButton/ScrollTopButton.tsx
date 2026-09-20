import { useEffect, useRef, useState } from "react";
import styles from "./ScrollTopButton.module.css";

export default function ScrollTopButton() {
  const [show, setShow] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 300);
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      btnRef.current?.style.setProperty(
        "--progress",
        `${Math.min(100, Math.max(0, progress))}%`,
      );
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      ref={btnRef}
      id="scrollTopBtn"
      className={`${styles.scrollTopBtn} ${show ? styles.show : ""}`}
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        fill="currentColor"
        viewBox="0 0 16 16"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M8 12a.5.5 0 0 0 .5-.5V4.707l2.147 2.147a.5.5 0 0 0 .706-.708l-3-3a.5.5 0 0 0-.706 0l-3 3a.5.5 1 0 0 .706.708L7.5 4.707V11.5A.5.5 0 0 0 8 12"
        />
      </svg>
    </button>
  );
}
