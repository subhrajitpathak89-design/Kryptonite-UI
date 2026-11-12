'use client'

import { useEffect, useRef, useState } from 'react'
import { IconChevronDown } from '@tabler/icons-react'
import { cn } from '@/lib/utils'

/**
 * The seam between the hero and the first section: a beam of light that draws out
 * from the center as it scrolls into view, a soft glow spilling down from it, and a
 * small label pill riding on the line.
 */
export function SectionTransition({ label }: { label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  // Server HTML and reduced motion show the finished state; animate only when JS can.
  const [shown, setShown] = useState(true)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (el.getBoundingClientRect().top < window.innerHeight * 0.85) return
    setShown(false)
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -15% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} aria-hidden className="relative mx-auto w-full max-w-6xl px-4 py-14 sm:py-20">
      {/* Glow spilling down from the beam */}
      <div
        className={cn(
          'pointer-events-none absolute inset-x-0 top-1/2 mx-auto h-40 max-w-3xl -translate-y-4 rounded-[100%] bg-primary/15 blur-3xl transition-opacity duration-1000 ease-out',
          shown ? 'opacity-100' : 'opacity-0',
        )}
      />
      {/* The beam */}
      <div className="relative h-px w-full">
        <div
          className={cn(
            'absolute inset-0 origin-center bg-linear-to-r from-transparent via-primary to-transparent transition-transform duration-1000 ease-out',
            shown ? 'scale-x-100' : 'scale-x-0',
          )}
        />
        <div
          className={cn(
            'absolute inset-x-1/4 -top-px h-[3px] origin-center bg-linear-to-r from-transparent via-primary/70 to-transparent blur-[2px] transition-transform delay-150 duration-1000 ease-out',
            shown ? 'scale-x-100' : 'scale-x-0',
          )}
        />
      </div>
      {/* Pill riding on the line */}
      <div
        className={cn(
          'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all delay-300 duration-700 ease-out',
          shown ? 'scale-100 opacity-100' : 'scale-90 opacity-0',
        )}
      >
        <span className="flex items-center gap-1.5 rounded-full border border-primary/30 bg-background px-3.5 py-1.5 text-xs whitespace-nowrap text-muted-foreground shadow-[0_0_24px_-6px] shadow-primary/50">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75 motion-reduce:animate-none" />
            <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
          </span>
          {label}
          <IconChevronDown className="size-3.5 animate-bounce motion-reduce:animate-none" />
        </span>
      </div>
    </div>
  )
}
