import { ArrowRight } from 'lucide-react'
import { ComponentGallery } from '@/components/site/component-gallery'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { registry } from '@/registry/meta'
import { getComponentSources } from '@/registry/source'

const REPO = 'https://github.com/subhrajitpathak89-design/Kryptonite-UI'

export default async function Home() {
  const sources = await getComponentSources()

  return (
    <div className="flex min-h-screen flex-col">
      <nav className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-4">
          <a href="#" className="flex items-center gap-2 font-heading text-lg">
            <span className="size-3 rotate-45 rounded-sm bg-kr-green" />
            Kryptonite UI
          </a>
          <a href={REPO} target="_blank" rel="noreferrer" className="text-sm text-muted-foreground hover:text-foreground">
            GitHub
          </a>
        </div>
      </nav>

      <section className="border-b">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:py-28">
          <Badge variant="outline" className="mb-5">
            {registry.length} components · copy, paste, ship
          </Badge>
          <h1 className="font-heading text-5xl leading-[1.05] font-normal tracking-tight text-balance sm:text-7xl">
            Modern, flashy UI components <span className="text-muted-foreground italic">for your next project</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
            Animated React + Tailwind components built on shadcn/ui. No package to install: copy the code into your project and make it yours.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="#components" className={cn(buttonVariants({ size: 'lg' }), 'h-11 rounded-full px-6')}>
              Browse components <ArrowRight />
            </a>
            <a
              href={REPO}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'h-11 rounded-full px-6')}
            >
              Star on GitHub
            </a>
          </div>
        </div>
      </section>

      <ComponentGallery sources={sources} />

      <Separator />
      <footer className="py-8 text-center text-sm text-muted-foreground">Kryptonite UI · MIT licensed</footer>
    </div>
  )
}
