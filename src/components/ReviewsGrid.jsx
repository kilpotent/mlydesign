import { useEffect, useState, useCallback } from "react";

const SUPABASE_URL = "https://fryjgcdjunpqbsspfihz.supabase.co";
const SUPABASE_KEY = "sb_publishable_JpAGhkX4XE5leelqetCn7Q_W2VUNk75";

export default function ReviewsGrid({ refreshKey }) {
  const [reviews, setReviews] = useState(null);
  const [error, setError] = useState(false);

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

  return (
    <>
      <p className="reviews-label">Your Reviews</p>
      <h3 className="reviews-title">What clients say</h3>
      <div className="reviews-grid">
        {error && <p className="reviews-loading">Could not load reviews.</p>}
        {!error && reviews === null && (
          <p className="reviews-loading">Loading reviews...</p>
        )}
        {!error && reviews?.length === 0 && (
          <p className="reviews-loading">No reviews yet.</p>
        )}
        {reviews?.map((row) => (
          <div className="review-card" key={row.id}>
            <div className="review-quote">"</div>
            <p className="review-text">{row.review}</p>
            <div className="review-footer">
              <div className="review-avatar">
                {row.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="review-author">{row.name}</p>
                <p className="review-stars">
                  {"★".repeat(row.rating)}
                  {"☆".repeat(5 - row.rating)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
