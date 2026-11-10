'use client'

import dynamic from 'next/dynamic'
import { useState, type ReactNode } from 'react'
import { IconCheck } from '@tabler/icons-react'
import { ShimmerButton } from '@/components/kryptonite'
import { cn } from '@/lib/utils'

// WebGL glow behind the windows (React Bits Aurora, site-only).
const Aurora = dynamic(() => import('./aurora'), { ssr: false })

const PRESETS = [
  { name: 'Kryptonite', color: '#39ff8f', shine: '#d9ffe9', text: '#000000', speed: 2.4 },
  { name: 'Ocean', color: '#2de2e6', shine: '#d6fbff', text: '#00262a', speed: 2.8 },
  { name: 'Sunset', color: '#fb923c', shine: '#ffe4cc', text: '#2a0f00', speed: 2 },
  { name: 'Violet', color: '#a78bfa', shine: '#efe7ff', text: '#1b0b3a', speed: 2.6 },
  { name: 'Rose', color: '#fb7185', shine: '#ffe0e5', text: '#2b0710', speed: 1.8 },
] as const

type Preset = (typeof PRESETS)[number]

function Window({ title, children, className }: { title: string; children: ReactNode; className?: string }) {
  return (
    <div className={cn('overflow-hidden rounded-xl border border-white/10 bg-[#121413]/90 shadow-2xl shadow-black/40 backdrop-blur-md', className)}>
      <div className="flex h-9 items-center justify-center border-b border-white/10 text-xs text-white/50">{title}</div>
      {children}
    </div>
  )
}

/** A tiny, fixed-shape syntax highlighter for the usage snippet. */
function Code({ p }: { p: Preset }) {
  const tag = 'text-[#7ee787]'
  const attr = 'text-[#79c0ff]'
  const str = 'text-[#a5d6ff]'
  const num = 'text-[#ffa657]'
  const kw = 'text-[#ff7b72]'
  const lines: ReactNode[] = [
    <><span className={kw}>import</span> {'{ ShimmerButton }'} <span className={kw}>from</span> <span className={str}>&apos;@/components/kryptonite&apos;</span></>,
    <>&nbsp;</>,
    <><span className={kw}>export default function</span> Hero() {'{'}</>,
    <>{'  '}<span className={kw}>return</span> (</>,
    <>{'    '}&lt;<span className={tag}>ShimmerButton</span></>,
    <>{'      '}<span className={attr}>color</span>=<span className={str}>&quot;{p.color}&quot;</span><span className="ml-2 inline-block size-2.5 rounded-sm align-middle" style={{ background: p.color }} /></>,
    <>{'      '}<span className={attr}>shineColor</span>=<span className={str}>&quot;{p.shine}&quot;</span></>,
    <>{'      '}<span className={attr}>speed</span>={'{'}<span className={num}>{p.speed}</span>{'}'}</>,
    <>{'    '}&gt;</>,
    <>{'      '}Get started</>,
    <>{'    '}&lt;/<span className={tag}>ShimmerButton</span>&gt;</>,
    <>{'  '})</>,
    <>{'}'}</>,
  ]
  return (
    <pre className="overflow-x-auto p-4 font-mono text-[12.5px] leading-6 text-white/80">
      {lines.map((l, i) => (
        <div key={i} className="flex">
          <span className="w-7 shrink-0 text-white/25 select-none">{i + 1}</span>
          <span className="whitespace-pre">{l}</span>
        </div>
      ))}
    </pre>
  )
}

export function HeroShowcase() {
  const [preset, setPreset] = useState<Preset>(PRESETS[0])

  return (
    // Always dark, in both themes, like a product screenshot.
    <div className="dark relative isolate overflow-hidden rounded-2xl border bg-[#0b0d0c] text-foreground">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <Aurora
          colorStops={[preset.color, '#0f9f5a', preset.color]}
          amplitude={1.1}
          blend={0.6}
          speed={0.5}
          direction="bottom"
          className="absolute inset-0 opacity-70"
        />
        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-[#0b0d0c] to-transparent" />
      </div>

      <div className="grid gap-4 p-4 sm:p-8 lg:grid-cols-[1.25fr_1fr] lg:gap-6 lg:p-12">
        <Window title="Hero.tsx" className="lg:mt-6">
          <Code p={preset} />
        </Window>

        <div className="flex flex-col gap-4 lg:gap-6">
          <Window title="Preview">
            <div className="grid h-36 place-items-center">
              <ShimmerButton key={preset.name} color={preset.color} shineColor={preset.shine} textColor={preset.text} speed={preset.speed}>
                Get started
              </ShimmerButton>
            </div>
          </Window>

          <Window title="Presets" className="lg:-ml-16">
            <ul className="p-2" aria-label="Color presets">
              {PRESETS.map((p) => (
                <li key={p.name}>
                  <button
                    type="button"
                    onClick={() => setPreset(p)}
                    aria-pressed={p.name === preset.name}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors',
                      p.name === preset.name ? 'bg-white/10 text-white' : 'text-white/60 hover:bg-white/5 hover:text-white',
                    )}
                  >
                    <span className="flex -space-x-1">
                      <span className="size-3 rounded-full ring-2 ring-[#121413]" style={{ background: p.color }} />
                      <span className="size-3 rounded-full ring-2 ring-[#121413]" style={{ background: p.shine }} />
                    </span>
                    <span className="flex-1">{p.name}</span>
                    <span className="hidden font-mono text-xs text-white/35 sm:inline">speed {p.speed}s</span>
                    {p.name === preset.name && <IconCheck className="size-4 text-white/70" />}
                  </button>
                </li>
              ))}
            </ul>
          </Window>
        </div>
      </div>
    </div>
  )
}
