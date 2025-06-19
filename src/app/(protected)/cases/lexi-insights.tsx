import { AlertTriangle, CheckCircle, Clock } from "lucide-react"
import type { Case } from "./types/case-types"

import { Icon, LucideProps } from 'lucide-react';
import { owl } from '@lucide/lab';

export const OwlIcon = (props: LucideProps) => (
  <Icon iconNode={owl} {...props} />
);

interface LexiInsightsProps {
  cases: Case[]
}

export default function LexiInsights({ cases }: LexiInsightsProps) {
  const activeCases = cases.filter((c) => c.status === "Active").length
  const urgentCases = cases.filter((c) => c.status === "Urgent").length
  const upcomingHearings = cases.filter((c) => {
    const hearingDate = new Date(c.nextHearing)
    const today = new Date()
    const diffTime = hearingDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 7 && diffDays >= 0
  }).length

  return (
    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6 border border-blue-200">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-lg bg-gradient-to-b from-orange-200 via-pink-200 to-cyan-200 text-gray-800">
          <OwlIcon className="w-[22px] h-[22px] stroke-[2.5]" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Lexi AI Insights</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{activeCases} Active Cases</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Progressing well</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{urgentCases} Urgent Cases</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Need immediate attention</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{upcomingHearings} This Week</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Upcoming hearings</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800/50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Recommendations</h4>
            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <li>• Review urgent cases: ABC Corp vs. XYZ Inc. needs immediate attention</li>
              <li>• 3 hearings scheduled this week - prepare case files</li>
              <li>• Consider reassigning cases to balance lawyer workload</li>
              <li>• Update case notes for better tracking</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
