// The list of components shown on the site.
// To add one: create src/components/kryptonite/<File>.tsx, add an entry here,
// and add its preview in src/registry/previews.tsx.

export type Category = 'Buttons' | 'Cards' | 'Text' | 'Backgrounds' | 'Layout'

export type EntryMeta = {
  name: string
  slug: string
  file: string
  category: Category
  description: string
}

export const registry: EntryMeta[] = [
  { name: 'Shimmer Button', slug: 'shimmer-button', file: 'ShimmerButton', category: 'Buttons', description: 'A neon pill with a light sweep that loops across its surface.' },
  { name: 'Glow Border Button', slug: 'glow-border-button', file: 'GlowBorderButton', category: 'Buttons', description: 'A rotating conic-gradient border that orbits the button.' },
  { name: 'Magnetic Button', slug: 'magnetic-button', file: 'MagneticButton', category: 'Buttons', description: 'Pulls toward the cursor while you hover over it.' },
  { name: 'Spotlight Card', slug: 'spotlight-card', file: 'SpotlightCard', category: 'Cards', description: 'A soft radial light follows the cursor across the card.' },
  { name: 'Tilt Card', slug: 'tilt-card', file: 'TiltCard', category: 'Cards', description: 'A 3D perspective tilt driven by the cursor position.' },
  { name: 'Gradient Text', slug: 'gradient-text', file: 'GradientText', category: 'Text', description: 'Text filled with a gradient that flows continuously.' },
  { name: 'Aurora Background', slug: 'aurora-background', file: 'AuroraBackground', category: 'Backgrounds', description: 'Slow-drifting blurred color fields for hero sections.' },
  { name: 'Marquee', slug: 'marquee', file: 'Marquee', category: 'Layout', description: 'An infinite horizontal scroller that pauses on hover.' },
]
