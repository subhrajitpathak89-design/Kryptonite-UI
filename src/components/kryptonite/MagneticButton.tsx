'use client'

import { useRef, type ButtonHTMLAttributes, type CSSProperties, type MouseEvent } from 'react'
import { cn } from '@/lib/utils'

export type MagneticButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Accent color for text, border and fill */
  color?: string
  /** How strongly it follows the cursor (0 to 1) */
  strength?: number
}

export function MagneticButton({ color = '#39ff8f', strength = 0.35, className, style, children, ...props }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const onMove = (e: MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left - r.width / 2) * strength
    const y = (e.clientY - r.top - r.height / 2) * strength
    el.style.transform = `translate(${x}px, ${y}px)`
  }
  const reset = () => {
    if (ref.current) ref.current.style.transform = ''
  }
  return (
    <button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ '--c': color, color, ...style } as CSSProperties}
      className={cn(
        'h-11 rounded-full border border-[color-mix(in_oklab,var(--c)_40%,transparent)] bg-[color-mix(in_oklab,var(--c)_10%,transparent)] px-6 font-medium transition-[transform,background-color] duration-200 ease-out hover:bg-[color-mix(in_oklab,var(--c)_20%,transparent)]',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
