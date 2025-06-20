"use client"

import {
    Home,
    Briefcase,
    Folder,
    Users,
    Calendar,
    Newspaper,
    FileText,
    Shield,
    Settings,
    HelpCircle,
    Menu,
    Bot,
} from "lucide-react"

import { Icon, LucideProps } from 'lucide-react';
import { owl } from '@lucide/lab';

import Link from "next/link"
import { useState } from "react"
import Image from "next/image"

export const OwlIcon = (props: LucideProps) => (
    <Icon iconNode={owl} {...props} />    // now size / stroke / className all work
);

export default function Sidebar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    function handleNavigation() {
        setIsMobileMenuOpen(false)
    }

    function NavItem({
        href,
        icon: Icon,
        children,
        highlighted = false,
    }: {
        href: string
        icon: React.ElementType
        children: React.ReactNode
        highlighted?: boolean
    }) {
        return (
            <Link
                href={href}
                onClick={handleNavigation}
                className={`flex items-center px-3 py-2 text-sm rounded-md transition-colors
                    ${highlighted
                        ? "bg-gradient-to-r from-orange-200 via-pink-200 to-cyan-200 text-gray-800 hover:from-orange-400 hover:via-pink-400 hover:to-cyan-400 hover:text-white"
                        : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#1F1F23]"
                    }`}
            >
                <Icon className="h-4 w-4 mr-3 flex-shrink-0" />
                {children}
            </Link>
        )
    }


    return (
        <>
            <button
                type="button"
                className="lg:hidden fixed top-4 left-4 z-[70] p-2 rounded-lg bg-white dark:bg-[#0F0F12] shadow-md"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
                <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </button>
            <nav
                className={`
                fixed inset-y-0 left-0 z-[70] w-64 bg-white dark:bg-[#0F0F12] transform transition-transform duration-200 ease-in-out
                lg:translate-x-0 lg:static lg:w-64 border-r border-gray-200 dark:border-[#1F1F23]
                ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
            `}
            >
                <div className="h-full flex flex-col">
                    <Link
                        href="/dashboard"
                        className="h-16 px-6 flex items-center border-b border-gray-200 dark:border-[#1F1F23]"
                    >
                        <div className="flex items-center gap-3">
                            <Image
                                src="/logo/logo.png"
                                alt="KatwiranAI"
                                width={32}
                                height={32}
                                className="flex-shrink-0"
                            />
                            <span className="text-lg font-semibold hover:cursor-pointer text-gray-900 dark:text-white font-serif">
                                KatwiranAI
                            </span>
                        </div>
                    </Link>

                    <div className="flex-1 overflow-y-auto py-4 px-4">
                        <div className="space-y-6">
                            <div>
                                <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                    General
                                </div>
                                <div className="space-y-1">
                                    <NavItem href="/dashboard" icon={Home}>
                                        Dashboard
                                    </NavItem>
                                    <NavItem href="/cases" icon={Briefcase}>
                                        Cases
                                    </NavItem>
                                    <NavItem href="/documents" icon={Folder}>
                                        Documents
                                    </NavItem>
                                    <NavItem href="/lexi" icon={OwlIcon} highlighted>
                                        Lexi.ai
                                    </NavItem>
                                </div>
                            </div>

                            <div>
                                <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                    Clients
                                </div>
                                <div className="space-y-1">
                                    <NavItem href="/clients" icon={Users}>
                                        Clients
                                    </NavItem>
                                    <NavItem href="/appointments" icon={Calendar}>
                                        Appointments
                                    </NavItem>
                                </div>
                            </div>

                            <div>
                                <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                    Research
                                </div>
                                <div className="space-y-1">
                                    <NavItem href="/news" icon={Newspaper}>
                                        Legal News
                                    </NavItem>
                                    <NavItem href="/templates" icon={FileText}>
                                        Document Templates
                                    </NavItem>
                                </div>
                            </div>

                            <div>
                                <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                    Team
                                </div>
                                <div className="space-y-1">
                                    <NavItem href="/users" icon={Users}>
                                        Users & Roles
                                    </NavItem>
                                    <NavItem href="/permissions" icon={Shield}>
                                        Permissions
                                    </NavItem>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="px-4 py-4 border-t border-gray-200 dark:border-[#1F1F23]">
                        <div className="space-y-1">
                            <NavItem href="/settings" icon={Settings}>
                                Settings
                            </NavItem>
                            <NavItem href="/help" icon={HelpCircle}>
                                Help
                            </NavItem>
                        </div>
                    </div>
                </div>
            </nav>

            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-[65] lg:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}
        </>
    )
}
