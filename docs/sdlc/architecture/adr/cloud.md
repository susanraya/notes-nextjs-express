<!-- sdlc:auto:start adr -->
# ADR-0004: Use AWS for Cloud

Status: Accepted  
Date: 2026-11-10

## Context and Problem Statement

Which Cloud technology does the project use? Decided in architecture v1.

## Considered Options

- AWS
- Cloudflare Pages
- Vercel

## Decision Outcome

Chosen option: AWS, because Serves the static app from edge locations close to users in India for fast mobile loads and fits a free app's budget at this scale.

## Consequences

A full cloud for a static workload is more than strictly needed, but no personal data reaches it so residency/breach duties are not triggered.
<!-- sdlc:auto:end adr -->