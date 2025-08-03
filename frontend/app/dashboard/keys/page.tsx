"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, Copy, Trash2, MoreHorizontal } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock Data for API Keys
const apiKeys = [
  {
    id: 1,
    name: "My Text Analyzer Key",
    key: "sk_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    apiName: "Text Analyzer API",
    createdAt: "2024-01-20",
    lastUsed: "2024-05-10",
    status: "active",
  },
  {
    id: 2,
    name: "Image Upscaler Dev Key",
    key: "sk_test_yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy",
    apiName: "Image Processor API",
    createdAt: "2024-02-01",
    lastUsed: "2024-05-08",
    status: "active",
  },
  {
    id: 3,
    name: "Weather App Key",
    key: "sk_live_zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz",
    apiName: "Global Weather Data API",
    createdAt: "2024-03-10",
    lastUsed: "N/A",
    status: "revoked",
  },
]

export default function ApiKeysPage() {
  const [keys, setKeys] = useState(apiKeys)
  const { toast } = useToast()

  const maskKey = (key: string) => {
    if (key.length <= 8) return key // Don't mask very short keys
    return key.substring(0, 8) + "..." + key.substring(key.length - 4)
  }

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key)
    toast({
      title: "API Key Copied!",
      description: "The API key has been copied to your clipboard.",
    })
  }

  const handleGenerateKey = () => {
    const newKey = `sk_live_${Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)}`
    const newKeyEntry = {
      id: keys.length + 1,
      name: `New API Key ${keys.length + 1}`,
      key: newKey,
      apiName: "Unassigned API", // In a real app, user would select API
      createdAt: new Date().toISOString().split("T")[0],
      lastUsed: "N/A",
      status: "active",
    }
    setKeys((prev) => [...prev, newKeyEntry])
    toast({
      title: "New API Key Generated!",
      description: "A new API key has been created.",
      variant: "success",
    })
  }

  const handleRevokeKey = (id: number) => {
    setKeys((prev) => prev.map((key) => (key.id === id ? { ...key, status: "revoked" } : key)))
    toast({
      title: "API Key Revoked!",
      description: "The API key has been revoked and is no longer active.",
      variant: "destructive",
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">API Keys</h1>
          <p className="text-muted-foreground">Manage your API keys for secure access to subscribed APIs.</p>
        </div>
        <Button onClick={handleGenerateKey}>
          <Plus className="h-4 w-4 mr-2" />
          Generate New Key
        </Button>
      </div>

      {/* API Keys Table */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Your API Keys</CardTitle>
          <CardDescription>Generate, copy, and revoke your API access keys.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Key</TableHead>
                <TableHead>Associated API</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Last Used</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {keys.map((key) => (
                <TableRow key={key.id}>
                  <TableCell className="font-medium">{key.name}</TableCell>
                  <TableCell className="font-mono text-sm">
                    <span className="hidden md:inline">{maskKey(key.key)}</span>
                    <span className="inline md:hidden">{maskKey(key.key).substring(0, 12)}...</span>
                  </TableCell>
                  <TableCell>{key.apiName}</TableCell>
                  <TableCell>{new Date(key.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {key.lastUsed === "N/A" ? "Never" : new Date(key.lastUsed).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge variant={key.status === "active" ? "default" : "destructive"}>{key.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleCopyKey(key.key)}>
                          <Copy className="h-4 w-4 mr-2" />
                          Copy Key
                        </DropdownMenuItem>
                        {key.status === "active" && (
                          <DropdownMenuItem onClick={() => handleRevokeKey(key.id)} className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Revoke Key
                          </DropdownMenuItem>
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
      {keys.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-4">You haven't generated any API keys yet.</div>
          <Button onClick={handleGenerateKey}>
            <Plus className="h-4 w-4 mr-2" />
            Generate Your First Key
          </Button>
        </div>
      )}
    </div>
  )
}
