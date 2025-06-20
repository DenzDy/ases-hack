"use client"

import { useState, useRef, useEffect } from "react"
import ReactMarkdown from "react-markdown"
import { X, ArrowLeft, Sparkles, FileText, Settings, Eye, Mic, Send } from "lucide-react"

interface LegalDraftingModalProps {
  onClose: () => void
}

const DOCUMENT_TEMPLATES = [
  { id: "affidavit", name: "Affidavit", description: "Sworn statement of facts for legal proceedings" },
  { id: "motion", name: "Motion to Dismiss", description: "Request to court to dismiss a case" },
  { id: "complaint", name: "Complaint", description: "Initial pleading to start a legal case" },
  { id: "demand-letter", name: "Demand Letter", description: "Formal request for payment or action" },
  { id: "contract", name: "Contract", description: "Legal agreement between parties" },
  { id: "retainer", name: "Retainer Agreement", description: "Legal services agreement" },
]

const CONVERSATION_STARTERS = [
  "Draft an affidavit for a witness in a criminal case",
  "Create a demand letter for unpaid services",
  "Prepare a motion to dismiss for lack of jurisdiction",
  "Draft a retainer agreement for legal services",
  "Create a complaint for breach of contract",
  "Prepare an employment contract",
]

const AFFIDAVIT_RESPONSE = `
  # AFFIDAVIT OF WITNESS\n
  \n
  I, **[Name of Affiant]**, of legal age, [civil status], Filipino, and a resident of **[Address]**, after having been duly sworn to in accordance with law, do hereby depose and state that:\n
  \n
  1. I am executing this affidavit to attest to the events I personally witnessed related to the criminal incident that occurred on or about **[Date of Incident]** at around **[Time]**, at **[Location of Incident]**.\n
  \n
  2. On said date and time, I was at **[State exact location, e.g., “inside the convenience store located at...”]**, when I observed the following:  \n
  **[Narrate clearly and chronologically the facts witnessed. Include details such as what the affiant saw, heard, smelled, or did.]**\n
  \n
  3. I personally saw **[Name of Accused or persons involved]** **[describe the action, e.g., “draw a weapon and approach the victim, later identified as [Name of Victim]”]**.\n
  \n
  4. I affirm that I had a clear and unobstructed view of the events as they unfolded and that I can positively identify the persons involved.\n
  \n
  5. I am executing this affidavit to attest to the truth of the foregoing and for whatever legal purpose this may serve.\n
  \n
  IN WITNESS WHEREOF, I have hereunto set my hand this ___ day of ___________, 20__, at _____________, Philippines.\n
  \n
  **[Signature of Affiant]**  \n
  [Name of Affiant]\n
  \n
  ---\n
  \n
  SUBSCRIBED AND SWORN to before me this ___ day of ___________, 20__, at _____________, Philippines, affiant exhibiting to me his/her competent evidence of identity by way of **[ID Type and Number]** issued on **[Date]** at **[Place of Issue]**.\n
  \n
  **[Signature of Administering Officer]**  \n
  [Name of Notary Public or Administering Officer]  \n
  [Title/Position]  \n
  [Office Address]  \n
  [Commission Number and Validity, if Notary Public]
`;

