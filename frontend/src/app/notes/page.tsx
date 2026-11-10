"use client";
// Generated screens hold state and handle events, which a server component
// cannot do. Next.js renders on the server unless a module says otherwise.

// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Button, Input, Label, Badge, Empty } = UI;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Search, Filter } = Icons;

const SCREEN = "My Notes";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const TAG_FILTERS = [
  { key: "all", label: "All notes", wf: "i-2-0-0" },
  { key: "work", label: "work", wf: "i-2-0-1" },
  { key: "personal", label: "personal", wf: "i-2-0-2" },
  { key: "ideas", label: "ideas", wf: "i-2-0-3" },
  { key: "recipes", label: "recipes", wf: "i-2-0-4" },
];

const NOTES = [
  {
    id: "n-standup",
    wf: "i-3-0-0",
    title: "Standup notes",
    body: "Blocked on the service worker cache name. Asha is taking the tag filter. Demo on Thursday, keep it to five minutes.",
    tags: ["work"],
    created_at: "2026-11-03T09:10",
    updated_at: "2026-11-10T11:42",
  },
  {
    id: "n-grocery",
    wf: "i-3-0-1",
    title: "Grocery list",
    body: "Toor dal 1kg, curd, curry leaves, two lemons, mustard oil, idli rice, Bru coffee, one coconut.",
    tags: ["personal"],
    created_at: "2026-11-09T17:52",
    updated_at: "2026-11-09T18:05",
  },
  {
    id: "n-journal",
    wf: "i-3-0-2",
    title: "App idea: offline journal",
    body: "One text box, no accounts, no sync. Everything stays in the browser. Tags instead of folders. Ships in a weekend.",
    tags: ["ideas"],
    created_at: "2026-11-07T20:58",
    updated_at: "2026-11-07T21:30",
  },
  {
    id: "n-chai",
    wf: "i-3-0-3",
    title: "Chai masala proportions",
    body: "Green cardamom 20g, cinnamon 8g, cloves 5g, dry ginger 15g, black pepper 4g. Grind coarse, store in a steel dabba.",
    tags: ["recipes"],
    created_at: "2026-10-18T08:40",
    updated_at: "2026-11-02T08:12",
  },
  {
    id: "n-retro",
    title: "Sprint retro — what to stop doing",
    body: "Stop reopening tickets after QA signs off. Start writing the acceptance note before the branch. Keep the Friday freeze.",
    tags: ["work"],
    created_at: "2026-11-06T15:44",
    updated_at: "2026-11-06T16:20",
  },
  {
    id: "n-rent",
    title: "Rent agreement renewal dates",
    body: "Current term ends 31 Jan 2027. Notice to the owner by 31 Dec. Registration charges split half and half, as last time.",
    tags: ["personal"],
    created_at: "2026-11-05T20:31",
    updated_at: "2026-11-05T20:48",
  },
  {
    id: "n-untitled",
    title: "",
    body: "Call the electrician about the kitchen socket — mornings only, after 10. Quote was 1,200 including the switch.",
    tags: ["personal"],
    created_at: "2026-11-04T07:50",
    updated_at: "2026-11-04T07:55",
  },
  {
    id: "n-tagsonly",
    title: "Ideas: tags instead of folders",
    body: "Folders force one home per note. Tags let the chai recipe be both recipes and personal. Filter is a single tap.",
    tags: ["ideas"],
    created_at: "2026-11-03T22:02",
    updated_at: "2026-11-03T22:14",
  },
  {
    id: "n-bisibele",
    title: "Bisi bele bath — amma's measurements",
    body: "Rice 1 cup, toor dal 3/4 cup, tamarind lime-sized, powder 3 tbsp. Vegetables go in before the dal, never after.",
    tags: ["recipes", "personal"],
    created_at: "2026-10-30T11:15",
    updated_at: "2026-11-01T12:30",
  },
  {
    id: "n-interview",
    title: "Interview questions for the Express role",
    body: "Ask about error middleware ordering. Ask what they put in a healthz route. Twenty minutes of code, ten of questions.",
    tags: ["work"],
    created_at: "2026-10-28T09:20",
    updated_at: "2026-10-29T10:05",
  },
  {
    id: "n-books",
    title: "Books to finish before December",
    body: "Em and the Big Hoom. The Shipping News. Half of A Suitable Boy, which has been half-read since March.",
    tags: ["personal"],
    created_at: "2026-10-26T19:12",
    updated_at: "2026-10-27T19:40",
  },
  {
    id: "n-rasam",
    title: "Lemon rasam without dal",
    body: "Tomato two, pepper-jeera crushed coarse, lemon squeezed off the flame. Coriander at the end or it turns bitter.",
    tags: ["recipes"],
    created_at: "2026-10-24T12:58",
    updated_at: "2026-10-24T13:15",
  },
];

