<!-- sdlc:auto:start adr -->
# ADR-0002: Use Express 5 for Backend

Status: Accepted  
Date: 2026-11-10

## Context and Problem Statement

Which Backend technology does the project use? Decided in architecture v1.

## Considered Options

- Express 5
- Static file host only
- Fastify

## Decision Outcome

Chosen option: Express 5, because A thin Node server whose only job is to serve the built app files, keeping one JavaScript codebase and skill set.

## Consequences

No business logic or API lives here; most of its capability is unused by design, which is acceptable for this device-only app.
<!-- sdlc:auto:end adr -->