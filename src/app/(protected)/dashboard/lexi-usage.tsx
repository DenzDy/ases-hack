import { TrendingUp, Clock } from "lucide-react"

const USAGE_DATA = {
  queriesThisMonth: 247,
  documentsGenerated: 18,
  timesSaved: "12.5 hours",
  topFeature: "Contract Analysis",
}

export default function LexiUsage() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="text-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <div className="text-lg font-bold text-gray-900 dark:text-white">{USAGE_DATA.queriesThisMonth}</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Queries</div>
        </div>
        <div className="text-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <div className="text-lg font-bold text-gray-900 dark:text-white">{USAGE_DATA.documentsGenerated}</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Documents</div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-gray-600 dark:text-gray-400">Time Saved</span>
          </div>
          <span className="text-gray-900 dark:text-white font-medium">{USAGE_DATA.timesSaved}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
            <span className="text-gray-600 dark:text-gray-400">Most Used</span>
          </div>
          <span className="text-gray-900 dark:text-white font-medium">{USAGE_DATA.topFeature}</span>
        </div>
      </div>

      <button className="w-full py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-colors">
        Open Lexi.ai
      </button>
    </div>
  )
}
