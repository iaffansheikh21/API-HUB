"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, XCircle, Clock } from "lucide-react"
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from "recharts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

// Mock Data for API Analytics
const apiUsageData = [
  { name: "Day 1", requests: 400, errors: 20, latency: 120 },
  { name: "Day 2", requests: 450, errors: 15, latency: 110 },
  { name: "Day 3", requests: 500, errors: 25, latency: 130 },
  { name: "Day 4", requests: 550, errors: 18, latency: 100 },
  { name: "Day 5", requests: 600, errors: 30, latency: 140 },
  { name: "Day 6", requests: 650, errors: 22, latency: 115 },
  { name: "Day 7", requests: 700, errors: 28, latency: 125 },
]

const topAPIsByUsage = [
  { id: 1, name: "Text Analyzer API", requests: 12500, errors: 120, latency: "150ms" },
  { id: 2, name: "Image Processor API", requests: 8900, errors: 80, latency: "180ms" },
  { id: 3, name: "Data Validator API", requests: 4500, errors: 50, latency: "100ms" },
  { id: 4, name: "Weather Forecast API", requests: 2100, errors: 30, latency: "90ms" },
]

export default function ApiAnalyticsPage() {
  const [selectedApi, setSelectedApi] = useState("all") // For future API selection

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">API Analytics</h1>
          <p className="text-muted-foreground">Detailed insights into your API performance and usage.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={selectedApi} onValueChange={setSelectedApi}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select API" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All APIs</SelectItem>
              {topAPIsByUsage.map((api) => (
                <SelectItem key={api.id} value={api.id.toString()}>
                  {api.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15,420</div>
            <p className="text-xs text-muted-foreground">+18.5% from last week</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.2%</div>
            <p className="text-xs text-muted-foreground">-0.3% from last week</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Latency</CardTitle>
            <Clock className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">125ms</div>
            <p className="text-xs text-muted-foreground">-5ms from last week</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>API Request Volume</CardTitle>
            <CardDescription>Daily request volume over the last 7 days.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={apiUsageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="requests" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.1} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Error & Latency</CardTitle>
            <CardDescription>Daily error count and average latency.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={apiUsageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" stroke="#EF4444" />
                <YAxis yAxisId="right" orientation="right" stroke="#8B5CF6" />
                <Tooltip />
                <Bar yAxisId="left" dataKey="errors" fill="#EF4444" name="Errors" />
                <Bar yAxisId="right" dataKey="latency" fill="#8B5CF6" name="Latency (ms)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top APIs by Usage */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Top APIs by Usage</CardTitle>
          <CardDescription>Overview of your most used APIs.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>API Name</TableHead>
                <TableHead>Requests (Last 30 Days)</TableHead>
                <TableHead>Errors</TableHead>
                <TableHead>Avg. Latency</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topAPIsByUsage.map((api) => (
                <TableRow key={api.id}>
                  <TableCell className="font-medium">{api.name}</TableCell>
                  <TableCell>{api.requests.toLocaleString()}</TableCell>
                  <TableCell>{api.errors}</TableCell>
                  <TableCell>{api.latency}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
