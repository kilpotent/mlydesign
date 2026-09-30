import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useLanguage } from "../../context/LanguageContext";
import styles from "./Contact.module.css";

const CONTACT_EMAIL = "mlydsg@hotmail.com";
const CONTACT_PHONE = "+30 698 738 7416";

export default function Contact() {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // There's no backend to send mail from, so submitting hands the message to
  // the visitor's own mail app, prefilled and addressed to us.
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Message from ${name || "the website"}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
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
        <button type="submit" className={styles.submitBtn}>
          {t("contact_submit")}
        </button>
      </form>
    </section>
  );
}
