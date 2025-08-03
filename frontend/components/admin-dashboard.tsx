"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles } from "@/components/ui/sparkles"
import { Users, Code, BarChart3, Settings, CheckCircle, Clock } from "lucide-react"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"

// Mock data for Admin Dashboard
const adminStats = {
  totalUsers: 1250,
  totalAPIs: 230,
  platformRevenue: 125000.75,
  activeSubscriptions: 890,
}

const recentPlatformActivity = [
  {
    id: 1,
    action: "New API published",
    entity: "Text Analyzer API",
    user: "John Doe",
    time: "1 hour ago",
    type: "success",
  },
  { id: 2, action: "User registered", entity: "Jane Smith", user: "Jane Smith", time: "3 hours ago", type: "info" },
  { id: 3, action: "API flagged", entity: "Crypto Data API", user: "Admin", time: "5 hours ago", type: "warning" },
  { id: 4, action: "Payment gateway error", entity: "Stripe", user: "System", time: "1 day ago", type: "error" },
]

const userGrowthData = [
  { name: "Jan", users: 100 },
  { name: "Feb", users: 150 },
  { name: "Mar", users: 220 },
  { name: "Apr", users: 300 },
  { name: "May", users: 450 },
  { name: "Jun", users: 600 },
]

export function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Sparkles>
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
          </Sparkles>
          <p className="text-muted-foreground mt-2">Overview of platform health and user activity.</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300">
          <Settings className="h-4 w-4 mr-2" />
          Platform Settings
        </Button>
      </div>

      {/* Admin Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-xl transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">Total Users</CardTitle>
            <div className="p-2 bg-blue-200 rounded-full">
              <Users className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-900">{adminStats.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-blue-600 mt-1">
              <span className="text-green-600">+15%</span> last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100 hover:shadow-xl transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">Platform Revenue</CardTitle>
            <div className="p-2 bg-green-200 rounded-full">
              <BarChart3 className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-900">${adminStats.platformRevenue.toLocaleString()}</div>
            <p className="text-xs text-green-600 mt-1">
              <span className="text-green-600">+20%</span> last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-xl transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-800">Total APIs</CardTitle>
            <div className="p-2 bg-purple-200 rounded-full">
              <Code className="h-4 w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-900">{adminStats.totalAPIs}</div>
            <p className="text-xs text-purple-600 mt-1">
              <span className="text-green-600">+5</span> new APIs
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100 hover:shadow-xl transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-800">Active Subscriptions</CardTitle>
            <div className="p-2 bg-orange-200 rounded-full">
              <CheckCircle className="h-4 w-4 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-900">{adminStats.activeSubscriptions}</div>
            <p className="text-xs text-orange-600 mt-1">
              <span className="text-green-600">+10%</span> last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2 text-blue-600" />
            User Growth
          </CardTitle>
          <CardDescription>New user registrations over the last 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="users" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.1} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Platform Activity */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="h-5 w-5 mr-2 text-purple-600" />
            Recent Platform Activity
          </CardTitle>
          <CardDescription>Latest events across the entire platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentPlatformActivity.map((activity) => (
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
                        : activity.type === "error"
                          ? "bg-red-500"
                          : "bg-blue-500"
                  }`}
                ></div>
                <div className="space-y-1 flex-1">
                  <p className="text-sm font-medium">
                    {activity.action}: {activity.entity}
                  </p>
                  <p className="text-sm text-muted-foreground">By {activity.user}</p>
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
  )
}
