import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { agentBuilderApi } from "@/lib/salesforce/agent-builder"

export async function GET(req: NextRequest) {
  try {
    // Check authentication
    const user = await getCurrentUser(req)

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    // Get all agents
    const agents = await agentBuilderApi.getAgents()

    return NextResponse.json({ agents })
  } catch (error) {
    console.error("Error fetching agents:", error)
    return NextResponse.json({ error: "Failed to fetch agents" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
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

    // Get agent data from request
    const agentData = await req.json()

    // Create agent
    const agentId = await agentBuilderApi.createAgent(agentData)

    return NextResponse.json({ id: agentId, success: true })
  } catch (error) {
    console.error("Error creating agent:", error)
    return NextResponse.json({ error: "Failed to create agent" }, { status: 500 })
  }
}

