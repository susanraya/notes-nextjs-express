/**
 * Handlers for API.
 *
 * Endpoints the approved API spec declares without naming a component that owns them.
 *
 * Every handler is a stub returning a placeholder. The shape comes from the approved
 * API spec; the behaviour does not exist yet.
 */
import { Router } from "express";

import { notImplemented } from "../stubs.js";

export const router = Router();

/** Liveness probe for the static app server. */
router.get("/healthz", (_req, res) => {
  res.json(notImplemented("GET /healthz"));
});

/**
 * Serve the built Next.js app files, PWA manifest and service worker to the browser. No
 * note data is handled server-side.
 *
 * `/{*splat}` rather than `/*`: Express 5's router (path-to-regexp v8) requires every
 * wildcard to be named, and wraps it in `{}` so the pattern also matches the root path
 * `/` -- without the braces a bare `/*splat` would miss it. See the Express 5 migration
 * guide.
 */
router.get("/{*splat}", (_req, res) => {
  res.json(notImplemented("GET /*"));
});
