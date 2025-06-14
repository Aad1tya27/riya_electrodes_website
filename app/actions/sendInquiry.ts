'use server'

import nodemailer from "nodemailer"

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
      from: process.env.FROM_EMAIL_ID,
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
