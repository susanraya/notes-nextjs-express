# Sprint Plan

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start sprints -->
## Sprint 1: Sprint 1

Login-free app shell, core note creation with local persistence, list view, automatic timestamps, and baseline privacy/help framing.

Capacity: 20 points · Committed: 17

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-001 | Story | Open the app and start writing immediately | 3 | frontend-agent | — |
| US-002 | Story | Create a plain-text note with a title and body | 5 | frontend-agent | US-001 |
| US-003 | Story | See all notes in a list | 3 | frontend-agent | US-002 |
| US-006 | Story | Automatic created and last-updated timestamps | 2 | frontend-agent | US-002 |
| US-008 | Story | Understand that notes are device-only and can be lost | 1 | frontend-agent | — |
| US-013 | Story | Free app with no payments or monetisation | 1 | frontend-agent | — |
| US-014 | Story | No analytics, tracking, or server-side personal data | 2 | security-agent | US-001 |

## Sprint 2: Sprint 2

Edit, delete, search and tag notes, including tag-based filtering, on top of the core note store.

Capacity: 20 points · Committed: 18

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-004 | Story | Edit an existing note | 3 | frontend-agent | US-002, US-003 |
| US-005 | Story | Delete a note | 2 | frontend-agent | US-003 |
| US-007 | Story | Notes persist on the device between visits | 3 | frontend-agent | US-002, US-003 |
| US-009 | Story | Full-text search across all notes | 5 | frontend-agent | US-002, US-003 |
| US-010 | Story | Apply free-form tags to a note | 3 | frontend-agent | US-002 |
| US-011 | Story | Filter the note list by tag | 2 | frontend-agent | US-010, US-003 |

## Sprint 3: Sprint 3

Responsive layout polish across all features and ship the usage/help documentation.

Capacity: 20 points · Committed: 7

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-012 | Story | Responsive layout for mobile and desktop browsers | 5 | frontend-agent | US-003, US-004, US-005, US-009, US-010, US-011 |
| US-015 | Story | Basic usage and help documentation | 2 | frontend-agent | US-009, US-010, US-011, US-012 |

## Unscheduled

_Nothing unscheduled._
<!-- sdlc:auto:end sprints -->
