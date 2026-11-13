'use client'

import dynamic from 'next/dynamic'
import { useState, type ReactNode } from 'react'
import { IconCheck } from '@tabler/icons-react'
import { cn } from '@/lib/utils'

// WebGL effects, loaded only in the browser (React Bits Aurora and Specular Button, site-only).
const Aurora = dynamic(() => import('./aurora'), { ssr: false })
const SpecularButton = dynamic(() => import('./specular-button'), { ssr: false })

// "Silver" is the exact setup from the design; the others recolor the edge light, base and tint.
const PRESETS = [
  { name: 'Silver', line: '#ffffff', base: '#525252', tint: '#ffffff', glow: '#9ca3af' },
  { name: 'Kryptonite', line: '#39ff8f', base: '#166534', tint: '#39ff8f', glow: '#39ff8f' },
  { name: 'Ocean', line: '#2de2e6', base: '#155e75', tint: '#2de2e6', glow: '#2de2e6' },
  { name: 'Sunset', line: '#fb923c', base: '#7c2d12', tint: '#fb923c', glow: '#fb923c' },
  { name: 'Violet', line: '#a78bfa', base: '#4c1d95', tint: '#a78bfa', glow: '#a78bfa' },
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
  const prop = (name: string, value: ReactNode) => (
    <>
      {'  '}
      <span className={attr}>{name}</span>={value}
    </>
  )
  const text = (v: string) => <span className={str}>&quot;{v}&quot;</span>
  const n = (v: number) => (
    <>
      {'{'}
      <span className={num}>{v}</span>
      {'}'}
    </>
  )
  const swatch = (c: string) => <span className="ml-2 inline-block size-2.5 rounded-sm align-middle ring-1 ring-white/20" style={{ background: c }} />
  const lines: ReactNode[] = [
    <><span className={kw}>import</span> SpecularButton <span className={kw}>from</span> <span className={str}>&apos;./SpecularButton&apos;</span>;</>,
    <>&nbsp;</>,
    <>&lt;<span className={tag}>SpecularButton</span></>,
    prop('size', text('lg')),
    prop('radius', n(18)),
    <>{prop('tint', text(p.tint))}{swatch(p.tint)}</>,
    prop('tintOpacity', n(0.04)),
    prop('textColor', text('#f5f5f5')),
    <>{prop('lineColor', text(p.line))}{swatch(p.line)}</>,
    <>{prop('baseColor', text(p.base))}{swatch(p.base)}</>,
    prop('intensity', n(1)),
    prop('idleIntensity', n(0.35)),
    prop('shineSize', n(10)),
    prop('shineFade', n(34)),
    prop('thickness', n(1.2)),
    prop('glow', n(1)),
    <>{'  '}<span className={attr}>followMouse</span></>,
    prop('proximity', n(250)),
    <>&gt;</>,
    <>{'  '}Get Started</>,
    <>&lt;/<span className={tag}>SpecularButton</span>&gt;</>,
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
          colorStops={[preset.glow, '#0f9f5a', preset.glow]}
          amplitude={1.1}
          blend={0.6}
          speed={0.5}
          direction="bottom"
          className="absolute inset-0 opacity-70"
        />
        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-[#0b0d0c] to-transparent" />
      </div>

      <div className="grid grid-cols-1 gap-4 p-4 sm:p-8 md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] md:gap-5 lg:gap-6 lg:p-12">
        <Window title="Hero.tsx" className="hidden sm:block lg:mt-6">
          <Code p={preset} />
        </Window>

        <div className="flex flex-col gap-4 lg:gap-6">
          <Window title="Preview">
            <div className="grid h-36 place-items-center">
              <SpecularButton
                size="lg"
                radius={18}
                tint={preset.tint}
                tintOpacity={0.04}
                textColor="#f5f5f5"
                lineColor={preset.line}
                baseColor={preset.base}
                intensity={1}
                idleIntensity={0.35}
                shineSize={10}
                shineFade={34}
                thickness={1.2}
                glow={1}
                followMouse
                proximity={250}
              >
                Get Started
              </SpecularButton>
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
                      <span className="size-3 rounded-full ring-2 ring-[#121413]" style={{ background: p.line }} />
                      <span className="size-3 rounded-full ring-2 ring-[#121413]" style={{ background: p.base }} />
                    </span>
                    <span className="flex-1">{p.name}</span>
                    <span className="hidden font-mono text-xs text-white/35 sm:inline">{p.line}</span>
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
