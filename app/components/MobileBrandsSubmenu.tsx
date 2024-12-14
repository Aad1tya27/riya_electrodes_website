'use client'

import { useState } from 'react'
import Link from 'next/link'

const brands = ['A', 'B', 'C']

export default function MobileBrandsSubmenu() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition duration-300"
      >
        Brands
      </button>
      {isOpen && (
        <div className="pl-4">
          {brands.map((brand) => (
            <Link
              key={brand}
              href={`/products?brand=${brand}`}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition duration-300"
            >
              Brand {brand}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

