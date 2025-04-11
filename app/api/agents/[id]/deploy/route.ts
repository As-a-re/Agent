import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { agentBuilderApi } from "@/lib/salesforce/agent-builder"

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check authentication
    const user = await getCurrentUser(req)

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    // Check authorization
    if (user.role !== "admin" && user.role !== "manager") {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 })
    }

    // Deploy agent
    const result = await agentBuilderApi.deployAgent(params.id)

    return NextResponse.json(result)
  } catch (error) {
    console.error(`Error deploying agent ${params.id}:`, error)
    return NextResponse.json({ error: "Failed to deploy agent" }, { status: 500 })
  }
}

