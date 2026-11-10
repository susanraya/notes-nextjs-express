/**
 * The baseline tests the scaffold ships with.
 *
 * The platform installs this tree and runs `npm test` against it, so there has to be
 * something green to run before an agent has written anything.
 */
import request from "supertest";
import { describe, expect, it } from "vitest";

import { createApp } from "../src/app.js";

describe("health", () => {
  it("reports ok", async () => {
    // A failure here means the app does not import or does not start.
    const response = await request(createApp()).get("/health");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: "ok" });
  });
});
