import type { ReactNode } from 'react'
import {
  AuroraBackground,
  GlowBorderButton,
  GradientText,
  MagneticButton,
  Marquee,
  ShimmerButton,
  SpotlightCard,
  TiltCard,
} from '../components/ui'

// Source code of each component, loaded as text so users can copy it.
const sources = import.meta.glob('../components/ui/*.tsx', { query: '?raw', import: 'default', eager: true }) as Record<string, string>
const src = (name: string) => sources[`../components/ui/${name}.tsx`] ?? ''

export type Entry = {
  name: string
  slug: string
  category: 'Buttons' | 'Cards' | 'Text' | 'Backgrounds' | 'Layout'
  description: string
  preview: ReactNode
  code: string
}

export const registry: Entry[] = [
  {
    name: 'Shimmer Button',
    slug: 'shimmer-button',
    category: 'Buttons',
    description: 'A neon pill with a light sweep that loops across its surface.',
    preview: <ShimmerButton>Get started</ShimmerButton>,
    code: src('ShimmerButton'),
  },
  {
    name: 'Glow Border Button',
    slug: 'glow-border-button',
    category: 'Buttons',
    description: 'A rotating conic-gradient border that orbits the button.',
    preview: <GlowBorderButton>Explore components</GlowBorderButton>,
    code: src('GlowBorderButton'),
  },
  {
    name: 'Magnetic Button',
    slug: 'magnetic-button',
    category: 'Buttons',
    description: 'Pulls toward the cursor while you hover over it.',
    preview: <MagneticButton>Hover me</MagneticButton>,
    code: src('MagneticButton'),
  },
  {
    name: 'Spotlight Card',
    slug: 'spotlight-card',
    category: 'Cards',
    description: 'A soft radial light follows the cursor across the card.',
    preview: (
      <SpotlightCard className="w-64">
        <p className="font-semibold">Spotlight</p>
        <p className="mt-1 text-sm text-zinc-400">Move your cursor around this card.</p>
      </SpotlightCard>
    ),
    code: src('SpotlightCard'),
  },
  {
    name: 'Tilt Card',
    slug: 'tilt-card',
    category: 'Cards',
    description: 'A 3D perspective tilt driven by the cursor position.',
    preview: (
      <TiltCard className="w-64">
        <p className="font-semibold">Tilt</p>
        <p className="mt-1 text-sm text-zinc-400">It leans toward your pointer.</p>
      </TiltCard>
    ),
    code: src('TiltCard'),
  },
  {
    name: 'Gradient Text',
    slug: 'gradient-text',
    category: 'Text',
    description: 'Text filled with a gradient that flows continuously.',
    preview: <GradientText className="text-4xl font-bold tracking-tight">Kryptonite</GradientText>,
    code: src('GradientText'),
  },
  {
    name: 'Aurora Background',
    slug: 'aurora-background',
    category: 'Backgrounds',
    description: 'Slow-drifting blurred color fields for hero sections.',
    preview: (
      <AuroraBackground className="grid h-40 w-full place-items-center rounded-xl">
        <span className="text-lg font-semibold">Aurora</span>
      </AuroraBackground>
    ),
    code: src('AuroraBackground'),
  },
  {
    name: 'Marquee',
    slug: 'marquee',
    category: 'Layout',
    description: 'An infinite horizontal scroller that pauses on hover.',
    preview: (
      <Marquee className="w-full" duration={18}>
        {['React', 'Tailwind', 'TypeScript', 'Vite', 'Motion', 'CSS'].map((t) => (
          <span key={t} className="rounded-full border border-kr-line bg-kr-surface px-4 py-2 text-sm">
            {t}
          </span>
        ))}
      </Marquee>
    ),
    code: src('Marquee'),
  },
]
