import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser(req)

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error("Error getting current user:", error)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}

