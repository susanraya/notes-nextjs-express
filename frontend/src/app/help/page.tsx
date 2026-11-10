"use client";
// Generated screens hold state and handle events, which a server component
// cannot do. Next.js renders on the server unless a module says otherwise.

// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

const INK = brand.primaryColor;
const GOLD = brand.accentColor;
const BG = brand.backgroundColor;
const MUTED = `color-mix(in srgb, ${INK} 68%, ${BG})`;
const HAIR = `color-mix(in srgb, ${INK} 20%, ${BG})`;
const PANEL = `color-mix(in srgb, ${BG} 84%, white)`;

const USING_ITEMS = [
  {
    id: "i-2-0-0",
    numeral: "I",
    lead: "Create",
    text: "tap New note, then enter a title and body. A note with no title is still saved.",
    detail:
      "Leave the title blank and My Notes labels the note with the first line of the body instead. Nothing is lost — the note is written to this browser the moment you save it.",
  },
  {
    id: "i-2-0-1",
    numeral: "II",
    lead: "Edit",
    text: "open a note from My Notes, change the title or body, then tap Save note.",
    detail:
      "The created stamp never moves. Only the last-updated stamp changes, so the list always sorts by what you touched most recently.",
  },
  {
    id: "i-2-0-2",
    numeral: "III",
    lead: "Delete",
    text: "open a note, tap Delete note and confirm.",
    detail:
      "You are asked to confirm first, because there is no trash and no undo. Once confirmed, the note is gone from this browser for good.",
  },
  {
    id: "i-2-0-3",
    numeral: "IV",
    lead: "Search",
    text: "type in the search box to match any word in a title or body.",
    detail:
      "Search reads every word of every note, title and body alike. Clear the box and the whole list returns, in the order you last edited.",
  },
  {
    id: "i-2-0-4",
    numeral: "V",
    lead: "Tag and filter",
    text: "add free-form tags to a note, then pick a tag above the list.",
    detail:
      "Tags are whatever you type — market, rent, recipes, Tuesday. One note can carry several. Pick a tag to narrow the list, pick it again to clear it. There are no folders to maintain.",
  },
];

const LIMIT_ITEMS = [
  { id: "i-3-0-0", text: "Plain text only — no bold, lists or checkboxes." },
  { id: "i-3-0-1", text: "Notes are kept only in this browser on this device." },
  { id: "i-3-0-2", text: "No sync across devices or browsers." },
  {
    id: "i-3-0-3",
    text: "No backup, export or import — notes are lost if you clear browser data.",
  },
  { id: "i-3-0-4", text: "No payments and no analytics or third-party tracking." },
];

const Diamond = ({ size = 8, color = GOLD }) => (
  <span
    aria-hidden="true"
    className="block shrink-0"
    style={{ width: size, height: size, backgroundColor: color, transform: "rotate(45deg)" }}
  />
);

const DoubleRule = ({ className = "" }) => (
  <div className={`flex items-center gap-4 ${className}`} aria-hidden="true">
    <span className="flex-1">
      <span className="block h-px" style={{ backgroundColor: INK }} />
      <span className="mt-[3px] block h-px" style={{ backgroundColor: GOLD }} />
    </span>
    <Diamond size={9} />
    <span className="flex-1">
      <span className="block h-px" style={{ backgroundColor: INK }} />
      <span className="mt-[3px] block h-px" style={{ backgroundColor: GOLD }} />
    </span>
  </div>
);

const Frame = ({ children, className = "" }) => (
  <div className={className} style={{ border: `1px solid ${INK}`, padding: "5px" }}>
    <div style={{ border: `1px solid ${GOLD}`, backgroundColor: PANEL }}>{children}</div>
  </div>
);

