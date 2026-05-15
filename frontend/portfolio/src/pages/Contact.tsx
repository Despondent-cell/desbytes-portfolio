import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./Contact.css";

// Limity znaków — zsynchronizowane z walidacją w Workerze
const LIMITS = {
  name:    { min: 2,  max: 100  },
  message: { min: 10, max: 2000 },
};

const SOCIAL_LINKS = [
  { label: "GitHub",   href: "https://github.com/Despondent-cell"          },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/artur-krysiak" },
];

type Status      = "idle" | "sending" | "success" | "error";
type FieldErrors = { name?: string; email?: string; message?: string };

const Contact = () => {
  const { t } = useTranslation();
  const [name,    setName]    = useState("");
  const [email,   setEmail]   = useState("");
  const [message, setMessage] = useState("");
  const [status,  setStatus]  = useState<Status>("idle");
  const [errors,  setErrors]  = useState<FieldErrors>({});

  // Walidacja po stronie frontendu — komunikaty przez i18n (EN/PL)
  const validate = (): FieldErrors => {
    const v = t;
    const e: FieldErrors = {};

    if (!name.trim())
      e.name = v("contact.form.validation.required");
    else if (name.trim().length < LIMITS.name.min)
      e.name = v("contact.form.validation.nameTooShort");
    else if (name.length > LIMITS.name.max)
      e.name = v("contact.form.validation.nameTooLong");

    if (!email.trim())
      e.email = v("contact.form.validation.required");
    else if (!email.includes("@") || !email.includes("."))
      e.email = v("contact.form.validation.emailInvalid");

    if (!message.trim())
      e.message = v("contact.form.validation.required");
    else if (message.trim().length < LIMITS.message.min)
      e.message = v("contact.form.validation.messageTooShort");
    else if (message.length > LIMITS.message.max)
      e.message = v("contact.form.validation.messageTooLong");

    return e;
  };

  // Czyści błąd konkretnego pola gdy użytkownik zaczyna pisać
  const clearError = (field: keyof FieldErrors) => {
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fieldErrors = validate();
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    // Odczyt honeypot — ukryte pole widoczne tylko dla botów
    const form     = e.currentTarget;
    const honeypot = (form.elements.namedItem("website") as HTMLInputElement)?.value;

    setStatus("sending");
    setErrors({});

    try {
      const res = await fetch("/api/contact", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ name, email, message, website: honeypot }),
      });

      if (res.ok) {
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <main className="page contact">
      <div className="page-inner">
        <h2 className="page-title">{t("contact.title")}</h2>
        <p className="page-subtitle">{t("contact.subtitle")}</p>

        <div className="contact-layout">
          <div className="contact-info">
            <p>{t("contact.intro")}</p>

            <a href="mailto:contact@desbytes.com" className="contact-email">
              contact@desbytes.com
            </a>

            {/* Linki zewnętrzne otwieramy w nowej karcie.
                rel="noreferrer" jest wymagany przy target="_blank" —
                blokuje dostęp otwieranej strony do window.opener */}
            <div className="contact-social">
              <span className="contact-social-label">{t("contact.social")}</span>
              <div className="contact-social-links">
                {SOCIAL_LINKS.map(({ label, href }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer" className="social-link">
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* noValidate wyłącza natywną walidację przeglądarki (która używa języka systemu).
              Własna walidacja przez i18n zapewnia poprawny język komunikatów. */}
          <form className="contact-form" onSubmit={handleSubmit} noValidate>

            {/* Honeypot — niewidoczne dla użytkownika, boty je wypełniają.
                tabIndex={-1} wyklucza pole z nawigacji klawiaturą.
                Worker odrzuca request jeśli pole ma wartość. */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              style={{ display: "none" }}
            />

            <div className="form-group">
              <label htmlFor="name">{t("contact.form.name")}</label>
              <input
                id="name"
                type="text"
                placeholder={t("contact.form.namePlaceholder")}
                value={name}
                onChange={(e) => { setName(e.target.value); clearError("name"); }}
                maxLength={LIMITS.name.max}
                aria-invalid={!!errors.name}
              />
              {errors.name && <span className="field-error">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">{t("contact.form.email")}</label>
              <input
                id="email"
                type="email"
                placeholder={t("contact.form.emailPlaceholder")}
                value={email}
                onChange={(e) => { setEmail(e.target.value); clearError("email"); }}
                maxLength={254}
                aria-invalid={!!errors.email}
              />
              {errors.email && <span className="field-error">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="message">{t("contact.form.message")}</label>
              <textarea
                id="message"
                rows={5}
                placeholder={t("contact.form.messagePlaceholder")}
                value={message}
                onChange={(e) => { setMessage(e.target.value); clearError("message"); }}
                maxLength={LIMITS.message.max}
                aria-invalid={!!errors.message}
              />
              <span className="char-counter">{message.length} / {LIMITS.message.max}</span>
              {errors.message && <span className="field-error">{errors.message}</span>}
            </div>

            {status === "success" && (
              <p className="form-feedback form-feedback--success">
                {t("contact.form.success")}
              </p>
            )}
            {status === "error" && (
              <p className="form-feedback form-feedback--error">
                {t("contact.form.error")}
              </p>
            )}

            <button
              type="submit"
              className="btn btn-primary"
              disabled={status === "sending"}
            >
              {status === "sending" ? t("contact.form.sending") : t("contact.form.submit")}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Contact;
