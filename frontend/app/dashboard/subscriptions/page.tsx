"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Eye, Settings, XCircle } from "lucide-react"

// Mock Data for Subscriptions
const subscriptions = [
  {
    id: 1,
    apiName: "Advanced Text Sentiment API",
    plan: "Pro Plan",
    status: "active",
    startDate: "2024-01-01",
    endDate: "2025-01-01",
    autoRenew: true,
  },
  {
    id: 2,
    apiName: "High-Res Image Upscaler",
    plan: "Basic Usage",
    status: "active",
    startDate: "2023-11-15",
    endDate: "2024-11-15",
    autoRenew: false,
  },
  {
    id: 3,
    apiName: "Global Weather Data API",
    plan: "Free Tier",
    status: "active",
    startDate: "2024-02-20",
    endDate: "N/A",
    autoRenew: true,
  },
  {
    id: 4,
    apiName: "Financial Market Data API",
    plan: "Enterprise",
    status: "paused",
    startDate: "2023-09-01",
    endDate: "2024-09-01",
    autoRenew: true,
  },
  {
    id: 5,
    apiName: "Speech-to-Text Converter",
    plan: "Standard",
    status: "cancelled",
    startDate: "2023-07-01",
    endDate: "2024-07-01",
    autoRenew: false,
  },
]

export default function SubscriptionsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Subscriptions</h1>
          <p className="text-muted-foreground">Manage your active and past API subscriptions.</p>
        </div>
      </div>

      {/* Subscriptions Table */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>All Subscriptions</CardTitle>
          <CardDescription>Overview of your API access plans.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>API Name</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Auto-Renew</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscriptions.map((sub) => (
                <TableRow key={sub.id}>
                  <TableCell className="font-medium">{sub.apiName}</TableCell>
                  <TableCell>{sub.plan}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        sub.status === "active" ? "default" : sub.status === "paused" ? "secondary" : "destructive"
                      }
                    >
                      {sub.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(sub.startDate).toLocaleDateString()}</TableCell>
                  <TableCell>{sub.endDate === "N/A" ? "N/A" : new Date(sub.endDate).toLocaleDateString()}</TableCell>
                  <TableCell>{sub.autoRenew ? "Yes" : "No"}</TableCell>
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
                        {sub.status === "active" && (
                          <>
                            <DropdownMenuItem>
                              <Settings className="h-4 w-4 mr-2" />
                              Manage Plan
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <XCircle className="h-4 w-4 mr-2" />
                              Cancel Subscription
                            </DropdownMenuItem>
                          </>
                        )}
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
      {subscriptions.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-4">You don't have any subscriptions yet.</div>
          <Button>Browse Marketplace</Button>
        </div>
      )}
    </div>
  )
}
