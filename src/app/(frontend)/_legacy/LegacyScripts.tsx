"use client"

// Classic scripts share one global scope, exactly as in the original index.html.
// async=false keeps them executing in order; the flag prevents a second run.

import { useEffect } from "react"

const VERSION = "11"
const SCRIPTS = ["phases", "heavyduty", "explore", "food", "profile", "bodymap", "app", "sync"].map(
  (name) => `/legacy/${name}.js?v=${VERSION}`,
)
export function LegacyScripts() {
  useEffect(() => {
    const w = window as typeof window & { __granimalsLoaded?: boolean }
    if (w.__granimalsLoaded) return
    w.__granimalsLoaded = true
    for (const src of SCRIPTS) {
      const s = document.createElement("script")
      s.src = src
      s.async = false
      document.body.appendChild(s)
    }
  }, [])
  return null
}
