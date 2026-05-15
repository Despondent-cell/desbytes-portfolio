import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PROJECTS } from "../data/projects";
import "./Projects.css";

const Projects = () => {
  const { t } = useTranslation();

  return (
    <main className="page projects">
      <div className="page-inner">
        <h2 className="page-title">{t("projects.title")}</h2>
        <p className="page-subtitle">{t("projects.subtitle")}</p>

        <div className="projects-grid">
          {PROJECTS.map((project) => (
            // Cała karta jest linkiem do strony szczegółów.
            // Używamy <Link> zamiast <a> żeby nawigacja była obsługiwana
            // przez React Router (bez przeładowania strony).
            <Link
              key={project.slug}
              to={`/projects/${project.slug}`}
              className="project-card"
            >
              <div className="project-card-header">
                <h3>{project.title}</h3>
                {/* Status informuje użytkownika czy projekt jest gotowy,
                    w trakcie, czy dopiero planowany */}
                <span className={`project-status project-status--${project.status}`}>
                  {t(`projects.status.${project.status}`)}
                </span>
              </div>
              <p className="project-desc">
                {t(`projects.data.${project.slug}.shortDesc`)}
              </p>
              <ul className="project-tags">
                {project.tags.map((tag) => (
                  <li key={tag} className="skill-tag">
                    {tag}
                  </li>
                ))}
              </ul>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Projects;
