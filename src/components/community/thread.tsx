'use client'

import Giscus from '@giscus/react'
import { useTheme } from 'next-themes'
import { IconBrandGithub, IconMessages } from '@tabler/icons-react'
import { GISCUS, isCommunityReady } from '@/lib/community'

/**
 * A comment thread backed by one GitHub Discussion. People sign in with GitHub
 * to post, reply and react. `term` decides which discussion the thread uses.
 */
export function CommunityThread({ term }: { term: string }) {
  const { resolvedTheme } = useTheme()
  if (!isCommunityReady()) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed p-8 text-center">
        <IconMessages className="size-8 text-muted-foreground" />
        <p className="font-medium">Comments are almost ready</p>
        <p className="max-w-md text-sm text-muted-foreground">
          This thread turns on once Discussions is enabled on the GitHub repo. Until then, you can start a discussion on GitHub.
        </p>
        <a
          href={`https://github.com/${GISCUS.repo}/issues/new`}
          target="_blank"
          rel="noreferrer"
          className="mt-1 inline-flex h-9 items-center gap-2 rounded-full border px-4 text-sm transition-colors hover:bg-muted"
        >
          <IconBrandGithub className="size-4" /> Open an issue on GitHub
        </a>
      </div>
    )
  }

  return (
    <Giscus
      repo={GISCUS.repo}
      repoId={GISCUS.repoId}
      category={GISCUS.category}
      categoryId={GISCUS.categoryId}
      mapping="specific"
      term={term}
      strict="1"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme={resolvedTheme === 'light' ? 'light' : 'transparent_dark'}
      lang="en"
      loading="lazy"
    />
  )
}
