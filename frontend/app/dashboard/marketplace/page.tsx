"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, DollarSign, Users, Star } from "lucide-react"
import Link from "next/link"

// Mock Data for Marketplace APIs
const marketplaceAPIs = [
  {
    id: 1,
    name: "Advanced Text Sentiment API",
    description: "Analyze sentiment, extract keywords, and summarize text with AI.",
    category: "AI & Machine Learning",
    pricing: "Freemium",
    rating: 4.8,
    subscribers: 1200,
    owner: "AI Solutions Inc.",
  },
  {
    id: 2,
    name: "High-Res Image Upscaler",
    description: "Upscale images without quality loss using deep learning algorithms.",
    category: "Image Processing",
    pricing: "Usage-based",
    rating: 4.5,
    subscribers: 850,
    owner: "Pixel Perfect Labs",
  },
  {
    id: 3,
    name: "Global Weather Data API",
    description: "Access real-time and historical weather data for any location worldwide.",
    category: "Data",
    pricing: "Subscription",
    rating: 4.7,
    subscribers: 1500,
    owner: "Weather Insights Co.",
  },
  {
    id: 4,
    name: "Financial Market Data API",
    description: "Comprehensive stock, crypto, and forex data with real-time updates.",
    category: "Finance",
    pricing: "Tiered",
    rating: 4.9,
    subscribers: 980,
    owner: "QuantFlow Data",
  },
  {
    id: 5,
    name: "Speech-to-Text Converter",
    description: "Convert audio recordings into accurate text transcripts in multiple languages.",
    category: "AI & Machine Learning",
    pricing: "Usage-based",
    rating: 4.6,
    subscribers: 720,
    owner: "VoiceTech Solutions",
  },
]

export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterPricing, setFilterPricing] = useState("all")

  const filteredAPIs = marketplaceAPIs.filter((api) => {
    const matchesSearch =
      api.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      api.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || api.category === filterCategory
    const matchesPricing = filterPricing === "all" || api.pricing === filterPricing
    return matchesSearch && matchesCategory && matchesPricing
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">API Marketplace</h1>
          <p className="text-muted-foreground">Discover and subscribe to powerful APIs.</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 w-full md:max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search APIs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full"
          />
        </div>
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="AI & Machine Learning">AI & Machine Learning</SelectItem>
            <SelectItem value="Image Processing">Image Processing</SelectItem>
            <SelectItem value="Data">Data Processing</SelectItem>
            <SelectItem value="Finance">Finance</SelectItem>
            <SelectItem value="Utility">Utility</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterPricing} onValueChange={setFilterPricing}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Pricing Model" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Pricing</SelectItem>
            <SelectItem value="Freemium">Freemium</SelectItem>
            <SelectItem value="Usage-based">Usage-based</SelectItem>
            <SelectItem value="Subscription">Subscription</SelectItem>
            <SelectItem value="Tiered">Tiered</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* API Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredAPIs.map((api) => (
          <Card key={api.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{api.name}</CardTitle>
                  <Badge variant="secondary">{api.category}</Badge>
                </div>
                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{api.rating}</span>
                </div>
              </div>
              <CardDescription className="text-sm">{api.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center space-x-1">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <span>{api.pricing}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4 text-blue-600" />
                  <span>{api.subscribers} Subscribers</span>
                </div>
              </div>
              <div className="flex justify-between items-center pt-4 border-t">
                <span className="text-sm text-muted-foreground">By {api.owner}</span>
                <Link href={`/dashboard/marketplace/${api.id}`}>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredAPIs.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-4">No APIs found matching your criteria.</div>
          <Button
            onClick={() => {
              setSearchTerm("")
              setFilterCategory("all")
              setFilterPricing("all")
            }}
          >
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  )
}
