import { useEffect, useState, useCallback, useRef } from "react";
import styles from "./ReviewsGrid.module.css";
import type { Review } from "../../types";

const SUPABASE_URL = "https://fryjgcdjunpqbsspfihz.supabase.co";
const SUPABASE_KEY = "sb_publishable_JpAGhkX4XE5leelqetCn7Q_W2VUNk75";

interface ReviewsGridProps {
  refreshKey: number;
}

export default function ReviewsGrid({ refreshKey }: ReviewsGridProps) {
  const [reviews, setReviews] = useState<Review[] | null>(null);
  const [error, setError] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const loadReviews = useCallback(() => {
    fetch(`${SUPABASE_URL}/rest/v1/reviews?approved=eq.true&order=id.desc`, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => {
        console.error("Reviews load error:", err);
        setError(true);
      });
  }, []);

  useEffect(() => {
    loadReviews();
  }, [loadReviews, refreshKey]);

  const scrollByCards = (direction: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>(`.${styles.reviewCard}`);
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const amount = card ? card.offsetWidth + gap : track.clientWidth;
    track.scrollBy({ left: direction * amount, behavior: "smooth" });
  };

  return (
    <>
      <p className={styles.reviewsLabel}>Your Reviews</p>
      <h3 className={styles.reviewsTitle}>What clients say</h3>
      <div className={styles.carousel}>
        <button
          type="button"
          className={styles.arrowBtn}
          onClick={() => scrollByCards(-1)}
          aria-label="Previous reviews"
        >
          ←
        </button>

        <div className={styles.reviewsGrid} ref={trackRef}>
          {error && <p className={styles.reviewsLoading}>Could not load reviews.</p>}
          {!error && reviews === null && (
            <p className={styles.reviewsLoading}>Loading reviews...</p>
          )}
          {!error && reviews?.length === 0 && (
            <p className={styles.reviewsLoading}>No reviews yet.</p>
          )}
          {reviews?.map((row) => (
            <div className={styles.reviewCard} key={row.id}>
              <div className={styles.reviewQuote}>"</div>
              <p className={styles.reviewText}>{row.review}</p>
              <p className={styles.reviewAuthor}>{row.name}</p>
              <p className={styles.reviewStars}>
                {"★".repeat(row.rating)}
                {"☆".repeat(5 - row.rating)}
              </p>
            </div>
          ))}
        </div>

        <button
          type="button"
          className={styles.arrowBtn}
          onClick={() => scrollByCards(1)}
          aria-label="Next reviews"
        >
          →
        </button>
      </div>
    </>
  );
}
