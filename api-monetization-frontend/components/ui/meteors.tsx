"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface MeteorsProps {
  number?: number
  className?: string
}

export function Meteors({ number = 20, className }: MeteorsProps) {
  const [meteors, setMeteors] = useState<Array<{ id: number; delay: number; duration: number; left: number }>>([])

  useEffect(() => {
    const meteorArray = Array.from({ length: number }, (_, i) => ({
      id: i,
      delay: Math.random() * 2,
      duration: Math.random() * 2 + 1,
      left: Math.random() * 100,
    }))
    setMeteors(meteorArray)
  }, [number])

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      {meteors.map((meteor) => (
        <div
          key={meteor.id}
          className="absolute h-px w-px bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-meteor"
          style={{
            left: `${meteor.left}%`,
            animationDelay: `${meteor.delay}s`,
            animationDuration: `${meteor.duration}s`,
          }}
        />
      ))}
    </div>
  )
}
