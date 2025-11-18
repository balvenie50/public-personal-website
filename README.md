# public-personal-website

This repository contains the source for a personal portfolio website built with React, Vite, and Tailwind CSS.

If you intend to run this project locally, follow the steps below.

## Quickstart

Prerequisites
- Node.js (LTS, >= 18 recommended)
- npm

Setup

1. Copy environment template:

```bash
cp env.example .env
# edit .env with your credentials
```

2. Install dependencies:

```bash
npm install
```

3. Run local development (frontend + backend):

```bash
npm run dev:full
```

4. Build for production:

```bash
npm run build
# Serve with the node server
npm start
```

## Environment

- Use `env.example` as a template. Keep secrets out of git; the `.env` file is ignored by `.gitignore`.
- Client-side environment variables that should be exposed to the browser are prefixed with `VITE_`.

## Project structure

- `src/` — frontend source (React components, pages, styles)
- `server/server.js` — minimal Node server to serve the production `dist/` build
- `deploy.sh`, `ecosystem.config.cjs` — deployment helper scripts
- `env.example` — environment variable template

## Notes for public repo

- Remove any secrets from tracked files. Credentials should live in environment variables only.
- If you host this repo publicly, be mindful of any PII in files like `index.html` meta tags or README (these are okay for a public portfolio if intended).

## Contributing

PRs welcome. Open an issue first for larger changes.

## License

MIT
