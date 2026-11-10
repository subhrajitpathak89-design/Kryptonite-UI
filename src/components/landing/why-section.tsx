'use client'

import { useEffect, useState, type ReactNode } from 'react'
import {
  IconArrowRight,
  IconBrandNextjs,
  IconBrandReact,
  IconBrandTailwind,
  IconBrandTypescript,
  IconCheck,
  IconCopy,
  IconFile,
  IconFolder,
} from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Reveal } from '@/components/site/reveal'
import { FEATURES } from './home-content'

function Card({ title, body, visual, className }: { title: string; body: string; visual: ReactNode; className?: string }) {
  return (
    <div className={cn('group flex flex-col overflow-hidden rounded-2xl border bg-card', className)}>
      <div className="relative flex min-h-48 flex-1 items-center justify-center overflow-hidden border-b bg-[radial-gradient(circle_at_center,var(--border)_1px,transparent_1px)] bg-[length:16px_16px] p-6">
        {visual}
      </div>
      <div className="p-6">
        <h3 className="font-heading text-lg font-medium">{title}</h3>
        <p className="mt-1.5 text-sm text-pretty text-muted-foreground">{body}</p>
      </div>
    </div>
  )
}

/** Copy and paste: a file lands in the project tree, then the copy button confirms. */
function CopyVisual() {
  const [copied, setCopied] = useState(false)
  useEffect(() => {
    const id = setInterval(() => setCopied((c) => !c), 2200)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="grid w-full max-w-lg grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
      <div className="rounded-xl border bg-background p-3 font-mono text-xs">
        <p className="mb-2 text-muted-foreground">your-app</p>
        <div className="space-y-1.5 pl-1">
          <p className="flex items-center gap-1.5 text-muted-foreground">
            <IconFolder className="size-3.5" /> components
          </p>
          <p className="flex items-center gap-1.5 pl-4 text-muted-foreground">
            <IconFolder className="size-3.5" /> kryptonite
          </p>
          <p
            className={cn(
              'flex items-center gap-1.5 rounded pl-8 transition-all',
              // Animate in when copied; disappear instantly on reset.
              copied ? 'translate-x-0 text-primary opacity-100 duration-500' : '-translate-x-2 opacity-0 duration-0',
            )}
          >
            <IconFile className="size-3.5" /> ShimmerButton.tsx
          </p>
        </div>
      </div>
      <div className="flex flex-col overflow-hidden rounded-xl border bg-background">
        <div className="flex items-center justify-between border-b px-3 py-2 font-mono text-xs text-muted-foreground">
          ShimmerButton.tsx
          <span className={cn('inline-flex items-center gap-1 transition-colors', copied && 'text-primary')}>
            {copied ? <IconCheck className="size-3.5" /> : <IconCopy className="size-3.5" />}
            {copied ? 'Copied' : 'Copy'}
          </span>
        </div>
        <div className="space-y-1.5 p-3">
          {[70, 90, 55, 80, 40].map((w, i) => (
            <div key={i} className="h-2 rounded-full bg-muted" style={{ width: `${w}%` }} />
          ))}
        </div>
      </div>
    </div>
  )
}

/** Accessible: keyboard focus moves between buttons. */
function KeyboardVisual() {
  const [focus, setFocus] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setFocus((f) => (f + 1) % 3), 1100)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex gap-2">
        {['Save', 'Share', 'Delete'].map((label, i) => (
          <span
            key={label}
            className={cn(
              'rounded-lg border bg-background px-3 py-1.5 text-sm transition-all duration-300',
              focus === i ? 'border-primary ring-3 ring-primary/30' : 'text-muted-foreground',
            )}
          >
            {label}
          </span>
        ))}
      </div>
      <div className="flex gap-1.5 font-mono text-xs">
        {['Tab', '↵', 'Esc'].map((k) => (
          <kbd key={k} className="rounded-md border border-b-2 bg-background px-2 py-1 text-muted-foreground">
            {k}
          </kbd>
        ))}
      </div>
    </div>
  )
}

/** States handled: a real Button with built-in loading and success feedback. Click it. */
function StatesVisual() {
  return (
    <div className="flex flex-col items-center gap-3">
      <Button feedback size="lg" onClick={() => new Promise<void>((r) => setTimeout(r, 1100))}>
        Save changes
      </Button>
      <span className="text-xs text-muted-foreground">Click it: loading, then success</span>
    </div>
  )
}

/** Stack: the tools it's built for. */
function StackVisual() {
  const items = [
    { icon: IconBrandNextjs, label: 'Next.js' },
    { icon: IconBrandReact, label: 'React 19' },
    { icon: IconBrandTailwind, label: 'Tailwind CSS v4' },
    { icon: IconBrandTypescript, label: 'TypeScript' },
  ]
  return (
    <div className="flex w-full max-w-lg flex-col items-center gap-4">
      <div className="grid w-full grid-cols-2 gap-2 sm:grid-cols-4">
        {items.map(({ icon: Icon, label }) => (
          <div key={label} className="flex flex-col items-center gap-2 rounded-xl border bg-background px-3 py-4 text-xs text-muted-foreground">
            <Icon className="size-7 text-foreground transition-transform duration-300 group-hover:-translate-y-0.5" />
            {label}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span className="rounded-full border px-2.5 py-1">shadcn/ui</span>
        <span className="rounded-full border px-2.5 py-1">Base UI</span>
        <span className="rounded-full border px-2.5 py-1">Dark and light mode</span>
      </div>
    </div>
  )
}

export function WhySection({ componentCount }: { componentCount: number }) {
  const [copy, a11y, states, stack] = FEATURES
  return (
    <section aria-labelledby="why-heading" className="mx-auto w-full max-w-6xl px-4 pb-24">
      <Reveal className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-2 text-sm font-medium text-primary">Why Kryptonite UI</p>
          <h2 id="why-heading" className="max-w-xl font-heading text-3xl font-medium tracking-tight text-balance sm:text-4xl">
            Looks great out of the box. Stays easy to change.
          </h2>
        </div>
        <div className="flex items-baseline gap-2 md:text-right">
          <span className="font-heading text-5xl font-medium tracking-tight">{componentCount}</span>
          <span className="text-sm text-muted-foreground">
            components,
            <br className="hidden md:block" /> all free and open source
          </span>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Reveal className="flex md:col-span-2">
          <Card className="flex-1" title={copy.title} body={copy.body} visual={<CopyVisual />} />
        </Reveal>
        <Reveal delay={100} className="flex">
          <Card className="flex-1" title={a11y.title} body={a11y.body} visual={<KeyboardVisual />} />
        </Reveal>
        <Reveal className="flex">
          <Card className="flex-1" title={states.title} body={states.body} visual={<StatesVisual />} />
        </Reveal>
        <Reveal delay={100} className="flex md:col-span-2">
          <Card className="flex-1" title={stack.title} body={stack.body} visual={<StackVisual />} />
        </Reveal>
      </div>

      <a href="/docs" className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
        See how to add your first component <IconArrowRight className="size-4" />
      </a>
    </section>
  )
}
