"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, X, FileText, CheckCircle, AlertCircle, Loader } from "lucide-react"
import type { UploadingDocument } from "./types/document-types"

interface DocumentUploadProps {
  onUpload: (files: FileList) => void
  uploadingDocuments: UploadingDocument[]
  onClose: () => void
}

export default function DocumentUpload({ onUpload, uploadingDocuments, onClose }: DocumentUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      onUpload(files)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      onUpload(files)
    }
  }

  const getStatusIcon = (status: UploadingDocument["status"]) => {
    switch (status) {
      case "uploading":
        return <Loader className="w-4 h-4 text-blue-600 animate-spin" />
      case "processing":
        return <Loader className="w-4 h-4 text-yellow-600 animate-spin" />
      case "complete":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "error":
        return <AlertCircle className="w-4 h-4 text-red-600" />
      default:
        return <FileText className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusText = (status: UploadingDocument["status"]) => {
    switch (status) {
      case "uploading":
        return "Uploading..."
      case "processing":
        return "Processing with Lexi AI..."
      case "complete":
        return "Upload complete!"
      case "error":
        return "Upload failed"
      default:
        return "Pending"
    }
  }

  return (
    <div className="bg-white dark:bg-[#0F0F12] rounded-xl border border-gray-200 dark:border-[#1F1F23] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-[#1F1F23]">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Upload Documents</h3>
        <button onClick={onClose} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
          <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      <div className="p-6">
        {/* Drop Zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200
            ${
              isDragOver
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 scale-105"
                : "border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600"
            }
          `}
        >
          <div className="space-y-4">
            <div
              className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200 ${
                isDragOver ? "bg-blue-100 dark:bg-blue-900/30 scale-110" : "bg-gray-100 dark:bg-gray-800"
              }`}
            >
              <Upload
                className={`w-8 h-8 transition-colors duration-200 ${
                  isDragOver ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-400"
                }`}
              />
            </div>

            <div>
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {isDragOver ? "Drop your files here!" : "Drag and drop your documents"}
              </h4>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Support for PDF, DOC, DOCX files up to 10MB each</p>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                Choose Files
              </button>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.doc,.docx"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          </div>

          {/* Animated overlay when dragging */}
          {isDragOver && (
            <div className="absolute inset-0 bg-blue-500/10 rounded-xl flex items-center justify-center">
              <div className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium animate-bounce">
                Drop files to upload
              </div>
            </div>
          )}
        </div>

        {/* Upload Progress */}
        {uploadingDocuments.length > 0 && (
          <div className="mt-6 space-y-3">
            <h4 className="font-medium text-gray-900 dark:text-white">Uploading Files</h4>
            {uploadingDocuments.map((doc) => (
              <div key={doc.id} className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  {getStatusIcon(doc.status)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{doc.filename}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{getStatusText(doc.status)}</p>
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">{Math.round(doc.progress)}%</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      doc.status === "complete"
                        ? "bg-green-600"
                        : doc.status === "error"
                          ? "bg-red-600"
                          : doc.status === "processing"
                            ? "bg-yellow-600"
                            : "bg-blue-600"
                    }`}
                    style={{ width: `${doc.progress}%` }}
                  />
                </div>

                {/* AI Suggestions */}
                {doc.status === "processing" && (doc.suggestedType || doc.suggestedCase) && (
                  <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-xs font-medium text-blue-800 dark:text-blue-200 mb-1">Lexi AI Suggestions:</p>
                    {doc.suggestedType && (
                      <p className="text-xs text-blue-700 dark:text-blue-300">• Document Type: {doc.suggestedType}</p>
                    )}
                    {doc.suggestedCase && (
                      <p className="text-xs text-blue-700 dark:text-blue-300">• Associated Case: {doc.suggestedCase}</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <h4 className="font-medium text-gray-900 dark:text-white mb-3">Quick Actions</h4>
          <div className="grid grid-cols-2 gap-3">
            <button className="p-3 text-left border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-colors">
              <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400 mb-2" />
              <p className="text-sm font-medium text-gray-900 dark:text-white">Upload Motion</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Court motions and pleadings</p>
            </button>
            <button className="p-3 text-left border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-colors">
              <FileText className="w-5 h-5 text-green-600 dark:text-green-400 mb-2" />
              <p className="text-sm font-medium text-gray-900 dark:text-white">Upload Contract</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Agreements and contracts</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
