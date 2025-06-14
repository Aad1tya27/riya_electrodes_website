import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Link from "next/link"
import MobileMenuToggle from "./components/MobileMenuToggle"
import BrandsDropdown from "./components/BrandsDropdown"
import MobileBrandsSubmenu from "./components/MobileBrandsSubmenu"
import { CartProvider } from "@/lib/cart-context"
import CartCounter from "./components/CartCounter"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Riya Electrodes - Industrial Wires, Filters & Resins",
  description:
    "Premium industrial materials including precision wires, advanced filters, and quality resins from trusted brands.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} `}>
        <CartProvider>
          <nav className="bg-white shadow-lg relative z-50 border-b border-tan-blonde">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-20">
                <div className="flex items-center">
                  <Link href="/" className="flex-shrink-0">
                    <span className="text-2xl font-bold bg-gradient-to-r from-medium-brown to-dark-brown bg-clip-text text-transparent">
                      Riya Electrodes
                    </span>
                  </Link>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-6">
                      <Link
                        href="/"
                        className="px-4 py-2 rounded-lg text-md font-medium text-dark-brown hover:text-medium-brown hover:bg-pale-blonde transition-all duration-300"
                      >
                        Home
                      </Link>
                      <Link
                        href="/products"
                        className="px-4 py-2 rounded-lg text-md font-medium text-dark-brown hover:text-medium-brown hover:bg-pale-blonde transition-all duration-300"
                      >
                        Products
                      </Link>
                      <BrandsDropdown />
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <Link
                    href="/cart"
                    className="px-4 py-3 rounded-lg text-sm font-medium text-dark-brown hover:text-dark-brown hover:bg-pale-blonde/50 hover:rounded-md transition-all duration-300"
                  >
                    <CartCounter />
                  </Link>
                </div>
                <MobileMenuToggle />
              </div>
            </div>
            <div className="hidden md:hidden mobile-menu bg-white border-t border-pale-blonde">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Link
                  href="/"
                  className="block px-3 py-2 rounded-md text-base font-medium text-dark-brown hover:text-medium-brown hover:bg-pale-blonde transition-all duration-300"
                >
                  Home
                </Link>
                <Link
                  href="/products"
                  className="block px-3 py-2 rounded-md text-base font-medium text-dark-brown hover:text-medium-brown hover:bg-pale-blonde transition-all duration-300"
                >
                  Products
                </Link>
                <MobileBrandsSubmenu />
                <Link
                  href="/cart"
                  className="block px-3 py-2 rounded-md text-base font-medium text-dark-brown hover:text-medium-brown hover:bg-pale-blonde transition-all duration-300"
                >
                  <CartCounter />
                </Link>
              </div>
            </div>
          </nav>
          <main className="min-h-screen">{children}</main>
          <footer className="bg-gradient-to-r from-[#5d4037] to-[#6c5652] text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-pale-blonde">About Riya Electrodes</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    RIYA Electrodes Pvt. Ltd., promoted by Riya International, has been a trusted name in EDM and Polishing solutions since 2001. Known for quality, integrity, and personal service, we offer a wide range of EDM supplies and polishing materials with fast shipping and reliable support.
                  </p>
                  
                </div>
                <div className="md:ml-20">
                  <h3 className="text-xl font-semibold mb-4 text-pale-blonde">Quick Links</h3>
                  <ul className="md:space-y-3 max-md:flex  max-md:items-center  max-md:gap-5 max-md:flex-wrap">
                    <li>
                      <Link href="/" className="text-sm text-gray-300 hover:text-pale-blonde transition duration-300">
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/products"
                        className="text-sm text-gray-300 hover:text-pale-blonde transition duration-300"
                      >
                        All Products
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/products?category=Wire"
                        className="text-sm text-gray-300 hover:text-pale-blonde transition duration-300"
                      >
                        Wires
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/products?category=Filter"
                        className="text-sm text-gray-300 hover:text-pale-blonde transition duration-300"
                      >
                        Filters
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/products?category=Resin"
                        className="text-sm text-gray-300 hover:text-pale-blonde transition duration-300"
                      >
                        Resins
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-pale-blonde">Our Locations</h3>
                  <ul className="space-y-3 text-sm text-gray-300">
                    <li><strong>Head Office:</strong> Faridabad, Haryana</li>
                    <li><strong>Pune Office:</strong> MIDC Bhosari</li>
                    <li><strong>Chennai Office:</strong> Kundrathur</li>
                    <li><strong>Manufacturing:</strong> Bhiwadi, Rajasthan</li>
                  </ul>
                  {/* <h3 className="text-xl font-semibold my-4 text-pale-blonde">Newsletter</h3>
                  <p className="text-sm text-gray-300 mb-4">
                    Stay updated with our latest products and industry insights.
                  </p>
                  <form className="flex">
                    <input
                      type="email"
                      placeholder="Your email"
                      className="flex-grow p-3 rounded-l-lg text-dark-brown focus:outline-none focus:ring-2 focus:ring-tan-blonde"
                      required
                    />
                    <button
                      type="submit"
                      className="bg-tan-blonde text-dark-brown px-6 py-3 rounded-r-lg hover:bg-pale-blonde transition duration-300 font-medium"
                    >
                      Subscribe
                    </button>
                  </form> */}
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-gray-700 text-center">
                <p className="text-sm text-gray-300">&copy; 2025 Riya Electrodes. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  )
}
