import { salesforceApi } from "./api"

// Types for Agent Builder
export interface AgentConfig {
  id?: string
  name: string
  description: string
  instructions: string
  type: string
  capabilities: string[]
}

export interface CustomAction {
  id?: string
  name: string
  description: string
  inputParameters: {
    name: string
    type: string
    required: boolean
  }[]
  outputParameters: {
    name: string
    type: string
  }[]
  apiName: string
  implementation: string
}

export interface KnowledgeSource {
  id?: string
  name: string
  description: string
  type: string
  sourceUrl: string
  lastSynced: string
}

// Agent Builder API client
export class AgentBuilderAPI {
  // Get all agents
  async getAgents(): Promise<AgentConfig[]> {
    try {
      const result = await salesforceApi.query<AgentConfig>(
        "SELECT Id, Name, Description__c, Instructions__c, Type__c, Capabilities__c FROM Agent__c",
      )

      return result.records.map((record) => ({
        id: record.Id,
        name: record.Name,
        description: record.Description__c,
        instructions: record.Instructions__c,
        type: record.Type__c,
        capabilities: record.Capabilities__c ? record.Capabilities__c.split(",") : [],
      }))
    } catch (error) {
      console.error("Error fetching agents:", error)
      throw error
    }
  }

  // Get agent by ID
  async getAgent(id: string): Promise<AgentConfig> {
    try {
      const result = await salesforceApi.get<AgentConfig>(`/services/data/v58.0/sobjects/Agent__c/${id}`)

      return {
        id: result.Id,
        name: result.Name,
        description: result.Description__c,
        instructions: result.Instructions__c,
        type: result.Type__c,
        capabilities: result.Capabilities__c ? result.Capabilities__c.split(",") : [],
      }
    } catch (error) {
      console.error(`Error fetching agent ${id}:`, error)
      throw error
    }
  }

  // Create a new agent
  async createAgent(agent: AgentConfig): Promise<string> {
    try {
      const data = {
        Name: agent.name,
        Description__c: agent.description,
        Instructions__c: agent.instructions,
        Type__c: agent.type,
        Capabilities__c: agent.capabilities.join(","),
      }

      const result = await salesforceApi.post<{ id: string; success: boolean }>(
        "/services/data/v58.0/sobjects/Agent__c",
        data,
      )

      if (!result.success) {
        throw new Error("Failed to create agent")
      }

      return result.id
    } catch (error) {
      console.error("Error creating agent:", error)
      throw error
    }
  }

  // Update an existing agent
  async updateAgent(agent: AgentConfig): Promise<void> {
    if (!agent.id) {
      throw new Error("Agent ID is required for update")
    }

    try {
      const data = {
        Name: agent.name,
        Description__c: agent.description,
        Instructions__c: agent.instructions,
        Type__c: agent.type,
        Capabilities__c: agent.capabilities.join(","),
      }

      await salesforceApi.patch(`/services/data/v58.0/sobjects/Agent__c/${agent.id}`, data)
    } catch (error) {
      console.error(`Error updating agent ${agent.id}:`, error)
      throw error
    }
  }

  // Delete an agent
  async deleteAgent(id: string): Promise<void> {
    try {
      await salesforceApi.delete(`/services/data/v58.0/sobjects/Agent__c/${id}`)
    } catch (error) {
      console.error(`Error deleting agent ${id}:`, error)
      throw error
    }
  }

  // Get custom actions for an agent
  async getCustomActions(agentId: string): Promise<CustomAction[]> {
    try {
      const result = await salesforceApi.query<CustomAction>(
        `SELECT Id, Name, Description__c, InputParameters__c, OutputParameters__c, ApiName__c, Implementation__c 
         FROM CustomAction__c 
         WHERE Agent__c = '${agentId}'`,
      )

      return result.records.map((record) => ({
        id: record.Id,
        name: record.Name,
        description: record.Description__c,
        inputParameters: JSON.parse(record.InputParameters__c || "[]"),
        outputParameters: JSON.parse(record.OutputParameters__c || "[]"),
        apiName: record.ApiName__c,
        implementation: record.Implementation__c,
      }))
    } catch (error) {
      console.error(`Error fetching custom actions for agent ${agentId}:`, error)
      throw error
    }
  }

  // Create a custom action
  async createCustomAction(agentId: string, action: CustomAction): Promise<string> {
    try {
      const data = {
        Name: action.name,
        Description__c: action.description,
        InputParameters__c: JSON.stringify(action.inputParameters),
        OutputParameters__c: JSON.stringify(action.outputParameters),
        ApiName__c: action.apiName,
        Implementation__c: action.implementation,
        Agent__c: agentId,
      }

      const result = await salesforceApi.post<{ id: string; success: boolean }>(
        "/services/data/v58.0/sobjects/CustomAction__c",
        data,
      )

      if (!result.success) {
        throw new Error("Failed to create custom action")
      }

      return result.id
    } catch (error) {
      console.error("Error creating custom action:", error)
      throw error
    }
  }

  // Get knowledge sources for an agent
  async getKnowledgeSources(agentId: string): Promise<KnowledgeSource[]> {
    try {
      const result = await salesforceApi.query<KnowledgeSource>(
        `SELECT Id, Name, Description__c, Type__c, SourceUrl__c, LastSynced__c 
         FROM KnowledgeSource__c 
         WHERE Agent__c = '${agentId}'`,
      )

      return result.records.map((record) => ({
        id: record.Id,
        name: record.Name,
        description: record.Description__c,
        type: record.Type__c,
        sourceUrl: record.SourceUrl__c,
        lastSynced: record.LastSynced__c,
      }))
    } catch (error) {
      console.error(`Error fetching knowledge sources for agent ${agentId}:`, error)
      throw error
    }
  }

  // Connect a knowledge source to an agent
  async connectKnowledgeSource(agentId: string, source: KnowledgeSource): Promise<string> {
    try {
      const data = {
        Name: source.name,
        Description__c: source.description,
        Type__c: source.type,
        SourceUrl__c: source.sourceUrl,
        LastSynced__c: new Date().toISOString(),
        Agent__c: agentId,
      }

      const result = await salesforceApi.post<{ id: string; success: boolean }>(
        "/services/data/v58.0/sobjects/KnowledgeSource__c",
        data,
      )

      if (!result.success) {
        throw new Error("Failed to connect knowledge source")
      }

      return result.id
    } catch (error) {
      console.error("Error connecting knowledge source:", error)
      throw error
    }
  }

  // Deploy an agent
  async deployAgent(agentId: string): Promise<{ deploymentId: string; status: string }> {
    try {
      const result = await salesforceApi.post<{ deploymentId: string; status: string }>(
        `/services/data/v58.0/sobjects/Agent__c/${agentId}/deploy`,
        {},
      )

      return result
    } catch (error) {
      console.error(`Error deploying agent ${agentId}:`, error)
      throw error
    }
  }

  // Test an agent with a message
  async testAgent(agentId: string, message: string): Promise<{ response: string }> {
    try {
      const result = await salesforceApi.post<{ response: string }>(
        `/services/data/v58.0/sobjects/Agent__c/${agentId}/test`,
        { message },
      )

      return result
    } catch (error) {
      console.error(`Error testing agent ${agentId}:`, error)
      throw error
    }
  }
}

// Create and export a singleton instance
export const agentBuilderApi = new AgentBuilderAPI()

