'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

const products = [
  { id: 1, name: 'Product 1', price: 19.99, image: '/placeholder.svg', brand: 'A', category: 'Category 1' },
  { id: 2, name: 'Product 2', price: 29.99, image: '/placeholder.svg', brand: 'B', category: 'Category 2' },
  { id: 3, name: 'Product 3', price: 39.99, image: '/placeholder.svg', brand: 'A', category: 'Category 1' },
  { id: 4, name: 'Product 4', price: 49.99, image: '/placeholder.svg', brand: 'C', category: 'Category 3' },
  { id: 5, name: 'Product 5', price: 59.99, image: '/placeholder.svg', brand: 'B', category: 'Category 2' },
  { id: 6, name: 'Product 6', price: 69.99, image: '/placeholder.svg', brand: 'C', category: 'Category 3' },
]

const brands = ['All', 'A', 'B', 'C']
const categories = ['All', 'Category 1', 'Category 2', 'Category 3']

export default function Products() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const [selectedBrand, setSelectedBrand] = useState('All')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [filteredProducts, setFilteredProducts] = useState(products)

  useEffect(() => {
    const brandParam = searchParams.get('brand')

    if (brandParam && brands.includes(brandParam)) {
      setSelectedBrand(brandParam)
    }
    const nextSearchParams = new URLSearchParams(searchParams.toString())
    nextSearchParams.delete('brand')

    router.replace(`${pathname}?${nextSearchParams}`)
  }, [searchParams])

  useEffect(() => {

    const updatedProducts = products.filter(product =>
      (selectedBrand === 'All' || product.brand === selectedBrand) &&
      (selectedCategory === 'All' || product.category === selectedCategory)
    )
    setFilteredProducts(updatedProducts)
  }, [selectedBrand])


  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/4 p-4">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
        <div className="mb-4">
          <h3 className="font-medium mb-2">Brand</h3>
          <select
            className="w-full p-2 border rounded"
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
          >
            {brands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>
        <div>
          <h3 className="font-medium mb-2">Category</h3>
          <select
            className="w-full p-2 border rounded"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="w-full md:w-3/4">
        <h1 className="text-3xl font-bold mb-6">Our Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Link href={`/products/${product.id}`} key={product.id} className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <Image src={product.image} alt={product.name} width={300} height={200} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-2">${product.price.toFixed(2)}</p>
                <p className="text-sm text-gray-500">Brand: {product.brand}</p>
                <p className="text-sm text-gray-500">Category: {product.category}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

