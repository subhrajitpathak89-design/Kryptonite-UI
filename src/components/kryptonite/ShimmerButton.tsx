import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export function ShimmerButton({ className, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        'relative inline-flex h-11 items-center justify-center rounded-full px-6 font-medium text-black',
        'bg-[linear-gradient(110deg,#39ff8f,45%,#d9ffe9,55%,#39ff8f)] bg-[length:200%_100%] animate-shimmer',
        'shadow-[0_0_24px_-4px_#39ff8f] transition-transform hover:scale-105 active:scale-95',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
