/**
 * The database, connected on first use.
 *
 * Nothing connects at startup: the app starts, and its health check and tests pass, with
 * no database at all. The first call to `db()` connects with `DATABASE_URL` and creates
 * any table in `schema.ts` that does not exist yet -- it never alters or drops one. The
 * scaffold ships no migrations; replace that with drizzle-kit migrations before anything
 * holds data worth keeping.
 */
import { is } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import {
  getTableConfig,
  PgTable,
  type PgDatabase,
  type PgQueryResultHKT,
} from "drizzle-orm/pg-core";

import * as schema from "./schema.js";

export type Database = PgDatabase<PgQueryResultHKT, typeof schema>;

type TableConfig = ReturnType<typeof getTableConfig>;

let connecting: Promise<Database> | undefined;

/** The connected database; the first call connects, later ones share it. */
export function db(): Promise<Database> {
  connecting ??= connect().catch((error: unknown) => {
    connecting = undefined; // a failed connection is retried by the next call
    throw error;
  });
  return connecting;
}

/**
 * `DATABASE_URL` without a driver part: the platform writes one form for every backend
 * (`postgresql+psycopg://...`), and the Node drivers take the plain scheme.
 */
export function databaseUrl(env: NodeJS.ProcessEnv = process.env): string {
  const url = env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not set, so there is no database to connect to.");
  }
  return url.replace(/^([a-z][a-z0-9.-]*)\+[a-z0-9]+:/i, "$1:");
}

async function connect(): Promise<Database> {
  if (!process.env.DATABASE_URL) {
    return inMemory();
  }
  const pool = new pg.Pool({ connectionString: databaseUrl() });
  for (const statement of createStatements()) {
    await pool.query(statement);
  }
  return drizzle(pool, { schema });
}

/** `CREATE TABLE IF NOT EXISTS` for every table in the schema, referenced tables first. */
export function createStatements(): string[] {
  const tables = (Object.values(schema) as unknown[])
    .filter((value): value is PgTable => is(value, PgTable))
    .map((table) => getTableConfig(table));
  const byName = new Map(tables.map((table) => [table.name, table]));
  const ordered: TableConfig[] = [];
  const seen = new Set<string>();
  const visit = (table: TableConfig): void => {
    if (seen.has(table.name)) return;
    seen.add(table.name);
    for (const key of table.foreignKeys) {
      const target = byName.get(getTableConfig(key.reference().foreignTable).name);
      if (target) visit(target);
    }
    ordered.push(table);
  };
  tables.forEach(visit);
  return ordered.map(createTable);
}

function createTable(table: TableConfig): string {
  const columns = table.columns.map((column) =>
    [
      quote(column.name),
      column.getSQLType(),
      column.primary ? "PRIMARY KEY" : column.notNull ? "NOT NULL" : "",
    ]
      .filter(Boolean)
      .join(" "),
  );
  const keys = table.foreignKeys.map((key) => {
    const reference = key.reference();
    const from = reference.columns.map((column) => quote(column.name)).join(", ");
    const to = reference.foreignColumns.map((column) => quote(column.name)).join(", ");
    const target = quote(getTableConfig(reference.foreignTable).name);
    return `FOREIGN KEY (${from}) REFERENCES ${target} (${to})`;
  });
  return `CREATE TABLE IF NOT EXISTS ${quote(table.name)} (${[...columns, ...keys].join(", ")})`;
}

// How PostgreSQL quotes a name.
const QUOTE = '"';

function quote(name: string): string {
  return QUOTE + name.replaceAll(QUOTE, QUOTE + QUOTE) + QUOTE;
}

/**
 * No `DATABASE_URL`: an in-memory PostgreSQL (PGlite), so the API runs end to end with no
 * database server -- the way the e2e suite boots it. Nothing it holds survives a restart,
 * and the production image leaves it out (see the Dockerfile): a deployment always sets
 * `DATABASE_URL`.
 */
async function inMemory(): Promise<Database> {
  const { PGlite } = await import("@electric-sql/pglite");
  const { drizzle: drizzlePglite } = await import("drizzle-orm/pglite");
  const client = new PGlite();
  for (const statement of createStatements()) {
    await client.exec(statement);
  }
  console.warn("DATABASE_URL is not set: using an in-memory PostgreSQL that keeps nothing.");
  // A CommonJS build (NestJS) types a dynamic import by the package's ES module build, so
  // the two halves of Drizzle's types differ by name only; the object is the same.
  return drizzlePglite(client, { schema }) as unknown as Database;
}
