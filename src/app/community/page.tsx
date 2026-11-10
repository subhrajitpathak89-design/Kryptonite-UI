import { IconBrandGithub } from '@tabler/icons-react'
import { CommunityTabs } from '@/components/community/community-tabs'
import { REPO, SiteHeader } from '@/components/site/site-header'

export const metadata = {
  title: 'Community',
  description: 'Share feedback, request React components and show what you built with Kryptonite UI.',
  alternates: { canonical: '/community' },
}

export default function CommunityPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:py-16">
        <p className="mb-3 text-sm text-muted-foreground">Community</p>
        <h1 className="font-heading text-4xl tracking-tight sm:text-5xl">Talk to us</h1>
        <p className="mt-3 text-lg text-pretty text-muted-foreground">
          Post feedback, ask for the components you need, and reply to others. Sign in with GitHub to post. Everything is saved as a
          public discussion on the repository.
        </p>
        <a
          href={`${REPO}/discussions`}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex h-9 items-center gap-2 rounded-full border px-4 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <IconBrandGithub className="size-4" /> See all discussions on GitHub
        </a>

        <div className="mt-12">
          <CommunityTabs />
        </div>
      </main>
    </div>
  )
}
