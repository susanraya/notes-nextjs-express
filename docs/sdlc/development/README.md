# Development

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
### DEV-PLAN-001 · approved · source: plan:approved-v1

Development plan version 1 approved, organizing the notes app build into 3 sprints of 20-point capacity each, covering core note creation/persistence, editing/search/tagging, and responsive polish plus help docs.

Plan status: approved, version 1. Total of 3 sprints planned, each with capacity=20 points. Sprint 1 goal: login-free app shell, core note creation with local persistence, list view, automatic timestamps, and baseline privacy/help framing. Sprint 2 goal: edit, delete, search and tag notes, including tag-based filtering, on top of the core note store. Sprint 3 goal: responsive layout polish across all features and shipping usage/help documentation. No execution status (ticket completion, code review, or test results) was included in this input.

**Related:** US-001, US-002, US-003, US-004, US-005, US-006, US-007, US-008, US-009, US-010, US-011, US-012, US-013, US-014, US-015

### DEV-SPRINT-1 · draft · source: plan:Sprint 1

Sprint 1 scope: login-free app shell, core note creation with local persistence, list view, automatic timestamps, and baseline privacy/help framing. Capacity 20 points.

Items assigned (frontend-agent unless noted): US-001 Open the app and start writing immediately (3 pts); US-002 Create a plain-text note with a title and body (5 pts); US-003 See all notes in a list (3 pts); US-006 Automatic created and last-updated timestamps (2 pts); US-007 Notes persist on the device between visits (3 pts); US-008 Understand that notes are device-only and can be lost (1 pt). No completion or test status provided for these items in this input.

**Related:** US-001, US-002, US-003, US-006, US-007, US-008

### DEV-SPRINT-2 · draft · source: plan:Sprint 2

Sprint 2 scope: edit, delete, search and tag notes, including tag-based filtering, on top of the core note store. Capacity 20 points.

Items assigned (frontend-agent): US-004 Edit an existing note (3 pts); US-005 Delete a note (2 pts); US-009 Full-text search across all notes (5 pts); US-010 Apply free-form tags to a note (3 pts); US-011 Filter the note list by tag (2 pts). No completion or test status provided for these items in this input.

**Related:** US-004, US-005, US-009, US-010, US-011

### DEV-SPRINT-3 · draft · source: plan:Sprint 3

Sprint 3 scope: responsive layout polish across all features and shipping the usage/help documentation. Capacity 20 points.

Items assigned: US-012 Responsive layout for mobile and desktop browsers (5 pts, frontend-agent); US-013 Free app with no payments or monetisation (1 pt, frontend-agent); US-014 No analytics, tracking, or server-side personal data (2 pts, security-agent); US-015 Basic usage and help documentation (2 pts, frontend-agent). No completion or test status provided for these items in this input.

**Related:** US-012, US-013, US-014, US-015

### EPIC-001 · draft · source: plan:EPIC-001

Epic covering instant, login-free access and note creation.

Groups US-001 (Open the app and start writing immediately, 3 pts) and US-002 (Create a plain-text note with a title and body, 5 pts). No point total or role assigned at epic level; both child stories assigned to frontend-agent, planned in Sprint 1.

**Related:** US-001, US-002

### EPIC-002 · draft · source: plan:EPIC-002

Epic covering management of existing notes: listing, editing, deleting, and timestamps.

Groups US-003 (See all notes in a list, 3 pts, Sprint 1), US-004 (Edit an existing note, 3 pts, Sprint 2), US-005 (Delete a note, 2 pts, Sprint 2), and US-006 (Automatic created and last-updated timestamps, 2 pts, Sprint 1). All assigned to frontend-agent. No epic-level point total or role given.

**Related:** US-003, US-004, US-005, US-006

### EPIC-003 · draft · source: plan:EPIC-003

Epic covering local persistence of notes and user acceptance of device-only data loss risk.

Groups US-007 (Notes persist on the device between visits, 3 pts) and US-008 (Understand that notes are device-only and can be lost, 1 pt), both frontend-agent, planned in Sprint 1. No epic-level point total or role given.

**Related:** US-007, US-008

### EPIC-004 · draft · source: plan:EPIC-004

Epic covering full-text search and tag-based organisation of notes.

Groups US-009 (Full-text search across all notes, 5 pts), US-010 (Apply free-form tags to a note, 3 pts), and US-011 (Filter the note list by tag, 2 pts), all frontend-agent, planned in Sprint 2. No epic-level point total or role given.

**Related:** US-009, US-010, US-011

### EPIC-005 · draft · source: plan:EPIC-005

Epic covering responsive web delivery, privacy posture, and help documentation.

Groups US-012 (Responsive layout for mobile and desktop browsers, 5 pts, frontend-agent), US-013 (Free app with no payments or monetisation, 1 pt, frontend-agent), US-014 (No analytics, tracking, or server-side personal data, 2 pts, security-agent), and US-015 (Basic usage and help documentation, 2 pts, frontend-agent). All planned in Sprint 3. No epic-level point total or role given.

**Related:** US-012, US-013, US-014, US-015
<!-- sdlc:auto:end narrative -->
