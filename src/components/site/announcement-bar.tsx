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

  // Phones get a one-liner: the first name and how many more.
  const short = entries.length === 1 ? first.title : `${first.title} +${entries.length - 1} more`

  return (
    <Link
      href={`/docs/${first.slug}`}
      className="group relative z-50 flex min-h-8 items-center justify-center gap-1.5 bg-primary px-3 py-1 text-center text-[11px] leading-tight text-primary-foreground sm:min-h-10 sm:gap-2 sm:px-4 sm:py-2 sm:text-[13px]"
    >
      <IconSparkles className="size-3.5 shrink-0 sm:size-4" aria-hidden />
      <span className="min-w-0">
        <span className="font-semibold">
          New: <span className="sm:hidden">{short}</span>
          <span className="hidden sm:inline">{names}</span>
        </span>
        <span className="hidden sm:inline">
          {' '}
          · {componentCount}+ components you can install with one command
        </span>
      </span>
      <IconArrowUpRight
        className="size-3.5 shrink-0 transition-transform sm:size-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        aria-hidden
      />
    </Link>
  )
}
