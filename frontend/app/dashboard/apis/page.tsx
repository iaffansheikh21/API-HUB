"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, Search, MoreHorizontal, Edit, Trash2, Eye, Key, BarChart3, DollarSign, Users } from "lucide-react"
import Link from "next/link"

// Mock data
const apis = [
  {
    id: 1,
    name: "Text Analyzer API",
    description: "Advanced text analysis and sentiment detection",
    status: "active",
    subscribers: 23,
    revenue: 450.0,
    requests: 1250,
    createdAt: "2024-01-15",
    pricing: "Usage-based",
  },
  {
    id: 2,
    name: "Image Processor API",
    description: "Image resizing, compression, and format conversion",
    status: "active",
    subscribers: 15,
    revenue: 320.0,
    requests: 890,
    createdAt: "2024-01-10",
    pricing: "Subscription",
  },
  {
    id: 3,
    name: "Data Validator API",
    description: "Validate and sanitize various data formats",
    status: "pending",
    subscribers: 8,
    revenue: 120.0,
    requests: 450,
    createdAt: "2024-01-08",
    pricing: "Free + Premium",
  },
  {
    id: 4,
    name: "Weather Forecast API",
    description: "Real-time weather data and forecasting",
    status: "active",
    subscribers: 31,
    revenue: 680.0,
    requests: 2100,
    createdAt: "2024-01-05",
    pricing: "Tiered",
  },
]

export default function APIsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredAPIs, setFilteredAPIs] = useState(apis)

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    const filtered = apis.filter(
      (api) =>
        api.name.toLowerCase().includes(term.toLowerCase()) ||
        api.description.toLowerCase().includes(term.toLowerCase()),
    )
    setFilteredAPIs(filtered)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My APIs</h1>
          <p className="text-muted-foreground">Manage and monitor your published APIs</p>
        </div>
        <Link href="/dashboard/apis/create">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create API
          </Button>
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search APIs..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* APIs Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredAPIs.map((api) => (
          <Card key={api.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{api.name}</CardTitle>
                  <Badge variant={api.status === "active" ? "default" : "secondary"}>{api.status}</Badge>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit API
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Key className="h-4 w-4 mr-2" />
                      Manage Keys
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Analytics
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardDescription className="text-sm">{api.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="flex items-center justify-center mb-1">
                    <Users className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold">{api.subscribers}</div>
                  <div className="text-xs text-muted-foreground">Subscribers</div>
                </div>
                <div>
                  <div className="flex items-center justify-center mb-1">
                    <DollarSign className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold">${api.revenue}</div>
                  <div className="text-xs text-muted-foreground">Revenue</div>
                </div>
                <div>
                  <div className="flex items-center justify-center mb-1">
                    <BarChart3 className="h-4 w-4 text-purple-600" />
                  </div>
                  <div className="text-2xl font-bold">{api.requests}</div>
                  <div className="text-xs text-muted-foreground">Requests</div>
                </div>
              </div>

              {/* Metadata */}
              <div className="pt-4 border-t space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Pricing:</span>
                  <span>{api.pricing}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Created:</span>
                  <span>{new Date(api.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredAPIs.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-4">
            {searchTerm ? "No APIs found matching your search." : "No APIs found."}
          </div>
          {!searchTerm && (
            <Link href="/dashboard/apis/create">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Your First API
              </Button>
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
