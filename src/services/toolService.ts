const OPENAI_KEY = import.meta.env.VITE_OPENAI_API_KEY

type NicheTool = "compliance" | "curriculum" | "therapy-intake" | "inventory"

const SYSTEM_PROMPTS: Record<NicheTool, string> = {
  compliance: "You are a compliance analysis expert. Review the provided information against common regulatory frameworks (GDPR, HIPAA, SOC2, PCI-DSS) and provide a detailed compliance assessment with specific recommendations.",
  curriculum: "You are an education curriculum design expert. Create a structured curriculum plan with learning objectives, weekly breakdown, assessments, and resources.",
  "therapy-intake": "You are a clinical documentation assistant. Generate a professional therapy intake form summary based on the provided patient information. Include presenting concerns, history, and recommended initial treatment approach.",
  inventory: "You are a supply chain analyst. Based on the provided inventory data, calculate optimal reorder points, safety stock levels, and provide demand forecasting recommendations.",
}

export async function runNicheTool(tool: NicheTool, input: Record<string, string>): Promise<string> {
  const inputText = Object.entries(input).map(([k, v]) => `${k}: ${v}`).join("\n")

  if (!OPENAI_KEY) {
    return `[Demo Mode] ${tool} analysis for the provided input. Connect your API key for real AI-powered results.\n\nInput received:\n${inputText}`
  }

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${OPENAI_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [
        { role: "system", content: SYSTEM_PROMPTS[tool] },
        { role: "user", content: inputText },
      ],
      temperature: 0.3,
    }),
  })

  const data = await res.json()
  return data.choices[0].message.content
}
