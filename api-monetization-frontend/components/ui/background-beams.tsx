"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface BackgroundBeamsProps {
  className?: string
}

export function BackgroundBeams({ className }: BackgroundBeamsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const beams = Array.from({ length: 5 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      angle: Math.random() * Math.PI * 2,
      speed: 0.5 + Math.random() * 0.5,
      opacity: 0.1 + Math.random() * 0.2,
    }))

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      beams.forEach((beam) => {
        ctx.save()
        ctx.translate(beam.x, beam.y)
        ctx.rotate(beam.angle)

        const gradient = ctx.createLinearGradient(-100, 0, 100, 0)
        gradient.addColorStop(0, "transparent")
        gradient.addColorStop(0.5, `rgba(59, 130, 246, ${beam.opacity})`)
        gradient.addColorStop(1, "transparent")

        ctx.fillStyle = gradient
        ctx.fillRect(-100, -1, 200, 2)
        ctx.restore()

        beam.x += Math.cos(beam.angle) * beam.speed
        beam.y += Math.sin(beam.angle) * beam.speed

        if (beam.x < -100) beam.x = canvas.width + 100
        if (beam.x > canvas.width + 100) beam.x = -100
        if (beam.y < -100) beam.y = canvas.height + 100
        if (beam.y > canvas.height + 100) beam.y = -100
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className={cn("absolute inset-0 pointer-events-none", className)} />
}
