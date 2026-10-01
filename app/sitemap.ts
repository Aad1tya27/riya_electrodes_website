// app/sitemap.ts

import type { MetadataRoute } from "next"
import { getProducts } from "@/lib/actions"

const BASE_URL =
  "https://riya-electodes.agarwal-aaditya2765.workers.dev"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts()

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
    //   lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/products`,
    //   lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ]

  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${BASE_URL}/products/${product.id}`,
    // lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }))

  return [...staticPages, ...productPages]
}