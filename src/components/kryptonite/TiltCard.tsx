'use client'

import { useRef, type MouseEvent, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

export type TiltCardProps = {
  children: ReactNode
  className?: string
  /** Maximum tilt in degrees */
  max?: number
  /** Scale while hovered */
  scale?: number
  /** Show a light glare that follows the cursor */
  glare?: boolean
  /** Color of the glare */
  glareColor?: string
}

export function TiltCard({ children, className, max = 12, scale = 1.02, glare = true, glareColor = '#ffffff' }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)
  const onMove = (e: MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `perspective(800px) rotateX(${-py * max}deg) rotateY(${px * max}deg) scale(${scale})`
    if (glareRef.current) {
      glareRef.current.style.opacity = '1'
      glareRef.current.style.background = `radial-gradient(circle at ${(px + 0.5) * 100}% ${(py + 0.5) * 100}%, color-mix(in oklab, ${glareColor} 18%, transparent), transparent 60%)`
    }
  }
  const reset = () => {
    if (ref.current) ref.current.style.transform = ''
    if (glareRef.current) glareRef.current.style.opacity = '0'
  }
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={cn(
        'relative overflow-hidden rounded-2xl border border-kr-line bg-gradient-to-br from-kr-surface to-kr-bg p-6 transition-transform duration-200 ease-out will-change-transform',
        className,
      )}
    >
      {glare && <div ref={glareRef} className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300" />}
      <div className="relative">{children}</div>
    </div>
  )
}
