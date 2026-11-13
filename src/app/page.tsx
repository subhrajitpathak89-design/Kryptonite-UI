import Link from 'next/link'
import { cn } from '@/lib/utils'
import { IconArrowRight, IconBrandGithub, IconBrandLinkedin, IconPlus } from '@tabler/icons-react'
import { ClientOnly } from '@/components/docs/client-only'
import { BackgroundsSection } from '@/components/landing/backgrounds-section'
import { CategoriesSection } from '@/components/landing/categories-section'
import { CommunityCta } from '@/components/landing/community-cta'
import { FAQ } from '@/components/landing/home-content'
import { WhySection } from '@/components/landing/why-section'
import { JsonLd } from '@/components/site/json-ld'
import { Reveal } from '@/components/site/reveal'
import { HeroShowcase } from '@/components/landing/hero-showcase'
import { RollButton } from '@/components/landing/roll-button'
import { WorksWithTicker } from '@/components/landing/works-with-ticker'
import { LINKEDIN_URL, REPO, SiteHeader } from '@/components/site/site-header'
import { catalog, componentCount, groupedCatalog, latestComponents } from '@/docs/catalog'
import { loaders } from '@/docs/generated/loaders'
import { BENTO_CLASSES, bentoSize } from '@/docs/bento'
import { absoluteUrl, SITE, SITE_URL } from '@/lib/site'


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

export default async function Home() {
  const groups = groupedCatalog()
  // The newest components, picked from scripts/added.json, so this grid updates itself.
  const latest = await Promise.all(
    latestComponents(8).map(async (e) => ({ ...e, Preview: (await loaders[e.slug]()).default })),
  )
  const newestDate = latest[0]?.addedAt
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={structuredData()} />
      <SiteHeader />

      <main className="flex flex-1 flex-col">

      <section aria-labelledby="hero-heading" className="mx-auto w-full max-w-[88rem] px-4 pt-8 pb-2 sm:px-6 lg:px-10 sm:pt-12">
        <Link
          href="/community"
          className="animate-in fade-in slide-in-from-bottom-3 duration-700 ease-out fill-mode-both motion-reduce:animate-none inline-flex items-center gap-2 rounded-lg border bg-card/60 py-1 pr-3 pl-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <span className="rounded-md bg-foreground px-2 py-0.5 text-xs font-semibold text-background">New</span>
          <span className="sm:hidden">Community</span>
          <span className="hidden sm:inline">Community threads</span>
          <IconArrowRight className="size-3.5" />
        </Link>

        <h1
          id="hero-heading"
          style={{ animationDelay: '80ms' }}
          className="animate-in fade-in slide-in-from-bottom-3 duration-700 ease-out fill-mode-both motion-reduce:animate-none mt-6 max-w-5xl font-heading text-4xl leading-[1.08] font-medium tracking-tight sm:text-5xl lg:text-6xl"
        >
          Modern, flashy React UI components for your next project
        </h1>

        <div style={{ animationDelay: '160ms' }} className="animate-in fade-in slide-in-from-bottom-3 duration-700 ease-out fill-mode-both motion-reduce:animate-none mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-wrap gap-3">
            <RollButton href="/docs" />
            <a
              href={REPO}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-xl border bg-card px-5 text-sm font-medium transition-colors hover:bg-muted"
            >
              <IconBrandGithub className="size-4" /> Star on GitHub
            </a>
          </div>
          <p className="max-w-md text-pretty text-muted-foreground lg:text-right">
            {componentCount} free, open-source animated components for Next.js, built with Tailwind CSS, shadcn/ui and Base UI. Copy them
            in and make them yours.
          </p>
        </div>

        <div style={{ animationDelay: '220ms' }} className="animate-in fade-in duration-700 ease-out fill-mode-both motion-reduce:animate-none mt-10">
          <WorksWithTicker />
        </div>

        <div style={{ animationDelay: '300ms' }} className="animate-in fade-in slide-in-from-bottom-6 duration-700 ease-out fill-mode-both motion-reduce:animate-none mt-10">
          {/* Shrinks back and dims as it scrolls away (scroll-driven, CSS only) */}
          <div className="scroll-exit">
            <HeroShowcase />
          </div>
        </div>
      </section>

      <section aria-labelledby="featured-heading" className="scroll-enter mx-auto w-full max-w-[88rem] px-4 sm:px-6 lg:px-10 pt-14 pb-24 sm:pt-20">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <h2 id="featured-heading" className="font-heading text-2xl tracking-tight sm:text-3xl">
              Just added
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">The newest components in the library, updated as they land.</p>
          </div>
          <Link href="/docs" className="hidden shrink-0 items-center gap-1 text-sm text-muted-foreground hover:text-foreground sm:inline-flex">
            View all <IconArrowRight className="size-4" />
          </Link>
        </div>
        <Reveal className="grid grid-flow-row-dense auto-rows-[minmax(15rem,auto)] sm:auto-rows-[21.5rem] grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {latest.map(({ slug, title, category, Preview, addedAt }) => (
            <div
              key={slug}
              className={cn(
                'group relative flex min-w-0 flex-col overflow-hidden rounded-2xl border bg-card transition-colors hover:border-foreground/20',
                BENTO_CLASSES[bentoSize({ slug, category })],
              )}
            >
              <div className="flex min-h-0 min-w-0 flex-1 items-center justify-center overflow-hidden p-5 sm:p-6 [&>*]:max-w-full">
                <ClientOnly fallback={<div className="h-10 w-32 animate-pulse rounded-md bg-muted" />}>
                  <Preview name="demo" />
                </ClientOnly>
              </div>
              <Link
                href={`/docs/${slug}`}
                className="flex items-center justify-between gap-2 border-t px-4 py-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <span className="flex min-w-0 items-center gap-2">
                  <span className="truncate">{title}</span>
                  {addedAt === newestDate && (
                    <span className="rounded-full bg-primary/15 px-1.5 py-0.5 text-[10px] font-medium text-primary">New</span>
                  )}
                </span>
                <IconArrowRight className="size-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            </div>
          ))}
        </Reveal>
      </section>

      <CategoriesSection
        total={componentCount}
        // Everything with a live demo except hooks, helpers and what "Just added" already shows.
        cards={catalog
          .filter((e) => e.category !== 'hooks' && e.category !== 'utilities' && e.examples.some((x) => x.name === 'demo') && !latest.some((l) => l.slug === e.slug))
          .map(({ slug, title, description, category }) => ({ slug, title, description, category }))}
        categories={groups
          .filter((g) => g.category !== 'hooks' && g.category !== 'utilities')
          .map((g) => ({ id: g.category, label: g.label }))}
      />

      <BackgroundsSection />

      <WhySection componentCount={componentCount} />

      <section aria-labelledby="faq-heading" className="mx-auto w-full max-w-3xl px-4 pb-24">
        <Reveal>
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
        </Reveal>
      </section>

      <section className="mx-auto w-full max-w-[88rem] px-4 sm:px-6 lg:px-10 pb-24">
        <Reveal>
          <CommunityCta />
        </Reveal>
      </section>
      </main>

      <footer className="mt-auto border-t">
        <div className="mx-auto flex max-w-[88rem] flex-col gap-2 px-4 sm:px-6 lg:px-10 py-8 text-sm text-muted-foreground sm:flex-row sm:justify-between">
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
