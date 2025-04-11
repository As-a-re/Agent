"use client"

import { useState, useEffect } from "react"
import { BarChart3, Clock, MessageSquare, Users, Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Navbar from "@/components/navbar"
import { DashboardChart } from "@/components/dashboard-chart"
import { DashboardPieChart } from "@/components/dashboard-pie-chart"
import { DashboardBarChart } from "@/components/dashboard-bar-chart"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/use-auth"

interface DashboardMetrics {
  totalTickets: number
  averageResponseTime: number
  activeAgents: number
  customerSatisfaction: number
}

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState("30d")
  const [isLoading, setIsLoading] = useState(true)
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalTickets: 0,
    averageResponseTime: 0,
    activeAgents: 0,
    customerSatisfaction: 0,
  })
  const { toast } = useToast()
  const { user, isLoading: authLoading } = useAuth()
  const [salesforceConnected, setSalesforceConnected] = useState(true)
  const [isDemoMode, setIsDemoMode] = useState(false)

  // Check if we're in demo mode
  useEffect(() => {
    const checkDemoMode = async () => {
      try {
        const response = await fetch("/api/auth/check-demo")
        const data = await response.json()
        setIsDemoMode(data.demoMode === true)
      } catch (error) {
        console.error("Error checking demo mode:", error)
      }
    }

    checkDemoMode()
  }, [])

  // Update the useEffect to handle Salesforce connection errors
  useEffect(() => {
    const fetchDashboardMetrics = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("/api/dashboard/metrics")

        if (response.status === 503) {
          // Salesforce is not connected
          setSalesforceConnected(false)
          setMetrics({
            totalTickets: 1248,
            averageResponseTime: 4.2,
            activeAgents: 24,
            customerSatisfaction: 94.2,
          })
          return
        }

        if (!response.ok) {
          throw new Error("Failed to fetch dashboard metrics")
        }

        const data = await response.json()
        setMetrics(data)
        setSalesforceConnected(true)
      } catch (error) {
        console.error("Error fetching dashboard metrics:", error)
        setSalesforceConnected(false)
        // Use sample data as fallback
        setMetrics({
          totalTickets: 1248,
          averageResponseTime: 4.2,
          activeAgents: 24,
          customerSatisfaction: 94.2,
        })

        toast({
          title: "Using Demo Data",
          description: "Could not connect to Salesforce. Showing demo data instead.",
          variant: "default",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardMetrics()
  }, [toast])

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-2 md:space-y-0">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Demo mode banner */}
        {isDemoMode && (
          <div className="bg-blue-100 dark:bg-blue-900 border-l-4 border-blue-500 p-4 mb-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700 dark:text-blue-200">
                  You are using ServiceGenius in demo mode. All data shown is sample data.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Salesforce connection warning */}
        {!salesforceConnected && !isDemoMode && (
          <div className="bg-yellow-100 dark:bg-yellow-900 border-l-4 border-yellow-500 p-4 mb-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700 dark:text-yellow-200">
                  Not connected to Salesforce. Showing demo data. Check your Salesforce credentials.
                </p>
              </div>
            </div>
          </div>
        )}

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="agents">Agents</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{isLoading ? "..." : metrics.totalTickets.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+12.5% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Response Time</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {isLoading ? "..." : `${metrics.averageResponseTime.toFixed(1)} min`}
                  </div>
                  <p className="text-xs text-muted-foreground">-18% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Agents</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{isLoading ? "..." : metrics.activeAgents}</div>
                  <p className="text-xs text-muted-foreground">+2 since yesterday</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Customer Satisfaction</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {isLoading ? "..." : `${metrics.customerSatisfaction.toFixed(1)}%`}
                  </div>
                  <p className="text-xs text-muted-foreground">+5.1% from last month</p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Ticket Volume</CardTitle>
                  <CardDescription>
                    Ticket volume over the last {timeRange === "7d" ? "7" : timeRange === "30d" ? "30" : "90"} days
                  </CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <DashboardChart timeRange={timeRange} endpoint="/api/dashboard/ticket-volume" />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Top Categories</CardTitle>
                  <CardDescription>Most common customer inquiry categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <DashboardPieChart endpoint="/api/dashboard/categories" />
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Agent Performance</CardTitle>
                  <CardDescription>Top performing agents by resolution rate</CardDescription>
                </CardHeader>
                <CardContent>
                  <DashboardBarChart />
                </CardContent>
              </Card>
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>AI Assistance Impact</CardTitle>
                  <CardDescription>Improvement in resolution time with AI assistance</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <div className="h-[300px] w-full">
                    <DashboardChart timeRange={timeRange} isComparison={true} endpoint="/api/dashboard/ai-comparison" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

