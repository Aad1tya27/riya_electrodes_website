'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

const brands = [
  { name: 'Brand A', logo: '/placeholder.svg' },
  { name: 'Brand B', logo: '/placeholder.svg' },
  { name: 'Brand C', logo: '/placeholder.svg' },
  { name: 'Brand D', logo: '/placeholder.svg' },
  { name: 'Brand E', logo: '/placeholder.svg' },
]

export default function BrandLogos() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const totalWidth = container.scrollWidth / 2
    let currentPosition = 0

    const animate = () => {
      currentPosition += 0.5
      if (currentPosition >= totalWidth) {
        currentPosition = 0
      }
      container.style.transform = `translateX(-${currentPosition}px)`
      requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }, [])

  return (
    <div className="overflow-hidden" style={{ height: '100px' }}>
      <div
        ref={containerRef}
        className="flex items-center space-x-8"
        style={{ width: '200%' }}
      >
        {[...brands, ...brands].map((brand, index) => (
          <div key={index} className="flex-shrink-0">
            <Image
              src={brand.logo}
              alt={brand.name}
              width={100}
              height={100}
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

