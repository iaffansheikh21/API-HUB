"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, DollarSign, Receipt, Download } from "lucide-react"

// Mock Data for Payments & Revenue
const platformRevenueStats = {
  totalRevenue: 125000.75,
  monthlyRecurringRevenue: 15200.5,
  totalPayouts: 85000.0,
  pendingPayouts: 1200.0,
}

const recentTransactions = [
  {
    id: 1,
    type: "Subscription Payment",
    amount: 49.99,
    currency: "USD",
    status: "completed",
    date: "2024-05-15",
    user: "Alice Johnson",
    api: "Text Analyzer API",
  },
  {
    id: 2,
    type: "API Usage Fee",
    amount: 12.5,
    currency: "USD",
    status: "completed",
    date: "2024-05-14",
    user: "Bob Williams",
    api: "Image Processor API",
  },
  {
    id: 3,
    type: "Payout",
    amount: -250.0,
    currency: "USD",
    status: "pending",
    date: "2024-05-13",
    user: "Eve Adams",
    api: "N/A",
  },
  {
    id: 4,
    type: "Subscription Payment",
    amount: 99.99,
    currency: "USD",
    status: "completed",
    date: "2024-05-12",
    user: "Charlie Brown",
    api: "Global Weather Data API",
  },
  {
    id: 5,
    type: "Refund",
    amount: -15.0,
    currency: "USD",
    status: "completed",
    date: "2024-05-11",
    user: "Diana Prince",
    api: "Crypto Data API",
  },
]

export default function PaymentsRevenuePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filteredTransactions, setFilteredTransactions] = useState(recentTransactions)

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    const filtered = recentTransactions.filter(
      (tx) =>
        tx.type.toLowerCase().includes(term.toLowerCase()) ||
        tx.user.toLowerCase().includes(term.toLowerCase()) ||
        tx.api.toLowerCase().includes(term.toLowerCase()),
    )
    setFilteredTransactions(filtered)
  }

  const handleFilterType = (type: string) => {
    setFilterType(type)
    if (type === "all") {
      setFilteredTransactions(recentTransactions)
    } else {
      setFilteredTransactions(recentTransactions.filter((tx) => tx.type === type))
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payments & Revenue</h1>
          <p className="text-muted-foreground">Monitor platform revenue, transactions, and payouts.</p>
        </div>
      </div>

      {/* Revenue Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${platformRevenueStats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+15% last month</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">MRR</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${platformRevenueStats.monthlyRecurringRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+5% last month</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Payouts</CardTitle>
            <Receipt className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${platformRevenueStats.totalPayouts.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">All-time payouts to developers</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payouts</CardTitle>
            <DollarSign className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${platformRevenueStats.pendingPayouts.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Awaiting processing</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Latest financial activities on the platform.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
            <div className="relative flex-1 w-full md:max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
            <Select value={filterType} onValueChange={handleFilterType}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Subscription Payment">Subscription Payment</SelectItem>
                <SelectItem value="API Usage Fee">API Usage Fee</SelectItem>
                <SelectItem value="Payout">Payout</SelectItem>
                <SelectItem value="Refund">Refund</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>User</TableHead>
                <TableHead>API</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell className="font-medium">{tx.type}</TableCell>
                  <TableCell>
                    {tx.amount < 0 ? "-" : ""}${Math.abs(tx.amount).toFixed(2)} {tx.currency}
                  </TableCell>
                  <TableCell>{tx.user}</TableCell>
                  <TableCell>{tx.api}</TableCell>
                  <TableCell>{new Date(tx.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        tx.status === "completed" ? "default" : tx.status === "pending" ? "secondary" : "destructive"
                      }
                    >
                      {tx.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Invoice
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Empty State */}
      {filteredTransactions.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-4">No transactions found matching your criteria.</div>
          {(searchTerm || filterType !== "all") && (
            <Button
              onClick={() => {
                setSearchTerm("")
                setFilterType("all")
              }}
            >
              Reset Filters
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
