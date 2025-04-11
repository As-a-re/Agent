import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { customerServiceApi } from "@/lib/salesforce/customer-service"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check authentication
    const user = await getCurrentUser(req)

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    // Get order by ID or order number
    const order = await customerServiceApi.getOrder(params.id)

    // Get order items
    const items = await customerServiceApi.getOrderItems(order.Id!)

    return NextResponse.json({ order, items })
  } catch (error) {
    console.error(`Error fetching order ${params.id}:`, error)
    return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 })
  }
}

