import { Product } from "./product"

export interface DatabaseData {
  categories: string[]
  brands: string[]
  products: Product[]
}