import { HashRouter, Routes, Route } from "react-router-dom"
import Layout from "@/components/layout/Layout"
import Home from "@/pages/Home"
import Pricing from "@/pages/Pricing"
import CurriculumPlanner from "@/pages/tools/CurriculumPlanner"
import TherapyIntake from "@/pages/tools/TherapyIntake"
import ComplianceChecker from "@/pages/tools/ComplianceChecker"
import InventoryCalculator from "@/pages/tools/InventoryCalculator"

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/tools/curriculum-planner" element={<CurriculumPlanner />} />
          <Route path="/tools/therapy-intake" element={<TherapyIntake />} />
          <Route path="/tools/compliance-checker" element={<ComplianceChecker />} />
          <Route path="/tools/inventory-calculator" element={<InventoryCalculator />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App
