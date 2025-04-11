import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { customerServiceApi } from "@/lib/salesforce/customer-service"

export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const user = await getCurrentUser(req)

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    // Get return data from request
    const { orderId, reason, items } = await req.json()

    if (!orderId || !reason || !items || !Array.isArray(items)) {
      return NextResponse.json({ error: "Invalid return request data" }, { status: 400 })
    }

    // Create return request
    const result = await customerServiceApi.createReturnRequest(orderId, reason, items)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error creating return request:", error)
    return NextResponse.json({ error: "Failed to create return request" }, { status: 500 })
  }
}

