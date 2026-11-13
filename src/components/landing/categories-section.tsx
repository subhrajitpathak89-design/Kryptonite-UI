import { Reveal } from '@/components/site/reveal'
import { CatalogGrid, type CatalogCard } from './catalog-grid'

/**
 * The catalog: a short intro, category filters and a grid of cards, each with a
 * live preview, the name and a one-line description. The last row fades out
 * under a "Show more components" button.
 */
export function CategoriesSection({
  cards,
  categories,
  total,
}: {
  cards: CatalogCard[]
  categories: { id: string; label: string }[]
  total: number
}) {
  return (
    <section aria-labelledby="catalog-heading" className="mx-auto w-full max-w-[88rem] px-4 sm:px-6 lg:px-10 pb-28">
      <Reveal>
        <span className="inline-flex items-center gap-2 rounded-full border bg-card py-1 pr-3 pl-1 text-xs text-muted-foreground">
          <span className="rounded-full bg-primary px-2 py-0.5 font-medium text-primary-foreground">Components</span>
          {total}+ free
        </span>
        <h2 id="catalog-heading" className="mt-4 font-heading text-3xl font-medium tracking-tight text-balance sm:text-4xl">
          Free animated components for React and Next.js
        </h2>
        <p className="mt-3 max-w-xl text-pretty text-muted-foreground">
          Copy-paste or install with one command. Built with Tailwind CSS, shadcn/ui and Motion, free for any project.
        </p>
      </Reveal>
      <Reveal delay={100} className="mt-8">
        <CatalogGrid cards={cards} categories={categories} />
      </Reveal>
    </section>
  )
}
