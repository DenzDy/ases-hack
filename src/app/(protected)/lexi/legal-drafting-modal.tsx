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
  const [chatHistory, setChatHistory] = useState<{ sender: 'user' | 'assistant'; text: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const tabs = [
    { id: "create" as const, name: "Create", icon: Sparkles },
    { id: "configure" as const, name: "Configure", icon: Settings },
    { id: "preview" as const, name: "Preview", icon: Eye },
  ]

  async function sendMessage() {
    if (!chatMessage.trim()) return;

    const newMessage = { sender: 'user', text: chatMessage };
    const updatedMessages = [...chatHistory, newMessage];
    setChatHistory(updatedMessages);
    setChatMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages,
          customPrompt: instructions,
        }),
      });

      const data = await response.json();

      if (response.ok && data.response) {
        setChatHistory([...updatedMessages, { sender: 'assistant', text: data.response }]);
      } else {
        setChatHistory([
          ...updatedMessages,
          { sender: 'assistant', text: `Error: ${data.details || 'Unknown error'}` },
        ]);
      }
    } catch (err) {
      setChatHistory([
        ...updatedMessages,
        { sender: 'assistant', text: 'Network error or server is unreachable.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-white dark:bg-[#0F0F12] z-100 flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-[#1F1F23]">
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
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

      <div className="flex-1 flex overflow-hidden">
        <div className="w-1/2 border-r border-gray-200 dark:border-[#1F1F23] overflow-y-auto">
          {activeTab === "create" && (
            <div className="p-6 space-y-6">
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
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">Name</label>
                <input
                  type="text"
                  value={documentName}
                  onChange={(e) => setDocumentName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">Instructions</label>
                <textarea
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  rows={8}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none font-mono text-sm"
                />
              </div>
            </div>
          )}
        </div>

        <div className="w-1/2 flex flex-col bg-gray-50 dark:bg-gray-900/50">
          <div className="p-6 text-center border-b border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-[#0F0F12]">
            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center mx-auto mb-3">
              <FileText className="w-6 h-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{documentName}</h3>
            {description && <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{description}</p>}
          </div>

          <div className="flex-1 flex flex-col">
            <div className="flex-1 p-6 space-y-4">
              {chatHistory.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg ${
                    msg.sender === 'user'
                      ? 'bg-blue-100 dark:bg-blue-900/20 text-right ml-auto max-w-[80%]'
                      : 'bg-gray-100 dark:bg-gray-800/70 text-left mr-auto max-w-[80%]'
                  }`}
                >
                  <p className="text-sm text-gray-900 dark:text-white whitespace-pre-wrap">{msg.text}</p>
                </div>
              ))}
              {isLoading && <div className="text-sm text-gray-400 italic">Thinking...</div>}
            </div>

            <div className="p-4 border-t border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-[#0F0F12]">
              <div className="flex items-center gap-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                    placeholder="Ask anything"
                    className="w-full px-4 py-3 pr-20 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                      <Mic className="w-4 h-4 text-gray-400" />
                    </button>
                    <button
                      disabled={!chatMessage.trim() || isLoading}
                      onClick={sendMessage}
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
