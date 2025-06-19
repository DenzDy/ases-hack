import { ExternalLink, Clock, Bookmark } from "lucide-react"

interface NewsItem {
  id: string
  title: string
  source: string
  time: string
  category: string
  url: string
}

const NEWS_ITEMS: NewsItem[] = [
  {
    id: "1",
    title: "Supreme Court Rules on Contract Interpretation Standards",
    source: "Legal Times",
    time: "2 hours ago",
    category: "Contract Law",
    url: "#",
  },
  {
    id: "2",
    title: "New Personal Injury Settlement Guidelines Released",
    source: "Law Journal",
    time: "5 hours ago",
    category: "Personal Injury",
    url: "#",
  },
  {
    id: "3",
    title: "Estate Planning Changes in 2024 Tax Code",
    source: "Tax Law Review",
    time: "1 day ago",
    category: "Estate Planning",
    url: "#",
  },
  {
    id: "4",
    title: "Family Court Procedures Updated for Digital Age",
    source: "Family Law Today",
    time: "2 days ago",
    category: "Family Law",
    url: "#",
  },
]

export default function LegalNews() {
  return (
    <div className="space-y-3">
      {NEWS_ITEMS.map((item) => (
        <div
          key={item.id}
          className="p-3 rounded-lg border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm text-gray-900 dark:text-white line-clamp-2 mb-1">{item.title}</h3>
              <div className="flex items-center gap-3 text-xs text-gray-600 dark:text-gray-400">
                <span>{item.source}</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {item.time}
                </div>
              </div>
              <span className="inline-block mt-1 px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-400 rounded-full">
                {item.category}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                <Bookmark className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
              </button>
              <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                <ExternalLink className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      ))}
      <button className="w-full mt-3 py-2 text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center justify-center gap-1">
        View More News <ExternalLink className="w-3 h-3" />
      </button>
    </div>
  )
}
