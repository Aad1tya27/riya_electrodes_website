export interface Product {
  id: number
  name: string
  category: string
  brand: string
  description: string
  images: string[]
  measurements: Array<{ [key: string]: string }>
  advantages?: string[]
  table?: { [key: string]: string }
}
