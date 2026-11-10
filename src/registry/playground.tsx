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

/* ------------------------------------------------------------------ */
/* Control definitions                                                 */
/* ------------------------------------------------------------------ */

export type Control =
  | { key: string; label: string; type: 'color'; default: string }
  | { key: string; label: string; type: 'range'; default: number; min: number; max: number; step: number; unit?: string }
  | { key: string; label: string; type: 'switch'; default: boolean }
  | { key: string; label: string; type: 'text'; default: string }

export type Values = Record<string, string | number | boolean>

export type Playground = {
  controls: Control[]
  /** Renders the live preview from the current control values */
  render: (v: Values) => ReactNode
  /** Builds the usage snippet from the current control values */
  usage: (v: Values) => string
}

const color = (key: string, label: string, def: string): Control => ({ key, label, type: 'color', default: def })
const range = (key: string, label: string, def: number, min: number, max: number, step: number, unit?: string): Control => ({
  key,
  label,
  type: 'range',
  default: def,
  min,
  max,
  step,
  unit,
})
const toggle = (key: string, label: string, def: boolean): Control => ({ key, label, type: 'switch', default: def })
const text = (key: string, label: string, def: string): Control => ({ key, label, type: 'text', default: def })

export const defaultsOf = (controls: Control[]): Values => Object.fromEntries(controls.map((c) => [c.key, c.default]))

/* ------------------------------------------------------------------ */
/* Usage-code helpers                                                  */
/* ------------------------------------------------------------------ */

type PropValue = string | number | boolean | string[]

function formatProp(name: string, value: PropValue) {
  if (value === true) return name
  if (typeof value === 'string') return `${name}="${value}"`
  if (Array.isArray(value)) return `${name}={[${value.map((v) => `'${v}'`).join(', ')}]}`
  return `${name}={${value}}`
}

/**
 * Writes a JSX snippet. Props equal to their default are left out,
 * so the snippet only shows what the user changed.
 */
function jsx(tag: string, props: Record<string, [PropValue, PropValue]>, children: string, extra: string[] = []) {
  const changed = Object.entries(props)
    .filter(([, [value, def]]) => JSON.stringify(value) !== JSON.stringify(def))
    .map(([name, [value]]) => formatProp(name, value))
  const attrs = [...extra, ...changed]
  const open = attrs.length > 2 ? `<${tag}\n  ${attrs.join('\n  ')}\n>` : `<${tag}${attrs.map((a) => ` ${a}`).join('')}>`
  const body = children.includes('\n') ? `\n${children.replace(/^/gm, '  ')}\n` : children
  return `import { ${tag} } from '@/components/kryptonite'\n\n${open}${body}</${tag}>`
}

const n = (v: Values, k: string) => v[k] as number
const s = (v: Values, k: string) => v[k] as string
const b = (v: Values, k: string) => v[k] as boolean

/* ------------------------------------------------------------------ */
/* Playgrounds, one per component (keyed by slug)                      */
/* ------------------------------------------------------------------ */

const shimmer: Control[] = [
  text('label', 'Label', 'Get started'),
  color('color', 'Color', '#39ff8f'),
  color('shineColor', 'Shine', '#d9ffe9'),
  color('textColor', 'Text', '#000000'),
  range('speed', 'Speed', 2.4, 0.5, 6, 0.1, 's'),
  toggle('glow', 'Glow', true),
]

const glowBorder: Control[] = [
  text('label', 'Label', 'Explore components'),
  color('colorFrom', 'Color 1', '#39ff8f'),
  color('colorTo', 'Color 2', '#2de2e6'),
  color('background', 'Fill', '#1c1c1c'),
  range('speed', 'Speed', 4, 1, 10, 0.5, 's'),
  range('borderWidth', 'Border', 1.5, 1, 4, 0.5, 'px'),
]

const magnetic: Control[] = [
  text('label', 'Label', 'Hover me'),
  color('color', 'Color', '#39ff8f'),
  range('strength', 'Pull', 0.35, 0.05, 1, 0.05),
]

