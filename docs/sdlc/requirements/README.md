# Product Requirements

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
## Summary

### REQ-SCOPE · draft · source: requirements:v1

Requirements v1 defines a lightweight-scope, login-free, browser-only notes app with search and tagging, explicitly excluding rich-text formatting and cross-device sync/backup.

Delivery scope: lightweight. Requirements version: 1.
In scope: instant no-login access; create/edit/delete plain-text notes (title + body); list all notes; local persistence between visits; full-text search; free-form tags with tag filtering; automatic created/last-updated timestamps; responsive layout for mobile and desktop; basic usage/help docs; free with no payments; delivered as a responsive PWA-style web app.
Out of scope (explicitly excluded, not to be designed/built): rich-text formatting (bold, lists, checkboxes); cross-device sync and cloud backup; export/import/backup of any kind.

**Related:** EPIC-001, EPIC-002, EPIC-003, EPIC-004, EPIC-005

### REQ-TECHSTACK · approved · source: requirements:tech-stack

Product owner approved a fixed stack: Express 5 backend, AWS hosting, PostgreSQL 16 (provisioned but idle), Next.js 15 frontend.

Decided stack, to be designed against exactly as specified (no substitution):
- Backend: Express 5 -- minimal Node server only serving app files to the browser; no server-side note storage; shares JS with frontend for one codebase.
- Cloud: AWS -- hosting is lightweight (static app, no personal data reaching the server); chosen for edge delivery to Indian users and low cost at this scale.
- Database: PostgreSQL 16 -- named as the platform's standard DB but sits idle in this version, since notes are kept only in browser storage (IndexedDB/localStorage); reserved for future accounts/sync/backup if ever added.
- Frontend: Next.js 15.
Compliance trace: DPDP Act 2023 data residency/consent/breach-notification duties are called out by the product owner as not triggered for this hosting choice because no personal data reaches the server in this version -- this is an assumption to be validated, not a confirmed exemption.

**Related:** EPIC-001, EPIC-003, EPIC-005, NFR-001, NFR-003

### EPIC-001 · draft · source: requirements:EPIC-001

Instant, login-free access and creation of a plain-text note with title and body -- the app's entry point.

General users in India can open the app in any supported browser and start writing immediately, with no account, login, or sign-up. Covers the frictionless entry point and creating a new plain-text note (title + body).

**Related:** US-001, US-002

### US-001 · draft · source: requirements:US-001

[Critical] Open the app and start writing immediately -- no account or login step before typing.

AC-001: First-time user opening the app URL in a supported browser lands directly in a usable note-taking interface -- no login, sign-up, or account prompt.
AC-002: While the app is open, typing to start a new note is captured without any authentication step.

**Related:** EPIC-001, AC-001, AC-002

### US-002 · draft · source: requirements:US-002

[Critical] Create a plain-text note with a title and body.

AC-003: Entering a title and body and saving stores the note with that content.
AC-004: Body text with no title still saves (title may be empty or auto-derived); not blocked.
AC-005: Any formatting markup typed (bold, checkboxes, etc.) is stored and displayed as plain text only -- rich-text formatting is out of scope.

**Related:** EPIC-001, AC-003, AC-004, AC-005

### EPIC-002 · draft · source: requirements:EPIC-002

Managing existing notes: list, edit, delete, and automatic timestamps.

Users view all saved notes in a list, open and edit any note, and delete notes no longer wanted. Each note carries automatic created and last-updated timestamps. Note: the title/body + automatic-timestamp structure is flagged in the input as an assumed detail, not explicitly confirmed.

**Related:** US-003, US-004, US-005, US-006

### US-003 · draft · source: requirements:US-003

[High] See all saved notes in a list.

AC-006: With one or more saved notes, opening the app/notes list shows all notes, each identified by title or a body preview when title is empty.
AC-007: With no saved notes, an empty state is shown inviting the user to create their first note.

**Related:** EPIC-002, AC-006, AC-007

