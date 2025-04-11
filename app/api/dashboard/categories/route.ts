import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { analyticsApi } from "@/lib/salesforce/analytics"

export async function GET(req: NextRequest) {
  try {
    // Check authentication
    const user = await getCurrentUser(req)

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    // Get query parameters
    const searchParams = req.nextUrl.searchParams
    const startDate = searchParams.get("startDate") || getDefaultStartDate()
    const endDate = searchParams.get("endDate") || new Date().toISOString().split("T")[0]

    // Get category metrics
    const categories = await analyticsApi.getCategoryMetrics(startDate, endDate)

    return NextResponse.json({ categories })
  } catch (error) {
    console.error("Error fetching category metrics:", error)
    return NextResponse.json({ error: "Failed to fetch category metrics" }, { status: 500 })
  }
}

// Helper function to get default start date (30 days ago)
function getDefaultStartDate(): string {
  const date = new Date()
  date.setDate(date.getDate() - 30)
  return date.toISOString().split("T")[0]
}

