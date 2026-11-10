import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react'
import { CommunityThread } from '@/components/community/thread'
import { CodeBlock } from '@/components/docs/code-block'
import { DocsMobileNav } from '@/components/docs/docs-mobile-nav'
import { ExampleFrame } from '@/components/docs/example-frame'
import { catalog, CATEGORY_LABELS, getEntry, groupedCatalog, neighbours } from '@/docs/catalog'
import { loaders } from '@/docs/generated/loaders'
import { highlight, readSource } from '@/docs/source'
import type { DocsExampleMeta } from '@/docs/types'

export function generateStaticParams() {
  return catalog.map((e) => ({ slug: e.slug }))
}

export async function generateMetadata({ params }: PageProps<'/docs/[slug]'>): Promise<Metadata> {
  const entry = getEntry((await params).slug)
  return entry ? { title: `${entry.title} · Kryptonite UI`, description: entry.description } : {}
}

async function Example({ meta, Preview }: { meta: DocsExampleMeta; Preview: React.ComponentType<{ name: string }> }) {
  const code = await readSource(`src/components/examples/${meta.file}.tsx`)
  return <ExampleFrame preview={<Preview name={meta.name} />} code={code} codeHtml={await highlight(code)} />
}

export default async function DocsEntryPage({ params }: PageProps<'/docs/[slug]'>) {
  const { slug } = await params
  const entry = getEntry(slug)
  if (!entry) notFound()

  const Preview = (await loaders[slug]()).default
  const [demo, ...rest] = entry.examples
  const { prev, next } = neighbours(slug)
  const groups = groupedCatalog().map((g) => ({ ...g, entries: g.entries.map(({ slug, title }) => ({ slug, title })) }))
  const sources = await Promise.all(entry.files.map(async (f) => ({ file: f, code: await readSource(f) })))
  const isHook = entry.category === 'hooks'

  return (
    <article className="mx-auto max-w-3xl">
      <div className="mb-6 lg:hidden">
        <DocsMobileNav groups={groups} />
      </div>

      <nav className="mb-3 flex items-center gap-1.5 text-sm text-muted-foreground" aria-label="Breadcrumb">
        <Link href="/docs" className="hover:text-foreground">Docs</Link>
        <span>/</span>
        <span>{CATEGORY_LABELS[entry.category]}</span>
      </nav>

      <h1 className="font-heading text-4xl tracking-tight sm:text-5xl">{entry.title}</h1>
      <p className="mt-3 text-lg text-pretty text-muted-foreground">{entry.description}</p>

      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
        <span>{entry.examples.length} {entry.examples.length === 1 ? 'example' : 'examples'}</span>
        {entry.dependencies.length > 0 && (
          <span className="flex flex-wrap items-center gap-1.5">
            Depends on
            {entry.dependencies.map((d) => (
              <code key={d} className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">{d}</code>
            ))}
          </span>
        )}
        {entry.source === 'hextaui' && (
          <span>
            From{' '}
            <a href="https://hextaui.com" target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-foreground">
              HextaUI
            </a>{' '}
            (MIT)
          </span>
        )}
      </div>

      {demo && (
        <div className="mt-8">
          <Example meta={demo} Preview={Preview} />
        </div>
      )}

      {(entry.files.length > 0 || entry.dependencies.length > 0) && (
        <section className="mt-14">
          <h2 className="mb-4 font-heading text-2xl">Installation</h2>
          <ol className="space-y-6">
            {entry.dependencies.length > 0 && (
              <li className="space-y-3">
                <p className="text-sm text-muted-foreground">Install the dependencies:</p>
                <CodeBlock lang="bash" code={`npm install ${entry.dependencies.join(' ')}`} />
              </li>
            )}
            {entry.requires.length > 0 && (
              <li className="space-y-2">
                <p className="text-sm text-muted-foreground">It builds on these, so copy them first:</p>
                <div className="flex flex-wrap gap-1.5">
                  {entry.requires.map((r) => (
                    <Link key={r} href={`/docs/${r}`} className="rounded-md border px-2 py-1 font-mono text-xs hover:bg-muted">
                      {r}
                    </Link>
                  ))}
                </div>
              </li>
            )}
            {sources.map((s) => (
              <li key={s.file} className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Copy this into <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">{s.file.replace(/^src\//, '')}</code>:
                </p>
                <CodeBlock code={s.code} title={s.file.split('/').pop()} />
              </li>
            ))}
          </ol>
        </section>
      )}

      {rest.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-6 font-heading text-2xl">{isHook ? 'Usage' : 'Examples'}</h2>
          <div className="space-y-12">
            {rest.map((meta) => (
              <div key={meta.name} id={meta.name} className="scroll-mt-20">
                <h3 className="mb-3 text-base font-medium">{meta.title}</h3>
                <Example meta={meta} Preview={Preview} />
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mt-16">
        <h2 className="mb-2 font-heading text-2xl">Feedback</h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Questions, bugs or ideas for {entry.title}? Post them here, or reply to someone else. Sign in with GitHub to comment.
        </p>
        <CommunityThread term={`Component · ${entry.title}`} />
      </section>

      <nav className="mt-16 grid grid-cols-2 gap-4 border-t pt-6" aria-label="Pager">
        {prev ? (
          <Link href={`/docs/${prev.slug}`} className="group rounded-xl border p-4 transition-colors hover:bg-muted">
            <span className="flex items-center gap-1 text-xs text-muted-foreground"><IconArrowLeft className="size-3.5" /> Previous</span>
            <span className="mt-1 block font-medium">{prev.title}</span>
          </Link>
        ) : <span />}
        {next ? (
          <Link href={`/docs/${next.slug}`} className="group rounded-xl border p-4 text-right transition-colors hover:bg-muted">
            <span className="flex items-center justify-end gap-1 text-xs text-muted-foreground">Next <IconArrowRight className="size-3.5" /></span>
            <span className="mt-1 block font-medium">{next.title}</span>
          </Link>
        ) : <span />}
      </nav>
    </article>
  )
}
