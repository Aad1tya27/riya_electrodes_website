import { Suspense } from "react"
import ProductsContent from "./components/ProductsContent"


export default function Products() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-tan-blonde to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold mb-8 text-brown-shirts text-center">Our Products</h1>
        <Suspense
          fallback={
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-barely-green"></div>
            </div>
          }
        >
          <ProductsContent/>
        </Suspense>
      </div>
    </div>
  )
}
