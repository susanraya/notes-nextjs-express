# Developer Guide

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start status -->
_Up to date._
<!-- sdlc:auto:end status -->

<!-- sdlc:auto:start source -->
Generated from commit `f5c8ed7` · model `claude-sonnet-5`
<!-- sdlc:auto:end source -->

<!-- sdlc:auto:start overview -->
This repository is a generated two-app notes project with no login: a Next.js 15 static-export frontend containing the approved, reviewed UI screens running on seeded/local sample data, and an Express 5 + TypeScript backend that currently only exposes a health check and stubbed routes (no approved backend architecture or data model exists yet). The backend is wired for PostgreSQL 16 via Drizzle ORM (falling back to an in-memory PGlite Postgres when no DATABASE_URL is set) and is containerized with Docker; the frontend is a client-only SPA built with Tailwind CSS, Dexie (IndexedDB) for local note storage, and tested with Vitest and Playwright.
<!-- sdlc:auto:end overview -->

<!-- sdlc:auto:start prerequisites -->
- Node.js 22+ (matches backend/Dockerfile base image)
- npm
- Docker and Docker Compose (optional, for local PostgreSQL via docker-compose.yml)
<!-- sdlc:auto:end prerequisites -->

<!-- sdlc:auto:start setup -->
1. Clone the repository
2. cd frontend && npm install
3. cd backend && npm install
4. (Optional) Copy .env.example to .env and set DATABASE_URL / ALLOWED_ORIGINS as needed
5. (Optional) Start a local Postgres with: docker compose up db
<!-- sdlc:auto:end setup -->

<!-- sdlc:auto:start run -->
| Name | Command | Description |
|---|---|---|
| frontend dev | `cd frontend && npm run dev` | Runs the Next.js dev server for the frontend screens |
| frontend build | `cd frontend && npm run build` | Bundles the static export into frontend/out (no typecheck/lint gate) |
| frontend preview | `cd frontend && npm run preview` | Serves the built out/ directory on http://127.0.0.1:4173 |
| backend dev | `cd backend && npm run dev` | Runs the Express API with tsx watch on src/main.ts (defaults to 0.0.0.0:8000) |
| backend build | `cd backend && npm run build` | Compiles the backend TypeScript to dist/ via tsconfig.build.json |
| backend start | `cd backend && npm start` | Runs the compiled backend (node dist/main.js), as used in the Docker image |
<!-- sdlc:auto:end run -->

<!-- sdlc:auto:start structure -->
| Path | Purpose |
|---|---|
| `frontend/` | Next.js 15 static-export app: approved UI screens, local-only note storage |
| `frontend/src/app` | App Router pages, one page.tsx per approved screen plus root layout |
| `frontend/src/lib` | Shared UI components, icons, brand tokens, Dexie db access, navigation helpers |
| `frontend/e2e` | Playwright end-to-end specs |
| `frontend/public` | Static assets (e.g. icon.svg) |
| `backend/` | Express 5 + TypeScript API service |
| `backend/src` | App setup (app.ts), entry point (main.ts), db connection (db.ts), Drizzle schema (schema.ts), routes, stub helpers |
| `backend/tests` | Vitest tests for health check and database |
| `.devcontainer/` | VS Code devcontainer configuration |
| `.quorq/` | Platform metadata (handoff/prepared state), not application code |
<!-- sdlc:auto:end structure -->

<!-- sdlc:auto:start conventions -->
- Backend: one router per component owning endpoints, one handler per API-spec endpoint; unimplemented handlers return a placeholder via notImplemented() from stubs.ts
- Backend connects to the database lazily on first use (db()) and creates missing tables from schema.ts with CREATE TABLE IF NOT EXISTS; no migrations yet
- Backend falls back to an in-memory PGlite Postgres when DATABASE_URL is unset (used in tests/e2e); production Docker image omits this dependency
- Frontend is fully client-side: 'use client' components, no server components/route handlers/server actions (output: 'export' in next.config.ts)
- Frontend routes follow App Router convention: one page.tsx per screen under src/app/<route>/page.tsx
- Frontend build intentionally skips typecheck/lint (ignoreBuildErrors, ignoreDuringBuilds); npm run typecheck and npm run lint are the real gates
- ESLint + Prettier configured separately for frontend and backend; keep npm run lint green as the platform's development gate
- Styling via Tailwind CSS with brand tokens in src/lib/brand.ts and CSS variables in src/index.css
<!-- sdlc:auto:end conventions -->

<!-- sdlc:auto:start testing -->
| Name | Command | Description |
|---|---|---|
| frontend unit tests | `cd frontend && npm test` | Runs Vitest component tests colocated with components |
| frontend e2e tests | `cd frontend && npm run test:e2e` | Runs Playwright acceptance tests from frontend/e2e (builds/serves app locally unless E2E_BASE_URL is set) |
| install e2e browser | `cd frontend && npm run test:e2e:install` | Installs the Chromium browser required by Playwright |
| backend tests | `cd backend && npm test` | Runs Vitest tests for the health endpoint and database setup |
| frontend lint | `cd frontend && npm run lint` | Runs ESLint over the frontend app |
| backend lint | `cd backend && npm run lint` | Runs ESLint over the backend app |
<!-- sdlc:auto:end testing -->

<!-- sdlc:auto:start troubleshooting -->
| Problem | Solution |
|---|---|
| Backend API calls fail with CORS errors from the frontend dev server | Ensure the frontend origin is in the backend's default dev origins (http://localhost:5173, http://127.0.0.1:5173) or set ALLOWED_ORIGINS to a comma-separated list including your frontend URL |
| Backend fails to connect to a real database or data doesn't persist across restarts | Set DATABASE_URL (e.g. from docker compose's db service: postgresql://app:app@localhost:5432/app); without it the backend silently uses an in-memory PGlite Postgres that resets on restart |
| 'next build' succeeds but the app has type errors | Run cd frontend && npm run typecheck (tsc --noEmit) since next.config.ts disables build-time type and lint checks |
| Playwright e2e tests fail to launch a browser | Run cd frontend && npm run test:e2e:install to fetch Chromium before running npm run test:e2e |
| Backend routes other than /health and /healthz return placeholder JSON | This is expected: all routes in backend/src/routes/api.ts are stubs (notImplemented) since no backend architecture has been approved/implemented yet |
<!-- sdlc:auto:end troubleshooting -->
