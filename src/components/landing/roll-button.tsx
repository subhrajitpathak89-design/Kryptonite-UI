'use client'

import Link from 'next/link'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { IconArrowRight } from '@tabler/icons-react'
import { cn } from '@/lib/utils'

/** "Browse components" in a few languages. The first one is shown at rest. */
const LABELS = [
  { text: 'Browse components', lang: 'en' },
  { text: 'कंपोनेंट्स देखें', lang: 'hi' },
  { text: 'Explorar componentes', lang: 'es' },
  { text: 'কম্পোনেন্ট দেখুন', lang: 'bn' },
  { text: 'Parcourir les composants', lang: 'fr' },
  { text: 'コンポーネントを見る', lang: 'ja' },
  { text: 'Komponenten ansehen', lang: 'de' },
]

const STEP_MS = 850

/**
 * A link button whose label rolls through translations while hovered, with an
 * arrow that slides in. The width animates to fit each label. At rest, and for
 * people who prefer reduced motion, it simply reads "Browse components".
 */
export function RollButton({ href, className }: { href: string; className?: string }) {
  const [index, setIndex] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [widths, setWidths] = useState<number[]>([])
  const measureRefs = useRef<(HTMLSpanElement | null)[]>([])

  // Measure every label once so the width can animate between them.
  useLayoutEffect(() => {
    const measure = () => setWidths(measureRefs.current.map((el) => el?.offsetWidth ?? 0))
    measure()
    document.fonts?.ready.then(measure)
  }, [])

  // Roll to the next language every STEP_MS while hovered; snap back to English on leave.
  useEffect(() => {
    if (!hovered) {
      setIndex(0)
      return
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setIndex(1)
    const id = setInterval(() => setIndex((i) => (i + 1) % LABELS.length), STEP_MS)
    return () => clearInterval(id)
  }, [hovered])

  const width = widths[index]

  return (
    <Link
      href={href}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      aria-label="Browse components"
      className={cn(
        'group/roll relative inline-flex h-11 items-center rounded-xl bg-foreground px-5 text-sm font-medium text-background transition-[box-shadow] duration-300 hover:shadow-[0_0_0_4px_color-mix(in_oklab,var(--foreground)_15%,transparent)]',
        className,
      )}
    >
      {/* Hidden copies used only to measure each label's width */}
      <span aria-hidden className="pointer-events-none invisible absolute -z-10 whitespace-nowrap">
        {LABELS.map((l, i) => (
          <span key={l.lang} ref={(el) => void (measureRefs.current[i] = el)} lang={l.lang} className="absolute whitespace-nowrap">
            {l.text}
          </span>
        ))}
      </span>

      {/* The rolling label: a column of labels moved up one line per step */}
      <span
        aria-hidden
        className="relative block h-[1.5em] overflow-hidden leading-[1.5em] transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ width: width ? `${width}px` : undefined }}
      >
        <span
          className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
          style={{ transform: `translateY(-${index * 1.5}em)` }}
        >
          {LABELS.map((l) => (
            <span key={l.lang} lang={l.lang} className="block h-[1.5em] whitespace-nowrap">
              {l.text}
            </span>
          ))}
        </span>
      </span>

      {/* Arrow slides in on hover */}
      <span
        aria-hidden
        className="inline-flex w-0 -translate-x-2 items-center overflow-hidden opacity-0 transition-all duration-300 ease-out group-hover/roll:ml-2 group-hover/roll:w-4 group-hover/roll:translate-x-0 group-hover/roll:opacity-100 group-focus-visible/roll:ml-2 group-focus-visible/roll:w-4 group-focus-visible/roll:translate-x-0 group-focus-visible/roll:opacity-100"
      >
        <IconArrowRight className="size-4 shrink-0" />
      </span>
    </Link>
  )
}
