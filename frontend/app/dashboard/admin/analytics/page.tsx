"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from "recharts"
import { Users, Code, DollarSign, TrendingUp } from "lucide-react"

// Mock Data for Platform Analytics
const platformOverviewStats = {
  totalUsers: 1250,
  totalAPIs: 230,
  totalRevenue: 125000.75,
  activeSubscriptions: 890,
}

const monthlyRevenueData = [
  { name: "Jan", revenue: 10000, users: 100 },
  { name: "Feb", revenue: 12000, users: 150 },
  { name: "Mar", revenue: 15000, users: 220 },
  { name: "Apr", revenue: 18000, users: 300 },
  { name: "May", revenue: 22000, users: 450 },
  { name: "Jun", revenue: 25000, users: 600 },
]

const apiGrowthData = [
  { name: "Jan", newApis: 5, totalApis: 100 },
  { name: "Feb", newApis: 7, totalApis: 107 },
  { name: "Mar", newApis: 10, totalApis: 117 },
  { name: "Apr", newApis: 8, totalApis: 125 },
  { name: "May", newApis: 12, totalApis: 137 },
  { name: "Jun", newApis: 9, totalApis: 146 },
]

export default function PlatformAnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Platform Analytics</h1>
          <p className="text-muted-foreground">Comprehensive overview of platform performance and growth.</p>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{platformOverviewStats.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+15% last month</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total APIs</CardTitle>
            <Code className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{platformOverviewStats.totalAPIs}</div>
            <p className="text-xs text-muted-foreground">+5 new this month</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${platformOverviewStats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+20% last month</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{platformOverviewStats.activeSubscriptions}</div>
            <p className="text-xs text-muted-foreground">+10% last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Monthly Revenue & User Growth</CardTitle>
            <CardDescription>Platform revenue and new user registrations over time.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyRevenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" stroke="#3B82F6" />
                <YAxis yAxisId="right" orientation="right" stroke="#8B5CF6" />
                <Tooltip />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3B82F6"
                  fill="#3B82F6"
                  fillOpacity={0.1}
                  name="Revenue ($)"
                />
                <Line yAxisId="right" type="monotone" dataKey="users" stroke="#8B5CF6" name="Users" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>API Publication Trend</CardTitle>
            <CardDescription>New APIs published and total APIs on the platform.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={apiGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" stroke="#22C55E" />
                <YAxis yAxisId="right" orientation="right" stroke="#EF4444" />
                <Tooltip />
                <Line yAxisId="left" type="monotone" dataKey="newApis" stroke="#22C55E" name="New APIs" />
                <Line yAxisId="right" type="monotone" dataKey="totalApis" stroke="#EF4444" name="Total APIs" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