### US-004 · draft · source: requirements:US-004

[High] Edit an existing note's title or body.

AC-008: Changing and saving a note's title or body persists the update and shows it when reopened.
AC-009: Saving a change updates the last-updated timestamp while the created timestamp stays unchanged.

**Related:** EPIC-002, AC-008, AC-009

### US-005 · draft · source: requirements:US-005

[High] Delete a note, with confirmation since deletion is permanent.

AC-010: Deleting and confirming removes the note from the list and from search results and tag filters.
AC-011: Triggering delete asks for confirmation first, because deleted notes cannot be recovered.

**Related:** EPIC-002, AC-010, AC-011

### US-006 · draft · source: requirements:US-006

[Medium] Automatic created and last-updated timestamps on each note.

AC-012: On first save, a created timestamp and an initial last-updated timestamp are recorded automatically, no user input needed.
AC-013: The created and/or last-updated timestamp is shown to the user in the list or editor. Input flags the title/body + timestamp structure as an assumed, not explicitly confirmed, detail.

**Related:** EPIC-002, AC-012, AC-013

### EPIC-003 · draft · source: requirements:EPIC-003

Local-only persistence, with no server storage, sync, backup, export or import, and user is informed of the resulting risk of data loss.

Notes persist in the user's own browser between visits on the same device/browser. Deliberately no server storage, cross-device sync, backup, export or import. Users are told notes are lost if browser data is cleared or the device changes. Cross-device sync and cloud backup are explicitly out of scope.

**Related:** US-007, US-008, NFR-001, NFR-006

### US-007 · draft · source: requirements:US-007

[Critical] Notes persist on the same device/browser between visits.

AC-014: Closing and reopening the app later on the same device/browser still shows previously saved notes.
AC-015: Notes are kept only in local browser storage, with no copy sent to any server.
Compliance trace: DPDP Act 2023 data-residency/consent/breach duties -- noted as not triggered because no personal data is transmitted to a server; treated as an assumption to be validated, not a confirmed exemption.

**Related:** EPIC-003, AC-014, AC-015, NFR-001, NFR-006

### US-008 · draft · source: requirements:US-008

[Medium] User is told notes are device-only and can be lost.

AC-016: Help or an in-app notice states clearly that notes are stored only in the current browser, are not synced across devices, and will be lost if browser data is cleared or the device changes.
AC-017: No backup, export, import, or sync feature is offered, consistent with these being out of scope.

**Related:** EPIC-003, AC-016, AC-017, NFR-006

### EPIC-004 · draft · source: requirements:EPIC-004

Full-text search across notes and free-form tag organisation with tag filtering.

Users can search across title and body text of all notes, and organise notes using free-form tags (not nested folders), then filter the list to a chosen tag.

**Related:** US-009, US-010, US-011

### US-009 · draft · source: requirements:US-009

[High] Full-text search across all notes' title and body.

AC-018: Entering a search term shows only notes whose title or body contains it.
AC-019: A search term matching no notes shows a clear 'no results' state.
AC-020: Clearing the search term restores the full notes list.

**Related:** EPIC-004, AC-018, AC-019, AC-020

### US-010 · draft · source: requirements:US-010

[Medium] Apply one or more free-form tags to a note.

AC-021: Entering and saving one or more tags stores them with the note and shows them when the note is viewed.
AC-022: Removing a tag and saving disassociates it from that note.

**Related:** EPIC-004, AC-021, AC-022

### US-011 · draft · source: requirements:US-011

[Medium] Filter the notes list by a chosen tag.

AC-023: Selecting a tag shows only notes carrying that tag.
AC-024: Clearing/deselecting the tag filter restores the full unfiltered list.

**Related:** EPIC-004, AC-023, AC-024

### EPIC-005 · draft · source: requirements:EPIC-005

Responsive PWA-style delivery, free with no monetisation, no tracking, and basic help documentation.

