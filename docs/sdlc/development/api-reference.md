# API Reference

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start endpoints -->
| Method | Path | Handler | Source | Summary |
|---|---|---|---|---|
| GET | /health | — | `backend/src/app.ts:29` | Liveness probe, and the only handler here that is not a stub. |
| GET | /healthz | — | `backend/src/routes/api.ts:16` | Liveness probe for the static app server. |
| GET | /{*splat} | — | `backend/src/routes/api.ts:29` | Serve the built Next.js app files, PWA manifest and service worker to the browser. No |
<!-- sdlc:auto:end endpoints -->

<!-- sdlc:auto:start drift -->
**Designed but missing:**

- GET /*

**Code only:**

- GET /{*splat}
<!-- sdlc:auto:end drift -->

<!-- sdlc:auto:start source -->
Generated from commit `f5c8ed7`
<!-- sdlc:auto:end source -->
