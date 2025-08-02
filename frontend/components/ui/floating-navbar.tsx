"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Code } from "lucide-react"
import Link from "next/link"

interface FloatingNavbarProps {
  navItems: Array<{
    name: string
    link: string
  }>
  className?: string
}

export function FloatingNavbar({ navItems, className }: FloatingNavbarProps) {
  const [visible, setVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          setVisible(false)
        } else {
          setVisible(true)
        }
        setLastScrollY(window.scrollY)
      }
    }

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar)
      return () => {
        window.removeEventListener("scroll", controlNavbar)
      }
    }
  }, [lastScrollY])

  return (
    <div
      className={cn(
        "fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300",
        visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0",
        className,
      )}
    >
      <div className="flex items-center justify-center space-x-4 bg-white/80 backdrop-blur-md border border-gray-200 rounded-full px-6 py-3 shadow-lg">
        <Link href="/" className="flex items-center space-x-2">
          <Code className="h-6 w-6 text-blue-600" />
          <span className="font-bold text-gray-900">APIHub</span>
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.link}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="flex items-center space-x-2">
          <Link href="/auth/login">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
          </Link>
          <Link href="/auth/register">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
