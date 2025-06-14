"use client"

import { useEffect, useState } from "react"
import Marquee from "react-fast-marquee"

export default function BrandLogos() {
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

  if (brands.length === 0) return null

  return (
    <div className="bg-white/5 rounded-2xl flex justify-center p-8 overflow-hidden" style={{ height: "150px" }}>
      <Marquee gradient={false} speed={70} pauseOnHover={true}>
        {[...brands, ...brands].map((brand, index) => (
          <div key={index} className="flex-shrink-0 bg-white rounded-lg p-4 shadow-lg card-hover mx-10">
            <div className="text-dark-brown font-bold text-lg text-center min-w-[120px]">
              {brand}
            </div>
          </div>
        ))}
      </Marquee>
    </div>

  )
}
