import type { Metadata, Viewport } from "next"
import { legacyMarkup } from "./_legacy/markup"
import { LegacyScripts } from "./_legacy/LegacyScripts"
import "./_legacy/legacy.css"

export const metadata: Metadata = { title: "Granimals Trainer" }

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
}

// The trainer is the original vanilla app: static markup here, behaviour in
// /public/legacy/*.js. Data stays in this origin's localStorage/IndexedDB, so
// existing on-device progress is picked up unchanged.
export default function HomePage() {
  return (
    <>
      <div
        style={{ display: "contents" }}
        dangerouslySetInnerHTML={{ __html: legacyMarkup }}
      />
      <LegacyScripts />
    </>
  )
}
