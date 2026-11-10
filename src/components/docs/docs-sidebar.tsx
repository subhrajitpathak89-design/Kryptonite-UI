'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMemo, useState } from 'react'
import { IconSearch } from '@tabler/icons-react'
import { cn } from '@/lib/utils'
import type { DocsEntry } from '@/docs/types'

type Group = { category: string; label: string; entries: Pick<DocsEntry, 'slug' | 'title'>[] }

export function DocsSidebar({ groups, className, onNavigate }: { groups: Group[]; className?: string; onNavigate?: () => void }) {
  const pathname = usePathname()
  const [q, setQ] = useState('')
  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase()
    if (!term) return groups
    return groups
      .map((g) => ({ ...g, entries: g.entries.filter((e) => e.title.toLowerCase().includes(term)) }))
      .filter((g) => g.entries.length > 0)
  }, [groups, q])

  const link = (href: string, label: string) => (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={pathname === href ? 'page' : undefined}
      className={cn(
        'block rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground',
        pathname === href && 'bg-muted font-medium text-foreground',
      )}
    >
      {label}
    </Link>
  )

  return (
    <div className={cn('flex h-full flex-col', className)}>
      <div className="relative mb-4">
        <IconSearch className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search components…"
          className="h-9 w-full rounded-md border bg-transparent pr-3 pl-8 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring"
        />
      </div>
      <nav aria-label="Docs" className="-mr-3 flex-1 overflow-y-auto pr-3 pb-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {!q && (
          <div className="mb-6">
            <p className="mb-1.5 px-2 text-xs font-medium text-muted-foreground/70">Getting started</p>
            {link('/docs', 'Introduction')}
          </div>
        )}
        {filtered.map((g) => (
          <div key={g.category} className="mb-6">
            <p className="mb-1.5 flex items-center justify-between px-2 text-xs font-medium text-muted-foreground/70">
              {g.label}
              <span className="tabular-nums">{g.entries.length}</span>
            </p>
            <ul>
              {g.entries.map((e) => (
                <li key={e.slug}>{link(`/docs/${e.slug}`, e.title)}</li>
              ))}
            </ul>
          </div>
        ))}
        {filtered.length === 0 && <p className="px-2 text-sm text-muted-foreground">No matches.</p>}
      </nav>
    </div>
  )
}
