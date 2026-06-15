import { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Check, Sparkles, Zap, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { tools } from "@/data/tools"

const features = [
  "Full tool access",
  "Unlimited generations",
  "Export & print",
  "Email support",
  "Priority support",
  "New tools early access",
  "Custom branding",
  "API access",
]

export default function Pricing() {
  const [annual, setAnnual] = useState(false)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
        <Badge variant="secondary" className="mb-4">
          <Sparkles className="mr-1 h-3.5 w-3.5" />
          Simple Pricing
        </Badge>
        <h1 className="text-4xl font-bold text-[#1A1A2E]">Choose Your Plan</h1>
        <p className="mx-auto mt-4 max-w-xl text-gray-600">
          Start with a single tool or unlock everything. Switch or cancel anytime.
        </p>

        {/* Toggle */}
        <div className="mt-8 inline-flex items-center rounded-full border border-[#E8EAF0] bg-white p-1">
          <button
            onClick={() => setAnnual(false)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition ${
              !annual ? "bg-[#1A1A2E] text-white" : "text-gray-600 hover:text-[#1A1A2E]"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setAnnual(true)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition ${
              annual ? "bg-[#1A1A2E] text-white" : "text-gray-600 hover:text-[#1A1A2E]"
            }`}
          >
            Annual
            <Badge variant="success" className="ml-2 text-xs">Save 20%</Badge>
          </button>
        </div>
      </motion.div>

      {/* Pricing Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {tools.map((tool) => (
          <motion.div key={tool.id} variants={itemVariants}>
            <Card className="h-full border-[#E8EAF0]" style={{ borderTop: `4px solid ${tool.color}` }}>
              <CardContent className="p-6">
                <p className="mb-1 text-xs font-medium" style={{ color: tool.color }}>{tool.audience}</p>
                <h3 className="mb-1 text-lg font-semibold text-[#1A1A2E]">{tool.name}</h3>
                <div className="mb-4 flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-[#1A1A2E]">
                    ${annual ? Math.round(tool.price * 0.8) : tool.price}
                  </span>
                  <span className="text-gray-500">/mo</span>
                </div>
                {annual && (
                  <p className="mb-3 text-xs text-gray-500">
                    Billed annually (${Math.round(tool.price * 0.8 * 12)}/year)
                  </p>
                )}
                <ul className="mb-6 space-y-2">
                  <li className="flex items-center gap-2 text-sm text-gray-700">
                    <Check className="h-4 w-4" style={{ color: tool.color }} />
                    Full tool access
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-700">
                    <Check className="h-4 w-4" style={{ color: tool.color }} />
                    Unlimited use
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-700">
                    <Check className="h-4 w-4" style={{ color: tool.color }} />
                    Export & print
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-700">
                    <Check className="h-4 w-4" style={{ color: tool.color }} />
                    Email support
                  </li>
                </ul>
                <Link to={`/tools/${tool.id}`}>
                  <Button variant="outline" className="w-full" style={{ borderColor: tool.color, color: tool.color }}>
                    Get Started
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Bundle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mx-auto mb-12 max-w-2xl"
      >
        <Card className="border-[#1A1A2E] bg-[#1A1A2E]">
          <CardContent className="p-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <Badge className="mb-3 bg-white text-[#1A1A2E]">Best Value</Badge>
            <h2 className="mb-1 text-2xl font-bold text-white">All Tools Bundle</h2>
            <p className="mb-4 text-white/60">Unlock every niche tool on the platform</p>
            <div className="mb-2 flex items-baseline justify-center gap-1">
              <span className="text-5xl font-bold text-white">${annual ? 79 : 99}</span>
              <span className="text-white/60">/mo</span>
            </div>
            {annual && (
              <p className="mb-4 text-sm text-white/50">Billed annually (${79 * 12}/year, save $480)</p>
            )}
            <p className="mb-6 text-sm text-white/50">
              All 4 tools individually: ${tools.reduce((s, t) => s + (annual ? Math.round(t.price * 0.8) : t.price), 0)}/mo
            </p>
            <ul className="mx-auto mb-6 grid max-w-sm grid-cols-2 gap-2 text-left">
              {features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-white/80">
                  <Check className="h-4 w-4 shrink-0 text-curriculum" />
                  {f}
                </li>
              ))}
            </ul>
            <Button size="lg" className="gap-2 bg-white text-[#1A1A2E] hover:bg-gray-100">
              Get All Tools
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto max-w-4xl"
      >
        <h2 className="mb-6 text-center text-2xl font-bold text-[#1A1A2E]">Feature Comparison</h2>
        <Card className="border-[#E8EAF0]">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#E8EAF0] bg-gray-50">
                    <th className="px-6 py-3 text-left font-semibold text-[#1A1A2E]">Feature</th>
                    <th className="px-6 py-3 text-center font-semibold text-[#1A1A2E]">Single Tool</th>
                    <th className="px-6 py-3 text-center font-semibold text-white bg-[#1A1A2E] rounded-t-lg">All Tools</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: "Tool Access", single: "1 tool", bundle: "All 4 tools" },
                    { feature: "Monthly Generations", single: "Unlimited", bundle: "Unlimited" },
                    { feature: "Export (PDF, Print)", single: true, bundle: true },
                    { feature: "Email Support", single: true, bundle: true },
                    { feature: "Priority Support", single: false, bundle: true },
                    { feature: "New Tools Early Access", single: false, bundle: true },
                    { feature: "Custom Branding", single: false, bundle: true },
                    { feature: "API Access", single: false, bundle: true },
                  ].map((row) => (
                    <tr key={row.feature} className="border-b border-gray-50 last:border-0">
                      <td className="px-6 py-3 font-medium text-[#1A1A2E]">{row.feature}</td>
                      <td className="px-6 py-3 text-center">
                        {typeof row.single === "boolean" ? (
                          row.single ? (
                            <Check className="mx-auto h-4 w-4 text-curriculum" />
                          ) : (
                            <span className="text-gray-300">-</span>
                          )
                        ) : (
                          <span className="text-gray-600">{row.single}</span>
                        )}
                      </td>
                      <td className="px-6 py-3 text-center bg-gray-50/50">
                        {typeof row.bundle === "boolean" ? (
                          row.bundle ? (
                            <Check className="mx-auto h-4 w-4 text-curriculum" />
                          ) : (
                            <span className="text-gray-300">-</span>
                          )
                        ) : (
                          <span className="font-medium text-[#1A1A2E]">{row.bundle}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
