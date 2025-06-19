import { Users, AlertCircle, CheckCircle, ArrowRight } from "lucide-react"
import type { Case } from "./types/case-types"

interface LawyerLoadBalanceProps {
  cases: Case[]
}

export default function LawyerLoadBalance({ cases }: LawyerLoadBalanceProps) {
  // Calculate lawyer workload
  const lawyerWorkload = cases.reduce(
    (acc, case_) => {
      case_.assignedLawyers.forEach((lawyer) => {
        if (!acc[lawyer]) {
          acc[lawyer] = { total: 0, active: 0, urgent: 0 }
        }
        acc[lawyer].total++
        if (case_.status === "Active") acc[lawyer].active++
        if (case_.status === "Urgent") acc[lawyer].urgent++
      })
      return acc
    },
    {} as Record<string, { total: number; active: number; urgent: number }>,
  )

  const lawyers = Object.entries(lawyerWorkload).map(([name, workload]) => ({
    name,
    ...workload,
    status: workload.total > 8 ? "overloaded" : workload.total < 3 ? "underutilized" : "balanced",
  }))

  return (
    <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          Lawyer Load Balance
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {lawyers.map((lawyer) => (
          <div
            key={lawyer.name}
            className="p-4 rounded-lg border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">{lawyer.name}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{lawyer.total} total cases</p>
              </div>
              <div className="flex items-center gap-1">
                {lawyer.status === "overloaded" && <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />}
                {lawyer.status === "balanced" && <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />}
                {lawyer.status === "underutilized" && (
                  <AlertCircle className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                )}
              </div>
            </div>

            <div className="space-y-2 mb-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Active:</span>
                <span className="text-gray-900 dark:text-white">{lawyer.active}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Urgent:</span>
                <span className="text-red-600 dark:text-red-400">{lawyer.urgent}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  lawyer.status === "overloaded"
                    ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                    : lawyer.status === "underutilized"
                      ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400"
                      : "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                }`}
              >
                {lawyer.status}
              </span>
              <button className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1">
                Reassign <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