const spotlight: Control[] = [
  color('color', 'Color', '#39ff8f'),
  range('size', 'Size', 400, 100, 800, 20, 'px'),
  range('intensity', 'Intensity', 18, 5, 60, 1, '%'),
]

const tilt: Control[] = [
  range('max', 'Tilt', 12, 2, 30, 1, '°'),
  range('scale', 'Scale', 1.02, 1, 1.1, 0.01),
  toggle('glare', 'Glare', true),
  color('glareColor', 'Glare color', '#ffffff'),
]

const gradientText: Control[] = [
  text('label', 'Text', 'Kryptonite'),
  color('c1', 'Color 1', '#39ff8f'),
  color('c2', 'Color 2', '#2de2e6'),
  color('c3', 'Color 3', '#8b5cf6'),
  range('speed', 'Speed', 6, 1, 15, 0.5, 's'),
  toggle('animate', 'Animate', true),
]

const aurora: Control[] = [
  color('c1', 'Color 1', '#39ff8f'),
  color('c2', 'Color 2', '#2de2e6'),
  color('c3', 'Color 3', '#8b5cf6'),
  range('speed', 'Speed', 12, 3, 30, 1, 's'),
  range('opacity', 'Strength', 60, 10, 100, 5, '%'),
  range('blur', 'Blur', 64, 0, 120, 4, 'px'),
]

const marquee: Control[] = [
  range('duration', 'Duration', 18, 5, 60, 1, 's'),
  range('gap', 'Gap', 16, 0, 64, 4, 'px'),
  toggle('reverse', 'Reverse', false),
  toggle('pauseOnHover', 'Pause on hover', true),
  toggle('fade', 'Fade edges', true),
]

const marqueeItems = ['React', 'Next.js', 'Tailwind', 'TypeScript', 'shadcn/ui', 'CSS']