const MOTION_RESPONSE = `
  REPUBLIC OF THE PHILIPPINES  
REGIONAL TRIAL COURT  
[Judicial Region]  
Branch [Branch Number]  
[City/Municipality]

[Case Title, e.g., PEOPLE OF THE PHILIPPINES,  
Plaintiff,  
vs.  
[Name of Accused],  
Accused.]  

Criminal Case No. [XXXX-XX]  

# MOTION TO DISMISS  
(Due to Lack of Jurisdiction)

COMES NOW the accused, through the undersigned counsel, and unto this Honorable Court, most respectfully states that:

1. The instant case for **[state nature of the offense, e.g., Violation of RA 9165]** was filed before this Honorable Court on **[Date of Filing]**.

2. It is respectfully submitted that this Honorable Court has no jurisdiction over the subject matter/person of the accused for the following reasons:

   a. **[State the legal basis for lack of jurisdiction, e.g., "The alleged offense was committed outside the territorial jurisdiction of this Honorable Court, specifically at [Location], which falls under the jurisdiction of the Regional Trial Court of [Another City]."]**

   b. **[Optional: Add if the charge is a violation of a special law with a different designated court or agency of jurisdiction.]**

3. Jurisdiction is conferred by law and cannot be acquired through waiver or agreement of the parties. As such, any action rendered by a court without jurisdiction is null and void.

4. In view of the foregoing, the dismissal of the instant case is warranted.

WHEREFORE, premises considered, it is most respectfully prayed that the instant criminal case be DISMISSED for lack of jurisdiction.

Other reliefs just and equitable under the premises are likewise prayed for.

[City], Philippines, ___ day of ____________, 20__.

Respectfully submitted.

  
**[Name of Counsel]**  
Counsel for the Accused  
[IBP Number, PTR Number, Roll Number, MCLE Compliance Number]  
[Law Office Address]  
[Contact Number / Email Address]

  
**Copy furnished:**  
[Prosecutor's Name]  
Office of the City/Provincial Prosecutor  
[Address]  

---

# VERIFICATION AND CERTIFICATION OF NON-FORUM SHOPPING

I, **[Name of Accused]**, of legal age, Filipino, and a resident of **[Address]**, after being duly sworn, depose and state that:

1. I have caused the preparation of the foregoing Motion to Dismiss;
2. I have read and understood its contents, and the allegations therein are true and correct based on my personal knowledge and/or based on authentic records;
3. I hereby certify that I have not commenced any other action or proceeding involving the same issues in the Supreme Court, Court of Appeals, or any tribunal or agency; and
4. If I should learn that a similar action or proceeding has been filed or is pending before these courts or tribunals, I shall inform this Honorable Court within five (5) days from such notice.

IN WITNESS WHEREOF, I have hereunto set my hand this ___ day of ___________, 20__ at _____________, Philippines.

  
**[Signature of Accused]**  
[Name of Accused]

SUBSCRIBED AND SWORN to before me this ___ day of ___________, 20__, affiant exhibiting to me his/her competent evidence of identity, namely, **[ID Type and Number]** issued on **[Date]** at **[Place of Issue]**.

  
**[Signature of Notary Public]**  
[Name of Notary Public]  
[Commission Number and Validity]  
[Office Address]
`;

const STATIC_RESPONSES: Record<string, string> = {
  "affidavit": AFFIDAVIT_RESPONSE,
  "motion": MOTION_RESPONSE,
  "complaint": "This is a complaint drafted for breach of contract.",
  "demand-letter": "This is a sample demand letter for unpaid services.",
  "contract": "This is a basic employment contract template.",
  "retainer": "This is a retainer agreement for legal services."
};

