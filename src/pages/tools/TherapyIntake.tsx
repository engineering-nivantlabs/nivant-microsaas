import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, GripVertical, Eye, FileText, Trash2, Plus, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface FormField {
  id: string
  type: string
  label: string
  required: boolean
}

const fieldTypes = [
  { type: "text", label: "Text Field" },
  { type: "textarea", label: "Text Area" },
  { type: "email", label: "Email" },
  { type: "phone", label: "Phone Number" },
  { type: "date", label: "Date" },
  { type: "select", label: "Dropdown" },
  { type: "checkbox", label: "Checkboxes" },
  { type: "insurance", label: "Insurance Info" },
  { type: "symptoms", label: "Symptoms Checklist" },
  { type: "history", label: "Medical History" },
]

const mockSubmissions = [
  { id: 1, name: "Alice Johnson", date: "2024-06-10", status: "New", insurance: "BlueCross" },
  { id: 2, name: "Robert Smith", date: "2024-06-09", status: "Reviewed", insurance: "Aetna" },
  { id: 3, name: "Maria Garcia", date: "2024-06-08", status: "Reviewed", insurance: "UnitedHealth" },
  { id: 4, name: "David Lee", date: "2024-06-07", status: "Flagged", insurance: "Cigna" },
  { id: 5, name: "Susan Brown", date: "2024-06-06", status: "Reviewed", insurance: "BlueCross" },
]

