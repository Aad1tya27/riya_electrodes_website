import { NextRequest, NextResponse } from 'next/server'
import { sendMailAction } from '@/lib/actions' 

export async function POST(req: NextRequest) {
  const body = await req.formData()
  const result = await sendMailAction(body)

  if (result.success) {
    return NextResponse.json({ success: true })
  } else {
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
