"use client"

import { useState } from "react"
import CasesList from "./cases-list"
import CaseModal from "./case-modal"
import LexiInsights from "./lexi-insights"
import CaseFilters from "./case-filters"
import LawyerLoadBalance from "./lawyer-load-balance"
import type { Case } from "./types/case-types"

// Mock data for cases
const MOCK_CASES: Case[] = [
    {
        id: "1",
        title: "People vs. Santos",
        clientNames: ["Maria Santos"],
        caseType: "Criminal",
        status: "Active",
        nextHearing: "2024-01-15",
        assignedLawyers: ["Atty. Juan Dela Cruz", "Atty. Maria Garcia"],
        court: "RTC Branch 35, Manila",
        docketNumber: "Crim. Case No. 2023-001",
        filingDate: "2023-03-15",
        courtLevel: "Regional Trial Court",
        summary: "Theft case involving alleged stealing of personal property worth ₱50,000",
        judge: "Hon. Roberto Villanueva",
        opposingCounsel: ["Atty. Pedro Reyes"],
        standbyLawyers: ["Atty. Ana Lopez"],
        timeline: [
            { date: "2023-03-15", event: "Case filed", type: "filing" },
            { date: "2023-04-20", event: "Arraignment", type: "hearing" },
            { date: "2024-01-15", event: "Pre-trial conference", type: "hearing" },
        ],
        documents: [
            { name: "Information", type: "filing", date: "2023-03-15" },
            { name: "Motion to Dismiss", type: "motion", date: "2023-04-10" },
        ],
        notes: "Client maintains innocence. Strong alibi evidence available.",
    },
    {
        id: "2",
        title: "ABC Corp vs. XYZ Inc.",
        clientNames: ["ABC Corporation"],
        caseType: "Civil",
        status: "Urgent",
        nextHearing: "2024-01-12",
        assignedLawyers: ["Atty. Maria Garcia"],
        court: "RTC Branch 12, Makati",
        docketNumber: "Civil Case No. 2023-045",
        filingDate: "2023-06-10",
        courtLevel: "Regional Trial Court",
        summary: "Breach of contract case involving construction services worth ₱2.5M",
        judge: "Hon. Carmen Dela Rosa",
        opposingCounsel: ["Atty. Ricardo Tan", "Atty. Lisa Wong"],
        standbyLawyers: ["Atty. Juan Dela Cruz"],
        timeline: [
            { date: "2023-06-10", event: "Complaint filed", type: "filing" },
            { date: "2023-07-15", event: "Answer filed", type: "filing" },
            { date: "2024-01-12", event: "Case management conference", type: "hearing" },
        ],
        documents: [
            { name: "Complaint", type: "filing", date: "2023-06-10" },
            { name: "Contract Agreement", type: "evidence", date: "2023-06-10" },
        ],
        notes: "Settlement negotiations ongoing. Client prefers out-of-court resolution.",
    },
    {
        id: "3",
        title: "Labor Case - Reyes vs. Tech Solutions",
        clientNames: ["Roberto Reyes"],
        caseType: "Labor",
        status: "Pending",
        nextHearing: "2024-01-20",
        assignedLawyers: ["Atty. Ana Lopez"],
        court: "NLRC NCR, Quezon City",
        docketNumber: "NLRC Case No. 2023-078",
        filingDate: "2023-08-05",
        courtLevel: "National Labor Relations Commission",
        summary: "Illegal dismissal case with claims for back wages and separation pay",
        judge: "Labor Arbiter Jose Martinez",
        opposingCounsel: ["Atty. Michael Cruz"],
        standbyLawyers: ["Atty. Juan Dela Cruz"],
        timeline: [
            { date: "2023-08-05", event: "Complaint filed", type: "filing" },
            { date: "2023-09-10", event: "Position paper submitted", type: "filing" },
            { date: "2024-01-20", event: "Clarificatory hearing", type: "hearing" },
        ],
        documents: [
            { name: "Complaint for Illegal Dismissal", type: "filing", date: "2023-08-05" },
            { name: "Employment Contract", type: "evidence", date: "2023-08-05" },
        ],
        notes: "Strong case for illegal dismissal. Company failed to follow due process.",
    },
    {
        id: "4",
        title: "Barangay Mediation - Cruz vs. Neighbor",
        clientNames: ["Elena Cruz"],
        caseType: "Barangay",
        status: "With Barangay",
        nextHearing: "2024-01-18",
        assignedLawyers: ["Atty. Pedro Silva"],
        court: "Barangay Hall, Taguig",
        docketNumber: "Brgy. Case No. 2024-001",
        filingDate: "2024-01-05",
        courtLevel: "Barangay",
        summary: "Property boundary dispute requiring barangay mediation",
        judge: "Barangay Captain Maria Gonzales",
        opposingCounsel: [],
        standbyLawyers: [],
        timeline: [
            { date: "2024-01-05", event: "Complaint filed at barangay", type: "filing" },
            { date: "2024-01-18", event: "Mediation session", type: "hearing" },
        ],
        documents: [
            { name: "Barangay Complaint", type: "filing", date: "2024-01-05" },
            { name: "Property Survey", type: "evidence", date: "2024-01-05" },
        ],
        notes: "Attempting amicable settlement before formal court proceedings.",
    },
]

export default function CasesPage() {
    const [selectedCase, setSelectedCase] = useState<Case | null>(null)
    const [filteredCases, setFilteredCases] = useState<Case[]>(MOCK_CASES)
    const [showLoadBalance, setShowLoadBalance] = useState(false)

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Cases</h1>
                    <p className="text-gray-600 dark:text-gray-400">Manage your legal cases and track progress</p>
                </div>
                <button
                    onClick={() => setShowLoadBalance(!showLoadBalance)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                    {showLoadBalance ? "Hide" : "Show"} Load Balance
                </button>
            </div>

            {/* Lexi AI Insights */}
            <LexiInsights cases={filteredCases} />

            {/* Lawyer Load Balance (conditional) */}
            {showLoadBalance && <LawyerLoadBalance cases={filteredCases} />}

            {/* Filters */}
            <CaseFilters cases={MOCK_CASES} onFilter={setFilteredCases} />

            {/* Cases List */}
            <CasesList cases={filteredCases} onCaseClick={setSelectedCase} />

            {/* Case Modal */}
            {selectedCase && <CaseModal case={selectedCase} onClose={() => setSelectedCase(null)} />}
        </div>
    )
}
