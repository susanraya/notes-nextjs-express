import { expect, test } from "@playwright/test";

// These specs exercise the real IndexedDB in the browser — no mocking of storage.
// Each test clears the "notes-nextjs-express" database before it runs so the
// empty-state assertions are deterministic regardless of execution order.
async function clearNotesDb(page: import("@playwright/test").Page) {
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
}

test.beforeEach(async ({ page }) => {
  await clearNotesDb(page);
});

test("[AC-007] with storage cleared, the list shows the empty state inviting first note creation", async ({
  page,
}) => {
  await page.goto("/notes");
  await expect(page.getByText(/nothing written yet/i)).toBeVisible();
  await expect(
    page.getByText(/no notes yet\. tap new note to write your first one\./i),
  ).toBeVisible();
});

test("[AC-003] a new note with title and body is created and then appears in the list with that title", async ({
  page,
}) => {
  await page.goto("/notes");
  await page.getByRole("button", { name: /new note/i }).click();
  await expect(page).toHaveURL(/\/note/);

  const title = "Kodachadri trek plan";
  const body = "Pack rain gear and book the early bus.";
  await page.locator("#note-title").fill(title);
  await page.locator("#note-body").fill(body);
  await page.getByRole("button", { name: /save note/i }).click();

  await expect(page).toHaveURL(/\/notes/, { timeout: 10_000 });
  await expect(page.getByText(title)).toBeVisible();
});

test("[AC-004][AC-006] a note saved with body text and no title appears in the list identified by a preview of its body", async ({
  page,
}) => {
  await page.goto("/notes");
  await page.getByRole("button", { name: /new note/i }).click();
  await expect(page).toHaveURL(/\/note/);

  const body =
    "No title on this one, just a long enough body so the preview can be checked reliably.";
  await page.locator("#note-body").fill(body);
  await page.getByRole("button", { name: /save note/i }).click();

  await expect(page).toHaveURL(/\/notes/, { timeout: 10_000 });
  const preview = body.slice(0, 44).trim();
  await expect(page.getByText(new RegExp(preview.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")))).toBeVisible();
  await expect(page.getByText(/untitled/i)).toBeVisible();
});

test("[AC-013] created and last-updated timestamps are visible in the list after creating a note", async ({
  page,
}) => {
  await page.goto("/notes");
  await page.getByRole("button", { name: /new note/i }).click();
  await expect(page).toHaveURL(/\/note/);

  await page.locator("#note-title").fill("Timestamp check");
  await page.locator("#note-body").fill("Body for timestamp visibility test.");
  await page.getByRole("button", { name: /save note/i }).click();

  await expect(page).toHaveURL(/\/notes/, { timeout: 10_000 });
  await expect(page.getByText(/updated\s/i)).toBeVisible();
  await expect(page.getByText(/created\s/i)).toBeVisible();
});

test("[AC-013] created and last-updated timestamps are visible in the editor after saving", async ({
  page,
}) => {
  await page.goto("/notes");
  await page.getByRole("button", { name: /new note/i }).click();
  await expect(page).toHaveURL(/\/note/);

  await page.locator("#note-title").fill("Editor timestamp check");
  await page.locator("#note-body").fill("Body for editor timestamp visibility test.");
  await page.getByRole("button", { name: /save note/i }).click();

  // The editor briefly shows "Saved" before navigating away; the timestamp strip
  // ("Created ... · Last updated ...") is rendered immediately on save.
  await expect(page.getByText(/last updated/i)).toBeVisible();
});
