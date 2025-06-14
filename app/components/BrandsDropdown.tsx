"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { getBrands } from "@/lib/actions"

export default function BrandsDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const [brands, setBrands] = useState<string[]>([])
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadBrands = async () => {
      const brandList = await getBrands()
      setBrands(brandList)
    }
    loadBrands()
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const handleMouseEnter = () => {
    setIsOpen(true)
  }

  return (
    <div className="relative inline-block text-left" ref={dropdownRef} onMouseEnter={handleMouseEnter}>
      <div>
        <div
          className="inline-flex justify-center w-full rounded-lg px-4 py-2 text-md font-medium text-dark-brown hover:text-medium-brown hover:bg-pale-blonde focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-tan-blonde transition-all duration-300"
          onClick={(e) => {
            if (isOpen) {
              e.preventDefault()
              handleToggle()
            }
          }}
        >
          Brands
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-lg shadow-xl bg-white ring-1 ring-tan-blonde ring-opacity-20 z-50 border border-pale-blonde"
          onMouseLeave={() => setIsOpen(false)}
        >
          <div className="py-2" role="menu" aria-orientation="vertical">
            {brands.map((brand) => (
              <Link
                key={brand}
                href={`/products?brand=${brand}`}
                className="block px-4 py-3 text-sm text-dark-brown hover:bg-pale-blonde hover:text-medium-brown transition-all duration-300"
                role="menuitem"
              >
                {brand}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
