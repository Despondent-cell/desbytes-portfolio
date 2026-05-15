import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Navbar.css";

// Klucze do i18n zamiast hardkodowanych stringów.
// Etykiety pobierane przez t("nav.<key>") — tłumaczenia w locales/*.json.
const NAV_LINKS = [
  { to: "/", key: "home" },
  { to: "/about", key: "about" },
  { to: "/projects", key: "projects" },
  { to: "/contact", key: "contact" },
];

// Obsługiwane języki — tablica ułatwia dodanie kolejnych w przyszłości
// bez modyfikacji logiki renderowania.
const LANGUAGES = [
  { code: "en", label: "EN" },
  { code: "pl", label: "PL" },
];

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Zamknij menu przy każdej zmianie trasy — obsługuje zarówno kliknięcie
  // linku w menu, jak i nawigację przez przycisk wstecz w przeglądarce.
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // i18n.changeLanguage() podmienia aktywny język globalnie.
  // LanguageDetector zapisuje wybór w localStorage (klucz: "desbytes-lang"),
  // więc po odświeżeniu strony język pozostaje taki sam.
  const handleLanguageChange = (code: string) => {
    i18n.changeLanguage(code);
  };

  return (
    <header className="navbar">
      <NavLink to="/" className="navbar-logo">
        Desbytes
      </NavLink>

      {/* Linki nawigacji — na mobile schowane, rozwijane przez hamburger */}
      <nav className={`navbar-links${menuOpen ? " navbar-links--open" : ""}`}>
        {NAV_LINKS.map(({ to, key }) => (
          <NavLink
            key={to}
            to={to}
            // end zapobiega temu, żeby "/" był "aktywny" na każdej podstronie
            end={to === "/"}
            className={({ isActive }) =>
              isActive ? "nav-link nav-link--active" : "nav-link"
            }
          >
            {t(`nav.${key}`)}
          </NavLink>
        ))}
      </nav>

      {/* Przełącznik językowy — zawsze widoczny, wystarczająco mały na mobile */}
      <div className="navbar-lang">
        {LANGUAGES.map(({ code, label }) => (
          <button
            key={code}
            onClick={() => handleLanguageChange(code)}
            className={
              i18n.language === code
                ? "lang-btn lang-btn--active"
                : "lang-btn"
            }
            // aria-pressed komunikuje stanom czytników ekranu
            // czy dany język jest aktualnie wybrany
            aria-pressed={i18n.language === code}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Hamburger — widoczny tylko na mobile (≤640px).
          Trzy spany animowane do kształtu X gdy menu otwarte. */}
      <button
        className={`hamburger${menuOpen ? " hamburger--open" : ""}`}
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label={menuOpen ? "Zamknij menu" : "Otwórz menu"}
        aria-expanded={menuOpen}
      >
        <span />
        <span />
        <span />
      </button>
    </header>
  );
};

export default Navbar;
