"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, Edit, Trash2, UserCheck, UserX, Mail } from "lucide-react"

// Mock Data for User Management
const users = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "user",
    status: "active",
    joined: "2023-01-10",
    lastLogin: "2024-05-15",
  },
  {
    id: 2,
    name: "Bob Williams",
    email: "bob@example.com",
    role: "user",
    status: "active",
    joined: "2023-02-20",
    lastLogin: "2024-05-14",
  },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "admin",
    status: "active",
    joined: "2022-11-01",
    lastLogin: "2024-05-16",
  },
  {
    id: 4,
    name: "Diana Prince",
    email: "diana@example.com",
    role: "user",
    status: "suspended",
    joined: "2023-03-05",
    lastLogin: "2024-04-20",
  },
  {
    id: 5,
    name: "Eve Adams",
    email: "eve@example.com",
    role: "user",
    status: "active",
    joined: "2024-01-01",
    lastLogin: "2024-05-13",
  },
]

export default function UserManagementPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredUsers, setFilteredUsers] = useState(users)

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(term.toLowerCase()) || user.email.toLowerCase().includes(term.toLowerCase()),
    )
    setFilteredUsers(filtered)
  }

  const handleStatusChange = (id: number, newStatus: string) => {
    setFilteredUsers((prev) => prev.map((user) => (user.id === id ? { ...user, status: newStatus } : user)))
    // In a real app, you'd send this update to your backend
    console.log(`User ${id} status changed to ${newStatus}`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">Manage all users registered on the platform.</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Users Table */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>All Platform Users</CardTitle>
          <CardDescription>Overview of registered users and their roles.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="capitalize">
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        user.status === "active" ? "default" : user.status === "suspended" ? "destructive" : "outline"
                      }
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(user.joined).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(user.lastLogin).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Mail className="h-4 w-4 mr-2" />
                          Send Email
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit User
                        </DropdownMenuItem>
                        {user.status === "active" ? (
                          <DropdownMenuItem onClick={() => handleStatusChange(user.id, "suspended")}>
                            <UserX className="h-4 w-4 mr-2" />
                            Suspend User
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem onClick={() => handleStatusChange(user.id, "active")}>
                            <UserCheck className="h-4 w-4 mr-2" />
                            Activate User
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete User
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
      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-4">No users found matching your search.</div>
          {searchTerm && <Button onClick={() => handleSearch("")}>Reset Search</Button>}
        </div>
      )}
    </div>
  )
}
