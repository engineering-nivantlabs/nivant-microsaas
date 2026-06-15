import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { ShoppingBag, Plus, AlertTriangle, TrendingUp, DollarSign, Package, BarChart3, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

interface Product {
  id: string
  name: string
  category: string
  cost: number
  price: number
  stock: number
  reorderPoint: number
}

const initialProducts: Product[] = [
  { id: "1", name: "Silk Scarf - Floral", category: "Accessories", cost: 12, price: 35, stock: 8, reorderPoint: 10 },
  { id: "2", name: "Artisan Candle Set", category: "Home", cost: 8, price: 24, stock: 25, reorderPoint: 15 },
  { id: "3", name: "Leather Crossbody Bag", category: "Bags", cost: 28, price: 75, stock: 5, reorderPoint: 8 },
  { id: "4", name: "Handmade Earrings", category: "Jewelry", cost: 6, price: 22, stock: 18, reorderPoint: 12 },
  { id: "5", name: "Organic Face Serum", category: "Beauty", cost: 15, price: 45, stock: 3, reorderPoint: 10 },
  { id: "6", name: "Linen Table Runner", category: "Home", cost: 10, price: 32, stock: 12, reorderPoint: 8 },
  { id: "7", name: "Woven Tote Bag", category: "Bags", cost: 18, price: 55, stock: 7, reorderPoint: 10 },
  { id: "8", name: "Ceramic Mug Set", category: "Home", cost: 9, price: 28, stock: 30, reorderPoint: 15 },
]

const COLORS = ["#2D9C5B", "#7B5EA7", "#2B6CB0", "#E66C3A", "#E6A23C"]

export default function InventoryCalculator() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [form, setForm] = useState({ name: "", category: "Accessories", cost: "", price: "", stock: "", reorderPoint: "" })

  const categories = useMemo(() => {
    const cats: Record<string, number> = {}
    products.forEach((p) => { cats[p.category] = (cats[p.category] || 0) + p.stock })
    return Object.entries(cats).map(([name, value]) => ({ name, value }))
  }, [products])

  const stockData = useMemo(() =>
    products.map((p) => ({ name: p.name.split(" ").slice(0, 2).join(" "), stock: p.stock, reorder: p.reorderPoint })),
    [products]
  )

  const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0)
  const totalCost = products.reduce((sum, p) => sum + p.cost * p.stock, 0)
  const avgMargin = totalCost > 0 ? ((totalValue - totalCost) / totalValue * 100).toFixed(1) : "0"
  const lowStockItems = products.filter((p) => p.stock <= p.reorderPoint)
  const totalProducts = products.length

  const addProduct = () => {
    if (!form.name || !form.cost || !form.price || !form.stock) return
    const newProduct: Product = {
      id: Date.now().toString(),
      name: form.name,
      category: form.category,
      cost: Number(form.cost),
      price: Number(form.price),
      stock: Number(form.stock),
      reorderPoint: Number(form.reorderPoint) || 5,
    }
    setProducts([...products, newProduct])
    setForm({ name: "", category: "Accessories", cost: "", price: "", stock: "", reorderPoint: "" })
  }

  const removeProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id))
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-inventory-light text-inventory">
            <ShoppingBag className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#1A1A2E]">Boutique Inventory Calculator</h1>
            <p className="text-sm text-gray-500">Track products, margins, and stock levels</p>
          </div>
        </div>
      </motion.div>

      {/* Dashboard Stats */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4"
      >
        {[
          { label: "Total Value", value: `$${totalValue.toLocaleString()}`, icon: <DollarSign className="h-5 w-5" />, color: "bg-inventory-light text-inventory" },
          { label: "Avg. Margin", value: `${avgMargin}%`, icon: <TrendingUp className="h-5 w-5" />, color: "bg-curriculum-light text-curriculum" },
          { label: "Products", value: `${totalProducts}`, icon: <Package className="h-5 w-5" />, color: "bg-compliance-light text-compliance" },
          { label: "Low Stock", value: `${lowStockItems.length}`, icon: <AlertTriangle className="h-5 w-5" />, color: lowStockItems.length > 0 ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-500" },
        ].map((stat) => (
          <Card key={stat.label} className="border-[#E8EAF0]">
            <CardContent className="flex items-center gap-3 p-4">
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${stat.color}`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-xs text-gray-500">{stat.label}</p>
                <p className="text-xl font-bold text-[#1A1A2E]">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Charts */}
          <div className="grid gap-4 sm:grid-cols-2">
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card className="border-[#E8EAF0]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-inventory" />
                    Stock by Category
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={180}>
                    <PieChart>
                      <Pie data={categories} cx="50%" cy="50%" outerRadius={70} dataKey="value" label={({ name }) => name}>
                        {categories.map((_, i) => (
                          <Cell key={i} fill={COLORS[i % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <Card className="border-[#E8EAF0]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-compliance" />
                    Stock Levels
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={180}>
                    <BarChart data={stockData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E8EAF0" />
                      <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 10 }} />
                      <Tooltip />
                      <Bar dataKey="stock" fill="#E66C3A" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="reorder" fill="#2B6CB0" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Product Table */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="border-[#E8EAF0]">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Product Inventory</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#E8EAF0]">
                        <th className="pb-2 text-left font-medium text-gray-500">Product</th>
                        <th className="pb-2 text-left font-medium text-gray-500">Category</th>
                        <th className="pb-2 text-right font-medium text-gray-500">Cost</th>
                        <th className="pb-2 text-right font-medium text-gray-500">Price</th>
                        <th className="pb-2 text-right font-medium text-gray-500">Margin</th>
                        <th className="pb-2 text-right font-medium text-gray-500">Stock</th>
                        <th className="pb-2 text-right font-medium text-gray-500"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((p) => {
                        const margin = ((p.price - p.cost) / p.price * 100).toFixed(0)
                        const isLow = p.stock <= p.reorderPoint
                        return (
                          <tr key={p.id} className="border-b border-gray-50 last:border-0">
                            <td className="py-2.5 font-medium text-[#1A1A2E]">{p.name}</td>
                            <td className="py-2.5 text-gray-600">{p.category}</td>
                            <td className="py-2.5 text-right text-gray-600">${p.cost}</td>
                            <td className="py-2.5 text-right text-gray-600">${p.price}</td>
                            <td className="py-2.5 text-right">
                              <Badge variant="success" className="text-xs">{margin}%</Badge>
                            </td>
                            <td className="py-2.5 text-right">
                              <span className={`font-medium ${isLow ? "text-red-600" : "text-gray-700"}`}>
                                {p.stock}
                              </span>
                              {isLow && <AlertTriangle className="ml-1 inline h-3.5 w-3.5 text-red-500" />}
                            </td>
                            <td className="py-2.5 text-right">
                              <button onClick={() => removeProduct(p.id)} className="text-gray-400 hover:text-red-500">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Add Product Form */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <Card className="border-[#E8EAF0]">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Plus className="h-4 w-4 text-inventory" />
                  Add Product
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-600">Product Name</label>
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-lg border border-[#E8EAF0] px-3 py-2 text-sm outline-none focus:border-inventory focus:ring-2 focus:ring-inventory/20"
                    placeholder="e.g., Floral Dress"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-600">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full rounded-lg border border-[#E8EAF0] px-3 py-2 text-sm outline-none focus:border-inventory focus:ring-2 focus:ring-inventory/20"
                  >
                    {["Accessories", "Bags", "Beauty", "Home", "Jewelry"].map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-600">Cost ($)</label>
                    <input
                      type="number"
                      value={form.cost}
                      onChange={(e) => setForm({ ...form, cost: e.target.value })}
                      className="w-full rounded-lg border border-[#E8EAF0] px-3 py-2 text-sm outline-none focus:border-inventory focus:ring-2 focus:ring-inventory/20"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-600">Price ($)</label>
                    <input
                      type="number"
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: e.target.value })}
                      className="w-full rounded-lg border border-[#E8EAF0] px-3 py-2 text-sm outline-none focus:border-inventory focus:ring-2 focus:ring-inventory/20"
                      placeholder="0"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-600">Stock</label>
                    <input
                      type="number"
                      value={form.stock}
                      onChange={(e) => setForm({ ...form, stock: e.target.value })}
                      className="w-full rounded-lg border border-[#E8EAF0] px-3 py-2 text-sm outline-none focus:border-inventory focus:ring-2 focus:ring-inventory/20"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-600">Reorder At</label>
                    <input
                      type="number"
                      value={form.reorderPoint}
                      onChange={(e) => setForm({ ...form, reorderPoint: e.target.value })}
                      className="w-full rounded-lg border border-[#E8EAF0] px-3 py-2 text-sm outline-none focus:border-inventory focus:ring-2 focus:ring-inventory/20"
                      placeholder="5"
                    />
                  </div>
                </div>
                <Button variant="coral" className="w-full gap-1.5" onClick={addProduct}>
                  <Plus className="h-4 w-4" />
                  Add Product
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Reorder Suggestions */}
          {lowStockItems.length > 0 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <Card className="border-red-200 bg-red-50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-red-700 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Reorder Suggestions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {lowStockItems.map((p) => (
                    <div key={p.id} className="rounded-lg bg-white p-3 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-[#1A1A2E]">{p.name}</span>
                        <Badge variant="error" className="text-xs">{p.stock} left</Badge>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">
                        Suggested order: {p.reorderPoint * 3 - p.stock} units at ${p.cost} each = ${((p.reorderPoint * 3 - p.stock) * p.cost).toFixed(0)}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