export default function Screen() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState({ "i-2-0-0": true });
  const [starting, setStarting] = React.useState(false);
  const timer = React.useRef(null);

  React.useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const toggle = (id) => setOpen((prev) => ({ ...prev, [id]: !prev[id] }));

  const startWriting = () => {
    if (starting) return;
    setStarting(true);
    timer.current = setTimeout(() => navigate("note"), 360);
  };

  const headingStyle = {
    fontFamily: brand.fontHeading,
    color: INK,
    letterSpacing: "0.18em",
  };

  return (
    <div
      className="mx-auto w-full max-w-[920px] px-4 py-10 sm:px-6 sm:py-14"
      style={{ fontFamily: brand.fontBody, color: INK, backgroundColor: "transparent" }}
    >
      <style>{`
        .gy-focus:focus-visible { outline: 2px solid ${INK}; outline-offset: 3px; }
        .gy-dark:focus-visible { outline: 2px solid ${GOLD}; outline-offset: 3px; }
        .gy-row:hover { background-color: color-mix(in srgb, ${GOLD} 16%, transparent); }
        .gy-cta { transition: background-color .2s ease, color .2s ease; }
        .gy-cta:hover { background-color: color-mix(in srgb, ${INK} 86%, ${GOLD}); }
        .gy-chev { transition: transform .22s ease; }
        .gy-open .gy-chev { transform: rotate(180deg); }
        .gy-panel { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .26s ease; }
        .gy-panel[data-open="true"] { grid-template-rows: 1fr; }
        .gy-panel > div { overflow: hidden; }
        @keyframes gyRise { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
        .gy-rise { animation: gyRise .36s ease-out both; }
        @media (prefers-reduced-motion: reduce) {
          .gy-rise { animation: none; }
          .gy-panel, .gy-chev, .gy-cta { transition: none; }
        }
      `}</style>

      {/* Row 1 — page title */}
      <header data-wf="b-0-0" className="gy-rise text-center">
        <p
          className="text-[11px] uppercase"
          style={{ color: MUTED, letterSpacing: "0.34em", fontVariantNumeric: "tabular-nums" }}
        >
          Guide &nbsp;&#9670;&nbsp; Reviewed 10 November 2026
        </p>
        <h1
          className="mt-4 text-[30px] uppercase leading-tight sm:text-[40px]"
          style={headingStyle}
        >
          Help &amp; Limitations
        </h1>
        <DoubleRule className="mx-auto mt-6 max-w-[640px]" />
      </header>

      {/* Row 2 — intro */}
      <section data-wf="b-1-0" className="gy-rise mt-8 text-center">
        <p className="mx-auto max-w-[62ch] text-[17px] leading-[1.6]">
          This is a free notes app with no account and no login. Open it, type, and your note is
          saved on this device.
        </p>
        <p
          className="mx-auto mt-6 inline-flex max-w-full flex-wrap items-center justify-center gap-3 px-5 py-2 text-[11px] uppercase"
          style={{
            border: `1px solid ${HAIR}`,
            color: MUTED,
            letterSpacing: "0.22em",
          }}
        >
          <Diamond size={6} />
          Stored in this browser only · nothing is sent to a server
          <Diamond size={6} />
        </p>
      </section>

      {/* Row 3 — using the app */}
      <section data-wf="b-2-0" className="gy-rise mt-12">
        <Frame>
          <div className="px-5 pb-2 pt-7 sm:px-10 sm:pt-9">
            <h2 className="text-center text-[18px] uppercase sm:text-[20px]" style={headingStyle}>
              Using the app
            </h2>
            <div className="mx-auto mt-5 flex max-w-[420px] items-center gap-3" aria-hidden="true">
              <span className="h-px flex-1" style={{ backgroundColor: GOLD }} />
              <Diamond size={7} />
              <span className="h-px flex-1" style={{ backgroundColor: GOLD }} />
            </div>
          </div>

          <ol className="px-2 pb-4 sm:px-6 sm:pb-6">
            {USING_ITEMS.map((item, i) => {
              const isOpen = !!open[item.id];
              return (
                <li
                  key={item.id}
                  className={isOpen ? "gy-open" : ""}
                  style={i > 0 ? { borderTop: `1px solid ${HAIR}` } : undefined}
                >
                  <button
                    type="button"
                    data-wf={item.id}
                    onClick={() => toggle(item.id)}
                    aria-expanded={isOpen}
                    aria-controls={`panel-${item.id}`}
                    className="gy-focus gy-row flex w-full items-start gap-4 px-3 py-4 text-left sm:px-4"
                    style={{ minHeight: 44, borderRadius: 0 }}
                  >
                    <span
                      className="mt-[2px] flex h-7 w-7 shrink-0 items-center justify-center text-[11px]"
                      style={{
                        backgroundColor: INK,
                        color: GOLD,
                        fontFamily: brand.fontHeading,
                        letterSpacing: "0.06em",
                        fontVariantNumeric: "tabular-nums",
                      }}
                      aria-hidden="true"
                    >
                      {item.numeral}
                    </span>
                    <span className="flex-1 text-[15px] leading-[1.55]">
                      <span className="uppercase" style={{ letterSpacing: "0.12em" }}>
                        {item.lead}:
                      </span>{" "}
                      {item.text}
                    </span>
                    <Icons.ChevronDown
                      className="gy-chev mt-[3px] h-4 w-4 shrink-0"
                      style={{ color: MUTED }}
                      aria-hidden="true"
                    />
                  </button>

                  <div className="gy-panel" data-open={isOpen} id={`panel-${item.id}`}>
                    <div>
                      <p
                        className="pb-5 pl-[60px] pr-4 text-[14px] leading-[1.6] sm:pl-[72px]"
                        style={{ color: MUTED }}
                      >
                        {item.detail}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </Frame>
      </section>

      {/* Row 4 — what this app does not do */}
      <section data-wf="b-3-0" className="gy-rise mt-10">
        <Frame>
          <div className="px-5 pb-2 pt-7 sm:px-10 sm:pt-9">
            <h2 className="text-center text-[18px] uppercase sm:text-[20px]" style={headingStyle}>
              What this app does not do
            </h2>
            <div className="mx-auto mt-5 flex max-w-[420px] items-center gap-3" aria-hidden="true">
              <span className="h-px flex-1" style={{ backgroundColor: GOLD }} />
              <Diamond size={7} />
              <span className="h-px flex-1" style={{ backgroundColor: GOLD }} />
            </div>
          </div>

          <ul className="px-5 pb-7 sm:px-10 sm:pb-9">
            {LIMIT_ITEMS.map((item, i) => (
              <li
                key={item.id}
                data-wf={item.id}
                className="flex items-start gap-4 py-4"
                style={i > 0 ? { borderTop: `1px solid ${HAIR}` } : undefined}
              >
                <span
                  className="mt-[1px] flex h-6 w-6 shrink-0 items-center justify-center"
                  style={{ backgroundColor: INK }}
                >
                  <Icons.X className="h-3.5 w-3.5" style={{ color: GOLD }} aria-hidden="true" />
                </span>
                <span className="text-[15px] leading-[1.55]">{item.text}</span>
              </li>
            ))}
          </ul>

          <div
            className="px-5 py-4 text-center text-[12px] leading-[1.6] sm:px-10"
            style={{ borderTop: `1px solid ${HAIR}`, color: MUTED }}
          >
            If you clear your browser data, change browser or change device, these notes will not
            follow you. Keep anything you cannot afford to lose somewhere else as well. There is no
            backup, export, import or sync feature anywhere in this app.
          </div>
        </Frame>
      </section>

      {/* Row 4b — privacy & compliance note */}
      <section data-wf="b-3-1" className="gy-rise mt-10">
        <Frame>
          <div className="px-5 py-7 text-center sm:px-10 sm:py-9">
            <h2 className="text-[18px] uppercase sm:text-[20px]" style={headingStyle}>
              Privacy &amp; compliance note
            </h2>
            <p
              className="mx-auto mt-5 max-w-[62ch] text-[13px] leading-[1.7]"
              style={{ color: MUTED }}
            >
              No personal data ever leaves this browser — nothing is sent to a server, and the app
              loads no analytics, telemetry or third-party tracking of any kind. Because no personal
              data reaches a server, we treat India&rsquo;s DPDP server-side obligations
              (consent/notice, breach notification and data residency) as not triggered. This is an
              assumption to be validated, not a legal conclusion.
            </p>
          </div>
        </Frame>
      </section>

      {/* Row 5 — start writing */}
      <div className="mt-12 grid grid-cols-12 gap-4">
        <div className="col-span-12 sm:col-span-4 sm:col-start-5">
          <UI.Button
            data-wf="b-4-0"
            type="button"
            onClick={startWriting}
            aria-busy={starting}
            className="gy-dark gy-cta flex w-full items-center justify-center gap-3 px-6 py-4 text-[12px] uppercase"
            style={{
              backgroundColor: INK,
              color: GOLD,
              borderRadius: 0,
              border: `1px solid ${INK}`,
              boxShadow: `0 0 0 4px ${BG}, 0 0 0 5px ${GOLD}`,
              letterSpacing: "0.26em",
              minHeight: 48,
              fontFamily: brand.fontHeading,
              cursor: starting ? "progress" : "pointer",
            }}
          >
            <Icons.Plus className="h-4 w-4" aria-hidden="true" />
            {starting ? "Opening editor" : "Start writing"}
          </UI.Button>
          <p
            className="mt-8 text-center text-[11px] uppercase"
            style={{ color: MUTED, letterSpacing: "0.22em" }}
          >
            Free · No account · No tracking
          </p>
        </div>
      </div>

      <DoubleRule className="mx-auto mt-10 max-w-[320px]" />
    </div>
  );
}
