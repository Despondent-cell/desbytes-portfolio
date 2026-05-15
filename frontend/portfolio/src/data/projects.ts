// Plik zawiera wyłącznie dane nieprzetłumaczalne projektów.
// Teksty (shortDesc, fullDesc, highlights) żyją w plikach i18n:
//   src/i18n/locales/en.json → projects.data.<slug>.*
//   src/i18n/locales/pl.json → projects.data.<slug>.*
// Komponent wywołuje t(`projects.data.${slug}.shortDesc`) żeby je pobrać.

export type ProjectStatus = "live" | "in-progress" | "planned";

export interface Project {
  // slug jest jednocześnie kluczem URL (/projects/desbytes)
  // i kluczem w plikach tłumaczeń (projects.data.desbytes.*)
  slug: string;
  title: string;
  tags: string[];
  status: ProjectStatus;
  githubUrl?: string;
  liveUrl?: string;
}

// Kolejność w tablicy = kolejność wyświetlania na stronie projektów.
export const PROJECTS: Project[] = [
  {
    slug: "desbytes",
    title: "Desbytes",
    tags: ["Java", "Spring Boot", "React", "TypeScript", "Nginx", "AWS"],
    status: "in-progress",
    liveUrl: "https://desbytes.com",
    githubUrl: "https://github.com/Despondent-cell/desbytes-portfolio",
  },
  {
    slug: "learningshare",
    title: "LearningShare",
    tags: ["Java", "Spring Boot", "Thymeleaf", "Spring Security", "Liquibase", "MySQL"],
    status: "live",
    liveUrl: "https://learningshare.desbytes.com",
    githubUrl: "https://github.com/Despondent-cell/learningshare-portfolio",
  },
  {
    slug: "project-alpha",
    title: "Project Alpha",
    tags: ["Coming soon"],
    status: "planned",
  },
];
