export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: string
  type?: "text" | "document" | "template" | "citation"
  metadata?: {
    documentId?: string
    templateType?: string
    citations?: Citation[]
    suggestions?: string[]
  }
}

export interface ChatSession {
  id: string
  title: string
  mode: LexiMode
  messages: ChatMessage[]
  createdAt: string
  updatedAt: string
  contextType?: "case" | "document" | "client"
  contextId?: string
  contextName?: string
}

export interface LexiMode {
  id: string
  name: string
  description: string
  icon: string
  systemPrompt: string
  color: string
}

export interface DocumentTemplate {
  id: string
  name: string
  category: string
  description: string
  fields: TemplateField[]
  content: string
  tags: string[]
}

export interface TemplateField {
  id: string
  name: string
  label: string
  type: "text" | "textarea" | "date" | "select" | "number"
  required: boolean
  placeholder?: string
  options?: string[]
}

export interface Citation {
  id: string
  title: string
  source: string
  year: string
  relevance: number
  excerpt: string
  url?: string
}

export interface QuickAction {
  id: string
  name: string
  description: string
  icon: string
  prompt: string
}