export default function Screen() {
  const navigate = useNavigate();
  const [notes, setNotes] = React.useState(NOTES);
  const [query, setQuery] = React.useState("");
  const [tag, setTag] = React.useState("all");
  const [pending, setPending] = React.useState(null);
  const [status, setStatus] = React.useState("");
  const dialogRef = React.useRef(null);
  const searchWrapRef = React.useRef(null);

  const focusSearch = () => {
    const wrap = searchWrapRef.current;
    const input = wrap ? wrap.querySelector("input") : null;
    if (input) input.focus();
  };

  React.useEffect(() => {
    if (!pending) return;
    const sheet = dialogRef.current;
    const cancel = sheet ? sheet.querySelector("[data-cancel]") : null;
    if (cancel) cancel.focus();
  }, [pending]);

  React.useEffect(() => {
    if (!pending) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") setPending(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pending]);

  const frame = {
    border: `1px solid ${brand.accentColor}`,
    outline: `1px solid ${brand.primaryColor}`,
    outlineOffset: 3,
    borderRadius: brand.radius,
  };
  const caps = { fontFamily: brand.fontHeading, textTransform: "uppercase", letterSpacing: "0.3em" };
  const nums = { fontVariantNumeric: "tabular-nums" };

  const term = query.trim().toLowerCase();
  const filtered = notes.filter((n) => {
    const matchesTag = tag === "all" || n.tags.indexOf(tag) !== -1;
    const matchesTerm = term === "" || (n.title + " " + n.body).toLowerCase().indexOf(term) !== -1;
    return matchesTag && matchesTerm;
  });

  const filtering = term !== "" || tag !== "all";

  const stamp = (iso) => {
    const d = new Date(iso);
    const pad = (v) => String(v).padStart(2, "0");
    return pad(d.getDate()) + " " + MONTHS[d.getMonth()] + " " + d.getFullYear() + ", " + pad(d.getHours()) + ":" + pad(d.getMinutes());
  };
  const displayTitle = (n) => (n.title.trim() !== "" ? n.title : n.body.slice(0, 44).trim() + "…");

  const clearAll = () => {
    setTag("all");
    setQuery("");
    setStatus("Search and tag filter cleared.");
    focusSearch();
  };

  const confirmDelete = () => {
    if (!pending) return;
    setNotes((prev) => prev.filter((n) => n.id !== pending.id));
    setStatus("Deleted “" + displayTitle(pending) + "”. It cannot be recovered.");
    setPending(null);
  };

  const rule = (
    <div aria-hidden className="flex items-center gap-3">
      <span className="h-px flex-1" style={{ backgroundColor: brand.accentColor }} />
      <span className="text-xs" style={{ color: brand.accentColor }}>◆</span>
      <span className="h-px flex-1" style={{ backgroundColor: brand.accentColor }} />
    </div>
  );

  return (
    <div className="space-y-8" style={{ color: brand.primaryColor, fontFamily: brand.fontBody }}>
      <style>{`
        .gq-focus:focus-visible { outline: 2px solid ${brand.primaryColor}; outline-offset: 3px; }
        .gq-row { transition: background-color 160ms ease-out; animation: gq-in 220ms ease-out both; }
        .gq-row:hover { background-color: rgba(159,181,127,0.16); }
        .gq-chip { transition: background-color 140ms ease-out, color 140ms ease-out; }
        .gq-sheet { animation: gq-rise 180ms ease-out both; }
        @keyframes gq-in { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: none; } }
        @keyframes gq-rise { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        @media (prefers-reduced-motion: reduce) {
          .gq-row, .gq-sheet { animation: none; }
          .gq-row, .gq-chip { transition: none; }
        }
      `}</style>

      {/* Row 1 */}
      <div className="grid grid-cols-12 items-center gap-6">
        <header data-wf="b-0-0" className="col-span-12 space-y-3 text-center md:col-span-8">
          <h1 className="text-3xl" style={caps}>{SCREEN}</h1>
          <p className="text-[10px] uppercase tracking-[0.35em]" style={{ color: brand.neutralColor, ...nums }}>
            Kept in this browser — {notes.length} note{notes.length === 1 ? "" : "s"} on this device
          </p>
        </header>
        <div className="col-span-12 flex justify-center md:col-span-4 md:justify-end">
          <Button
            data-wf="b-0-1"
            onClick={() => navigate("note")}
            className="gq-focus inline-flex min-h-[44px] items-center gap-3 px-6 text-[11px]"
            style={{
              backgroundColor: brand.primaryColor,
              color: brand.accentColor,
              borderRadius: brand.radius,
              outline: `1px solid ${brand.accentColor}`,
              outlineOffset: 3,
              fontFamily: brand.fontHeading,
              textTransform: "uppercase",
              letterSpacing: "0.3em",
            }}
          >
            <Icons.Plus aria-hidden className="h-4 w-4" />
            New note
          </Button>
        </div>
      </div>

      {rule}

      {/* Row 2 */}
      <div data-wf="b-1-0" className="mx-auto w-full max-w-xl space-y-3 text-center">
        <Label htmlFor="note-search" className="block text-[10px] uppercase tracking-[0.3em]" style={{ color: brand.neutralColor }}>
          Search titles and body text
        </Label>
        <div
          ref={searchWrapRef}
          className="flex items-center gap-3 px-4"
          style={{ border: `1px solid ${brand.accentColor}`, borderRadius: brand.radius }}
        >
          <Icons.Search aria-hidden className="h-4 w-4 shrink-0" style={{ color: brand.accentColor }} />
          <Input
            id="note-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search titles and body text"
            className="gq-focus h-11 flex-1 border-0 bg-transparent px-0 text-center text-xs tracking-[0.2em] shadow-none outline-none placeholder:opacity-60"
            style={{ color: brand.primaryColor, borderRadius: brand.radius }}
          />
        </div>
      </div>

      {/* Row 3 */}
      <section data-wf="b-2-0" aria-labelledby="tag-filter-heading" className="space-y-4 text-center">
        <h2 id="tag-filter-heading" className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.3em]" style={{ color: brand.neutralColor }}>
          <Icons.Filter aria-hidden className="h-3.5 w-3.5" style={{ color: brand.accentColor }} />
          Filter by tag
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {TAG_FILTERS.map((t) => {
            const on = tag === t.key;
            return (
              <button
                key={t.key}
                type="button"
                data-wf={t.wf}
                aria-pressed={on}
                onClick={() => setTag(t.key)}
                className="gq-focus gq-chip inline-flex min-h-[44px] items-center gap-2 px-5 text-[10px] uppercase tracking-[0.25em]"
                style={{
                  border: `1px solid ${brand.accentColor}`,
                  borderRadius: brand.radius,
                  backgroundColor: on ? brand.primaryColor : "transparent",
                  color: on ? brand.accentColor : brand.primaryColor,
                  fontFamily: brand.fontHeading,
                }}
              >
                {on ? <Icons.Check aria-hidden className="h-3.5 w-3.5" /> : null}
                {t.label}
              </button>
            );
          })}
          <button
            type="button"
            data-wf="i-2-0-5"
            onClick={clearAll}
            disabled={!filtering}
            className="gq-focus gq-chip inline-flex min-h-[44px] items-center gap-2 px-5 text-[10px] uppercase tracking-[0.25em] disabled:cursor-not-allowed disabled:opacity-40"
            style={{
              border: `1px dashed ${brand.neutralColor}`,
              borderRadius: brand.radius,
              color: brand.neutralColor,
              fontFamily: brand.fontHeading,
            }}
          >
            <Icons.X aria-hidden className="h-3.5 w-3.5" />
            Clear filter
          </button>
        </div>
      </section>

      {/* Row 4 */}
      <section data-wf="b-3-0" aria-labelledby="note-list-heading" className="p-6 sm:p-8" style={frame}>
        <div className="space-y-3 text-center">
          <h2 id="note-list-heading" className="text-sm" style={caps}>
            {filtered.length} note{filtered.length === 1 ? "" : "s"}
          </h2>
          <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: brand.neutralColor, ...nums }}>
            {filtering ? "Filtered from " + notes.length + " on this device" : "Newest change first"}
          </p>
          {rule}
        </div>

        <p aria-live="polite" className="mt-4 min-h-[16px] text-center text-[11px] tracking-[0.1em]" style={{ color: brand.neutralColor }}>
          {status}
        </p>

        {filtered.length > 0 ? (
          <ul className="mt-2">
            {filtered.map((n, i) => (
              <li key={n.id} className="gq-row flex items-center gap-4 px-2 py-4" style={{ borderTop: i === 0 ? "none" : `1px solid ${brand.accentColor}66` }}>
                <span
                  aria-hidden
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-base"
                  style={{ border: `1px solid ${brand.accentColor}`, fontFamily: brand.fontHeading, color: brand.accentColor }}
                >
                  {displayTitle(n).charAt(0).toUpperCase()}
                </span>
                <button
                  type="button"
                  data-wf={n.wf}
                  onClick={() => navigate("note")}
                  className="gq-focus min-h-[44px] flex-1 text-left"
                >
                  <span className="flex flex-wrap items-center gap-2 text-xs" style={caps}>
                    {displayTitle(n)}
                    {n.title.trim() === "" ? (
                      <Badge
                        className="text-[9px] uppercase tracking-[0.2em]"
                        style={{ backgroundColor: "transparent", border: `1px solid ${brand.neutralColor}`, color: brand.neutralColor, borderRadius: brand.radius }}
                      >
                        Untitled
                      </Badge>
                    ) : null}
                  </span>
                  <span className="mt-2 block text-[10px] uppercase tracking-[0.22em]" style={{ color: brand.neutralColor, ...nums }}>
                    updated {stamp(n.updated_at)} · {n.tags.join(" · ")}
                  </span>
                  <span className="mt-1 block text-[10px] tracking-[0.12em]" style={{ color: brand.neutralColor, ...nums }}>
                    created {stamp(n.created_at)}
                  </span>
                </button>
                <button
                  type="button"
                  aria-label={"Delete note: " + displayTitle(n)}
                  onClick={() => setPending(n)}
                  className="gq-focus flex h-11 w-11 shrink-0 items-center justify-center"
                  style={{ border: `1px solid ${brand.accentColor}`, borderRadius: brand.radius, color: brand.primaryColor }}
                >
                  <Icons.Trash aria-hidden className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          /* Row 5 */
          <div className="mt-2 grid grid-cols-12">
            {notes.length === 0 ? (
              <div data-wf="b-4-0" className="col-span-12 p-6 md:col-span-6 md:col-start-4" style={frame}>
                <Empty
                  title="Nothing written yet"
                  description="No notes yet. Tap New note to write your first one."
                  action={
                    <Button
                      onClick={() => navigate("note")}
                      className="gq-focus inline-flex min-h-[44px] items-center gap-3 px-6 text-[11px]"
                      style={{
                        backgroundColor: brand.primaryColor,
                        color: brand.accentColor,
                        borderRadius: brand.radius,
                        fontFamily: brand.fontHeading,
                        textTransform: "uppercase",
                        letterSpacing: "0.3em",
                      }}
                    >
                      <Icons.Plus aria-hidden className="h-4 w-4" />
                      New note
                    </Button>
                  }
                />
              </div>
            ) : (
              <div data-wf="b-4-1" className="col-span-12 p-6 md:col-span-6 md:col-start-4" style={frame}>
                <Empty
                  title="Nothing matches"
                  description={
                    term !== ""
                      ? "No results for “" + query.trim() + "”. Clear the search or the tag filter to see all notes."
                      : "No notes carry the tag “" + tag + "”. Clear the search or the tag filter to see all notes."
                  }
                  action={
                    <Button
                      onClick={clearAll}
                      className="gq-focus inline-flex min-h-[44px] items-center gap-3 px-6 text-[11px]"
                      style={{
                        backgroundColor: "transparent",
                        border: `1px solid ${brand.accentColor}`,
                        color: brand.primaryColor,
                        borderRadius: brand.radius,
                        fontFamily: brand.fontHeading,
                        textTransform: "uppercase",
                        letterSpacing: "0.3em",
                      }}
                    >
                      <Icons.X aria-hidden className="h-4 w-4" />
                      Clear filter
                    </Button>
                  }
                />
              </div>
            )}
          </div>
        )}
      </section>

      {/* Row 6 */}
      {pending ? (
        <div data-wf="b-5-0" className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: "rgba(18,32,28,0.62)" }}>
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-title"
            aria-describedby="delete-copy"
            className="gq-sheet w-full max-w-md p-8 text-center shadow-2xl"
            style={{ ...frame, backgroundColor: brand.backgroundColor }}
          >
            <h2 id="delete-title" className="text-sm" style={caps}>
              Delete “{displayTitle(pending)}”?
            </h2>
            <div className="mt-4">{rule}</div>
            <p id="delete-copy" className="mt-4 text-sm leading-relaxed" style={{ color: brand.primaryColor }}>
              Deleted notes cannot be recovered. This note lives only in this browser, so there is no copy anywhere else.
            </p>
            <p className="mt-2 text-[10px] uppercase tracking-[0.25em]" style={{ color: brand.neutralColor, ...nums }}>
              updated {stamp(pending.updated_at)} · {pending.tags.join(" · ")}
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                data-cancel="true"
                onClick={() => setPending(null)}
                className="gq-focus min-h-[44px] w-full px-6 text-[11px] sm:w-auto"
                style={{
                  backgroundColor: "transparent",
                  border: `1px solid ${brand.accentColor}`,
                  color: brand.primaryColor,
                  borderRadius: brand.radius,
                  fontFamily: brand.fontHeading,
                  textTransform: "uppercase",
                  letterSpacing: "0.3em",
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={confirmDelete}
                className="gq-focus inline-flex min-h-[44px] w-full items-center justify-center gap-3 px-6 text-[11px] sm:w-auto"
                style={{
                  backgroundColor: brand.primaryColor,
                  color: brand.accentColor,
                  borderRadius: brand.radius,
                  fontFamily: brand.fontHeading,
                  textTransform: "uppercase",
                  letterSpacing: "0.3em",
                }}
              >
                <Icons.Trash aria-hidden className="h-4 w-4" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      ) : null}

      {/* Row 7 */}
      <footer data-wf="b-6-0" className="mx-auto max-w-2xl space-y-3 text-center">
        {rule}
        <p className="flex items-start justify-center gap-3 text-sm leading-relaxed" style={{ color: brand.neutralColor }}>
          <Icons.AlertCircle aria-hidden className="mt-0.5 h-4 w-4 shrink-0" style={{ color: brand.accentColor }} />
          <span>
            Your notes are stored only in this browser on this device. Nothing is sent to a server, and notes will be lost if you clear browser data or switch devices.
          </span>
        </p>
      </footer>
    </div>
  );
}
