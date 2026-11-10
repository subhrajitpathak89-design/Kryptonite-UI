import type { ReactNode } from 'react'
import { cn } from '../../lib'

export function GradientText({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'bg-[linear-gradient(90deg,#39ff8f,#2de2e6,#8b5cf6,#39ff8f)] bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient',
        className,
      )}
    >
      {children}
    </span>
  )
}
