import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export type GradientTextProps = {
  children: ReactNode
  className?: string
  /** Gradient colors, left to right */
  colors?: string[]
  /** Seconds for one full cycle */
  speed?: number
  /** Animate the gradient */
  animate?: boolean
}

export function GradientText({
  children,
  className,
  colors = ['#39ff8f', '#2de2e6', '#8b5cf6'],
  speed = 6,
  animate = true,
}: GradientTextProps) {
  return (
    <span
      style={{
        // Repeat the first color at the end so the loop is seamless
        backgroundImage: `linear-gradient(90deg, ${[...colors, colors[0]].join(', ')})`,
        animationDuration: `${speed}s`,
      }}
      className={cn(
        'bg-[length:200%_auto] bg-clip-text text-transparent',
        animate && 'animate-gradient',
        // Extra space on the right so italic/slanted glyphs aren't clipped by background-clip
        'box-decoration-clone pr-[0.12em]',
        className,
      )}
    >
      {children}
    </span>
  )
}
