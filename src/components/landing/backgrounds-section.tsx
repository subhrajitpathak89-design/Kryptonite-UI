'use client'

import Link from 'next/link'
import { useState, type ReactNode } from 'react'
import { IconArrowRight, IconClick, IconPointer } from '@tabler/icons-react'
import { AuroraBackground, GradientAscii, GradientBlinds, Silk } from '@/components/kryptonite'
import { Reveal } from '@/components/site/reveal'
import { cn } from '@/lib/utils'

type Bg = { slug: string; title: string; blurb: string; code: string; render: () => ReactNode; dark?: boolean }

const BACKGROUNDS: Bg[] = [
  {
    slug: 'gradient-ascii',
    title: 'Gradient ASCII',
    blurb: 'Characters lit by a drifting gradient. Hover to scramble, click for a wave.',
    code: `<GradientAscii\n  colors={['#1e3fd8', '#f6f8ff', '#a5d8ff', '#38bdf8']}\n  shape="horizon"\n  characters=" =+xX0S8#@"\n  cellSize={18}\n  clickEffect="wave"\n/>`,
    render: () => (
      <GradientAscii
        colors={['#1e3fd8', '#f6f8ff', '#a5d8ff', '#38bdf8']}
        shape="horizon"
        characters=" =+xX0S8#@"
        cellSize={18}
        density={0.8}
        glyphOpacity={0.85}
        glow={0.2}
        flicker={0.2}
        softness={0.5}
        flow={0.5}
        gradientOpacity={0.9}
        grain={0.08}
        scrambleRadius={0.1}
        clickEffect="wave"
        className="bg-black"
      />
    ),
  },
  {
    slug: 'gradient-blinds',
    title: 'Gradient Blinds',
    blurb: 'Slats over a gradient with a spotlight that follows you. Click to ripple.',
    code: `<GradientBlinds\n  gradientColors={['#FF9FFC', '#5227FF']}\n  angle={20}\n  blindCount={16}\n  shine={0.4}\n  clickEffect="ripple"\n/>`,
    render: () => (
      <GradientBlinds
        gradientColors={['#FF9FFC', '#5227FF']}
        angle={20}
        blindCount={16}
        blindMinWidth={60}
        spotlightRadius={0.5}
        shine={0.4}
        relief={0.5}
        glow={0.4}
        sway={0.35}
        hoverTilt={0.6}
        clickEffect="ripple"
        noise={0.3}
        mouseDampening={0.15}
        idle="drift"
      />
    ),
  },
  {
    slug: 'silk',
    title: 'Silk',
    blurb: 'Satin folds with a soft sheen. Move to push the cloth, click for a ripple.',
    code: `<Silk\n  color="#5227FF"\n  sheenColor="#ffffff"\n  speed={5}\n  sheen={0.5}\n  clickRipple\n/>`,
    render: () => <Silk color="#5227FF" sheenColor="#ffffff" speed={5} sheen={0.5} depth={0.5} glow={0.3} noiseIntensity={1.5} />,
  },
  {
    slug: 'aurora-background',
    title: 'Aurora',
    blurb: 'Light curtains that sway and shimmer on their own.',
    code: `<AuroraBackground\n  colors={['#39ff8f', '#2de2e6', '#8b5cf6']}\n  amplitude={1}\n  blend={0.5}\n/>`,
    render: () => <AuroraBackground className="size-full" />,
  },
]

/** Home page showcase: one big live stage with a tab per background. */
export function BackgroundsSection() {
  const [active, setActive] = useState(0)
  const bg = BACKGROUNDS[active]

  return (
    <section aria-labelledby="backgrounds-heading" className="mx-auto w-full max-w-[88rem] px-4 pb-28 sm:px-6 lg:px-10">
      <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border bg-card py-1 pr-3 pl-1 text-xs text-muted-foreground">
            <span className="rounded-full bg-primary px-2 py-0.5 font-medium text-primary-foreground">Backgrounds</span>
            WebGL and canvas, no dependencies
          </span>
          <h2 id="backgrounds-heading" className="mt-4 font-heading text-3xl font-medium tracking-tight text-balance sm:text-4xl">
            Backgrounds that move with you
          </h2>
          <p className="mt-3 max-w-xl text-pretty text-muted-foreground">
            Drop one behind a hero and it reacts to the cursor and clicks. Every prop is tweakable.
          </p>
        </div>
      </Reveal>

      <Reveal delay={100} className="mt-8">
        {/* Tabs */}
        <div className="-mx-4 mb-4 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0">
          <div role="tablist" aria-label="Backgrounds" className="flex w-max gap-2">
            {BACKGROUNDS.map((b, i) => (
              <button
                key={b.slug}
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className={cn(
                  'rounded-full border px-4 py-1.5 text-sm whitespace-nowrap transition-colors',
                  i === active ? 'border-primary/40 bg-primary/10 text-foreground' : 'text-muted-foreground hover:border-foreground/20 hover:text-foreground',
                )}
              >
                {b.title}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_22rem]">
          {/* Stage: only the active background runs */}
          <div className="relative h-[26rem] overflow-hidden rounded-2xl border bg-black sm:h-[34rem]">
            <div key={bg.slug} className="absolute inset-0 animate-in fade-in duration-500">
              {bg.render()}
            </div>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
              <h3 className="text-4xl font-medium tracking-tight text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)] sm:text-6xl">{bg.title}</h3>
              <p className="mt-3 max-w-md text-sm text-white/75 drop-shadow sm:text-base">{bg.blurb}</p>
            </div>
            <div className="pointer-events-none absolute bottom-4 left-4 flex gap-2 text-xs text-white/70">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1 backdrop-blur">
                <IconPointer className="size-3.5" /> Hover
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1 backdrop-blur">
                <IconClick className="size-3.5" /> Click
              </span>
            </div>
          </div>

          {/* Code + link */}
          <div className="flex flex-col overflow-hidden rounded-2xl border bg-card">
            <div className="border-b px-4 py-2.5 font-mono text-xs text-muted-foreground">Hero.tsx</div>
            <pre className="flex-1 overflow-x-auto p-4 font-mono text-[13px] leading-relaxed">
              <code>
                <span className="text-muted-foreground">{`<div className="relative h-[600px]">\n`}</span>
                {bg.code
                  .split('\n')
                  .map((l) => `  ${l}`)
                  .join('\n')}
                <span className="text-muted-foreground">{`\n</div>`}</span>
              </code>
            </pre>
            <Link
              href={`/docs/${bg.slug}`}
              className="flex items-center justify-between border-t px-4 py-3 text-sm font-medium transition-colors hover:text-primary"
            >
              All props for {bg.title} <IconArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
