'use client'

import { useRef, type CSSProperties, type MouseEvent, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

export type SpotlightCardProps = {
  children: ReactNode
  className?: string
  /** Color of the spotlight */
  color?: string
  /** Spotlight radius in pixels */
  size?: number
  /** Spotlight strength, 0 to 100 */
  intensity?: number
}

export function SpotlightCard({ children, className, color = '#39ff8f', size = 400, intensity = 18 }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const onMove = (e: MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--x', `${e.clientX - r.left}px`)
    el.style.setProperty('--y', `${e.clientY - r.top}px`)
  }
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={cn('group relative overflow-hidden rounded-2xl border border-kr-line bg-kr-surface p-6', className)}
    >
      <div
        style={
          {
            background: `radial-gradient(${size}px circle at var(--x) var(--y), color-mix(in oklab, ${color} ${intensity}%, transparent), transparent 60%)`,
          } as CSSProperties
        }
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div className="relative">{children}</div>
    </div>
  )
}
