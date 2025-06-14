'use server'
import { promises as fs } from "fs"
import path from "path"

export interface Product {
  id: number
  name: string
  category: string
  brand: string
  description: string
  images: string[]
  measurements: Array<{ [key: string]: string }>
  advantages?: string[],
  table?: { [key: string]: string }
}

export interface DatabaseData {
  categories: string[]
  brands: string[]
  products: Product[]
}

async function readDatabase(): Promise<DatabaseData> {
  try {
    const filePath = path.join(process.cwd(), "db.json")
    const fileContents = await fs.readFile(filePath, "utf8")
    return JSON.parse(fileContents)
  } catch (error) {
    console.error("Error reading database:", error)
    // Return default data if file doesn't exist
    return {
      categories: ["Wires", "Filters", "Resins"],
      brands: ["Nakanishi", "Hitachi", "Besdia", "Shofu", "Kuraray"],
      products: [],
    }
  }
}

export async function getProducts(brand?: string, category?: string): Promise<Product[]> {
  const data = await readDatabase()
  let products = data.products

  if (brand && brand !== "All") {
    products = products.filter((product) => product.brand === brand)
  }

  if (category && category !== "All") {
    products = products.filter((product) => product.category === category)
  }

  return products
}

export async function getProduct(id: number): Promise<Product | null> {
  const data = await readDatabase()
  const product = data.products.find((p) => p.id === id)
  return product || null
}

export async function getCategories(): Promise<string[]> {
  const data = await readDatabase()
  return data.categories
}

export async function getBrands(): Promise<string[]> {
  const data = await readDatabase()
  return data.brands
}
