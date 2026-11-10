import Image from 'next/image'
import Link from 'next/link'
import { IconArrowRight, IconBrandGithub } from '@tabler/icons-react'
import { formatStars, getGithubStars } from './github-stars'
import { HeaderShell } from './header-shell'
import { Hint } from './hint'
import { MobileNav, type NavLink } from './mobile-nav'
import { ThemeToggle } from './theme-toggle'

export const REPO = 'https://github.com/subhrajitpathak89-design/Kryptonite-UI'

/** Your LinkedIn profile, shown as "Built by Subhrajit" in the footer. Leave empty to show the name without a link. */
export const LINKEDIN_URL = 'https://www.linkedin.com/in/subhrajit-pathak-8127aa230/'

const LINKS: NavLink[] = [
  { href: '/docs', label: 'Docs' },
  { href: '/docs/button', label: 'Components' },
  { href: '/community', label: 'Community', badge: 'New' },
]

export async function SiteHeader({ className }: { className?: string; transparent?: boolean }) {
  const stars = await getGithubStars('subhrajitpathak89-design/Kryptonite-UI')

  return (
    <HeaderShell className={className}>
      <div className="mx-auto flex h-16 w-full max-w-screen-2xl items-center justify-between gap-4 px-4 transition-[height] duration-300 group-data-[scrolled]/header:h-14 sm:px-6">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 font-heading text-[17px] font-medium">
            <Image src="/kryptonite-logo.webp" alt="" width={26} height={26} priority />
            Kryptonite UI
          </Link>
          <span aria-hidden className="hidden text-lg text-muted-foreground/40 md:inline">
            /
          </span>
          <nav aria-label="Main" className="hidden items-center gap-1 text-sm md:flex">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
                {l.badge && (
                  <span className="rounded-full bg-primary/15 px-1.5 py-px text-[10px] leading-4 font-semibold text-primary">{l.badge}</span>
                )}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle className="inline-flex size-9 items-center justify-center rounded-lg border bg-background/40 p-0 backdrop-blur" />
          <Hint label={stars === null ? 'Star on GitHub' : `Star on GitHub · ${stars} ${stars === 1 ? 'star' : 'stars'}`}>
          <a
            href={REPO}
            target="_blank"
            rel="noreferrer"
            aria-label={stars === null ? 'GitHub' : `GitHub, ${stars} stars`}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border bg-background/40 px-3 text-sm font-medium text-muted-foreground backdrop-blur transition-colors hover:text-foreground"
          >
            <IconBrandGithub className="size-4" />
            {stars === null ? <span className="hidden sm:inline">GitHub</span> : formatStars(stars)}
          </a>
          </Hint>
          <Link
            href="/docs"
            className="hidden h-9 items-center gap-1.5 rounded-lg bg-primary px-3.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 sm:inline-flex"
          >
            Browse components <IconArrowRight className="size-4" />
          </Link>
          <MobileNav links={LINKS} />
        </div>
      </div>
    </HeaderShell>
  )
}
