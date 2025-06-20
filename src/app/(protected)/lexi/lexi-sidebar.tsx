"use client"

import { useState } from "react"
import { Plus, MessageSquare, ChevronLeft, ChevronRight, Search, Calendar, FileText, Users } from "lucide-react"
import type { ChatSession } from "./types/lexi-types"

interface LexiSidebarProps {
  sessions: ChatSession[]
  currentSession: ChatSession | null
  onSessionSelect: (session: ChatSession) => void
  onNewSession: () => void
  collapsed: boolean
  onToggleCollapse: () => void
}

export default function LexiSidebar({
  sessions,
  currentSession,
  onSessionSelect,
  onNewSession,
  collapsed,
  onToggleCollapse,
}: LexiSidebarProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredSessions = sessions.filter((session) => session.title.toLowerCase().includes(searchTerm.toLowerCase()))

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = now.getTime() - date.getTime()
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "Yesterday"
    if (diffDays < 7) return `${diffDays} days ago`
    return date.toLocaleDateString("en-PH", { month: "short", day: "numeric" })
  }

  const getContextIcon = (contextType?: string) => {
    switch (contextType) {
      case "case":
        return <FileText className="w-3 h-3" />
      case "document":
        return <FileText className="w-3 h-3" />
      case "client":
        return <Users className="w-3 h-3" />
      default:
        return <MessageSquare className="w-3 h-3" />
    }
  }

  if (collapsed) {
    return (
      <div className="w-16 bg-white dark:bg-[#0F0F12] rounded-xl border border-gray-200 dark:border-[#1F1F23] p-2 flex flex-col">
        <button
          onClick={onToggleCollapse}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors mb-2"
        >
          <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
        <button
          onClick={onNewSession}
          className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors mb-4"
        >
          <Plus className="w-5 h-5" />
        </button>
        <div className="space-y-2">
          {sessions.slice(0, 5).map((session) => (
            <button
              key={session.id}
              onClick={() => onSessionSelect(session)}
              className={`w-full p-2 rounded-lg transition-colors ${
                currentSession?.id === session.id
                  ? "bg-blue-100 dark:bg-blue-900/30"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <span className="text-lg">{session.mode.icon}</span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="w-80 bg-white dark:bg-[#0F0F12] rounded-xl border border-gray-200 dark:border-[#1F1F23] flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-[#1F1F23]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-900 dark:text-white">Chat History</h2>
          <button
            onClick={onToggleCollapse}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        <button
          onClick={onNewSession}
          className="w-full flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Chat
        </button>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-gray-200 dark:border-[#1F1F23]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Sessions List */}
      <div className="flex-1 overflow-y-auto p-2">
        <div className="space-y-1">
          {filteredSessions.map((session) => (
            <button
              key={session.id}
              onClick={() => onSessionSelect(session)}
              className={`w-full p-3 rounded-lg text-left transition-colors ${
                currentSession?.id === session.id
                  ? "bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800"
                  : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  <span className="text-lg">{session.mode.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 dark:text-white text-sm truncate">{session.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-600 dark:text-gray-400">{session.mode.name}</span>
                    {session.contextType && (
                      <>
                        <span className="text-xs text-gray-400">•</span>
                        <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                          {getContextIcon(session.contextType)}
                          <span className="truncate">{session.contextName}</span>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Calendar className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-500 dark:text-gray-500">{formatDate(session.updatedAt)}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500 dark:text-gray-500">
                      {session.messages.length} message{session.messages.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {filteredSessions.length === 0 && (
          <div className="text-center py-8">
            <MessageSquare className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {searchTerm ? "No conversations found" : "No conversations yet"}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
