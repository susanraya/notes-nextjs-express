"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

// The app opens on its first screen. A static export has no server to
// redirect with, so the browser does it.
export default function Page() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/notes");
  }, [router]);
  return null;
}