export const playgrounds: Record<string, Playground> = {
  'shimmer-button': {
    controls: shimmer,
    render: (v) => (
      <ShimmerButton color={s(v, 'color')} shineColor={s(v, 'shineColor')} textColor={s(v, 'textColor')} speed={n(v, 'speed')} glow={b(v, 'glow')}>
        {s(v, 'label')}
      </ShimmerButton>
    ),
    usage: (v) =>
      jsx(
        'ShimmerButton',
        {
          color: [s(v, 'color'), '#39ff8f'],
          shineColor: [s(v, 'shineColor'), '#d9ffe9'],
          textColor: [s(v, 'textColor'), '#000000'],
          speed: [n(v, 'speed'), 2.4],
          glow: [b(v, 'glow'), true],
        },
        s(v, 'label'),
      ),
  },
  'glow-border-button': {
    controls: glowBorder,
    render: (v) => (
      <GlowBorderButton colorFrom={s(v, 'colorFrom')} colorTo={s(v, 'colorTo')} background={s(v, 'background')} speed={n(v, 'speed')} borderWidth={n(v, 'borderWidth')}>
        {s(v, 'label')}
      </GlowBorderButton>
    ),
    usage: (v) =>
      jsx(
        'GlowBorderButton',
        {
          colorFrom: [s(v, 'colorFrom'), '#39ff8f'],
          colorTo: [s(v, 'colorTo'), '#2de2e6'],
          background: [s(v, 'background'), '#1c1c1c'],
          speed: [n(v, 'speed'), 4],
          borderWidth: [n(v, 'borderWidth'), 1.5],
        },
        s(v, 'label'),
      ),
  },
  'magnetic-button': {
    controls: magnetic,
    render: (v) => (
      <MagneticButton color={s(v, 'color')} strength={n(v, 'strength')}>
        {s(v, 'label')}
      </MagneticButton>
    ),
    usage: (v) => jsx('MagneticButton', { color: [s(v, 'color'), '#39ff8f'], strength: [n(v, 'strength'), 0.35] }, s(v, 'label')),
  },
  'spotlight-card': {
    controls: spotlight,
    render: (v) => (
      <SpotlightCard className="w-64" color={s(v, 'color')} size={n(v, 'size')} intensity={n(v, 'intensity')}>
        <p className="font-semibold">Spotlight</p>
        <p className="mt-1 text-sm text-muted-foreground">Move your cursor around this card.</p>
      </SpotlightCard>
    ),
    usage: (v) =>
      jsx(
        'SpotlightCard',
        { color: [s(v, 'color'), '#39ff8f'], size: [n(v, 'size'), 400], intensity: [n(v, 'intensity'), 18] },
        '<p>Your content</p>',
      ),
  },
  'tilt-card': {
    controls: tilt,
    render: (v) => (
      <TiltCard className="w-64" max={n(v, 'max')} scale={n(v, 'scale')} glare={b(v, 'glare')} glareColor={s(v, 'glareColor')}>
        <p className="font-semibold">Tilt</p>
        <p className="mt-1 text-sm text-muted-foreground">It leans toward your pointer.</p>
      </TiltCard>
    ),
    usage: (v) =>
      jsx(
        'TiltCard',
        { max: [n(v, 'max'), 12], scale: [n(v, 'scale'), 1.02], glare: [b(v, 'glare'), true], glareColor: [s(v, 'glareColor'), '#ffffff'] },
        '<p>Your content</p>',
      ),
  },
  'gradient-text': {
    controls: gradientText,
    render: (v) => (
      <GradientText
        className="text-4xl font-bold tracking-tight"
        colors={[s(v, 'c1'), s(v, 'c2'), s(v, 'c3')]}
        speed={n(v, 'speed')}
        animate={b(v, 'animate')}
      >
        {s(v, 'label')}
      </GradientText>
    ),
    usage: (v) =>
      jsx(
        'GradientText',
        {
          colors: [[s(v, 'c1'), s(v, 'c2'), s(v, 'c3')], ['#39ff8f', '#2de2e6', '#8b5cf6']],
          speed: [n(v, 'speed'), 6],
          animate: [b(v, 'animate'), true],
        },
        s(v, 'label'),
      ),
  },
  'aurora-background': {
    controls: aurora,
    render: (v) => (
      <AuroraBackground
        className="grid h-40 w-full place-items-center rounded-xl"
        colors={[s(v, 'c1'), s(v, 'c2'), s(v, 'c3')]}
        speed={n(v, 'speed')}
        opacity={n(v, 'opacity')}
        blur={n(v, 'blur')}
      >
        <span className="text-lg font-semibold">Aurora</span>
      </AuroraBackground>
    ),
    usage: (v) =>
      jsx(
        'AuroraBackground',
        {
          colors: [[s(v, 'c1'), s(v, 'c2'), s(v, 'c3')], ['#39ff8f', '#2de2e6', '#8b5cf6']],
          speed: [n(v, 'speed'), 12],
          opacity: [n(v, 'opacity'), 60],
          blur: [n(v, 'blur'), 64],
        },
        '<h1>Your hero</h1>',
        ['className="min-h-screen"'],
      ),
  },
  marquee: {
    controls: marquee,
    render: (v) => (
      <Marquee className="w-full" duration={n(v, 'duration')} gap={n(v, 'gap')} reverse={b(v, 'reverse')} pauseOnHover={b(v, 'pauseOnHover')} fade={b(v, 'fade')}>
        {marqueeItems.map((t) => (
          <span key={t} className="rounded-full border border-border bg-card px-4 py-2 text-sm">
            {t}
          </span>
        ))}
      </Marquee>
    ),
    usage: (v) =>
      jsx(
        'Marquee',
        {
          duration: [n(v, 'duration'), 25],
          gap: [n(v, 'gap'), 16],
          reverse: [b(v, 'reverse'), false],
          pauseOnHover: [b(v, 'pauseOnHover'), true],
          fade: [b(v, 'fade'), true],
        },
        '<span>Item one</span>\n<span>Item two</span>\n<span>Item three</span>',
      ),
  },
}
