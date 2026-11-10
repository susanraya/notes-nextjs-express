# Tests

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start summary -->
37 tests · Passed 25 · Failed 0 · Skipped 0 · Not run 12

Acceptance criteria covered: 14/33 · passing: 2/33
<!-- sdlc:auto:end summary -->

<!-- sdlc:auto:start tests -->
## Sprint 1

### US-002: Create a plain-text note with a title and body

| Criteria | Test | Level | Result | File |
|---|---|---|---|---|
| AC-003 | Note editor > [AC-003] opening with an existing note id loads its title, body and tags | Unit | Passed | `frontend/src/app/note/page.test.tsx` |
| AC-003 | Note editor > [AC-003] opening with no id starts a blank new note | Unit | Passed | `frontend/src/app/note/page.test.tsx` |
| AC-003 | Note editor > [AC-003] saving writes the note to Dexie and returns to the list | Unit | Passed | `frontend/src/app/note/page.test.tsx` |
| AC-004 | Note editor > [AC-004] a note with body text and an empty title saves successfully | Unit | Passed | `frontend/src/app/note/page.test.tsx` |
| AC-005 | Note editor > [AC-005] typed formatting markup is stored and re-displayed as literal plain text | Unit | Passed | `frontend/src/app/note/page.test.tsx` |
| AC-012 | Note editor > [AC-012] on first save created_at and updated_at are both recorded | Unit | Passed | `frontend/src/app/note/page.test.tsx` |
| AC-012 | Note editor > [AC-012] on re-save only updated_at changes | Unit | Passed | `frontend/src/app/note/page.test.tsx` |
| AC-013 | Note editor > [AC-013] displays the created and last-updated timestamps from stored data | Unit | Passed | `frontend/src/app/note/page.test.tsx` |
| AC-006 | My Notes > [AC-006] renders every note persisted in Dexie, not a seeded list | Unit | Passed | `frontend/src/app/notes/page.test.tsx` |
| AC-006 | My Notes > [AC-006] shows a body preview for a row whose title is empty | Unit | Passed | `frontend/src/app/notes/page.test.tsx` |
| AC-007 | My Notes > [AC-007] shows the empty state inviting the user to create their first note | Unit | Passed | `frontend/src/app/notes/page.test.tsx` |
| AC-013 | My Notes > [AC-013] shows the stored created and updated timestamps formatted for display | Unit | Passed | `frontend/src/app/notes/page.test.tsx` |
| — | My Notes > deleting a note removes it from Dexie and from the list after confirmation | Unit | Passed | `frontend/src/app/notes/page.test.tsx` |
| — | My Notes > tapping a row opens that specific note in the editor | Unit | Passed | `frontend/src/app/notes/page.test.tsx` |
| AC-004 | notes persistence > [AC-004] a note with an empty title is persisted successfully rather than rejected | Unit | Passed | `frontend/src/lib/notes.test.ts` |
| AC-005 | notes persistence > [AC-005] title and body are stored verbatim, markup is never converted | Unit | Passed | `frontend/src/lib/notes.test.ts` |
| AC-012 | notes persistence > [AC-012] createNote assigns id, created_at and updated_at with no caller input | Unit | Passed | `frontend/src/lib/notes.test.ts` |
| — | notes persistence > getNote and deleteNote are exported and work against the store | Unit | Passed | `frontend/src/lib/notes.test.ts` |
| — | notes persistence > listNotes returns all persisted notes ordered newest-updated first | Unit | Passed | `frontend/src/lib/notes.test.ts` |
| — | notes persistence > updateNote changes updated_at only and never alters created_at | Unit | Passed | `frontend/src/lib/notes.test.ts` |
| AC-003 | [AC-003] a new note with title and body is created and then appears in the list with that title | E2E | Not run yet | `frontend/e2e/notes.spec.ts` |
| AC-004, AC-006 | [AC-004][AC-006] a note saved with body text and no title appears in the list identified by a preview of its body | E2E | Not run yet | `frontend/e2e/notes.spec.ts` |
| AC-007 | [AC-007] with storage cleared, the list shows the empty state inviting first note creation | E2E | Not run yet | `frontend/e2e/notes.spec.ts` |
| AC-013 | [AC-013] created and last-updated timestamps are visible in the editor after saving | E2E | Not run yet | `frontend/e2e/notes.spec.ts` |
| AC-013 | [AC-013] created and last-updated timestamps are visible in the list after creating a note | E2E | Not run yet | `frontend/e2e/notes.spec.ts` |

### US-014: No analytics, tracking, or server-side personal data

| Criteria | Test | Level | Result | File |
|---|---|---|---|---|
| AC-001 | [AC-001][NFR-005] a first-time visit with clean storage reaches a usable note-taking interface with no login, sign-up or account prompt | E2E | Not run yet | `frontend/e2e/privacy.spec.ts` |
| AC-002 | [AC-002] typing a note body from a clean session is captured with no authentication step | E2E | Not run yet | `frontend/e2e/privacy.spec.ts` |
| AC-016 | [AC-016] the help screen states notes are browser-only, unsynced, and lost on clearing data or changing device | E2E | Not run yet | `frontend/e2e/privacy.spec.ts` |
| AC-017 | [AC-017] no backup, export, import or sync control is reachable from the notes, editor or help screens | E2E | Not run yet | `frontend/e2e/privacy.spec.ts` |
| AC-028, AC-029 | [AC-028][AC-029] no payment, billing, subscription or paywall text or control appears on the notes, editor or help screens | E2E | Not run yet | `frontend/e2e/privacy.spec.ts` |
| AC-030 | [AC-030][NFR-001][NFR-002] creating, viewing and searching a note sends zero requests carrying note content and zero requests to a third-party origin | E2E | Not run yet | `frontend/e2e/privacy.spec.ts` |

## Project setup

| Criteria | Test | Level | Result | File |
|---|---|---|---|---|
| — | createStatements > creates only tables that do not exist yet | Unit | Passed | `backend/tests/database.test.ts` |
| — | databaseUrl > drops the driver part the platform writes | Unit | Passed | `backend/tests/database.test.ts` |
| — | databaseUrl > refuses to guess when no database is set | Unit | Passed | `backend/tests/database.test.ts` |
| — | health > reports ok | Unit | Passed | `backend/tests/health.test.ts` |
| — | My Notes > renders without crashing | Unit | Passed | `frontend/src/app.test.tsx` |
| — | the app loads | E2E | Not run yet | `frontend/e2e/example.spec.ts` |
<!-- sdlc:auto:end tests -->
