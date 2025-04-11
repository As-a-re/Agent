import { type NextRequest, NextResponse } from "next/server"
import { signToken, setAuthCookie } from "@/lib/auth"

// Demo user for fallback
const DEMO_USER = {
  id: "demo-user",
  name: "Demo User",
  email: "demo@servicegenius.com",
  role: "admin" as const,
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { username, password, mode } = body

    // Handle demo mode login
    if (mode === "demo") {
      console.log("Logging in with demo credentials")

      // Generate token for demo user
      const token = await signToken(DEMO_USER)

      // Create response
      const response = NextResponse.json({
        user: DEMO_USER,
        demoMode: true,
      })

      // Set cookie
      return setAuthCookie(response, token)
    }

    // Handle Salesforce login
    // Validate input for Salesforce login
    if (mode === "salesforce" && (!username || !password)) {
      return NextResponse.json({ error: "Username and password are required for Salesforce login" }, { status: 400 })
    }

    // Authenticate with Salesforce
    try {
      // Log the authentication attempt (without sensitive data)
      console.log(`Attempting Salesforce authentication for username: ${username}`)

      const params = new URLSearchParams()
      params.append("grant_type", "password")
      params.append("client_id", process.env.SALESFORCE_CLIENT_ID || "")
      params.append("client_secret", process.env.SALESFORCE_CLIENT_SECRET || "")
      params.append("username", username)

      // Combine password with security token if needed
      // Some Salesforce orgs don't require security tokens for trusted IPs
      const securityToken = process.env.SALESFORCE_SECURITY_TOKEN || ""
      const passwordWithToken = securityToken ? password + securityToken : password
      params.append("password", passwordWithToken)

      const loginUrl = process.env.SALESFORCE_LOGIN_URL || "https://login.salesforce.com"

      console.log(`Authenticating with Salesforce at ${loginUrl}/services/oauth2/token`)

      const response = await fetch(`${loginUrl}/services/oauth2/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      })

      if (!response.ok) {
        const errorText = await response.text()
        let errorData
        try {
          errorData = JSON.parse(errorText)
        } catch (e) {
          errorData = { error: "Unknown error", error_description: errorText }
        }

        console.error("Salesforce authentication response:", {
          status: response.status,
          statusText: response.statusText,
          errorData,
        })

        // If authentication fails, fall back to demo mode
        console.log("Salesforce authentication failed, falling back to demo mode")

        // Generate token for demo user
        const token = await signToken(DEMO_USER)

        // Create response
        const responseObj = NextResponse.json({
          user: DEMO_USER,
          demoMode: true,
          salesforceError: errorData.error_description || errorData.error || "Authentication failed",
        })

        // Set cookie
        return setAuthCookie(responseObj, token)
      }

      const authData = await response.json()
      console.log("Salesforce authentication successful")

      // Try to get user info from Salesforce
      try {
        const userInfoResponse = await fetch(authData.id, {
          headers: {
            Authorization: `Bearer ${authData.access_token}`,
          },
        })

        if (!userInfoResponse.ok) {
          throw new Error("Failed to fetch user information from Salesforce")
        }

        const userInfo = await userInfoResponse.json()

        // Create a user object from Salesforce user info
        const user = {
          id: userInfo.user_id,
          name: `${userInfo.first_name} ${userInfo.last_name}`,
          email: userInfo.email,
          role: "admin", // Default role, can be customized based on Salesforce profile
          salesforceToken: authData.access_token,
          salesforceInstanceUrl: authData.instance_url,
        }

        // Generate token
        const token = await signToken(user)

        // Create response
        const responseObj = NextResponse.json({
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          salesforceConnected: true,
        })

        // Set cookie
        return setAuthCookie(responseObj, token)
      } catch (error) {
        console.error("Error fetching user info from Salesforce:", error)

        // If user info fetch fails, create a generic user with the token
        const user = {
          id: "sf-user",
          name: "Salesforce User",
          email: username,
          role: "admin" as const,
          salesforceToken: authData.access_token,
          salesforceInstanceUrl: authData.instance_url,
        }

        // Generate token
        const token = await signToken(user)

        // Create response
        const responseObj = NextResponse.json({
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          salesforceConnected: true,
        })

        // Set cookie
        return setAuthCookie(responseObj, token)
      }
    } catch (error) {
      console.error("Salesforce authentication error:", error)

      // Fall back to demo mode
      console.log("Error during Salesforce authentication, falling back to demo mode")

      // Generate token for demo user
      const token = await signToken(DEMO_USER)

      // Create response
      const responseObj = NextResponse.json({
        user: DEMO_USER,
        demoMode: true,
        salesforceError: error instanceof Error ? error.message : "Authentication failed",
      })

      // Set cookie
      return setAuthCookie(responseObj, token)
    }
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}

