export interface Document {
  id: string
  title: string
  filename: string
  documentType:
    | "Motion"
    | "Pleading"
    | "Affidavit"
    | "Retainer Agreement"
    | "Contract"
    | "Complaint"
    | "Answer"
    | "Counter-Affidavit"
    | "Position Paper"
    | "Memorandum"
    | "Certificate"
    | "Notice"
    | "Order"
    | "Decision"
  associatedCase?: string
  clients: string[]
  dateCreated: string
  dateUploaded: string
  uploadedBy: string
  status: "Draft" | "Reviewed" | "Final" | "Filed" | "Pending Review"
  fileSize: string
  tags: string[]
  version: number
  isLatestVersion: boolean
  folder: string
  permissions: "Public" | "Case Team" | "Admin Only" | "Client Accessible"
  summary?: string
  riskAlerts?: string[]
}

export interface DocumentFolder {
  id: string
  name: string
  path: string
  documentCount: number
  subfolders?: DocumentFolder[]
}

export interface UploadingDocument {
  id: string
  filename: string
  progress: number
  status: "uploading" | "processing" | "complete" | "error"
  suggestedType?: string
  suggestedCase?: string
}
