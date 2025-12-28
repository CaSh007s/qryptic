import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createClient()

  // 1. Find the QR code
  const { data: qr, error } = await supabase
    .from("qr_codes")
    .select("long_url, scan_count")
    .eq("id", id)
    .single()

  if (error || !qr) {
    return NextResponse.redirect(new URL("/404", request.url))
  }

  // 2. Increment Count
  await supabase
    .from("qr_codes")
    .update({ scan_count: qr.scan_count + 1 })
    .eq("id", id)

  // 3. Redirect to actual destination
  return NextResponse.redirect(new URL(qr.long_url))
}