'use server'
// import { promises as fs } from "fs"
// import path from "path"
import nodemailer from "nodemailer"
import { Product } from "@/types/product"
import { readDatabase } from "./db"
// import { DatabaseData } from "@/types/database"

// async function readDatabase(): Promise<DatabaseData> {
//   try {
//     return getData()
//   } catch (error) {
//     console.error("Error reading database:", error)
//     return {
//       categories: [],
//       brands: [],
//       products: [],
//     }
//   }
// }

export async function getProducts(brand?: string, category?: string): Promise<Product[]> {
  const data = await readDatabase()
  let products = data.products

  if (brand && brand !== "All") {
    products = products.filter((product) => product.brand === brand)
  }

  if (category && category !== "All") {
    products = products.filter((product) => product.category === category)
  }

  return products
}

export async function getProduct(id: number): Promise<Product | null> {
  const data = await readDatabase()
  const product = data.products.find((p) => p.id === id)
  return product || null
}

export async function getCategories(): Promise<string[]> {
  const data = await readDatabase()
  return data.categories
}

export async function getBrands(): Promise<string[]> {
  const data = await readDatabase()
  return data.brands
}


export async function sendInquiry({
  name,
  email,
  company,
  gst,
  message,
  items,
}: {
  name: string
  email: string
  company: string
  gst: string
  message: string
  items: any[]
}) {
  try {
    const itemList = items
      .map(
        (item) =>
          `${item.name} (${item.brand}) - ${Object.entries(item.selectedMeasurement)
            .map(([key, value]) => `${key}: ${value}`)
            .join(", ")}`
      )
      .join("\n")

    const emailContent = `
Dear Riya Electrodes Team,

I would like to request a quote for the following products:

${itemList}

My details:
Name: ${name}
Company: ${company}
GST No. : ${gst} 
Email: ${email}

Additional Message:
${message}

Please provide pricing and availability information.

Thank you,
${name}
    `.trim()

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.FROM_EMAIL_ID,
        pass: process.env.FROM_EMAIL_PASS,
      },
    })

    await transporter.sendMail({
      from: `"Website Inquiry Form" <${process.env.FROM_EMAIL_ID}>`,
      to: process.env.TO_EMAIL_ID,
      subject: "Product Inquiry from Riya Electrodes Website",
      text: emailContent,
    })

    return { success: true }
  } catch (error) {
    console.error("Email sending failed:", error)
    return { success: false, error: "Failed to send email" }
  }
}



export async function sendMailAction(formData: FormData) {
  const name = formData.get('name')
  const email = formData.get('email')
  const message = formData.get('message')

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.FROM_EMAIL_ID,
      pass: process.env.FROM_EMAIL_PASS,
    },
  })

  try {
    await transporter.sendMail({
      from: `"Website Contact Form" <${process.env.FROM_EMAIL_ID}>`,
      to: process.env.TO_EMAIL_ID,
      subject: 'New Contact Form Submission',
      html: `
        <h3>Contact Details</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    })
    return { success: true }
  } catch (error) {
    console.error('Failed to send email:', error)
    return { success: false }
  }
}
