import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { agentBuilderApi } from "@/lib/salesforce/agent-builder"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check authentication
    const user = await getCurrentUser(req)

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    // Get agent by ID
    const agent = await agentBuilderApi.getAgent(params.id)

    return NextResponse.json(agent)
  } catch (error) {
    console.error(`Error fetching agent ${params.id}:`, error)
    return NextResponse.json({ error: "Failed to fetch agent" }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
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

    // Update agent
    await agentBuilderApi.updateAgent({
      ...agentData,
      id: params.id,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(`Error updating agent ${params.id}:`, error)
    return NextResponse.json({ error: "Failed to update agent" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check authentication
    const user = await getCurrentUser(req)

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    // Check authorization
    if (user.role !== "admin") {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 })
    }

    // Delete agent
    await agentBuilderApi.deleteAgent(params.id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(`Error deleting agent ${params.id}:`, error)
    return NextResponse.json({ error: "Failed to delete agent" }, { status: 500 })
  }
}