App is a free, responsive PWA-style web app for mobile and desktop browsers, with no payments or monetisation, no analytics or third-party tracking, and basic usage/help docs. Because all data stays in the browser and no personal data reaches a server, India's DPDP server-side obligations (consent/notice, breach notification, data residency) are stated as effectively not triggered -- flagged as an assumption to validate, not a confirmed legal conclusion.

**Related:** US-012, US-013, US-014, US-015, NFR-002, NFR-003, NFR-004

### US-012 · draft · source: requirements:US-012

[High] Responsive layout usable on both mobile and desktop browsers.

AC-025: On mobile, layout adapts to the small screen and all core actions (create, edit, delete, list, search, tag, filter) are usable.
AC-026: On desktop, layout adapts to the larger screen with all core actions usable.
AC-027: Delivery format is a responsive PWA-style web app accessed via browser, not a native app.

**Related:** EPIC-005, AC-025, AC-026, AC-027, NFR-004

### US-013 · draft · source: requirements:US-013

[Medium] App is entirely free with no payments or monetisation.

AC-028: No payment, billing, subscription, or paywall is ever presented for any feature.
AC-029: No monetisation such as paid tiers or in-app purchases.

**Related:** EPIC-005, AC-028, AC-029

### US-014 · draft · source: requirements:US-014

[Medium] No analytics, third-party tracking, or server-side transmission of personal data.

AC-030: Creating, viewing, or searching notes collects no analytics/third-party tracking and transmits no note content or personal data to any server.
AC-031: Compliance trace -- DPDP Act 2023: because no personal data reaches a server, DPDP server-side obligations (consent/notice, breach notification, data residency) are stated as effectively not triggered; this is explicitly flagged in the input as an assumption to be validated, not a confirmed exemption.

**Related:** EPIC-005, AC-030, AC-031, NFR-001, NFR-002, NFR-003

### US-015 · draft · source: requirements:US-015

[Low] Basic usage and help documentation covering features and limitations.

AC-032: Help/usage documentation explains how to create, edit, delete, list, search, and tag notes.
AC-033: Help documentation clearly states key limitations: plain-text only, device-only storage, no sync, and no backup/export/import.

**Related:** EPIC-005, AC-032, AC-033

### NFR-001 · draft · source: requirements:NFR-001

[Privacy] Note content and personal data stay only in browser local storage, never sent to a server.

Compliance trace: DPDP Act 2023 -- data minimisation / no server-side transmission supports the claim that notice-and-consent and residency duties are not triggered server-side; noted in the input as an assumption to validate, not a confirmed legal position.

**Related:** US-007, US-014

### NFR-002 · draft · source: requirements:NFR-002

[Privacy] No usage analytics or third-party tracking of any kind.

Compliance trace: DPDP Act 2023 -- no tracking/targeted-advertising concern since no analytics or tracking is collected at all, including for any users under 18.

**Related:** US-014

### NFR-003 · draft · source: requirements:NFR-003

[Compliance] DPDP Act server-side obligations (notice/consent, breach notification, data residency) treated as not triggered.

Compliance trace: DPDP Act 2023 -- notice/consent, data-principal rights, consent managers, breach notification to the Data Protection Board, and residency rules are stated as not applicable because no personal data reaches the server. Input explicitly flags this as 'an assumption to be validated,' not a confirmed legal determination -- recommend human/legal confirmation, especially if the stack later adds accounts, sync, or backup via the provisioned PostgreSQL database.

**Related:** US-014

### NFR-004 · draft · source: requirements:NFR-004

[Compatibility] Responsive PWA-style layout keeps all core actions usable on mobile and desktop browsers.

Create, edit, delete, list, search, tag, and filter actions must remain usable across small phone screens and larger desktop screens. (Input does not state WCAG/accessibility conformance explicitly -- flagged as a gap to confirm given the RPwD Act 2016 / GIGW-WCAG accessibility expectations for India.)

**Related:** US-012

### NFR-005 · draft · source: requirements:NFR-005

