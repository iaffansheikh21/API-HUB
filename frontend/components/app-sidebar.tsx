app_sidebar:
"use client"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import {
  LayoutDashboard,
  Code,
  Key,
  BarChart3,
  CreditCard,
  Settings,
  Users,
  Store,
  ChevronRight,
  User,
  PlusCircle,
  List,
  LineChart,
  DollarSign,
} from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock user data - in real app this would come from auth context
// Change 'role' to "user" or "admin" to see different sidebars
const user = {
  name: "John Doe",
  email: "john@example.com",
  role: "admin", // <--- Change this to "admin" to see the admin sidebar
  avatar: "/placeholder.svg?height=32&width=32",
}

const menuItems = {
  user: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "My APIs",
      icon: Code,
      items: [
        { title: "All APIs", url: "/dashboard/apis", icon: List },
        { title: "Create API", url: "/dashboard/apis/create", icon: PlusCircle },
        { title: "API Analytics", url: "/dashboard/apis/analytics", icon: LineChart },
      ],
    },
    {
      title: "Marketplace",
      url: "/dashboard/marketplace",
      icon: Store,
    },
    {
      title: "My Subscriptions",
      url: "/dashboard/subscriptions",
      icon: Users,
    },
    {
      title: "API Keys",
      url: "/dashboard/keys",
      icon: Key,
    },
    {
      title: "Usage & Billing",
      url: "/dashboard/billing",
      icon: CreditCard,
    },
  ],
  admin: [
    {
      title: "Admin Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "User Management",
      url: "/dashboard/admin/users",
      icon: Users,
    },
    {
      title: "API Oversight",
      url: "/dashboard/admin/apis",
      icon: Code,
    },
    {
      title: "Platform Analytics",
      url: "/dashboard/admin/analytics",
      icon: BarChart3,
    },
    {
      title: "Platform Settings",
      url: "/dashboard/admin/settings",
      icon: Settings,
    },
    {
      title: "Payments & Revenue",
      url: "/dashboard/admin/payments",
      icon: DollarSign,
    },
  ],
}

export function AppSidebar() {
  // Select menu items based on the user's role
  const items = menuItems[user.role as keyof typeof menuItems] || menuItems.user // Default to user if role is unknown

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center space-x-2 px-2 py-2">
              <Code className="h-6 w-6 text-blue-600" />
              <span className="text-lg font-bold">APIHub</span>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item:any) => (
                <SidebarMenuItem key={item.title}>
                  {item.items ? (
                    <Collapsible className="group/collapsible">
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton>
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                          <ChevronRight className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem:any) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild>
                                <a href={subItem.url}>
                                  {subItem.icon && <subItem.icon className="h-4 w-4" />}
                                  <span>{subItem.title}</span>
                                </a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="w-full">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start text-left">
                    <span className="text-sm font-medium">{user.name}</span>
                    <span className="text-xs text-muted-foreground capitalize">{user.role}</span>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-(--radix-popper-anchor-width)">
                <DropdownMenuItem>
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
