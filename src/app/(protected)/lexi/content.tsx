"use client"

import { useState } from "react"
import MainChat from "./main-chat"
import LexiSidebar from "./lexi-sidebar"
import LegalDraftingModal from "./legal-drafting-modal"
import type { ChatSession, LexiMode, ChatMessage } from "./types/lexi-types"


import { Icon, LucideProps } from 'lucide-react';
import { owl } from '@lucide/lab';
const OwlIcon = (props: LucideProps) => <Icon iconNode={owl} {...props} />;

// Mock data for Lexi modes
const LEXI_MODES: LexiMode[] = [
    {
        id: "explain",
        name: "Explain the Law",
        description: "Get clear explanations of legal concepts and Philippine law",
        icon: "📘",
        systemPrompt: "You are a Philippine legal expert. Explain laws clearly and cite relevant statutes.",
        color: "blue",
    },
    {
        id: "draft",
        name: "Draft Documents",
        description: "Create legal documents with AI assistance",
        icon: "✍️",
        systemPrompt: "You are a legal document drafting assistant specializing in Philippine law.",
        color: "green",
    },
    {
        id: "review",
        name: "Review Documents",
        description: "Analyze and review uploaded legal documents",
        icon: "🧾",
        systemPrompt: "You are a document review specialist. Identify risks and suggest improvements.",
        color: "orange",
    },
    {
        id: "research",
        name: "Legal Research",
        description: "Research Philippine jurisprudence and legal precedents",
        icon: "🧠",
        systemPrompt: "You are a legal research assistant with access to Philippine legal databases.",
        color: "purple",
    },
]

// Mock chat sessions
const MOCK_SESSIONS: ChatSession[] = [
    {
        id: "1",
        title: "Contract Review - ABC Corp",
        mode: LEXI_MODES[2],
        messages: [
            {
                id: "1",
                role: "user",
                content: "Please review this construction contract for potential risks.",
                timestamp: "2024-01-15T10:30:00Z",
            },
            {
                id: "2",
                role: "assistant",
                content:
                    "I've reviewed your construction contract. Here are the key risk areas I identified:\n\n1. **Liquidated Damages Clause Missing** - The contract lacks specific penalties for delays\n2. **Force Majeure** - The current clause may not cover all scenarios\n3. **Payment Terms** - 30-day payment terms may affect cash flow\n\nWould you like me to suggest specific language for these clauses?",
                timestamp: "2024-01-15T10:31:00Z",
                metadata: {
                    suggestions: ["Add liquidated damages clause", "Strengthen force majeure", "Negotiate payment terms"],
                },
            },
        ],
        createdAt: "2024-01-15T10:30:00Z",
        updatedAt: "2024-01-15T10:31:00Z",
        contextType: "case",
        contextId: "2",
        contextName: "ABC Corp vs. XYZ Inc.",
    },
    {
        id: "2",
        title: "Affidavit Drafting - Santos Case",
        mode: LEXI_MODES[1],
        messages: [
            {
                id: "3",
                role: "user",
                content: "Help me draft an affidavit for a witness in a criminal case.",
                timestamp: "2024-01-14T14:20:00Z",
            },
            {
                id: "4",
                role: "assistant",
                content:
                    "I'll help you draft a witness affidavit. Let me gather some information:\n\n1. What is the witness's full name and address?\n2. What did the witness observe?\n3. When and where did the incident occur?\n4. What is the case number?\n\nOnce you provide these details, I'll create a properly formatted affidavit following Philippine legal standards.",
                timestamp: "2024-01-14T14:21:00Z",
            },
        ],
        createdAt: "2024-01-14T14:20:00Z",
        updatedAt: "2024-01-14T14:21:00Z",
        contextType: "case",
        contextId: "1",
        contextName: "People vs. Santos",
    },
]

