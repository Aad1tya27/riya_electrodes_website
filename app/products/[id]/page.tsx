import { Suspense, use } from "react"
import ProductDetails from "./components/ProductDetails"

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#c2b490c4] to-[#c2b49050]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Suspense
          fallback={
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-barely-green"></div>
            </div>
          }
        >
          <ProductDetails productId={Number.parseInt(id)} />
        </Suspense>
      </div>
    </div>
  )
}
