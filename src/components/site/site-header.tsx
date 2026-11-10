import Image from 'next/image'
import Link from 'next/link'
import { IconBrandGithub } from '@tabler/icons-react'
import { cn } from '@/lib/utils'

export const REPO = 'https://github.com/subhrajitpathak89-design/Kryptonite-UI'

/** Your LinkedIn profile, shown as "Built by Subhrajit" in the footer. Leave empty to show the name without a link. */
export const LINKEDIN_URL = 'https://www.linkedin.com/in/subhrajit-pathak-8127aa230/'

export function SiteHeader({ className, transparent = false }: { className?: string; transparent?: boolean }) {
  return (
    <header
      className={cn(
        // No background: the bar scrolls away with the page instead of staying pinned,
        // so content never runs underneath it.
        'relative z-40 border-b bg-transparent',
        transparent && 'border-transparent',
        className,
      )}
    >
      <div className="mx-auto flex h-14 w-full max-w-screen-2xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-heading text-lg">
          <Image src="/logo.webp" alt="" width={28} height={28} priority />
          Kryptonite UI
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          <Link href="/docs" className="rounded-md px-3 py-1.5 text-muted-foreground transition-colors hover:text-foreground">
            Docs
          </Link>
          <Link href="/docs/button" className="rounded-md px-3 py-1.5 text-muted-foreground transition-colors hover:text-foreground">
            Components
          </Link>
          <Link href="/community" className="rounded-md px-3 py-1.5 text-muted-foreground transition-colors hover:text-foreground">
            Community
          </Link>
          <a
            href={REPO}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:text-foreground"
          >
            <IconBrandGithub className="size-5" />
          </a>
        </nav>
      </div>
    </header>
  )
}
