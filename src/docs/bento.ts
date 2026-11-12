import type { DocsEntry } from './types'

/** How much room a component's demo needs in the home page bento grid. */
export type BentoSize = 'small' | 'wide' | 'tall' | 'large'

// Components whose demo needs more than one cell. Anything not listed falls back
// to its category (see below), then to a single cell.
const SIZES: Record<string, BentoSize> = {
  'ai-prompt': 'wide',
  'ai-loading': 'wide',
  'activity-terrain': 'large',
  'drape-background': 'wide',
  'aurora-background': 'wide',
  'apple-activity-card': 'tall',
  'liquid-gauge': 'tall',
  'wheel-picker': 'tall',
  'data-table': 'large',
  calendar: 'tall',
  chart: 'wide',
  'video-player': 'wide',
  'message-scroller': 'tall',
  marquee: 'wide',
  'plucked-text': 'wide',
}

const BY_CATEGORY: Record<string, BentoSize> = {
  ai: 'wide',
  chat: 'wide',
  backgrounds: 'wide',
  media: 'wide',
}

export const bentoSize = (e: Pick<DocsEntry, 'slug' | 'category'>): BentoSize =>
  SIZES[e.slug] ?? BY_CATEGORY[e.category] ?? 'small'

/** Grid classes for each size (2 columns from sm, 4 from lg). */
export const BENTO_CLASSES: Record<BentoSize, string> = {
  small: '',
  wide: 'sm:col-span-2',
  tall: 'sm:row-span-2',
  large: 'sm:col-span-2 sm:row-span-2',
}
