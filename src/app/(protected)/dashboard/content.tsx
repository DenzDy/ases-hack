"use client";

import {
    Scale,
    Calendar,
    FileText,
    DollarSign,
    Activity,
    CheckSquare,
    Bot,
    PenTool,
    Newspaper,
    TrendingUp,
    Briefcase,
} from "lucide-react"
import LegalCases from "./legal-cases"
import UpcomingHearings from "./upcoming-hearings"
import OutstandingInvoices from "./outstanding-invoices"
import MonthlyRevenue from "./monthly-revenue"
import RecentActivity from "./recent-activity"
import TasksList from "./tasks-list"
import LexiUsage from "./lexi-usage"
import DraftDocuments from "./draft-documents"
import LegalNews from "./legal-news"

import { useSession } from '@/lib/SessionContext'

export default function Content() {
    const session = useSession()
    const userID = session?.user?.id ?? 'Unknown'
    const userEmail = session?.user?.email ?? 'Unknown'

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Hello, user.</h1>
                    <p className="text-gray-600 dark:text-gray-400">You are authenticated as <span className="font-medium text-gray-900 dark:text-white">{userEmail}</span></p>
                    <p className="text-gray-500 dark:text-gray-400">User id: {userID} </p>
                </div>
            </div>

            {/* Top Row - Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-4 border border-gray-200 dark:border-[#1F1F23]">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Open Cases</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">24</p>
                        </div>
                        <Scale className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                </div>

                <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-4 border border-gray-200 dark:border-[#1F1F23]">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">This Week&apos;s Hearings</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">7</p>
                        </div>
                        <Calendar className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                </div>

                <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-4 border border-gray-200 dark:border-[#1F1F23]">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Outstanding Invoices</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">₱45,230</p>
                        </div>
                        <FileText className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                    </div>
                </div>

                <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-4 border border-gray-200 dark:border-[#1F1F23]">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Monthly Revenue</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">₱128,450</p>
                        </div>
                        <DollarSign className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                    </div>
                </div>
            </div>

            {/* Second Row - Main Content Areas */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        Open Cases
                    </h2>
                    <LegalCases />
                </div>

                <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-green-600 dark:text-green-400" />
                        Upcoming Hearings
                    </h2>
                    <UpcomingHearings />
                </div>
            </div>

            {/* Extra Row - Announcement bar */}
            <div
                className="
                    rounded-xl
                    py-3 px-4
                    bg-gradient-to-r from-orange-500 via-pink-500 to-cyan-500
                    flex items-center justify-center
                    text-white text-sm sm:text-base font-medium
                    shadow-md">
                <span>
                    Lexi.ai has been upgraded to <strong>v4</strong> — enjoy deeper insight and improved drafting on Filipino case law!
                </span>
            </div>


            {/* Third Row - Financial & Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                        Outstanding Invoices
                    </h2>
                    <OutstandingInvoices />
                </div>

                <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        Monthly Revenue
                    </h2>
                    <MonthlyRevenue />
                </div>

                <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-red-600 dark:text-red-400" />
                        Recent Case Activity
                    </h2>
                    <RecentActivity />
                </div>
            </div>

            {/* Fourth Row - Tasks & Tools */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <CheckSquare className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                        Tasks
                    </h2>
                    <TasksList />
                </div>

                <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <Bot className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                        Lexi.ai Usage
                    </h2>
                    <LexiUsage />
                </div>
            </div>

            {/* Fifth Row - Documents & News */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <PenTool className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                        Draft Documents
                    </h2>
                    <DraftDocuments />
                </div>

                <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <Newspaper className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                        Legal News Feed
                    </h2>
                    <LegalNews />
                </div>
            </div>
        </div>
    )
}
