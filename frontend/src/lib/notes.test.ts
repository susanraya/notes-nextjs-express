/**
 * jsdom has no real IndexedDB, so these tests stand in a minimal fake Dexie
 * table behind `./db` and exercise `notes.ts` against it. That is enough to
 * prove the contract this module owns -- id/timestamp assignment, that a
 * patch never touches `created_at`, ordering, and that nothing here mutates
 * or rejects the text it is given -- without needing a browser.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Note } from "./db";

type FakeTable = {
  rows: Map<string, Note>;
  add: (note: Note) => Promise<string>;
  get: (id: string) => Promise<Note | undefined>;
  put: (note: Note) => Promise<string>;
  delete: (id: string) => Promise<void>;
  orderBy: (field: keyof Note) => {
    reverse: () => { toArray: () => Promise<Note[]> };
  };
};

function makeFakeTable(): FakeTable {
  const rows = new Map<string, Note>();
  return {
    rows,
    add: async (note) => {
      rows.set(note.id, note);
      return note.id;
    },
    get: async (id) => rows.get(id),
    put: async (note) => {
      rows.set(note.id, note);
      return note.id;
    },
    delete: async (id) => {
      rows.delete(id);
    },
    orderBy: (field) => ({
      reverse: () => ({
        toArray: async () =>
          Array.from(rows.values()).sort((a, b) =>
            String(b[field]).localeCompare(String(a[field])),
          ),
      }),
    }),
  };
}

let fakeTable: FakeTable;

vi.mock("./db", () => ({
  get db() {
    return { notes: fakeTable };
  },
}));

beforeEach(() => {
  fakeTable = makeFakeTable();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("notes persistence", () => {
  it("[AC-012] createNote assigns id, created_at and updated_at with no caller input", async () => {
    const { createNote } = await import("./notes");
    const before = new Date().toISOString();
    const note = await createNote({ title: "Title", body: "Body", tags: ["a"] });
    const after = new Date().toISOString();

    expect(note.id).toBeTruthy();
    expect(note.created_at >= before && note.created_at <= after).toBe(true);
    expect(note.updated_at).toBe(note.created_at);
    expect(fakeTable.rows.get(note.id)).toEqual(note);
  });

  it("updateNote changes updated_at only and never alters created_at", async () => {
    const { createNote, updateNote } = await import("./notes");
    const note = await createNote({ title: "Original", body: "Body", tags: [] });
    const originalCreatedAt = note.created_at;

    await new Promise((resolve) => setTimeout(resolve, 2));
    const updated = await updateNote(note.id, { title: "Changed" });

    expect(updated?.created_at).toBe(originalCreatedAt);
    expect(updated?.updated_at).not.toBe(note.updated_at);
    expect(updated?.title).toBe("Changed");
  });

  it("listNotes returns all persisted notes ordered newest-updated first", async () => {
    const { createNote, updateNote, listNotes } = await import("./notes");
    const a = await createNote({ title: "A", body: "a", tags: [] });
    const b = await createNote({ title: "B", body: "b", tags: [] });
    await updateNote(a.id, { body: "a changed" });

    const notes = await listNotes();
    expect(notes.map((n) => n.id)).toEqual([a.id, b.id]);
  });

  it("getNote and deleteNote are exported and work against the store", async () => {
    const { createNote, getNote, deleteNote } = await import("./notes");
    const note = await createNote({ title: "T", body: "B", tags: [] });

    expect(await getNote(note.id)).toEqual(note);
    await deleteNote(note.id);
    expect(await getNote(note.id)).toBeUndefined();
  });

  it("[AC-004] a note with an empty title is persisted successfully rather than rejected", async () => {
    const { createNote, getNote } = await import("./notes");
    const note = await createNote({ title: "", body: "no title here", tags: [] });

    expect(note.title).toBe("");
    expect(await getNote(note.id)).toMatchObject({ title: "" });
  });

  it("[AC-005] title and body are stored verbatim, markup is never converted", async () => {
    const { createNote, getNote } = await import("./notes");
    const title = "**bold** heading";
    const body = "- [ ] unchecked item\n- [x] checked item\n**still bold**";
    const note = await createNote({ title, body, tags: [] });

    const stored = await getNote(note.id);
    expect(stored?.title).toBe(title);
    expect(stored?.body).toBe(body);
  });
});
