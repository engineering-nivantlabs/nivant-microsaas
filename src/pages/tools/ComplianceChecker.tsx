import { useState } from "react"
import { motion } from "framer-motion"
import { Shield, AlertTriangle, CheckCircle, ArrowRight, FileSearch } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ComplianceIssue {
  id: string
  phrase: string
  suggestion: string
  severity: "high" | "medium" | "low"
  rule: string
}

const defaultText = `Are you looking for the best investment returns? Our fund guarantees 15% annual growth with zero risk. Contact us today to start making huge profits. We promise you'll get rich quick with our exclusive strategy.

This is a limited time offer. Don't wait - secure your financial future now. Our advisors can ensure you never lose money. The market always goes up with our proven system.

Disclaimer: Past performance does not guarantee future results. Please consult with a licensed financial advisor before making investment decisions.`

const mockIssues: ComplianceIssue[] = [
  {
    id: "1",
    phrase: "guarantees 15% annual growth",
    suggestion: "Replace with historical performance data and add disclaimers.",
    severity: "high",
    rule: "FINRA 2210 - No guaranteed returns",
  },
  {
    id: "2",
    phrase: "zero risk",
    suggestion: "All investments carry risk. Remove or qualify with appropriate disclaimers.",
    severity: "high",
    rule: "SEC Rule 156 - Misleading statements",
  },
  {
    id: "3",
    phrase: "get rich quick",
    suggestion: "Remove unrealistic expectation language.",
    severity: "high",
    rule: "FINRA 2210 - Exaggerated claims",
  },
  {
    id: "4",
    phrase: "huge profits",
    suggestion: "Use measured language. Replace with 'potential returns'.",
    severity: "medium",
    rule: "FINRA 2210 - Promissory language",
  },
  {
    id: "5",
    phrase: "never lose money",
    suggestion: "Remove absolute claim. All investments involve risk of loss.",
    severity: "high",
    rule: "SEC Rule 156 - Prohibited guarantees",
  },
  {
    id: "6",
    phrase: "limited time offer",
    suggestion: "If genuine, include specific end date. Avoid pressure tactics.",
    severity: "low",
    rule: "FINRA 2210 - Urgency language",
  },
  {
    id: "7",
    phrase: "The market always goes up",
    suggestion: "Remove false certainty. Markets fluctuate.",
    severity: "high",
    rule: "SEC Rule 156 - Factual misrepresentation",
  },
]

function highlightIssues(text: string, issues: ComplianceIssue[]) {
  let result = text
  issues.forEach((issue) => {
    const color = issue.severity === "high" ? "#E23E3E" : issue.severity === "medium" ? "#E6A23C" : "#2B6CB0"
    result = result.replace(
      issue.phrase,
      `<mark style="background-color: ${color}22; color: ${color}; border-bottom: 2px solid ${color}; border-radius: 2px; padding: 0 2px;">${issue.phrase}</mark>`
    )
  })
  return result
}

export default function ComplianceChecker() {
  const [text, setText] = useState(defaultText)
  const [checked, setChecked] = useState(true)
  const [activeIssue, setActiveIssue] = useState<string | null>(null)

  const handleCheck = () => {
    setChecked(true)
  }

  const highCount = mockIssues.filter((i) => i.severity === "high").length
  const mediumCount = mockIssues.filter((i) => i.severity === "medium").length
  const lowCount = mockIssues.filter((i) => i.severity === "low").length

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-compliance-light text-compliance">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#1A1A2E]">Financial Content Compliance Checker</h1>
            <p className="text-sm text-gray-500">Scan your content for compliance issues before publishing</p>
          </div>
        </div>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        {/* Editor */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
          <Card className="border-[#E8EAF0]">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileSearch className="h-4 w-4 text-compliance" />
                  Content Editor
                </CardTitle>
                <Button variant="blue" size="sm" className="gap-1.5" onClick={handleCheck}>
                  <Shield className="h-4 w-4" />
                  Check Compliance
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={18}
                className="w-full resize-none rounded-lg border border-[#E8EAF0] p-4 font-mono text-sm leading-relaxed outline-none transition focus:border-compliance focus:ring-2 focus:ring-compliance/20"
              />
            </CardContent>
          </Card>
        </motion.div>

        {/* Results Sidebar */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }} className="space-y-4">
          {/* Summary */}
          {checked && (
            <Card className="border-[#E8EAF0]">
              <CardContent className="p-4">
                <h3 className="mb-3 text-sm font-semibold text-[#1A1A2E]">Scan Results</h3>
                <div className="grid grid-cols-3 gap-2">
                  <div className="rounded-lg bg-red-50 p-2 text-center">
                    <div className="text-2xl font-bold text-red-600">{highCount}</div>
                    <div className="text-xs text-red-600">High</div>
                  </div>
                  <div className="rounded-lg bg-yellow-50 p-2 text-center">
                    <div className="text-2xl font-bold text-yellow-600">{mediumCount}</div>
                    <div className="text-xs text-yellow-600">Medium</div>
                  </div>
                  <div className="rounded-lg bg-blue-50 p-2 text-center">
                    <div className="text-2xl font-bold text-blue-600">{lowCount}</div>
                    <div className="text-xs text-blue-600">Low</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Highlighted Preview */}
          {checked && (
            <Card className="border-[#E8EAF0]">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Highlighted Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className="max-h-[200px] overflow-y-auto rounded-lg bg-gray-50 p-3 text-xs leading-relaxed text-gray-700"
                  dangerouslySetInnerHTML={{ __html: highlightIssues(text, mockIssues).replace(/\n/g, "<br/>") }}
                />
              </CardContent>
            </Card>
          )}

          {/* Issues List */}
          {checked && (
            <Card className="border-[#E8EAF0]">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Suggestions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 p-4 pt-0">
                {mockIssues.map((issue) => (
                  <button
                    key={issue.id}
                    onClick={() => setActiveIssue(activeIssue === issue.id ? null : issue.id)}
                    className={`w-full rounded-lg border p-3 text-left transition ${
                      activeIssue === issue.id
                        ? issue.severity === "high" ? "border-red-300 bg-red-50" :
                          issue.severity === "medium" ? "border-yellow-300 bg-yellow-50" :
                          "border-blue-300 bg-blue-50"
                        : "border-[#E8EAF0] hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {issue.severity === "high" ? (
                        <AlertTriangle className="h-4 w-4 shrink-0 text-red-500" />
                      ) : issue.severity === "medium" ? (
                        <AlertTriangle className="h-4 w-4 shrink-0 text-yellow-500" />
                      ) : (
                        <CheckCircle className="h-4 w-4 shrink-0 text-blue-500" />
                      )}
                      <Badge
                        variant={
                          issue.severity === "high" ? "error" :
                          issue.severity === "medium" ? "warning" :
                          "blue"
                        }
                        className="text-xs"
                      >
                        {issue.severity}
                      </Badge>
                    </div>
                    <p className="mt-1.5 text-xs font-medium text-[#1A1A2E]">&ldquo;{issue.phrase}&rdquo;</p>
                    <AnimatePresence>
                      {activeIssue === issue.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-2 space-y-1.5 overflow-hidden"
                        >
                          <p className="text-xs text-gray-600">{issue.suggestion}</p>
                          <p className="text-xs text-gray-400">Rule: {issue.rule}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                ))}
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  )
}
