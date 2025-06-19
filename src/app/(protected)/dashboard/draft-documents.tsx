import { cn } from "@/lib/utils"
import { FileText, Clock, ArrowRight } from "lucide-react"

interface Draft {
  id: string
  title: string
  type: string
  case: string
  lastModified: string
  status: "draft" | "review" | "final"
}

const DRAFTS: Draft[] = [
  {
    id: "1",
    title: "Motion to Dismiss",
    type: "Motion",
    case: "Smith vs. Johnson",
    lastModified: "2 hours ago",
    status: "draft",
  },
  {
    id: "2",
    title: "Settlement Agreement",
    type: "Agreement",
    case: "ABC Corp Contract",
    lastModified: "1 day ago",
    status: "review",
  },
  {
    id: "3",
    title: "Will and Testament",
    type: "Estate Document",
    case: "Williams Estate",
    lastModified: "3 days ago",
    status: "final",
  },
  {
    id: "4",
    title: "Divorce Petition",
    type: "Petition",
    case: "Davis Divorce",
    lastModified: "5 days ago",
    status: "draft",
  },
]

const statusConfig = {
  draft: { class: "text-yellow-600 dark:text-yellow-400", bg: "bg-yellow-100 dark:bg-yellow-900/30" },
  review: { class: "text-blue-600 dark:text-blue-400", bg: "bg-blue-100 dark:bg-blue-900/30" },
  final: { class: "text-green-600 dark:text-green-400", bg: "bg-green-100 dark:bg-green-900/30" },
}

export default function DraftDocuments() {
  return (
    <div className="space-y-3">
      {DRAFTS.map((draft) => (
        <div
          key={draft.id}
          className="p-3 rounded-lg border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-start gap-2">
              <FileText className="w-4 h-4 text-gray-600 dark:text-gray-400 mt-0.5" />
              <div>
                <h3 className="font-medium text-sm text-gray-900 dark:text-white">{draft.title}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {draft.type} • {draft.case}
                </p>
              </div>
            </div>
            <span
              className={cn(
                "px-2 py-1 rounded-full text-xs font-medium",
                statusConfig[draft.status].bg,
                statusConfig[draft.status].class,
              )}
            >
              {draft.status}
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-500">
            <Clock className="w-3 h-3" />
            Modified {draft.lastModified}
          </div>
        </div>
      ))}
      <button className="w-full mt-3 py-2 text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center justify-center gap-1">
        View All Drafts <ArrowRight className="w-3 h-3" />
      </button>
    </div>
  )
}
