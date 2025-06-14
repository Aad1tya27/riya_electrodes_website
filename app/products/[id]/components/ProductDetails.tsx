"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { getProduct, type Product } from "@/lib/actions"
import { useCart } from "@/lib/cart-context"

interface ProductDetailsProps {
  productId: number
}

export default function ProductDetails({ productId }: ProductDetailsProps) {
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedMeasurement, setSelectedMeasurement] = useState<{ [key: string]: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const [showAlert, setShowAlert] = useState(false)
  const { addToCart, items } = useCart()

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const productData = await getProduct(productId)
        setProduct(productData)
      } catch (error) {
        console.error("Error loading product:", error)
      } finally {
        setLoading(false)
      }
    }
    loadProduct()
  }, [productId])

  const handleAddToInquiry = () => {
    if (product && selectedMeasurement) {
      addToCart(product, selectedMeasurement)
      setShowAlert(true)
      setTimeout(() => setShowAlert(false), 3000)
    }
  }

  const isInCart = (product: Product, measurement: { [key: string]: string } | null) => {
    if (!measurement) return false

    return items.some((item) => {
      return (
        item.productId === product.id &&
        JSON.stringify(item.selectedMeasurement) === JSON.stringify(measurement)
      )
    })
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-medium-brown"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-dark-brown mb-4">Product Not Found</h1>
        <p className="text-medium-brown mb-6">The product you're looking for doesn't exist.</p>
        <button onClick={() => router.push("/products")} className="btn-primary px-6 py-3 rounded-lg font-semibold">
          Back to Products
        </button>
      </div>
    )
  }

  return (
    <>
      {showAlert && (
        <div className="fixed top-6 right-6 z-50 bg-dark-brown text-white px-6 py-4 rounded-lg shadow-lg w-[300px]">
          <div className="flex justify-between items-start">
            <div className="font-semibold">Product added to cart</div>
            <button
              onClick={() => setShowAlert(false)}
              className="text-white text-xl leading-none hover:text-gray-300 ml-4"
              aria-label="Close"
            >
              &times;
            </button>
          </div>
          <div className="mt-2 h-1 bg-white/30 relative overflow-hidden rounded">
            <div className="absolute top-0 left-0 h-full bg-white animate-slidebar"></div>
          </div>
        </div>
      )}


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative">
        {/* Product Images */}
        <div className="space-y-4 lg:sticky top-6 self-start">
          <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={product.images[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              width={600}
              height={600}
              className="w-full h-full object-cover"
            />
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border transition-all duration-300 ${selectedImage === index
                    ? "border-medium-brown shadow-lg"
                    : "border-pale-blonde hover:border-tan-blonde"
                    }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    width={150}
                    height={150}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Information */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-dark-brown mb-2">{product.name}</h1>
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-medium-brown text-white px-4 py-2 rounded-full text-sm font-medium">
                {product.category}
              </span>
              <span className="bg-tan-blonde text-dark-brown px-4 py-2 rounded-full text-sm font-medium">
                {product.brand}
              </span>
            </div>
          </div>

          <div className="text-[#655856] leading-relaxed">
            <h2 className="text-xl font-semibold text-dark-brown mb-3">Description</h2>

            {product.table && (
              <div className="overflow-x-auto bg-pale-blonde  rounded-2xl p-6 shadow-md border border-tan-blonde mb-6">
                <table className="w-full text-left text-dark-brown">
                  <tbody>
                    {Object.entries(product.table).map(([key, value]) => (
                      <tr key={key} className="border-b border-tan-blonde/30 last:border-none">
                        <td className="py-3 pr-6 font-medium capitalize text-medium-brown">{key}</td>
                        <td className="py-3 text-dark-brown">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* {product.table && (
            <div className="overflow-x-auto bg-pale-blonde bg-opacity-40 rounded-2xl p-6 shadow-md border border-tan-blonde mb-6">
              <h2 className="text-xl font-semibold text-dark-brown mb-4">Specifications</h2>
              <table className="w-full text-left text-dark-brown">
                <tbody>
                  {product.table.map((row, rowIndex) =>
                    Object.entries(row).map(([key, value], colIndex) => (
                      <tr key={`${rowIndex}-${colIndex}`} className="border-b border-tan-blonde/30 last:border-none">
                        <td className="py-3 pr-6 font-medium capitalize text-medium-brown">{key}</td>
                        <td className="py-3 text-dark-brown">{value}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )} */}

            <p>{product.description}</p>
          </div>

          {/* {product.advantages && product.advantages.length > 0 && (
            <div className="text-[#655856] leading-relaxed">
              <h2 className="text-xl font-semibold text-dark-brown mb-3">Advantages</h2>
              <ul className="list-disc list-inside space-y-2">
                {product.advantages.map((adv, index) => (
                  <li key={index}>{adv}</li>
                ))}
              </ul>
            </div>
          )} */}
          {product.advantages && product.advantages.length > 0 && (
            <div className="text-[#655856] leading-relaxed">
              <h2 className="text-xl font-semibold text-dark-brown mb-3">Advantages</h2>
              <ul className="list-disc list-outside pl-4 space-y-2">
                {product.advantages.map((adv, index) => (
                  <li key={index}>{adv}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="bg-pale-blonde bg-opacity-50 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-dark-brown mb-4">Select Specifications</h2>
            <div className="mb-4">
              <label htmlFor="measurement" className="block text-medium-brown font-medium mb-2">
                Choose Size/Measurement:
              </label>
              <select
                id="measurement"
                className="w-full p-4 border border-tan-blonde rounded-lg focus:ring-2 focus:ring-medium-brown focus:border-transparent transition-all duration-300"
                onChange={(e) => {
                  const index = Number.parseInt(e.target.value)
                  if (!isNaN(index) && index >= 0 && index < product.measurements.length) {
                    setSelectedMeasurement(product.measurements[index])
                  } else {
                    setSelectedMeasurement(null)
                  }
                }}
                defaultValue=""
              >
                <option value="" disabled>
                  Select a size
                </option>
                {product.measurements.map((measurement, index) => {
                  const specs = Object.entries(measurement)
                    .map(([key, value]) => `${key}: ${value}`)
                    .join(", ")
                  return (
                    <option key={index} value={index}>
                      {specs}
                    </option>
                  )
                })}
              </select>
            </div>

            {selectedMeasurement && (
              <div className="bg-white rounded-lg p-4 mb-4">
                <h3 className="font-medium text-dark-brown mb-2">Selected Specifications:</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(selectedMeasurement).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="font-medium text-medium-brown capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}:
                      </span>
                      <span className="text-dark-brown">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <button
              onClick={handleAddToInquiry}
              disabled={!selectedMeasurement || (product && isInCart(product, selectedMeasurement))}
              className="w-full btn-primary py-4 rounded-xl text-lg font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {selectedMeasurement
                ? isInCart(product, selectedMeasurement)
                  ? "Already in Cart"
                  : "Add to Inquiry Cart"
                : "Please Select a Size"}
            </button>
            {product && selectedMeasurement && isInCart(product, selectedMeasurement) && (
              <p className="text-medium-brown text-sm text-center">This specification is already in your cart.</p>
            )}
            <button
              onClick={() => router.push("/products")}
              className="w-full bg-white text-dark-brown border border-tan-blonde py-4 rounded-xl text-lg font-semibold hover:bg-pale-blonde transition-all duration-300"
            >
              Back to Products
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
