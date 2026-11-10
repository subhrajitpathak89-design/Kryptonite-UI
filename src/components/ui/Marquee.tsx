import type { CSSProperties, ReactNode } from 'react'
import { cn } from '../../lib'

export function Marquee({ children, className, duration = 25 }: { children: ReactNode; className?: string; duration?: number }) {
  return (
    <div className={cn('group overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]', className)}>
      <div
        style={{ '--duration': `${duration}s` } as CSSProperties}
        className="flex w-max animate-marquee gap-4 group-hover:[animation-play-state:paused]"
      >
        {children}
        {children}
      </div>
    </div>
  )
}