[Usability] First-time users reach a usable note-taking interface with no login/sign-up/account prompt.

No authentication gate exists before typing in a supported browser.

**Related:** US-001

### NFR-006 · draft · source: requirements:NFR-006

[Availability -- accepted risk] No backup, export, import, or cross-device sync; data loss on browser-clear or device change is accepted.

Deliberate product decision: notes live only in one browser; users are told clearly. Compliance trace: this single-device-only, no-server-copy design is also the basis cited for DPDP breach-notification not being triggered server-side (since no server holds the data) -- assumption to be validated.

**Related:** US-007, US-008
<!-- sdlc:auto:end narrative -->

<!-- sdlc:auto:start summary -->
**Requirements version:** v1  
**Delivery scope:** lightweight  
**Approved:** 2026-11-10

**Capabilities in scope:** Open and start writing immediately with no login or account, Create a plain-text note with a title and body, Edit an existing note, Delete a note, See all notes in a list, Notes persist on the device between visits, Full-text search across all notes, Apply free-form tags to a note, Filter the note list by tag, Automatic created and last-updated timestamps on each note, Responsive layout for mobile and desktop browsers, Basic usage and help documentation, Free app with no payments, billing or subscriptions, Delivered as a responsive PWA-style web app, not a native app, Plain-text notes only, no bold/lists/checkboxes formatting, Free-form tags instead of nested folders, Notes kept only in the browser, with no cross-device sync, No backup, export or import; notes lost if browser data is cleared, No analytics or third-party tracking, Simple note structure of title and body with automatic timestamps

**Approved technology stack:**

| Layer | Choice | Rationale |
|---|---|---|
| backend | Express | Your app stores everything in the browser and sends nothing to a server, so there is almost no backend work to do — its only real job is to serve the app files to the browser. Express is a thin, minimal Node server that does exactly that, and it uses the same JavaScript language as the React frontend, so the whole thing is one codebase and one skill set to maintain cheaply. |
| cloud | AWS | Hosting is light: you are serving a static web app to users in India, with no personal data ever reaching the server, so DPDP residency and breach duties aren't triggered and you have wide freedom in where you host. AWS is the available option and can serve the app from edge locations close to Indian users for fast loads on mobile. It is also well within a free app's budget at this scale. |
| database | PostgreSQL | By design your notes never leave the browser — they're kept in the browser's own storage (IndexedDB/localStorage) — so the application does not actually use a server database at all. PostgreSQL is named here as the standard database the platform provisions, and it sits idle unless you later decide to add accounts, sync or backup, at which point it is the natural, reliable place for that data. |
| frontend | Next.js | — |
<!-- sdlc:auto:end summary -->

<!-- sdlc:auto:start epics -->
## EPIC-001: Instant, Login-Free Access and Note Creation

General users in India can open the web app in any browser and immediately begin writing plain-text notes, with no account, login, or sign-up step. This epic covers the frictionless entry point and the creation of a new note with a title and body.

### US-001: Open the app and start writing immediately

**Priority:** critical

> As a general user, I want to open the app in my browser and start writing straight away, so that I can capture a note without creating an account or logging in.

| ID | Given | When | Then |
|---|---|---|---|
| AC-001 | a user who has never used the app before | they open the app URL in a supported browser | the app loads directly into a usable note-taking interface with no login, sign-up, or account prompt |
| AC-002 | the app is open | the user begins typing to start a new note | their input is captured without requiring any authentication step |

### US-002: Create a plain-text note with a title and body

**Priority:** critical

> As a general user, I want to create a new note containing a title and a body of plain text, so that I can record information I want to keep.

| ID | Given | When | Then |
|---|---|---|---|
| AC-003 | the app is open | the user chooses to create a new note and enters a title and body text | the note is saved with the entered title and body |
| AC-004 | a user creating a note | they enter body text with no title | the note is still saved (the title may be empty or auto-derived) rather than being blocked |
| AC-005 | a note editor | the user types formatting such as bold or checkbox markup | the content is stored and shown as plain text only, as rich-text formatting is out of scope for this version |

