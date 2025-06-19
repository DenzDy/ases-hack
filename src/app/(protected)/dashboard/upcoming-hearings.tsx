import { cn } from "@/lib/utils"
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react"

interface Hearing {
  id: string
  title: string
  date: string
  time: string
  location: string
  type: "court" | "deposition" | "mediation"
}

const HEARINGS: Hearing[] = [
  {
    id: "1",
    title: "Santos vs. Barangay San Juan - Motion Hearing",
    date: "Today",
    time: "2:00 PM",
    location: "RTC Branch 27, Quezon City Hall of Justice",
    type: "court",
  },
  {
    id: "2",
    title: "Gonzales Corp. Deposition",
    date: "Tomorrow",
    time: "10:00 AM",
    location: "4th Floor, OSG Building, Makati",
    type: "deposition",
  },
  {
    id: "3",
    title: "Dela Cruz Family Estate Mediation",
    date: "June 21",
    time: "1:30 PM",
    location: "DOJ Mediation Center, Manila",
    type: "mediation",
  },
  {
    id: "4",
    title: "People vs. Reyes - Final Hearing",
    date: "June 26",
    time: "9:00 AM",
    location: "MTCC Branch 2, Cebu City",
    type: "court",
  },
]

const typeConfig = {
  court: { class: "text-blue-600 dark:text-blue-400", bg: "bg-blue-100 dark:bg-blue-900/30" },
  deposition: { class: "text-purple-600 dark:text-purple-400", bg: "bg-purple-100 dark:bg-purple-900/30" },
  mediation: { class: "text-green-600 dark:text-green-400", bg: "bg-green-100 dark:bg-green-900/30" },
}

export default function UpcomingHearings() {
  return (
    <div className="space-y-3">
      {HEARINGS.map((hearing) => (
        <div
          key={hearing.id}
          className="p-3 rounded-lg border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
        >
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-medium text-sm text-gray-900 dark:text-white line-clamp-1">{hearing.title}</h3>
            <span
              className={cn(
                "px-2 py-1 rounded-full text-xs font-medium",
                typeConfig[hearing.type].bg,
                typeConfig[hearing.type].class,
              )}
            >
              {hearing.type}
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {hearing.date}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {hearing.time}
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-500 mt-1">
            <MapPin className="w-3 h-3" />
            {hearing.location}
          </div>
        </div>
      ))}
      <button className="w-full mt-3 py-2 text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center justify-center gap-1">
        View Calendar <ArrowRight className="w-3 h-3" />
      </button>
    </div>
  )
}
