import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function AuroraBackground({ children, className }: { children?: ReactNode; className?: string }) {
  return (
    <div className={cn('relative isolate overflow-hidden bg-kr-bg', className)}>
      <div className="absolute -inset-1/2 -z-10 animate-aurora opacity-60 blur-3xl bg-[radial-gradient(closest-side,#39ff8f55,transparent),radial-gradient(closest-side_at_70%_40%,#2de2e655,transparent),radial-gradient(closest-side_at_40%_70%,#8b5cf655,transparent)]" />
      {children}
    </div>
  )
}