export default function LexiPage() {
    const [currentSession, setCurrentSession] = useState<ChatSession | null>(MOCK_SESSIONS[0])
    const [sessions, setSessions] = useState<ChatSession[]>(MOCK_SESSIONS)
    const [showDraftingModal, setShowDraftingModal] = useState(false)
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

    const createNewSession = (mode: LexiMode) => {
        const newSession: ChatSession = {
            id: Date.now().toString(),
            title: `New ${mode.name} Session`,
            mode,
            messages: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }

        setSessions((prev) => [newSession, ...prev])
        setCurrentSession(newSession)
    }

    const updateSession = (sessionId: string, updates: Partial<ChatSession>) => {
        setSessions((prev) =>
            prev.map((session) =>
                session.id === sessionId ? { ...session, ...updates, updatedAt: new Date().toISOString() } : session,
            ),
        )

        if (currentSession?.id === sessionId) {
            setCurrentSession((prev) => (prev ? { ...prev, ...updates, updatedAt: new Date().toISOString() } : null))
        }
    }

    const addMessage = (message: Omit<ChatMessage, "id" | "timestamp">) => {
        if (!currentSession) return

        const newMessage: ChatMessage = {
            ...message,
            id: Date.now().toString(),
            timestamp: new Date().toISOString(),
        }

        const updatedMessages = [...currentSession.messages, newMessage]
        updateSession(currentSession.id, { messages: updatedMessages })

        // Simulate AI response for user messages
        if (message.role === "user") {
            setTimeout(() => {
                const aiResponse: ChatMessage = {
                    id: (Date.now() + 1).toString(),
                    role: "assistant",
                    content: generateAIResponse(message.content),
                    timestamp: new Date().toISOString(),
                }
                const finalMessages = [...updatedMessages, aiResponse]
                updateSession(currentSession.id, { messages: finalMessages })
            }, 1000)
        }
    }

    const generateAIResponse = (userMessage: string): string => {
        // Simple mock AI responses based on mode
        const responses = {
            explain: `Based on Philippine law, ${userMessage.toLowerCase()} involves several key legal principles:\n\n1. **Constitutional Basis** - Article III of the 1987 Constitution\n2. **Statutory Framework** - Relevant provisions under the Revised Penal Code\n3. **Jurisprudence** - Recent Supreme Court decisions\n\nWould you like me to elaborate on any specific aspect?`,
            draft: `I'll help you draft that document. Here's a structured approach:\n\n**Document Type**: ${userMessage.includes("contract") ? "Contract" : userMessage.includes("affidavit") ? "Affidavit" : "Legal Document"}\n\n**Key Elements to Include**:\n- Proper heading and case information\n- Statement of facts\n- Legal basis\n- Prayer/Relief sought\n\nShall I proceed with the full draft?`,
            review: `I've analyzed your document and found the following:\n\n**Strengths**:\n✅ Proper legal format\n✅ Clear statement of facts\n\n**Areas for Improvement**:\n⚠️ Consider strengthening the legal basis\n⚠️ Add more specific relief prayers\n\n**Risk Assessment**: Medium - Some clauses may need revision\n\nWould you like detailed suggestions for each section?`,
            research: `Here's what I found in Philippine jurisprudence:\n\n**Relevant Cases**:\n1. **People v. Santos** (G.R. No. 123456) - Established precedent\n2. **ABC Corp v. XYZ Inc.** (G.R. No. 789012) - Recent ruling\n\n**Legal Doctrine**: The Supreme Court consistently holds that...\n\n**Statutory Basis**: Article 1159 of the Civil Code\n\nWould you like me to find more specific cases?`,
        }

        return (
            responses[currentSession?.mode.id as keyof typeof responses] ||
            "I understand your question. Let me provide a comprehensive response based on Philippine legal principles."
        )
    }

    return (
        <>
            <div className="flex h-[calc(100vh-8rem)] gap-6">
                {/* Sidebar */}
                <LexiSidebar
                    sessions={sessions}
                    currentSession={currentSession}
                    onSessionSelect={setCurrentSession}
                    onNewSession={() => createNewSession(LEXI_MODES[0])}
                    collapsed={sidebarCollapsed}
                    onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
                />

                {/* Main Content */}
                <div className="flex-1 flex flex-col min-w-0">
                    <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23] mb-4">
                        <div className="flex items-start justify-between flex-wrap gap-4 w-full">

                            {/* LEFT SIDE — Owl + Title + Trust badges */}
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-4">
                                    {/* Owl Icon */}
                                    <div className="p-3 rounded-sm bg-gradient-to-br from-orange-300 via-pink-300 to-cyan-300 shadow-sm">
                                        <OwlIcon className="h-5 w-5 stroke-[2.4] text-gray-900" />
                                    </div>

                                    {/* Lexi Info */}
                                    <div>
                                        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Lexi AI</h1>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Your Philippine Legal Assistant</p>
                                    </div>
                                </div>

                                {/* Trust Badges */}
                                <div className="flex flex-wrap gap-2 mt-1">
                                    {[
                                        { label: '4-Phase Reasoning', color: 'from-purple-100 to-purple-50' },
                                        { label: 'Law-Grade Citations', color: 'from-blue-100 to-blue-50' },
                                        { label: 'PH-Specific Compliance', color: 'from-green-100 to-green-50' },
                                    ].map((badge) => (
                                        <span
                                            key={badge.label}
                                            className={`px-3 py-1 text-xs font-medium rounded-full
                        bg-gradient-to-r ${badge.color} 
                        border border-purple-200 dark:border-purple-600
                        text-gray-800 dark:text-white`}
                                        >
                                            {badge.label}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* RIGHT SIDE — Draft Button */}
                            <div className="self-start">
                                <button
                                    onClick={() => setShowDraftingModal(true)}
                                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white 
                   font-medium rounded-lg transition-colors whitespace-nowrap"
                                >
                                    Draft Document
                                </button>
                            </div>
                        </div>
                    </div>

                    <MainChat />
                </div>
            </div>

            {/* Modals */}
            {showDraftingModal && (
                <LegalDraftingModal
                    onClose={() => setShowDraftingModal(false)}
                    onDraft={(content) => {
                        addMessage({ role: "user", content: `Please help me draft: ${content}` })
                        setShowDraftingModal(false)
                    }}
                />
            )}
        </>
    )
}
