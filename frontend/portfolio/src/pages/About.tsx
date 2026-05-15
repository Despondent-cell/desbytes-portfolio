import { useTranslation } from "react-i18next";
import "./About.css";

// Dane skills podzielone na kategorie zgodnie z dokumentacją Portfolio Structure.
// Struktura: { key: klucz kategorii w i18n, items: lista technologii }
// Tagi (Java, Docker...) są nazwami własnymi — nie wymagają tłumaczenia.
const SKILL_CATEGORIES = [
  {
    key: "core",
    items: ["Java", "Spring Boot", "TypeScript", "React", "Node.js", "SQL"],
  },
  {
    key: "tools",
    items: ["Docker", "Jenkins", "Nginx", "Elastic", "Postman"],
  },
  {
    key: "engineering",
    items: ["Layered architecture", "CI/CD pipelines", "JMeter", "Requirements analysis"],
  },
];

const About = () => {
  const { t } = useTranslation();

  return (
    <main className="page about">
      <div className="page-inner">
        <h2 className="page-title">{t("about.title")}</h2>

        <div className="about-bio">
          {/* Dwa osobne paragrafy dla lepszego rytmu czytania */}
          <p>{t("about.bio1")}</p>
          <p>{t("about.bio2")}</p>
        </div>

        <section className="about-skills">
          <h3 className="skills-heading">{t("about.skillsTitle")}</h3>
          <div className="skills-categories">
            {SKILL_CATEGORIES.map(({ key, items }) => (
              <div key={key} className="skills-category">
                {/* Nazwa kategorii pochodzi z i18n — tu tłumaczenie ma sens */}
                <span className="skills-category-label">
                  {t(`about.categories.${key}`)}
                </span>
                <ul className="skills-list">
                  {items.map((item) => (
                    <li key={item} className="skill-tag">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default About;
