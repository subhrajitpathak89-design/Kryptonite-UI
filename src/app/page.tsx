import Link from 'next/link'
import { IconArrowRight, IconBrandGithub, IconBrandLinkedin, IconPlus } from '@tabler/icons-react'
import { ClientOnly } from '@/components/docs/client-only'
import { CommunityCta } from '@/components/landing/community-cta'
import { FAQ, FEATURES } from '@/components/landing/home-content'
import { JsonLd } from '@/components/site/json-ld'
import { HeroBackground } from '@/components/landing/hero-background'
import { LINKEDIN_URL, REPO, SiteHeader } from '@/components/site/site-header'
import { catalog, componentCount, groupedCatalog } from '@/docs/catalog'
import { absoluteUrl, SITE, SITE_URL } from '@/lib/site'
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

function structuredData() {
  const author = { '@type': 'Person', name: SITE.author.name, url: SITE.author.url }
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE.name,
      url: SITE_URL,
      description: SITE.description,
      inLanguage: 'en',
      author,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareSourceCode',
      name: SITE.name,
      description: SITE.description,
      url: SITE_URL,
      codeRepository: SITE.repo,
      programmingLanguage: ['TypeScript', 'React'],
      runtimePlatform: 'Next.js',
      license: 'https://opensource.org/licenses/MIT',
      keywords: SITE.keywords.join(', '),
      isAccessibleForFree: true,
      author,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: `${SITE.name} components`,
      numberOfItems: catalog.length,
      itemListElement: catalog.map((e, i) => ({ '@type': 'ListItem', position: i + 1, name: e.title, url: absoluteUrl(`/docs/${e.slug}`) })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ]
}

export default function Home() {
  const groups = groupedCatalog()
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={structuredData()} />
      <SiteHeader transparent />

      <main className="flex flex-1 flex-col">

      <section className="relative isolate -mt-14 overflow-hidden pt-14">
        <HeroBackground />
        <div className="mx-auto max-w-4xl px-4 pt-14 pb-16 text-center sm:pt-20">
          <Link
            href="/docs"
            className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background/40 px-3 py-1 text-xs text-muted-foreground backdrop-blur transition-colors hover:text-foreground"
          >
            {componentCount} components · copy, paste, ship <IconArrowRight className="size-3.5" />
          </Link>
          <h1 className="font-heading text-4xl leading-[1.1] font-medium tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Modern, flashy React UI components for your next project
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-base text-pretty text-muted-foreground sm:text-lg">
            Free, open-source animated components for Next.js, built with Tailwind CSS, shadcn/ui and Base UI. Loading, error and empty
            states are handled. Copy them in and make them yours.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
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

      <section aria-labelledby="featured-heading" className="mx-auto w-full max-w-6xl px-4 pb-24">
        <h2 id="featured-heading" className="sr-only">
          Featured components
        </h2>
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

      <section aria-labelledby="why-heading" className="mx-auto w-full max-w-6xl px-4 pb-24">
        <h2 id="why-heading" className="font-heading text-3xl tracking-tight sm:text-4xl">
          Why Kryptonite UI
        </h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          A React component library that looks great out of the box and stays easy to change.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {FEATURES.map((f) => (
            <div key={f.title} className="rounded-2xl border bg-card p-6">
              <h3 className="font-heading text-lg">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="faq-heading" className="mx-auto w-full max-w-3xl px-4 pb-24">
        <h2 id="faq-heading" className="text-center font-heading text-3xl tracking-tight sm:text-4xl">
          Frequently asked questions
        </h2>
        <div className="mt-8 divide-y rounded-2xl border bg-card">
          {FAQ.map((f) => (
            <details key={f.q} className="group px-6 py-4 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
                <h3 className="text-base">{f.q}</h3>
                <IconPlus className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-45" />
              </summary>
              <p className="mt-3 text-sm text-pretty text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-24">
        <CommunityCta />
      </section>
      </main>

      <footer className="mt-auto border-t">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:justify-between">
          <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span>Kryptonite UI · MIT licensed</span>
            <Link href="/docs" className="hover:text-foreground">Docs</Link>
            <Link href="/docs/button" className="hover:text-foreground">Components</Link>
            <Link href="/community" className="hover:text-foreground">Community</Link>
            <a href={REPO} target="_blank" rel="noreferrer" className="hover:text-foreground">GitHub</a>
          </nav>
          <span>
            Built by{' '}
            {LINKEDIN_URL ? (
              <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-foreground underline-offset-4 hover:underline">
                Subhrajit <IconBrandLinkedin className="size-4" />
              </a>
            ) : (
              <span className="text-foreground">Subhrajit</span>
            )}
          </span>
        </div>
      </footer>
    </div>
  )
}