## EPIC-002: Managing Existing Notes

Users can view all their notes in a list, open and edit any note, and delete notes they no longer want. Each note carries automatic created and last-updated timestamps. Note structure of title and body with automatic timestamps is an assumed detail, not explicitly confirmed.

### US-003: See all notes in a list

**Priority:** high

> As a general user, I want to see all of my saved notes in a list, so that I can find and reopen a note I created earlier.

| ID | Given | When | Then |
|---|---|---|---|
| AC-006 | the user has one or more saved notes | they open the app or navigate to the notes list | all saved notes are shown in a list, each identifiable by its title (or a preview of its body when the title is empty) |
| AC-007 | the user has no saved notes | they view the notes list | an empty state is shown inviting them to create their first note |

### US-004: Edit an existing note

**Priority:** high

> As a general user, I want to open and edit the title and body of an existing note, so that I can keep my notes up to date.

| ID | Given | When | Then |
|---|---|---|---|
| AC-008 | an existing saved note | the user opens it and changes the title or body and the change is saved | the updated content is persisted and shown when the note is reopened |
| AC-009 | a note being edited | the user saves a change to it | the note's last-updated timestamp is set to the time of the change while the created timestamp is unchanged |

### US-005: Delete a note

**Priority:** high

> As a general user, I want to delete a note I no longer need, so that my notes list stays relevant.

| ID | Given | When | Then |
|---|---|---|---|
| AC-010 | an existing saved note | the user chooses to delete it and confirms | the note is removed from the list and no longer appears in searches or tag filters |
| AC-011 | a user about to delete a note | they trigger the delete action | they are asked to confirm before the note is permanently removed, because deleted notes cannot be recovered |

### US-006: Automatic created and last-updated timestamps

**Priority:** medium

> As a general user, I want each note to automatically record when it was created and last updated, so that I can tell how recent a note is without managing dates myself.

| ID | Given | When | Then |
|---|---|---|---|
| AC-012 | a new note | it is first saved | a created timestamp and an initial last-updated timestamp are recorded automatically without user input |
| AC-013 | a note in the list or editor | the user views it | the created and/or last-updated timestamp is displayed to the user. Note: the title/body structure with automatic timestamps is an assumed detail and not explicitly confirmed. |

## EPIC-003: Local Persistence and Accepted Data Loss

Notes are stored only in the user's own browser on their device, persisting between visits. There is deliberately no server storage, no cross-device sync, and no backup, export or import. Users are informed that notes are lost if they clear browser data or switch devices. Cross-device sync and cloud backup are out of scope.

### US-007: Notes persist on the device between visits

**Priority:** critical

> As a general user, I want my notes to still be there when I return to the app, so that I do not lose my work between sessions on the same device and browser.

| ID | Given | When | Then |
|---|---|---|---|
| AC-014 | a user who has saved notes in a browser | they close the browser and reopen the app later on the same device and browser | their previously saved notes are still present |
| AC-015 | saved notes | they are stored | they are kept only in the local browser storage of the device, with no copy sent to any server |

### US-008: Understand that notes are device-only and can be lost

**Priority:** medium

> As a general user, I want to be told that my notes are stored only in this browser and can be lost, so that I understand the risk and am not surprised if my notes disappear.

| ID | Given | When | Then |
|---|---|---|---|
| AC-016 | the app | the user views the help or an in-app notice | it clearly states that notes are stored only in the current browser, are not synced across devices, and will be lost if browser data is cleared or the device changes |
| AC-017 | the current version | the user looks for a backup, export, import, or sync feature | no such feature is offered, consistent with these capabilities being out of scope |

## EPIC-004: Full-Text Search and Tag-Based Organisation

Users can search across all their notes by text and organise notes using free-form tags, then filter the list to a chosen tag. Organisation uses free-form tags rather than nested folders.

