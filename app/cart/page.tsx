"use client"

import { useState } from "react"
import Image from "next/image"
import { useCart } from "@/lib/cart-context"
import { useRouter } from "next/navigation"
import { sendInquiry } from "../actions/sendInquiry"


type ToastType = 'success' | 'error'

interface Toast {
  type: ToastType
  message: string
}

export default function Cart() {
  const { items, removeFromCart, clearCart } = useCart()
  const [customerName, setCustomerName] = useState("")
  const [customerEmail, setCustomerEmail] = useState("")
  const [customerCompany, setCustomerCompany] = useState("")
  const [customerGST, setCustomerGST] = useState("")
  const [customerMessage, setCustomerMessage] = useState("")

  const [toast, setToast] = useState<Toast | null>(null)
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  //   const generateEmailContent = () => {
  //     const itemsList = items
  //       .map(
  //         (item) =>
  //           `${item.name} (${item.brand}) - ${Object.entries(item.selectedMeasurement)
  //             .map(([key, value]) => `${key}: ${value}`)
  //             .join(", ")}`,
  //       )
  //       .join("\n")

  //     return `
  // Dear Riya Electrodes Team,

  // I would like to request a quote for the following products:

  // ${itemsList}

  // My details:
  // Name: ${customerName}
  // Company: ${customerCompany}
  // GST No. : ${customerGST} 
  // Email: ${customerEmail}

  // Additional Message:
  // ${customerMessage}

  // Please provide pricing and availability information.

  // Thank you,
  // ${customerName}
  //     `.trim()
  //   }

  // const handleInquiry = () => {
  //   const subject = encodeURIComponent("Product Inquiry from Riya Electrodes Website")
  //   const body = encodeURIComponent(generateEmailContent())
  //   window.location.href = `mailto:aadityaus62@gmail.com?subject=${subject}&body=${body}`
  // }

  return (<>
    {/* {toast && (
      <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white transition-all duration-500
          ${toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'}
        `}>
        {toast.message}
      </div>
    )} */}

    {toast && (
        <div className={`fixed top-6 right-6 z-50 text-white px-6 py-4 rounded-lg shadow-lg w-[300px] ${toast.type === 'success' ? 'bg-green-700' : 'bg-red-700'} `}>
          <div className="flex justify-between items-start">
            <div className="font-semibold">{toast.message}</div>
            <button
              onClick={() => setToast(null)}
              className="text-white text-xl leading-none hover:text-gray-300 ml-4"
              aria-label="Close"
            >
              &times;
            </button>
          </div>
          <div className="mt-2 h-1 bg-white/30 relative overflow-hidden rounded">
            <div className="absolute top-0 left-0 h-full bg-white animate-slidebar"></div>
          </div>
        </div>
      )}
    <div className="min-h-screen bg-gradient-to-b from-pale-blonde to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-dark-brown mb-8 text-center">Inquiry Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
            <p className="text-medium-brown text-lg mb-6">Your inquiry cart is empty.</p>
            <button onClick={() => router.push("/products")} className="btn-primary px-8 py-3 rounded-lg font-semibold">
              Browse Products
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Cart Items */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-dark-brown mb-6">Selected Products</h2>
              <div className="space-y-6">
                {items.map((item, index) => (
                  <div key={index} className="flex items-center gap-6 p-4 bg-pale-blonde rounded-xl">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={100}
                      height={100}
                      className="rounded-lg shadow-md"
                    />
                    <div className="flex-grow">
                      <h3 className="text-xl font-semibold text-dark-brown">{item.name}</h3>
                      <p className="text-tan-blonde font-medium">Brand: {item.brand}</p>
                      <p className="text-medium-brown">Category: {item.category}</p>
                      <div className="mt-2">
                        <span className="text-sm font-medium text-dark-brown">Selected Specifications:</span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {Object.entries(item.selectedMeasurement).map(([key, value]) => (
                            <span key={key} className="bg-medium-brown text-white px-3 py-1 rounded-full text-sm">
                              {key}: {value}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.productId, item.selectedMeasurement)}
                      className="text-red-500 hover:text-red-700 p-2"
                      aria-label="Remove item"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-dark-brown mb-6">Your Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-dark-brown mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full p-4 border border-tan-blonde rounded-lg focus:ring-2 focus:ring-medium-brown focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-dark-brown mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full p-4 border border-tan-blonde rounded-lg focus:ring-2 focus:ring-medium-brown focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="company" className="block text-sm font-medium text-dark-brown mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    value={customerCompany}
                    onChange={(e) => setCustomerCompany(e.target.value)}
                    className="w-full p-4 border border-tan-blonde rounded-lg focus:ring-2 focus:ring-medium-brown focus:border-transparent transition-all duration-300"
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="gst" className="block text-sm font-medium text-dark-brown mb-2">
                    GST No.
                  </label>
                  <input
                    type="text"
                    id="gst"
                    value={customerGST}
                    onChange={(e) => setCustomerGST(e.target.value)}
                    className="w-full p-4 border border-tan-blonde rounded-lg focus:ring-2 focus:ring-medium-brown focus:border-transparent transition-all duration-300"
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="message" className="block text-sm font-medium text-dark-brown mb-2">
                    Additional Message
                  </label>
                  <textarea
                    id="message"
                    value={customerMessage}
                    onChange={(e) => setCustomerMessage(e.target.value)}
                    rows={4}
                    className="w-full p-4 border border-tan-blonde rounded-lg focus:ring-2 focus:ring-medium-brown focus:border-transparent transition-all duration-300"
                    placeholder="Please include any specific requirements or questions..."
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">

              <button
                onClick={async () => {
                  if (!customerName || !customerEmail) return

                  setLoading(true);
                  const res = await sendInquiry({
                    name: customerName,
                    email: customerEmail,
                    company: customerCompany,
                    gst: customerGST,
                    message: customerMessage,
                    items: items,
                  })


                  if (res.success) {
                    // alert("Inquiry sent successfully!")
                    setToast({ type: 'success', message: 'Message sent!' })
                    clearCart()
                  } else {
                    // alert("Failed to send inquiry. Please try again.")
                    setToast({ type: 'error', message: 'Failed to send message.' })
                  }
                  setLoading(false)
                  setTimeout(() => setToast(null), 3000)

                  // const emailBody = generateEmailContent()
                  // console.log("Generated Email Content:\n", emailBody)
                  // const subject = encodeURIComponent("Product Inquiry from Riya Electrodes Website")
                  // const body = encodeURIComponent(generateEmailContent())

                  // window.location.href = `mailto:aadityaus62@gmail.com?subject=${subject}&body=${body}`

                  // setTimeout(() => {
                  //   if (confirm("Would you like to clear your inquiry cart?")) {
                  //     clearCart()
                  //   }
                  // }, 1000)
                }}
                className={`inline-block btn-primary px-12 py-4 rounded-xl text-lg font-semibold shadow-lg ${!customerName || !customerEmail || loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                disabled={!customerName || !customerEmail || loading}
              >
                {loading ? <>Processing Inquiry...</> : <>Send Inquiry</>}
              </button>

              <p className="text-medium-brown text-sm mt-4">
                This will open your email client with a pre-filled inquiry message.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  </>
  )
}
