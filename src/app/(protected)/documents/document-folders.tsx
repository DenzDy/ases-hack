import { Folder, FolderOpen, FileText } from "lucide-react"
import type { Document } from "./types/document-types"

interface DocumentFoldersProps {
  documents: Document[]
}

export default function DocumentFolders({ documents }: DocumentFoldersProps) {
  // Create folder structure from documents
  const folderStructure = documents.reduce((acc, doc) => {
    const pathParts = doc.folder.split("/")
    let currentLevel = acc

    pathParts.forEach((part, index) => {
      if (!currentLevel[part]) {
        currentLevel[part] = {
          name: part,
          documents: [],
          subfolders: {},
        }
      }

      if (index === pathParts.length - 1) {
        currentLevel[part].documents.push(doc)
      } else {
        currentLevel = currentLevel[part].subfolders
      }
    })

    return acc
  }, {} as any)

  const renderFolder = (folderData: any, level = 0) => {
    return Object.entries(folderData).map(([name, data]: [string, any]) => (
      <div key={name} className={`${level > 0 ? "ml-4" : ""}`}>
        <div className="flex items-center gap-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg cursor-pointer">
          {Object.keys(data.subfolders).length > 0 ? (
            <FolderOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          ) : (
            <Folder className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          )}
          <span className="text-sm font-medium text-gray-900 dark:text-white">{name}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">({data.documents.length})</span>
        </div>

        {/* Render subfolders */}
        {Object.keys(data.subfolders).length > 0 && (
          <div className="ml-2">{renderFolder(data.subfolders, level + 1)}</div>
        )}

        {/* Render documents in this folder */}
        {data.documents.map((doc: Document) => (
          <div
            key={doc.id}
            className={`flex items-center gap-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg cursor-pointer ${level > 0 ? "ml-6" : "ml-2"}`}
          >
            <FileText className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <span className="text-sm text-gray-700 dark:text-gray-300 truncate">{doc.title}</span>
          </div>
        ))}
      </div>
    ))
  }

  return (
    <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-4 border border-gray-200 dark:border-[#1F1F23]">
      <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <Folder className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        Folders
      </h3>
      <div className="space-y-1">{renderFolder(folderStructure)}</div>
    </div>
  )
}
