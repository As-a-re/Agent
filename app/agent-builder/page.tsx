"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import Navbar from "@/components/navbar"

export default function AgentBuilderPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("design")
  const [saving, setSaving] = useState(false)
  const [deploying, setDeploying] = useState(false)

  const handleSave = () => {
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
      toast({
        title: "Configuration saved",
        description: "Your agent configuration has been saved successfully.",
      })
    }, 1500)
  }

  const handleDeploy = () => {
    setDeploying(true)
    setTimeout(() => {
      setDeploying(false)
      toast({
        title: "Agent deployed",
        description: "Your agent has been deployed and is now live.",
      })
    }, 2000)
  }

  const handleNextTab = () => {
    if (activeTab === "design") setActiveTab("actions")
    else if (activeTab === "actions") setActiveTab("knowledge")
    else if (activeTab === "knowledge") setActiveTab("test")
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">Agent Builder</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="design">Design</TabsTrigger>
            <TabsTrigger value="actions">Custom Actions</TabsTrigger>
            <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
            <TabsTrigger value="test">Test & Deploy</TabsTrigger>
          </TabsList>

          <TabsContent value="design" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Agent Configuration</CardTitle>
                <CardDescription>Define your agent's basic properties and behavior</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="agent-name">Agent Name</Label>
                    <Input id="agent-name" defaultValue="Customer Service Assistant" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="agent-type">Agent Type</Label>
                    <Select defaultValue="customer-service">
                      <SelectTrigger id="agent-type">
                        <SelectValue placeholder="Select agent type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="customer-service">Customer Service</SelectItem>
                        <SelectItem value="sales">Sales</SelectItem>
                        <SelectItem value="technical-support">Technical Support</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="agent-description">Description</Label>
                  <Textarea
                    id="agent-description"
                    defaultValue="An AI-powered customer service assistant that helps resolve customer inquiries efficiently."
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="agent-instructions">System Instructions</Label>
                  <Textarea
                    id="agent-instructions"
                    className="min-h-[150px]"
                    defaultValue="You are a helpful customer service assistant for our company. Your goal is to help customers resolve their issues efficiently and professionally. Always be polite and empathetic. If you don't know the answer to a question, use the knowledge base to find relevant information or escalate to a human agent when necessary."
                  />
                </div>

                <div className="space-y-4 pt-4">
                  <h3 className="text-lg font-medium">Agent Capabilities</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Switch id="capability-1" defaultChecked />
                      <Label htmlFor="capability-1">Order Management</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="capability-2" defaultChecked />
                      <Label htmlFor="capability-2">Returns Processing</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="capability-3" defaultChecked />
                      <Label htmlFor="capability-3">Product Information</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="capability-4" defaultChecked />
                      <Label htmlFor="capability-4">Billing Support</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <div className="flex gap-2">
                  <Button onClick={handleSave} disabled={saving}>
                    {saving ? "Saving..." : "Save Configuration"}
                  </Button>
                  <Button onClick={handleNextTab}>Next: Custom Actions</Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="actions" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Custom Actions</CardTitle>
                <CardDescription>Create actions your agent can perform to solve customer issues</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-end">
                  <Button>Add New Action</Button>
                </div>

                <div className="border rounded-md p-4 space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                    <h3 className="text-lg font-medium">Check Order Status</h3>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm">
                        Delete
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Retrieves the current status of a customer order from the Order Management System
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Input Parameters:</span>
                      <ul className="list-disc list-inside text-muted-foreground">
                        <li>Order Number (required)</li>
                        <li>Customer Email (optional)</li>
                      </ul>
                    </div>
                    <div>
                      <span className="font-medium">Output:</span>
                      <ul className="list-disc list-inside text-muted-foreground">
                        <li>Order Status</li>
                        <li>Estimated Delivery Date</li>
                        <li>Shipping Carrier</li>
                        <li>Tracking Number</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border rounded-md p-4 space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                    <h3 className="text-lg font-medium">Process Return Request</h3>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm">
                        Delete
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Initiates a return request for a customer order and generates a return label
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Input Parameters:</span>
                      <ul className="list-disc list-inside text-muted-foreground">
                        <li>Order Number (required)</li>
                        <li>Return Reason (required)</li>
                        <li>Items to Return (required)</li>
                      </ul>
                    </div>
                    <div>
                      <span className="font-medium">Output:</span>
                      <ul className="list-disc list-inside text-muted-foreground">
                        <li>Return Authorization Number</li>
                        <li>Return Label URL</li>
                        <li>Return Instructions</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border rounded-md p-4 space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                    <h3 className="text-lg font-medium">Update Customer Information</h3>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm">
                        Delete
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Updates customer contact information in the CRM system
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Input Parameters:</span>
                      <ul className="list-disc list-inside text-muted-foreground">
                        <li>Customer ID or Email (required)</li>
                        <li>Field to Update (required)</li>
                        <li>New Value (required)</li>
                      </ul>
                    </div>
                    <div>
                      <span className="font-medium">Output:</span>
                      <ul className="list-disc list-inside text-muted-foreground">
                        <li>Success/Failure Status</li>
                        <li>Updated Customer Record</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab("design")}>
                  Back
                </Button>
                <div className="flex gap-2">
                  <Button onClick={handleSave} disabled={saving}>
                    {saving ? "Saving..." : "Save Actions"}
                  </Button>
                  <Button onClick={handleNextTab}>Next: Knowledge Base</Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="knowledge" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Knowledge Base</CardTitle>
                <CardDescription>Connect data sources to enhance your agent's capabilities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-end gap-2">
                  <Button variant="outline">Import Data</Button>
                  <Button>Add Source</Button>
                </div>

                <div className="border rounded-md p-4 space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                    <h3 className="text-lg font-medium">Product Catalog</h3>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm">
                        Disconnect
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Connected to Salesforce Product2 objects with product details, pricing, and availability
                  </p>
                  <div className="text-sm">
                    <span className="font-medium">Last Synced:</span>
                    <span className="text-muted-foreground ml-2">Today at 09:45 AM</span>
                  </div>
                </div>

                <div className="border rounded-md p-4 space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                    <h3 className="text-lg font-medium">Help Center Articles</h3>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm">
                        Disconnect
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Connected to Knowledge__c objects containing troubleshooting guides and FAQs
                  </p>
                  <div className="text-sm">
                    <span className="font-medium">Last Synced:</span>
                    <span className="text-muted-foreground ml-2">Yesterday at 5:30 PM</span>
                  </div>
                </div>

                <div className="border rounded-md p-4 space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                    <h3 className="text-lg font-medium">Return Policy</h3>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm">
                        Disconnect
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    PDF document containing the company's return and refund policies
                  </p>
                  <div className="text-sm">
                    <span className="font-medium">Last Synced:</span>
                    <span className="text-muted-foreground ml-2">3 days ago</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab("actions")}>
                  Back
                </Button>
                <div className="flex gap-2">
                  <Button onClick={handleSave} disabled={saving}>
                    {saving ? "Saving..." : "Save Knowledge Base"}
                  </Button>
                  <Button onClick={handleNextTab}>Next: Test & Deploy</Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="test" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Test Your Agent</CardTitle>
                <CardDescription>Try out your agent before deploying it</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md p-4 h-[400px] flex flex-col">
                  <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
                        U
                      </div>
                      <div className="bg-muted p-3 rounded-lg max-w-[80%]">
                        <p>I need to return an item I purchased last week.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 justify-end">
                      <div className="bg-primary text-primary-foreground p-3 rounded-lg max-w-[80%]">
                        <p>
                          I'd be happy to help you with your return request. Could you please provide your order number
                          so I can look up the details?
                        </p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-foreground font-medium">
                        A
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
                        U
                      </div>
                      <div className="bg-muted p-3 rounded-lg max-w-[80%]">
                        <p>My order number is #12345678</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 justify-end">
                      <div className="bg-primary text-primary-foreground p-3 rounded-lg max-w-[80%]">
                        <p>
                          Thank you for providing your order number. I can see that you ordered a Blue Widget on April
                          1st. According to our return policy, you have 30 days to return this item. Would you like me
                          to initiate the return process for you now?
                        </p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-foreground font-medium">
                        A
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Input placeholder="Type a test message..." className="flex-1" />
                    <Button>Send</Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab("knowledge")}>
                  Back
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline">Reset Conversation</Button>
                  <Button onClick={handleDeploy} disabled={deploying}>
                    {deploying ? "Deploying..." : "Deploy Agent"}
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

