"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function MobileBrandsSubmenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [brands, setBrands] = useState<string[]>([])

  useEffect(() => {
    const loadBrands = async () => {
      const res = await fetch("/api/brands");
      const jsonObj = await res.json()
      const brandList = jsonObj.brands;
      setBrands(brandList)
    }
    loadBrands()
  }, [])

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-dark-brown hover:text-medium-brown hover:bg-pale-blonde transition-all duration-300"
      >
        Brands
      </button>
      {isOpen && (
        <div className="pl-4 space-y-1">
          <Link
            href="/#brands"
            className="block px-3 py-2 rounded-md text-base font-medium text-dark-brown hover:text-medium-brown hover:bg-pale-blonde transition-all duration-300"
          >
            All Brands
          </Link>
          {brands.map((brand) => (
            <Link
              key={brand}
              href={`/products?brand=${brand}`}
              className="block px-3 py-2 rounded-md text-base font-medium text-dark-brown hover:text-medium-brown hover:bg-pale-blonde transition-all duration-300"
            >
              {brand}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
