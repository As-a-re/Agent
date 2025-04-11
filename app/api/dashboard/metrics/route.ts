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

    // Try to get dashboard metrics
    try {
      // Get dashboard metrics
      const metrics = await analyticsApi.getDashboardMetrics()
      return NextResponse.json(metrics)
    } catch (error) {
      console.error("Error fetching dashboard metrics from Salesforce:", error)
      // Return a specific status code to indicate Salesforce is not available
      return NextResponse.json({ error: "Salesforce connection not available" }, { status: 503 })
    }
  } catch (error) {
    console.error("Error in dashboard metrics route:", error)
    return NextResponse.json({ error: "Failed to fetch dashboard metrics" }, { status: 500 })
  }
}

