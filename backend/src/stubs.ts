/**
 * What a generated route returns until someone implements it.
 *
 * A stub that returns a body rather than throwing keeps the service startable, so the
 * frontend can be built against the agreed shape while the routes are still being written.
 */
export function notImplemented(endpoint: string): Record<string, string> {
  return {
    endpoint,
    status: "not_implemented",
    detail: "Scaffolded from the approved API spec; no behaviour yet.",
  };
}
