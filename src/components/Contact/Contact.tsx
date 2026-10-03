import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useLanguage } from "../../context/LanguageContext";
import styles from "./Contact.module.css";

const CONTACT_PHONE = "+30 698 738 7416";

// Forwards submissions to mlydsg@hotmail.com via Formspree.
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mljdqawe";

interface FormMessage {
  text: string;
  type: "" | "success" | "error";
}

export default function Contact() {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [formMessage, setFormMessage] = useState<FormMessage>({ text: "", type: "" });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      setFormMessage({ text: t("contact_error_fields"), type: "error" });
      return;
    }

    setSending(true);
    setFormMessage({ text: "", type: "" });
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) throw new Error("Submission failed");

      setFormMessage({ text: t("contact_success"), type: "success" });
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setFormMessage({ text: t("contact_error"), type: "error" });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className={styles.contactSection} aria-label="Contact">
      <h2 className={styles.contactTitle}>{t("contact_title")}</h2>

      <p className={styles.phone}>
        <i className="bi bi-phone" aria-hidden="true"></i>
        <a href={`tel:${CONTACT_PHONE.replace(/\s+/g, "")}`}>{CONTACT_PHONE}</a>
      </p>

      <form
        id="contactForm"
        className={styles.contactForm}
        noValidate
        onSubmit={handleSubmit}
      >
        <div className={styles.formRow}>
          <input
            type="text"
            placeholder={t("contact_name_placeholder")}
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            required
          />
        </div>
        <div className={styles.formRow}>
          <input
            type="email"
            placeholder={t("contact_email_placeholder")}
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.formRow}>
          <textarea
            rows={5}
            placeholder={t("contact_message_placeholder")}
            value={message}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={sending} className={styles.submitBtn}>
          {sending ? t("contact_sending") : t("contact_submit")}
        </button>
        {formMessage.text && (
          <p
            className={`${styles.formMessage} ${formMessage.type === "success" ? styles.success : styles.error}`}
          >
            {formMessage.text}
          </p>
        )}
      </form>
    </section>
  );
}
