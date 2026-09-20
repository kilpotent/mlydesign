import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import styles from "./ReviewForm.module.css";

const SUPABASE_URL = "https://fryjgcdjunpqbsspfihz.supabase.co";
const SUPABASE_KEY = "sb_publishable_JpAGhkX4XE5leelqetCn7Q_W2VUNk75";

interface ReviewFormProps {
  onSubmitted?: () => void;
}

interface FormMessage {
  text: string;
  type: "" | "success" | "error";
}

export default function ReviewForm({ onSubmitted }: ReviewFormProps) {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState<FormMessage>({ text: "", type: "" });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim() || !text.trim() || !rating) {
      setMessage({
        text: "Please fill in all fields and select a rating.",
        type: "error",
      });
      return;
    }

    setSending(true);
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/reviews`, {
        method: "POST",
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify({ name, review: text, rating, approved: false }),
      });

      if (!res.ok) throw new Error("Submission failed");

      setMessage({
        text: "Thank you! Your review has been submitted and will appear after approval.",
        type: "success",
      });
      setName("");
      setText("");
      setRating(0);
      onSubmitted?.();
    } catch {
      setMessage({
        text: "Something went wrong. Please try again.",
        type: "error",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className={styles.reviewFormWrapper}>
      <h4 className={styles.reviewFormTitle}>Leave a review</h4>
      <form
        id="reviewForm"
        className={styles.reviewForm}
        noValidate
        onSubmit={handleSubmit}
      >
        <div className={styles.formRow}>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            required
          />
        </div>
        <div className={styles.formRow}>
          <textarea
            rows={4}
            placeholder="Your review..."
            value={text}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
            required
          />
        </div>
        <div className={`${styles.formRow} ${styles.starRow}`}>
          {[1, 2, 3, 4, 5].map((i) => (
            <span
              key={i}
              className={`${styles.starInput} ${(hoverRating || rating) >= i ? styles.selected : ""}`}
              onMouseOver={() => setHoverRating(i)}
              onMouseOut={() => setHoverRating(0)}
              onClick={() => setRating(i)}
            >
              ★
            </span>
          ))}
        </div>
        <button type="submit" disabled={sending} className={styles.submitButton}>
          {sending ? "Sending..." : "Submit review"}
        </button>
        {message.text && (
          <p className={`${styles.formMessage} ${message.type === "success" ? styles.success : styles.error}`}>
            {message.text}
          </p>
        )}
      </form>
    </div>
  );
}
