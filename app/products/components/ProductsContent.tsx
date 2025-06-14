"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { getCategories, getBrands } from "@/lib/actions"
import { Product } from "@/types/product"

export default function ProductsContent() {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [brands, setBrands] = useState<string[]>([])
  const [selectedBrand, setSelectedBrand] = useState("All")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const res = await fetch("/api/brands");
        const jsonObj = await res.json()
        const brandsData = jsonObj.brands;
        const res1 = await fetch("/api/categories");
        const categoriesData = await res1.json()
        setCategories(["All", ...categoriesData])
        setBrands(["All", ...brandsData])
      } catch (error) {
        console.error("Error loading initial data:", error)
      }
    }
    loadInitialData()
  }, [])

  useEffect(() => {
    const brandParam = searchParams.get("brand")
    const categoryParam = searchParams.get("category")

    if (brandParam && brands.includes(brandParam)) {
      setSelectedBrand(brandParam)
    }
    if (categoryParam && categories.includes(categoryParam)) {
      setSelectedCategory(categoryParam)
    }
  }, [searchParams, brands, categories])

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/products?brand=${selectedBrand}&category=${selectedCategory}`)
        const productsData = await res.json()
        setProducts(productsData)
        setFilteredProducts(productsData)
      } catch (error) {
        console.error("Error loading products:", error)
      } finally {
        setLoading(false)
      }
    }

    if (brands.length > 0 && categories.length > 0) {
      loadProducts()
    }
  }, [selectedBrand, selectedCategory, brands, categories])

  // Filter products based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProducts(products)
    } else {
      const query = searchQuery.toLowerCase()
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.brand.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query),
      )
      setFilteredProducts(filtered)
    }
  }, [searchQuery, products])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-medium-brown"></div>
      </div>
    )
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Filters Sidebar */}
      <div className="w-full lg:w-1/4">
        <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
          <h2 className="text-2xl font-semibold mb-6 text-dark-brown">Filters</h2>

          {/* Search Bar */}
          <div className="mb-6">
            <label htmlFor="search" className="font-medium mb-2 text-medium-brown block">
              Search Products
            </label>
            <input
              type="text"
              id="search"
              placeholder="Search by name, description..."
              className="w-full p-3 border border-tan-blonde rounded-lg focus:ring-2 focus:ring-medium-brown focus:border-transparent transition-all duration-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <h3 className="font-medium mb-3 text-medium-brown">Category</h3>
            <select
              className="w-full p-3 border border-tan-blonde rounded-lg focus:ring-2 focus:ring-medium-brown focus:border-transparent transition-all duration-300"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <h3 className="font-medium mb-3 text-medium-brown">Brand</h3>
            <select
              className="w-full p-3 border border-tan-blonde rounded-lg focus:ring-2 focus:ring-medium-brown focus:border-transparent transition-all duration-300"
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
            >
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="w-full lg:w-3/4">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-medium-brown text-lg">No products found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <Link
                href={`/products/${product.id}`}
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg card-hover border border-pale-blonde"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={product.images[0] || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-medium-brown text-white px-3 py-1 rounded-full text-sm font-medium">
                    {product.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-dark-brown">{product.name}</h3>
                  <p className="text-tan-blonde font-medium mb-2">Brand: {product.brand}</p>
                  <p className="text-medium-brown text-sm leading-relaxed line-clamp-3">{product.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-medium-brown font-medium">
                      {product.measurements.length} size{product.measurements.length !== 1 ? "s" : ""} available
                    </span>
                    {/* <span className="text-dark-brown font-semibold text-center">Click to View Details</span> */}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
