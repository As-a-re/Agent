import Link from "next/link"
import Image from "next/image"
import { ArrowRight, BarChart3, MessageSquare, Users, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold">
            <span className="text-primary">Service</span>
            <span>Genius</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link
              href="#features"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Features
            </Link>
            <Link
              href="#architecture"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Architecture
            </Link>
            <Link
              href="#demo"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Demo
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/documentation">Documentation</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/dashboard">Live Demo</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">ServiceGenius</h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    An intelligent customer service optimization solution powered by Agentforce
                  </p>
                </div>
                <div className="space-y-4">
                  <ul className="grid gap-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>Reduce response times by up to 75%</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>Automate up to 60% of routine inquiries</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>Improve agent productivity by 40%</span>
                    </li>
                  </ul>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button size="lg" asChild>
                      <Link href="/dashboard">Try Demo</Link>
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                      <Link href="/agent-builder">Build Your Agent</Link>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="mx-auto lg:order-last">
                <div className="relative h-[350px] w-[500px] sm:h-[400px] sm:w-[600px]">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="ServiceGenius Dashboard"
                    fill
                    className="rounded-xl object-cover object-center"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Transforming Customer Service with AI
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  ServiceGenius leverages Agentforce to deliver intelligent, automated customer service solutions.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <MessageSquare className="h-8 w-8 text-primary" />
                  <CardTitle className="text-xl">Intelligent Routing</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Automatically analyzes customer inquiries and routes them to the most qualified agent based on
                    expertise and availability.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <Users className="h-8 w-8 text-primary" />
                  <CardTitle className="text-xl">Agent Augmentation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Provides real-time recommendations and knowledge base access to help agents resolve issues faster.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <BarChart3 className="h-8 w-8 text-primary" />
                  <CardTitle className="text-xl">Performance Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Delivers actionable insights on service metrics, customer satisfaction, and agent performance.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section id="architecture" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Architecture</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">How ServiceGenius Works</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Built on Salesforce's Agentforce platform with custom actions and integrations.
                </p>
              </div>
            </div>
            <div className="mx-auto mt-8 max-w-4xl">
              <div className="rounded-lg border bg-card p-8">
                <div className="flex justify-center">
                  <div className="w-full max-w-3xl">
                    <Image
                      src="/placeholder.svg?height=400&width=800"
                      alt="ServiceGenius Architecture Diagram"
                      width={800}
                      height={400}
                      className="rounded-lg border"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="demo" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Demo</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">See ServiceGenius in Action</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Watch how our solution transforms customer service operations.
                </p>
              </div>
            </div>
            <div className="mx-auto mt-8 max-w-4xl">
              <div className="rounded-lg border bg-card p-8">
                <div className="flex justify-center">
                  <div className="w-full max-w-3xl aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-muted-foreground mb-4">Demo Video</p>
                      <Button asChild>
                        <Link href="/dashboard">Try Interactive Demo</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 ServiceGenius. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <ArrowRight className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  )
}

