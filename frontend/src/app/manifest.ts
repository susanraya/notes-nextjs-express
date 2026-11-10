import type { MetadataRoute } from "next";

import { brand } from "@/lib/brand";

// The special `app/manifest.ts` file: Next.js builds this into `/manifest.webmanifest`
// and injects the `<link rel="manifest">` tag itself, so no screen or layout has to
// reference it by hand. Static metadata only -- the service worker that makes the app
// installable offline is a separate, later piece of work.
//
// `output: "export"` (see next.config.ts) has no server to render this on request, so
// every special metadata route has to say it builds to a static file instead.
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "notes nextjs express",
    short_name: "Notes",
    description: "A login-free notes app. Notes are kept only in this browser.",
    start_url: "/notes/",
    display: "standalone",
    background_color: brand.backgroundColor,
    theme_color: brand.primaryColor,
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
