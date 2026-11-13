import { DocsSidebar } from '@/components/docs/docs-sidebar'
import { SiteHeader } from '@/components/site/site-header'
import { groupedCatalog } from '@/docs/catalog'

export default function DocsLayout({ children }: LayoutProps<'/docs'>) {
  const groups = groupedCatalog().map((g) => ({ ...g, entries: g.entries.map(({ slug, title }) => ({ slug, title })) }))
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <div className="mx-auto flex w-full max-w-[88rem] flex-1 gap-10 px-4 sm:px-6 lg:px-10">
        <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-72 shrink-0 py-6 lg:block">
          <DocsSidebar groups={groups} />
        </aside>
        <main className="min-w-0 flex-1 py-8 lg:py-12">{children}</main>
      </div>
    </div>
  )
}
