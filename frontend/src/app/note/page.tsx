"use client";
// Generated screens hold state and handle events, which a server component
// cannot do. Next.js renders on the server unless a module says otherwise.

// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { useSearchParams } from "next/navigation";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";
import { db } from "@/lib/db";

const { Button, Input, Textarea, Label, Badge } = UI;

const { Edit } = Icons;

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function hexToRgb(hex) {
  let h = String(hex).replace("#", "");
  if (h.length === 3)
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  const n = parseInt(h, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function alpha(hex, a) {
  const { r, g, b } = hexToRgb(hex);
  return "rgba(" + r + "," + g + "," + b + "," + a + ")";
}

function lighten(hex, amt) {
  const { r, g, b } = hexToRgb(hex);
  const m = (v) => Math.round(v + (255 - v) * amt);
  return "rgb(" + m(r) + "," + m(g) + "," + m(b) + ")";
}

function stamp(d) {
  const p = (n) => String(n).padStart(2, "0");
  return (
    p(d.getDate()) +
    " " +
    MONTHS[d.getMonth()] +
    " " +
    d.getFullYear() +
    ", " +
    p(d.getHours()) +
    ":" +
    p(d.getMinutes())
  );
}

function stampIso(iso) {
  if (!iso) return "Not yet saved";
  return stamp(new Date(iso));
}

function makeId() {
  return "n_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function Rule({ ink, gold, hair, wide = false }) {
  return (
    <div className="flex items-center" aria-hidden="true" style={{ gap: "12px" }}>
      <span
        className="block flex-1"
        style={{ height: "1px", backgroundColor: wide ? gold : hair }}
      />
      <span
        className="block"
        style={{
          width: "7px",
          height: "7px",
          transform: "rotate(45deg)",
          backgroundColor: gold,
          outline: "1px solid " + ink,
          outlineOffset: "2px",
        }}
      />
      <span
        className="block flex-1"
        style={{ height: "1px", backgroundColor: wide ? gold : hair }}
      />
    </div>
  );
}

function Frame({ ink, gold, surface, children = null, className = "" }) {
  return (
    <div
      className={className}
      style={{ border: "1px solid " + ink, padding: "4px", backgroundColor: "transparent" }}
    >
      <div style={{ border: "1px solid " + gold, backgroundColor: surface }}>{children}</div>
    </div>
  );
}

export default function Screen() {
  const navigate = useNavigate();
  const searchParams = useSearchParams();
  const noteId = searchParams ? searchParams.get("id") : null;

  const ink = brand.primaryColor;
  const gold = brand.accentColor;
  const muted = alpha(brand.primaryColor, 0.68);
  const surface = lighten(brand.backgroundColor, 0.62);
  const hair = alpha(brand.primaryColor, 0.14);
  const head = {
    fontFamily: brand.fontHeading,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
  };

  const DELETE_BTN_ID = "gz-delete-note";
  const CANCEL_BTN_ID = "gz-cancel-delete";

  const [id, setId] = React.useState(null);
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");
  const [tags, setTags] = React.useState([]);
  const [tagDraft, setTagDraft] = React.useState("");
  const [tagHint, setTagHint] = React.useState(null);
  const [createdAt, setCreatedAt] = React.useState(null);
  const [updatedAt, setUpdatedAt] = React.useState(null);
  const [loading, setLoading] = React.useState(Boolean(noteId));
  const [status, setStatus] = React.useState("idle"); // idle | dirty | saving | saved | error
  const [confirm, setConfirm] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);

  const timers = React.useRef([]);
  const later = (fn, ms) => {
    timers.current.push(window.setTimeout(fn, ms));
  };
  React.useEffect(
    () => () => {
      timers.current.forEach((t) => window.clearTimeout(t));
    },
    [],
  );

  React.useEffect(() => {
    let cancelled = false;
    if (noteId) {
      setLoading(true);
      db.notes
        .get(noteId)
        .then((rec) => {
          if (cancelled) return;
          if (rec) {
            setId(rec.id);
            setTitle(rec.title);
            setBody(rec.body);
            setTags(rec.tags || []);
            setCreatedAt(rec.created_at);
            setUpdatedAt(rec.updated_at);
          } else {
            setId(noteId);
          }
        })
        .finally(() => {
          if (!cancelled) setLoading(false);
        });
    } else {
      setId(makeId());
      setLoading(false);
    }
    return () => {
      cancelled = true;
    };
  }, [noteId]);

  const focusById = (idAttr) => {
    const el = typeof document !== "undefined" ? document.getElementById(idAttr) : null;
    if (el) el.focus();
  };

  const closeConfirm = () => {
    setConfirm(false);
    setDeleting(false);
    focusById(DELETE_BTN_ID);
  };

  React.useEffect(() => {
    if (!confirm) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") closeConfirm();
    };
    window.addEventListener("keydown", onKey);
    focusById(CANCEL_BTN_ID);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirm]);

  const touch = () => {
    setStatus((s) => (s === "saving" ? s : "dirty"));
  };

  const addTag = () => {
    const raw = tagDraft.trim().replace(/^#/, "").toLowerCase();
    if (!raw) {
      setTagHint("Type a word, then press Enter to pin it on.");
      return;
    }
    if (tags.indexOf(raw) !== -1) {
      setTagHint("“" + raw + "” is already on this note.");
      return;
    }
    setTags(tags.concat(raw));
    setTagDraft("");
    setTagHint(null);
    touch();
  };

  const removeTag = (t) => {
    setTags(tags.filter((x) => x !== t));
    setTagHint(null);
    touch();
  };

  const onSave = (e) => {
    if (e) e.preventDefault();
    if (status === "saving") return;
    if (!title.trim() && !body.trim()) {
      setStatus("error");
      return;
    }
    setStatus("saving");
    const now = new Date().toISOString();
    const nextCreatedAt = createdAt || now;
    const record = {
      id,
      title,
      body,
      tags,
      created_at: nextCreatedAt,
      updated_at: now,
    };
    db.notes
      .put(record)
      .then(() => {
        setCreatedAt(nextCreatedAt);
        setUpdatedAt(now);
        setStatus("saved");
        later(() => navigate("notes"), 900);
      })
      .catch(() => {
        setStatus("error");
      });
  };

  const confirmDelete = () => {
    setDeleting(true);
    db.notes.delete(id).finally(() => {
      later(() => navigate("notes"), 700);
    });
  };

  const fieldStyle = {
    borderRadius: "0px",
    border: "1px solid " + alpha(brand.primaryColor, 0.3),
    backgroundColor: lighten(brand.backgroundColor, 0.9),
    color: ink,
    fontFamily: brand.fontBody,
  };

  return (
    <div
      style={{ backgroundColor: brand.backgroundColor, color: ink, fontFamily: brand.fontBody }}
      className="min-h-full"
    >
      <style>{`
        .gz:focus-visible { outline: 2px solid ${ink}; outline-offset: 3px; }
        .gz-field:focus { outline: 2px solid ${ink}; outline-offset: 2px; border-color: ${ink} !important; }
        @keyframes gzIn { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: none; } }
        @keyframes gzPop { from { opacity: 0; transform: scale(.92); } to { opacity: 1; transform: none; } }
        @keyframes gzVeil { from { opacity: 0; } to { opacity: 1; } }
        .gz-in { animation: gzIn 240ms ease-out both; }
        .gz-pop { animation: gzPop 200ms ease-out both; }
        .gz-veil { animation: gzVeil 160ms linear both; }
        .gz-hov { transition: background-color 160ms ease, color 160ms ease, border-color 160ms ease; }
        @media (prefers-reduced-motion: reduce) {
          .gz-in, .gz-pop, .gz-veil { animation: none !important; }
          .gz-hov { transition: none !important; }
        }
      `}</style>

      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 py-8 sm:py-12">
        {/* Row 1 */}
        <div className="grid grid-cols-12 items-center gap-y-4 gap-x-4">
          <div className="col-span-12 sm:col-span-2 flex justify-start">
            <Button
              data-wf="b-0-0"
              type="button"
              onClick={() => navigate("notes")}
              className="gz gz-hov inline-flex items-center gap-2 px-3"
              style={{
                minHeight: "44px",
                borderRadius: "0px",
                backgroundColor: "transparent",
                border: "1px solid " + alpha(brand.primaryColor, 0.35),
                color: ink,
                fontSize: "11px",
                ...head,
              }}
            >
              <Icons.ArrowLeft className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">Back</span>
              <span className="sm:hidden">Back to notes</span>
            </Button>
          </div>

          <div className="col-span-12 sm:col-span-6 text-center">
            <h1
              data-wf="b-0-1"
              className="text-[28px] sm:text-[34px] leading-tight"
              style={{ ...head, fontWeight: 700 }}
            >
              {createdAt ? "Edit note" : "New note"}
            </h1>
            <p
              className="mt-1 text-[11px]"
              style={{ ...head, letterSpacing: "0.26em", color: muted }}
            >
              {createdAt ? "Note " + id : "Not yet saved"}
            </p>
          </div>

          <div className="col-span-12 sm:col-span-4 flex sm:justify-end">
            <Button
              data-wf="b-0-2"
              type="button"
              onClick={onSave}
              disabled={status === "saving"}
              aria-busy={status === "saving"}
              className="gz gz-hov inline-flex w-full sm:w-auto items-center justify-center gap-3 px-6"
              style={{
                minHeight: "48px",
                borderRadius: "0px",
                backgroundColor: ink,
                color: gold,
                border: "1px solid " + ink,
                boxShadow: "0 0 0 3px " + brand.backgroundColor + ", 0 0 0 4px " + gold,
                opacity: status === "saving" ? 0.72 : 1,
                fontSize: "12px",
                ...head,
              }}
            >
              <Icons.Check className="h-4 w-4" aria-hidden="true" />
              {status === "saving" ? "Saving…" : "Save note"}
            </Button>
          </div>
        </div>

        <div className="mt-7 mb-6">
          <Rule ink={ink} gold={gold} hair={hair} wide />
        </div>

        {/* status strip */}
        <div aria-live="polite" className="min-h-[28px] mb-5">
          {status === "saved" && (
            <p
              className="gz-in flex items-center justify-center gap-2 text-[11px]"
              style={{ ...head, color: ink }}
            >
              <Icons.CheckCircle className="h-4 w-4" aria-hidden="true" style={{ color: gold }} />
              Saved to this browser · returning to your notes
            </p>
          )}
          {status === "dirty" && (
            <p
              className="gz-in flex items-center justify-center gap-2 text-[11px]"
              style={{ ...head, color: muted }}
            >
              <Icons.Clock className="h-4 w-4" aria-hidden="true" />
              Unsaved changes — nothing is written until you save
            </p>
          )}
          {status === "error" && (
            <div
              className="gz-in flex items-start justify-center gap-3 px-4 py-3"
              style={{
                border: "1px solid " + ink,
                backgroundColor: alpha(brand.accentColor, 0.22),
              }}
            >
              <Icons.AlertCircle className="h-4 w-4 mt-[2px] shrink-0" aria-hidden="true" />
              <p className="text-[13px] leading-relaxed" style={{ color: ink }}>
                <span style={{ ...head, fontSize: "11px" }}>Nothing to save.</span> Both the title
                and the body are empty. Write a line of body text — a title on its own is optional,
                but an empty note is not kept. Your tags are untouched.
              </p>
            </div>
          )}
        </div>

        {/* Row 2 */}
        <Frame ink={ink} gold={gold} surface={surface}>
          {loading ? (
            <p
              role="status"
              className="px-5 sm:px-8 py-10 text-center text-[12px]"
              style={{ ...head, color: muted }}
            >
              Loading note…
            </p>
          ) : (
            <form data-wf="b-1-0" onSubmit={onSave} noValidate>
              <div className="px-5 sm:px-8 pt-6 pb-2 text-center">
                <h2 className="text-[13px]" style={{ ...head, fontWeight: 700 }}>
                  Note
                </h2>
                <div className="mt-4">
                  <Rule ink={ink} gold={gold} hair={hair} />
                </div>
              </div>

              <div className="px-5 sm:px-8 pb-7 pt-4" style={{ display: "grid", gap: "24px" }}>
                <div>
                  <Label
                    htmlFor="note-title"
                    className="block text-[11px] mb-2"
                    style={{ ...head, color: ink }}
                  >
                    Title <span style={{ color: muted, letterSpacing: "0.12em" }}>(optional)</span>
                  </Label>
                  <Input
                    data-wf="i-1-0-0"
                    id="note-title"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      touch();
                      if (status === "error") setStatus("dirty");
                    }}
                    placeholder="Kodachadri trek — packing & bus plan"
                    className="gz-field w-full px-3"
                    style={{ ...fieldStyle, minHeight: "48px", fontSize: "16px" }}
                  />
                  <p className="mt-2 text-[12px]" style={{ color: muted }}>
                    Leave it blank and the list will show the first line of the body instead.
                  </p>
                </div>

                <div>
                  <div className="flex items-baseline justify-between gap-4">
                    <Label
                      htmlFor="note-body"
                      className="block text-[11px] mb-2"
                      style={{ ...head, color: ink }}
                    >
                      Body
                    </Label>
                    <span
                      className="text-[12px] mb-2"
                      style={{ color: muted, fontVariantNumeric: "tabular-nums" }}
                    >
                      {body.length} characters
                    </span>
                  </div>
                  <Textarea
                    data-wf="i-1-0-1"
                    id="note-body"
                    rows={12}
                    value={body}
                    onChange={(e) => {
                      setBody(e.target.value);
                      touch();
                      if (status === "error") setStatus("dirty");
                    }}
                    aria-describedby="body-help"
                    placeholder="Write it as it comes. One long plain line is fine."
                    className="gz-field w-full px-3 py-3 leading-relaxed"
                    style={{ ...fieldStyle, fontSize: "15px", resize: "vertical" }}
                  />
                  <p id="body-help" className="mt-2 text-[12px]" style={{ color: muted }}>
                    Plain text only, no bold or checkboxes. Asterisks and dashes stay exactly as you
                    type them.
                  </p>
                </div>

                <div>
                  <Label
                    htmlFor="note-tags"
                    className="block text-[11px] mb-2"
                    style={{ ...head, color: ink }}
                  >
                    Tags
                  </Label>
                  <Input
                    data-wf="i-1-0-2"
                    id="note-tags"
                    value={tagDraft}
                    onChange={(e) => {
                      setTagDraft(e.target.value);
                      setTagHint(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addTag();
                      }
                      if (e.key === "Backspace" && !tagDraft && tags.length)
                        removeTag(tags[tags.length - 1]);
                    }}
                    aria-describedby="tags-help"
                    placeholder="work, ideas"
                    className="gz-field w-full px-3"
                    style={{ ...fieldStyle, minHeight: "48px", fontSize: "16px" }}
                  />
                  <p
                    id="tags-help"
                    className="mt-2 text-[12px]"
                    style={{ color: tagHint ? ink : muted }}
                  >
                    {tagHint ||
                      "Type a tag and press Enter. Free-form — no folders, no fixed list."}
                  </p>

                  {tags.length > 0 ? (
                    <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tags on this note">
                      {tags.map((t) => (
                        <li key={t} className="gz-pop">
                          <Badge
                            className="inline-flex items-center gap-2 pl-3 pr-1 py-1"
                            style={{
                              borderRadius: "0px",
                              border: "1px solid " + ink,
                              backgroundColor: alpha(brand.accentColor, 0.3),
                              color: ink,
                              fontSize: "11px",
                              ...head,
                            }}
                          >
                            {t}
                            <button
                              type="button"
                              onClick={() => removeTag(t)}
                              aria-label={"Remove tag " + t}
                              className="gz gz-hov inline-flex items-center justify-center"
                              style={{
                                width: "26px",
                                height: "26px",
                                border: "1px solid transparent",
                                color: ink,
                                backgroundColor: "transparent",
                              }}
                            >
                              <Icons.X className="h-3 w-3" aria-hidden="true" />
                            </button>
                          </Badge>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-4 text-[12px]" style={{ color: muted }}>
                      No tags yet — “packing” or “kollur” would do.
                    </p>
                  )}
                </div>
              </div>
            </form>
          )}
        </Frame>

        {/* Row 3 */}
        <p
          data-wf="b-2-0"
          className="mt-7 text-center text-[12px]"
          style={{ color: muted, fontVariantNumeric: "tabular-nums", letterSpacing: "0.04em" }}
        >
          Created {stampIso(createdAt)}
          <span aria-hidden="true" style={{ color: gold }}>
            {" "}
            ·{" "}
          </span>
          Last updated {stampIso(updatedAt)}
        </p>

        <div className="mt-8 mb-8">
          <Rule ink={ink} gold={gold} hair={hair} />
        </div>

        {/* Row 4 */}
        <div className="flex justify-center">
          <Button
            data-wf="b-3-0"
            id={DELETE_BTN_ID}
            type="button"
            onClick={() => setConfirm(true)}
            aria-haspopup="dialog"
            className="gz gz-hov inline-flex items-center justify-center gap-2 w-full sm:w-1/3 px-5"
            style={{
              minHeight: "44px",
              borderRadius: "0px",
              backgroundColor: "transparent",
              border: "1px solid " + ink,
              color: ink,
              fontSize: "11px",
              ...head,
            }}
          >
            <Icons.Trash className="h-4 w-4" aria-hidden="true" />
            Delete note
          </Button>
        </div>

        {/* Row 6 */}
        <p
          data-wf="b-5-0"
          className="mt-10 text-center text-[11px] leading-relaxed"
          style={{ ...head, letterSpacing: "0.2em", color: muted }}
        >
          Saved only in this browser. No sync, no backup, no export.
        </p>
      </div>

      {/* Row 5 */}
      {confirm && (
        <div
          data-wf="b-4-0"
          className="fixed inset-0 z-50 flex items-center justify-center px-4 gz-veil"
          style={{ backgroundColor: alpha(brand.primaryColor, 0.62) }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeConfirm();
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="del-title"
            aria-describedby="del-copy"
            className="gz-pop w-full max-w-md"
            style={{
              border: "1px solid " + gold,
              padding: "4px",
              backgroundColor: ink,
              boxShadow: "0 24px 60px " + alpha(brand.primaryColor, 0.45),
            }}
          >
            <div
              style={{ border: "1px solid " + gold, backgroundColor: brand.backgroundColor }}
              className="px-6 sm:px-8 py-7 text-center"
            >
              <h2 id="del-title" className="text-[18px]" style={{ ...head, fontWeight: 700 }}>
                Delete this note?
              </h2>
              <div className="my-5">
                <Rule ink={ink} gold={gold} hair={hair} />
              </div>
              <p id="del-copy" className="text-[14px] leading-relaxed" style={{ color: ink }}>
                Deleted notes cannot be recovered. There is no backup and no undo — “
                {title.trim() || "Untitled note"}” goes for good.
              </p>

              <div className="mt-7 flex flex-col sm:flex-row-reverse gap-3">
                <Button
                  type="button"
                  onClick={confirmDelete}
                  disabled={deleting}
                  aria-busy={deleting}
                  className="gz gz-hov inline-flex items-center justify-center gap-2 flex-1 px-5"
                  style={{
                    minHeight: "48px",
                    borderRadius: "0px",
                    backgroundColor: ink,
                    color: gold,
                    border: "1px solid " + ink,
                    opacity: deleting ? 0.72 : 1,
                    fontSize: "12px",
                    ...head,
                  }}
                >
                  <Icons.Trash className="h-4 w-4" aria-hidden="true" />
                  {deleting ? "Deleting…" : "Delete"}
                </Button>
                <Button
                  type="button"
                  id={CANCEL_BTN_ID}
                  onClick={closeConfirm}
                  className="gz gz-hov inline-flex items-center justify-center flex-1 px-5"
                  style={{
                    minHeight: "48px",
                    borderRadius: "0px",
                    backgroundColor: "transparent",
                    color: ink,
                    border: "1px solid " + alpha(brand.primaryColor, 0.4),
                    fontSize: "12px",
                    ...head,
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
