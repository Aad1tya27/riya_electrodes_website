"use client"

import { useCart } from "@/lib/cart-context"

export default function CartCounter() {
  const { items } = useCart()

  return (<>
    <span className="inline-flex items-center text-[16px]">
      Inquiry Cart
      {items.length > 0 && (
        <span className="ml-2 bg-dark-brown text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
          {items.length}
        </span>
      )}
    </span>
  </>
  )
}
