import { Mail, Phone } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Navbar from "@/components/navbar"

const teamMembers = [
  {
    name: "Alex Johnson",
    role: "Senior Customer Support",
    email: "alex.j@servicegenius.com",
    phone: "+1 (555) 123-4567",
    avatar: "/placeholder.svg?height=100&width=100",
    initials: "AJ",
    status: "Available",
    specialties: ["Technical Support", "Billing Issues"],
    metrics: {
      responseTime: "1.8 min",
      resolutionRate: "95%",
      satisfaction: "4.9/5",
    },
  },
  {
    name: "Maria Gonzalez",
    role: "Customer Support Lead",
    email: "maria.g@servicegenius.com",
    phone: "+1 (555) 234-5678",
    avatar: "/placeholder.svg?height=100&width=100",
    initials: "MG",
    status: "In Meeting",
    specialties: ["Returns & Refunds", "Order Management"],
    metrics: {
      responseTime: "2.1 min",
      resolutionRate: "92%",
      satisfaction: "4.8/5",
    },
  },
  {
    name: "John Davis",
    role: "Product Specialist",
    email: "john.d@servicegenius.com",
    phone: "+1 (555) 345-6789",
    avatar: "/placeholder.svg?height=100&width=100",
    initials: "JD",
    status: "Available",
    specialties: ["Product Information", "Technical Support"],
    metrics: {
      responseTime: "2.5 min",
      resolutionRate: "88%",
      satisfaction: "4.7/5",
    },
  },
  {
    name: "Sarah Lee",
    role: "Customer Support Agent",
    email: "sarah.l@servicegenius.com",
    phone: "+1 (555) 456-7890",
    avatar: "/placeholder.svg?height=100&width=100",
    initials: "SL",
    status: "On Call",
    specialties: ["Billing Issues", "Account Management"],
    metrics: {
      responseTime: "2.2 min",
      resolutionRate: "85%",
      satisfaction: "4.6/5",
    },
  },
  {
    name: "David Kim",
    role: "Technical Support Specialist",
    email: "david.k@servicegenius.com",
    phone: "+1 (555) 567-8901",
    avatar: "/placeholder.svg?height=100&width=100",
    initials: "DK",
    status: "Available",
    specialties: ["Technical Support", "Product Information"],
    metrics: {
      responseTime: "2.0 min",
      resolutionRate: "82%",
      satisfaction: "4.5/5",
    },
  },
  {
    name: "ServiceGenius AI",
    role: "AI Assistant",
    email: "ai@servicegenius.com",
    phone: "N/A",
    avatar: "/placeholder.svg?height=100&width=100",
    initials: "AI",
    status: "Always Online",
    specialties: ["All Categories", "Initial Triage"],
    metrics: {
      responseTime: "0.1 min",
      resolutionRate: "75%",
      satisfaction: "4.4/5",
    },
  },
]

export default function TeamPage() {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Support Team</h1>
            <p className="text-muted-foreground">Manage your customer support team and AI assistants</p>
          </div>
          <Button>Add Team Member</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <Card key={index} className={member.name === "ServiceGenius AI" ? "border-primary/50" : ""}>
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <CardDescription>{member.role}</CardDescription>
                  <div className="mt-1">
                    <Badge
                      variant={
                        member.status === "Available"
                          ? "default"
                          : member.status === "Always Online"
                            ? "default"
                            : member.status === "On Call"
                              ? "secondary"
                              : "outline"
                      }
                    >
                      {member.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium">Specialties</div>
                  <div className="flex flex-wrap gap-2">
                    {member.specialties.map((specialty, i) => (
                      <Badge key={i} variant="secondary">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">Response Time</div>
                    <div className="text-sm font-medium">{member.metrics.responseTime}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">Resolution</div>
                    <div className="text-sm font-medium">{member.metrics.resolutionRate}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">Satisfaction</div>
                    <div className="text-sm font-medium">{member.metrics.satisfaction}</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{member.email}</span>
                  </div>
                  {member.phone !== "N/A" && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{member.phone}</span>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  View Profile
                </Button>
                <Button size="sm">Assign Tickets</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

