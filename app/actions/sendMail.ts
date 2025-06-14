'use server'

import nodemailer from 'nodemailer'

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
