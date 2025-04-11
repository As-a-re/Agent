import { jwtDecode } from "jwt-decode"

// Types for Salesforce authentication
export interface SalesforceAuthConfig {
  clientId: string
  clientSecret: string
  username: string
  password: string
  securityToken: string
  loginUrl: string
}

export interface SalesforceAuthResponse {
  access_token: string
  instance_url: string
  id: string
  token_type: string
  issued_at: string
  signature: string
}

export interface SalesforceTokenPayload {
  exp: number
  iat: number
  auth_time: number
  jti: string
  iss: string
  sub: string
  aud: string
}

// Class to handle Salesforce authentication
export class SalesforceAuth {
  private config: SalesforceAuthConfig
  private authData: SalesforceAuthResponse | null = null
  private expiresAt = 0

  constructor(config: SalesforceAuthConfig) {
    this.config = config
  }

  // Get authentication token, refreshing if necessary
  async getToken(): Promise<string> {
    if (!this.authData || this.isTokenExpired()) {
      await this.authenticate()
    }
    return this.authData!.access_token
  }

  // Get instance URL from authentication data
  async getInstanceUrl(): Promise<string> {
    if (!this.authData || this.isTokenExpired()) {
      await this.authenticate()
    }
    return this.authData!.instance_url
  }

  // Check if the current token is expired
  private isTokenExpired(): boolean {
    return Date.now() >= this.expiresAt - 300000 // 5 minutes buffer
  }

  // Authenticate with Salesforce
  private async authenticate(): Promise<void> {
    try {
      const params = new URLSearchParams()
      params.append("grant_type", "password")
      params.append("client_id", this.config.clientId)
      params.append("client_secret", this.config.clientSecret)
      params.append("username", this.config.username)
      params.append("password", this.config.password + this.config.securityToken)

      console.log(`Authenticating with Salesforce at ${this.config.loginUrl}/services/oauth2/token`)

      const response = await fetch(`${this.config.loginUrl}/services/oauth2/token`, {
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

        throw new Error(
          `Salesforce authentication failed: ${errorData.error_description || errorData.error || "Unknown error"}`,
        )
      }

      this.authData = await response.json()

      // Decode token to get expiration time
      try {
        const decoded = jwtDecode<SalesforceTokenPayload>(this.authData.access_token)
        this.expiresAt = decoded.exp * 1000 // Convert to milliseconds
      } catch (e) {
        // If token can't be decoded, set expiration to 2 hours from now
        this.expiresAt = Date.now() + 7200000
      }
    } catch (error) {
      console.error("Error authenticating with Salesforce:", error)
      throw error
    }
  }
}

// Create and export a singleton instance
let authInstance: SalesforceAuth | null = null

export function getSalesforceAuth(): SalesforceAuth {
  if (!authInstance) {
    // Get config from environment variables
    const config: SalesforceAuthConfig = {
      clientId: process.env.SALESFORCE_CLIENT_ID || "",
      clientSecret: process.env.SALESFORCE_CLIENT_SECRET || "",
      username: process.env.SALESFORCE_USERNAME || "",
      password: process.env.SALESFORCE_PASSWORD || "",
      securityToken: process.env.SALESFORCE_SECURITY_TOKEN || "",
      loginUrl: process.env.SALESFORCE_LOGIN_URL || "https://login.salesforce.com",
    }

    // Validate config
    const missingKeys = Object.entries(config)
      .filter(([_, value]) => !value)
      .map(([key]) => key)

    if (missingKeys.length > 0) {
      throw new Error(`Missing Salesforce configuration: ${missingKeys.join(", ")}`)
    }

    authInstance = new SalesforceAuth(config)
  }

  return authInstance
}

