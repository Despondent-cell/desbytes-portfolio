import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Landing.css";

const Landing = () => {
  // useTranslation() zwraca funkcję t() do pobierania tłumaczeń
  // oraz obiekt i18n z aktualnym stanem języka.
  // Gdy użytkownik zmieni język w Navbar, React rerenderuje komponent
  // i t() zwraca stringi z nowego języka.
  const { t } = useTranslation();

  return (
    <main className="landing">
      <div className="landing-content">
        <span className="landing-badge">{t("landing.badge")}</span>
        <h1 className="landing-title">
          {t("landing.title")} <span className="accent">{t("landing.name")}</span>
        </h1>
        <p className="landing-tagline">{t("landing.tagline")}</p>
        <p className="landing-description">{t("landing.description")}</p>
        <div className="landing-actions">
          <Link to="/projects" className="btn btn-primary">
            {t("landing.ctaProjects")}
          </Link>
          <Link to="/contact" className="btn btn-secondary">
            {t("landing.ctaContact")}
          </Link>
        </div>
      </div>

      <div className="landing-scroll-hint">
        <span>{t("landing.scrollHint")}</span>
        <div className="scroll-arrow" />
      </div>
    </main>
  );
};

export default Landing;
