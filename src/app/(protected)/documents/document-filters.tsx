"use client"

import { useState, useEffect } from "react"
import { Search, Filter } from "lucide-react"
import type { Document } from "./types/document-types"

interface DocumentFiltersProps {
  documents: Document[]
  onFilter: (filteredDocuments: Document[]) => void
}

export default function DocumentFilters({ documents, onFilter }: DocumentFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("All")
  const [statusFilter, setStatusFilter] = useState("All")
  const [caseFilter, setCaseFilter] = useState("All")
  const [uploaderFilter, setUploaderFilter] = useState("All")
  const [dateRange, setDateRange] = useState("All")

  const applyFilters = () => {
    let filtered = documents

    if (searchTerm) {
      filtered = filtered.filter(
        (doc) =>
          doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doc.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doc.clients.some((client) => client.toLowerCase().includes(searchTerm.toLowerCase())) ||
          doc.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    if (typeFilter !== "All") {
      filtered = filtered.filter((doc) => doc.documentType === typeFilter)
    }

    if (statusFilter !== "All") {
      filtered = filtered.filter((doc) => doc.status === statusFilter)
    }

    if (caseFilter !== "All") {
      filtered = filtered.filter((doc) => doc.associatedCase === caseFilter)
    }

    if (uploaderFilter !== "All") {
      filtered = filtered.filter((doc) => doc.uploadedBy === uploaderFilter)
    }

    if (dateRange !== "All") {
      const now = new Date()
      const filterDate = new Date()

      switch (dateRange) {
        case "Today":
          filterDate.setHours(0, 0, 0, 0)
          break
        case "This Week":
          filterDate.setDate(now.getDate() - 7)
          break
        case "This Month":
          filterDate.setMonth(now.getMonth() - 1)
          break
        case "This Year":
          filterDate.setFullYear(now.getFullYear() - 1)
          break
      }

      if (dateRange !== "All") {
        filtered = filtered.filter((doc) => new Date(doc.dateUploaded) >= filterDate)
      }
    }

    onFilter(filtered)
  }

  useEffect(() => {
    applyFilters()
  }, [searchTerm, typeFilter, statusFilter, caseFilter, uploaderFilter, dateRange])

  const documentTypes = ["All", ...Array.from(new Set(documents.map((d) => d.documentType)))]
  const statuses = ["All", ...Array.from(new Set(documents.map((d) => d.status)))]
  const cases = ["All", ...Array.from(new Set(documents.map((d) => d.associatedCase).filter(Boolean)))]
  const uploaders = ["All", ...Array.from(new Set(documents.map((d) => d.uploadedBy)))]

  return (
    <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-4 border border-gray-200 dark:border-[#1F1F23] mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        <h3 className="font-medium text-gray-900 dark:text-white">Filters</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        {/* Search */}
        <div className="relative lg:col-span-2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search documents, clients, tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Document Type */}
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {documentTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        {/* Status */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        {/* Case */}
        <select
          value={caseFilter}
          onChange={(e) => setCaseFilter(e.target.value)}
          className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All Cases</option>
          {cases
            .filter((c) => c !== "All")
            .map((case_) => (
              <option key={case_} value={case_}>
                {case_}
              </option>
            ))}
        </select>

        {/* Date Range */}
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All Time</option>
          <option value="Today">Today</option>
          <option value="This Week">This Week</option>
          <option value="This Month">This Month</option>
          <option value="This Year">This Year</option>
        </select>
      </div>

      {/* Active Filters Display */}
      {(searchTerm ||
        typeFilter !== "All" ||
        statusFilter !== "All" ||
        caseFilter !== "All" ||
        dateRange !== "All") && (
        <div className="mt-4 flex items-center gap-2 flex-wrap">
          <span className="text-sm text-gray-600 dark:text-gray-400">Active filters:</span>
          {searchTerm && (
            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-xs rounded-full">
              Search: "{searchTerm}"
            </span>
          )}
          {typeFilter !== "All" && (
            <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 text-xs rounded-full">
              Type: {typeFilter}
            </span>
          )}
          {statusFilter !== "All" && (
            <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 text-xs rounded-full">
              Status: {statusFilter}
            </span>
          )}
          {caseFilter !== "All" && (
            <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 text-xs rounded-full">
              Case: {caseFilter}
            </span>
          )}
          {dateRange !== "All" && (
            <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 text-xs rounded-full">
              Date: {dateRange}
            </span>
          )}
          <button
            onClick={() => {
              setSearchTerm("")
              setTypeFilter("All")
              setStatusFilter("All")
              setCaseFilter("All")
              setUploaderFilter("All")
              setDateRange("All")
            }}
            className="text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white underline"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  )
}
