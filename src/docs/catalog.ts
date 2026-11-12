import { CATEGORY_LABELS, catalog } from './generated/catalog'
import type { DocsEntry } from './types'

export { catalog, CATEGORY_LABELS }

export const getEntry = (slug: string) => catalog.find((e) => e.slug === slug)

/** Entries grouped by category, in sidebar order. */
export function groupedCatalog() {
  const groups: { category: string; label: string; entries: DocsEntry[] }[] = []
  for (const entry of catalog) {
    let group = groups.find((g) => g.category === entry.category)
    if (!group) {
      group = { category: entry.category, label: CATEGORY_LABELS[entry.category] ?? entry.category, entries: [] }
      groups.push(group)
    }
    group.entries.push(entry)
  }
  return groups
}

/** Previous and next entries, for the pager at the bottom of each page. */
export function neighbours(slug: string) {
  const i = catalog.findIndex((e) => e.slug === slug)
  return { prev: catalog[i - 1], next: catalog[i + 1] }
}

export const componentCount = catalog.filter((e) => e.category !== 'hooks' && e.category !== 'utilities').length

/** Components (not hooks or helpers) that have a demo, newest first. */
export function latestComponents(limit = 8) {
  return catalog
    .filter((e) => e.category !== 'hooks' && e.category !== 'utilities' && e.examples.some((x) => x.name === 'demo'))
    .toSorted((a, b) => b.addedAt.localeCompare(a.addedAt) || a.title.localeCompare(b.title))
    .slice(0, limit)
}

/** The most recent batch of components: everything added on the latest date. */
export function latestBatch() {
  const latest = latestComponents(Infinity)
  const date = latest[0]?.addedAt
  return { date, entries: latest.filter((e) => e.addedAt === date) }
}
