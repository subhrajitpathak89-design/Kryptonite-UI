import { useRef, type CSSProperties, type MouseEvent, type ReactNode } from 'react'
import { cn } from '../../lib'

export function SpotlightCard({
  children,
  className,
  color = 'rgba(57,255,143,0.18)',
}: {
  children: ReactNode
  className?: string
  color?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const onMove = (e: MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--x', `${e.clientX - r.left}px`)
    el.style.setProperty('--y', `${e.clientY - r.top}px`)
  }
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      style={{ '--c': color } as CSSProperties}
      className={cn('group relative overflow-hidden rounded-2xl border border-kr-line bg-kr-surface p-6', className)}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(400px_circle_at_var(--x)_var(--y),var(--c),transparent_60%)]" />
      <div className="relative">{children}</div>
    </div>
  )
}
