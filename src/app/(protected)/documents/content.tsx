"use client"

import { useState } from "react"
import DocumentsList from "./documents-list"
import DocumentFilters from "./document-filters"
import DocumentUpload from "./document-upload"
import DocumentFolders from "./document-folders"
import LexiDocumentInsights from "./lexi-document-insights"
import type { Document, UploadingDocument } from "./types/document-types"

// Mock data for documents
const MOCK_DOCUMENTS: Document[] = [
    {
        id: "1",
        title: "Motion to Dismiss - People vs. Santos",
        filename: "motion_to_dismiss_santos.pdf",
        documentType: "Motion",
        associatedCase: "People vs. Santos",
        clients: ["Maria Santos"],
        dateCreated: "2024-01-10",
        dateUploaded: "2024-01-10",
        uploadedBy: "Atty. Juan Dela Cruz",
        status: "Filed",
        fileSize: "2.3 MB",
        tags: ["urgent", "criminal", "motion"],
        version: 2,
        isLatestVersion: true,
        folder: "Cases/People vs. Santos/Motions",
        permissions: "Case Team",
        summary: "Motion to dismiss criminal charges based on lack of probable cause and jurisdictional issues.",
        riskAlerts: ["Ensure proper service of motion to prosecution"],
    },
    {
        id: "2",
        title: "Retainer Agreement - ABC Corporation",
        filename: "retainer_abc_corp.pdf",
        documentType: "Retainer Agreement",
        clients: ["ABC Corporation"],
        dateCreated: "2024-01-08",
        dateUploaded: "2024-01-08",
        uploadedBy: "Atty. Maria Garcia",
        status: "Final",
        fileSize: "1.8 MB",
        tags: ["contract", "corporate", "signed"],
        version: 1,
        isLatestVersion: true,
        folder: "Clients/ABC Corporation/Agreements",
        permissions: "Admin Only",
        summary: "Legal services retainer agreement for corporate litigation matters.",
    },
    {
        id: "3",
        title: "Affidavit of Witness - Labor Case",
        filename: "witness_affidavit_reyes.pdf",
        documentType: "Affidavit",
        associatedCase: "Labor Case - Reyes vs. Tech Solutions",
        clients: ["Roberto Reyes"],
        dateCreated: "2024-01-05",
        dateUploaded: "2024-01-05",
        uploadedBy: "Atty. Ana Lopez",
        status: "Draft",
        fileSize: "1.2 MB",
        tags: ["labor", "witness", "needs-notarization"],
        version: 1,
        isLatestVersion: true,
        folder: "Cases/Labor Case - Reyes/Evidence",
        permissions: "Case Team",
        summary: "Witness affidavit supporting claims of illegal dismissal and workplace harassment.",
        riskAlerts: ["Requires notarization before submission", "Verify witness contact information"],
    },
    {
        id: "4",
        title: "Position Paper - NLRC Case",
        filename: "position_paper_nlrc.pdf",
        documentType: "Position Paper",
        associatedCase: "Labor Case - Reyes vs. Tech Solutions",
        clients: ["Roberto Reyes"],
        dateCreated: "2023-12-20",
        dateUploaded: "2023-12-20",
        uploadedBy: "Atty. Ana Lopez",
        status: "Filed",
        fileSize: "3.1 MB",
        tags: ["labor", "nlrc", "position-paper"],
        version: 3,
        isLatestVersion: true,
        folder: "Cases/Labor Case - Reyes/Pleadings",
        permissions: "Case Team",
        summary: "Comprehensive position paper outlining legal arguments for illegal dismissal case.",
    },
    {
        id: "5",
        title: "Barangay Certificate to File Action",
        filename: "barangay_certificate_cruz.pdf",
        documentType: "Certificate",
        associatedCase: "Barangay Mediation - Cruz vs. Neighbor",
        clients: ["Elena Cruz"],
        dateCreated: "2024-01-15",
        dateUploaded: "2024-01-15",
        uploadedBy: "Atty. Pedro Silva",
        status: "Final",
        fileSize: "0.8 MB",
        tags: ["barangay", "certificate", "mediation-failed"],
        version: 1,
        isLatestVersion: true,
        folder: "Cases/Barangay Mediation - Cruz/Certificates",
        permissions: "Case Team",
        summary: "Certificate from Barangay confirming failed mediation, allowing court filing.",
    },
    {
        id: "6",
        title: "Contract Review - Construction Agreement",
        filename: "construction_contract_review.pdf",
        documentType: "Contract",
        associatedCase: "ABC Corp vs. XYZ Inc.",
        clients: ["ABC Corporation"],
        dateCreated: "2024-01-12",
        dateUploaded: "2024-01-12",
        uploadedBy: "Atty. Maria Garcia",
        status: "Reviewed",
        fileSize: "4.2 MB",
        tags: ["contract", "construction", "breach"],
        version: 1,
        isLatestVersion: true,
        folder: "Cases/ABC Corp vs. XYZ Inc/Contracts",
        permissions: "Case Team",
        summary: "Analysis of construction contract terms and identification of breach provisions.",
        riskAlerts: ["Statute of limitations expires in 6 months", "Missing liquidated damages clause"],
    },
]

