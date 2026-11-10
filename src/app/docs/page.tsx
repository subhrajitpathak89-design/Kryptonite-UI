import Link from 'next/link'
import { CodeBlock } from '@/components/docs/code-block'
import { DocsMobileNav } from '@/components/docs/docs-mobile-nav'
import { catalog, componentCount, groupedCatalog } from '@/docs/catalog'

export const metadata = { title: 'Introduction · Kryptonite UI' }

const utilsCode = `// src/lib/utils.ts
export { cn } from "cn"`

export default function DocsIntro() {
  const groups = groupedCatalog()
  const navGroups = groups.map((g) => ({ ...g, entries: g.entries.map(({ slug, title }) => ({ slug, title })) }))
  return (
    <article className="mx-auto max-w-3xl">
      <div className="mb-6 lg:hidden">
        <DocsMobileNav groups={navGroups} />
      </div>

      <p className="mb-3 text-sm text-muted-foreground">Getting started</p>
      <h1 className="font-heading text-4xl tracking-tight sm:text-5xl">Introduction</h1>
      <p className="mt-3 text-lg text-pretty text-muted-foreground">
        Kryptonite UI is a set of {componentCount} React components you copy into your project. They are built with Tailwind CSS,
        shadcn/ui and Base UI, and they handle loading, error and empty states for you.
      </p>

      <section className="mt-12 space-y-4">
        <h2 className="font-heading text-2xl">How it works</h2>
        <p className="text-muted-foreground">
          There is no package to install. Open a component, install its dependencies, and copy its file into your project. The code is
          yours to change.
        </p>
        <ol className="list-decimal space-y-2 pl-5 text-muted-foreground marker:text-foreground">
          <li>Set up a Next.js (or any React) project with Tailwind CSS v4 and shadcn/ui.</li>
          <li>
            Add the <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">cn</code> helper, which every
            component uses:
          </li>
        </ol>
        <CodeBlock code={utilsCode} />
        <ol start={3} className="list-decimal space-y-2 pl-5 text-muted-foreground marker:text-foreground">
          <li>
            Copy the theme tokens (colors, easing and keyframes) from{' '}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">src/app/globals.css</code> in the
            repository.
          </li>
          <li>Pick a component from the sidebar and follow its Installation steps.</li>
        </ol>
      </section>

      <section className="mt-12">
        <h2 className="mb-6 font-heading text-2xl">Browse</h2>
        <div className="space-y-8">
          {groups.map((g) => (
            <div key={g.category}>
              <h3 className="mb-3 text-sm font-medium text-muted-foreground">
                {g.label} <span className="tabular-nums">· {g.entries.length}</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {g.entries.map((e) => (
                  <Link key={e.slug} href={`/docs/${e.slug}`} className="rounded-lg border px-3 py-1.5 text-sm transition-colors hover:bg-muted">
                    {e.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 space-y-3 border-t pt-8 text-sm text-muted-foreground">
        <h2 className="font-heading text-2xl text-foreground">Credits</h2>
        <p>
          {catalog.filter((e) => e.source === 'hextaui').length} components, hooks and utilities come from{' '}
          <a href="https://hextaui.com" className="underline underline-offset-4 hover:text-foreground">HextaUI</a> by Preet Suthar,
          used under the MIT license. The landing page background is Light Rays from{' '}
          <a href="https://reactbits.dev" className="underline underline-offset-4 hover:text-foreground">React Bits</a> by David Haz.
          See THIRD_PARTY_NOTICES.md in the repository.
        </p>
      </section>
    </article>
  )
}
