import Link from 'next/link'
import { IconArrowRight, IconArrowUpRight } from '@tabler/icons-react'
import { CATEGORY_ICONS } from '@/components/site/category-icon'
import { Reveal } from '@/components/site/reveal'
import { IconLayoutGrid } from '@tabler/icons-react'

type Group = { category: string; label: string; entries: { slug: string; title: string }[] }

/**
 * "Everything you need": a sticky intro on the left, and a calm two-column list
 * of categories on the right, one slim row each.
 */
export function CategoriesSection({ groups, total, sources }: { groups: Group[]; total: number; sources: number }) {
  const hooks = groups.find((g) => g.category === 'hooks')?.entries.length ?? 0
  const stats = [
    { value: total, label: 'components, hooks and utilities' },
    { value: groups.length, label: 'categories' },
    { value: hooks, label: 'React hooks' },
    { value: sources, label: 'open-source libraries, credited' },
  ]

  return (
    <section aria-labelledby="catalog-heading" className="mx-auto w-full max-w-6xl px-4 pb-28">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,9fr)] lg:gap-14">
        {/* Intro: sticks while the list scrolls past on large screens */}
        <Reveal className="lg:sticky lg:top-24 lg:self-start">
          <p className="mb-3 text-sm font-medium text-primary">The catalog</p>
          <h2 id="catalog-heading" className="font-heading text-3xl font-medium tracking-tight text-balance sm:text-4xl">
            Everything you need to build an interface
          </h2>
          <p className="mt-4 max-w-sm text-pretty text-muted-foreground">
            Grouped the way you look for them. Pick a category to see every component in it, with live previews and code.
          </p>

          <dl className="mt-8 grid max-w-sm grid-cols-2 gap-x-6 gap-y-5">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-heading text-3xl font-medium tracking-tight tabular-nums">{s.value}</dd>
                <dd className="mt-0.5 text-xs text-muted-foreground">{s.label}</dd>
              </div>
            ))}
          </dl>

          <Link href="/docs" className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
            Browse everything <IconArrowRight className="size-4" />
          </Link>
        </Reveal>

        {/* Category list */}
        <Reveal delay={100}>
          <ul className="grid overflow-hidden rounded-2xl border bg-card/40 sm:grid-cols-2">
            {groups.map((g) => {
              const Glyph = CATEGORY_ICONS[g.category] ?? IconLayoutGrid
              const preview = g.entries
                .slice(0, 3)
                .map((e) => e.title)
                .join(', ')
              return (
                <li key={g.category} className="border-b last:border-b-0 sm:odd:border-r sm:[&:nth-last-child(-n+2):nth-child(odd)]:border-b-0 sm:[&:last-child:nth-child(odd)]:col-span-2 sm:[&:last-child:nth-child(odd)]:border-r-0">
                  <Link
                    href={`/docs/${g.entries[0].slug}`}
                    className="group flex h-full items-center gap-3.5 px-5 py-4 transition-colors hover:bg-muted/60"
                  >
                    <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                      <Glyph className="size-[18px]" stroke={1.75} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-baseline gap-2">
                        <span className="font-medium">{g.label}</span>
                        <span className="text-xs text-muted-foreground tabular-nums">{g.entries.length}</span>
                      </span>
                      <span className="mt-0.5 block truncate text-xs text-muted-foreground">{preview}</span>
                    </span>
                    <IconArrowUpRight className="size-4 shrink-0 -translate-x-1 text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                  </Link>
                </li>
              )
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
