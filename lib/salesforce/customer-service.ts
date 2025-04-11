import { salesforceApi } from "./api"

// Types for Customer Service
export interface Case {
  Id?: string
  CaseNumber?: string
  Subject: string
  Description: string
  Status: string
  Priority: string
  Origin: string
  ContactId?: string
  ContactEmail?: string
  CreatedDate?: string
  LastModifiedDate?: string
}

export interface Contact {
  Id?: string
  FirstName: string
  LastName: string
  Email: string
  Phone?: string
  AccountId?: string
}

export interface Order {
  Id?: string
  OrderNumber?: string
  Status: string
  EffectiveDate: string
  AccountId: string
  TotalAmount?: number
}

export interface OrderItem {
  Id?: string
  OrderId: string
  Product2Id: string
  Quantity: number
  UnitPrice: number
  TotalPrice?: number
}

export interface Product {
  Id?: string
  Name: string
  ProductCode: string
  Description: string
  IsActive: boolean
  Family?: string
}

// Customer Service API client
export class CustomerServiceAPI {
  // Get cases
  async getCases(limit = 10, offset = 0): Promise<Case[]> {
    try {
      const result = await salesforceApi.query<Case>(
        `SELECT Id, CaseNumber, Subject, Description, Status, Priority, Origin, ContactId, CreatedDate, LastModifiedDate 
         FROM Case 
         ORDER BY CreatedDate DESC 
         LIMIT ${limit} OFFSET ${offset}`,
      )

      return result.records
    } catch (error) {
      console.error("Error fetching cases:", error)
      throw error
    }
  }

  // Get case by ID
  async getCase(id: string): Promise<Case> {
    try {
      return salesforceApi.get<Case>(`/services/data/v58.0/sobjects/Case/${id}`)
    } catch (error) {
      console.error(`Error fetching case ${id}:`, error)
      throw error
    }
  }

  // Create a new case
  async createCase(caseData: Case): Promise<string> {
    try {
      const result = await salesforceApi.post<{ id: string; success: boolean }>(
        "/services/data/v58.0/sobjects/Case",
        caseData,
      )

      if (!result.success) {
        throw new Error("Failed to create case")
      }

      return result.id
    } catch (error) {
      console.error("Error creating case:", error)
      throw error
    }
  }

  // Update a case
  async updateCase(id: string, caseData: Partial<Case>): Promise<void> {
    try {
      await salesforceApi.patch(`/services/data/v58.0/sobjects/Case/${id}`, caseData)
    } catch (error) {
      console.error(`Error updating case ${id}:`, error)
      throw error
    }
  }

  // Get orders
  async getOrders(limit = 10, offset = 0): Promise<Order[]> {
    try {
      const result = await salesforceApi.query<Order>(
        `SELECT Id, OrderNumber, Status, EffectiveDate, AccountId, TotalAmount 
         FROM Order 
         ORDER BY EffectiveDate DESC 
         LIMIT ${limit} OFFSET ${offset}`,
      )

      return result.records
    } catch (error) {
      console.error("Error fetching orders:", error)
      throw error
    }
  }

  // Get order by ID or order number
  async getOrder(idOrNumber: string): Promise<Order> {
    try {
      // Try to find by OrderNumber first
      const orderNumberResult = await salesforceApi.query<Order>(
        `SELECT Id, OrderNumber, Status, EffectiveDate, AccountId, TotalAmount 
         FROM Order 
         WHERE OrderNumber = '${idOrNumber}'`,
      )

      if (orderNumberResult.records.length > 0) {
        return orderNumberResult.records[0]
      }

      // If not found, try by ID
      return salesforceApi.get<Order>(`/services/data/v58.0/sobjects/Order/${idOrNumber}`)
    } catch (error) {
      console.error(`Error fetching order ${idOrNumber}:`, error)
      throw error
    }
  }

  // Get order items for an order
  async getOrderItems(orderId: string): Promise<OrderItem[]> {
    try {
      const result = await salesforceApi.query<OrderItem>(
        `SELECT Id, OrderId, Product2Id, Quantity, UnitPrice, TotalPrice 
         FROM OrderItem 
         WHERE OrderId = '${orderId}'`,
      )

      return result.records
    } catch (error) {
      console.error(`Error fetching order items for order ${orderId}:`, error)
      throw error
    }
  }

  // Get product details
  async getProduct(productId: string): Promise<Product> {
    try {
      return salesforceApi.get<Product>(`/services/data/v58.0/sobjects/Product2/${productId}`)
    } catch (error) {
      console.error(`Error fetching product ${productId}:`, error)
      throw error
    }
  }

  // Create a return request
  async createReturnRequest(
    orderId: string,
    reason: string,
    items: { productId: string; quantity: number }[],
  ): Promise<{ returnId: string; returnLabel: string }> {
    try {
      const data = {
        OrderId: orderId,
        Reason: reason,
        Items: items,
      }

      return salesforceApi.post<{ returnId: string; returnLabel: string }>(
        "/services/data/v58.0/actions/custom/return/createReturn",
        data,
      )
    } catch (error) {
      console.error("Error creating return request:", error)
      throw error
    }
  }

  // Get customer by ID or email
  async getCustomer(idOrEmail: string): Promise<Contact> {
    try {
      // Try to find by Email first
      if (idOrEmail.includes("@")) {
        const emailResult = await salesforceApi.query<Contact>(
          `SELECT Id, FirstName, LastName, Email, Phone, AccountId 
           FROM Contact 
           WHERE Email = '${idOrEmail}'`,
        )

        if (emailResult.records.length > 0) {
          return emailResult.records[0]
        }
      }

      // If not found or not an email, try by ID
      return salesforceApi.get<Contact>(`/services/data/v58.0/sobjects/Contact/${idOrEmail}`)
    } catch (error) {
      console.error(`Error fetching customer ${idOrEmail}:`, error)
      throw error
    }
  }

  // Update customer information
  async updateCustomer(id: string, data: Partial<Contact>): Promise<void> {
    try {
      await salesforceApi.patch(`/services/data/v58.0/sobjects/Contact/${id}`, data)
    } catch (error) {
      console.error(`Error updating customer ${id}:`, error)
      throw error
    }
  }
}

// Create and export a singleton instance
export const customerServiceApi = new CustomerServiceAPI()

