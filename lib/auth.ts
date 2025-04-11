import { jwtVerify, SignJWT } from "jose"
import { cookies } from "next/headers"
import type { NextRequest, NextResponse } from "next/server"

// Types for authentication
export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "agent" | "manager"
  salesforceToken?: string
  salesforceInstanceUrl?: string
}

// Secret key for JWT signing
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "default-secret-key-change-in-production")

// JWT token expiration (24 hours)
const EXPIRATION_TIME = "24h"

// Generate a JWT token for a user
export async function signToken(user: User): Promise<string> {
  try {
    const token = await new SignJWT({ user })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(EXPIRATION_TIME)
      .sign(JWT_SECRET)

    return token
  } catch (error) {
    console.error("Error signing token:", error)
    throw new Error("Failed to sign token")
  }
}

// Verify a JWT token and return the user
export async function verifyToken(token: string): Promise<User | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload.user as User
  } catch (error) {
    console.error("Error verifying token:", error)
    return null
  }
}

// Get the current user from the request
export async function getCurrentUser(req?: NextRequest): Promise<User | null> {
  try {
    // Get token from cookies
    const cookieStore = cookies()
    const token = req ? req.cookies.get("token")?.value : cookieStore.get("token")?.value

    if (!token) {
      return null
    }

    // Verify token
    return verifyToken(token)
  } catch (error) {
    console.error("Error getting current user:", error)
    return null
  }
}

// Set authentication cookie
export function setAuthCookie(res: NextResponse, token: string): NextResponse {
  res.cookies.set({
    name: "token",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 24 hours
    path: "/",
  })

  return res
}

// Clear authentication cookie
export function clearAuthCookie(res: NextResponse): NextResponse {
  res.cookies.set({
    name: "token",
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  })

  return res
}

