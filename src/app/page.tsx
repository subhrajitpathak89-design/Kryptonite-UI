import Link from 'next/link'
import { IconArrowRight, IconBrandGithub } from '@tabler/icons-react'
import { ClientOnly } from '@/components/docs/client-only'
import { HeroBackground } from '@/components/landing/hero-background'
import { REPO, SiteHeader } from '@/components/site/site-header'
import { catalog, componentCount, groupedCatalog } from '@/docs/catalog'
import { ShimmerButtonDemo } from '@/components/examples/shimmer-button/demo'
import { ButtonDemo } from '@/components/examples/button/demo'
import { SwitchDemo } from '@/components/examples/switch/demo'
import { InputOTPDemo } from '@/components/examples/input-otp/demo'
import { SpotlightCardDemo } from '@/components/examples/spotlight-card/demo'
import { NumberFlowDemo } from '@/components/examples/number-flow/demo'
import { BadgeDemo } from '@/components/examples/badge/demo'
import { MarqueeDemo } from '@/components/examples/marquee/demo'

const showcase = [
  { slug: 'shimmer-button', title: 'Shimmer Button', Demo: ShimmerButtonDemo },
  { slug: 'button', title: 'Button', Demo: ButtonDemo },
  { slug: 'input-otp', title: 'Input OTP', Demo: InputOTPDemo },
  { slug: 'spotlight-card', title: 'Spotlight Card', Demo: SpotlightCardDemo },
  { slug: 'number-flow', title: 'Number Flow', Demo: NumberFlowDemo },
  { slug: 'switch', title: 'Switch', Demo: SwitchDemo },
  { slug: 'badge', title: 'Badge', Demo: BadgeDemo },
  { slug: 'marquee', title: 'Marquee', Demo: MarqueeDemo },
]

export default function Home() {
  const groups = groupedCatalog()
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader transparent />

      <section className="relative isolate -mt-14 overflow-hidden pt-14">
        <HeroBackground />
        <div className="mx-auto max-w-4xl px-4 pt-24 pb-20 text-center sm:pt-32">
          <Link
            href="/docs"
            className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background/40 px-3 py-1 text-xs text-muted-foreground backdrop-blur transition-colors hover:text-foreground"
          >
            {componentCount} components · copy, paste, ship <IconArrowRight className="size-3.5" />
          </Link>
          <h1 className="font-heading text-5xl leading-[1.05] tracking-tight text-balance sm:text-7xl">
            Modern, flashy UI components for your next project
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-pretty text-muted-foreground">
            Animated React components built on shadcn/ui and Base UI, with loading, error and empty states handled. Copy them in and make
            them yours.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link
              href="/docs"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-6 font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Browse components <IconArrowRight className="size-4" />
            </Link>
            <a
              href={REPO}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-full border bg-background/50 px-6 font-medium backdrop-blur transition-colors hover:bg-muted"
            >
              <IconBrandGithub className="size-4" /> GitHub
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-24">
        <div className="grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {showcase.map(({ slug, title, Demo }) => (
            <div key={slug} className="group relative flex min-h-56 flex-col bg-card">
              <div className="flex flex-1 items-center justify-center overflow-hidden p-6">
                <ClientOnly fallback={<div className="h-10 w-32 animate-pulse rounded-md bg-muted" />}>
                  <Demo />
                </ClientOnly>
              </div>
              <Link
                href={`/docs/${slug}`}
                className="flex items-center justify-between border-t px-4 py-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {title} <IconArrowRight className="size-4 opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-24">
        <h2 className="font-heading text-3xl tracking-tight sm:text-4xl">Everything you need to build an interface</h2>
        <p className="mt-2 text-muted-foreground">{catalog.length} components, hooks and utilities, grouped the way you look for them.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((g) => (
            <Link
              key={g.category}
              href={`/docs/${g.entries[0].slug}`}
              className="rounded-2xl border bg-card p-5 transition-colors hover:bg-muted"
            >
              <div className="flex items-baseline justify-between">
                <h3 className="font-heading text-xl">{g.label}</h3>
                <span className="text-sm text-muted-foreground tabular-nums">{g.entries.length}</span>
              </div>
              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{g.entries.map((e) => e.title).join(', ')}</p>
            </Link>
          ))}
        </div>
      </section>

      <footer className="mt-auto border-t">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:justify-between">
          <span>Kryptonite UI · MIT licensed</span>
          <span>
            Components from <a href="https://hextaui.com" className="underline underline-offset-4 hover:text-foreground">HextaUI</a>, background
            from <a href="https://reactbits.dev" className="underline underline-offset-4 hover:text-foreground">React Bits</a>
          </span>
        </div>
      </footer>
    </div>
  )
}
