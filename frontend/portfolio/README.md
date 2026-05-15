# Desbytes Portfolio

Portfolio website and personal project platform built with React, TypeScript, and Vite.

---

## PL — Polski

### Opis

Desbytes to portfolio developerskie oraz platforma do nauki nowych technologii. Frontend to SPA w React serwowany przez Nginx na AWS EC2, z Cloudflare jako warstwą cachingu i ochrony DDoS. Backend (Spring Boot) jest przygotowany pod przyszłe funkcje — API formularza kontaktowego i dynamiczne dane projektów.

### Stos technologiczny

- **Frontend:** React 19, TypeScript, Vite, React Router, i18next
- **Backend (planowany):** Java 17, Spring Boot 4.0
- **Infrastruktura:** AWS EC2, Nginx, Cloudflare, Let's Encrypt SSL
- **CI/CD:** GitHub Actions (automatyczny deploy na push do master)
- **Formularz kontaktowy:** Cloudflare Worker + Resend API

### Dostępne funkcje

- Landing page z hero i CTA
- Strona **Projects** z kartami projektów i szczegółami (`/projects/:slug`)
- Strona **About** z opisem i skillami
- **Formularz kontaktowy** z ochroną antyspamową (honeypot + walidacja)
- **Internacjonalizacja** — język polski i angielski (i18next + react-i18next)
- Responsywny interfejs z hamburger menu
- Design system oparty na CSS Variables (paleta teal na ciemnym tle)
- CI/CD — automatyczny build i deploy przez GitHub Actions

### Uruchomienie lokalne

Wymagania: Node.js 20+

```bash
cd frontend/portfolio
npm install
npm run dev
```

Aplikacja uruchamia się na `http://localhost:5173`.

### Build produkcyjny

```bash
npm run build
```

Pliki trafiają do `dist/`, gotowe do serwowania przez Nginx.

---

## ENG — English

### Description

Desbytes is a personal developer portfolio and a platform for exploring new technologies. The frontend is a React SPA served by Nginx on AWS EC2, with Cloudflare providing caching and DDoS protection. The backend (Spring Boot) is set up for future features — a contact form API and dynamic project data.

### Tech Stack

- **Frontend:** React 19, TypeScript, Vite, React Router, i18next
- **Backend (planned):** Java 17, Spring Boot 4.0
- **Infrastructure:** AWS EC2, Nginx, Cloudflare, Let's Encrypt SSL
- **CI/CD:** GitHub Actions (auto-deploy on push to master)
- **Contact form:** Cloudflare Worker + Resend API

### Features

- Landing page with hero section and CTAs
- **Projects** page with project cards and detail view (`/projects/:slug`)
- **About** page with bio and skills grid
- **Contact form** with spam protection (honeypot + validation)
- **Internationalization** — Polish and English (i18next + react-i18next)
- Responsive UI with hamburger menu
- CSS Variables design system (teal palette on dark background)
- CI/CD — automatic build and deploy via GitHub Actions

### Running Locally

Requirements: Node.js 20+

```bash
cd frontend/portfolio
npm install
npm run dev
```

Application starts at `http://localhost:5173`.

### Production Build

```bash
npm run build
```

Output goes to `dist/`, ready to be served by Nginx.
