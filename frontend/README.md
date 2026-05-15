# Desbytes Portfolio

Portfolio website built with React, TypeScript, and Vite.

---

## PL — Polski

### Opis

Desbytes to portfolio developerskie. Frontend to SPA w React serwowany przez Nginx na AWS EC2, z Cloudflare jako warstwą cachingu.

### Stos technologiczny

- **Frontend:** React 19, TypeScript, Vite, React Router, i18next
- **Backend (planowany):** Java 17, Spring Boot 4.0
- **Infrastruktura:** AWS EC2, Nginx, Cloudflare, Let's Encrypt SSL
- **CI/CD:** GitHub Actions (automatyczny deploy na push do master)
- **Formularz kontaktowy:** Cloudflare Worker + Resend API

### Funkcje

- Landing page z hero i CTA
- Projekty z kartami i szczegółami (`/projects/:slug`)
- Strona About z opisem i skillami
- Formularz kontaktowy (honeypot + walidacja)
- i18n — PL i EN
- Responsywny interfejs z hamburger menu
- Design system oparty na CSS Variables (teal na ciemnym tle)

### Uruchomienie lokalne

```bash
cd portfolio
npm install
npm run dev
```

### Build produkcyjny

```bash
npm run build
```

---

## ENG — English

### Description

Desbytes is a personal developer portfolio. A React SPA served by Nginx on AWS EC2 behind Cloudflare.

### Tech Stack

- **Frontend:** React 19, TypeScript, Vite, React Router, i18next
- **Backend (planned):** Java 17, Spring Boot 4.0
- **Infrastructure:** AWS EC2, Nginx, Cloudflare, Let's Encrypt SSL
- **CI/CD:** GitHub Actions (auto-deploy on push to master)
- **Contact form:** Cloudflare Worker + Resend API

### Features

- Landing page with hero section and CTAs
- Project cards with detail view (`/projects/:slug`)
- About page with bio and skills
- Contact form with spam protection
- i18n — EN and PL
- Responsive UI with hamburger menu
- CSS Variables design system (teal on dark)

### Running Locally

```bash
cd portfolio
npm install
npm run dev
```

### Production Build

```bash
npm run build
```
