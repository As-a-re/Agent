import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser(req)

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    // Check if the user is the demo user
    const isDemoMode = user.id === "demo-user"

    return NextResponse.json({ demoMode: isDemoMode })
  } catch (error) {
    console.error("Error checking demo mode:", error)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}

