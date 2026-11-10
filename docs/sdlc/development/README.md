# Development

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
### DEV-PLAN-v1 · approved · source: plan:v1

Development plan version 1 was approved, structured as three 20-point sprints moving from core note creation through editing/search/tags to responsive polish and help docs.

Plan status: approved (version 1). Sprint 1 goal: login-free app shell, core note creation with local persistence, list view, automatic timestamps, and baseline privacy/help framing (capacity 20). Sprint 2 goal: edit, delete, search and tag notes, including tag-based filtering, on top of the core note store (capacity 20). Sprint 3 goal: responsive layout polish across all features and ship usage/help documentation (capacity 20). Epics: EPIC-001 Instant, Login-Free Access and Note Creation; EPIC-002 Managing Existing Notes; EPIC-003 Local Persistence and Accepted Data Loss; EPIC-004 Full-Text Search and Tag-Based Organisation; EPIC-005 Responsive Web Delivery, Privacy and Help.

**Related:** US-001, US-002, US-003, US-004, US-005, US-006, US-007, US-008, US-009, US-010, US-011, US-012, US-013, US-014, US-015

### DEV-PLAN-Sprint1 · approved · source: plan:Sprint 1

Sprint 1 targeted the login-free app shell, core note creation, list view, timestamps, local persistence and baseline privacy/help framing.

Capacity: 20 points. Goal: 'Login-free app shell, core note creation with local persistence, list view, automatic timestamps, and baseline privacy/help framing.'

**Related:** US-001, US-002, US-003, US-006, US-007, US-008

### DEV-PLAN-Sprint2 · approved · source: plan:Sprint 2

Sprint 2 targeted edit, delete, search and tag/filter functionality on top of the core note store.

Capacity: 20 points. Goal: 'Edit, delete, search and tag notes, including tag-based filtering, on top of the core note store.'

**Related:** US-004, US-005, US-009, US-010, US-011

### DEV-PLAN-Sprint3 · approved · source: plan:Sprint 3

Sprint 3 targeted responsive layout polish across all features and shipping usage/help documentation.

Capacity: 20 points. Goal: 'Responsive layout polish across all features and ship the usage/help documentation.'

**Related:** US-012, US-015

### DEV-US-001 · approved · source: dev:US-001

Ticket for 'Open the app and start writing immediately' was delivered.

Status: delivered. Commit: ce9e8d21eb8cd701a485d9e0b4e6a1ddd6b1a396.

**Related:** US-001

### DEV-US-002 · approved · source: dev:US-002

Ticket for 'Create a plain-text note with a title and body' was delivered.

Status: delivered. Commit: 9a43944602578b720a6d95354d4e0fc70d72f323.

**Related:** US-002

### DEV-US-003 · approved · source: dev:US-003

Ticket for 'See all notes in a list' was delivered.

Status: delivered. Commit: 9a43944602578b720a6d95354d4e0fc70d72f323.

**Related:** US-003

### DEV-US-006 · approved · source: dev:US-006

Ticket for 'Automatic created and last-updated timestamps' was delivered.

Status: delivered. Commit: 9a43944602578b720a6d95354d4e0fc70d72f323.

**Related:** US-006

### DEV-US-008 · approved · source: dev:US-008

Ticket for 'Understand that notes are device-only and can be lost' was delivered.

Status: delivered. Commit: ce9e8d21eb8cd701a485d9e0b4e6a1ddd6b1a396.

**Related:** US-008

### DEV-US-013 · approved · source: dev:US-013

Ticket for 'Free app with no payments or monetisation' was delivered.

Status: delivered. Commit: ce9e8d21eb8cd701a485d9e0b4e6a1ddd6b1a396.

**Related:** US-013

### DEV-US-014 · approved · source: dev:US-014

Ticket for 'No analytics, tracking, or server-side personal data' was delivered.

Status: delivered. Commit: ce9e8d21eb8cd701a485d9e0b4e6a1ddd6b1a396.

**Related:** US-014

### DEV-GAP-NOTE · draft · source: dev:run-status

Development run status is reported as 'completed', but no ticket records were supplied for 8 of the 15 planned stories.

The following story tickets have no delivery record in the input and their build status is unconfirmed: US-004 (Edit an existing note), US-005 (Delete a note), US-007 (Notes persist on the device between visits), US-009 (Full-text search across all notes), US-010 (Apply free-form tags to a note), US-011 (Filter the note list by tag), US-012 (Responsive layout for mobile and desktop browsers), US-015 (Basic usage and help documentation).

**Related:** US-004, US-005, US-007, US-009, US-010, US-011, US-012, US-015

### GUIDE-1 · approved · source: dev:US-001,US-002

The screen you land on when opening the app, where you can start a new note right away.

Step 1: Open the app in your browser; it loads directly into the note-taking interface with no login or sign-up step. Step 2: Enter a title for your note in the title field. Step 3: Enter the text of your note in the body field. Step 4: The note is created from the title and body you entered.

**Related:** US-001, US-002

### GUIDE-2 · approved · source: dev:US-003,US-006

The list view where all of your notes are shown together with their timestamps.

Step 1: View the list of all notes you have created. Step 2: Each note in the list shows its title. Step 3: Each note shows the date and time it was created, recorded automatically. Step 4: Each note shows the date and time it was last updated, recorded automatically.

**Related:** US-003, US-006

### GUIDE-3 · approved · source: dev:US-008,US-013,US-014

Notices shown to the user about privacy, cost, and where notes are stored.

Step 1: Read the notice explaining that notes are stored only on this device and can be lost (for example, if browser data is cleared or you switch devices). Step 2: Note that the app is free to use, with no payments or subscriptions required. Step 3: Note that the app does not collect analytics or tracking data, and does not send personal data to a server.

**Related:** US-008, US-013, US-014
<!-- sdlc:auto:end narrative -->
