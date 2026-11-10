'use client'

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
} from '@/components/kryptonite'

export const previews: Record<string, ReactNode> = {
  'shimmer-button': <ShimmerButton>Get started</ShimmerButton>,
  'glow-border-button': <GlowBorderButton>Explore components</GlowBorderButton>,
  'magnetic-button': <MagneticButton>Hover me</MagneticButton>,
  'spotlight-card': (
    <SpotlightCard className="w-64">
      <p className="font-semibold">Spotlight</p>
      <p className="mt-1 text-sm text-muted-foreground">Move your cursor around this card.</p>
    </SpotlightCard>
  ),
  'tilt-card': (
    <TiltCard className="w-64">
      <p className="font-semibold">Tilt</p>
      <p className="mt-1 text-sm text-muted-foreground">It leans toward your pointer.</p>
    </TiltCard>
  ),
  'gradient-text': <GradientText className="text-4xl font-bold tracking-tight">Kryptonite</GradientText>,
  'aurora-background': (
    <AuroraBackground className="grid h-40 w-full place-items-center rounded-xl">
      <span className="text-lg font-semibold">Aurora</span>
    </AuroraBackground>
  ),
  marquee: (
    <Marquee className="w-full" duration={18}>
      {['React', 'Next.js', 'Tailwind', 'TypeScript', 'shadcn/ui', 'CSS'].map((t) => (
        <span key={t} className="rounded-full border border-border bg-card px-4 py-2 text-sm">
          {t}
        </span>
      ))}
    </Marquee>
  ),
}
