"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Smile, Send, Paperclip, MoreVertical, Phone, Video } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Navbar from "@/components/navbar"

// Sample conversation data
const initialMessages = [
  {
    id: 1,
    role: "agent",
    name: "ServiceGenius",
    content: "Hello! I'm your ServiceGenius assistant. How can I help you today?",
    timestamp: "10:30 AM",
  },
]

export default function ChatPage() {
  const [messages, setMessages] = useState(initialMessages)
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Handle sending a message
  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      role: "user",
      name: "You",
      content: inputValue,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages([...messages, userMessage])
    setInputValue("")

    // Simulate agent typing
    setIsTyping(true)

    // Generate agent response based on user input
    setTimeout(() => {
      let responseContent = ""

      if (inputValue.toLowerCase().includes("order") && inputValue.toLowerCase().includes("status")) {
        responseContent = "I can help you check your order status. Could you please provide your order number?"
      } else if (inputValue.toLowerCase().includes("return")) {
        responseContent =
          "I'd be happy to help with your return request. To get started, I'll need your order number and the items you wish to return."
      } else if (inputValue.toLowerCase().includes("refund")) {
        responseContent =
          "For refund inquiries, I'll need to check the status of your return. Do you have a return authorization number?"
      } else if (inputValue.toLowerCase().includes("speak") && inputValue.toLowerCase().includes("human")) {
        responseContent =
          "I understand you'd like to speak with a human agent. I'll transfer you to the next available representative. Your estimated wait time is 2 minutes."
      } else {
        responseContent =
          "Thank you for your message. I'm here to help with any questions about orders, returns, refunds, or product information. What specific assistance do you need today?"
      }

      const agentMessage = {
        id: messages.length + 2,
        role: "agent",
        name: "ServiceGenius",
        content: responseContent,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }

      setIsTyping(false)
      setMessages((prev) => [...prev, agentMessage])
    }, 1500)
  }

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <Card className="h-[calc(100vh-120px)]">
              <CardHeader className="px-4">
                <CardTitle className="text-xl">Conversations</CardTitle>
                <CardDescription>Your recent support chats</CardDescription>
              </CardHeader>
              <CardContent className="px-4 space-y-2 overflow-y-auto h-[calc(100%-130px)]">
                <div className="bg-primary/10 p-3 rounded-lg cursor-pointer">
                  <div className="font-medium">ServiceGenius</div>
                  <div className="text-sm text-muted-foreground truncate">
                    Hello! I'm your ServiceGenius assistant...
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Today</div>
                </div>

                <div className="p-3 rounded-lg cursor-pointer hover:bg-muted">
                  <div className="font-medium">Order Support</div>
                  <div className="text-sm text-muted-foreground truncate">Your order #87654321 has been shipped...</div>
                  <div className="text-xs text-muted-foreground mt-1">Yesterday</div>
                </div>

                <div className="p-3 rounded-lg cursor-pointer hover:bg-muted">
                  <div className="font-medium">Technical Support</div>
                  <div className="text-sm text-muted-foreground truncate">Have you tried restarting the device?</div>
                  <div className="text-xs text-muted-foreground mt-1">Apr 2</div>
                </div>
              </CardContent>
              <CardFooter className="px-4 pt-2">
                <Button className="w-full">New Conversation</Button>
              </CardFooter>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="md:col-span-3">
            <Card className="h-[calc(100vh-120px)] flex flex-col">
              <CardHeader className="px-6 py-4 border-b flex flex-row items-center justify-between space-y-0">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Agent" />
                    <AvatarFallback>SG</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">ServiceGenius</CardTitle>
                    <CardDescription>AI Customer Support</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Phone className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video className="h-5 w-5" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Options</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>View conversation details</DropdownMenuItem>
                      <DropdownMenuItem>Transfer to human agent</DropdownMenuItem>
                      <DropdownMenuItem>Email transcript</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">End conversation</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>

              <CardContent className="flex-1 overflow-y-auto p-6">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex items-start gap-3 ${message.role === "user" ? "justify-end" : ""}`}
                    >
                      {message.role !== "user" && (
                        <Avatar>
                          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Agent" />
                          <AvatarFallback>SG</AvatarFallback>
                        </Avatar>
                      )}

                      <div
                        className={`p-3 rounded-lg max-w-[80%] ${
                          message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        <div className="flex justify-between items-start gap-2 mb-1">
                          <span className="font-medium text-xs">{message.name}</span>
                          <span className="text-xs opacity-70">{message.timestamp}</span>
                        </div>
                        <p>{message.content}</p>
                      </div>

                      {message.role === "user" && (
                        <Avatar>
                          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                          <AvatarFallback>You</AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex items-start gap-3">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Agent" />
                        <AvatarFallback>SG</AvatarFallback>
                      </Avatar>
                      <div className="bg-muted p-3 rounded-lg">
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce"
                            style={{ animationDelay: "0.4s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              </CardContent>

              <CardFooter className="p-4 border-t">
                <div className="flex w-full items-center space-x-2">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Paperclip className="h-5 w-5" />
                    <span className="sr-only">Attach file</span>
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Smile className="h-5 w-5" />
                    <span className="sr-only">Emoji</span>
                  </Button>
                  <Input
                    placeholder="Type your message..."
                    className="flex-1"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyPress}
                  />
                  <Button size="icon" className="rounded-full" onClick={handleSendMessage}>
                    <Send className="h-5 w-5" />
                    <span className="sr-only">Send</span>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

