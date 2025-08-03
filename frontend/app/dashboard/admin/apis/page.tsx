"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, Eye, CheckCircle, PauseCircle, Trash2 } from "lucide-react"

// Mock Data for API Oversight
const platformAPIs = [
  {
    id: 1,
    name: "Text Analyzer API",
    owner: "Alice Johnson",
    status: "active",
    subscribers: 23,
    revenue: 450.0,
    requests: 1250,
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    name: "Image Processor API",
    owner: "Bob Williams",
    status: "active",
    subscribers: 15,
    revenue: 320.0,
    requests: 890,
    createdAt: "2024-01-10",
  },
  {
    id: 3,
    name: "Data Validator API",
    owner: "Eve Adams",
    status: "pending",
    subscribers: 8,
    revenue: 120.0,
    requests: 450,
    createdAt: "2024-01-08",
  },
  {
    id: 4,
    name: "Weather Forecast API",
    owner: "Charlie Brown",
    status: "active",
    subscribers: 31,
    revenue: 680.0,
    requests: 2100,
    createdAt: "2024-01-05",
  },
  {
    id: 5,
    name: "Crypto Data API",
    owner: "Diana Prince",
    status: "suspended",
    subscribers: 5,
    revenue: 80.0,
    requests: 200,
    createdAt: "2023-12-01",
  },
]

export default function ApiOversightPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredAPIs, setFilteredAPIs] = useState(platformAPIs)

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    const filtered = platformAPIs.filter(
      (api) =>
        api.name.toLowerCase().includes(term.toLowerCase()) || api.owner.toLowerCase().includes(term.toLowerCase()),
    )
    setFilteredAPIs(filtered)
  }

  const handleStatusChange = (id: number, newStatus: string) => {
    setFilteredAPIs((prev) => prev.map((api) => (api.id === id ? { ...api, status: newStatus } : api)))
    // In a real app, you'd send this update to your backend
    console.log(`API ${id} status changed to ${newStatus}`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">API Oversight</h1>
          <p className="text-muted-foreground">Monitor and manage all APIs published on the platform.</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search APIs by name or owner..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* APIs Table */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>All Platform APIs</CardTitle>
          <CardDescription>Overview of all published APIs, their status, and performance.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>API Name</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Subscribers</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Requests</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAPIs.map((api) => (
                <TableRow key={api.id}>
                  <TableCell className="font-medium">{api.name}</TableCell>
                  <TableCell>{api.owner}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        api.status === "active" ? "default" : api.status === "pending" ? "secondary" : "destructive"
                      }
                    >
                      {api.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{api.subscribers}</TableCell>
                  <TableCell>${api.revenue.toFixed(2)}</TableCell>
                  <TableCell>{api.requests.toLocaleString()}</TableCell>
                  <TableCell>{new Date(api.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
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
                        {api.status === "pending" && (
                          <DropdownMenuItem onClick={() => handleStatusChange(api.id, "active")}>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approve API
                          </DropdownMenuItem>
                        )}
                        {api.status === "active" && (
                          <DropdownMenuItem onClick={() => handleStatusChange(api.id, "suspended")}>
                            <PauseCircle className="h-4 w-4 mr-2" />
                            Suspend API
                          </DropdownMenuItem>
                        )}
                        {api.status === "suspended" && (
                          <DropdownMenuItem onClick={() => handleStatusChange(api.id, "active")}>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Activate API
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete API
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Empty State */}
      {filteredAPIs.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-4">No APIs found matching your search.</div>
          {searchTerm && <Button onClick={() => handleSearch("")}>Reset Search</Button>}
        </div>
      )}
    </div>
  )
}
