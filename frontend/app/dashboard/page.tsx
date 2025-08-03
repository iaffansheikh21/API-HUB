"use client"

import { AdminDashboard } from "@/components/admin-dashboard"
import { UserDashboard } from "@/components/user-dashboard"

// Mock user role - in a real application, this would come from an authentication context
const currentUserRole: "admin" | "user" = "admin" // Change to "admin" to see the admin dashboard

export default function DashboardRouter() {
  if (currentUserRole === "admin") {
    return <AdminDashboard />
  } else {
    return <UserDashboard />
  }
}