### US-009: Full-text search across all notes

**Priority:** high

> As a general user, I want to search across the title and body text of all my notes, so that I can quickly find a specific note.

| ID | Given | When | Then |
|---|---|---|---|
| AC-018 | the user has several saved notes | they enter a search term | only notes whose title or body contains the term are shown |
| AC-019 | a search term that matches no notes | the user searches | a clear 'no results' state is shown |
| AC-020 | an active search | the user clears the search term | the full list of notes is shown again |

### US-010: Apply free-form tags to a note

**Priority:** medium

> As a general user, I want to add one or more free-form tags to a note, so that I can group related notes without using folders.

| ID | Given | When | Then |
|---|---|---|---|
| AC-021 | a note being created or edited | the user enters one or more free-form tags and saves | the tags are stored with the note and shown when the note is viewed |
| AC-022 | a note with tags | the user removes a tag and saves | the tag is no longer associated with that note |

### US-011: Filter the note list by tag

**Priority:** medium

> As a general user, I want to filter my notes list to show only notes with a chosen tag, so that I can focus on one group of related notes.

| ID | Given | When | Then |
|---|---|---|---|
| AC-023 | the user has notes with various tags | they select a tag to filter by | only notes carrying that tag are shown in the list |
| AC-024 | an active tag filter | the user clears or deselects the tag | the unfiltered list of all notes is shown again |

## EPIC-005: Responsive Web Delivery, Privacy and Help

The app is delivered as a free, responsive PWA-style web app usable on mobile and desktop browsers, with no payments or monetisation, no analytics or third-party tracking, and basic usage/help documentation. Because all data stays in the browser and no personal data reaches a server, India's DPDP server-side obligations (consent/notice, breach notification, data residency) are effectively not triggered.

### US-012: Responsive layout for mobile and desktop browsers

**Priority:** high

> As a general user, I want the app to work and look right on both my phone and my computer browser, so that I can take notes on whichever device I happen to be using.

| ID | Given | When | Then |
|---|---|---|---|
| AC-025 | a user on a mobile browser | they open and use the app | the layout adapts to the small screen and all core actions (create, edit, delete, list, search, tag, filter) are usable |
| AC-026 | a user on a desktop browser | they open and use the app | the layout adapts to the larger screen and all core actions remain usable |
| AC-027 | the delivery format | a user accesses the product | it is a responsive PWA-style web app accessed via the browser, not a native mobile or desktop app |

### US-013: Free app with no payments or monetisation

**Priority:** medium

> As a general user, I want to use the entire app for free with no charges, so that I can take notes without any cost or commitment.

| ID | Given | When | Then |
|---|---|---|---|
| AC-028 | any user | they use any feature of the app | no payment, billing, subscription, or paywall is ever presented |
| AC-029 | the app | it is used | it contains no monetisation such as paid tiers or in-app purchases |

### US-014: No analytics, tracking, or server-side personal data

**Priority:** medium

> As a general user, I want the app to not track me or send my data to a server, so that my notes and usage stay private on my device.

| ID | Given | When | Then |
|---|---|---|---|
| AC-030 | a user using the app | they create, view, or search notes | no analytics or third-party tracking is collected and no note content or personal data is transmitted to any server |
| AC-031 | India's DPDP obligations | assessing the app | because no personal data reaches a server, DPDP server-side obligations (consent/notice, breach notification, data residency) are effectively not triggered — this is an assumption to be validated. |

### US-015: Basic usage and help documentation

**Priority:** low

> As a general user, I want simple help documentation explaining how to use the app, so that I can understand its features and limitations.

| ID | Given | When | Then |
|---|---|---|---|
| AC-032 | the app | the user opens the help or usage documentation | it explains how to create, edit, delete, list, search, and tag notes |
| AC-033 | the help documentation | the user reads it | it clearly states the key limitations: plain-text only, device-only storage, no sync, and no backup/export/import |
<!-- sdlc:auto:end epics -->
