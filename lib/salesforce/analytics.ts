import { salesforceApi } from "./api"

// Types for Analytics
export interface TicketMetrics {
  totalTickets: number
  openTickets: number
  resolvedTickets: number
  averageResponseTime: number
  averageResolutionTime: number
  customerSatisfaction: number
}

export interface AgentMetrics {
  agentId: string
  agentName: string
  ticketsHandled: number
  averageResponseTime: number
  resolutionRate: number
  customerSatisfaction: number
}

export interface CategoryMetrics {
  category: string
  count: number
  percentage: number
}

export interface TimeSeriesData {
  date: string
  value: number
}

export interface ComparisonData {
  date: string
  withAI: number
  withoutAI: number
}

// Analytics API client
export class AnalyticsAPI {
  // Get ticket metrics for a time period
  async getTicketMetrics(startDate: string, endDate: string): Promise<TicketMetrics> {
    try {
      return salesforceApi.get<TicketMetrics>("/services/data/v58.0/analytics/tickets", {
        startDate,
        endDate,
      })
    } catch (error) {
      console.error("Error fetching ticket metrics:", error)
      throw error
    }
  }

  // Get agent performance metrics
  async getAgentMetrics(startDate: string, endDate: string): Promise<AgentMetrics[]> {
    try {
      const result = await salesforceApi.get<{ agents: AgentMetrics[] }>("/services/data/v58.0/analytics/agents", {
        startDate,
        endDate,
      })

      return result.agents
    } catch (error) {
      console.error("Error fetching agent metrics:", error)
      throw error
    }
  }

  // Get ticket categories distribution
  async getCategoryMetrics(startDate: string, endDate: string): Promise<CategoryMetrics[]> {
    try {
      const result = await salesforceApi.get<{ categories: CategoryMetrics[] }>(
        "/services/data/v58.0/analytics/categories",
        {
          startDate,
          endDate,
        },
      )

      return result.categories
    } catch (error) {
      console.error("Error fetching category metrics:", error)
      throw error
    }
  }

  // Get ticket volume time series data
  async getTicketVolumeTimeSeries(
    startDate: string,
    endDate: string,
    interval: "day" | "week" | "month",
  ): Promise<TimeSeriesData[]> {
    try {
      const result = await salesforceApi.get<{ data: TimeSeriesData[] }>(
        "/services/data/v58.0/analytics/ticketVolume",
        {
          startDate,
          endDate,
          interval,
        },
      )

      return result.data
    } catch (error) {
      console.error("Error fetching ticket volume time series:", error)
      throw error
    }
  }

  // Get AI vs non-AI comparison data
  async getAIComparisonData(
    startDate: string,
    endDate: string,
    metric: "responseTime" | "resolutionTime" | "satisfaction",
  ): Promise<ComparisonData[]> {
    try {
      const result = await salesforceApi.get<{ data: ComparisonData[] }>(
        "/services/data/v58.0/analytics/aiComparison",
        {
          startDate,
          endDate,
          metric,
        },
      )

      return result.data
    } catch (error) {
      console.error("Error fetching AI comparison data:", error)
      throw error
    }
  }

  // Get real-time dashboard metrics
  async getDashboardMetrics(): Promise<{
    totalTickets: number
    averageResponseTime: number
    activeAgents: number
    customerSatisfaction: number
  }> {
    try {
      return salesforceApi.get<{
        totalTickets: number
        averageResponseTime: number
        activeAgents: number
        customerSatisfaction: number
      }>("/services/data/v58.0/analytics/dashboard")
    } catch (error) {
      console.error("Error fetching dashboard metrics:", error)
      throw error
    }
  }
}

// Create and export a singleton instance
export const analyticsApi = new AnalyticsAPI()

