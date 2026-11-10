<!-- sdlc:auto:start adr -->
# ADR-0003: Use PostgreSQL 16 for Database

Status: Accepted  
Date: 2026-11-10

## Context and Problem Statement

Which Database technology does the project use? Decided in architecture v1.

## Considered Options

- PostgreSQL 16
- SQLite
- None

## Decision Outcome

Chosen option: PostgreSQL 16, because Provisioned as the platform standard and the natural home should accounts/sync/backup ever be added later.

## Consequences

Sits idle in this version because all notes stay in the browser; it adds a small standing cost with no current load.
<!-- sdlc:auto:end adr -->