/**
 * CRUD helpers over the `notes` table in `db.ts`. Every call here talks to
 * IndexedDB only -- no fetch, no XHR, no websocket -- because this app's notes
 * never leave the browser (see the architecture notes).
 *
 * `createNote` and `updateNote` own the timestamps: a caller cannot pass
 * `created_at` or `updated_at` in, and `updateNote` never lets a patch change
 * `created_at`. Title and body are stored exactly as given -- an empty title
 * is valid, and markup characters such as `**bold**` or `[ ]` are plain text
 * here, never parsed or transformed.
 */
import { db, type Note } from "./db";

export type NoteInput = {
  title: string;
  body: string;
  tags: string[];
};

export type NotePatch = Partial<Pick<Note, "title" | "body" | "tags">>;

function newId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export async function createNote(input: NoteInput): Promise<Note> {
  const now = new Date().toISOString();
  const note: Note = {
    id: newId(),
    title: input.title,
    body: input.body,
    tags: input.tags,
    created_at: now,
    updated_at: now,
  };
  await db.notes.add(note);
  return note;
}

export async function updateNote(id: string, patch: NotePatch): Promise<Note | undefined> {
  const existing = await db.notes.get(id);
  if (!existing) return undefined;
  const updated: Note = {
    ...existing,
    ...patch,
    id: existing.id,
    created_at: existing.created_at,
    updated_at: new Date().toISOString(),
  };
  await db.notes.put(updated);
  return updated;
}

export async function listNotes(): Promise<Note[]> {
  return db.notes.orderBy("updated_at").reverse().toArray();
}

export async function getNote(id: string): Promise<Note | undefined> {
  return db.notes.get(id);
}

export async function deleteNote(id: string): Promise<void> {
  await db.notes.delete(id);
}
