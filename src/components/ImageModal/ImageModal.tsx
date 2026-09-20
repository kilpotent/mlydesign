import type { MouseEvent } from "react";
import styles from "./ImageModal.module.css";
import type { PortfolioItem } from "../../types";

interface ImageModalProps {
  image: PortfolioItem | null;
  onClose: () => void;
}

export default function ImageModal({ image, onClose }: ImageModalProps) {
  if (!image) return null;

  return (
    <div
      id="image-modal"
      className={styles.modal}
      role="dialog"
      aria-modal="true"
      aria-label="Portfolio image viewer"
      aria-hidden="false"
      style={{ display: "block" }}
      onClick={(e: MouseEvent<HTMLDivElement>) => {
        if ((e.target as HTMLElement).id === "image-modal") onClose();
      }}
    >
      <button className={styles.close} aria-label="Close image" onClick={onClose}>
        &times;
      </button>
      <img
        className={styles.modalContent}
        src={image.full || image.src}
        alt={image.alt || ""}
      />
    </div>
  );
}
