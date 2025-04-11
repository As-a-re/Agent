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

    // Get message from request
    const { message } = await req.json()

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    // Test agent
    const result = await agentBuilderApi.testAgent(params.id, message)

    return NextResponse.json(result)
  } catch (error) {
    console.error(`Error testing agent ${params.id}:`, error)
    return NextResponse.json({ error: "Failed to test agent" }, { status: 500 })
  }
}

