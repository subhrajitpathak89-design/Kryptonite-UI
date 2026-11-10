'use client'

import { useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { ClientOnly } from './client-only'
import { CopyButton } from './copy-button'

/** Preview / Code tabs around one live example. */
export function ExampleFrame({
  preview,
  codeHtml,
  code,
  className,
}: {
  preview: ReactNode
  codeHtml: string
  code: string
  className?: string
}) {
  const [tab, setTab] = useState<'preview' | 'code'>('preview')
  return (
    <div className={cn('overflow-hidden rounded-xl border bg-card', className)}>
      <div className="flex h-11 items-center justify-between border-b px-2">
        <div role="tablist" className="flex gap-1">
          {(['preview', 'code'] as const).map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={cn(
                'rounded-md px-3 py-1 text-sm capitalize transition-colors',
                tab === t ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {t}
            </button>
          ))}
        </div>
        <CopyButton text={code} />
      </div>
      {tab === 'preview' ? (
        <div className="flex min-h-72 items-center justify-center bg-background/40 bg-[radial-gradient(circle_at_center,var(--border)_1px,transparent_1px)] bg-[length:18px_18px] p-6 sm:p-10">
          <div className="flex w-full flex-col items-center justify-center [&>*]:max-w-full">
            <ClientOnly fallback={<div className="mx-auto h-10 w-40 animate-pulse rounded-md bg-muted" />}>{preview}</ClientOnly>
          </div>
        </div>
      ) : (
        <div
          className="max-h-[32rem] overflow-auto p-4 font-mono text-[13px] leading-relaxed"
          dangerouslySetInnerHTML={{ __html: codeHtml }}
        />
      )}
    </div>
  )
}
