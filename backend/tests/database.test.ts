import { describe, expect, it } from "vitest";

import { createStatements, databaseUrl } from "../src/db.js";

describe("databaseUrl", () => {
  it("drops the driver part the platform writes", () => {
    const url = "postgresql+driver://app:secret@db:5432/app";
    expect(databaseUrl({ DATABASE_URL: url })).toBe("postgresql://app:secret@db:5432/app");
  });

  it("refuses to guess when no database is set", () => {
    expect(() => databaseUrl({})).toThrow("DATABASE_URL is not set");
  });
});

describe("createStatements", () => {
  it("creates only tables that do not exist yet", () => {
    for (const statement of createStatements()) {
      expect(statement.startsWith("CREATE TABLE IF NOT EXISTS")).toBe(true);
    }
  });
});
