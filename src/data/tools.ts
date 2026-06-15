export interface Tool {
  id: string
  name: string
  description: string
  audience: string
  price: number
  color: string
  bgColor: string
  accentColor: string
  icon: string
  features: string[]
}

export const tools: Tool[] = [
  {
    id: "curriculum-planner",
    name: "Montessori Curriculum Planner",
    description: "Generate themed weekly lesson plans with age-appropriate activities across all Montessori subject areas.",
    audience: "For Montessori teachers",
    price: 49,
    color: "#2D9C5B",
    bgColor: "#E8F5EE",
    accentColor: "#D4F0E0",
    icon: "BookOpen",
    features: [
      "Age group selector (3-6, 6-9, 9-12)",
      "5 subject area coverage",
      "Theme-based planning",
      "Weekly lesson plan grid",
      "Print & export options",
    ],
  },
  {
    id: "therapy-intake",
    name: "Therapy Client Intake System",
    description: "Build custom digital intake forms and manage client submissions in one organized dashboard.",
    audience: "For solo therapists",
    price: 59,
    color: "#7B5EA7",
    bgColor: "#F0EBF5",
    accentColor: "#E5DCF0",
    icon: "Heart",
    features: [
      "Drag-and-drop form builder",
      "Custom field types",
      "Client response management",
      "PDF export capability",
      "HIPAA-aware design",
    ],
  },
  {
    id: "compliance-checker",
    name: "Financial Content Compliance Checker",
    description: "Scan your financial content for compliance issues before publishing. Get suggestions to stay compliant.",
    audience: "For financial advisors",
    price: 69,
    color: "#2B6CB0",
    bgColor: "#EBF2FA",
    accentColor: "#D6E6F5",
    icon: "Shield",
    features: [
      "Real-time text scanning",
      "Flagged phrase detection",
      "Compliance suggestions",
      "Severity classification",
      "Export reports",
    ],
  },
  {
    id: "inventory-calculator",
    name: "Boutique Inventory Calculator",
    description: "Track products, calculate margins, and get reorder alerts for your boutique shop.",
    audience: "For boutique shop owners",
    price: 39,
    color: "#E66C3A",
    bgColor: "#FDF0EB",
    accentColor: "#FCE4DB",
    icon: "ShoppingBag",
    features: [
      "Product cost & price tracking",
      "Profit margin calculator",
      "Low stock alerts",
      "Reorder suggestions",
      "Visual dashboards & charts",
    ],
  },
]

export const testimonials = [
  {
    name: "Sarah M.",
    role: "Montessori Lead Teacher",
    tool: "Curriculum Planner",
    text: "This planner cut my prep time in half. The themed weekly grids are exactly what I needed for my mixed-age classroom.",
  },
  {
    name: "Dr. James Chen",
    role: "Licensed Therapist",
    tool: "Therapy Intake",
    text: "Finally, an intake system designed for solo practitioners. My clients love the digital forms, and I love the organization.",
  },
  {
    name: "Patricia L.",
    role: "Financial Advisor",
    tool: "Compliance Checker",
    text: "Catches phrases I would have missed. The suggestions are practical and help me keep my content compliant without losing my voice.",
  },
  {
    name: "Amina K.",
    role: "Boutique Owner",
    tool: "Inventory Calculator",
    text: "The low stock alerts alone saved me from running out of my bestsellers during peak season. Worth every penny.",
  },
]
