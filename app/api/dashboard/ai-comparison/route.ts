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
    const metric = (searchParams.get("metric") || "responseTime") as "responseTime" | "resolutionTime" | "satisfaction"

    // Get AI comparison data
    const data = await analyticsApi.getAIComparisonData(startDate, endDate, metric)

    return NextResponse.json({ data })
  } catch (error) {
    console.error("Error fetching AI comparison data:", error)
    return NextResponse.json({ error: "Failed to fetch AI comparison data" }, { status: 500 })
  }
}

// Helper function to get default start date (30 days ago)
function getDefaultStartDate(): string {
  const date = new Date()
  date.setDate(date.getDate() - 30)
  return date.toISOString().split("T")[0]
}

