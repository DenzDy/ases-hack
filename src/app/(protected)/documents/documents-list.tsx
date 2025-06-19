"use client"

import { useState } from "react"
import { FileText, Download, Eye, MoreHorizontal, Calendar, User, AlertTriangle } from "lucide-react"
import type { Document } from "./types/document-types"

interface DocumentsListProps {
  documents: Document[]
  viewMode: "list" | "grid" | "folders"
  selectedDocuments: string[]
  onSelectionChange: (selected: string[]) => void
}

const statusConfig = {
  Draft: { class: "text-yellow-600 dark:text-yellow-400", bg: "bg-yellow-100 dark:bg-yellow-900/30" },
  Reviewed: { class: "text-blue-600 dark:text-blue-400", bg: "bg-blue-100 dark:bg-blue-900/30" },
  Final: { class: "text-green-600 dark:text-green-400", bg: "bg-green-100 dark:bg-green-900/30" },
  Filed: { class: "text-purple-600 dark:text-purple-400", bg: "bg-purple-100 dark:bg-purple-900/30" },
  "Pending Review": { class: "text-orange-600 dark:text-orange-400", bg: "bg-orange-100 dark:bg-orange-900/30" },
}

export default function DocumentsList({
  documents,
  viewMode,
  selectedDocuments,
  onSelectionChange,
}: DocumentsListProps) {
  const [sortBy, setSortBy] = useState<"title" | "date" | "type" | "status">("date")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-PH", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const handleSelectDocument = (docId: string) => {
    if (selectedDocuments.includes(docId)) {
      onSelectionChange(selectedDocuments.filter((id) => id !== docId))
    } else {
      onSelectionChange([...selectedDocuments, docId])
    }
  }

  const handleSelectAll = () => {
    if (selectedDocuments.length === documents.length) {
      onSelectionChange([])
    } else {
      onSelectionChange(documents.map((d) => d.id))
    }
  }

  const sortedDocuments = [...documents].sort((a, b) => {
    let aValue: any, bValue: any

    switch (sortBy) {
      case "title":
        aValue = a.title.toLowerCase()
        bValue = b.title.toLowerCase()
        break
      case "date":
        aValue = new Date(a.dateUploaded)
        bValue = new Date(b.dateUploaded)
        break
      case "type":
        aValue = a.documentType
        bValue = b.documentType
        break
      case "status":
        aValue = a.status
        bValue = b.status
        break
      default:
        return 0
    }

    if (sortOrder === "asc") {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
    }
  })

  if (viewMode === "grid") {
    return (
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Documents ({documents.length})</h3>
          <div className="flex items-center gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-1 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="date">Sort by Date</option>
              <option value="title">Sort by Title</option>
              <option value="type">Sort by Type</option>
              <option value="status">Sort by Status</option>
            </select>
          </div>
        </div>

        {/* Grid View */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedDocuments.map((doc) => (
            <div
              key={doc.id}
              className="bg-white dark:bg-[#0F0F12] rounded-xl p-4 border border-gray-200 dark:border-[#1F1F23] hover:shadow-lg dark:hover:shadow-gray-900/20 transition-all"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedDocuments.includes(doc.id)}
                    onChange={() => handleSelectDocument(doc.id)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                  <MoreHorizontal className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </button>
              </div>

              {/* Content */}
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white line-clamp-2 mb-1">{doc.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{doc.documentType}</p>
                </div>

                {/* Status and Alerts */}
                <div className="flex items-center justify-between">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig[doc.status].bg} ${statusConfig[doc.status].class}`}
                  >
                    {doc.status}
                  </span>
                  {doc.riskAlerts && doc.riskAlerts.length > 0 && (
                    <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
                  )}
                </div>

                {/* Meta Info */}
                <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(doc.dateUploaded)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    <span>{doc.uploadedBy}</span>
                  </div>
                  {doc.associatedCase && (
                    <div className="flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      <span className="truncate">{doc.associatedCase}</span>
                    </div>
                  )}
                </div>

                {/* Tags */}
                {doc.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {doc.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-400 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    {doc.tags.length > 3 && (
                      <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-400 rounded-full">
                        +{doc.tags.length - 3}
                      </span>
                    )}
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-2 pt-2 border-t border-gray-100 dark:border-gray-800">
                  <button className="flex-1 flex items-center justify-center gap-1 py-2 text-xs text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                    <Eye className="w-3 h-3" />
                    View
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-1 py-2 text-xs text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-colors">
                    <Download className="w-3 h-3" />
                    Download
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // List View
  return (
    <div className="bg-white dark:bg-[#0F0F12] rounded-xl border border-gray-200 dark:border-[#1F1F23] overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-[#1F1F23]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={selectedDocuments.length === documents.length && documents.length > 0}
              onChange={handleSelectAll}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Documents ({documents.length})</h3>
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-1 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="date">Sort by Date</option>
            <option value="title">Sort by Title</option>
            <option value="type">Sort by Type</option>
            <option value="status">Sort by Status</option>
          </select>
        </div>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 text-sm font-medium text-gray-600 dark:text-gray-400">
        <div className="col-span-1"></div>
        <div className="col-span-4">Document</div>
        <div className="col-span-2">Type</div>
        <div className="col-span-2">Status</div>
        <div className="col-span-2">Date</div>
        <div className="col-span-1">Actions</div>
      </div>

      {/* Document Rows */}
      <div className="divide-y divide-gray-200 dark:divide-gray-800">
        {sortedDocuments.map((doc) => (
          <div
            key={doc.id}
            className="grid grid-cols-12 gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
          >
            <div className="col-span-1 flex items-center">
              <input
                type="checkbox"
                checked={selectedDocuments.includes(doc.id)}
                onChange={() => handleSelectDocument(doc.id)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </div>

            <div className="col-span-4 flex items-center gap-3">
              <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
              <div className="min-w-0">
                <h4 className="font-medium text-gray-900 dark:text-white truncate">{doc.title}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-sm text-gray-600 dark:text-gray-400">{doc.clients.join(", ")}</p>
                  {doc.riskAlerts && doc.riskAlerts.length > 0 && (
                    <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
                  )}
                </div>
                {doc.associatedCase && (
                  <p className="text-xs text-gray-500 dark:text-gray-500 truncate">{doc.associatedCase}</p>
                )}
              </div>
            </div>

            <div className="col-span-2 flex items-center">
              <span className="text-sm text-gray-900 dark:text-white">{doc.documentType}</span>
            </div>

            <div className="col-span-2 flex items-center">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig[doc.status].bg} ${statusConfig[doc.status].class}`}
              >
                {doc.status}
              </span>
            </div>

            <div className="col-span-2 flex items-center">
              <div>
                <p className="text-sm text-gray-900 dark:text-white">{formatDate(doc.dateUploaded)}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">{doc.uploadedBy}</p>
              </div>
            </div>

            <div className="col-span-1 flex items-center">
              <div className="flex items-center gap-1">
                <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors">
                  <Eye className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </button>
                <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors">
                  <Download className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </button>
                <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors">
                  <MoreHorizontal className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {documents.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No documents found</h3>
          <p className="text-gray-600 dark:text-gray-400">Try adjusting your filters or upload some documents.</p>
        </div>
      )}
    </div>
  )
}
