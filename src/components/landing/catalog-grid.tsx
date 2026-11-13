'use client'

import Link from 'next/link'
import { lazy, Suspense, useEffect, useMemo, useRef, useState, type ComponentType } from 'react'
import { IconArrowRight, IconArrowUpRight } from '@tabler/icons-react'
import { loaders } from '@/docs/generated/loaders'
import { cn } from '@/lib/utils'

export type CatalogCard = { slug: string; title: string; description: string; category: string }

const PAGE = 9

// One lazy component per slug, created once, so a preview never remounts.
const previews = new Map<string, ComponentType<{ name: string }>>()
function previewFor(slug: string) {
  let P = previews.get(slug)
  if (!P) {
    P = lazy(loaders[slug])
    previews.set(slug, P)
  }
  return P
}

/** Loads the live demo only once the card is near the screen. */
function LivePreview({ slug }: { slug: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [Preview, setPreview] = useState<ComponentType<{ name: string }> | null>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setPreview(() => previewFor(slug)), io.disconnect()), { rootMargin: '300px' })
    io.observe(el)
    return () => io.disconnect()
  }, [slug])
  const skeleton = <div className="h-10 w-32 animate-pulse rounded-lg bg-muted" />
  return (
    <div ref={ref} className="flex size-full items-center justify-center">
      {Preview ? (
        <Suspense fallback={skeleton}>
          <div className="flex max-h-full max-w-full origin-center scale-[0.85] items-center justify-center">
            <Preview name="demo" />
          </div>
        </Suspense>
      ) : (
        skeleton
      )}
    </div>
  )
}

export function CatalogGrid({ cards, categories }: { cards: CatalogCard[]; categories: { id: string; label: string }[] }) {
  const [category, setCategory] = useState('all')

  const filtered = useMemo(() => (category === 'all' ? cards : cards.filter((c) => c.category === category)), [cards, category])
  const visible = filtered.slice(0, PAGE)
  const hasMore = filtered.length > PAGE

  return (
    <>
      {/* Category filter */}
      <div className="-mx-4 mb-8 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0">
        <div role="tablist" aria-label="Filter by category" className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
          {[{ id: 'all', label: 'All' }, ...categories.filter((c) => cards.some((x) => x.category === c.id))].map((c) => (
            <button
              key={c.id}
              role="tab"
              aria-selected={category === c.id}
              onClick={() => {
                setCategory(c.id)
              }}
              className={cn(
                'rounded-full border px-3.5 py-1.5 text-sm whitespace-nowrap transition-colors',
                category === c.id
                  ? 'border-primary/40 bg-primary/10 text-foreground'
                  : 'text-muted-foreground hover:border-foreground/20 hover:text-foreground',
              )}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative">
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((c) => (
            <li key={c.slug} className="group relative flex flex-col overflow-hidden rounded-2xl border bg-card transition-colors hover:border-foreground/20">
              {/* Preview well */}
              <div className="relative m-2 mb-0 h-56 overflow-hidden rounded-xl border bg-background bg-[radial-gradient(var(--color-border)_1px,transparent_1px)] [background-size:16px_16px]">
                <LivePreview slug={c.slug} />
              </div>
              <Link href={`/docs/${c.slug}`} className="flex flex-1 flex-col px-4 pt-4 pb-5 after:absolute after:inset-x-0 after:bottom-0 after:top-[15.5rem]">
                <span className="flex items-center justify-between gap-2">
                  <span className="font-heading text-lg font-medium tracking-tight">{c.title}</span>
                  <IconArrowUpRight className="size-4 shrink-0 -translate-x-1 text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                </span>
                <span className="mt-1.5 line-clamp-2 text-sm text-pretty text-muted-foreground">{c.description}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Fade over the last row, with the button riding on it */}
        {hasMore && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex h-64 items-end justify-center bg-linear-to-b from-transparent via-background/80 to-background pb-6">
            <Link
              href={category === 'all' ? '/docs' : `/docs/${filtered[0].slug}`}
              className="pointer-events-auto inline-flex items-center gap-2 rounded-full border bg-card px-5 py-2.5 text-sm font-medium shadow-lg transition-colors hover:border-primary/40 hover:text-primary"
            >
              Show more components <IconArrowRight className="size-4" />
            </Link>
          </div>
        )}
      </div>

      {!hasMore && (
        <div className="mt-8 flex justify-center">
          <Link href="/docs" className="inline-flex items-center gap-2 rounded-full border bg-card px-5 py-2.5 text-sm font-medium transition-colors hover:border-primary/40 hover:text-primary">
            Browse all in the docs <IconArrowRight className="size-4" />
          </Link>
        </div>
      )}
    </>
  )
}
