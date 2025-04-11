"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Home, Settings, Users, MessageSquare, Menu, X } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"
import UserMenu from "@/components/auth/user-menu"
import { useAuth } from "@/hooks/use-auth"

const navItems = [
  {
    name: "Home",
    href: "/",
    icon: Home,
  },
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: BarChart3,
  },
  {
    name: "Agent Builder",
    href: "/agent-builder",
    icon: Settings,
  },
  {
    name: "Chat Interface",
    href: "/chat",
    icon: MessageSquare,
  },
  {
    name: "Team",
    href: "/team",
    icon: Users,
  },
]

export default function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, isLoading } = useAuth()

  // Skip navbar on homepage and login page
  if (pathname === "/" || pathname === "/login") return null

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4 md:px-8">
        <div className="flex items-center gap-2 font-bold">
          <Link href="/">
            <span className="text-primary">Service</span>
            <span>Genius</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden ml-auto"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 mx-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center text-sm font-medium transition-colors hover:text-primary",
                pathname === item.href ? "text-primary" : "text-muted-foreground",
              )}
            >
              <item.icon className="h-4 w-4 mr-2" />
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center ml-auto gap-2">
          <ThemeToggle />
          {!isLoading && user && <UserMenu user={user} />}
        </div>

        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-background border-b z-50 md:hidden">
            <nav className="flex flex-col p-4 space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center text-sm font-medium transition-colors hover:text-primary p-2 rounded-md",
                    pathname === item.href ? "text-primary bg-muted" : "text-muted-foreground",
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.name}
                </Link>
              ))}
              <div className="pt-2 border-t flex items-center justify-between">
                <ThemeToggle />
                {!isLoading && user && <UserMenu user={user} />}
              </div>
            </nav>
          </div>
        )}
      </div>
    </div>
  )
}

