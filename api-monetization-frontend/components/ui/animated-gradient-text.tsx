import type React from "react"
import { cn } from "@/lib/utils"

interface AnimatedGradientTextProps {
  children: React.ReactNode
  className?: string
}

export function AnimatedGradientText({ children, className }: AnimatedGradientTextProps) {
  return (
    <div
      className={cn(
        "animate-gradient bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-[length:200%_200%] bg-clip-text text-transparent",
        className,
      )}
    >
      {children}
    </div>
  )
}
