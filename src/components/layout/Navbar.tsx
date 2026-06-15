import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

const tools = [
  { name: "Curriculum Planner", path: "/tools/curriculum-planner", color: "text-curriculum", dot: "#2D9C5B" },
  { name: "Therapy Intake", path: "/tools/therapy-intake", color: "text-therapy", dot: "#7B5EA7" },
  { name: "Compliance Checker", path: "/tools/compliance-checker", color: "text-compliance", dot: "#2B6CB0" },
  { name: "Inventory Calculator", path: "/tools/inventory-calculator", color: "text-inventory", dot: "#E66C3A" },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [toolsOpen, setToolsOpen] = useState(false)
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-[#E8EAF0] bg-white/92 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1A1A2E]">
            <Zap className="h-4 w-4 text-white" />
          </div>
          <span className="text-xl font-bold text-[#1A1A2E]">NicheTools</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-1 md:flex">
          <div
            className="relative"
            onMouseEnter={() => setToolsOpen(true)}
            onMouseLeave={() => setToolsOpen(false)}
          >
            <button className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-[#1A1A2E] transition hover:bg-gray-100">
              Tools
              <ChevronDown className={`h-4 w-4 transition-transform ${toolsOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {toolsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 top-full mt-1 w-64 rounded-xl border border-[#E8EAF0] bg-white p-2 shadow-lg"
                >
                  {tools.map((tool) => (
                    <Link
                      key={tool.path}
                      to={tool.path}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition hover:bg-gray-50 ${
                        isActive(tool.path) ? "bg-gray-50 font-medium" : ""
                      }`}
                      onClick={() => setToolsOpen(false)}
                    >
                      <div className="h-2 w-2 rounded-full" style={{ backgroundColor: tool.dot }} />
                      <span className={tool.color}>{tool.name}</span>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Link
            to="/pricing"
            className={`rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-gray-100 ${
              isActive("/pricing") ? "bg-gray-100" : "text-[#1A1A2E]"
            }`}
          >
            Pricing
          </Link>
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Link to="/pricing">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="rounded-lg p-2 text-[#1A1A2E] md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b border-[#E8EAF0] bg-white md:hidden"
          >
            <div className="space-y-1 px-4 py-3">
              <p className="px-3 py-1 text-xs font-semibold uppercase text-gray-400">Tools</p>
              {tools.map((tool) => (
                <Link
                  key={tool.path}
                  to={tool.path}
                  className="block rounded-lg px-3 py-2 text-sm text-[#1A1A2E] hover:bg-gray-50"
                  onClick={() => setMobileOpen(false)}
                >
                  {tool.name}
                </Link>
              ))}
              <div className="my-2 border-t border-gray-100" />
              <Link
                to="/pricing"
                className="block rounded-lg px-3 py-2 text-sm font-medium text-[#1A1A2E] hover:bg-gray-50"
                onClick={() => setMobileOpen(false)}
              >
                Pricing
              </Link>
              <Link to="/pricing" onClick={() => setMobileOpen(false)}>
                <Button className="mt-2 w-full" size="sm">Get Started</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
