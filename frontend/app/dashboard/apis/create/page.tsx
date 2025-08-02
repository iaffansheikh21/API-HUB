"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plus, Trash2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface PricingTier {
  id: string
  name: string
  price: string
  requests: string
  features: string[]
}

export default function CreateAPIPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    baseUrl: "",
    category: "",
    documentation: "",
    pricingModel: "",
    isPublic: true,
    requiresApproval: false,
  })

  const [pricingTiers, setPricingTiers] = useState<PricingTier[]>([
    {
      id: "1",
      name: "Free",
      price: "0",
      requests: "1000",
      features: ["Basic support", "Rate limiting"],
    },
  ])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard/apis")
    }, 1000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const addPricingTier = () => {
    const newTier: PricingTier = {
      id: Date.now().toString(),
      name: "",
      price: "",
      requests: "",
      features: [],
    }
    setPricingTiers([...pricingTiers, newTier])
  }

  const removePricingTier = (id: string) => {
    setPricingTiers(pricingTiers.filter((tier) => tier.id !== id))
  }

  const updatePricingTier = (id: string, field: keyof PricingTier, value: string | string[]) => {
    setPricingTiers(pricingTiers.map((tier) => (tier.id === id ? { ...tier, [field]: value } : tier)))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link href="/dashboard/apis">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to APIs
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create New API</h1>
          <p className="text-muted-foreground">Publish your API and start monetizing your code</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Provide basic details about your API</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">API Name *</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="e.g., Text Analyzer API"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ai-ml">AI & Machine Learning</SelectItem>
                    <SelectItem value="data">Data Processing</SelectItem>
                    <SelectItem value="image">Image Processing</SelectItem>
                    <SelectItem value="text">Text Processing</SelectItem>
                    <SelectItem value="utility">Utilities</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe what your API does and its key features..."
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="baseUrl">Base URL *</Label>
              <Input
                id="baseUrl"
                name="baseUrl"
                placeholder="https://api.example.com/v1"
                value={formData.baseUrl}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="documentation">Documentation URL</Label>
              <Input
                id="documentation"
                name="documentation"
                placeholder="https://docs.example.com"
                value={formData.documentation}
                onChange={handleInputChange}
              />
            </div>
          </CardContent>
        </Card>

        {/* Pricing Configuration */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Pricing Configuration</CardTitle>
                <CardDescription>Set up pricing tiers for your API</CardDescription>
              </div>
              <Button type="button" variant="outline" onClick={addPricingTier}>
                <Plus className="h-4 w-4 mr-2" />
                Add Tier
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Pricing Model</Label>
              <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, pricingModel: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select pricing model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="subscription">Subscription</SelectItem>
                  <SelectItem value="usage">Usage-based</SelectItem>
                  <SelectItem value="tiered">Tiered</SelectItem>
                  <SelectItem value="freemium">Freemium</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="space-y-4">
              <Label>Pricing Tiers</Label>
              {pricingTiers.map((tier, index) => (
                <Card key={tier.id} className="border-dashed">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="outline">Tier {index + 1}</Badge>
                      {pricingTiers.length > 1 && (
                        <Button type="button" variant="ghost" size="sm" onClick={() => removePricingTier(tier.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Tier Name</Label>
                        <Input
                          placeholder="e.g., Basic, Pro, Enterprise"
                          value={tier.name}
                          onChange={(e) => updatePricingTier(tier.id, "name", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Price ($)</Label>
                        <Input
                          type="number"
                          placeholder="0"
                          value={tier.price}
                          onChange={(e) => updatePricingTier(tier.id, "price", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Requests/Month</Label>
                        <Input
                          type="number"
                          placeholder="1000"
                          value={tier.requests}
                          onChange={(e) => updatePricingTier(tier.id, "requests", e.target.value)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Settings */}
        <Card>
          <CardHeader>
            <CardTitle>API Settings</CardTitle>
            <CardDescription>Configure access and visibility settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isPublic"
                checked={formData.isPublic}
                onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isPublic: checked as boolean }))}
              />
              <Label htmlFor="isPublic">Make API publicly discoverable</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="requiresApproval"
                checked={formData.requiresApproval}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({ ...prev, requiresApproval: checked as boolean }))
                }
              />
              <Label htmlFor="requiresApproval">Require approval for new subscribers</Label>
            </div>
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex items-center justify-end space-x-4">
          <Link href="/dashboard/apis">
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create API"}
          </Button>
        </div>
      </form>
    </div>
  )
}
