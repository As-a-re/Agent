"use client"

import { useEffect, useState } from "react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { useToast } from "@/hooks/use-toast"

interface TimeSeriesData {
  date: string
  value?: number
  withAI?: number
  withoutAI?: number
}

interface DashboardChartProps {
  timeRange: string
  isComparison?: boolean
  endpoint: string
}

export function DashboardChart({ timeRange, isComparison = false, endpoint }: DashboardChartProps) {
  const [data, setData] = useState<TimeSeriesData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)

        // Convert timeRange to dates
        const endDate = new Date().toISOString().split("T")[0]
        const startDate = new Date()
        startDate.setDate(startDate.getDate() - (timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 90))

        const params = new URLSearchParams({
          startDate: startDate.toISOString().split("T")[0],
          endDate,
          interval: "day",
        })

        if (isComparison) {
          params.append("metric", "responseTime")
        }

        const response = await fetch(`${endpoint}?${params.toString()}`)

        if (!response.ok) {
          throw new Error("Failed to fetch chart data")
        }

        const result = await response.json()
        setData(result.data)
      } catch (error) {
        console.error("Error fetching chart data:", error)
        toast({
          title: "Error",
          description: "Failed to load chart data",
          variant: "destructive",
        })

        // Fallback to sample data
        setData(generateSampleData(timeRange, isComparison))
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [timeRange, isComparison, endpoint, toast])

  if (isLoading) {
    return (
      <div className="h-[300px] w-full flex items-center justify-center">
        <p className="text-muted-foreground">Loading chart data...</p>
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis
          dataKey="date"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => value}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}${isComparison ? "m" : ""}`}
        />
        <Tooltip />
        {isComparison ? (
          <>
            <Line type="monotone" dataKey="withAI" stroke="#2563eb" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="withoutAI" stroke="#ef4444" strokeWidth={2} dot={false} />
          </>
        ) : (
          <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={2} dot={false} />
        )}
      </LineChart>
    </ResponsiveContainer>
  )
}

// Generate sample data for fallback
function generateSampleData(timeRange: string, isComparison = false): TimeSeriesData[] {
  const data: TimeSeriesData[] = []
  const days = timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 90
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

  return data
}

