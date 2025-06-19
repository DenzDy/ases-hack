"use client"

import { useState } from "react"
import { Search, Filter } from "lucide-react"
import type { Case } from "./types/case-types"

interface CaseFiltersProps {
  cases: Case[]
  onFilter: (filteredCases: Case[]) => void
}

export default function CaseFilters({ cases, onFilter }: CaseFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [typeFilter, setTypeFilter] = useState("All")
  const [lawyerFilter, setLawyerFilter] = useState("All")

  const applyFilters = () => {
    let filtered = cases

    if (searchTerm) {
      filtered = filtered.filter(
        (case_) =>
          case_.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          case_.clientNames.some((client) => client.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    if (statusFilter !== "All") {
      filtered = filtered.filter((case_) => case_.status === statusFilter)
    }

    if (typeFilter !== "All") {
      filtered = filtered.filter((case_) => case_.caseType === typeFilter)
    }

    if (lawyerFilter !== "All") {
      filtered = filtered.filter((case_) => case_.assignedLawyers.includes(lawyerFilter))
    }

    onFilter(filtered)
  }

  // Apply filters whenever any filter changes
  useState(() => {
    applyFilters()
  })

  const statuses = ["All", ...Array.from(new Set(cases.map((c) => c.status)))]
  const types = ["All", ...Array.from(new Set(cases.map((c) => c.caseType)))]
  const lawyers = ["All", ...Array.from(new Set(cases.flatMap((c) => c.assignedLawyers)))]

  return (
    <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-4 border border-gray-200 dark:border-[#1F1F23]">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        <h3 className="font-medium text-gray-900 dark:text-white">Filters</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search cases or clients..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              applyFilters()
            }}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value)
            applyFilters()
          }}
          className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        {/* Type Filter */}
        <select
          value={typeFilter}
          onChange={(e) => {
            setTypeFilter(e.target.value)
            applyFilters()
          }}
          className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        {/* Lawyer Filter */}
        <select
          value={lawyerFilter}
          onChange={(e) => {
            setLawyerFilter(e.target.value)
            applyFilters()
          }}
          className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {lawyers.map((lawyer) => (
            <option key={lawyer} value={lawyer}>
              {lawyer}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
