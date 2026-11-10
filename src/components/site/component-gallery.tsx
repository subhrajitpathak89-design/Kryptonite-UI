'use client'

import { useEffect, useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { registry, type EntryMeta } from '@/registry/meta'
import { ComponentCard } from './component-card'

const categories = Array.from(new Set(registry.map((r) => r.category)))

/** Tracks which component card is currently on screen, to highlight it in the side panel. */
function useActiveSlug(slugs: string[]) {
  const [active, setActive] = useState<string | null>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-80px 0px -55% 0px' },
    )
    slugs.forEach((s) => {
      const el = document.getElementById(s)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [slugs])
  return active
}

function SidePanel({
  list,
  q,
  setQ,
  active,
}: {
  list: EntryMeta[]
  q: string
  setQ: (v: string) => void
  active: string | null
}) {
  return (
    <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-60 shrink-0 flex-col border-r py-8 pr-4 lg:flex">
      <div className="relative mb-6">
        <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Find a component…" className="pl-8" />
      </div>
      <nav className="-mr-4 flex-1 overflow-y-auto pr-4" aria-label="Components">
        {categories.map((cat) => {
          const items = list.filter((e) => e.category === cat)
          if (items.length === 0) return null
          return (
            <div key={cat} className="mb-6">
              <h4 className="mb-2 flex items-center justify-between px-2 font-sans text-xs font-medium tracking-wide text-muted-foreground uppercase">
                {cat}
                <span className="tabular-nums">{items.length}</span>
              </h4>
              <ul className="space-y-0.5">
                {items.map((e) => (
                  <li key={e.slug}>
                    <a
                      href={`#${e.slug}`}
                      className={cn(
                        'block rounded-md border-l-2 border-transparent px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground',
                        active === e.slug && 'border-kr-green bg-accent text-foreground',
                      )}
                    >
                      {e.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
        {list.length === 0 && <p className="px-2 text-sm text-muted-foreground">No matches.</p>}
      </nav>
    </aside>
  )
}

export function ComponentGallery({ sources }: { sources: Record<string, string> }) {
  const [cat, setCat] = useState('All')
  const [q, setQ] = useState('')
  const list = useMemo(
    () => registry.filter((r) => (cat === 'All' || r.category === cat) && r.name.toLowerCase().includes(q.toLowerCase())),
    [cat, q],
  )
  const slugs = useMemo(() => list.map((e) => e.slug), [list])
  const active = useActiveSlug(slugs)

  return (
    <section id="components" className="mx-auto flex w-full max-w-7xl gap-8 px-4">
      <SidePanel list={list} q={q} setQ={setQ} active={active} />

      <div className="min-w-0 flex-1 py-10">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-heading text-3xl">Components</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Showing <Badge variant="secondary">{list.length}</Badge> of {registry.length}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {['All', ...categories].map((c) => (
              <Button key={c} size="sm" variant={cat === c ? 'default' : 'outline'} onClick={() => setCat(c)} className="rounded-full">
                {c}
              </Button>
            ))}
          </div>
        </div>

        {/* Search for small screens, where the side panel is hidden */}
        <div className="relative mb-6 lg:hidden">
          <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Find a component…" className="pl-8" />
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          {list.map((e) => (
            <ComponentCard key={e.slug} entry={e} code={sources[e.slug] ?? ''} />
          ))}
        </div>
        {list.length === 0 && <p className="py-16 text-center text-muted-foreground">No components match.</p>}
      </div>
    </section>
  )
}
