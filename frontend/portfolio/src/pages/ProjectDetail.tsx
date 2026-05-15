import { useParams, Navigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PROJECTS } from "../data/projects";
import "./ProjectDetail.css";

const ProjectDetail = () => {
  const { t } = useTranslation();

  // useParams() wyciąga zmienne z URL — tu `:slug` z trasy /projects/:slug.
  // Typ jest string | undefined bo TypeScript nie wie, czy param istnieje.
  const { slug } = useParams<{ slug: string }>();

  // Szukamy projektu po slugu. find() zwraca undefined jeśli nie znajdzie.
  const project = PROJECTS.find((p) => p.slug === slug);

  // Nieznany slug — zamiast wyświetlać pustą stronę, przekierowujemy.
  // replace zapobiega dodaniu nieistniejącej trasy do historii przeglądarki.
  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  // Highlights to tablica stringów z pliku tłumaczeń.
  // t() z opcją returnObjects: true zwraca tablicę zamiast stringa.
  const highlights = t(`projects.data.${project.slug}.highlights`, {
    returnObjects: true,
  }) as string[];

  return (
    <main className="page project-detail">
      <div className="page-inner">
        {/* Link powrotny — używamy <Link> zamiast window.history.back()
            żeby zachować spójność z React Routerem */}
        <Link to="/projects" className="back-link">
          {t("projects.backToProjects")}
        </Link>

        <div className="project-detail-header">
          <div className="project-detail-title-row">
            <h2 className="page-title">{project.title}</h2>
            <span className={`project-status project-status--${project.status}`}>
              {t(`projects.status.${project.status}`)}
            </span>
          </div>
          <p className="project-detail-desc">
            {t(`projects.data.${project.slug}.fullDesc`)}
          </p>
        </div>

        {/* Highlights — renderujemy tylko jeśli tablica nie jest pusta */}
        {highlights.length > 0 && (
          <section className="project-section">
            <h3 className="project-section-title">{t("projects.highlights")}</h3>
            <ul className="highlights-list">
              {highlights.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        <section className="project-section">
          <h3 className="project-section-title">{t("projects.techStack")}</h3>
          <ul className="project-tags">
            {project.tags.map((tag) => (
              <li key={tag} className="skill-tag">
                {tag}
              </li>
            ))}
          </ul>
        </section>

        {/* Linki zewnętrzne — sekcja renderuje się tylko gdy istnieje
            co najmniej jeden link */}
        {(project.githubUrl || project.liveUrl) && (
          <section className="project-section project-links">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary"
              >
                {t("projects.links.github")} ↗
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
              >
                {t("projects.links.live")} ↗
              </a>
            )}
          </section>
        )}
      </div>
    </main>
  );
};

export default ProjectDetail;
