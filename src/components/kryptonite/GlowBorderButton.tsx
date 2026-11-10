import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export function GlowBorderButton({ className, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn('group relative inline-flex overflow-hidden rounded-full p-[1.5px]', className)} {...props}>
      <span className="absolute inset-[-200%] animate-spin-slow bg-[conic-gradient(from_90deg,transparent_0%,#39ff8f_25%,#2de2e6_50%,transparent_75%)]" />
      <span className="relative inline-flex h-11 items-center rounded-full bg-kr-bg px-6 font-medium text-zinc-100 transition-colors group-hover:bg-kr-surface">
        {children}
      </span>
    </button>
  )
}
