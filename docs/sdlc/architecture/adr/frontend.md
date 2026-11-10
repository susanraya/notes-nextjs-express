<!-- sdlc:auto:start adr -->
# ADR-0001: Use Next.js 15 for Frontend

Status: Accepted  
Date: 2026-11-10

## Context and Problem Statement

Which Frontend technology does the project use? Decided in architecture v1.

## Considered Options

- Next.js 15
- Vite + React SPA
- Remix

## Decision Outcome

Chosen option: Next.js 15, because Hosts the entire product UI, client-side note logic and PWA shell as a single React codebase; renders a usable editor immediately on first load with no auth gate (US-001).

## Consequences

Next.js server features are unused here since there is no server data; it is run as a static/edge-served PWA, which is heavier than a plain SPA but matches the approved stack and scaffold.
<!-- sdlc:auto:end adr -->