export default function LegalDraftingModal({ onClose }: LegalDraftingModalProps) {
  const [activeTab, setActiveTab] = useState<"create" | "configure" | "preview">("create")
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [documentName, setDocumentName] = useState("Legal Document Drafting")
  const [description, setDescription] = useState("")
  const [instructions, setInstructions] = useState(`**Context**
You are an AI assistant designed to help Philippine Litigation Lawyers draft legal documents. You have access to templates for various legal documents commonly used in the Philippines, including pleadings, motions, briefs, and contracts.

**Instructions**
Conversations with your GPT can potentially include part or all of the instructions provided.`)
  const [chatMessage, setChatMessage] = useState("")
  const [chatHistory, setChatHistory] = useState<{ sender: 'user' | 'assistant'; text: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const messageEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, isLoading]);

  const tabs = [
    { id: "create" as const, name: "Create", icon: Sparkles },
    { id: "configure" as const, name: "Configure", icon: Settings },
    { id: "preview" as const, name: "Preview", icon: Eye },
  ]

  function handleTemplateSelect(templateId: string, name: string, desc: string) {
    setSelectedTemplate(templateId);
    setDocumentName(name);
    setDescription(desc);

    const userPrompt = CONVERSATION_STARTERS.find(s => s.toLowerCase().includes(name.toLowerCase()));
    const assistantResponse = STATIC_RESPONSES[templateId];

    if (userPrompt && assistantResponse) {
      setChatHistory(prev => [...prev, { sender: 'user', text: userPrompt }]);
      setTimeout(() => {
        setChatHistory(prev => [...prev, { sender: 'assistant', text: assistantResponse }]);
      }, 500); // 500ms delay
    }
  }

  async function sendMessage() {
    if (!chatMessage.trim()) return;

    const newMessage = { sender: 'user', text: chatMessage };
    const updatedMessages = [...chatHistory, newMessage];
    setChatHistory(updatedMessages);
    setChatMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai-agent/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages,
          customPrompt: instructions,
        }),
      });

      const data = await response.json();

      if (response.ok && data.response) {
        setChatHistory([...updatedMessages, { sender: 'assistant', text: data.response }]);
      } else {
        setChatHistory([
          ...updatedMessages,
          { sender: 'assistant', text: `Error: ${data.details || 'Unknown error'}` },
        ]);
      }
    } catch (err) {
      setChatHistory([
        ...updatedMessages,
        { sender: 'assistant', text: 'Network error or server is unreachable.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-white dark:bg-[#0F0F12] z-100 flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-[#1F1F23]">
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          <div>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">{documentName}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">● Draft</p>
          </div>
        </div>
        
      </div>
      <div className="flex border-b border-gray-200 dark:border-[#1F1F23] px-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? "border-gray-900 dark:border-gray-100 text-gray-900 dark:text-white"
                : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.name}
          </button>
        ))}
      </div>
      <div className="flex-1 flex overflow-hidden">
        <div className="w-1/2 border-r border-gray-200 dark:border-[#1F1F23] overflow-y-auto p-6">
          {activeTab === "create" && (
            <div className="grid grid-cols-1 gap-3 max-w-md mx-auto">
              {DOCUMENT_TEMPLATES.map((template) => (
                <button
                  key={template.id}
                  onClick={() => handleTemplateSelect(template.id, template.name, template.description)}
                  className={`p-4 text-left border rounded-lg transition-colors ${
                    selectedTemplate === template.id
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                      : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{template.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{template.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {activeTab === "configure" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-1">Name</label>
                <input
                  type="text"
                  value={documentName}
                  onChange={(e) => setDocumentName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-1">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-1">Instructions</label>
                <textarea
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white font-mono"
                />
              </div>
            </div>
          )}

          {activeTab === "preview" && (
            <div className="text-center text-gray-600 dark:text-gray-400 mt-10">
              Preview mode will show a sample interaction once a template is selected.
            </div>
          )}
        </div>

        <div className="w-1/2 flex flex-col bg-gray-50 dark:bg-gray-900/50">
          <div className="p-6 text-center border-b border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-[#0F0F12]">
            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center mx-auto mb-3">
              <FileText className="w-6 h-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{documentName}</h3>
            {description && <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{description}</p>}
          </div>

          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 p-6 space-y-4 overflow-y-auto">
              {chatHistory.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg ${
                    msg.sender === 'user'
                      ? 'bg-blue-100 dark:bg-blue-900/20 text-right ml-auto max-w-[80%]'
                      : 'bg-gray-100 dark:bg-gray-800/70 text-left mr-auto max-w-[80%]'
                  }`}
                >
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              ))}
              {isLoading && <div className="text-sm text-gray-400 italic">Thinking...</div>}
              <div ref={messageEndRef} />
            </div>

            <div className="p-4 border-t border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-[#0F0F12]">
              <div className="flex items-center gap-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                    placeholder="Ask anything"
                    className="w-full px-4 py-3 pr-20 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                      <Mic className="w-4 h-4 text-gray-400" />
                    </button>
                    <button
                      disabled={!chatMessage.trim() || isLoading}
                      onClick={sendMessage}
                      className="p-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
