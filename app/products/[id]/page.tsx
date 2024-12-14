'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

// This would typically come from an API or database
const product = {
  id: 1,
  name: 'Premium Comfort T-Shirt',
  brand: 'ComfortWear',
  category: 'Clothing',
  price: 29.99,
  description: 'Experience ultimate comfort with our premium t-shirt. Made from 100% organic cotton, this shirt is perfect for everyday wear. Its breathable fabric keeps you cool and comfortable all day long.',
  images: [
    '/placeholder.svg',
    '/placeholder.svg',
    '/placeholder.svg',
    '/placeholder.svg'
  ]
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const router = useRouter()
  useEffect(()=>{
    console.log(params)
  },[params])
  const addToCart = () => {
    // In a real application, this would add the product to a cart state or API
    // For now, we'll just navigate to the cart page
    router.push('/cart')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              width={600}
              height={600}
              className="w-full h-full object-center object-cover"
            />
          </div>
          <div className="mt-4 grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-w-1 aspect-h-1 rounded-md overflow-hidden ${
                  selectedImage === index ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <Image
                  src={image}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  width={150}
                  height={150}
                  className="w-full h-full object-center object-cover"
                />
              </button>
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">{product.name}</h1>
          <p className="mt-2 text-sm text-gray-500">Brand: {product.brand}</p>
          <p className="text-sm text-gray-500">Category: {product.category}</p>
          <p className="mt-4 text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
          <div className="mt-6">
            <h2 className="text-lg font-medium text-gray-900">Description</h2>
            <p className="mt-2 text-gray-600">{product.description}</p>
          </div>
          <button
            onClick={addToCart}
            className="mt-8 w-full bg-blue-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

