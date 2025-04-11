import Link from "next/link"
import { ChevronRight, FileText, Book, Code, Lightbulb, MessageSquare, Settings } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navbar from "@/components/navbar"

export default function DocumentationPage() {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Documentation</h1>
            <p className="text-muted-foreground">Learn how to use ServiceGenius and Agentforce</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              API Reference
            </Button>
            <Button>
              <Book className="mr-2 h-4 w-4" />
              Tutorials
            </Button>
          </div>
        </div>

        <Tabs defaultValue="guides" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="guides">Guides</TabsTrigger>
            <TabsTrigger value="api">API</TabsTrigger>
            <TabsTrigger value="examples">Examples</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>

          <TabsContent value="guides" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <Settings className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle>Getting Started</CardTitle>
                    <CardDescription>Set up your first agent</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Learn how to create and configure your first ServiceGenius agent using Agentforce.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full justify-between" asChild>
                    <Link href="#">
                      Read Guide
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <Code className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle>Custom Actions</CardTitle>
                    <CardDescription>Extend agent capabilities</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Create custom actions to connect your agent to external systems and data sources.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full justify-between" asChild>
                    <Link href="#">
                      Read Guide
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <Lightbulb className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle>Knowledge Base</CardTitle>
                    <CardDescription>Connect information sources</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Learn how to connect your knowledge base to your agent for more accurate responses.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full justify-between" asChild>
                    <Link href="#">
                      Read Guide
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <MessageSquare className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle>Conversation Design</CardTitle>
                    <CardDescription>Create natural interactions</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Design effective conversation flows and prompts for your agent.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full justify-between" asChild>
                    <Link href="#">
                      Read Guide
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <Settings className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle>Deployment</CardTitle>
                    <CardDescription>Go live with your agent</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Learn how to deploy your agent to production and integrate it with your systems.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full justify-between" asChild>
                    <Link href="#">
                      Read Guide
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <Settings className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle>Analytics</CardTitle>
                    <CardDescription>Measure performance</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Set up analytics and reporting to measure your agent's performance.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full justify-between" asChild>
                    <Link href="#">
                      Read Guide
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="api" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>API Documentation</CardTitle>
                <CardDescription>Integrate ServiceGenius with your applications</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">This section would contain detailed API documentation.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="examples" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Example Projects</CardTitle>
                <CardDescription>Learn from example implementations</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">This section would contain example projects and code samples.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="faq" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>Common questions and answers</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  This section would contain frequently asked questions and answers.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

