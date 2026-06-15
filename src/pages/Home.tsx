import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import {
  BookOpen, Heart, Shield, ShoppingBag, ArrowRight, Check, Star,
  Sparkles, Users, Clock
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { tools, testimonials } from "@/data/tools"

const iconMap: Record<string, React.ReactNode> = {
  BookOpen: <BookOpen className="h-6 w-6" />,
  Heart: <Heart className="h-6 w-6" />,
  Shield: <Shield className="h-6 w-6" />,
  ShoppingBag: <ShoppingBag className="h-6 w-6" />,
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
}

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #F8F9FC 0%, #E8F5EE 25%, #F0EBF5 50%, #EBF2FA 75%, #FDF0EB 100%)" }}>
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="text-center"
          >
            <Badge variant="secondary" className="mb-4 text-sm">
              <Sparkles className="mr-1 h-3.5 w-3.5" />
              4 Niche Tools, Zero Fluff
            </Badge>
            <h1 className="text-4xl font-extrabold tracking-tight text-[#1A1A2E] sm:text-5xl lg:text-6xl">
              Niche Tools That Just Work
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
              Built for specific professions, not everyone. Four hyper-focused tools designed for the people who actually need them.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link to="/pricing">
                <Button size="lg" className="gap-2">
                  Explore Tools
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/tools/curriculum-planner">
                <Button variant="outline" size="lg">
                  Try Curriculum Planner
                </Button>
              </Link>
            </div>
            <div className="mt-10 flex items-center justify-center gap-6 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-curriculum" />
                No credit card required
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-curriculum" />
                Cancel anytime
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-b border-[#E8EAF0] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-8 md:grid-cols-4"
          >
            {[
              { icon: <Users className="h-5 w-5" />, value: "2,400+", label: "Active Users" },
              { icon: <Sparkles className="h-5 w-5" />, value: "4", label: "Specialized Tools" },
              { icon: <Star className="h-5 w-5" />, value: "4.9", label: "Average Rating" },
              { icon: <Clock className="h-5 w-5" />, value: "10hrs", label: "Saved Per Week" },
            ].map((stat) => (
              <motion.div key={stat.label} variants={itemVariants} className="text-center">
                <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-[#1A1A2E]">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-[#1A1A2E]">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tool Cards */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-bold text-[#1A1A2E]">Built for Your Profession</h2>
            <p className="mt-3 text-gray-600">Each tool is crafted for a specific audience — no bloat, no irrelevant features.</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {tools.map((tool) => (
              <motion.div key={tool.id} variants={itemVariants}>
                <Link to={`/tools/${tool.id}`}>
                  <Card className="group h-full cursor-pointer overflow-hidden border-[#E8EAF0] hover:-translate-y-1 hover:shadow-lg" style={{ borderTop: `4px solid ${tool.color}` }}>
                    <CardContent className="p-6">
                      <div
                        className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
                        style={{ backgroundColor: tool.bgColor, color: tool.color }}
                      >
                        {iconMap[tool.icon]}
                      </div>
                      <p className="mb-1 text-xs font-medium" style={{ color: tool.color }}>{tool.audience}</p>
                      <h3 className="mb-2 text-lg font-semibold text-[#1A1A2E]">{tool.name}</h3>
                      <p className="mb-4 text-sm text-gray-600">{tool.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-[#1A1A2E]">${tool.price}<span className="text-sm font-normal text-gray-400">/mo</span></span>
                        <ArrowRight className="h-4 w-4 text-gray-400 transition group-hover:text-[#1A1A2E]" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-[#F1F3F8] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-bold text-[#1A1A2E]">How It Works</h2>
            <p className="mt-3 text-gray-600">Pick a tool, customize it to your needs, and get results in minutes.</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-8 md:grid-cols-3"
          >
            {[
              { step: "01", title: "Choose Your Tool", desc: "Select the niche tool that matches your profession and specific needs." },
              { step: "02", title: "Customize & Input", desc: "Fill in your details, preferences, and data — each tool adapts to you." },
              { step: "03", title: "Get Results", desc: "Generate plans, forms, compliance reports, or inventory insights instantly." },
            ].map((s) => (
              <motion.div key={s.step} variants={itemVariants} className="relative text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1A1A2E] text-xl font-bold text-white">
                  {s.step}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-[#1A1A2E]">{s.title}</h3>
                <p className="text-sm text-gray-600">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-bold text-[#1A1A2E]">Simple, Transparent Pricing</h2>
            <p className="mt-3 text-gray-600">Start with one tool, or unlock them all with the bundle.</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2"
          >
            <motion.div variants={itemVariants}>
              <Card className="h-full border-[#E8EAF0]">
                <CardContent className="p-6">
                  <Badge variant="secondary" className="mb-3">Single Tool</Badge>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-[#1A1A2E]">$49</span>
                    <span className="text-gray-500">/month</span>
                  </div>
                  <p className="mb-4 text-sm text-gray-600">Pick any one tool and get full access.</p>
                  <ul className="mb-6 space-y-2">
                    {["Full tool access", "Unlimited generations", "Export & print", "Email support"].map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                        <Check className="h-4 w-4 text-curriculum" />{f}
                      </li>
                    ))}
                  </ul>
                  <Link to="/pricing">
                    <Button variant="outline" className="w-full">View Details</Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Card className="h-full border-[#1A1A2E] bg-[#1A1A2E]">
                <CardContent className="p-6">
                  <Badge className="mb-3 bg-white text-[#1A1A2E]">All Tools Bundle</Badge>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-white">$99</span>
                    <span className="text-white/60">/month</span>
                  </div>
                  <p className="mb-4 text-sm text-white/70">Unlock all 4 niche tools at a discounted rate.</p>
                  <ul className="mb-6 space-y-2">
                    {["All 4 tools included", "Unlimited everything", "Priority support", "New tools early access"].map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-white/80">
                        <Check className="h-4 w-4 text-curriculum" />{f}
                      </li>
                    ))}
                  </ul>
                  <Link to="/pricing">
                    <Button className="w-full bg-white text-[#1A1A2E] hover:bg-gray-100">View Details</Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[#F1F3F8] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-bold text-[#1A1A2E]">Loved by Specialists</h2>
            <p className="mt-3 text-gray-600">Real users, real professions, real results.</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {testimonials.map((t, i) => (
              <motion.div key={i} variants={itemVariants}>
                <Card className="h-full border-[#E8EAF0]">
                  <CardContent className="p-5">
                    <div className="mb-3 flex">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="mb-4 text-sm text-gray-700">"{t.text}"</p>
                    <div className="border-t border-gray-100 pt-3">
                      <p className="text-sm font-semibold text-[#1A1A2E]">{t.name}</p>
                      <p className="text-xs text-gray-500">{t.role} &middot; {t.tool}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl bg-[#1A1A2E] px-6 py-16 text-center"
          >
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Ready to streamline your workflow?</h2>
            <p className="mx-auto mt-4 max-w-xl text-white/70">Join 2,400+ specialists who use NicheTools to save time and focus on what they do best.</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link to="/pricing">
                <Button size="lg" className="gap-2 bg-white text-[#1A1A2E] hover:bg-gray-100">
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/tools/curriculum-planner">
                <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                  Try a Tool Free
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
