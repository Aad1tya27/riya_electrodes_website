// app/api/send-inquiry/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { sendInquiry } from '@/lib/actions' // adjust path if needed

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const {
      name,
      email,
      company,
      gst,
      message,
      items,
    } = body

    const result = await sendInquiry({
      name,
      email,
      company,
      gst,
      message,
      items,
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 })
  }
}
