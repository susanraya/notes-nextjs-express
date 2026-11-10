/**
 * The Express app for notes nextjs express.
 *
 * Generated from the approved architecture: one router per component that owns
 * endpoints, one handler per endpoint the API spec declares. Every generated handler is a
 * stub that returns a placeholder, so the service starts and passes its tests before a
 * single handler is implemented.
 */
import cors from "cors";
import express, { type Express } from "express";

import { router } from "./routes/api.js";

export function createApp(): Express {
  const app = express();

  // The SPA runs on a different origin than the API, so the browser refuses its calls
  // unless that origin is allowed here. In development that is the Vite dev server;
  // when deployed, the platform injects the frontend's real URL as ALLOWED_ORIGINS.
  const devOrigins = ["http://localhost:5173", "http://127.0.0.1:5173"];
  const allowed = (process.env.ALLOWED_ORIGINS ?? "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
  app.use(cors({ origin: allowed.length ? allowed : devOrigins, credentials: true }));
  app.use(express.json());

  /** Liveness probe, and the only handler here that is not a stub. */
  app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  // The endpoints the approved API spec actually names (GET /healthz, GET /*): mounted
  // after the generic /health check above so that one keeps answering regardless of what
  // a development ticket does with the routes below it.
  app.use(router);

  return app;
}