export default function DocumentsPage() {
    const [documents] = useState<Document[]>(MOCK_DOCUMENTS)
    const [filteredDocuments, setFilteredDocuments] = useState<Document[]>(MOCK_DOCUMENTS)
    const [selectedDocuments, setSelectedDocuments] = useState<string[]>([])
    const [uploadingDocuments, setUploadingDocuments] = useState<UploadingDocument[]>([])
    const [viewMode, setViewMode] = useState<"list" | "grid" | "folders">("list")
    const [showUploadZone, setShowUploadZone] = useState(false)

    const handleDocumentUpload = (files: FileList) => {
        const newUploads: UploadingDocument[] = Array.from(files).map((file, index) => ({
            id: `upload-${Date.now()}-${index}`,
            filename: file.name,
            progress: 0,
            status: "uploading",
            suggestedType: file.name.toLowerCase().includes("motion")
                ? "Motion"
                : file.name.toLowerCase().includes("affidavit")
                    ? "Affidavit"
                    : file.name.toLowerCase().includes("contract")
                        ? "Contract"
                        : undefined,
            suggestedCase: file.name.toLowerCase().includes("santos")
                ? "People vs. Santos"
                : file.name.toLowerCase().includes("reyes")
                    ? "Labor Case - Reyes vs. Tech Solutions"
                    : undefined,
        }))

        setUploadingDocuments((prev) => [...prev, ...newUploads])

        // Simulate upload progress
        newUploads.forEach((upload) => {
            const interval = setInterval(() => {
                setUploadingDocuments((prev) =>
                    prev.map((doc) => {
                        if (doc.id === upload.id) {
                            const newProgress = Math.min(doc.progress + Math.random() * 30, 100)
                            const newStatus = newProgress >= 100 ? "processing" : "uploading"

                            if (newProgress >= 100 && doc.status === "uploading") {
                                setTimeout(() => {
                                    setUploadingDocuments((prev) =>
                                        prev.map((d) => (d.id === upload.id ? { ...d, status: "complete" } : d)),
                                    )
                                    setTimeout(() => {
                                        setUploadingDocuments((prev) => prev.filter((d) => d.id !== upload.id))
                                    }, 2000)
                                }, 1000)
                            }

                            return { ...doc, progress: newProgress, status: newStatus }
                        }
                        return doc
                    }),
                )
            }, 200)

            setTimeout(() => clearInterval(interval), 5000)
        })
    }

    const handleBulkAction = (action: string) => {
        console.log(`Performing ${action} on documents:`, selectedDocuments)
        // Implement bulk actions here
        setSelectedDocuments([])
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Documents</h1>
                    <p className="text-gray-600 dark:text-gray-400">Manage legal documents and case files</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                        <button
                            onClick={() => setViewMode("list")}
                            className={`px-3 py-1 text-sm rounded-md transition-colors ${viewMode === "list"
                                ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                                : "text-gray-600 dark:text-gray-400"
                                }`}
                        >
                            List
                        </button>
                        <button
                            onClick={() => setViewMode("grid")}
                            className={`px-3 py-1 text-sm rounded-md transition-colors ${viewMode === "grid"
                                ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                                : "text-gray-600 dark:text-gray-400"
                                }`}
                        >
                            Grid
                        </button>
                        <button
                            onClick={() => setViewMode("folders")}
                            className={`px-3 py-1 text-sm rounded-md transition-colors ${viewMode === "folders"
                                ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                                : "text-gray-600 dark:text-gray-400"
                                }`}
                        >
                            Folders
                        </button>
                    </div>
                    <button
                        onClick={() => setShowUploadZone(!showUploadZone)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                    >
                        Upload Documents
                    </button>
                </div>
            </div>

            {/* Lexi AI Insights */}
            <LexiDocumentInsights documents={filteredDocuments} />

            {/* Upload Zone */}
            {showUploadZone && (
                <DocumentUpload
                    onUpload={handleDocumentUpload}
                    uploadingDocuments={uploadingDocuments}
                    onClose={() => setShowUploadZone(false)}
                />
            )}

            {/* Bulk Actions */}
            {selectedDocuments.length > 0 && (
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-blue-800 dark:text-blue-200">
                            {selectedDocuments.length} document{selectedDocuments.length > 1 ? "s" : ""} selected
                        </span>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => handleBulkAction("download")}
                                className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                            >
                                Download
                            </button>
                            <button
                                onClick={() => handleBulkAction("archive")}
                                className="px-3 py-1 text-sm bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                            >
                                Archive
                            </button>
                            <button
                                onClick={() => handleBulkAction("tag")}
                                className="px-3 py-1 text-sm bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                            >
                                Tag
                            </button>
                            <button
                                onClick={() => setSelectedDocuments([])}
                                className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                            >
                                Clear
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Sidebar - Folders */}
                {viewMode === "folders" && (
                    <div className="lg:col-span-1">
                        <DocumentFolders documents={filteredDocuments} />
                    </div>
                )}

                {/* Main Content */}
                <div className={viewMode === "folders" ? "lg:col-span-3" : "lg:col-span-4"}>
                    {/* Filters */}
                    <DocumentFilters documents={documents} onFilter={setFilteredDocuments} />

                    {/* Documents List */}
                    <DocumentsList
                        documents={filteredDocuments}
                        viewMode={viewMode}
                        selectedDocuments={selectedDocuments}
                        onSelectionChange={setSelectedDocuments}
                    />
                </div>
            </div>
        </div>
    )
}
