"use client"

import { useEffect, useState } from "react"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { useToast } from "@/hooks/use-toast"

interface CategoryData {
  name: string
  value: number
}

interface DashboardPieChartProps {
  endpoint: string
}

const COLORS = ["#2563eb", "#3b82f6", "#60a5fa", "#93c5fd", "#bfdbfe"]

export function DashboardPieChart({ endpoint }: DashboardPieChartProps) {
  const [data, setData] = useState<CategoryData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)

        // Get dates for the last 30 days
        const endDate = new Date().toISOString().split("T")[0]
        const startDate = new Date()
        startDate.setDate(startDate.getDate() - 30)

        const params = new URLSearchParams({
          startDate: startDate.toISOString().split("T")[0],
          endDate,
        })

        const response = await fetch(`${endpoint}?${params.toString()}`)

        if (!response.ok) {
          throw new Error("Failed to fetch category data")
        }

        const result = await response.json()

        // Transform data for the chart
        const chartData = result.categories.map((category: any) => ({
          name: category.category,
          value: category.percentage,
        }))

        setData(chartData)
      } catch (error) {
        console.error("Error fetching category data:", error)
        toast({
          title: "Error",
          description: "Failed to load category data",
          variant: "destructive",
        })

        // Fallback to sample data
        setData([
          { name: "Billing Issues", value: 35 },
          { name: "Technical Support", value: 25 },
          { name: "Product Inquiries", value: 20 },
          { name: "Returns & Refunds", value: 15 },
          { name: "Other", value: 5 },
        ])
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [endpoint, toast])

  if (isLoading) {
    return (
      <div className="h-[300px] w-full flex items-center justify-center">
        <p className="text-muted-foreground">Loading chart data...</p>
      </div>
    )
  }

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value}%`} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

