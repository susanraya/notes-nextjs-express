import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import Page from "./page";

const pushMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
  usePathname: () => "/notes",
}));

// The screen talks to Dexie only through `db.notes`. Rather than wiring real
// IndexedDB into jsdom, this stubs the one table the screen reads and writes,
// matching the shape `frontend/src/lib/db.ts` exports.
let rows: Array<{
  id: string;
  title: string;
  body: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}> = [];

vi.mock("@/lib/db", () => ({
  db: {
    notes: {
      orderBy: () => ({
        reverse: () => ({
          toArray: async () => [...rows].sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1)),
        }),
      }),
      delete: async (id: string) => {
        rows = rows.filter((r) => r.id !== id);
      },
    },
  },
}));

const NOTE_A = {
  id: "n-a",
  title: "Standup notes",
  body: "Blocked on the cache name. Demo on Thursday.",
  tags: ["work"],
  createdAt: "2026-11-03T09:10:00.000Z",
  updatedAt: "2026-11-10T11:42:00.000Z",
};

const NOTE_B = {
  id: "n-b",
  title: "",
  body: "Call the electrician about the kitchen socket — mornings only, after 10.",
  tags: ["personal"],
  createdAt: "2026-11-04T07:50:00.000Z",
  updatedAt: "2026-11-04T07:55:00.000Z",
};

beforeEach(() => {
  rows = [];
  pushMock.mockClear();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("My Notes", () => {
  it("[AC-006] renders every note persisted in Dexie, not a seeded list", async () => {
    rows = [NOTE_A, NOTE_B];
    render(<Page />);

    await waitFor(() => expect(screen.getByText(/standup notes/i)).toBeInTheDocument());
    expect(screen.getByText(/call the electrician/i)).toBeInTheDocument();
    expect(screen.queryByText(/grocery list/i)).not.toBeInTheDocument();
  });

  it("[AC-006] shows a body preview for a row whose title is empty", async () => {
    rows = [NOTE_B];
    render(<Page />);

    await waitFor(() =>
      expect(screen.getByText(/call the electrician about the kitchen/i)).toBeInTheDocument(),
    );
    expect(screen.getByText("Untitled")).toBeInTheDocument();
  });

  it("[AC-007] shows the empty state inviting the user to create their first note", async () => {
    rows = [];
    render(<Page />);

    await waitFor(() => expect(screen.getByText(/nothing written yet/i)).toBeInTheDocument());
    const emptyState = screen.getByText(/nothing written yet/i).closest("div")!;
    const action = within(emptyState).getByRole("button", { name: /new note/i });
    await userEvent.click(action);
    expect(pushMock).toHaveBeenCalledWith("/note");
  });

  it("[AC-013] shows the stored created and updated timestamps formatted for display", async () => {
    rows = [NOTE_A];
    render(<Page />);

    await waitFor(() => expect(screen.getByText(/updated 10 nov 2026, 11:42/i)).toBeInTheDocument());
    expect(screen.getByText(/created 03 nov 2026, 09:10/i)).toBeInTheDocument();
  });

  it("tapping a row opens that specific note in the editor", async () => {
    rows = [NOTE_A];
    render(<Page />);

    await waitFor(() => expect(screen.getByText(/standup notes/i)).toBeInTheDocument());
    const row = screen.getByText(/standup notes/i).closest("button");
    await userEvent.click(row!);
    expect(pushMock).toHaveBeenCalledWith("/note?id=n-a");
  });

  it("deleting a note removes it from Dexie and from the list after confirmation", async () => {
    rows = [NOTE_A];
    render(<Page />);

    await waitFor(() => expect(screen.getByText(/standup notes/i)).toBeInTheDocument());
    const deleteButton = screen.getByRole("button", { name: /delete note: standup notes/i });
    await userEvent.click(deleteButton);

    const dialog = await screen.findByRole("dialog");
    const confirm = within(dialog).getByRole("button", { name: /^delete$/i });
    await userEvent.click(confirm);

    await waitFor(() =>
      expect(screen.queryByText(/standup notes/i, { selector: "span" })).not.toBeInTheDocument(),
    );
    expect(rows).toHaveLength(0);
  });
});
