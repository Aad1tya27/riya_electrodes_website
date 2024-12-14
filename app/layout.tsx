import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import MobileMenuToggle from './components/MobileMenuToggle'
import BrandsDropdown from './components/BrandsDropdown'
import MobileBrandsSubmenu from './components/MobileBrandsSubmenu'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Riya Electrodes',
  description: 'Riya Electrodes – Precision Products for Seamless Manufacturing.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        <nav className="bg-white sticky top-0 shadow-md  z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Link href="/" className="flex-shrink-0">
                  <span className="text-xl font-bold text-blue-600">Riya Electrodes</span>
                </Link>
                {/* <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    <Link href="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 transition duration-300">Home</Link>
                    <Link href="/products" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 transition duration-300">Products</Link>
                    <BrandsDropdown />
                  </div>
                </div> */}
              </div>
              <div className="flex items-center">

                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {/* <Link href="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 transition duration-300">Home</Link> */}
                    <Link href="/products" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 transition duration-300">Products</Link>
                    <BrandsDropdown />
                    <Link href="/cart" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 transition duration-300">
                      Cart (0)
                    </Link>
                  </div>
                </div>
              </div>
              {/* <div className="hidden md:block">

              </div> */}
              <MobileMenuToggle />
            </div>
          </div>
          <div className="hidden md:hidden mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition duration-300">Home</Link>
              <Link href="/products" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition duration-300">Products</Link>
              <MobileBrandsSubmenu />
              <Link href="/cart" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition duration-300">Cart (0)</Link>
            </div>
          </div>
        </nav>
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="bg-gray-800 text-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">About Riya Electrodes</h3>
                <p className="text-sm text-gray-300">Riya Electrodes is your trusted partner for all your manufacturing needs, specializing in high-quality EDM wires, filters, resins, and other essential supplies. We offer a comprehensive range of products that cater to various industrial applications, ensuring you have reliable and efficient resources to keep your operations running smoothly and effectively.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li><Link href="/" className="text-sm text-gray-300 hover:text-white transition duration-300">Home</Link></li>
                  <li><Link href="/products" className="text-sm text-gray-300 hover:text-white transition duration-300">Products</Link></li>
                  <li><Link href="/products?brand=A" className="text-sm text-gray-300 hover:text-white transition duration-300">Brand A</Link></li>
                  <li><Link href="/products?brand=B" className="text-sm text-gray-300 hover:text-white transition duration-300">Brand B</Link></li>
                  <li><Link href="/products?brand=C" className="text-sm text-gray-300 hover:text-white transition duration-300">Brand C</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
                <p className="text-sm text-gray-300 mb-4">Subscribe to our newsletter for the latest updates and offers.</p>
                <form className="flex">
                  <input type="email" placeholder="Your email" className="flex-grow p-2 rounded-l text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                  <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700 transition duration-300">Subscribe</button>
                </form>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-700 text-center">
              <p className="text-sm text-gray-300">&copy;2024 Riya Electrodes Pvt. Ltd. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}

