import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export type AuroraBackgroundProps = {
  children?: ReactNode
  className?: string
  /** Up to three glow colors */
  colors?: string[]
  /** Seconds for one drift */
  speed?: number
  /** Glow strength, 0 to 100 */
  opacity?: number
  /** Blur amount in pixels */
  blur?: number
}

export function AuroraBackground({
  children,
  className,
  colors = ['#39ff8f', '#2de2e6', '#8b5cf6'],
  speed = 12,
  opacity = 60,
  blur = 64,
}: AuroraBackgroundProps) {
  const [a, b = a, c = a] = colors
  const tint = (col: string) => `color-mix(in oklab, ${col} 35%, transparent)`
  return (
    <div className={cn('relative isolate overflow-hidden bg-kr-bg', className)}>
      <div
        style={{
          animationDuration: `${speed}s`,
          opacity: opacity / 100,
          filter: `blur(${blur}px)`,
          backgroundImage: [
            `radial-gradient(closest-side, ${tint(a)}, transparent)`,
            `radial-gradient(closest-side at 70% 40%, ${tint(b)}, transparent)`,
            `radial-gradient(closest-side at 40% 70%, ${tint(c)}, transparent)`,
          ].join(', '),
        }}
        className="absolute -inset-1/2 -z-10 animate-aurora"
      />
      {children}
    </div>
  )
}
