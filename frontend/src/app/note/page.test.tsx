import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi, beforeEach } from "vitest";

const { pushMock, notesMock, store, getSearchParams, setSearchParams } = vi.hoisted(() => {
  const store = new Map();
  let searchParamsValue = new URLSearchParams();
  return {
    pushMock: vi.fn(),
    store,
    getSearchParams: () => searchParamsValue,
    setSearchParams: (v: URLSearchParams) => {
      searchParamsValue = v;
    },
    notesMock: {
      get: vi.fn((id: string) => Promise.resolve(store.get(id))),
      put: vi.fn((rec: Record<string, unknown> & { id: string }) => {
        store.set(rec.id, rec);
        return Promise.resolve(rec.id);
      }),
      delete: vi.fn((id: string) => {
        store.delete(id);
        return Promise.resolve();
      }),
    },
  };
});

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
  usePathname: () => "/note",
  useSearchParams: () => getSearchParams(),
}));

vi.mock("@/lib/db", () => ({
  db: { notes: notesMock },
}));

import Screen from "./page";

beforeEach(() => {
  store.clear();
  notesMock.get.mockClear();
  notesMock.put.mockClear();
  notesMock.delete.mockClear();
  pushMock.mockClear();
  setSearchParams(new URLSearchParams());
});

describe("Note editor", () => {
  it("[AC-003] opening with no id starts a blank new note", async () => {
    render(<Screen />);
    await waitFor(() => expect(screen.getByLabelText(/title/i)).toHaveValue(""));
    expect(screen.getByLabelText(/^body$/i)).toHaveValue("");
  });

  it("[AC-003] opening with an existing note id loads its title, body and tags", async () => {
    store.set("n_1", {
      id: "n_1",
      title: "Existing",
      body: "Some body",
      tags: ["work", "ideas"],
      createdAt: "2026-11-01T10:00:00.000Z",
      updatedAt: "2026-11-02T10:00:00.000Z",
    });
    setSearchParams(new URLSearchParams("id=n_1"));

    render(<Screen />);

    await waitFor(() => expect(screen.getByLabelText(/title/i)).toHaveValue("Existing"));
    expect(screen.getByLabelText(/^body$/i)).toHaveValue("Some body");
    expect(screen.getByText("work")).toBeInTheDocument();
    expect(screen.getByText("ideas")).toBeInTheDocument();
  });

  it("[AC-003] saving writes the note to Dexie and returns to the list", async () => {
    const user = userEvent.setup();
    render(<Screen />);
    await waitFor(() => expect(screen.getByLabelText(/title/i)).toBeInTheDocument());

    await user.type(screen.getByLabelText(/title/i), "My Title");
    await user.type(screen.getByLabelText(/^body$/i), "My Body");
    await user.click(screen.getByRole("button", { name: /save note/i }));

    await waitFor(() => expect(notesMock.put).toHaveBeenCalledTimes(1));
    const saved = notesMock.put.mock.calls[0][0];
    expect(saved.title).toBe("My Title");
    expect(saved.body).toBe("My Body");

    await waitFor(() => expect(pushMock).toHaveBeenCalledWith("/notes"), { timeout: 2000 });
  });

  it("[AC-004] a note with body text and an empty title saves successfully", async () => {
    const user = userEvent.setup();
    render(<Screen />);
    await waitFor(() => expect(screen.getByLabelText(/title/i)).toBeInTheDocument());

    await user.type(screen.getByLabelText(/^body$/i), "Just a body, no title");
    await user.click(screen.getByRole("button", { name: /save note/i }));

    await waitFor(() => expect(notesMock.put).toHaveBeenCalledTimes(1));
    const saved = notesMock.put.mock.calls[0][0];
    expect(saved.title).toBe("");
    expect(saved.body).toBe("Just a body, no title");
  });

  it("[AC-005] typed formatting markup is stored and re-displayed as literal plain text", async () => {
    store.set("n_md", {
      id: "n_md",
      title: "Markup",
      body: "**bold** and - [ ] a checkbox",
      tags: [],
      createdAt: "2026-11-01T10:00:00.000Z",
      updatedAt: "2026-11-01T10:00:00.000Z",
    });
    setSearchParams(new URLSearchParams("id=n_md"));

    render(<Screen />);

    await waitFor(() =>
      expect(screen.getByLabelText(/^body$/i)).toHaveValue("**bold** and - [ ] a checkbox"),
    );
    expect(screen.queryByText(/^bold$/)).not.toBeInTheDocument();
  });

  it("[AC-012] on first save created_at and updated_at are both recorded", async () => {
    const user = userEvent.setup();
    render(<Screen />);
    await waitFor(() => expect(screen.getByLabelText(/title/i)).toBeInTheDocument());

    await user.type(screen.getByLabelText(/^body$/i), "First save body");
    await user.click(screen.getByRole("button", { name: /save note/i }));

    await waitFor(() => expect(notesMock.put).toHaveBeenCalledTimes(1));
    const saved = notesMock.put.mock.calls[0][0];
    expect(saved.createdAt).toBe(saved.updatedAt);
  });

  it("[AC-012] on re-save only updated_at changes", async () => {
    store.set("n_resave", {
      id: "n_resave",
      title: "Resave",
      body: "original",
      tags: [],
      createdAt: "2026-11-01T10:00:00.000Z",
      updatedAt: "2026-11-01T10:00:00.000Z",
    });
    setSearchParams(new URLSearchParams("id=n_resave"));

    const user = userEvent.setup();
    render(<Screen />);
    await waitFor(() => expect(screen.getByLabelText(/^body$/i)).toHaveValue("original"));

    await user.type(screen.getByLabelText(/^body$/i), " edited");
    await user.click(screen.getByRole("button", { name: /save note/i }));

    await waitFor(() => expect(notesMock.put).toHaveBeenCalledTimes(1));
    const saved = notesMock.put.mock.calls[0][0];
    expect(saved.createdAt).toBe("2026-11-01T10:00:00.000Z");
    expect(saved.updatedAt).not.toBe("2026-11-01T10:00:00.000Z");
  });

  it("[AC-013] displays the created and last-updated timestamps from stored data", async () => {
    store.set("n_stamp", {
      id: "n_stamp",
      title: "Stamped",
      body: "body",
      tags: [],
      createdAt: "2026-11-01T10:00:00.000Z",
      updatedAt: "2026-11-05T12:30:00.000Z",
    });
    setSearchParams(new URLSearchParams("id=n_stamp"));

    render(<Screen />);

    await waitFor(() => expect(screen.getByText(/Created 01 Nov 2026/)).toBeInTheDocument());
    expect(screen.getByText(/Last updated 05 Nov 2026/)).toBeInTheDocument();
  });
});
