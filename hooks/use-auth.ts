"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  name: string
  email: string
  role: string
}

export function useAuth() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/auth/me")

        if (!response.ok) {
          if (response.status === 401) {
            // Not authenticated, redirect to login
            router.push("/login")
            return
          }
          throw new Error("Failed to fetch user")
        }

        const data = await response.json()
        setUser(data.user)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unexpected error occurred")
        console.error("Error fetching user:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [router])

  return { user, isLoading, error }
}