export default function TherapyIntake() {
  const [fields, setFields] = useState<FormField[]>([
    { id: "1", type: "text", label: "Full Name", required: true },
    { id: "2", type: "email", label: "Email Address", required: true },
    { id: "3", type: "phone", label: "Phone Number", required: true },
    { id: "4", type: "date", label: "Date of Birth", required: true },
    { id: "5", type: "insurance", label: "Insurance Provider", required: false },
    { id: "6", type: "symptoms", label: "Current Symptoms", required: true },
    { id: "7", type: "history", label: "Previous Therapy History", required: false },
    { id: "8", type: "textarea", label: "Reason for Seeking Therapy", required: true },
  ])
  const [previewMode, setPreviewMode] = useState(false)
  const [showSubmissions, setShowSubmissions] = useState(false)

  const addField = (type: string, label: string) => {
    const newField: FormField = {
      id: Date.now().toString(),
      type,
      label,
      required: false,
    }
    setFields([...fields, newField])
  }

  const removeField = (id: string) => {
    setFields(fields.filter((f) => f.id !== id))
  }

  const toggleRequired = (id: string) => {
    setFields(fields.map((f) => f.id === id ? { ...f, required: !f.required } : f))
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-therapy-light text-therapy">
              <Heart className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#1A1A2E]">Therapy Client Intake System</h1>
              <p className="text-sm text-gray-500">Build custom intake forms and manage client submissions</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant={previewMode ? "default" : "outline"}
              size="sm"
              className="gap-1.5"
              onClick={() => { setPreviewMode(!previewMode); setShowSubmissions(false) }}
            >
              <Eye className="h-4 w-4" />
              {previewMode ? "Edit" : "Preview"}
            </Button>
            <Button
              variant={showSubmissions ? "default" : "outline"}
              size="sm"
              className="gap-1.5"
              onClick={() => { setShowSubmissions(!showSubmissions); setPreviewMode(false) }}
            >
              <FileText className="h-4 w-4" />
              Responses
            </Button>
          </div>
        </div>
      </motion.div>

      {showSubmissions ? (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="border-[#E8EAF0]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Client Submissions</CardTitle>
                <Button variant="outline" size="sm" className="gap-1.5">
                  <Download className="h-4 w-4" />
                  Export PDF
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#E8EAF0]">
                      <th className="pb-3 text-left font-medium text-gray-500">Client</th>
                      <th className="pb-3 text-left font-medium text-gray-500">Date</th>
                      <th className="pb-3 text-left font-medium text-gray-500">Insurance</th>
                      <th className="pb-3 text-left font-medium text-gray-500">Status</th>
                      <th className="pb-3 text-right font-medium text-gray-500">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockSubmissions.map((s) => (
                      <tr key={s.id} className="border-b border-gray-50 last:border-0">
                        <td className="py-3 font-medium text-[#1A1A2E]">{s.name}</td>
                        <td className="py-3 text-gray-600">{s.date}</td>
                        <td className="py-3 text-gray-600">{s.insurance}</td>
                        <td className="py-3">
                          <Badge
                            variant={
                              s.status === "New" ? "purple" :
                              s.status === "Flagged" ? "error" :
                              "secondary"
                            }
                          >
                            {s.status}
                          </Badge>
                        </td>
                        <td className="py-3 text-right">
                          <Button variant="ghost" size="sm">View</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          {/* Field Palette */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <Card className="border-[#E8EAF0]">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Field Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {fieldTypes.map((ft) => (
                    <button
                      key={ft.type}
                      onClick={() => addField(ft.type, ft.label)}
                      className="flex items-center gap-2 rounded-lg border border-[#E8EAF0] px-3 py-2.5 text-xs font-medium text-gray-700 transition hover:bg-therapy-light hover:border-therapy hover:text-therapy"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      {ft.label}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Form Builder / Preview */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
            <Card className="border-[#E8EAF0]">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">
                  {previewMode ? "Form Preview" : "Intake Form Builder"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6 text-center">
                  <h3 className="text-xl font-semibold text-[#1A1A2E]">Client Intake Form</h3>
                  <p className="text-sm text-gray-500">Please fill out all required fields</p>
                </div>

                <AnimatePresence mode="popLayout">
                  {fields.map((field) => (
                    <motion.div
                      key={field.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="mb-4 rounded-lg border border-[#E8EAF0] p-4"
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {!previewMode && <GripVertical className="h-4 w-4 text-gray-400 cursor-grab" />}
                          <label className="text-sm font-medium text-[#1A1A2E]">
                            {field.label}
                            {field.required && <span className="ml-1 text-red-500">*</span>}
                          </label>
                        </div>
                        {!previewMode && (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => toggleRequired(field.id)}
                              className={`rounded px-2 py-1 text-xs transition ${
                                field.required ? "bg-therapy-light text-therapy font-medium" : "text-gray-400 hover:text-gray-600"
                              }`}
                            >
                              Required
                            </button>
                            <button
                              onClick={() => removeField(field.id)}
                              className="rounded p-1 text-gray-400 transition hover:bg-red-50 hover:text-red-500"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        )}
                      </div>

                      {field.type === "text" || field.type === "email" || field.type === "phone" || field.type === "date" ? (
                        <input
                          type={field.type === "phone" ? "tel" : field.type}
                          disabled={!previewMode}
                          placeholder={previewMode ? `Enter ${field.label.toLowerCase()}` : ""}
                          className="w-full rounded-lg border border-[#E8EAF0] px-3 py-2 text-sm outline-none transition focus:border-therapy focus:ring-2 focus:ring-therapy/20 disabled:bg-gray-50"
                        />
                      ) : field.type === "textarea" ? (
                        <textarea
                          disabled={!previewMode}
                          rows={3}
                          placeholder={previewMode ? `Enter ${field.label.toLowerCase()}` : ""}
                          className="w-full rounded-lg border border-[#E8EAF0] px-3 py-2 text-sm outline-none transition focus:border-therapy focus:ring-2 focus:ring-therapy/20 disabled:bg-gray-50"
                        />
                      ) : field.type === "insurance" ? (
                        <select
                          disabled={!previewMode}
                          className="w-full rounded-lg border border-[#E8EAF0] px-3 py-2 text-sm outline-none transition focus:border-therapy focus:ring-2 focus:ring-therapy/20 disabled:bg-gray-50"
                        >
                          <option>Select insurance provider</option>
                          <option>BlueCross BlueShield</option>
                          <option>Aetna</option>
                          <option>UnitedHealthcare</option>
                          <option>Cigna</option>
                          <option>Kaiser Permanente</option>
                          <option>Self-Pay</option>
                        </select>
                      ) : field.type === "symptoms" ? (
                        <div className="space-y-1.5">
                          {["Anxiety", "Depression", "Stress", "Sleep Issues", "Relationship Problems", "Trauma"].map((s) => (
                            <label key={s} className="flex items-center gap-2 text-sm text-gray-700">
                              <input type="checkbox" disabled={!previewMode} className="rounded border-gray-300" />
                              {s}
                            </label>
                          ))}
                        </div>
                      ) : field.type === "history" ? (
                        <div className="space-y-2">
                          <label className="flex items-center gap-2 text-sm text-gray-700">
                            <input type="radio" name={`history-${field.id}`} disabled={!previewMode} className="border-gray-300" />
                            First time seeking therapy
                          </label>
                          <label className="flex items-center gap-2 text-sm text-gray-700">
                            <input type="radio" name={`history-${field.id}`} disabled={!previewMode} className="border-gray-300" />
                            Have been in therapy before
                          </label>
                          <label className="flex items-center gap-2 text-sm text-gray-700">
                            <input type="radio" name={`history-${field.id}`} disabled={!previewMode} className="border-gray-300" />
                            Currently in therapy elsewhere
                          </label>
                        </div>
                      ) : field.type === "select" ? (
                        <select
                          disabled={!previewMode}
                          className="w-full rounded-lg border border-[#E8EAF0] px-3 py-2 text-sm outline-none transition focus:border-therapy focus:ring-2 focus:ring-therapy/20 disabled:bg-gray-50"
                        >
                          <option>Select an option</option>
                          <option>Option 1</option>
                          <option>Option 2</option>
                          <option>Option 3</option>
                        </select>
                      ) : field.type === "checkbox" ? (
                        <div className="space-y-1.5">
                          {["Option A", "Option B", "Option C"].map((opt) => (
                            <label key={opt} className="flex items-center gap-2 text-sm text-gray-700">
                              <input type="checkbox" disabled={!previewMode} className="rounded border-gray-300" />
                              {opt}
                            </label>
                          ))}
                        </div>
                      ) : null}
                    </motion.div>
                  ))}
                </AnimatePresence>

                {previewMode && (
                  <Button variant="purple" className="mt-4 w-full">
                    Submit Intake Form
                  </Button>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      )}
    </div>
  )
}
