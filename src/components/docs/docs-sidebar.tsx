'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMemo, useState } from 'react'
import { IconBook, IconLayoutGrid, IconMessages, IconSearch, IconX } from '@tabler/icons-react'
import { CATEGORY_ICONS } from '@/components/site/category-icon'
import { cn } from '@/lib/utils'
import type { DocsEntry } from '@/docs/types'

type Group = { category: string; label: string; entries: Pick<DocsEntry, 'slug' | 'title'>[] }

const GET_STARTED = [
  { href: '/docs', label: 'Introduction', icon: IconBook },
  { href: '/community', label: 'Community', icon: IconMessages },
]

export function DocsSidebar({ groups, className, onNavigate }: { groups: Group[]; className?: string; onNavigate?: () => void }) {
  const pathname = usePathname()
  const [q, setQ] = useState('')
  const total = groups.reduce((n, g) => n + g.entries.length, 0)

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase()
    return groups
      .map((g) => ({ ...g, entries: term ? g.entries.filter((e) => e.title.toLowerCase().includes(term)) : g.entries }))
      .filter((g) => g.entries.length > 0)
  }, [groups, q])


  const linkClass = (active: boolean) =>
    cn(
      'flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-sm transition-colors',
      active ? 'bg-muted font-medium text-foreground' : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground',
    )

  return (
    <div className={cn('flex h-full flex-col rounded-2xl border bg-card/50 p-3', className)}>
      {/* Browse all */}
      <Link
        href="/docs"
        onClick={() => {
          setQ('')
          onNavigate?.()
        }}
        className="flex items-center gap-2.5 rounded-xl bg-muted px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted/70"
      >
        <IconLayoutGrid className="size-4 text-muted-foreground" />
        Browse all components
      </Link>

      {/* Search */}
      <div className="relative mt-2">
        <IconSearch className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={`Filter ${total} components…`}
          aria-label="Filter components"
          className="h-10 w-full rounded-xl border bg-transparent pr-8 pl-9 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring"
        />
        {q && (
          <button
            type="button"
            onClick={() => setQ('')}
            aria-label="Clear filter"
            className="absolute top-1/2 right-2 -translate-y-1/2 rounded-md p-1 text-muted-foreground hover:text-foreground"
          >
            <IconX className="size-3.5" />
          </button>
        )}
      </div>

      <nav aria-label="Docs" className="-mr-3 mt-5 flex-1 overflow-y-auto pr-3 pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {!q && (
          <div className="mb-6">
            <p className="mb-1.5 px-2.5 text-xs font-medium text-muted-foreground/70">Get started</p>
            {GET_STARTED.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href} onClick={onNavigate} aria-current={pathname === href ? 'page' : undefined} className={linkClass(pathname === href)}>
                <Icon className="size-4 shrink-0" stroke={1.75} />
                {label}
              </Link>
            ))}
          </div>
        )}

        {filtered.map((g) => {
          const Glyph = CATEGORY_ICONS[g.category] ?? IconLayoutGrid
          return (
            <div key={g.category} className="mb-6">
              <p className="mb-1.5 flex items-center gap-2 px-2.5 text-xs font-medium text-muted-foreground/70">
                <Glyph className="size-3.5 text-primary" stroke={1.75} />
                <span className="flex-1">{g.label}</span>
                <span className="tabular-nums">{g.entries.length}</span>
              </p>
              <ul>
                {g.entries.map((e) => {
                  const href = `/docs/${e.slug}`
                  return (
                    <li key={e.slug}>
                      <Link href={href} onClick={onNavigate} aria-current={pathname === href ? 'page' : undefined} className={linkClass(pathname === href)}>
                        {e.title}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
        {filtered.length === 0 && <p className="px-2.5 text-sm text-muted-foreground">No components match.</p>}
      </nav>
    </div>
  )
}
