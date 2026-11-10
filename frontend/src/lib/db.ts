/**
 * The local store: every note lives in this browser's IndexedDB, and no copy is ever
 * sent to a server (see `architecture notes` -- the Express backend only serves files).
 *
 * Dexie wraps IndexedDB with a typed, promise-based API. This module declares the one
 * table the approved data model names -- `notes` -- and exports a connected singleton.
 * A screen imports `db` and works with `db.notes` directly; this mirrors the backend's
 * `db()` / `schema.ts` split, except here the table is real because this app's data
 * does live in this store.
 *
 * No query or mutation helpers live here on purpose: which notes a screen shows, how a
 * search matches, and how a tag filters are the behaviour of the screen that needs them,
 * not of this schema.
 */
import Dexie, { type Table } from "dexie";

/** One note, exactly as the approved data model defines it. */
export interface Note {
  id: string;
  title: string;
  body: string;
  /** Free-form, user-typed tags -- not drawn from a fixed list. */
  tags: string[];
  created_at: string;
  updated_at: string;
}

class NotesDatabase extends Dexie {
  notes!: Table<Note, string>;

  constructor() {
    super("notes-nextjs-express");
    // `*tags` is a multi-entry index: a note with several tags is found by any one of
    // them, which tag filtering needs. `updated_at` is indexed so the list can sort by
    // most-recently-changed without scanning every row. Full-text search over title and
    // body has no index to use -- Dexie has none that matches free text -- so it stays
    // a plain scan in whichever screen implements it.
    this.version(1).stores({
      notes: "id, updated_at, created_at, *tags",
    });
  }
}

/** The one connection every screen shares; Dexie opens it lazily on first use. */
export const db = new NotesDatabase();
