import Link from 'next/link'
import { IconArrowUpRight, IconSparkles } from '@tabler/icons-react'
import { componentCount, latestBatch } from '@/docs/catalog'

/**
 * The strip at the very top of every page. It announces the latest batch of components
 * (from scripts/added.json), so it updates itself whenever new ones are added.
 */
export function AnnouncementBar() {
  const { entries } = latestBatch()
  if (!entries.length) return null

  const [first, second] = entries
  const more = entries.length - 2
  const names =
    entries.length === 1
      ? first.title
      : entries.length === 2
        ? `${first.title} and ${second.title}`
        : `${first.title}, ${second.title} and ${more} more`

  return (
    <Link
      href={`/docs/${first.slug}`}
      className="group relative z-50 flex min-h-10 items-center justify-center gap-2 bg-primary px-4 py-2 text-center text-[13px] text-primary-foreground"
    >
      <IconSparkles className="size-4 shrink-0" aria-hidden />
      <span className="min-w-0">
        <span className="font-semibold">New: {names}</span>
        <span className="hidden sm:inline">
          {' '}
          · {componentCount}+ components you can install with one command
        </span>
      </span>
      <IconArrowUpRight
        className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        aria-hidden
      />
    </Link>
  )
}
