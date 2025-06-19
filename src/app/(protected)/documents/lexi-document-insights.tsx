import { AlertTriangle, Clock, FileText, TrendingUp } from "lucide-react"
import type { Document } from "./types/document-types"
import { Icon, LucideProps } from "lucide-react"
import { owl } from "@lucide/lab"

const OwlIcon = (props: LucideProps) => <Icon iconNode={owl} {...props} />

interface LexiDocumentInsightsProps {
  documents: Document[]
}

export default function LexiDocumentInsights({ documents }: LexiDocumentInsightsProps) {
  const draftDocuments = documents.filter((d) => d.status === "Draft").length
  const documentsWithRisks = documents.filter((d) => (d.riskAlerts?.length ?? 0) > 0).length
  const documentsNeedingNotarization = documents.filter((d) => d.tags.includes("needs-notarization")).length
  const recentUploads = documents.filter((d) => {
    const uploadDate = new Date(d.dateUploaded)
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    return uploadDate >= weekAgo
  }).length

  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-lg bg-gradient-to-b from-orange-200 via-pink-200 to-cyan-200 text-gray-800">
          <OwlIcon className="w-[22px] h-[22px] stroke-[2.5]" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Lexi AI Document Insights</h3>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <Stat icon={FileText} count={documents.length} label="Total" hint="Documents" color="text-blue-600" />
            <Stat icon={Clock} count={draftDocuments} label="Drafts" hint="Need review" color="text-yellow-600" />
            <Stat icon={AlertTriangle} count={documentsWithRisks} label="Risk Alerts" hint="Need attention" color="text-red-600" />
            <Stat icon={TrendingUp} count={recentUploads} label="This Week" hint="New uploads" color="text-green-600" />
          </div>

          {/* Recommendations */}
          <div className="bg-white dark:bg-gray-800/50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">AI Recommendations</h4>
            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <li>• {documentsNeedingNotarization} document{documentsNeedingNotarization !== 1 ? "s" : ""} require notarization before filing</li>
              <li>• Review draft affidavit for witness contact verification</li>
              <li>• Construction contract missing liquidated damages clause</li>
              <li>• Consider generating counter-affidavit for Santos case</li>
              <li>• Organize documents by case folders for better management</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

function Stat({
  icon: IconCmp,
  count,
  label,
  hint,
  color,
}: {
  icon: React.ElementType
  count: number
  label: string
  hint: string
  color: string
}) {
  return (
    <div className="flex items-center gap-2">
      <IconCmp className={`w-5 h-5 ${color} dark:${color.replace("text-", "text-")}`} />
      <div>
        <p className="text-sm font-medium text-gray-900 dark:text-white">{count} {label}</p>
        <p className="text-xs text-gray-600 dark:text-gray-400">{hint}</p>
      </div>
    </div>
  )
}
