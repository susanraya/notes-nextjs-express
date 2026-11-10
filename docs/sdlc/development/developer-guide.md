# Developer Guide

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start status -->
_Up to date._
<!-- sdlc:auto:end status -->

<!-- sdlc:auto:start source -->
Generated from commit `f925d3a` · model `claude-sonnet-5`
<!-- sdlc:auto:end source -->

<!-- sdlc:auto:start overview -->
This is a generated two-app "notes" scaffold with no login: a Next.js 15 frontend exported as a static site, and an Express 5 + TypeScript backend. The frontend ships every approved screen but renders only seeded sample data — it is not yet wired to the API. The backend currently only exposes a health check; no data model or routes were approved yet, though it is set up to use Drizzle ORM against PostgreSQL once endpoints are added. The two apps live side by side in one repo and are developed/run independently.
<!-- sdlc:auto:end overview -->

<!-- sdlc:auto:start prerequisites -->
- Node.js 22+ (matches backend/Dockerfile's node:22-slim base)
- npm
- Docker and Docker Compose (optional, for the PostgreSQL service in docker-compose.yml)
- PostgreSQL 16 (only needed if setting DATABASE_URL; otherwise backend falls back to an in-memory database)
<!-- sdlc:auto:end prerequisites -->

<!-- sdlc:auto:start setup -->
1. Clone the repository
2. Copy .env.example to .env and fill in any values if you need backend DB/CORS config
3. cd frontend && npm install
4. cd backend && npm install
5. (Optional) docker compose up -d db  # starts local PostgreSQL 16 on port 5432
6. Run the frontend and backend dev servers in separate terminals (see Run Commands)
<!-- sdlc:auto:end setup -->

<!-- sdlc:auto:start run -->
| Name | Command | Description |
|---|---|---|
| frontend dev | `cd frontend && npm run dev` | Starts the Next.js dev server for the approved screens (seeded sample data). |
| frontend build | `cd frontend && npm run build` | Builds a static export into frontend/out/ (no typecheck or lint during build). |
| frontend preview | `cd frontend && npm run preview` | Serves the built frontend/out/ static files on http://127.0.0.1:4173. |
| frontend typecheck | `cd frontend && npm run typecheck` | Runs tsc --noEmit, skipped by the build step on purpose. |
| backend dev | `cd backend && npm run dev` | Runs the Express API with tsx watch on src/main.ts (defaults to 0.0.0.0:8000, or set HOST/PORT). |
| backend build | `cd backend && npm run build` | Compiles TypeScript to backend/dist via tsconfig.build.json. |
| backend start | `cd backend && npm run start` | Runs the compiled server from backend/dist/main.js (production). |
| db up | `docker compose up -d db` | Starts a local PostgreSQL 16 container (user/pass/db: app/app/app) defined in docker-compose.yml. |
<!-- sdlc:auto:end run -->

<!-- sdlc:auto:start structure -->
| Path | Purpose |
|---|---|
| `.devcontainer` | VS Code devcontainer configuration for a consistent dev environment. |
| `.quorq` | Platform metadata (handoff.json) used by the Quorq AI SDLC platform. |
| `backend` | Express 5 + TypeScript API service. |
| `backend/src` | App source: app.ts (Express app/routes), main.ts (entry point), db.ts (lazy DB connection), schema.ts (Drizzle tables, currently empty), stubs.ts. |
| `backend/tests` | Vitest tests (health.test.ts, database.test.ts). |
| `frontend` | Next.js 15 app exported as a static site. |
| `frontend/src` | App source including lib/api.ts (API client), lib/ui.tsx, lib/icons.tsx, lib/navigate.ts, index.css; the App Router screens live under src/app/ (not individually listed here). |
| `frontend/e2e` | Playwright end-to-end tests (example.spec.ts). |
| `docker-compose.yml` | Defines the local PostgreSQL 16 service used in development. |
| `.env.example` | Template for environment variables (e.g. DATABASE_URL, ALLOWED_ORIGINS, NEXT_PUBLIC_API_BASE_URL). |
<!-- sdlc:auto:end structure -->

<!-- sdlc:auto:start conventions -->
- Backend uses ESM ("type": "module") with NodeNext module resolution and strict TypeScript.
- Express app is structured for one router per component with one handler per API-spec endpoint; handlers currently ship as stubs until an architecture is approved.
- Database access is lazy: db() connects on first use via Drizzle ORM/node-postgres, auto-creating tables from schema.ts (CREATE TABLE IF NOT EXISTS only, no migrations yet).
- With no DATABASE_URL set, the backend transparently falls back to an in-memory PGlite PostgreSQL instance (useful for tests/e2e, not used in the production Docker image).
- CORS origins are read from ALLOWED_ORIGINS (comma-separated), falling back to localhost dev origins.
- Frontend is a static export (output: "export" in next.config.ts): every page is a client component, no server components/route handlers/server actions.
- Frontend build intentionally skips typechecking and linting (ignoreBuildErrors/ignoreDuringBuilds); typecheck and lint are run separately as gates.
- Frontend API client (src/lib/api.ts) reads the API URL from NEXT_PUBLIC_API_BASE_URL (Next.js public env convention) and attaches a bearer token (session token or shared API secret).
- Both apps use ESLint + Prettier with their own configs (eslint.config.js, .prettierrc).
<!-- sdlc:auto:end conventions -->

<!-- sdlc:auto:start testing -->
| Name | Command | Description |
|---|---|---|
| frontend unit tests | `cd frontend && npm test` | Runs Vitest component tests colocated with components. |
| frontend e2e tests | `cd frontend && npm run test:e2e` | Runs Playwright tests from frontend/e2e; boots the backend (tsx) and a built/served frontend automatically unless E2E_BASE_URL is set. |
| frontend e2e browser install | `cd frontend && npm run test:e2e:install` | Installs the Chromium browser Playwright needs before running e2e tests. |
| backend tests | `cd backend && npm test` | Runs Vitest tests for health check and database setup. |
<!-- sdlc:auto:end testing -->

<!-- sdlc:auto:start troubleshooting -->
| Problem | Solution |
|---|---|
| Frontend API calls fail with CORS errors in development. | Ensure the backend's ALLOWED_ORIGINS env var includes the frontend's origin, or rely on the default dev origins (http://localhost:5173, http://127.0.0.1:5173) if applicable, adjusting as needed for Next.js's actual dev port. |
| Backend data isn't persisted between restarts. | Set DATABASE_URL to point at a real PostgreSQL instance (e.g. via docker compose up -d db); without it the backend silently uses an in-memory PGlite database that resets on restart. |
| `npm run build` in frontend succeeds but the app has type errors. | Run `npm run typecheck` (tsc --noEmit) and `npm run lint` manually, since the Next.js build intentionally ignores both. |
| Playwright e2e tests fail to start the backend. | Confirm backend/node_modules is installed (`cd backend && npm install`) since playwright.config.ts launches it directly via tsx from the backend directory. |
| Port 8000 or 4173 already in use. | Set HOST/PORT env vars for the backend, or stop the conflicting process before running `npm run dev` / `npm run preview`. |
<!-- sdlc:auto:end troubleshooting -->
