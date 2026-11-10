'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * The header's scroll behaviour:
 * - At the top of the page it is fully transparent.
 * - Once you scroll, it gains a blurred, see-through background and gets more compact.
 * - Scrolling down hides it; scrolling up brings it straight back.
 */
export function HeaderShell({ children, className }: { children: ReactNode; className?: string }) {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const y = window.scrollY
        const delta = y - lastY.current
        setScrolled(y > 12)
        // Ignore tiny movements so the bar doesn't flicker.
        if (Math.abs(delta) > 6) setHidden(delta > 0 && y > 160)
        lastY.current = y
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <header
      data-scrolled={scrolled || undefined}
      className={cn(
        'group/header sticky top-0 z-40 border-b border-transparent transition-[transform,background-color,border-color,backdrop-filter] duration-300 ease-out motion-reduce:transition-none',
        scrolled && 'border-border bg-background/70 backdrop-blur-xl',
        hidden && '-translate-y-full',
        className,
      )}
    >
      {children}
    </header>
  )
}
