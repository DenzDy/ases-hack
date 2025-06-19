import React from "react"
import { cn } from "@/lib/utils"
import { Clock, AlertTriangle, ArrowRight } from "lucide-react"

interface Invoice {
  id: string
  client: string
  amount: string
  daysOverdue: number
  status: "overdue" | "due-soon" | "pending"
}

const INVOICES: Invoice[] = [
  {
    id: "1",
    client: "Juan Dela Cruz Law Office",
    amount: "₱15,750",
    daysOverdue: 15,
    status: "overdue",
  },
  {
    id: "2",
    client: "Trinoma Mall Tenancy",
    amount: "₱8,500",
    daysOverdue: 3,
    status: "due-soon",
  },
]

const statusConfig = {
  overdue: {
    class: "text-red-600 dark:text-red-400",
    bg: "bg-red-100 dark:bg-red-900/30",
    icon: AlertTriangle,
  },
  "due-soon": {
    class: "text-yellow-600 dark:text-yellow-400",
    bg: "bg-yellow-100 dark:bg-yellow-900/30",
    icon: Clock,
  },
  pending: {
    class: "text-gray-600 dark:text-gray-400",
    bg: "bg-gray-100 dark:bg-gray-800",
    icon: Clock,
  },
}

export default function OutstandingInvoices() {
  return (
    <div className="space-y-3">
      {INVOICES.map((invoice) => (
        <div
          key={invoice.id}
          className="p-3 rounded-lg border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium text-sm text-gray-900 dark:text-white">
              {invoice.client}
            </h3>
            <span className="font-semibold text-sm text-gray-900 dark:text-white">
              {invoice.amount}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span
              className={cn(
                "px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1",
                statusConfig[invoice.status].bg,
                statusConfig[invoice.status].class,
              )}
            >
              {React.createElement(statusConfig[invoice.status].icon, {
                className: "w-3 h-3",
              })}
              {invoice.status === "overdue"
                ? `${invoice.daysOverdue} days overdue`
                : invoice.status === "due-soon"
                  ? `Due in ${invoice.daysOverdue} days`
                  : "Pending"}
            </span>
          </div>
        </div>
      ))}
      <button className="w-full mt-3 py-2 text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center justify-center gap-1">
        View All Invoices <ArrowRight className="w-3 h-3" />
      </button>
    </div>
  )
}
