"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { Product } from "@/types/product"
export interface CartItem {
  productId: number
  name: string
  category: string
  brand: string
  image: string
  selectedMeasurement: { [key: string]: string }
}

interface CartContextType {
  items: CartItem[]
  addToCart: (product: Product, selectedMeasurement: { [key: string]: string }) => void
  removeFromCart: (productId: number, selectedMeasurement: { [key: string]: string }) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (e) {
        console.error("Failed to parse cart from localStorage", e)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items))
  }, [items])

  const addToCart = (product: Product, selectedMeasurement: { [key: string]: string }) => {
    setItems((prevItems) => [
      ...prevItems,
      {
        productId: product.id,
        name: product.name,
        category: product.category,
        brand: product.brand,
        image: product.images[0] || "/placeholder.svg",
        selectedMeasurement,
      },
    ])
  }

  const removeFromCart = (productId: number, selectedMeasurement: { [key: string]: string }) => {
    setItems((prevItems) => prevItems.filter((item) => item.productId !== productId || selectedMeasurement !== item.selectedMeasurement))
  }

  const clearCart = () => {
    setItems([])
  }

  return <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart }}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
