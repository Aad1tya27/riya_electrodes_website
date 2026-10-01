import type { Metadata } from "next"
import { notFound } from "next/navigation"

import ProductDetails from "./components/ProductDetails"
import { getProduct, getProducts } from "@/lib/actions"

type Props = {
  params: Promise<{
    id: string
  }>
}

export async function generateStaticParams() {
  const products = await getProducts()

  return products.map((product) => ({
    id: product.id.toString(),
  }))
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { id } = await params
  const product = await getProduct(Number(id))

  if (!product) {
    return {
      title: "Product Not Found | Riya Electrodes",
      description: "The requested product could not be found.",
    }
  }

  return {
    title: product.name,
    description: product.description,
    alternates: {
      canonical: `/products/${product.id}`,
    },
    openGraph: {
      title: `${product.name} | Riya Electrodes`,
      description: product.description,
      url: `/products/${product.id}`,
      siteName: "Riya Electrodes",
      type: "website",
      images: product.images?.[0]
        ? [
            {
              url: product.images[0],
              alt: product.name,
            },
          ]
        : undefined,
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params

  const product = await getProduct(Number(id))

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#c2b490c4] to-[#c2b49050]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductDetails product={product} />
      </div>
    </div>
  )
}