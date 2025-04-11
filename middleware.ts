import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"

// Paths that don't require authentication
const publicPaths = ["/", "/login", "/api/auth/login"]

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Check if the path is public
  if (publicPaths.some((path) => pathname === path) || pathname.startsWith("/_next")) {
    return NextResponse.next()
  }

  // Check if the user is authenticated
  const user = await getCurrentUser(request)

  if (!user) {
    // Redirect to login page if not authenticated
    const url = new URL("/login", request.url)
    url.searchParams.set("from", pathname)
    return NextResponse.redirect(url)
  }

  // Continue to the requested page if authenticated
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
}

