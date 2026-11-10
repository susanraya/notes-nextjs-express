import { createApp } from "./app.js";

// 0.0.0.0 inside a container; `HOST=127.0.0.1` keeps a local run off the network.
const host = process.env.HOST ?? "0.0.0.0";
const port = Number(process.env.PORT ?? 8000);

createApp().listen(port, host, () => {
  console.log(`API listening on http://${host}:${port}`);
});
