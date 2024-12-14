'use client'

import { useState } from 'react'
import Image from 'next/image'

// This would typically come from a cart state or API
const cartItems = [
  {
    id: 1,
    name: 'Premium Comfort T-Shirt',
    price: 29.99,
    quantity: 1,
    image: '/placeholder.svg'
  }
]

export default function Cart() {
  const [customerName, setCustomerName] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const generateEmailContent = () => {
    const itemsList = cartItems.map(item =>
      `${item.name} - Quantity: ${item.quantity} - Price: $${(item.price * item.quantity).toFixed(2)}`
    ).join('\n')

    return `
Dear ShopNow,

I would like to place an order for the following items:

${itemsList}

Total: $${total.toFixed(2)}

My details:
Name: ${customerName}
Email: ${customerEmail}

Please let me know the next steps to complete my purchase.

Thank you,
${customerName}
    `.trim()
  }

  const handleOrder = () => {
    const subject = encodeURIComponent('New Order from ShopNow')
    const body = encodeURIComponent(generateEmailContent())
    console.log(body)
    window.location.href = `mailto:orders@shopnow.com?subject=${subject}&body=${body}`
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-8">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center space-x-4">
                <Image src={item.image} alt={item.name} width={100} height={100} className="rounded-md" />
                <div>
                  <h2 className="text-lg font-medium text-gray-900">{item.name}</h2>
                  <p className="mt-1 text-sm text-gray-500">Quantity: {item.quantity}</p>
                  <p className="mt-1 text-sm font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 border-t border-gray-200 pt-8">
            <h2 className="text-xl font-medium text-gray-900">Order Summary</h2>
            <p className="mt-2 text-2xl font-bold text-gray-900">Total: ${total.toFixed(2)}</p>
          </div>
          <div className="mt-8">
            <h2 className="text-xl font-medium text-gray-900 mb-4">Your Information</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  id="name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
          <button
            onClick={handleOrder}
            className="mt-8 w-full bg-blue-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Place Order
          </button>
        </>
      )}
    </div>
  )
}

