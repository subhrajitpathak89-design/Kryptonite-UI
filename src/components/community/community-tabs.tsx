'use client'

import { useState } from 'react'
import { COMMUNITY_THREADS } from '@/lib/community'
import { cn } from '@/lib/utils'
import { CommunityThread } from './thread'

export function CommunityTabs() {
  const [active, setActive] = useState<string>(COMMUNITY_THREADS[0].id)
  const thread = COMMUNITY_THREADS.find((t) => t.id === active) ?? COMMUNITY_THREADS[0]

  return (
    <div>
      <div role="tablist" aria-label="Threads" className="mb-6 flex flex-wrap gap-2">
        {COMMUNITY_THREADS.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={t.id === active}
            onClick={() => setActive(t.id)}
            className={cn(
              'rounded-full border px-4 py-1.5 text-sm transition-colors',
              t.id === active ? 'border-primary bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {t.title}
          </button>
        ))}
      </div>
      <p className="mb-6 text-muted-foreground">{thread.description}</p>
      {/* key forces a fresh thread when switching tabs */}
      <CommunityThread key={thread.id} term={thread.term} />
    </div>
  )
}
