import { Link } from "react-router-dom"
import { Zap, Globe, MessageCircle, Mail } from "lucide-react"

const toolLinks = [
  { name: "Curriculum Planner", path: "/tools/curriculum-planner" },
  { name: "Therapy Intake", path: "/tools/therapy-intake" },
  { name: "Compliance Checker", path: "/tools/compliance-checker" },
  { name: "Inventory Calculator", path: "/tools/inventory-calculator" },
]

const companyLinks = [
  { name: "Pricing", path: "/pricing" },
  { name: "About", path: "#" },
  { name: "Blog", path: "#" },
  { name: "Contact", path: "#" },
]

export default function Footer() {
  return (
    <footer className="bg-[#1A1A2E] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <span className="text-xl font-bold">NicheTools</span>
            </Link>
            <p className="mt-3 text-sm text-white/60">
              Hyper-specific tools built for specific professions, not everyone.
            </p>
          </div>

          {/* Tools */}
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/40">Tools</h4>
            <ul className="space-y-2">
              {toolLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-white/70 transition hover:text-white">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/40">Company</h4>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm text-white/70 transition hover:text-white">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/40">Connect</h4>
            <div className="flex gap-3">
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 transition hover:bg-white/20">
                <Globe className="h-4 w-4" />
              </a>
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 transition hover:bg-white/20">
                <MessageCircle className="h-4 w-4" />
              </a>
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 transition hover:bg-white/20">
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-white/40">
          &copy; {new Date().getFullYear()} NicheTools. All rights reserved. Built for the specialists.
        </div>
      </div>
    </footer>
  )
}
