"use client"

import { useState } from "react"
import { X, Calendar, Users, MapPin, FileText, Clock, Edit3, Save, User, Gavel } from "lucide-react"
import type { Case } from "./types/case-types"

interface CaseModalProps {
  case: Case
  onClose: () => void
}

export default function CaseModal({ case: caseData, onClose }: CaseModalProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [isEditingNotes, setIsEditingNotes] = useState(false)
  const [notes, setNotes] = useState(caseData.notes)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-PH", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "people", label: "People Involved" },
    { id: "timeline", label: "Timeline" },
    { id: "documents", label: "Documents" },
  ]

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl bg-white dark:bg-[#0F0F12] shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-[#1F1F23]">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{caseData.title}</h2>
            <p className="text-gray-600 dark:text-gray-400">{caseData.docketNumber}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-[#1F1F23] px-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.id
                ? "border-blue-600 text-blue-600 dark:text-blue-400"
                : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Case Summary */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Case Summary</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{caseData.summary}</p>
              </div>

              {/* Key Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Case Type</p>
                      <p className="font-medium text-gray-900 dark:text-white">{caseData.caseType}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Court</p>
                      <p className="font-medium text-gray-900 dark:text-white">{caseData.court}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Filing Date</p>
                      <p className="font-medium text-gray-900 dark:text-white">{formatDate(caseData.filingDate)}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Client(s)</p>
                      <p className="font-medium text-gray-900 dark:text-white">{caseData.clientNames.join(", ")}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-red-600 dark:text-red-400" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Next Hearing</p>
                      <p className="font-medium text-gray-900 dark:text-white">{formatDate(caseData.nextHearing)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Gavel className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Judge</p>
                      <p className="font-medium text-gray-900 dark:text-white">{caseData.judge}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Notes</h3>
                  <button
                    onClick={() => setIsEditingNotes(!isEditingNotes)}
                    className="flex items-center gap-2 px-3 py-1 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                  >
                    {isEditingNotes ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                    {isEditingNotes ? "Save" : "Edit"}
                  </button>
                </div>
                {isEditingNotes ? (
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                  />
                ) : (
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg">
                    {notes}
                  </p>
                )}
              </div>
            </div>
          )}

          {activeTab === "people" && (
            <div className="space-y-6">
              {/* Assigned Lawyers */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Assigned Lawyers</h3>
                <div className="space-y-2">
                  {caseData.assignedLawyers.map((lawyer, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <span className="font-medium text-gray-900 dark:text-white">{lawyer}</span>
                      <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full">Lead</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Standby Lawyers */}
              {caseData.standbyLawyers.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Standby Lawyers</h3>
                  <div className="space-y-2">
                    {caseData.standbyLawyers.map((lawyer, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
                      >
                        <User className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        <span className="font-medium text-gray-900 dark:text-white">{lawyer}</span>
                        <span className="text-xs bg-gray-600 text-white px-2 py-1 rounded-full">Standby</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Opposing Counsel */}
              {caseData.opposingCounsel.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Opposing Counsel</h3>
                  <div className="space-y-2">
                    {caseData.opposingCounsel.map((lawyer, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                        <User className="w-5 h-5 text-red-600 dark:text-red-400" />
                        <span className="font-medium text-gray-900 dark:text-white">{lawyer}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Clients */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Clients</h3>
                <div className="space-y-2">
                  {caseData.clientNames.map((client, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg"
                    >
                      <User className="w-5 h-5 text-green-600 dark:text-green-400" />
                      <span className="font-medium text-gray-900 dark:text-white">{client}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "timeline" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Case Timeline</h3>
              <div className="space-y-4">
                {caseData.timeline.map((event, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-3 h-3 rounded-full ${event.type === "hearing"
                          ? "bg-blue-600"
                          : event.type === "filing"
                            ? "bg-green-600"
                            : event.type === "motion"
                              ? "bg-purple-600"
                              : "bg-gray-600"
                          }`}
                      />
                      {index < caseData.timeline.length - 1 && (
                        <div className="w-0.5 h-8 bg-gray-200 dark:bg-gray-700 mt-2" />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-gray-900 dark:text-white">{event.event}</span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-medium ${event.type === "hearing"
                            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                            : event.type === "filing"
                              ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                              : event.type === "motion"
                                ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                            }`}
                        >
                          {event.type}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{formatDate(event.date)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "documents" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Case Documents</h3>
              <div className="space-y-3">
                {caseData.documents.map((doc, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{doc.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {doc.type} • {formatDate(doc.date)}
                        </p>
                      </div>
                    </div>
                    <button className="px-3 py-1 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                      View
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
