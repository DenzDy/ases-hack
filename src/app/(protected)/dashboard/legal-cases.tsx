import { cn } from "@/lib/utils"
import { Clock, Users, ArrowRight } from "lucide-react"

interface LegalCase {
  id: string
  title: string
  client: string
  type: string
  status: "active" | "urgent" | "pending"
  daysOpen: number
}

const CASES: LegalCase[] = [
  {
    id: "1",
    title: "Santos vs. Barangay San Juan",
    client: "Maria Santos",
    type: "Administrative Case",
    status: "urgent",
    daysOpen: 32,
  },
  {
    id: "2",
    title: "Lopez vs. Reyes (Land Dispute)",
    client: "Carlos Lopez",
    type: "Property Dispute",
    status: "active",
    daysOpen: 58,
  },
  {
    id: "3",
    title: "Estate of Jose Dela Cruz",
    client: "Ana Dela Cruz",
    type: "Special Proceedings (Estate)",
    status: "pending",
    daysOpen: 17,
  },
  {
    id: "4",
    title: "People vs. Alvarez (Estafa)",
    client: "Public Prosecution",
    type: "Criminal Case",
    status: "active",
    daysOpen: 74,
  },
]

const statusConfig = {
  urgent: { class: "text-red-600 dark:text-red-400", bg: "bg-red-100 dark:bg-red-900/30" },
  active: { class: "text-green-600 dark:text-green-400", bg: "bg-green-100 dark:bg-green-900/30" },
  pending: { class: "text-yellow-600 dark:text-yellow-400", bg: "bg-yellow-100 dark:bg-yellow-900/30" },
}

export default function LegalCases() {
  return (
    <div className="space-y-3">
      {CASES.map((case_) => (
        <div
          key={case_.id}
          className="p-3 rounded-lg border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
        >
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-medium text-sm text-gray-900 dark:text-white line-clamp-1">{case_.title}</h3>
            <span
              className={cn(
                "px-2 py-1 rounded-full text-xs font-medium",
                statusConfig[case_.status].bg,
                statusConfig[case_.status].class,
              )}
            >
              {case_.status}
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {case_.client}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {case_.daysOpen} days
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{case_.type}</p>
        </div>
      ))}
      <button className="w-full mt-3 py-2 text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center justify-center gap-1">
        View All Cases <ArrowRight className="w-3 h-3" />
      </button>
    </div>
  )
}
