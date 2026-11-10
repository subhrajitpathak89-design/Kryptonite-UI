'use client'

import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * Fades and lifts its content into place the first time it scrolls into view.
 * Use `delay` (ms) to stagger items. Content is visible without JavaScript and
 * for people who prefer reduced motion.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = 'div',
}: {
  children: ReactNode
  className?: string
  delay?: number
  as?: ElementType
}) {
  const ref = useRef<HTMLElement>(null)
  // "idle" until mounted, so server-rendered HTML shows the content (good for SEO and no-JS).
  const [state, setState] = useState<'idle' | 'hidden' | 'shown'>('idle')

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // Already on screen when the page loads: show it straight away, no animation.
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight * 0.9) return
    setState('hidden')
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState('shown')
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: state === 'shown' ? `${delay}ms` : undefined } as CSSProperties}
      className={cn(
        'transition-[opacity,transform,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
        state === 'hidden' && 'translate-y-6 opacity-0 blur-[2px]',
        className,
      )}
    >
      {children}
    </Tag>
  )
}
