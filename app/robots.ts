// app/robots.ts

import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },

    sitemap:
      "https://riya-electodes.agarwal-aaditya2765.workers.dev/sitemap.xml",
  }
}