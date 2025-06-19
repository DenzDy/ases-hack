"use client"

import { Calendar, Users, MapPin, FileText, Clock } from "lucide-react"
import type { Case } from "./types/case-types"

interface CasesListProps {
  cases: Case[]
  onCaseClick: (case_: Case) => void
}

const statusConfig = {
  Active: { class: "text-green-600 dark:text-green-400", bg: "bg-green-100 dark:bg-green-900/30" },
  Closed: { class: "text-gray-600 dark:text-gray-400", bg: "bg-gray-100 dark:bg-gray-800" },
  Urgent: { class: "text-red-600 dark:text-red-400", bg: "bg-red-100 dark:bg-red-900/30" },
  Pending: { class: "text-yellow-600 dark:text-yellow-400", bg: "bg-yellow-100 dark:bg-yellow-900/30" },
  "With Barangay": { class: "text-blue-600 dark:text-blue-400", bg: "bg-blue-100 dark:bg-blue-900/30" },
  "Prelim Investigation": { class: "text-purple-600 dark:text-purple-400", bg: "bg-purple-100 dark:bg-purple-900/30" },
  "For Trial": { class: "text-orange-600 dark:text-orange-400", bg: "bg-orange-100 dark:bg-orange-900/30" },
  Resolved: { class: "text-green-600 dark:text-green-400", bg: "bg-green-100 dark:bg-green-900/30" },
}

export default function CasesList({ cases, onCaseClick }: CasesListProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-PH", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const getDaysUntilHearing = (hearingDate: string) => {
    const today = new Date()
    const hearing = new Date(hearingDate)
    const diffTime = hearing.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "Tomorrow"
    if (diffDays < 0) return "Overdue"
    return `${diffDays} days`
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">All Cases ({cases.length})</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {cases.map((case_) => (
          <div
            key={case_.id}
            onClick={() => onCaseClick(case_)}
            className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23] hover:shadow-lg dark:hover:shadow-gray-900/20 transition-all cursor-pointer"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-1 line-clamp-1">{case_.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{case_.clientNames.join(", ")}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${statusConfig[case_.status].bg} ${statusConfig[case_.status].class}`}
              >
                {case_.status}
              </span>
            </div>

            {/* Case Details */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <FileText className="w-4 h-4" />
                <span>{case_.caseType}</span>
                <span>•</span>
                <span>{case_.docketNumber}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <MapPin className="w-4 h-4" />
                <span>{case_.court}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Users className="w-4 h-4" />
                <span>{case_.assignedLawyers.join(", ")}</span>
              </div>
            </div>

            {/* Next Hearing */}
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Next Hearing</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{formatDate(case_.nextHearing)}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-gray-500" />
                <span
                  className={`text-xs font-medium ${
                    getDaysUntilHearing(case_.nextHearing) === "Today" ||
                    getDaysUntilHearing(case_.nextHearing) === "Tomorrow" ||
                    getDaysUntilHearing(case_.nextHearing) === "Overdue"
                      ? "text-red-600 dark:text-red-400"
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                >
                  {getDaysUntilHearing(case_.nextHearing)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {cases.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No cases found</h3>
          <p className="text-gray-600 dark:text-gray-400">Try adjusting your filters or search terms.</p>
        </div>
      )}
    </div>
  )
}
