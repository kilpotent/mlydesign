export default function ImageModal({ image, onClose }) {
  if (!image) return null;

  return (
    <div
      id="image-modal"
      className="modal"
      role="dialog"
      aria-modal="true"
      aria-label="Portfolio image viewer"
      aria-hidden="false"
      style={{ display: "block" }}
      onClick={(e) => {
        if (e.target.id === "image-modal") onClose();
      }}
    >
      <button className="close" aria-label="Close image" onClick={onClose}>
        &times;
      </button>
      <img
        className="modal-content"
        src={image.full || image.src}
        alt={image.alt || ""}
      />
    </div>
  );
}
