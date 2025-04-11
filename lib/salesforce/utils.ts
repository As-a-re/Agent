import { getSalesforceAuth } from "./auth"

// Check if Salesforce is connected
export async function isSalesforceConnected(): Promise<boolean> {
  try {
    const auth = getSalesforceAuth()
    await auth.getToken()
    return true
  } catch (error) {
    console.error("Salesforce connection check failed:", error)
    return false
  }
}

// Get sample data when Salesforce is not available
export function getSampleDashboardMetrics() {
  return {
    totalTickets: 1248,
    averageResponseTime: 4.2,
    activeAgents: 24,
    customerSatisfaction: 94.2,
  }
}

export function getSampleCategoryMetrics() {
  return {
    categories: [
      { category: "Billing Issues", count: 350, percentage: 35 },
      { category: "Technical Support", count: 250, percentage: 25 },
      { category: "Product Inquiries", count: 200, percentage: 20 },
      { category: "Returns & Refunds", count: 150, percentage: 15 },
      { category: "Other", count: 50, percentage: 5 },
    ],
  }
}

export function getSampleTimeSeriesData(days: number, isComparison = false) {
  const data = []
  const now = new Date()

  for (let i = days; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)

    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}`

    // Base value with some randomness
    const baseValue = Math.floor(Math.random() * 50) + 100

    if (isComparison) {
      data.push({
        date: formattedDate,
        withAI: Math.max(1, Math.floor(baseValue * 0.6)),
        withoutAI: baseValue,
      })
    } else {
      data.push({
        date: formattedDate,
        value: baseValue,
      })
    }
  }

  return { data }
}

