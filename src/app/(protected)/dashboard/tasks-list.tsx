"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { CheckSquare, Square, Clock, ArrowRight } from "lucide-react"

interface Task {
  id: string
  title: string
  case: string
  priority: "high" | "medium" | "low"
  dueDate: string
  completed: boolean
}

const INITIAL_TASKS: Task[] = [
  {
    id: "1",
    title: "Review discovery documents",
    case: "Santos vs. Reyes",
    priority: "high",
    dueDate: "Today",
    completed: false,
  },
  {
    id: "2",
    title: "Draft deposition questions",
    case: "Gonzales Corp. Contract",
    priority: "medium",
    dueDate: "Tomorrow",
    completed: false,
  },
  {
    id: "3",
    title: "File estate documents",
    case: "Dela Cruz Estate",
    priority: "high",
    dueDate: "Jun 28",
    completed: true,
  },
  {
    id: "4",
    title: "Client follow-up call",
    case: "Alvarez Annulment",
    priority: "low",
    dueDate: "Jun 30",
    completed: false,
  },
]

const priorityConfig = {
  high: { class: "text-red-600 dark:text-red-400" },
  medium: { class: "text-yellow-600 dark:text-yellow-400" },
  low: { class: "text-green-600 dark:text-green-400" },
}

export default function TasksList() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS)

  const toggle = (id: string) =>
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t,
      ),
    )

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={cn(
            "p-3 rounded-lg border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors",
            task.completed && "opacity-60",
          )}
        >
          <div className="flex items-start gap-3">
            <button className="mt-0.5" onClick={() => toggle(task.id)}>
              {task.completed ? (
                <CheckSquare className="w-4 h-4 text-green-600 dark:text-green-400" />
              ) : (
                <Square className="w-4 h-4 text-gray-400 dark:text-gray-600" />
              )}
            </button>

            <div className="flex-1 min-w-0">
              <h3
                className={cn(
                  "font-medium text-sm",
                  task.completed
                    ? "line-through text-gray-500 dark:text-gray-500"
                    : "text-gray-900 dark:text-white",
                )}
              >
                {task.title}
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                {task.case}
              </p>

              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center gap-1 text-xs">
                  <Clock className="w-3 h-3 text-gray-500" />
                  <span className="text-gray-500 dark:text-gray-500">
                    {task.dueDate}
                  </span>
                </div>
                <span
                  className={cn(
                    "px-2 py-0.5 rounded-full text-xs font-medium",
                    priorityConfig[task.priority].class,
                  )}
                >
                  {task.priority} priority
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button className="w-full mt-3 py-2 text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center justify-center gap-1">
        View All Tasks <ArrowRight className="w-3 h-3" />
      </button>
    </div>
  )
}
