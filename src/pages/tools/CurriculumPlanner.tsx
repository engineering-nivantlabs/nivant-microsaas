import { useState } from "react"
import { motion } from "framer-motion"
import { BookOpen, Printer, Download, Check, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const ageGroups = ["3-6 (Primary)", "6-9 (Lower Elementary)", "9-12 (Upper Elementary)"]
const subjectsList = ["Math", "Language", "Science", "Art", "Practical Life"]

const mockLessonPlan: Record<string, string[]> = {
  Monday: ["Sandpaper Numbers - Counting 1-20", "Three-Part Cards - Ocean Vocabulary", "Sink/Float Experiment", "Watercolor Seascape", "Pouring & Transferring"],
  Tuesday: ["Golden Beads - Place Value", "Story Sequencing - Under the Sea", "Shell Sorting & Classification", "Clay Fish Sculpture", "Sea-themed Table Setting"],
  Wednesday: ["Number Rods - Addition", "Rhyming Words - Ocean Poems", "Tide Pool Diorama", "Origami Boats", "Washing Shells"],
  Thursday: ["Stamp Game - Subtraction", "Reading - Ocean Life Booklet", "Wave in a Bottle", "Crayon Resist Watercolor", "Fish Grating Activity"],
  Friday: ["Dot Game - Multiplication Intro", "Creative Writing - My Ocean", "Saltwater Density Test", "Ocean Collage", "Snack Prep - Fish Crackers"],
}

export default function CurriculumPlanner() {
  const [ageGroup, setAgeGroup] = useState("3-6 (Primary)")
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(["Math", "Language", "Science", "Art", "Practical Life"])
  const [theme, setTheme] = useState("Ocean")
  const [generated, setGenerated] = useState(false)

  const toggleSubject = (s: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    )
  }

  const handleGenerate = () => {
    setGenerated(true)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-curriculum-light text-curriculum">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#1A1A2E]">Montessori Curriculum Planner</h1>
            <p className="text-sm text-gray-500">Generate themed weekly lesson plans for your classroom</p>
          </div>
        </div>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
        {/* Input Panel */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
          <Card className="border-[#E8EAF0]">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-curriculum" />
                Plan Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Age Group */}
              <div>
                <label className="mb-2 block text-sm font-medium text-[#1A1A2E]">Age Group</label>
                <div className="space-y-1.5">
                  {ageGroups.map((ag) => (
                    <button
                      key={ag}
                      onClick={() => setAgeGroup(ag)}
                      className={`flex w-full items-center justify-between rounded-lg border px-3 py-2.5 text-sm transition ${
                        ageGroup === ag
                          ? "border-curriculum bg-curriculum-light text-curriculum"
                          : "border-[#E8EAF0] text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {ag}
                      {ageGroup === ag && <Check className="h-4 w-4" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Subjects */}
              <div>
                <label className="mb-2 block text-sm font-medium text-[#1A1A2E]">Subject Areas</label>
                <div className="flex flex-wrap gap-2">
                  {subjectsList.map((s) => (
                    <button
                      key={s}
                      onClick={() => toggleSubject(s)}
                      className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                        selectedSubjects.includes(s)
                          ? "bg-curriculum text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Theme */}
              <div>
                <label className="mb-2 block text-sm font-medium text-[#1A1A2E]">Theme</label>
                <input
                  type="text"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="w-full rounded-lg border border-[#E8EAF0] px-3 py-2.5 text-sm outline-none transition focus:border-curriculum focus:ring-2 focus:ring-curriculum/20"
                  placeholder="e.g., Ocean, Seasons, Space"
                />
              </div>

              <Button variant="green" className="w-full gap-2" onClick={handleGenerate}>
                <Sparkles className="h-4 w-4" />
                Generate Plan
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Output Panel */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
          {generated ? (
            <div>
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-[#1A1A2E]">Weekly Lesson Plan: {theme}</h2>
                  <p className="text-sm text-gray-500">{ageGroup} &middot; {selectedSubjects.join(", ")}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <Printer className="h-4 w-4" />
                    Print
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <Download className="h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>

              <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-3">
                {Object.entries(mockLessonPlan).map(([day, activities]) => (
                  <motion.div key={day} variants={itemVariants}>
                    <Card className="border-[#E8EAF0]">
                      <CardContent className="p-4">
                        <Badge variant="green" className="mb-3">{day}</Badge>
                        <div className="grid gap-2 sm:grid-cols-5">
                          {activities.map((activity, i) => (
                            <div
                              key={i}
                              className="rounded-lg bg-curriculum-light p-3 text-xs font-medium text-curriculum"
                            >
                              {subjectsList[i]}
                              <div className="mt-1 text-xs font-normal text-[#1A1A2E]">{activity}</div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ) : (
            <Card className="flex h-full min-h-[400px] items-center justify-center border-dashed border-[#E8EAF0]">
              <CardContent className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-curriculum-light">
                  <BookOpen className="h-8 w-8 text-curriculum" />
                </div>
                <h3 className="mb-1 text-lg font-semibold text-[#1A1A2E]">Your plan will appear here</h3>
                <p className="text-sm text-gray-500">Select your settings and click Generate Plan</p>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  )
}
