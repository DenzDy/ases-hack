export interface Case {
  id: string
  title: string
  clientNames: string[]
  caseType: "Criminal" | "Civil" | "Labor" | "Admin" | "Barangay"
  status:
    | "Active"
    | "Closed"
    | "Urgent"
    | "Pending"
    | "With Barangay"
    | "Prelim Investigation"
    | "For Trial"
    | "Resolved"
  nextHearing: string
  assignedLawyers: string[]
  court: string
  docketNumber: string
  filingDate: string
  courtLevel: string
  summary: string
  judge: string
  opposingCounsel: string[]
  standbyLawyers: string[]
  timeline: TimelineEvent[]
  documents: Document[]
  notes: string
}

export interface TimelineEvent {
  date: string
  event: string
  type: "filing" | "hearing" | "motion" | "decision"
}

export interface Document {
  name: string
  type: "filing" | "motion" | "evidence" | "decision"
  date: string
}
