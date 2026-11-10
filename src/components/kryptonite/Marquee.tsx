import type { CSSProperties, ReactNode } from 'react'
import { cn } from '@/lib/utils'

export type MarqueeProps = {
  children: ReactNode
  className?: string
  /** Seconds for one full loop */
  duration?: number
  /** Space between items in pixels */
  gap?: number
  /** Scroll right instead of left */
  reverse?: boolean
  /** Pause while hovered */
  pauseOnHover?: boolean
  /** Fade the left and right edges */
  fade?: boolean
}

export function Marquee({
  children,
  className,
  duration = 25,
  gap = 16,
  reverse = false,
  pauseOnHover = true,
  fade = true,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        'group overflow-hidden',
        fade && '[mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]',
        className,
      )}
    >
      <div
        style={
          {
            '--duration': `${duration}s`,
            animationDirection: reverse ? 'reverse' : 'normal',
          } as CSSProperties
        }
        className={cn('flex w-max animate-marquee', pauseOnHover && 'group-hover:[animation-play-state:paused]')}
      >
        {/* Two copies so the loop is seamless; padding after each copy keeps spacing even at the seam */}
        <div className="flex shrink-0" style={{ gap, paddingRight: gap }}>
          {children}
        </div>
        <div className="flex shrink-0" style={{ gap, paddingRight: gap }} aria-hidden>
          {children}
        </div>
      </div>
    </div>
  )
}
