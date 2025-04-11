import { getSalesforceAuth } from "./auth"
import { getCurrentUser } from "@/lib/auth"

// Base Salesforce API client
export class SalesforceAPI {
  // Make a GET request to Salesforce API
  async get<T>(path: string, params?: Record<string, string>): Promise<T> {
    // Try to get token from current user first
    const user = await getCurrentUser()
    let token: string
    let instanceUrl: string

    if (user?.salesforceToken && user?.salesforceInstanceUrl) {
      // Use token from authenticated user
      token = user.salesforceToken
      instanceUrl = user.salesforceInstanceUrl
    } else {
      // Fall back to environment variable auth
      const auth = getSalesforceAuth()
      token = await auth.getToken()
      instanceUrl = await auth.getInstanceUrl()
    }

    let url = `${instanceUrl}${path}`

    if (params) {
      const queryParams = new URLSearchParams()
      Object.entries(params).forEach(([key, value]) => {
        queryParams.append(key, value)
      })
      url += `?${queryParams.toString()}`
    }

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Salesforce API error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  // Make a POST request to Salesforce API
  async post<T>(path: string, data: any): Promise<T> {
    // Try to get token from current user first
    const user = await getCurrentUser()
    let token: string
    let instanceUrl: string

    if (user?.salesforceToken && user?.salesforceInstanceUrl) {
      // Use token from authenticated user
      token = user.salesforceToken
      instanceUrl = user.salesforceInstanceUrl
    } else {
      // Fall back to environment variable auth
      const auth = getSalesforceAuth()
      token = await auth.getToken()
      instanceUrl = await auth.getInstanceUrl()
    }

    const response = await fetch(`${instanceUrl}${path}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`Salesforce API error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  // Make a PATCH request to Salesforce API
  async patch<T>(path: string, data: any): Promise<T> {
    // Try to get token from current user first
    const user = await getCurrentUser()
    let token: string
    let instanceUrl: string

    if (user?.salesforceToken && user?.salesforceInstanceUrl) {
      // Use token from authenticated user
      token = user.salesforceToken
      instanceUrl = user.salesforceInstanceUrl
    } else {
      // Fall back to environment variable auth
      const auth = getSalesforceAuth()
      token = await auth.getToken()
      instanceUrl = await auth.getInstanceUrl()
    }

    const response = await fetch(`${instanceUrl}${path}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`Salesforce API error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  // Make a DELETE request to Salesforce API
  async delete(path: string): Promise<void> {
    // Try to get token from current user first
    const user = await getCurrentUser()
    let token: string
    let instanceUrl: string

    if (user?.salesforceToken && user?.salesforceInstanceUrl) {
      // Use token from authenticated user
      token = user.salesforceToken
      instanceUrl = user.salesforceInstanceUrl
    } else {
      // Fall back to environment variable auth
      const auth = getSalesforceAuth()
      token = await auth.getToken()
      instanceUrl = await auth.getInstanceUrl()
    }

    const response = await fetch(`${instanceUrl}${path}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Salesforce API error: ${response.status} ${response.statusText}`)
    }
  }

  // Execute a SOQL query
  async query<T>(soql: string): Promise<{ records: T[]; totalSize: number; done: boolean }> {
    const encodedQuery = encodeURIComponent(soql)
    return this.get<{ records: T[]; totalSize: number; done: boolean }>(`/services/data/v58.0/query?q=${encodedQuery}`)
  }
}

// Create and export a singleton instance
export const salesforceApi = new SalesforceAPI()

