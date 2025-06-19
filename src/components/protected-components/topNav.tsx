"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"
import { Bell, ChevronRight, LogOut } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import { usePathname } from "next/navigation"

export default function TopNav() {
    const router = useRouter()
    const pathname = usePathname()

    const segments = pathname.split("/").filter(Boolean)

    const labelMap: Record<string, string> = {
        dashboard: "Dashboard",
        cases: "Cases",
        documents: "Documents",
        assistant: "AI Assistant",
        clients: "Clients",
        appointments: "Appointments",
        news: "Legal News",
        laws: "Laws & References",
        templates: "Document Templates",
        users: "Users & Roles",
        permissions: "Permissions",
        settings: "Settings",
        help: "Help",
    }

    /* 3.  Build breadcrumb objects with cumulative hrefs           */
    const breadcrumbs = [
        { label: "KatwiranAI", href: "/dashboard" },               // always first
        ...segments.map((seg, idx) => {
            const href = "/" + segments.slice(0, idx + 1).join("/")
            const label = labelMap[seg] ?? seg.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())
            return { label, href }
        }),
    ]

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push("/login")
    }

    return (
        <nav className="px-3 sm:px-6 flex items-center justify-between bg-white dark:bg-[#0F0F12] border-b border-gray-200 dark:border-[#1F1F23] h-full">
            <div className="font-medium text-sm hidden sm:flex items-center space-x-1 truncate max-w-[300px]">
                {breadcrumbs.map((item, index) => (
                    <div key={item.label} className="flex items-center">
                        {index > 0 && <ChevronRight className="h-4 w-4 text-gray-500 dark:text-gray-400 mx-1" />}
                        {item.href ? (
                            <Link
                                href={item.href}
                                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <span className="text-gray-900 dark:text-gray-100">{item.label}</span>
                        )}
                    </div>
                ))}
            </div>

            <div className="flex items-center gap-2 sm:gap-4 ml-auto sm:ml-0">
                {/* Company Logo */}
                <div>
                    <Image
                        src="/logo/fictional_company.jpg"
                        alt="Company logo"
                        width={32}
                        height={32}
                        className="rounded-sm shadow-sm"
                    />
                </div>

                {/* Notification Bell */}
                <button
                    type="button"
                    className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-[#1F1F23] rounded-full transition-colors"
                >
                    <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 dark:text-gray-300" />
                </button>

                {/* Profile dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger className="focus:outline-none">
                        <Image
                            src="/images/profile.png"
                            alt="User avatar"
                            width={32}
                            height={32}
                            className="rounded-full ring-2 ring-gray-200 dark:ring-[#2B2B30] sm:w-8 sm:h-8 cursor-pointer"
                        />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        align="end"
                        sideOffset={8}
                        className="w-40 bg-white dark:bg-[#1F1F23] rounded-lg shadow"
                    >
                        <DropdownMenuItem
                            onClick={handleLogout}
                            className="flex items-center gap-2 cursor-pointer text-gray-700 dark:text-gray-200"
                        >
                            <LogOut size={16} /> Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </nav>
    )
}
