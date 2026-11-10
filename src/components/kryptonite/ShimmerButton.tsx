import type { ButtonHTMLAttributes, CSSProperties } from 'react'
import { cn } from '@/lib/utils'

export type ShimmerButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Main button color */
  color?: string
  /** Color of the light sweep */
  shineColor?: string
  /** Text color */
  textColor?: string
  /** Seconds for one sweep */
  speed?: number
  /** Show a soft glow around the button */
  glow?: boolean
}

export function ShimmerButton({
  color = '#39ff8f',
  shineColor = '#d9ffe9',
  textColor = '#000000',
  speed = 2.4,
  glow = true,
  className,
  style,
  children,
  ...props
}: ShimmerButtonProps) {
  return (
    <button
      style={
        {
          '--c': color,
          '--shine': shineColor,
          color: textColor,
          animationDuration: `${speed}s`,
          boxShadow: glow ? `0 0 24px -4px ${color}` : undefined,
          ...style,
        } as CSSProperties
      }
      className={cn(
        'relative inline-flex h-11 items-center justify-center rounded-full px-6 font-medium',
        'bg-[linear-gradient(110deg,var(--c),45%,var(--shine),55%,var(--c))] bg-[length:200%_100%] animate-shimmer',
        'transition-transform hover:scale-105 active:scale-95',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
