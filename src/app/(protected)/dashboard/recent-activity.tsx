import React from "react"
import { cn } from "@/lib/utils"
import { FileText, Calendar, DollarSign, Users } from "lucide-react"

interface Activity {
  id: string
  type: "document" | "hearing" | "payment" | "client"
  title: string
  time: string
  case: string
}

const ACTIVITIES: Activity[] = [
  {
    id: "1",
    type: "document",
    title: "Petition filed",
    time: "2 hours ago",
    case: "People vs. Reyes",
  },
  {
    id: "2",
    type: "payment",
    title: "Retainer received",
    time: "4 hours ago",
    case: "ABC Realty Dispute",
  },
]

const typeConfig = {
  document: { icon: FileText, class: "text-blue-600 dark:text-blue-400", bg: "bg-blue-100 dark:bg-blue-900/30" },
  hearing: { icon: Calendar, class: "text-green-600 dark:text-green-400", bg: "bg-green-100 dark:bg-green-900/30" },
  payment: {
    icon: DollarSign,
    class: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-100 dark:bg-purple-900/30",
  },
  client: { icon: Users, class: "text-orange-600 dark:text-orange-400", bg: "bg-orange-100 dark:bg-orange-900/30" },
}

export default function RecentActivity() {
  return (
    <div className="space-y-3">
      {ACTIVITIES.map((activity) => (
        <div
          key={activity.id}
          className="flex gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
        >
          {/* badge */}
          <span
            className={cn(
              "h-9 w-9 flex items-center justify-center rounded-lg shrink-0",   // 👈 fixed size + centering
              typeConfig[activity.type].bg
            )}
          >
            {React.createElement(typeConfig[activity.type].icon, {
              className: cn("h-4 w-4", typeConfig[activity.type].class),
            })}
          </span>

          {/* text */}
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {activity.title}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {activity.case}
            </p>
          </div>
        </div>

      ))}
    </div>
  )
}
