import { AuroraBackground, GlowBorderButton, GradientText, ShimmerButton } from '@/components/kryptonite'
import { ComponentGallery } from '@/components/site/component-gallery'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { registry } from '@/registry/meta'
import { getComponentSources } from '@/registry/source'

const REPO = 'https://github.com/subhrajitpathak89-design/Kryptonite-UI'

export default async function Home() {
  const sources = await getComponentSources()

  return (
    <div className="flex min-h-screen flex-col">
      <nav className="sticky top-0 z-20 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4">
          <a href="#" className="flex items-center gap-2 font-semibold">
            <span className="size-3 rotate-45 rounded-sm bg-kr-green shadow-[0_0_12px_#39ff8f]" />
            Kryptonite UI
          </a>
          <a href={REPO} target="_blank" rel="noreferrer" className="text-sm text-muted-foreground hover:text-foreground">
            GitHub
          </a>
        </div>
      </nav>

      <AuroraBackground className="bg-background">
        <section className="mx-auto max-w-4xl px-4 py-24 text-center sm:py-32">
          <Badge variant="outline" className="mb-5 bg-background/50">
            {registry.length} components · copy, paste, ship
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-6xl">
            Modern, flashy UI components <GradientText>for your next project</GradientText>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
            Animated React + Tailwind components built on shadcn/ui. No package to install: copy the code into your project and make it yours.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="#components">
              <ShimmerButton>Browse components</ShimmerButton>
            </a>
            <a href={REPO} target="_blank" rel="noreferrer">
              <GlowBorderButton>Star on GitHub</GlowBorderButton>
            </a>
          </div>
        </section>
      </AuroraBackground>

      <ComponentGallery sources={sources} />

      <Separator />
      <footer className="py-8 text-center text-sm text-muted-foreground">Kryptonite UI · MIT licensed</footer>
    </div>
  )
}
