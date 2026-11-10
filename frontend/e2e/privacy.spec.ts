import { expect, test, type Page, type Request } from "@playwright/test";

// These specs prove the app's core privacy promise: no account, no payment,
// and nothing sent to a server. They exercise the real IndexedDB in the
// browser (no mocking of storage) and intercept real network traffic
// (no mocking of app code) per the ticket's constraints.

async function clearAll(page: Page) {
  await page.goto("/notes");
  await page.evaluate(
    () =>
      new Promise<void>((resolve, reject) => {
        const req = indexedDB.deleteDatabase("notes-nextjs-express");
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
        req.onblocked = () => resolve();
      }),
  );
  await page.context().clearCookies();
}

const AUTH_RE = /\b(log\s?in|log\s?out|sign\s?in|sign\s?up|register|password|create an account)\b/i;
const PAYMENT_RE = /\b(payment|billing|subscription|subscribe|paywall|upgrade|pricing|checkout|credit card|trial)\b/i;
const SYNC_RE = /\b(backup|export|import|sync|synchroni[sz]e)\b/i;

test.beforeEach(async ({ page }) => {
  await clearAll(page);
});

test("[AC-001][NFR-005] a first-time visit with clean storage reaches a usable note-taking interface with no login, sign-up or account prompt", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/notes/, { timeout: 10_000 });
  await expect(page.getByRole("button", { name: /new note/i })).toBeVisible();
  await expect(page.getByText(AUTH_RE)).toHaveCount(0);
});

test("[AC-002] typing a note body from a clean session is captured with no authentication step", async ({
  page,
}) => {
  await page.goto("/note");
  await expect(page.getByText(AUTH_RE)).toHaveCount(0);

  const body = "Captured straight away, no sign-in required.";
  await page.locator("#note-body").fill(body);
  await page.getByRole("button", { name: /save note/i }).click();

  await expect(page).toHaveURL(/\/notes/, { timeout: 10_000 });
  await expect(page.getByText(AUTH_RE)).toHaveCount(0);
  await expect(page.getByText(/captured straight away/i)).toBeVisible();
});

test("[AC-030][NFR-001][NFR-002] creating, viewing and searching a note sends zero requests carrying note content and zero requests to a third-party origin", async ({
  page,
}) => {
  const secret = "Zx9Qv-SecretNoteContent-DoNotLeak-7f3";
  const requests: Request[] = [];
  await page.route("**/*", (route) => {
    requests.push(route.request());
    route.continue();
  });

  await page.goto("/note");
  await page.locator("#note-title").fill("Network interception check");
  await page.locator("#note-body").fill(secret);
  await page.getByRole("button", { name: /save note/i }).click();
  await expect(page).toHaveURL(/\/notes/, { timeout: 10_000 });

  // View it back
  await page.getByText(/network interception check/i).click();
  await expect(page.locator("#note-body")).toHaveValue(secret);

  // Search for it
  await page.goto("/notes");
  await page.locator("#note-search").fill(secret.slice(0, 10));
  await expect(page.getByText(/network interception check/i)).toBeVisible();

  const origin = new URL(page.url()).origin;
  for (const req of requests) {
    const url = req.url();
    const isSameOrigin = url.startsWith(origin) || url.startsWith("http://127.0.0.1") || url.startsWith("http://localhost");
    expect.soft(isSameOrigin, `request to third-party origin: ${url}`).toBeTruthy();

    const postData = req.postData();
    expect.soft(url.includes(secret), `note content leaked in URL: ${url}`).toBeFalsy();
    expect.soft(postData?.includes(secret) ?? false, `note content leaked in request body to ${url}`).toBeFalsy();
  }
});

test("[AC-028][AC-029] no payment, billing, subscription or paywall text or control appears on the notes, editor or help screens", async ({
  page,
}) => {
  await page.goto("/notes");
  await expect(page.getByText(PAYMENT_RE)).toHaveCount(0);

  await page.goto("/note");
  await expect(page.getByText(PAYMENT_RE)).toHaveCount(0);

  await page.goto("/help");
  await expect(page.getByText(PAYMENT_RE)).toHaveCount(0);
});

test("[AC-016] the help screen states notes are browser-only, unsynced, and lost on clearing data or changing device", async ({
  page,
}) => {
  await page.goto("/help");
  await expect(page.getByText(/kept only in this browser on this device/i)).toBeVisible();
  await expect(page.getByText(/no sync across devices or browsers/i)).toBeVisible();
  await expect(
    page.getByText(/clear your browser data, change browser or change device, these notes will not follow you/i),
  ).toBeVisible();
});

test("[AC-017] no backup, export, import or sync control is reachable from the notes, editor or help screens", async ({
  page,
}) => {
  await page.goto("/notes");
  for (const label of [/backup/i, /export/i, /import/i, /sync/i]) {
    await expect(page.getByRole("button", { name: label })).toHaveCount(0);
    await expect(page.getByRole("link", { name: label })).toHaveCount(0);
  }

  await page.goto("/note");
  for (const label of [/backup/i, /export/i, /import/i, /sync/i]) {
    await expect(page.getByRole("button", { name: label })).toHaveCount(0);
    await expect(page.getByRole("link", { name: label })).toHaveCount(0);
  }

  await page.goto("/help");
  for (const label of [/backup/i, /export/i, /import/i, /sync/i]) {
    await expect(page.getByRole("button", { name: label })).toHaveCount(0);
    await expect(page.getByRole("link", { name: label })).toHaveCount(0);
  }
});
