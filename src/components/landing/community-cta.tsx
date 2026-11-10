'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { IconArrowRight } from '@tabler/icons-react'

// WebGL glow, loaded only in the browser (React Bits Aurora, site-only).
const Aurora = dynamic(() => import('./aurora'), { ssr: false })

export function CommunityCta() {
  return (
    // Always a dark panel, in both themes: the "dark" class switches this subtree to the dark palette.
    <div className="dark relative isolate overflow-hidden rounded-3xl border bg-[#0b0d0c] text-foreground">
      {/* Glow rising from the bottom */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[85%]">
        <Aurora colorStops={['#0f9f5a', '#39ff8f', '#2de2e6']} amplitude={1.2} blend={0.6} speed={0.6} direction="bottom" className="absolute inset-0" />
        {/* Fade the top of the glow into the dark card */}
        <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-[#0b0d0c] to-transparent" />
      </div>

      <div className="flex min-h-[26rem] flex-col items-center px-6 pt-16 pb-40 text-center sm:min-h-[30rem] sm:pt-24">
        <h2 className="font-heading text-3xl font-medium tracking-tight text-balance sm:text-5xl">Help shape what we build next.</h2>
        <p className="mt-4 max-w-lg text-pretty text-muted-foreground">
          Join the community to share feedback, request the components you need, and show what you built. Reply to others and upvote
          the ideas you want most.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/community"
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-white px-6 text-sm font-medium text-black transition-colors hover:bg-white/90"
          >
            Join the community <IconArrowRight className="size-4" />
          </Link>
          <Link
            href="/docs"
            className="inline-flex h-11 items-center rounded-xl border border-primary/30 bg-primary/15 px-6 text-sm font-medium text-primary backdrop-blur transition-colors hover:bg-primary/25"
          >
            Browse components
          </Link>
        </div>
      </div>
    </div>
  )
}
