"use client"

import { useState } from "react"
import { X, ArrowLeft, Sparkles, FileText, Settings, Eye, Mic, Send } from "lucide-react"

interface LegalDraftingModalProps {
  onClose: () => void
}

const DOCUMENT_TEMPLATES = [
  { id: "affidavit", name: "Affidavit", description: "Sworn statement of facts for legal proceedings" },
  { id: "motion", name: "Motion to Dismiss", description: "Request to court to dismiss a case" },
  { id: "complaint", name: "Complaint", description: "Initial pleading to start a legal case" },
  { id: "demand-letter", name: "Demand Letter", description: "Formal request for payment or action" },
  { id: "contract", name: "Contract", description: "Legal agreement between parties" },
  { id: "retainer", name: "Retainer Agreement", description: "Legal services agreement" },
]

const CONVERSATION_STARTERS = [
  "Draft an affidavit for a witness in a criminal case",
  "Create a demand letter for unpaid services",
  "Prepare a motion to dismiss for lack of jurisdiction",
  "Draft a retainer agreement for legal services",
  "Create a complaint for breach of contract",
  "Prepare an employment contract",
]

export default function LegalDraftingModal({ onClose }: LegalDraftingModalProps) {
  const [activeTab, setActiveTab] = useState<"create" | "configure" | "preview">("create")
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [documentName, setDocumentName] = useState("Legal Document Drafting")
  const [description, setDescription] = useState("")
  const [instructions, setInstructions] = useState(`**Context**
You are an AI assistant designed to help Philippine Litigation Lawyers draft legal documents. You have access to templates for various legal documents commonly used in the Philippines, including pleadings, motions, briefs, and contracts.

**Instructions**
Conversations with your GPT can potentially include part or all of the instructions provided.`)
  const [chatMessage, setChatMessage] = useState("")

  const tabs = [
    { id: "create" as const, name: "Create", icon: Sparkles },
    { id: "configure" as const, name: "Configure", icon: Settings },
    { id: "preview" as const, name: "Preview", icon: Eye },
  ]

  return (
    <div className="fixed inset-0 bg-white dark:bg-[#0F0F12] z-100 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-[#1F1F23]">
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          <div>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Legal Document Drafting</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">● Draft</p>
          </div>
        </div>
        <button className="px-4 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
          Create
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-[#1F1F23] px-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? "border-gray-900 dark:border-gray-100 text-gray-900 dark:text-white"
                : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.name}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Configuration */}
        <div className="w-1/2 border-r border-gray-200 dark:border-[#1F1F23] overflow-y-auto">
          {activeTab === "create" && (
            <div className="p-6 space-y-6">
              {/* Template Selection */}
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Choose a Template</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">Select a legal document template to get started</p>

                <div className="grid grid-cols-1 gap-3 max-w-md mx-auto">
                  {DOCUMENT_TEMPLATES.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => {
                        setSelectedTemplate(template.id)
                        setDocumentName(template.name)
                        setDescription(template.description)
                      }}
                      className={`p-4 text-left border rounded-lg transition-colors ${
                        selectedTemplate === template.id
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                          : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">{template.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{template.description}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "configure" && (
            <div className="p-6 space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">Name</label>
                <input
                  type="text"
                  value={documentName}
                  onChange={(e) => setDocumentName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add a short description about what this GPT does"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              {/* Instructions */}
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">Instructions</label>
                <textarea
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  rows={8}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none font-mono text-sm"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Conversations with your GPT can potentially include part or all of the instructions provided.
                </p>
              </div>

              {/* Conversation Starters */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-gray-900 dark:text-white">
                    Conversation starters
                  </label>
                  <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-2">
                  {CONVERSATION_STARTERS.map((starter, index) => (
                    <div key={index} className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                      <p className="text-sm text-gray-900 dark:text-white">{starter}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Knowledge */}
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">Knowledge</label>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                  Conversations with your GPT can potentially reveal part or all of the files uploaded.
                </p>
                <button className="w-full p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-center hover:border-gray-400 dark:hover:border-gray-500 transition-colors">
                  <div className="text-gray-500 dark:text-gray-400">
                    <FileText className="w-6 h-6 mx-auto mb-2" />
                    <p className="text-sm">Upload files</p>
                  </div>
                </button>
              </div>
            </div>
          )}

          {activeTab === "preview" && (
            <div className="p-6">
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Preview Mode</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Test your legal document drafting assistant in the preview panel
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right Panel - Preview */}
        <div className="w-1/2 flex flex-col bg-gray-50 dark:bg-gray-900/50">
          {/* Preview Header */}
          <div className="p-6 text-center border-b border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-[#0F0F12]">
            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center mx-auto mb-3">
              <FileText className="w-6 h-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{documentName}</h3>
            {description && <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{description}</p>}
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            <div className="flex-1 p-6">
              {/* Conversation starters */}
              {activeTab === "create" && selectedTemplate && (
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Get started with:</h4>
                  {CONVERSATION_STARTERS.filter((starter) =>
                    starter
                      .toLowerCase()
                      .includes(DOCUMENT_TEMPLATES.find((t) => t.id === selectedTemplate)?.name.toLowerCase() || ""),
                  )
                    .slice(0, 3)
                    .map((starter, index) => (
                      <button
                        key={index}
                        className="w-full p-3 text-left bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <p className="text-sm text-gray-900 dark:text-white">{starter}</p>
                      </button>
                    ))}
                </div>
              )}
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-[#0F0F12]">
              <div className="flex items-center gap-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    placeholder="Ask anything"
                    className="w-full px-4 py-3 pr-20 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                      <Mic className="w-4 h-4 text-gray-400" />
                    </button>
                    <button
                      disabled={!chatMessage.trim()}
                      className="p-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
