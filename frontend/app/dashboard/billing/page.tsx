"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Receipt } from "lucide-react"

// Mock Data for Billing
const currentUsage = [
  { id: 1, apiName: "Text Analyzer API", plan: "Pro Plan", requestsUsed: 8500, requestsLimit: 10000, cost: 85.0 },
  { id: 2, apiName: "Image Processor API", plan: "Basic Usage", requestsUsed: 1200, requestsLimit: 2000, cost: 12.0 },
  { id: 3, apiName: "Global Weather Data API", plan: "Free Tier", requestsUsed: 450, requestsLimit: 1000, cost: 0.0 },
]

const billingHistory = [
  { id: 1, invoiceId: "INV-2024-001", date: "2024-04-01", amount: 97.0, status: "Paid", downloadUrl: "#" },
  { id: 2, invoiceId: "INV-2024-002", date: "2024-03-01", amount: 75.5, status: "Paid", downloadUrl: "#" },
  { id: 3, invoiceId: "INV-2024-003", date: "2024-02-01", amount: 60.0, status: "Paid", downloadUrl: "#" },
  { id: 4, invoiceId: "INV-2024-004", date: "2024-01-01", amount: 50.0, status: "Paid", downloadUrl: "#" },
]

export default function BillingPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Usage & Billing</h1>
          <p className="text-muted-foreground">Monitor your API usage and manage your billing information.</p>
        </div>
        <Button>
          <CreditCard className="h-4 w-4 mr-2" />
          Manage Payment Methods
        </Button>
      </div>

      {/* Current Usage */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Current API Usage</CardTitle>
          <CardDescription>Overview of your current usage for active subscriptions.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>API Name</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Requests Used</TableHead>
                <TableHead>Requests Limit</TableHead>
                <TableHead>Cost (Current Period)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentUsage.map((usage) => (
                <TableRow key={usage.id}>
                  <TableCell className="font-medium">{usage.apiName}</TableCell>
                  <TableCell>{usage.plan}</TableCell>
                  <TableCell>
                    {usage.requestsUsed.toLocaleString()}
                    {usage.requestsLimit !== 0 && (
                      <span className="text-muted-foreground"> / {usage.requestsLimit.toLocaleString()}</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {usage.requestsLimit === 0 ? "Unlimited" : usage.requestsLimit.toLocaleString()}
                  </TableCell>
                  <TableCell>${usage.cost.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>View your past invoices and payment records.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {billingHistory.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.invoiceId}</TableCell>
                  <TableCell>{new Date(invoice.date).toLocaleDateString()}</TableCell>
                  <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant={invoice.status === "Paid" ? "default" : "secondary"}>{invoice.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" asChild>
                      <a href={invoice.downloadUrl} target="_blank" rel="noopener noreferrer">
                        <Receipt className="h-4 w-4 mr-2" />
                        Download
                      </a>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Empty State */}
      {currentUsage.length === 0 && billingHistory.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-4">No usage data or billing history found.</div>
          <Button>Start a Subscription</Button>
        </div>
      )}
    </div>
  )
}
