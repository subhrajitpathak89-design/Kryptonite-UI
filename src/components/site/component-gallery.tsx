'use client'

import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { registry } from '@/registry/meta'
import { ComponentCard } from './component-card'

const categories = ['All', ...Array.from(new Set(registry.map((r) => r.category)))]

export function ComponentGallery({ sources }: { sources: Record<string, string> }) {
  const [cat, setCat] = useState('All')
  const [q, setQ] = useState('')
  const list = useMemo(
    () => registry.filter((r) => (cat === 'All' || r.category === cat) && r.name.toLowerCase().includes(q.toLowerCase())),
    [cat, q],
  )

  return (
    <section id="components" className="mx-auto w-full max-w-6xl px-4 py-16">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <Button key={c} size="sm" variant={cat === c ? 'default' : 'outline'} onClick={() => setCat(c)} className="rounded-full">
              {c}
            </Button>
          ))}
        </div>
        <div className="relative sm:w-64">
          <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search components…" className="pl-8" />
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {list.map((e) => (
          <ComponentCard key={e.slug} entry={e} code={sources[e.slug] ?? ''} />
        ))}
      </div>
      {list.length === 0 && <p className="py-16 text-center text-muted-foreground">No components match.</p>}
    </section>
  )
}
