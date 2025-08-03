"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sparkles } from "@/components/ui/sparkles"
import { BarChart3, DollarSign, Users, Code, Plus, TrendingUp, Activity, Clock, Store } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import Link from "next/link"

// Mock data - in real app this would come from API
const stats = {
  totalAPIs: 12,
  totalRevenue: 2450.5,
  activeSubscribers: 89,
  totalRequests: 15420,
}

const recentAPIs = [
  { id: 1, name: "Text Analyzer API", status: "active", subscribers: 23, revenue: 450.0, growth: "+12%" },
  { id: 2, name: "Image Processor API", status: "active", subscribers: 15, revenue: 320.0, growth: "+8%" },
  { id: 3, name: "Data Validator API", status: "pending", subscribers: 8, revenue: 120.0, growth: "+5%" },
]

const recentActivity = [
  { id: 1, action: "New subscription", api: "Text Analyzer API", time: "2 hours ago", type: "success" },
  { id: 2, action: "API key generated", api: "Image Processor API", time: "4 hours ago", type: "info" },
  { id: 3, action: "Payment received", api: "Data Validator API", time: "6 hours ago", type: "success" },
  { id: 4, action: "Rate limit exceeded", api: "Text Analyzer API", time: "8 hours ago", type: "warning" },
]

const chartData = [
  { name: "Jan", revenue: 400, requests: 2400 },
  { name: "Feb", revenue: 300, requests: 1398 },
  { name: "Mar", revenue: 600, requests: 9800 },
  { name: "Apr", revenue: 800, requests: 3908 },
  { name: "May", revenue: 1000, requests: 4800 },
  { name: "Jun", revenue: 1200, requests: 3800 },
]

export function UserDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Sparkles>
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Dashboard
            </h1>
          </Sparkles>
          <p className="text-muted-foreground mt-2">
            Welcome back! Here's what's happening with your APIs and subscriptions.
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard/apis/create">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300">
              <Plus className="h-4 w-4 mr-2" />
              Create API
            </Button>
          </Link>
          <Link href="/dashboard/marketplace">
            <Button variant="outline">
              <Store className="h-4 w-4 mr-2" />
              Browse APIs
            </Button>
          </Link>
        </div>
      </div>

      {/* Enhanced Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-xl transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">Total APIs</CardTitle>
            <div className="p-2 bg-blue-200 rounded-full">
              <Code className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-900">{stats.totalAPIs}</div>
            <p className="text-xs text-blue-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span className="text-green-600">+2</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100 hover:shadow-xl transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">Total Revenue</CardTitle>
            <div className="p-2 bg-green-200 rounded-full">
              <DollarSign className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-900">${stats.totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span className="text-green-600">+12.5%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-xl transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-800">Active Subscriptions</CardTitle>
            <div className="p-2 bg-purple-200 rounded-full">
              <Users className="h-4 w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-900">{stats.activeSubscribers}</div>
            <p className="text-xs text-purple-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span className="text-green-600">+8</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100 hover:shadow-xl transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-800">Total Requests</CardTitle>
            <div className="p-2 bg-orange-200 rounded-full">
              <BarChart3 className="h-4 w-4 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-900">{stats.totalRequests.toLocaleString()}</div>
            <p className="text-xs text-orange-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span className="text-green-600">+23.1%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
              Revenue Trend
            </CardTitle>
            <CardDescription>Monthly revenue over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.1} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2 text-purple-600" />
              API Requests
            </CardTitle>
            <CardDescription>Request volume over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="requests" stroke="#8B5CF6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Enhanced Recent APIs */}
        <Card className="col-span-4 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Code className="h-5 w-5 mr-2 text-blue-600" />
              Recent APIs
            </CardTitle>
            <CardDescription>Your latest published APIs and their performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAPIs.map((api) => (
                <div
                  key={api.id}
                  className="flex items-center justify-between p-4 border rounded-lg bg-gradient-to-r from-gray-50 to-white hover:shadow-md transition-all duration-300"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{api.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {api.subscribers} subscribers • ${api.revenue.toFixed(2)} revenue
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                      {api.growth}
                    </Badge>
                    <Badge variant={api.status === "active" ? "default" : "secondary"}>{api.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Recent Activity */}
        <Card className="col-span-3 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-purple-600" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest activities across your APIs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === "success"
                        ? "bg-green-500"
                        : activity.type === "warning"
                          ? "bg-yellow-500"
                          : "bg-blue-500"
                    }`}
                  ></div>
                  <div className="space-y-1 flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.api}</p>
                    <p className="text-xs text-muted-foreground flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
