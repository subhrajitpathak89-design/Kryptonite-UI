import type { ButtonHTMLAttributes, CSSProperties } from 'react'
import { cn } from '@/lib/utils'

export type GlowBorderButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** First color of the orbiting border */
  colorFrom?: string
  /** Second color of the orbiting border */
  colorTo?: string
  /** Button fill color */
  background?: string
  /** Seconds for one full orbit */
  speed?: number
  /** Border thickness in pixels */
  borderWidth?: number
}

export function GlowBorderButton({
  colorFrom = '#39ff8f',
  colorTo = '#2de2e6',
  background = '#1c1c1c',
  speed = 4,
  borderWidth = 1.5,
  className,
  style,
  children,
  ...props
}: GlowBorderButtonProps) {
  return (
    <button
      style={{ padding: borderWidth, ...style } as CSSProperties}
      className={cn('group relative inline-flex overflow-hidden rounded-full', className)}
      {...props}
    >
      <span
        style={{
          animationDuration: `${speed}s`,
          background: `conic-gradient(from 90deg, transparent 0%, ${colorFrom} 25%, ${colorTo} 50%, transparent 75%)`,
        }}
        className="absolute inset-[-200%] animate-spin-slow"
      />
      <span
        style={{ background }}
        className="relative inline-flex h-11 items-center rounded-full px-6 font-medium text-zinc-100 transition-[filter] group-hover:brightness-125"
      >
        {children}
      </span>
    </button>
  )
}
